import React, { createContext, useState } from 'react'

export const filmsContext = createContext()

export default function Context(props) {

  const [selectedFavorite, setFavorite] = useState([])
  const [selectedWatchLater, setWatchLater] = useState([])

  const addFavoriteFilm = (film) => {
    setFavorite((prev) => [...prev, film])
  }

  const addWatchLater = (film) => {
    setWatchLater((prev) => [...prev, film])
  }

  return (
    <filmsContext.Provider value={{ selectedFavorite, selectedWatchLater, addFavoriteFilm, addWatchLater }}>
      {props.children}
    </filmsContext.Provider>
  )
}
