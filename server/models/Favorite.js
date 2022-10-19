const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
  userForm: {
    type: Schema.Types.ObjectId,
    ref: 'User' // ref로 하나의 정보로 User의 모든 정보를 가져올 수 있다.
  },

  movieId: {
    type: String
  },

  movieTitle: {
    type: String
  },

  moviePost: {
    type: String
  },

  moiveRuntime: {
    type: String
  }

}, { timestamps: true }) // 자동으로 생성날짜를 넣어준다.

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }