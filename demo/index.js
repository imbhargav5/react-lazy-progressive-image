import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import LazyImage from "../src";
import placeholderURL from "./images/placeholder.png";
import image1URL from "./images/1.jpg";
import image2URL from "./images/2.jpg";
import image3URL from "./images/3.jpg";
import image4URL from "./images/4.jpg";
import image5URL from "./images/5.jpg";

const images = [image1URL, image2URL, image3URL, image4URL, image5URL];

const Image = styled.img`
  height: 450px;
  width: 800px;
  margin-top: 200px;
  display: block;
  transition: all 0.25s ease;
  opacity: ${props => (props.loading ? 0.2 : 1)};
`;

class Home extends Component {
  state = {
    imgIndex: 0
  };
  changeImage = () => {
    this.setState({
      imgIndex:
        this.state.imgIndex < images.length - 1 ? this.state.imgIndex + 1 : 0
    });
  };
  render() {
    return (
      <div>
        <LazyImage src={image1URL} placeholder={placeholderURL}>
          {(src, loading) => <Image src={src} loading={loading} />}
        </LazyImage>
        <LazyImage src={image2URL} placeholder={placeholderURL}>
          {(src, loading) => <Image src={src} loading={loading} />}
        </LazyImage>
        <LazyImage
          src={images[this.state.imgIndex]}
          placeholder={placeholderURL}
        >
          {(src, loading) => <Image src={src} loading={loading} />}
        </LazyImage>
        <button onClick={this.changeImage}>Change Image</button>
        <LazyImage src={image4URL} placeholder={placeholderURL}>
          {(src, loading) => <Image src={src} loading={loading} />}
        </LazyImage>
        <LazyImage src={image5URL} placeholder={placeholderURL}>
          {(src, loading) => <Image src={src} loading={loading} />}
        </LazyImage>
      </div>
    );
  }
}

render(<Home />, document.getElementById("app"));
