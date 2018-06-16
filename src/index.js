import React, { Component } from "react";
import PropTypes from "prop-types";
import VisibilitySensor from "react-visibility-sensor";

class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.image = null;
    this.state = {
      image: props.placeholder,
      isVisible: false,
      loading: true
    };
  }
  //
  // componentDidMount() {
  //   const { src } = this.props;
  //   this.loadImage(src);
  // }

  componentWillReceiveProps(nextProps) {
    const { src, placeholder } = nextProps;
    // We only invalidate the current image if the src has changed.
    if (src !== this.props.src) {
      this.setState({ image: placeholder, loading: true }, () => {
        // load the image if in viewport
        if (this.state.isVisible) {
          this.loadImage(src);
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = src => {
    // If there is already an image we nullify the onload
    // and onerror props so it does not incorrectly set state
    // when it resolves
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const image = new Image();
    this.image = image;
    image.onload = this.onLoad;
    image.onerror = this.onError;
    image.src = src;
  };

  handleVisibilityChange = isVisible => {
    this.setState(
      {
        isVisible: isVisible
      },
      () => {
        // load the image if it is visible and if it isn't already loaded
        if (this.state.loading && this.state.isVisible) {
          this.loadImage(this.props.src);
        }
      }
    );
  };

  onLoad = () => {
    // use this.image.src instead of this.props.src to
    // avoid the possibility of props being updated and the
    // new image loading before the new props are available as
    // this.props.
    this.setState({
      image: this.image.src,
      loading: false
    });
  };

  onError = errorEvent => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  };

  render() {
    const { image, loading, isVisible } = this.state;
    const { children, visibilitySensorProps } = this.props;
    if (!children || typeof children !== "function") {
      throw new Error(
        `LazyProgressiveImage requires a function as its only child`
      );
    }
    return (
      <VisibilitySensor
        {...visibilitySensorProps}
        onChange={this.handleVisibilityChange}
      >
        {children(image, loading, isVisible)}
      </VisibilitySensor>
    );
  }
}

LazyImage.propTypes = {
  children: PropTypes.func,
  onError: PropTypes.func,
  placeholder: PropTypes.string,
  src: PropTypes.string,
  visibilitySensorProps: PropTypes.any
}

export default LazyImage;