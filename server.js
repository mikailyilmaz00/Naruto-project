const express = require('express');
const app = express();
const cors = require ('cors');
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const pointRoute = require('./Route/pointRoute');
const userRoute = require('./Route/userRoute');

// importing route files

 // const userRoutes = require('./Route/route');



app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized:false,
//     cookie: { secure: false }
// }));

app.use(bodyParser.json());

// newer and simplified route handling 
app.use('/api/v1', pointRoute);

app.use('/api/v1', userRoute);


// error handling route
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
 
});

