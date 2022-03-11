import React from "react";
import Gif from "./Gif";
import { useEffect, useState } from "react";
import getGifs from "../services/getGifs";
import "./Loading.css";

export default function ListOfGifs({ params }) {
  // const [loading, setLoading] = useState(false);
  // const [gifs, setGifs] = useState([]);
  const [gifsState, setGifsState] = useState({ loading: false, gifs: [] });
  const { keyword } = params;

  useEffect(() => {
    setGifsState((prevState) => {
      return { ...prevState, loading: true };
    });
    getGifs({ keyword }).then((gifs) => {
      setGifsState({ loading: false, gifs: gifs });
    });
  }, [keyword]);

  if (gifsState.loading) {
    return (
      <div>
        <div className="fulfilling-square-spinner">
          <div className="spinner-inner">{console.log("render de loader")}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {gifsState.gifs.map(({ title, url, import_datetime }) => (
        <Gif
          key={url}
          title={title}
          url={url}
          import_datetime={import_datetime}
        />
      ))}
    </div>
  );
}
