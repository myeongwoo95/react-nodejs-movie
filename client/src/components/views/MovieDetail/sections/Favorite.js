import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

  const movieId = props.movieId
  const userForm = props.userForm
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRuntime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  let variables = {
    userForm,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime
  }

  useEffect(() => {

    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber)
        } else {
          alert("Favorite 정보를 가져오는데 실패했습니다.")
        }
      })

    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        if (response.data.success) {
          setFavorited(response.data.Favorited)
        } else {
          alert("favorited 정보를 가져오는데 실패했습니다.")
        }
      })

  }, [])

  const onClickFavorite = () => {

    if (Favorited) {

      Axios.post('/api/favorite/remove', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1)
            setFavorited(!Favorited)
          } else {
            alert('Favorite Remove 실패')
          }
        })

    } else {

      Axios.post('/api/favorite/add', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1)
            setFavorited(!Favorited)
          } else {
            alert('Favorite add 실패')
          }
        })

    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite "} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite
