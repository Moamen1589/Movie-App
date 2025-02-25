import { useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Trailer from "./Trailer"
import Actors from "./Actors"
export default function FilmDetails() {
    const { film } = useLocation().state
    console.log(film)
    return (
        <>
            <div className="flex my-8   justify-center relative  " >
                <div className=" flex items-center gap-8 max-md:flex-col max-md:items-center  max-md:flex-1 relative  ">
                    <div
                        className="  h-96 object-contain w-60 hover:scale-110 duration-500 rounded-2xl cursor-pointer"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`, backgroundSize: 'cover' }}
                    >
                    </div>
                    <div className="w-96 mt-5 max-md:w-full max-md:text-center max-md:px-10" >
                        <h1 className=" text-4xl text-white">{film.title}({film.release_date.slice(0, 4)})</h1>
                        <h1 className=" text-xl text-white mt-9"> Vote : <FontAwesomeIcon className=" text-amber-300" icon={faStar} /> {film.vote_average.toFixed(1)}</h1>
                        <p className=" text-white mt-6">{film.overview}</p>
                    </div>
                </div>

            </div>
            <div className=" my-15">
                <h1 className="text-5xl text-white text-center my-7">Trailer</h1>
                <Trailer id={film.id} />
            </div>
            <h1 className="text-5xl text-white text-center my-7">Actors</h1>
            <Actors id={film.id} />

        </>
    )
}
