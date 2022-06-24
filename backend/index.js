const connectToMongo=require('./db');

connectToMongo();

const express = require('express')
const port = 5000
//The port is changed from the 3000 to 5000 as the port 3000 is used for front-end

var cors=require('cors');
	var app=express();
	app.use(cors());
app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})