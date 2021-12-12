require('module-alias/register');
const express = require("express");
const cors = require("cors");
const getFeedRouter = require("./routes/feed");
const healthRouter = require("./routes/health");
const app = express();

app.use(cors());

app.use("/feed", getFeedRouter);
app.use("/health", healthRouter);

app.listen(8989, () => console.log('app has started...'));

