const catchAsync = require("../utils/catchAsync");
const customApi = require("../utils/customApi");

const movieController = {

  getDetailMovie: catchAsync(async (req, res, next) => {
        try {
            const { idMovie } = req.params;
            const data = await customApi(`movie/${idMovie}`);

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
        const data = await customApi('trending/movie/day');

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
        const data = await customApi('trending/movie/week');

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

  searchMovie: catchAsync(async (req, res, next) => {
    const { query, page } = req.query; 

    if (!query) {
      return res.status(400).json({ message: "Query parameter 'query' is required." });
    }

    try {
      const data = await customApi('search/movie', {
        query, 
        page: page || 1, 
        include_adult: false, 
      });

      res.status(200).json(data);
    } catch (error) {
      next(error); 
    }
  }),
};

module.exports = movieController;
