import { useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons';

export default function CodeBlock({ children, className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
    };

    return (
        <div className={'relative w-full rounded-md bg-gray-700 ' + className}>
            <button
                onClick={handleCopy}
                className="absolute top-1 right-1 p-1 rounded bg-gray-600 opacity-30 hover:bg-gray-600 hover:opacity-90 transition"
            >
                {copied ? <CheckIcon className={'fill-white w-[1em] h-[1em]'} /> : <CopyIcon className={'fill-white w-[1em] h-[1em]'} />}
            </button>
            <div className="break-words mt-1">
                {children}
            </div>
        </div>
    );
}
