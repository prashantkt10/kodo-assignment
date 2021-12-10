require('module-alias/register');
const express = require("express");
const app = express();
const getFeedRouter = require("./routes/feed");

app.use("/feed", getFeedRouter);

app.listen(8989, () => console.log('app has started...'));

