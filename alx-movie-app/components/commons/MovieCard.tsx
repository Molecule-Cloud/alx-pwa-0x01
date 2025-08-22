import { MovieProps } from "@/interfaces"
import Image from "next/image"
import { useState } from "react"

const MovieCard: React.FC<MovieProps> = ({ 
    id,
    title, 
    posterImage, 
    releaseYear, 
    onDownload,
    onFavorite,
    isFavorite = false,
    isDownloading = false,
    downloadProgress = 0
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDownload && !isDownloading) {
            onDownload({ id, title, posterImage, releaseYear });
        }
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onFavorite) {
            onFavorite({ id, title, posterImage, releaseYear });
        }
    };

    const handleMovieClick = () => {
        // Navigate to movie details page
        window.location.href = `/movies/${id || encodeURIComponent(title)}`;
    };

    return (
        <div 
            className="movie-card-hover cursor-pointer group relative"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onClick={handleMovieClick}
        >
            <div className="relative overflow-hidden rounded-lg">
                {!imageLoaded && (
                    <div className="h-[430px] w-full bg-gray-800 animate-shimmer rounded-lg flex items-center justify-center">
                        <div className="loading-spinner"></div>
                    </div>
                )}
                
                <Image 
                    className={`h-[430px] w-full object-cover rounded-lg transition-all duration-300 group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={posterImage} 
                    width={300} 
                    height={430} 
                    alt={title}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(true)}
                />
                
                {/* Download Progress Overlay */}
                {isDownloading && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center rounded-lg">
                        <div className="w-16 h-16 mb-4">
                            <svg className="w-full h-full animate-spin" viewBox="0 0 24 24">
                                <circle 
                                    className="opacity-25" 
                                    cx="12" 
                                    cy="12" 
                                    r="10" 
                                    stroke="currentColor" 
                                    strokeWidth="4" 
                                    fill="none"
                                />
                                <path 
                                    className="opacity-75 text-[#E2D609]" 
                                    fill="currentColor" 
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </div>
                        <p className="text-white text-sm font-semibold">Downloading... {downloadProgress}%</p>
                        <div className="w-32 h-2 bg-gray-600 rounded-full mt-2 overflow-hidden">
                            <div 
                                className="h-full bg-[#E2D609] transition-all duration-300"
                                style={{ width: `${downloadProgress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
                
                {/* Action Buttons Overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 rounded-lg transition-all duration-300 ${
                    showActions && !isDownloading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                    <button
                        onClick={handleFavorite}
                        className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 transform hover:scale-110"
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <svg className="w-6 h-6" fill={isFavorite ? "#E2D609" : "none"} stroke={isFavorite ? "#E2D609" : "white"} strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="p-3 bg-[#E2D609] bg-opacity-80 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download movie"
                    >
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={handleMovieClick}
                        className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 transform hover:scale-110"
                        title="View details"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
                
                {/* Quality Badge */}
                <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-[#E2D609] text-black text-xs font-bold rounded">HD</span>
                </div>
                
                {/* Favorite Badge */}
                {isFavorite && (
                    <div className="absolute top-2 right-2">
                        <div className="p-1 bg-red-600 rounded-full">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Movie Info */}
            <div className="py-4">
                <div className="flex justify-between items-start">
                    <p className="text-lg font-bold leading-tight line-clamp-2 flex-1 mr-2 group-hover:text-[#E2D609] transition-colors duration-300">
                        {title}
                    </p>
                    <p className="text-lg text-[#E2D609] font-semibold">{releaseYear}</p>
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, index) => (
                        <svg 
                            key={index} 
                            className={`w-4 h-4 ${
                                index < 4 ? 'text-[#E2D609]' : 'text-gray-600'
                            }`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-sm text-gray-400 ml-2">4.0</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard