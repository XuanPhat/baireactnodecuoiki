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

// const Friend = require('./Friend/index');
// const Point = require('./Transcript/index');

// app.use('/friend', Friend);
// app.use('/Point', Point);

// const Blog = require('./Blog/controller/post');
// // Blog MERN
// app.use('/Blog', Blog);
// // Product MERN
// const product = require('./Product/controller/product');
// const category = require('./Product/controller/category');
// const Auth = require('./Product/controller/auth');
// const Cart = require('./Product/controller/cart');
// const Paypal = require('./Product/controller/paypal');
// const Image = require('./Product/controller/Uploadimage/upload');
// const Comment = require('./Product/controller/comment');
// app.use('/product', product);
// app.use('/category', category);
// app.use('/cart', Cart);
// // Authentication
// app.use('/auth', Auth);
// // Paypal
// app.use('/paypal', Paypal);
// // Upload images
// app.use('/image', Image);

const Blog = require('./Blog/controller/post');
app.use('/Blog', Blog);

// listen server
http.listen(3001, () => {
  console.log('Server running on port 3001...');
});
