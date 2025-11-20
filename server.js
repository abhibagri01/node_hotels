// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt' ,'Hi' + user.username + '!\n' , ()=>{
//     console.log('file is created')
// } );

// console.log(fs);     // to know funtionality of fs


//                           // import file in node js
// const notes = require('./notes.js');


// console.log('server file is available');
// var age = notes.age;
// var result = notes.addNumber(age+18 , 10);
// console.log(age);
// console.log('result is now' + result);



//         // lodash package in nodejs
// const _ = require('lodash');         // lodash package in nodejs

// var data = ["person", "person" , 1 ,2 ,1, 2 , 'name' , 'age' , '2'];
// var filter = _.uniq(data);
// console.log(filter);



// create a server
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello, Abhinav! Your Node.js app is running 🚀');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
// server is placed at 4000 port