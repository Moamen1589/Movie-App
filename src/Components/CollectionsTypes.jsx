import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilm } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import CollectionFilms from "./CollectionFilms"

export default function CollectionsTypes() {
    const [data, setData] = useState()
    const [typeId, setTypeId] = useState(28)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjliZDE1NGE3MGU0ZTZlMGM0NGFiYTIzYzEyNjY1YSIsIm5iZiI6MTczODIyMzk5Ny4xMDgsInN1YiI6IjY3OWIzMTdkYjIzNjI5ZTdmOGZiZDAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6aD1Ix2XrAjBGGdinFcj1c4CdJMPl0w5km72Jov0DS8'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => console.error(err));
    }, [])
    const test = (id) => {
        setTypeId(id)
    }


    if (!data) {
        return;
    }
    return (
        <>
            <h1 className=" text-white text-4xl text-center mt-10"><FontAwesomeIcon icon={faFilm} /> Collections</h1>
            <div className=" w-full flex  flex-wrap justify-center m-auto  gap-5 my-12">
                {data.genres.map((type) => (
                    <>
                        <button onClick={() => test(type.id)} className={type.name=='Romance' ||type.name=='Drama' ? 'hidden' : " bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"}>{type.name}</button>
                    </>

                ))

                }

            </div>
            <CollectionFilms id={typeId} />
        </>
    )
}
