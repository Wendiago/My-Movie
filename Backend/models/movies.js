const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    tmdb_id: { type: Number, required: true, unique: true }, // ID từ TMDB
    adult: { type: Boolean, required: true }, // Nội dung dành cho người lớn
    backdrop_path: { type: String }, // Đường dẫn ảnh nền
    belongs_to_collection: { // Bộ sưu tập (nếu có)
        id: { type: Number },
        name: { type: String },
        poster_path: { type: String },
        backdrop_path: { type: String },
    },
    budget: { type: Number }, // Ngân sách sản xuất phim
    categories: [{ type: String }], // Các danh mục (ví dụ: popular, now_playing)
    genres: [{ // Danh sách thể loại
        id: { type: Number },
        name: { type: String },
    }],
    homepage: { type: String }, // Trang web chính thức của phim
    imdb_id: { type: String }, // ID phim trên IMDB
    origin_country: [{ type: String }], // Các quốc gia gốc
    original_language: { type: String }, // Ngôn ngữ gốc
    original_title: { type: String }, // Tựa đề gốc
    overview: { type: String }, // Mô tả nội dung
    popularity: { type: Number }, // Mức độ phổ biến
    poster_path: { type: String }, // Đường dẫn ảnh poster
    production_companies: [{ // Danh sách các công ty sản xuất
        id: { type: Number },
        logo_path: { type: String },
        name: { type: String },
        origin_country: { type: String },
    }],
    production_countries: [{ // Danh sách các quốc gia sản xuất
        iso_3166_1: { type: String },
        name: { type: String },
    }],
    release_date: { type: String }, // Ngày phát hành
    revenue: { type: Number }, // Doanh thu
    runtime: { type: Number }, // Thời lượng (phút)
    spoken_languages: [{ // Các ngôn ngữ được nói
        english_name: { type: String },
        iso_639_1: { type: String },
        name: { type: String },
    }],
    status: { type: String }, // Trạng thái phim (Released, Post Production,...)
    tagline: { type: String }, // Tagline của phim
    title: { type: String, required: true }, // Tên phim
    video: { type: Boolean }, // Có video trailer hay không
    vote_average: { type: Number }, // Điểm đánh giá trung bình
    vote_count: { type: Number }, // Tổng số lượt đánh giá
    credits: {
        id: { type: Number, required: true },
        cast: [
          {
            adult: { type: Boolean, required: true },
            gender: { type: Number }, // 0: Unknown, 1: Female, 2: Male
            id: { type: Number, required: true },
            known_for_department: { type: String }, // Ex: Acting, Writing, Directing
            name: { type: String, required: true },
            original_name: { type: String, required: true },
            popularity: { type: Number },
            profile_path: { type: String }, // Relative path to profile image
            cast_id: { type: Number },
            character: { type: String }, // Role played by the actor
            credit_id: { type: String },
            order: { type: Number }, // Display order of the actor in credits
          },
        ],
        crew: [
          {
            adult: { type: Boolean, required: true },
            gender: { type: Number },
            id: { type: Number, required: true },
            known_for_department: { type: String }, // Ex: Directing, Production
            name: { type: String, required: true },
            original_name: { type: String, required: true },
            popularity: { type: Number },
            profile_path: { type: String }, // Relative path to profile image
            credit_id: { type: String },
            department: { type: String }, // Ex: Production, Directing
            job: { type: String }, // Specific job role, e.g., Director, Producer
          },
        ],
      },
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;
