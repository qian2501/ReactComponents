export default function Card({ children, className = '' }) {
    return (
        <div className={"w-full px-6 py-4 border-2 border-gray-700 overflow-hidden sm:rounded-lg " + className}>
            {children}
        </div>
    );
}