import React from "react";

export type Movie = {
  Title: string;
  Poster: string; // a url
  Type: string; // e.g. "movie"
  Year: string; // yep, a string instead of a number :|
  imdbID: string;
};

type Props = {
  movie: Movie;
};

export default function MovieItem({ movie }: Props) {
  return (
    <div
      style={{
        width: "25%",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div><strong>{movie.Title}</strong> ({movie.Year})</div>
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
