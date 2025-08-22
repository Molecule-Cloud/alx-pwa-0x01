import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps, MovieProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";


interface MProps {
    movies: MoviesProps[]
}

const Movies: React.FC<MProps> = () => {

    const [page, setPage] = useState<number>(1)
    const [year, setYear] = useState<number | null>(null)
    const [genre, setGenre] = useState<string>("All")
    const [movies, setMovies] = useState<MoviesProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [favorites, setFavorites] = useState<Set<string>>(new Set())
    const [downloads, setDownloads] = useState<Map<string, {isDownloading: boolean, progress: number}>>(new Map())

    const fetchMovies = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/fetch-movies', {
                method: 'POST',
                body: JSON.stringify({
                    page,
                    year,
                    genre: genre === "All" ? "" : genre
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            const results = data.movies || []
            console.log('Fetched movies:', results.length)
            setMovies(results)
        } catch (error) {
            console.error('Failed to fetch movies:', error)
            // Set empty array on error, the UI will show "No movies found"
            setMovies([])
        } finally {
            setLoading(false)
        }
    }, [page, year, genre])


    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('movieFavorites');
        if (savedFavorites) {
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
    }, []);

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    // Handle movie download
    const handleDownload = useCallback((movie: MovieProps) => {
        const movieId = movie.id || movie.title;
        
        // Start download
        setDownloads(prev => new Map(prev.set(movieId, { isDownloading: true, progress: 0 })));
        
        // Simulate download progress
        const progressInterval = setInterval(() => {
            setDownloads(prev => {
                const current = prev.get(movieId);
                if (!current || current.progress >= 100) {
                    clearInterval(progressInterval);
                    return prev;
                }
                
                const newProgress = Math.min(current.progress + Math.random() * 20, 100);
                const newMap = new Map(prev);
                
                if (newProgress >= 100) {
                    // Download complete
                    setTimeout(() => {
                        setDownloads(prev => {
                            const updated = new Map(prev);
                            updated.delete(movieId);
                            return updated;
                        });
                    }, 2000);
                    
                    // Show success notification
                    alert(`${movie.title} downloaded successfully!`);
                    newMap.set(movieId, { isDownloading: false, progress: 100 });
                } else {
                    newMap.set(movieId, { isDownloading: true, progress: newProgress });
                }
                
                return newMap;
            });
        }, 500);
        
        // Auto-cleanup after 30 seconds
        setTimeout(() => {
            clearInterval(progressInterval);
            setDownloads(prev => {
                const updated = new Map(prev);
                updated.delete(movieId);
                return updated;
            });
        }, 30000);
    }, []);

    // Handle favorites
    const handleFavorite = useCallback((movie: MovieProps) => {
        const movieId = movie.id || movie.title;
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(movieId)) {
                newFavorites.delete(movieId);
            } else {
                newFavorites.add(movieId);
            }
            
            // Save to localStorage
            localStorage.setItem('movieFavorites', JSON.stringify([...newFavorites]));
            return newFavorites;
        });
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            // In a real app, you would filter movies based on searchTerm
            // For now, this is just a placeholder for the search functionality
        }, 300);
        
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    // Filter movies based on search term
    const filteredMovies = movies.filter(movie => 
        searchTerm === '' || movie.titleText.text.toLowerCase().includes(searchTerm.toLowerCase())
    );




    return (
        <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
            <div className="py-16">
                <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-2 w-full border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400 transition-all duration-300 focus:border-yellow-400 focus:shadow-lg"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value))}
                        className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
                    >
                        <option value="">Select Year</option>
                        {
                            [2024, 2023, 2022, 2021, 2020, 2019].map((year: number) => (
                                <option value={year} key={year}>{year}</option>
                            ))
                        }
                    </select>
                </div>

                <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-lg md:text-6xl font-bold">{year} {genre} Movie List</h1>
                    <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
                        {
                            ['All', 'Animation', 'Comedy', 'Fantasy'].map((genre: string, key: number) => (
                                <Button title={genre} key={key} action={() => setGenre(genre)} />
                            ))
                        }
                    </div>
                </div>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="mb-4">
                        <p className="text-gray-300">
                            {filteredMovies.length} results for "{searchTerm}"
                            {filteredMovies.length === 0 && (
                                <span className="block mt-2 text-sm">Try adjusting your search terms or browse all movies</span>
                            )}
                        </p>
                    </div>
                )}

                {/* Movies output */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
                    {
                        filteredMovies?.map((movie: MoviesProps, key: number) => {
                            const movieId = movie.id || movie.titleText.text;
                            const downloadState = downloads.get(movieId);
                            
                            return (
                                <MovieCard
                                    id={movie.id}
                                    title={movie?.titleText.text}
                                    posterImage={movie?.primaryImage?.url}
                                    releaseYear={movie?.releaseYear.year}
                                    onDownload={handleDownload}
                                    onFavorite={handleFavorite}
                                    isFavorite={favorites.has(movieId)}
                                    isDownloading={downloadState?.isDownloading || false}
                                    downloadProgress={Math.round(downloadState?.progress || 0)}
                                    key={key}
                                />
                            )
                        })
                    }
                </div>
                
                {/* Empty State */}
                {filteredMovies.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🎬</div>
                        <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
                        <p className="text-gray-400 mb-8">Try adjusting your search or filters</p>
                        <Button title="Clear Filters" action={() => {
                            setSearchTerm('');
                            setGenre('All');
                            setYear(null);
                        }} />
                    </div>
                )}
                <div className="flex justify-end space-x-4 mt-6">
                    <Button title="Previous" action={() => setPage(prev => prev > 1 ? prev - 1 : 1)} />
                    <Button title="Next" action={() => setPage(page + 1)} />
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div>

    )
}


export default Movies;