import React, { useEffect, useState } from 'react'
import { faCode } from "react-icons/fa";
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd'
import { Button } from 'antd';

function LandingPage() {

  const [Movies, setMovies] = useState([])
  const [MainMoiveImage, setMainMovieImage] = useState(null)
  const [CurrentPage, setCurrentPage] = useState(0)

  useEffect(() => {

    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&include_adult=false&&page=${CurrentPage + 1}`;
    fetchMovies(endpoint)

  }, [])

  const fetchMovies = (endpoint) => {

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setMovies([...Movies, ...response.results])
        setMainMovieImage(response.results[0])
        setCurrentPage(response.page)
      })
      .catch(error => console.log(error));
  }

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&include_adult=false&&page=${CurrentPage + 1}`;
    fetchMovies(endpoint)
  }

  return (
    <div style={{ width: '100%', margin: '0' }}>

      {/* {Main image} */}
      {MainMoiveImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMoiveImage.backdrop_path}`}
          title={MainMoiveImage.original_title}
          discription={MainMoiveImage.overview}
        />
      }

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Moives by latest</h2>
        <hr />

        {/* {Moive Grid Cards} */}
        <Row gutter={[16, 16]}> {/* 하위 요소의 마진 설정 방법 */}
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards
                LandingPage
                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                movieId={movie.id}
                movieName={movie.original_title}
              >
              </GridCards>
            </React.Fragment>
          ))}
        </Row>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={loadMoreItems}>Load More</Button>
      </div>
    </div >

  )
}

export default LandingPage