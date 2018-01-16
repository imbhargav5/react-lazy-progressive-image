import React, { Component } from "react";
import { render } from "react-dom";
import styled, { injectGlobal } from "styled-components";
import LazyImage from "../src";
import placeholderURL from "./images/placeholder.png";
import image1URL from "./images/1.jpg";
import image2URL from "./images/2.jpg";
import image3URL from "./images/3.jpg";
import image4URL from "./images/4.jpg";
import image5URL from "./images/5.jpg";

injectGlobal`
  body{
    padding : 120px 20px;
    font-family: sans-serif;
  }
`;

const images = [image1URL, image2URL, image3URL, image4URL, image5URL];

const Image = styled.img`
  height: 300px;
  width: 300px;
  border-radius: 5px;
  display: block;
  transition: all 0.25s ease;
  opacity: ${props => (props.loading ? 0.2 : 1)};
  &:not(:first-child) {
    margin-top: 40px;
  }
`;

const ChangeImgButton = styled.button`
  padding: 12px;
  outline: none;
  background: royalblue;
  border: 1px solid lightblue;
  margin-top: 8px;
  cursor: pointer;
  color: white;
  font-size: 12px;
  border-radius: 5px;
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
        <ChangeImgButton onClick={this.changeImage}>
          Change Image
        </ChangeImgButton>
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
