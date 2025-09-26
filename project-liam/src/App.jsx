import { useState } from 'react'
import './App.css'

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [movies, setMovies] = useState([])
  const sidebarClass = collapsed ? "sidebar collapsed" : "sidebar"
  const mainContent = collapsed ? "main-content collapsed" : "main-content"
  const sidebarItemText = collapsed ? 'sidebar-item-text collapsed' : "sidebar-item-text"

  const API_KEY = "6f93b982019288912d7d64d63743295f"
  
  const fetchPopularMovies = async () => {
     try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json()
        const top_ten = []
        for (let i = 0; i < 10; i++) {
          const data = result.results[i]
          const my_dict = {}
          my_dict['image'] = `https://image.tmdb.org/t/p/w500${data.poster_path}`
          my_dict['title'] = data.original_title
          top_ten.push(my_dict)
        }
        setMovies(top_ten)
        console.log(top_ten)
        } catch (err) {
        console.error("Failed to fetch posts", err)
        }
    }

  const fetchMovieGenre = async (genre_id) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre_id}&sort_by=popularity.desc&page=1&language=en-US`)
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`)
      }
      const result = await response.json()
      const top_ten = []
      for (let i = 0; i < 10; i++) {
        const data = result.results[i]
        const my_dict = {}
        my_dict['image'] = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        my_dict['title'] = data.original_title
        top_ten.push(my_dict)
      }
      setMovies(top_ten)
    }
    catch (err) {
        console.error("Failed to fetch posts", err)
        }
  }

   
  const displayFilms = (movie) => {
    return (
      <div key={movie.id} className='content-box'>
        <a className='content-box-title'>{movie.title}</a>
        <img className='content-box-poster' src={movie.image}></img>
      </div>
    )}





  return (
    <div className="app">
      <div className={sidebarClass}>
        <button className="sidebar-collapse-button" onClick={ () => setCollapsed(!collapsed)}></button>
        <div className="sidebar-content">
          <div className="sidebar-item">
            <button className="sidebar-button" onClick={() => fetchPopularMovies("popular")}></button>
            <a className={sidebarItemText}>Ratings</a>
          </div>
          <div className="sidebar-item">
            <button className="sidebar-button" onClick={ () => fetchMovieGenre("28")}></button>
            <a className={sidebarItemText}>Action</a>
          </div>
          <div className="sidebar-item">
            <button className="sidebar-button" onClick={ () => fetchMovieGenre("35")}></button>
            <a className={sidebarItemText}>Comedy</a>
          </div>
          <div className="sidebar-item">
            <button className="sidebar-button" onClick={ () => fetchMovieGenre("27")}></button>
            <a className={sidebarItemText}>Horror</a>
          </div>
        </div>
      </div>
      <div className={mainContent}>
        <div className="content-header">
          <h1 className='title'>The Movie Website</h1>
        </div>
        <div className="content-apps">
          {movies.map(displayFilms)}
        </div>
      </div>
    </div>
  )
}

export default App
