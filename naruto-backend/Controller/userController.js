const userModel = require('../Model/userModel');

const login = (req, res) => {
    const { username, password } = req.body; // getting username and password from the request body

    // .then is equivalent to resolve whereas .catch is equivalent to reject

    const user = userModel.login(username, password).then(user => {
       // if (user != null) {
       if (user) {
        req.session.userId = user.id;
        req.session.username = username;



            res.status(201).send('Succesfully logged user');  // responding with the newly created user data
        } else {
            res.status(500).send('Login not correct');

        }

    
        
        })
         .catch(err => res.status(500).send('Something went wrong'));  // handling err// catch and handle server errors.
};


const register = async (req, res) => {
    const { username, email, password } = req.body;  // getting username, email, and password

    // calling the userModel to insert a new user into the database
    const register = userModel.register(username, email, password).then(user => {
    
    res.status(201).send('Succesfully registered user');  // responding with the newly created user data

    
    })
     .catch(err => res.status(500).send('User already exists or something went wrong'));  // handling errors

};

// getting profile function  ---- with async which is equivalent to promise

const getProfile = async (req, res) => {
const userId = req.session.id;
const { profile } = req.body;
// .then(userId => {
    if (!userId) {
       return res.status(401).send('Unauthorized');
    }
   // calling userModel to fetch the user profile
    
  const returnUser = await userModel.getProfile(userId)

    if (!returnUser) {
        res.status(404).send('User not found'); // if user doesn't exist.
    } else {
        res.json(returnUser); // returning user's profile as JSON
    }
   
};

module.exports = { login, register, getProfile };
