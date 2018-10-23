import Bundler from "parcel-bundler";
import Path from "path";
import express from "express";
// Single entrypoint file location:
const entryFiles = Path.join(__dirname, "./index.html");
// OR: Multiple files with globbing (can also be .js)
// const entryFiles = './src/*.js';
// OR: Multiple files in an array
// const entryFiles = ['./src/index.html', './some/other/directory/scripts.js'];

// Bundler options
const options = {};

const app = express();

export function runBundle(app, port = 3002) {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);
  app.use(bundler.middleware());
  return new Promise((resolve, reject) => {
    const server = app.listen(port, err => {
      if (!err) {
        resolve(server);
      } else {
        reject(err);
      }
    });
  });
}

export default app;
