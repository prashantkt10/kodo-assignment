require('module-alias/register');
const express = require("express");
const cors = require("cors");
const getFeedRouter = require("./routes/feed");
const app = express();

app.use(cors());

app.use("/feed", getFeedRouter);

app.listen(8989, () => console.log('app has started...'));

