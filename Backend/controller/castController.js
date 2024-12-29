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
        console.log("req.params", req.params);

        try {
            const { name } = req.params;
            const data = await People.findOne({ name: name  });
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
    })
    // filterMovie: catchAsync(async (req, res, next) => {
    //     console.log("req.query", req.query);
    //     try {
    //         const { genre, rating, release_date, page = 1, limit = 10 } = req.query;
            
    //         // Khởi tạo offset cho phân trang
    //         const offset = (page - 1) * limit;
    
    //         // Khởi tạo đối tượng query
    //         const query = {};
    
    //         // Lọc theo thể loại (genre) - Không phân biệt hoa thường
    //         if (genre) {
    //             query.genres = { $elemMatch: { name: { $regex: new RegExp(genre, 'i') } } };
    //         }
    
    //         // Lọc theo rating (vote_average)
    //         if (rating) {
    //             query.vote_average = { $gte: parseFloat(rating) };
    //         }
    
    //         // Lọc theo ngày phát hành (release_date)
    //         if (release_date) {
    //             // // Chuyển release_date thành đối tượng Date
    //             // const startOfDay = new Date(release_date); // Chuyển đổi từ chuỗi ISO thành Date
    //             // const endOfDay = new Date(release_date);
    //             // endOfDay.setHours(23, 59, 59, 999); // Đặt giờ cuối ngày
    
    //             // query.release_date = { $gte: startOfDay, $lte: endOfDay };
    //             query.release_date = new Date(release_date);
    //         }
    
    //         // Tìm kiếm phim theo query và phân trang
    //         const data = await Movie.find(query)
    //             .skip(offset)
    //             .limit(parseInt(limit))
    //             .exec();
    
    //         // Đếm tổng số phim theo query
    //         const totalMovies = await Movie.countDocuments(query).exec();
    
    //         // Trả về kết quả
    //         return res.status(200).json({
    //             success: true,
    //             message: "Movies fetched successfully",
    //             data: data,
    //             totalMovies: totalMovies,
    //             page: parseInt(page),
    //             totalPage: Math.ceil(totalMovies / limit),
    //         });
    //     } catch (error) {
    //         console.error("Error fetching movies:", error);
    //         next(error);
    //     }
    // })
    
};

module.exports = searchController;
