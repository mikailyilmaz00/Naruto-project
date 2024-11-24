const login = (req, res) => {
    const { username, password } = req.body; // getting username and password from the request body

    // .then is equivalent to resolve whereas .catch is equivalent to reject

    userModel.login(username, password)
        .then(user => {
            if (user) {
                req.session.userId = user.id; // storing user ID in session for authentication.
                res.status(200).json(user);  // responding with user data.
            } else {
                res.status(400).send('Invalid credentials'); // invalid login attempt.
            }
        })
        .catch(err => res.status(500).send('Server error')); // catch and handle server errors.
};


const register = (req, res) => {
    const { username, email, password } = req.body;  // getting username, email, and password

    // calling the userModel to insert a new user into the database
    userModel.register(username, email, password)
        .then(user => {
            res.status(201).json(user);  // responding with the newly created user data
        })
        .catch(err => res.status(500).send('Server error'));  // handling errors
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
