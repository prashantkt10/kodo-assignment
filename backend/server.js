require('module-alias/register');
const express = require("express");
const getFeedRouter = require("./routes/feed");
const healthRouter = require("./routes/health");
const app = express();

app.use("/feed", getFeedRouter);
app.use("/health", healthRouter);

app.listen(8989, () => console.log('app has started...'));

