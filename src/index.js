// @flow
import * as React from "react";
import VisibilitySensor from "react-visibility-sensor";

type Props = {
  children: (string, boolean, boolean) => React.Node,
  onError?: (errorEvent: Event) => void,
  placeholder: string,
  src: string
};

type State = {
  image: string,
  loading: boolean,
  isVisible: boolean
};

export default class LazyImage extends React.Component<Props, State> {
  image: HTMLImageElement;
  constructor(props: Props) {
    super(props);
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

  componentWillReceiveProps(nextProps: Props) {
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

  loadImage = (src: string) => {
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

  handleVisibilityChange = (isVisible: boolean) => {
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

  onError = (errorEvent: Event) => {
    const { onError } = this.props;
    if (onError) {
      onError(errorEvent);
    }
  };

  render() {
    const { image, loading, isVisible } = this.state;
    const { children } = this.props;
    if (!children || typeof children !== "function") {
      throw new Error(
        `LazyProgressiveImage requires a function as its only child`
      );
    }
    return (
      <VisibilitySensor onChange={this.handleVisibilityChange}>
        {children(image, loading, isVisible)}
      </VisibilitySensor>
    );
  }
}
