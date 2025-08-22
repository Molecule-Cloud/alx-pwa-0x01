import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Button from '@/components/commons/Button';
import Loading from '@/components/commons/Loading';

interface MovieDetails {
  id: string;
  title: string;
  overview?: string;
  poster_path: string;
  release_date: string;
  vote_average?: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
  cast?: { id: number; name: string; character: string; profile_path?: string }[];
  director?: string;
  trailer?: string;
}

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Mock movie details - In a real app, this would come from an API
  const mockMovieDetails: MovieDetails = {
    id: id as string || 'unknown',
    title: decodeURIComponent((id as string) || 'Unknown Movie'),
    overview: "This is a fantastic movie that takes you on an incredible journey through storytelling, amazing visuals, and unforgettable characters. Experience cinema at its finest with this remarkable film that has captivated audiences worldwide.",
    poster_path: "https://via.placeholder.com/500x750/1f1f1f/E2D609?text=Movie+Poster",
    release_date: "2024-01-15",
    vote_average: 8.5,
    runtime: 142,
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
      { id: 3, name: "Sci-Fi" }
    ],
    cast: [
      { id: 1, name: "John Doe", character: "Hero", profile_path: "https://via.placeholder.com/150x225/1f1f1f/E2D609?text=Actor+1" },
      { id: 2, name: "Jane Smith", character: "Heroine", profile_path: "https://via.placeholder.com/150x225/1f1f1f/E2D609?text=Actor+2" },
      { id: 3, name: "Bob Johnson", character: "Villain", profile_path: "https://via.placeholder.com/150x225/1f1f1f/E2D609?text=Actor+3" }
    ],
    director: "Christopher Director",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };

  useEffect(() => {
    if (!id) return;

    const loadMovie = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check favorites
        const savedFavorites = localStorage.getItem('movieFavorites');
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.includes(id));
        }
        
        setMovie(mockMovieDetails);
      } catch (err) {
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleFavorite = useCallback(() => {
    if (!movie) return;
    
    const savedFavorites = localStorage.getItem('movieFavorites');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((fav: string) => fav !== movie.id);
    } else {
      newFavorites = [...favorites, movie.id];
    }
    
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  }, [movie, isFavorite]);

  const handleDownload = useCallback(() => {
    if (!movie || isDownloading) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          alert(`${movie.title} downloaded successfully!`);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  }, [movie, isDownloading]);

  if (loading) return <Loading />;
  if (error) return <div className="min-h-screen bg-[#110F17] text-white flex items-center justify-center"><p>{error}</p></div>;
  if (!movie) return <div className="min-h-screen bg-[#110F17] text-white flex items-center justify-center"><p>Movie not found</p></div>;

  return (
    <div className="min-h-screen bg-[#110F17] text-white">
      {/* Hero Section */}
      <div className="relative">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#110F17] via-transparent to-[#110F17] opacity-90 z-10"></div>
        
        <div className="container mx-auto px-4 md:px-10 lg:px-44 py-8 relative z-20">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-[#E2D609] hover:text-yellow-400 transition-colors duration-300 mb-8"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Movies</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <Image
                  src={movie.poster_path}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Quality Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#E2D609] text-black text-sm font-bold rounded">4K HDR</span>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black bg-opacity-70 backdrop-blur-sm px-2 py-1 rounded flex items-center">
                    <svg className="w-4 h-4 text-[#E2D609] mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="lg:col-span-2">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {movie.runtime} min
                  </span>
                  
                  <span>Directed by {movie.director}</span>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-[#1E1E2E] border border-[#E2D609] text-[#E2D609] rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                
                {/* Overview */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {movie.overview}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-[#E2D609] text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Downloading {Math.round(downloadProgress)}%
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                        </svg>
                        Download Movie
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleFavorite}
                    className="border-2 border-[#E2D609] text-[#E2D609] px-8 py-3 rounded-full font-semibold hover:bg-[#E2D609] hover:text-black transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {movie.trailer && (
        <section className="py-16 px-4 md:px-10 lg:px-44 bg-[#171D22]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Watch Trailer</h2>
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Cast Section */}
      {movie.cast && movie.cast.length > 0 && (
        <section className="py-16 px-4 md:px-10 lg:px-44">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {movie.cast.map((actor) => (
                <div key={actor.id} className="text-center group">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <Image
                      src={actor.profile_path || '/placeholder-actor.jpg'}
                      alt={actor.name}
                      width={150}
                      height={225}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{actor.name}</h3>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Movies Section */}
      <section className="py-16 px-4 md:px-10 lg:px-44 bg-[#171D22]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">Discover more amazing movies</p>
            <Button 
              title="Browse All Movies" 
              action={() => router.push('/movies')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
