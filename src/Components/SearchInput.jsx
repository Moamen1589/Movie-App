import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function SearchInput() {

    const [films, setFilms] = useState()
    const navigate = useNavigate()
    const [showInput, setInput] = useState(false)
    const inputRef = useRef()

    const movieName = (movieName) => {
        setInput(true)
        if (!inputRef.current.value) {
            setInput(false)
        }
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}`, options)
            .then(res => res.json())
            .then(res => setFilms(res))
    }

    const appearInput = () => {
        if (showInput) {
            setInput(false)
        } else {
            setInput(true)
        }
    }


    const navigateToDetails = (movie) => {
        navigate('details', { state: { 'film': movie } })
        setInput(false)
    }


    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
        }
    };


    useEffect(() => {
        fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => setFilms(res))
            .catch(err => console.error(err));
    }, [])


    if (!films) {
        return;
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search On Movie"
                className={showInput ? " w-full px-4 py-2 bg-white fixed  left-0 m-auto top-20   border-2 border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white" : " w-96 px-4 py-2  max-lg:!hidden  bg-white  border-2 border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white"}
                onChange={(e) => movieName(e.target.value)}
                ref={inputRef}
            />
            {showInput ? <FontAwesomeIcon onClick={appearInput} className="bg-red-600 text-black text-2xl p-2 rounded-sm  min-lg:!hidden " icon={faX} /> : <FontAwesomeIcon onClick={appearInput} className="bg-red-600 text-black text-2xl p-2 rounded-sm  min-lg:!hidden  " icon={faMagnifyingGlass} />}

            <div className={showInput? " absolute w-full right-0 top-32 z-10  " : " absolute w-xl right-0 top-15 z-10 hidden "}  >

                <div className={" flex flex-col gap-2 p-3  bg-white w-full h-96  overflow-y-scroll "} >
                    {films.results.map((movie) => (
                        <>
                            <div
                                className={movie.adult == true ? 'hidden' : " py-1 border-b border-b-gray-300 hover:bg-gray-300 cursor-pointer"}
                                key={movie.id}
                                onClick={() => navigateToDetails(movie)}
                            >
                                <img
                                    className="w-10 inline"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}

                                />
                                <span className="ml-4">{movie.title}</span>
                            </div>
                        </>
                    ))}

                </div>
            </div>
        </>
    )
}
