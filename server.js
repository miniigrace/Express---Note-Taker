const express = require('express');

const port = 3001 || process.env.PORT;

const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"))

app.use("/", htmlRoutes)
app.use("/api", apiRoutes)


app.listen(port, ()=>{console.log(`app running on ${port}`)})