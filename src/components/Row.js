import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import './Row.css';
import { Pagination, Scrollbar, A11y, Navigation } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MovieModal from './MovieModal';

function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async() => {
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };
    
    return (
    <section className='row'>
        <h2>{title}</h2>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true} 
        breakpoints={{
            1378: {
                slidesPerView: 6, // 한번에 보이는 슬라이드 개수
                slidesPerGroup: 6, // 몇개씩 슬라이드 할지
            },
            998: {
                slidesPerView: 5,
                slidesPerGroup: 5,
            },
            625: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            0: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }} 
        >
            <div id={id} className='row__posters'>
                {movies.map((movie) => (
                    <SwiperSlide>
                    <img 
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${
                            isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                    </SwiperSlide>
                ))}
            </div>
            </Swiper>
            {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
    </section>
    );
}

export default Row;