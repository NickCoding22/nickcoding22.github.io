import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import NavBar from '../Components/Utils/NavBar';
import writeupMarkdown from './assignment4/writeupExported.js';

const a4ImageContext = require.context('./assignment4/images', false, /\.png$/);
const assignment4Images = {};
a4ImageContext.keys().forEach((key) => {
    assignment4Images[key.replace(/^\.\//, '')] = a4ImageContext(key);
});

/** Resolve `./images/…` to webpack URLs; missing files get a placeholder (figures added later). */
function resolveImageSrc(src) {
    if (!src || typeof src !== 'string') return { href: src, missing: false };
    const trimmed = src.trim();
    const m = /^\.\/images\/(.+\.png)$/i.exec(trimmed) || /^images\/(.+\.png)$/i.exec(trimmed);
    if (m) {
        const file = m[1];
        if (assignment4Images[file]) return { href: assignment4Images[file], missing: false, file };
        return { href: null, missing: true, file };
    }
    return { href: src, missing: false };
}

const mdComponents = {
    img({ src, alt, ...rest }) {
        const { href, missing, file } = resolveImageSrc(src);
        if (missing) {
            return (
                <figure className="my-4 mx-auto max-w-2xl rounded-lg border-2 border-dashed border-amber-200 bg-amber-50/80 px-4 py-6 text-center">
                    <figcaption className="text-sm font-medium text-amber-950">Figure pending</figcaption>
                    <p className="mt-1 font-mono text-xs text-gray-700">{file}</p>
                    <p className="mt-2 text-xs text-gray-600">
                        Add this PNG under{' '}
                        <code className="rounded bg-white px-1 py-0.5 text-gray-800">src/pages/assignment4/images/</code> then
                        rebuild.
                    </p>
                    {alt ? <p className="mt-2 text-xs italic text-gray-500">{alt}</p> : null}
                </figure>
            );
        }
        return (
            <img
                src={href}
                alt={alt || ''}
                className="max-w-full h-auto rounded-lg border border-gray-200 my-4 mx-auto block"
                loading="lazy"
                {...rest}
            />
        );
    },
    a({ href, children, ...rest }) {
        const ext = href?.startsWith('http');
        if (ext) {
            return (
                <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...rest}>
                    {children}
                </a>
            );
        }
        return (
            <a href={href} className="text-blue-600 hover:underline" {...rest}>
                {children}
            </a>
        );
    },
    h1({ children, ...rest }) {
        return (
            <h1 className="text-center text-3xl font-bold mb-4 mt-2 text-gray-900" {...rest}>
                {children}
            </h1>
        );
    },
    h2({ children, ...rest }) {
        return (
            <h2 className="text-2xl font-semibold mt-10 mb-4 border-t border-gray-200 pt-8 text-gray-900" {...rest}>
                {children}
            </h2>
        );
    },
    h3({ children, ...rest }) {
        return (
            <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900" {...rest}>
                {children}
            </h3>
        );
    },
    h4({ children, ...rest }) {
        return (
            <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-900" {...rest}>
                {children}
            </h4>
        );
    },
    p({ children, ...rest }) {
        return (
            <p className="mb-4 text-gray-800 leading-relaxed" {...rest}>
                {children}
            </p>
        );
    },
    ul({ children, ...rest }) {
        return (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-800" {...rest}>
                {children}
            </ul>
        );
    },
    ol({ children, ...rest }) {
        return (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-800" {...rest}>
                {children}
            </ol>
        );
    },
    li({ children, ...rest }) {
        return (
            <li className="pl-1 marker:text-gray-600" {...rest}>
                {children}
            </li>
        );
    },
    hr() {
        return <hr className="my-10 border-gray-200" />;
    },
    table({ children, ...rest }) {
        return (
            <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-gray-300 bg-white text-sm" {...rest}>
                    {children}
                </table>
            </div>
        );
    },
    thead({ children, ...rest }) {
        return <thead className="bg-gray-100">{children}</thead>;
    },
    th({ children, ...rest }) {
        return (
            <th className="border border-gray-300 px-2 py-2 text-left font-semibold align-top text-gray-900" {...rest}>
                {children}
            </th>
        );
    },
    td({ children, ...rest }) {
        return (
            <td className="border border-gray-300 px-2 py-2 align-top text-gray-800" {...rest}>
                {children}
            </td>
        );
    },
    code({ inline, className, children, ...rest }) {
        if (inline) {
            return (
                <code className="bg-gray-100 px-1 rounded text-sm text-gray-900" {...rest}>
                    {children}
                </code>
            );
        }
        return (
            <code className={`text-sm font-mono text-gray-900 ${className || ''}`} {...rest}>
                {children}
            </code>
        );
    },
    pre({ children, ...rest }) {
        return (
            <pre
                className="mb-4 overflow-x-auto bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm"
                {...rest}
            >
                {children}
            </pre>
        );
    },
    blockquote({ children, ...rest }) {
        return (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700" {...rest}>
                {children}
            </blockquote>
        );
    },
    input({ type, checked, ...rest }) {
        if (type === 'checkbox') {
            return <input type="checkbox" checked={checked} readOnly className="mr-2 align-middle" {...rest} />;
        }
        return <input type={type} {...rest} />;
    },
    strong({ children, ...rest }) {
        return (
            <strong className="font-semibold text-gray-900" {...rest}>
                {children}
            </strong>
        );
    },
};

export default function CS184Assignment4() {
    const colorList = ['bg-neutral-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];
    const [bColor, setBColor] = useState(colorList[Math.trunc(Math.random() * colorList.length)]);

    const remarkPlugins = useMemo(() => [remarkGfm, remarkMath], []);
    const rehypePlugins = useMemo(() => [[rehypeKatex, { strict: false, throwOnError: false }]], []);
    const normalizedMarkdown = useMemo(() => {
        // remark-math reliably parses $...$ / $$...$$ delimiters.
        return writeupMarkdown
            .replace(/\\\[((?:.|\n)*?)\\\]/g, (_m, inner) => `\n$$\n${inner}\n$$\n`)
            .replace(/\\\((.+?)\\\)/g, (_m, inner) => `$${inner}$`);
    }, []);

    return (
        <div className={`flex flex-col min-h-screen w-screen overflow-x-hidden overflow-y-auto ${bColor} font-mono`}>
            <NavBar setColor={setBColor} colorList={colorList} />
            <div
                className="assignment4-writeup mx-auto py-16 px-8 md:px-16 lg:px-24 max-w-6xl bg-white text-gray-900"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <style>{`
                    .assignment4-writeup .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
                    .assignment4-writeup table img { margin: 0.25rem auto; max-height: 40vh; object-fit: contain; }
                `}</style>
                <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
                    ← Back to Home
                </Link>
                <article className="a4-md max-w-none">
                    <ReactMarkdown
                        remarkPlugins={remarkPlugins}
                        rehypePlugins={rehypePlugins}
                        components={mdComponents}
                    >
                        {normalizedMarkdown}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
