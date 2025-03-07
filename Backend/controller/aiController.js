const catchAsync = require("../utils/catchAsync");
const Movie = require("../models/movies");

const AIController = {
  searchMovie: catchAsync(async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search: query } = req.query;
      const amount = page * limit || 10;
      const totalPage = Math.max(page + 1, 3);
      const threshold = req.query.threshold || 0.25;
      const llm_api_key = process.env.GEMINI_API_KEY;
      const collection_name = "movies";

      const url = `https://awd-llm.azurewebsites.net/retriever/?llm_api_key=${llm_api_key}&collection_name=${collection_name}&query=${query}&amount=${amount}&threshold=${threshold}`;
      const response = await fetch(url);
      const fetchData = await response.json();

      if (!fetchData.data || !fetchData.data.result) {
        return res.status(400).json({
          success: false,
          message: "No movies found from AI",
        });
      }

      const movieIds = fetchData.data.result;

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const movieIdsToFetch = movieIds.slice(startIndex, endIndex);

      const movies = (
        await Promise.all(
          movieIdsToFetch.map(async (id) => {
            const movie = await Movie.findById(id).select(
              "title tmdb_id poster_path genres release_date vote_average overview"
            );
            return movie;
          })
        )
      ).filter((movie) => movie !== null);

      return res.status(200).json({
        success: true,
        message: "Get Movies by AI successfully",
        data: movies,
        page: parseInt(page),
        totalPage: parseInt(totalPage),
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      next(error);
    }
  }),

  searchNavigate: catchAsync(async (req, res, next) => {
    try {
      const { query } = req.query;
      const llm_api_key = process.env.GEMINI_API_KEY;

      const url = `https://awd-llm.azurewebsites.net/navigate/?llm_api_key=${llm_api_key}&query=${encodeURIComponent(
        query
      )}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const fetchData = await response.json();

      const { data } = fetchData;

      if (!data) {
        return res.status(400).json({
          success: false,
          message: "No movies found from AI",
        });
      }

      const { route, params } = data;
      if (!route) {
        return res.status(400).json({
          success: false,
          message: "No route found from AI",
        });
      }

      if (route === "CAST_PAGE") {
        const movieIds = params?.movie_ids?.[0];
        if (!movieIds) {
          return res.status(400).json({
            success: false,
            message: "No valid movie IDs found",
          });
        }

        const movie = await Movie.findById(movieIds);

        const tmdb_ids = movie.tmdb_id;

        const routeName = `/movie/${tmdb_ids}/cast`;

        return res.status(200).json({
          success: true,
          message: "Navigate successfully",
          label: "Navigate",
          route: routeName,
        });
      }

      if (route === "PROFILE_PAGE") {
        const routeName = `/profile`;

        return res.status(200).json({
          success: true,
          message: "Navigate successfully",
          label: "Navigate",
          route: routeName,
        });
      }

      if (route === "SEARCH_PAGE") {
        const keyword = params?.keyword;
        if (!keyword) {
          return res.status(400).json({
            success: false,
            message: "No valid keyword found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Get Movies by AI successfully",
          label: "Search",
          route: `/search?query=${keyword}`,
        });
      }

      if (route === "MOVIE_PAGE") {
        const movieIds = params?.movie_ids?.[0];
        if (!movieIds) {
          return res.status(400).json({
            success: false,
            message: "No valid movie IDs found",
          });
        }

        const movie = await Movie.findById(movieIds);

        const tmdb_ids = movie.tmdb_id;

        const routeName = `/movie/${tmdb_ids}`;

        return res.status(200).json({
          success: true,
          message: "Navigate successfully",
          label: "Navigate",
          route: routeName,
        });
      }
      console.log("AI-Controller: Can't find any info");
      return res.status(200).json({
        success: true,
        message: "Not found information",
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      next(error);
    }
  }),
};

module.exports = AIController;
