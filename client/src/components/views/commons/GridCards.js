import React from 'react'
import { Col } from 'antd'

function GridCards(props) {

  if (props.LandingPage) {
    return (
      // 1row = 24
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover'
              }}
              src={props.image}
              alt={props.movieName} />
          </a>
        </div>
      </Col>
    )
  }

  if (props.MoiveDetailPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img
            style={{
              width: '100%',
              height: '320px',
              objectFit: 'cover'
            }}
            src={props.image ? props.image : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'}
            alt={props.characterName} />
        </div>
      </Col>
    )
  }

}

export default GridCards
