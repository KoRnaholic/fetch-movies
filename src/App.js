import { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const response = await fetch(
      "https://react-46d94-default-rtdb.firebaseio.com/movies.json"
    );
    const data = await response.json();

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseData: data[key].releaseData,
      });
    }

    setMovies(loadedMovies);
  }

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-46d94-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>

      <section>
        <MoviesList movies={movies} />
      </section>
    </Fragment>
  );
}

export default App;
