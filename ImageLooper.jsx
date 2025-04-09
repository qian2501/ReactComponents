import { useState, useEffect } from 'react';

export default function ImageLooper({ className, imageArray, interval = 3500 }) {
    const [curIndex, SetCurIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            SetCurIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
        }, interval);
    
        return () => clearInterval(intervalId);
    }, [imageArray.length]);

    return (
        <div className={className}>
            {imageArray.map((one, index) => (
                <div className={`${index != 0 && "absolute top-0"} w-full ${index === curIndex ? "opacity-100" : "opacity-0"} transition ease-in-out duration-500`} key={index}>
                    <img
                        src={one}
                        alt={`Image ${index + 1}`}
                        className="w-full"
                    />
                </div>
            ))}
        </div>
    );
}