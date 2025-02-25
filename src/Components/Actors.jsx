import { useEffect, useState } from 'react'
export default function Actors(props) {
    const [actors, setActors] = useState()
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.id}/credits`, options)
            .then(res => res.json())
            .then(res => setActors(res))
            .catch(err => console.error(err));
    }, [props.id])

    if (!actors) {
        return;
    }
    return (
        <>
            <div className='flex flex-wrap gap-10 justify-center my-12'>
                {actors.cast.slice(0, 7).map((actor) => (
                    <div className={actor.profile_path ? ' flex flex-col items-center' : 'hidden'} key={actor.cast_id}>
                        <div
                            className=" poster  relative   h-28 object-contain  w-24 hover:scale-110 duration-500 rounded-2xl cursor-pointer"
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${actor.profile_path})`, backgroundSize: 'cover' }}
                            key={actor.id}
                        >
                        </div>
                        <div className=" mt-5  text-center" >
                            <h1 className="text-xl text-white "> {actor.original_name} </h1>
                        </div>


                    </div>

                ))

                }
            </div>
        </>
    )
}
