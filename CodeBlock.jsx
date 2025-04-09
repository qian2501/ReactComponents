import { useState } from 'react';
import { CopyIcon } from './Icons';

export default function CodeBlock({ code, className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = code.join('\n');
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
    };

    return (
        <div className={`relative w-full rounded-md bg-gray-700 p-4 ${className}`}>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1 rounded bg-gray-600 text-white text-sm opacity-60 hover:bg-gray-500 hover:opacity-100 transition"
            >
                {copied ? <div className={'w-5 h-5'}>✓</div> : <CopyIcon className={'fill-white w-5 h-5'} />}
            </button>
            <div className="pr-8">
                {code.map((one, index) => 
                    <div className='break-words mt-1' key={index}>{one}</div>
                )}
            </div>
        </div>
    );
}