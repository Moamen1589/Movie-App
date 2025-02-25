import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react'
import { filmsContext } from '../Context/Context'
export default function FilmsButtons(props) {
  const { addFavoriteFilm, addWatchLater } = useContext(filmsContext)

  const favorite = () => {
    addFavoriteFilm(props.film)
    toast.success('Added To Favorites',{
      style:{position:'sticky'}
    })
  }
  const watchLater = () => {
    addWatchLater(props.film)
    toast.success('Added To Watch Later')
  }
  return (
    <>
      <button onClick={watchLater} className=" text-white bg-red-600 px-1 py-1 rounded-md mr-2.5 cursor-pointer"> <FontAwesomeIcon icon={faClock} /> Watch Later</button>
      <button onClick={favorite} className=" text-white bg-red-600 px-1 py-1 mt-3 rounded-md  cursor-pointer ">  <FontAwesomeIcon icon={faHeart} /> Add To Favourties</button>
      <Toaster/>
    </>
  )
}
