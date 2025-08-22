import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Offline: React.FC = () => {
    const [isOnline, setIsOnline] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (navigator.onLine) {
                // Automatically redirect to home when back online
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
        };

        // Initial check
        setIsOnline(navigator.onLine);

        // Listen for online/offline events
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, [router]);

    if (isOnline) {
        return (
            <div className="min-h-screen bg-[#110F17] text-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="animate-bounce mb-8">
                        <div className="w-16 h-16 bg-green-600 rounded-full mx-auto flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-green-400">You're Back Online!</h1>
                    <p className="text-gray-300 mb-6">Great! Your internet connection has been restored.</p>
                    <p className="text-sm text-gray-400">Redirecting you to CineSeek...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#110F17] text-white flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                {/* Offline Icon */}
                <div className="mb-8 animate-pulse">
                    <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold mb-4">
                    You're <span className="text-red-400">Offline</span>
                </h1>

                {/* Description */}
                <p className="text-gray-300 mb-8 leading-relaxed">
                    It looks like you've lost your internet connection. Don't worry - 
                    you can still browse your favorite movies that you've viewed before!
                </p>

                {/* Features available offline */}
                <div className="bg-[#1E1E2E] rounded-lg p-6 mb-8">
                    <h3 className="text-[#E2D609] font-semibold mb-4">What you can do offline:</h3>
                    <ul className="text-left space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            View cached movie information
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Browse your favorite movies
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Access previously visited pages
                        </li>
                    </ul>
                </div>

                {/* Retry button */}
                <button
                    onClick={() => {
                        if (navigator.onLine) {
                            router.push('/');
                        } else {
                            // Show a message that they're still offline
                            alert('You are still offline. Please check your internet connection.');
                        }
                    }}
                    className="bg-[#E2D609] text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-300 mb-4"
                >
                    Try Again
                </button>

                {/* Status indicator */}
                <div className="flex items-center justify-center text-sm text-gray-400">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    <span>No internet connection</span>
                </div>

                {/* Tips */}
                <div className="mt-8 text-xs text-gray-500">
                    <p className="mb-2">💡 <strong>Tip:</strong> This page works offline thanks to PWA technology!</p>
                    <p>Make sure your WiFi or mobile data is enabled and try refreshing.</p>
                </div>
            </div>
        </div>
    );
};

export default Offline;
