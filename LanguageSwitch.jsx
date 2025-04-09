import { LangIcon } from './Icons';
import { Link } from '@inertiajs/react';

export default function LanguageSwitch({ className = '', lang }) {
    return (
        <Link 
            href={route('lang')}
            className={className}
            data={{ 'lang': lang == "zh" ? "en" : "zh" }}
        >
            <LangIcon className="block h-8 w-auto p-2 fill-gray-100 hover:fill-gray-400 transition duration-300 ease-in-out"/>
        </Link>
    );
}
