import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios';

const DetailPage = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      console.log('response',response.data);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId])
  
  const getGenres = (movie) => {
    if(movie.genres) {
      return movie.genres.map(genre => genre.name).join(", ")
    }
    return ""
  }

  if(!movie) return null;

  return (
    <section>
      <img 
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="img"
      />
      <h1 className="modal__title">{movie.title || movie.name}</h1>
      <div className="modal__genres">장르: {getGenres(movie)}</div>
      <div className="modal__release-date">상영일자: {movie.release_date}</div>

      
    </section>
  )
}

export default DetailPage