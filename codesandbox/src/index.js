import React, { Component } from "react";
import LazyImage from "react-lazy-progressive-image";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  render() {
    return (
      <>
        <div style={{ backgroundColor: "grey", height: "100vh" }}>
          <h1>Scroll down</h1>
        </div>
        <LazyImage
          src={`https://raw.githubusercontent.com/imbhargav5/react-lazy-progressive-image/master/example/scenery.jpg`}
          placeholder={`https://raw.githubusercontent.com/imbhargav5/react-lazy-progressive-image/master/example/placeholder.jpg`}
        >
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
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
