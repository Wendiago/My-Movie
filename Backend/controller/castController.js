const catchAsync = require("../utils/catchAsync");
const People = require("../models/people");

const searchController = {
  getCastById: catchAsync(async (req, res, next) => {
    try {
      const { idCast } = req.params;
      const data = await People.findOne({ tmdb_id: idCast });
      // Trả về kết quả
      return res.status(200).json({
        success: true,
        message: "get Cast by ID successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      next(error);
    }
  }),

  getCastByName: catchAsync(async (req, res, next) => {
    //console.log("req.params", req.params);

    try {
      const { name } = req.params;
      const data = await People.findOne({ name: name });
      // Trả về kết quả
      return res.status(200).json({
        success: true,
        message: "get Cast by ID successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      next(error);
    }
  }),
};

module.exports = searchController;
