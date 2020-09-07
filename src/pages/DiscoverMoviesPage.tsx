// src/pages/DiscoverMoviesPage.tsx
import React, { useState } from "react";

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");

  const search = () => {
    console.log("TODO search movies for:", searchText);
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
