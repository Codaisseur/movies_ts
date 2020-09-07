// src/pages/DiscoverMoviesPage.tsx
import React, { useState } from "react";

import MovieItem, { Movie } from "../components/MovieItem";

type ApiResult = {
  Response: "true";
  Search: Movie[];
  totalResults: string; // yeah, that's weird indeed
};

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiResult }
  | { status: "error"; error: any };

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });

  const search = async () => {
    console.log("Start searching for:", searchText);
    setState({ status: "loading" });

    // Best practice: encode the string so that special characters
    //  like '&' and '?' don't accidentally mess up the URL
    const queryParam = encodeURIComponent(searchText);
  
    // Option A: use the browser-native fetch function
    const data = await fetch(
      `https://omdbapi.com/?apikey=6a06f383&s=${queryParam}`
    ).then((r) => r.json());

    setState({ status: "success", data });

    console.log("Success!", data);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
      {state.status === "loading" && <p>Searching...</p>}
      {state.status === "success" && (
        <div>
          <h2>Search results</h2>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 -10px",
          }}>
            {state.data.Search.slice(0, 10).map(movie => {
              return <MovieItem key={movie.imdbID} movie={movie} />
            })}
          </div>
        </div>
      )}
    </div>
  );
}
