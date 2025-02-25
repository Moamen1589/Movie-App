import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'
import img from '../assets/images/play.png'
import '../Styles/collectionFilms.css'
import FilmsButtons from './FilmsButtons'
export default function CollectionFilms(props) {
    const [data, setData] = useState()
    const [num, setNum] = useState(1)
    const navigate = useNavigate()

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${props.id}&page=${num}`, options)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => {
                console.error('Failed to fetch movies:', error);
            });
    }, [props.id, num])

    const test = (event) => {

        if (Number(event.target.textContent)) {
            setNum(event.target.textContent)
        }
    }


    if (!data) {
        return;
    }
    return (
        <>
            <Stack spacing={4} >
                <Pagination count={10} variant="outlined" onClick={test} />
            </Stack>

            <div className='collection-films'>
                {data.results.map((film) => (
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

                            <div>
                                <FilmsButtons film ={film} />
                            </div>

                        </div>
                    </>

                ))

                }

            </div>
        </>
    )
}
