import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type MovieData = {
  Title: string;
  Poster: string; // a url
  Director: string;
  Language: string;
  Plot: string;
  Genre: string; // comma-separated...
  Year: string;
  imdbID: string;
  imdbRating: string;
};

export default function MoviePage() {
  const routeParams = useParams<{ imdbID: string }>();
  console.log(routeParams);

  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    async function fetchData() {
      // Option A: use the browser-native fetch function
      const data = await fetch(
        `https://omdbapi.com/?apikey=6a06f383&i=${routeParams.imdbID}`
      ).then((r) => r.json());

      setMovieData(data);
    }
    fetchData();
  }, [routeParams.imdbID]);

  console.log(movieData);

  return (
    <div style={{ padding: "20px" }}>
      {movieData ? (
        <div>
          <h1>{movieData.Title}</h1>
          <p>{movieData.Genre}</p>
          <div style={{ display: "flex" }}>
            <img src={movieData.Poster} alt={movieData.Title} />
            <div style={{ marginLeft: "20px" }}>
              <dl>
                <dt>Director</dt>
                <dd>{movieData.Director}</dd>
              </dl>
              <dl>
                <dt>Language</dt>
                <dd>{movieData.Language}</dd>
              </dl>
              <dl>
                <dt>Plot</dt>
                <dd>{movieData.Plot}</dd>
              </dl>
              <dl>
                <dt>IMDB Rating</dt>
                <dd>{movieData.imdbRating}</dd>
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
