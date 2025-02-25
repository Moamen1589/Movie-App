import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import '../Styles/slides.css'
import img from '../assets/images/play.png'
import '../Styles/pangination.css'
import FilmsButtons from "./FilmsButtons";
export default function TopRated() {
    const [data, setData] = useState(null)
    const [num, setNum] = useState(22)

    const navigate = useNavigate()
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
        }
    };
    const test = (event) => {

        if (Number(event.target.textContent)) {
            setNum(event.target.textContent)
        }
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${num}`, options)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => console.error(err));


    }, [num])

    if (!data) {
        return;
    }

    return (
        <>
            <h1 className="text-white text-center text-5xl my-8">Top Rated</h1>
            <Swiper
                slidesPerView={4}
                navigation
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1285: {
                        slidesPerView: 3,
                    },
                }}
                modules={[Navigation]}
                loop={true}
                className="parent  h-min flex justify-center mx-auto "
            >
                {data.results.map((film) => (
                    <SwiperSlide key={film.id} >
                        <div
                            className=" poster  relative  object-contain  w-65 hover:scale-110 duration-500 rounded-2xl cursor-pointer"
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`, backgroundSize: 'cover', height: '400px' }}
                            onClick={() => { navigate('/details', { state: { 'film': film } }) }}

                        >
                            <img src={img} className=" absolute w-24 z-10 hidden    top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2  " />
                            <div className=" w-full absolute opacity-0 hover:opacity-60 duration-250 h-full p-6 bg-black text-white rounded-lg "></div>
                        </div>
                        <div className=" mt-5 text-center" >
                            <h1 className=" text-2xl text-white">{film.title}</h1>
                            <h1 className="text-xl text-white ">({film.release_date.slice(0, 4)})</h1>
                            <h1 className=" text-xl text-white mt-3"> Vote : <FontAwesomeIcon className=" text-amber-300" icon={faStar} /> {film.vote_average.toFixed(1)}</h1>
                        </div>
                        <div className=" my-7">
                            <FilmsButtons film={film} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Stack spacing={4} className="pb-10">
                <Pagination count={10} variant="outlined" onClick={test} />
            </Stack>
        </>
    )
}