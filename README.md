<p align="center" ><img src=".github/Logo.png"/></p>
<h1 align="center">React Lazy Progressive Image</h1>
<p align="center">Load low resolution/ placeholder image first and then load the actual image lazily when it's in the viewport.</p>

# :zap: Installation

The package is available on npm.

```bash
npm i -s react-lazy-progressive-image
```

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
        {(src, loading) => <img src={src} />}
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

### 🔨🔨 How was this package made

A good amount of code has been taken from <a href="https://github.com/FormidableLabs/react-progressive-image">react-progressive-image</a>, the additions being the usage of <a href="https://github.com/joshwnj/react-visibility-sensor">react-visibility-sensor</a> to check if there is a need to load the image and making sure that the image doesn't load in advance when it's not really needed.

### ✊ Improvements in the roadmap

* [ ] Loading images in browser cache directly instead of showing placeholder
* [ ] More Examples

## 🙏 Credits

1. <a href="https://github.com/FormidableLabs"> Formidable Labs </a>
2. <a href="https://github.com/joshwnj"> Josh Johnston </a>
