import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { filmsContext } from "../Context/Context"
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import img from '../assets/images/play.png'
export default function WatchLater() {
  const { selectedWatchLater } = useContext(filmsContext)
  const navigate = useNavigate()
  console.log(selectedWatchLater)

  return (
<>
<h1 className=" text-5xl text-white text-center mt-10">Watch Later</h1>
<div className='collection-films'>
      {selectedWatchLater.map((film) => (
        <>

          <div className={film.poster_path ? ' flex flex-col items-center' : 'hidden'} key={film.id}>
            <div
              className=" poster  relative   h-96 object-contain w-60 hover:scale-110 duration-500 rounded-2xl cursor-pointer"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`, backgroundSize: 'cover' }}
              onClick={() => { navigate('/details', { state: { 'film': film } }) }}
              key={film.id}
            >
              <img src={img} className=" absolute w-24 z-10 hidden top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2  " />
              <div className=" w-full absolute opacity-0 hover:opacity-60 duration-250 h-full p-6 bg-black text-white rounded-lg "></div>
            </div>
            <div className=" mt-5  text-center" >
              <h1 className="text-xl text-white "> {film.title} ({film.release_date.slice(0, 4)})</h1>
              <h1 className=" text-xl text-white mt-3"> Vote : <FontAwesomeIcon className=" text-amber-300" icon={faStar} /> {film.vote_average.toFixed(1)}</h1>
            </div>
              <button
                className=" bg-red-600 px-10 py-2 mt-5 max-sm:mt-7 text-white  rounded-sm cursor-pointer"
                onClick={() => { navigate('/details', { state: { 'film': film } }) }}
              > <FontAwesomeIcon className=" mr-2 block" icon={faCirclePlay} />Watch Trailer</button>
          </div>
        </>

      ))

      }

    </div >
</>
  )
}
