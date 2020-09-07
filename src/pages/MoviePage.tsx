import React from "react";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const routeParams = useParams<{ imdbID: string }>();
  console.log(routeParams);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie: ...</h1>
      <pre>{JSON.stringify(routeParams)}</pre>
    </div>
  );
}
