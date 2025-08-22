import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

// Mock movie data for fallback
const mockMovies: MoviesProps[] = [
    {
        id: "1",
        titleText: { text: "The Amazing Spider-Man" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg"
        },
        releaseYear: { year: "2024" }
    },
    {
        id: "2",
        titleText: { text: "Avatar: The Way of Water" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg"
        },
        releaseYear: { year: "2023" }
    },
    {
        id: "3",
        titleText: { text: "Black Panther: Wakanda Forever" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "4",
        titleText: { text: "Top Gun: Maverick" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "5",
        titleText: { text: "The Batman" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "6",
        titleText: { text: "Doctor Strange in the Multiverse of Madness" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "7",
        titleText: { text: "Thor: Love and Thunder" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "8",
        titleText: { text: "Minions: The Rise of Gru" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BMTMxNDU4NTExNF5BMl5BanBnXkFtZTgwMjk4NzY5NDI@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "9",
        titleText: { text: "Jurassic World Dominion" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BZGEwYmMwZmMtMTQ3MS00YWNmLWE4N2ItZGRjYWVhZjQ5YjdjXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "10",
        titleText: { text: "Lightyear" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BMTkxNzY2MjQ2NV5BMl5BanBnXkFtZTgwNzU2ODM5NjM@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "11",
        titleText: { text: "Fantastic Beasts: The Secrets of Dumbledore" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BZGI0ODNhNDMtOWY4Yi00YzM3LTg4MGYtMzE0Nzc0MjI3MmE0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    },
    {
        id: "12",
        titleText: { text: "The Northman" },
        primaryImage: {
            url: "https://m.media-amazon.com/images/M/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNWQwYzQxXkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_.jpg"
        },
        releaseYear: { year: "2022" }
    }
];

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        try {
            const { year, page, genre } = request.body;
            console.log('API Request:', { year, page, genre });
            
            // Check if API key exists
            if (process.env.MOVIE_API_KEY) {
                try {
                    const date = new Date();
                    const queryParams = new URLSearchParams({
                        year: year?.toString() || date.getFullYear().toString(),
                        sort: 'year.decr',
                        limit: '12',
                        page: page?.toString() || '1'
                    });
                    
                    if (genre && genre !== 'All') {
                        queryParams.append('genre', genre);
                    }
                    
                    const apiUrl = `https://moviesdatabase.p.rapidapi.com/titles?${queryParams.toString()}`;
                    console.log('Fetching from API:', apiUrl);
                    
                    const resp = await fetch(apiUrl, {
                        headers: {
                            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
                            "X-RapidAPI-Key": process.env.MOVIE_API_KEY,
                        },
                    });

                    if (resp.ok) {
                        const moviesResponse = await resp.json();
                        const movies: MoviesProps[] = moviesResponse.results || [];
                        
                        if (movies.length > 0) {
                            console.log('API Success:', movies.length, 'movies fetched');
                            return response.status(200).json({ movies });
                        }
                    }
                } catch (apiError) {
                    console.log('API failed, using mock data:', apiError);
                }
            }
            
            // Fallback to mock data
            console.log('Using mock data');
            let filteredMovies = [...mockMovies];
            
            // Apply filters to mock data
            if (year) {
                filteredMovies = filteredMovies.filter(movie => 
                    movie.releaseYear.year === year.toString()
                );
            }
            
            if (genre && genre !== 'All') {
                // For mock data, we'll just return all movies for now
                // In a real app, you'd filter by genre
            }
            
            // Simulate pagination
            const startIndex = ((page || 1) - 1) * 12;
            const endIndex = startIndex + 12;
            const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
            
            return response.status(200).json({
                movies: paginatedMovies
            });
            
        } catch (error) {
            console.error('Handler error:', error);
            return response.status(500).json({
                error: 'Failed to fetch movies',
                movies: mockMovies.slice(0, 12) // Return first 12 mock movies on error
            });
        }
    } else {
        response.setHeader('Allow', ['POST']);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
};
