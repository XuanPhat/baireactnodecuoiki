const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const fileUpload = require('express-fileupload');

app.use(
  fileUpload({
    useTempFiles: true
  })
);
const http = require('http').createServer(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.get('/read', (req, res) => {
  res.send('Chao mongo');
});
const User = require('./Blog/controller/User');
app.use('/User', User);

// listen server
http.listen(3001, () => {
  console.log('Server running on port 3001...');
});
