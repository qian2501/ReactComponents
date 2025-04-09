import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-200 text-indigo-100 bg-indigo-700 focus:outline-none focus:text-indigo-400 focus:bg-indigo-800 focus:border-indigo-400'
                    : 'border-transparent text-gray-400 hover:text-gray-100 hover:bg-gray-500 hover:border-gray-400 focus:outline-none focus:text-gray-300 focus:bg-gray-600 focus:border-gray-400'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
