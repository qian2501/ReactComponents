export default function Label({ value, className = '', children }) {
    return (
        <label className={`block font-medium text-sm ` + className}>
            {value ? value : children}
        </label>
    );
}
