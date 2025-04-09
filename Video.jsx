import { useState } from 'react';

export default function Video({ className, src, poster }) {
    const [ isPlaying, setIsPlaying ] = useState(false);

    return (
        <video
            className={className}
            loop
            muted
            autoPlay
            src={src}
            preload={'auto'}
            poster={poster}
            type={'video/mp4'}
            onCanPlay={() => setIsPlaying(true)}
            onEnded={() => setIsPlaying(false)}
        />
    );
}
