// src/pages/DiscoverMoviesPage.tsx
import React, { useState, useEffect } from "react";

import MovieItem, { Movie } from "../components/MovieItem";
import { useHistory, useParams } from "react-router-dom";

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
  const history = useHistory();
  const routeParams = useParams<{ searchText: string }>();

  const [searchText, setSearchText] = useState("");
  const [state, setState] = useState<SearchState>({ status: "idle" });

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  useEffect(() => {
    async function fetchData() {
      if (!routeParams.searchText) {
        setState({ status: "idle" });
        return;
      }

      setState({ status: "loading" });

      const queryParam = encodeURIComponent(routeParams.searchText);
      const data = await fetch(
        `https://omdbapi.com/?apikey=6a06f383&s=${queryParam}`
      ).then((r) => r.json());

      setState({ status: "success", data });
    }
    fetchData();
  }, [routeParams.searchText]);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button onClick={navigateToSearch}>Search</button>
      </p>
      {state.status === "idle" && <p>Type in a search term and click "Search" to start...</p>}
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
