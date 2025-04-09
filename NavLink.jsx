import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`mt-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
