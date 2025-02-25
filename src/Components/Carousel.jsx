import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../Styles/LandCarousel.css'
import { Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Carousel() {
  const [data, setData] = useState(null)
 
  const navigate = useNavigate()
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_date.gte=2023-01-01&without_original_language=zh&page=1', options)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err));


  }, [])


  if (!data) {
    return ;
  }

  return (

    <Swiper
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      modules={[Navigation, Autoplay]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="land-swiper"
    >
      {data.results.map((film) => (
        <SwiperSlide key={film.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.backdrop_path})`, backgroundSize: 'cover' }} className="land-slide max-sm:bg-top">
          <div className=" h-full  flex items-center justify-center relative    " >
            <div className=" absolute opacity-60 w-full h-full bg-black "></div>
            <div className=" flex w-full h-full gap-8 absolute  left-30 max-sm:left-0  top-45 max-sm:top-15 max-sm:flex-col max-sm:items-center max-sm:text-center  max-sm:gap-0">
              <div
                className="  h-96 object-contain w-60 hover:scale-110 duration-500 rounded-2xl cursor-pointer"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`, backgroundSize: 'cover' }}
                onClick={() => {navigate('/details', { state: { 'film': film } })}}
              >
              </div>
              <div className="w-96 mt-5 max-sm:mt-2" >
                <h1 className=" text-4xl text-white max-sm:mt-2">{film.title}</h1>
                <h1 className="text-xl text-white mt-9 max-sm:mt-2">({film.release_date.slice(0,4)})</h1>
                <h1 className=" text-xl text-white mt-9 max-sm:mt-2"> Vote : <FontAwesomeIcon className=" text-amber-300" icon={faStar} /> {film.vote_average.toFixed(1)}</h1>
                <button 
                className=" bg-red-600 px-10 py-2 mt-16 max-sm:mt-7 text-white  rounded-sm cursor-pointer"
                onClick={() => {navigate('/details', { state: { 'film': film } })}}
                > <FontAwesomeIcon className=" mr-2 block" icon={faCirclePlay} />Watch Trailer</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
