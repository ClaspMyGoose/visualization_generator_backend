const express = require('express'); 
const multer = require('multer');
const path = require('path');


const server = express(); 

const port = process.env.SERVER_PORT || 8080

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})


const upload = multer({storage: fileStorage}); 


server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})


server.get('/', (req, res, next) => {

  res.send('<h1>Listening...</h1>')


})



server.post('/upload', upload.single('data'), (req, res) => {
  

  res.send('working');

})

server.listen(port)