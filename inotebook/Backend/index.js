const connectTomongo=require('./db');
connectTomongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json()); //For using JSON data in the body

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
