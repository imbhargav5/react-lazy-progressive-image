require("@babel/register");
const app = require("./app");
app.runBundle(app.default);
