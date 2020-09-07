// src/pages/DiscoverMoviesPage.tsx
import React, { useState } from "react";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any } // todo: specify the data type too
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
      `https://omdbapi.com/?apikey=b3d9013d&s=${queryParam}`
    ).then((r) => r.json());

    setState({ status: "success", data });

    console.log("Success!", data);
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
    </div>
  );
}
