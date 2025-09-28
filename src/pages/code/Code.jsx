const part11Code = `
# Return modified image with x-amount of padding to the sides, y-amount to top and bottom
def add_padding(image, x, y):
    # Add in new rows
    if (y == 0):
        image_rows_padded = image.copy()
    else:
        new_rows = np.array([[0] * len(image[0]) for i in range(y)])
        image_rows_padded = np.concatenate((new_rows, image, new_rows))
    # Add in new columns
    if (x == 0):
        image_cols_padded = image_rows_padded
    else: 
        new_columns = np.array([0] * x)
        image_cols_padded = np.array([np.concatenate((new_columns, row, new_columns)) for row in image_rows_padded])
    
    return image_cols_padded

def normalize_image(im):
    return (im - im.min()) / (im.max() - im.min())

# Naive convolve formula with 4 for loops
def naive_convolve_4(image, filter):
    new_image = []
    x_padding = int(len(filter[0]) / 2)
    y_padding = int(len(filter) / 2)
    old_image = add_padding(image, x_padding, y_padding)

    filter_flipped = np.flipud(np.fliplr(filter))
    # j and m -> x, i and k -> y
    for i in range(len(image)):
        new_row = []
        for j in range(len(image[0])):
            new_val = 0
            for k in range(len(filter_flipped)):
                for m in range(len(filter_flipped[0])):
                    new_y = i + k
                    new_x = j + m
                    new_val += filter_flipped[k][m] * old_image[new_y][new_x]
            new_row.append(new_val)
        new_image.append(new_row)
    return np.array(new_image)

# Improved convolve formula with 2 for loops
def better_convolve_2(image, filter):
    new_image = []
    x_padding = int(len(filter[0]) / 2)
    y_padding = int(len(filter) / 2)
    
    filter_flipped = np.flipud(np.fliplr(filter))
    old_image = add_padding(image, x_padding, y_padding)
    # j and m -> x, i and k -> y
    for i in range(len(image)):
        new_row = []
        for j in range(len(image[0])):
            image_cutout = old_image[i: i + filter_flipped.shape[0], \
                                     j: j + filter_flipped.shape[1]]
            mult_vals = filter_flipped * image_cutout
            new_val = np.sum(mult_vals)
            new_row.append(new_val)
        new_image.append(new_row)
    return np.array(new_image)

# Name of the input file
imname = 'before/thumbsUp.jpeg'

# Read in image and convert to grayscale (taken from proj01 starter code)
im = skio.imread(imname)
if im.ndim == 3:
    im = color.rgb2gray(im)
im = img_as_float(im)

# Define the filters
box_filter = np.array([[1/(9*9)] * 9 for i in range(9)])
dx_filter = np.array([[1, 0, -1]])
dy_filter = np.array([[1], [0], [-1]])

def test_filter(image, filter, name):
    # Naive
    current = time.time()
    new_im = naive_convolve_4(image, filter)
    done = time.time()
    print("Time for naive " + name + " filter: " + str((done - current) * 1000))
    im_ubyte = img_as_ubyte(normalize_image(new_im))
    skio.imsave('after/' + name + '_filter_2.jpg', im_ubyte)
    # Improved
    current = time.time()
    new_im = better_convolve_2(image, filter)
    done = time.time()
    print("Time for improved " + name + " filter: " + str((done - current) * 1000))
    im_ubyte = img_as_ubyte(normalize_image(new_im))
    skio.imsave('after/' + name + '_filter_4.jpg', im_ubyte)
    # Skimage
    current = time.time()
    new_im = scipy.signal.convolve2d(image, filter, mode="same")
    done = time.time()
    print("Time for sklearn " + name + " filter: " + str((done - current) * 1000))
    im_ubyte = img_as_ubyte(normalize_image(new_im))
    skio.imsave('after/' + name + '_filter_sk.jpg', im_ubyte)
    print()

# Test filters
test_filter(im, box_filter, "box")
test_filter(im, dx_filter, "dx")
test_filter(im, dy_filter, "dy")
`;
export default part11Code;