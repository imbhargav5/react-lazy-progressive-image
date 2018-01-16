<p align="center" ><img src=".github/Logo.png"/></p>
<h1 align="center">React Lazy Progressive Image</h1>
<p align="center">Load low resolution/ placeholder image first and then load the actual image lazily when it's in the viewport.</p>

# :zap: Installation

The package is available on npm.

```bash
npm i -s react-lazy-progressive-image
```

# :zap: Usage

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

### 🔨🔨 How was this package made

A good amount of code has been taken from <a href="https://github.com/FormidableLabs/react-progressive-image">react-progressive-image</a>, the additions being the usage of <a href="https://github.com/joshwnj/react-visibility-sensor">react-visibility-sensor</a> to check if there is a need to load the image and making sure that the image doesn't load in advance when it's not really needed.

### ✊ Improvements in the roadmap

[ ] Loading images in browser cache directly instead of showing placeholder
[ ] Examples

## 🙏 Credits

1. <a href="https://github.com/FormidableLabs"> Formidable Labs </a>
2. <a href="https://github.com/joshwnj"> Josh Johnston </a>
