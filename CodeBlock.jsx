import { useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons';

export default function CodeBlock({ children, className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            // navigator.clipboard works under https and localhost
            if (window.isSecureContext && navigator.clipboard) {
                await navigator.clipboard.writeText(children);
            } else {
                // but there are scenario where http is used but not localhost, like app running on local network
                // there is no other options, and execCommand is not going to be removed any time soon, thus keeped
                const textarea = document.createElement('textarea');
                textarea.value = children;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed: ', err);
        }
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
