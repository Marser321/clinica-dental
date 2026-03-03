'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { ErrorBoundary } from 'react-error-boundary';

interface SplineSceneProps {
    scene: string;
    fallbackImageSrc?: string;
    fallbackImageAlt?: string;
    className?: string;
    onLoad?: () => void;
}

export function SplineScene({
    scene,
    fallbackImageSrc,
    fallbackImageAlt = '3D Model Fallback',
    className = '',
    onLoad,
}: SplineSceneProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Timeout para forzar timeout si Spline no responde por error 403 o red
        const timer = setTimeout(() => {
            if (!isLoaded) {
                console.warn(`Timeout loading Spline scene: ${scene}`);
                setHasError(true);
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [isLoaded, scene]);

    const handleLoad = () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
    };

    const handleError = () => {
        console.error(`Error loading Spline scene: ${scene}`);
        setHasError(true);
    };

    // Componente de imagen estática de respaldo
    const FallbackView = () => (
        <div className={`relative w-full h-full flex items-center justify-center ${className} animate-in fade-in duration-500`}>
            {fallbackImageSrc && (
                <Image
                    src={fallbackImageSrc}
                    alt={fallbackImageAlt}
                    fill
                    className="object-contain drop-shadow-lg p-4"
                />
            )}
        </div>
    );

    // Si hay error reportado internamente
    if (hasError && fallbackImageSrc) {
        return <FallbackView />;
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Loading State o Fallback inicial */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10 transition-opacity duration-500">
                    {fallbackImageSrc && (
                        <Image
                            src={fallbackImageSrc}
                            alt={fallbackImageAlt}
                            fill
                            className="object-contain opacity-50 blur-sm p-4 animate-pulse"
                        />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-2xl backdrop-blur-[2px]">
                        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin opacity-70" />
                    </div>
                </div>
            )}

            {/* ErrorBoundary exterior por si el modelo 403 crashea el módulo react-spline */}
            <ErrorBoundary fallback={<FallbackView />}>
                <div className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    {isClient && (
                        <Spline
                            scene={scene}
                            onLoad={handleLoad}
                            onError={handleError}
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                </div>
            </ErrorBoundary>
        </div>
    );
}
