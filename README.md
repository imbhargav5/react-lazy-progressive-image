<p align="center" ><img src=".github/Logo.png"/></p>
<h1 align="center">react-lazy-progressive-image</h1>

<hr/>

# :zap: Why?

Load low resolution/ placeholder image first and then load the actual image lazily when it's in the viewport.

<hr/>

# :zap: Installation

The package is available on npm.

```bash
npm i -s react-lazy-progressive-image
```

<hr/>

# :zap: Usage

Just like `react-progressive-image` this component expects exactly one child which has to be a function.

```javascript
import React, { Component } from "react";
import LazyImage from "react-lazy-progressive-image";

class App extends Component {
  render() {
    return (
      <LazyImage
        placeholder={"http://example.com/placeholder.png"}
        src={"http://example.com/src.png"}
      >
        {(src, loading, isVisible) => <img src={src} />}
      </LazyImage>
    );
  }
}
```

The child which is a function will have access to `src`, `loading` and `isVisible` values as arguments and the user can decide how to use those values to render image styles. (This pattern is called render props or children props pattern)

| Render prop | Description                                                                                      | Type    | Values                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------------------------------- |
| src         | The src of the image being rendered                                                              | String  | Initially points to the placeholder image, then loads image and will then point to the source image |
| loading     | Whether the image is currently being loaded                                                      | Boolean | true/false                                                                                          |
| isVisible   | Whether the image is currently visible in the page. This is managed by `react-visibility-sensor` | Boolean | true/false                                                                                          |

<hr/>

### Example usage with styled-components

You can use `styled-components`, to transition an image from the placeholder when the image has loaded.
You can use the `render props` as mentioned above and then use it to animate the `opacity` of the image from `0.2` to `1` when the image is loaded. This is , of course, a basic example. But you can use this logic to create more powerful animations.

For eg :

```javascript
import React, { Component } from "react";
import styled from "styled-components";
import LazyImage from "react-lazy-progressive-image";

const Image = styled.img`
  height: 450px;
  width: 800px;
  margin-top: 200px;
  display: block;
  transition: all 0.25s ease;
  opacity: ${props => (props.loading ? 0.2 : 1)};
`;

class Usage extends Component {
  render() {
    return (
      <LazyImage
        src={"/assets/imageURL"}
        placeholder={"/assets/placeholderURL"}
      >
        {(src, loading) => <Image src={src} loading={loading} />}
      </LazyImage>
    );
  }
}
```

<hr/>

## How was this package made 🔧

A good amount of code has been taken from <a href="https://github.com/FormidableLabs/react-progressive-image">react-progressive-image</a>, the additions being the usage of <a href="https://github.com/joshwnj/react-visibility-sensor">react-visibility-sensor</a> to check if there is a need to load the image and making sure that the image doesn't load in advance when it's not really needed.

<hr/>

### ✊ Improvements in the roadmap

* [ ] Loading images in browser cache directly instead of showing placeholder
* [ ] More Examples

<hr/>

## 🙏 Credits

1. <a href="https://github.com/FormidableLabs"> Formidable Labs </a>
2. <a href="https://github.com/joshwnj"> Josh Johnston </a>
