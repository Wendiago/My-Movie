const catchAsync = require("../utils/catchAsync");
const Genre = require("../models/movies_genres");
const Movie = require("../models/movies");
const MovieTrendingDay = require("../models/movies_trending_day");
const MovieTrendingWeek = require("../models/movies_trending_week");

const movieController = {
  getDetailMovieById: catchAsync(async (req, res, next) => {
    try {
        const { idMovie } = req.params;
        const data = await Movie.findById(idMovie);

        return res.status(200).json({
            success: true,
            message: "Detail movie fetched successfully",
            data: data
        });
    } catch (error) {
        console.error("Error fetching detail movie:", error);
        next(error);
    }
}),

  getTrendingMoviesDay: catchAsync(async (req, res, next) => {
    try {
      const data = await MovieTrendingDay.find();
      return res.status(200).json({
          success: true,
          message: "Trending movies day fetched successfully",
          data: data
      });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error); 
        
    }
  }),

  getTrendingMoviesWeek: catchAsync(async (req, res, next) => {
    try {
        const data = await MovieTrendingWeek.find();

        return res.status(200).json({
            success: true,
            message: "Trending movies week fetched successfully",
            data: data
        });
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      next(error);
        
    }
  }),

  getAllGenres: catchAsync(async (req, res, next) => {
    try {
        const genres = await Genre.find();
        console.log("genres", genres);

        res.status(200).json({
          success: true,
          message: "Get All genres successfully",
          data: genres
        });
      
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
  }),
};

module.exports = movieController;


// const fetchGenres = async () => {
//   const data = await customApi('genre/movie/list');

//   return data.genres;
// }

// const mapGenresToMovies = async (movies) => {
//   const genres = await fetchGenres();

//   return movies.map((movie) => {
//     const genreNames = movie.genre_ids.map((id) => {
//       const genre = genres.find((g) => g.id === id);
//       return genre ? genre.name : 'Unknown';
//     });

//     return {
//       ...movie,
//       genres: genreNames,
//     };
//   });
// };


//   getMovieById: catchAsync(async (req, res, next) => {
//     const { id } = req.params;

//     try {
//       const data = await Movie.findById(id)
//       return res.status(200).json({
//         success: true,
//         message: "Movie fetched successfully",
//         data: data,
//       });
//     } catch (error) {
//       console.error("Error fetching movie:", error);
//       next(error);
//     }
//   }),

// searchMovie: catchAsync(async (req, res, next) => {
//     const { query, page } = req.query; 

//     if (!query) {
//       return res.status(400).json({ message: "Query parameter 'query' is required." });
//     }

//     try {
//       const data = await customApi('search/movie', {
//         query, 
//         page: page || 1, 
//         include_adult: false, 
//       });

//       const movies = await mapGenresToMovies(data.results);

//       res.status(200).json({
//         success: true,
//         message: "Search Movies fetched successfully",
//         data: movies,
//         page: data.page,
//         totalPage: data.total_pages,
//       });
//     } catch (error) {
//       next(error); 
//     }
//   }),

  // getTrendingMoviesWeek: catchAsync(async (req, res, next) => {
  //   try {
  //       const data = await customApi('trending/movie/week');

  //       return res.status(200).json({
  //           success: true,
  //           message: "Trending movies week fetched successfully",
  //           data: data
  //       });
  //   } catch (error) {
  //     console.error("Error fetching trending movies:", error);
  //     next(error);
        
  //   }
  // }),

    // getTrendingMoviesDay: catchAsync(async (req, res, next) => {
  //   try {
  //       const data = await customApi('trending/movie/day');

  //       return res.status(200).json({
  //           success: true,
  //           message: "Trending movies day fetched successfully",
  //           data: data
  //       });
  //   } catch (error) {
  //     console.error("Error fetching trending movies:", error);
  //     next(error); 
        
  //   }
  // }),