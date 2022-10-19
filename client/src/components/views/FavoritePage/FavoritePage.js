import Axios from 'axios'
import React, { useEffect } from 'react'
import './favorite.css'

function FavoritePage() {

  useEffect(() => {
    Axios.post('/api/favorite/getFavoriteMoive', { userForm: localStorage.getItem('userId') })
  }, [])

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Moives</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>

        <tbody>

        </tbody>
      </table>

    </div>
  )
}

export default FavoritePage
