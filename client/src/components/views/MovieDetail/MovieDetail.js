import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './sections/MovieInfo';
import { Row } from 'antd'
import GridCards from '../commons/GridCards';
import Favorite from './sections/Favorite';
import { Button } from 'antd';

function MovieDetail(props) {

  let movieId = props.match.params.movieId; //url에 param으로 값을 넣었을때 컴포넌트에서 받는법
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)

  useEffect(() => {

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        setMovie(response)
      })

    fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
        setCasts(response.cast)
      })

  }, [])

  const toggleActorView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        discription={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>

        {/* Favorite Btn */}
        <Favorite
          movieInfo={Movie}
          movieId={movieId}
          userForm={localStorage.userId} // ★application -> local storage 정보 얻는법 // key:value로 저장되있는데 key값을 적어준다.★
        />

        {/* Movie Info */}
        <MovieInfo Movie={Movie} /><br />

        {/* Actors Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <Button onClick={toggleActorView}>Toggle Actor view</Button>
        </div>

        {ActorToggle &&
          <Row gutter={[16, 16]}> {/* 하위 요소의 마진 설정 방법 */}
            {Casts && Casts.map((cast, index) => (
              <React.Fragment key={index}>
                <GridCards
                  MoiveDetailPage
                  image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                  characterName={cast.name}
                >
                </GridCards>
              </React.Fragment>
            ))}
          </Row>
        }

      </div>
    </div>

  )
}

export default MovieDetail
