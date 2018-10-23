import React from "react";
import { render } from "react-dom";
import LazyImage from "../src";
import Placeholder from "./placeholder.jpg";
import Src from "./scenery.jpg";

const App = () => {
  return (
    <>
      <h1> Hello LazyImage </h1>
      <div style={{ backgroundColor: "dodgerblue", height: 2000 }} />
      <LazyImage src={Src} placeholder={Placeholder}>
        {(src, loading, isVisible) => (
          <img
            id="scenery-img"
            src={src}
            className={loading ? "loading" : "loaded"}
          />
        )}
      </LazyImage>
    </>
  );
};
render(<App />, document.getElementById("app"));
