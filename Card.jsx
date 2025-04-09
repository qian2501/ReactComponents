export default function Card({ children, className = '' }) {
    return (
        <div className={"w-full px-6 py-4 bg-gray-700 shadow-md overflow-hidden sm:rounded-lg " + className}>
            {children}
        </div>
    );
}