const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
  Favorite.find(({ "movieId": req.body.movieId }))
    .exec((err, info) => {
      if (err) return res.status(400).send(err)

      res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

router.post('/favorited', (req, res) => {
  Favorite.find(({ "movieId": req.body.movieId, "userForm": req.body.userForm }))
    .exec((err, info) => {
      if (err) return res.status(400).send(err)

      let result = false
      if (info.length != 0) {
        result = true
      }

      res.status(200).json({ success: true, Favorited: result })
    })
})

router.post('/remove', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userForm: req.body.userForm })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true })
    })
})

router.post('/add', (req, res) => {
  const favorite = new Favorite(req.body)

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true })
  })
})



module.exports = router;
