const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');




app.post('/api/register', (req, res) => {
    console.log('It is ready', );
    
    const { username, password } = req.body;
    
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error processing password');
        }
    })
    
    const query = 'INSERT INTO users (username, password)) VALUES (?,?)';
    const values = [username, hashedPassword];
    
    database.query(query, values, (err, result) => {
        if (err) {
            console.error('Error instering user into database');
            return res.status(500).send('Registration failed');
        } else {
            console.log('Registered successfully:', result);
            res.status(500).send('User registered');
    }
});
});


app.post('/api/login', (req, res) => {
    console.log('Details needed', );
    
    const { username, password } = req.body;
    
})

const query = 'SELECT * FROM users WHERE username = ?';

database.query(query, [username], (err, result) => {
    if (err) {
        console.error('Database error', err);
        return res.status(500).send('Database error');
    } 
    if (resource.length ===  0) {
        return res.status(400).send('Invalid username or password');
        
        const user = results[0];    }
        
    });
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            console.error('Error comparing password:', err);
            return res.status(500).send('Server error');
        }
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }
        req.session.userId = user.id;
        res.status(200).send('Login successful');
        
        const missionQuery = 'SELECT * FROM missions ORDER BY RAND() LIMIT 1';
    database.query(missionQuer, (err, missions) => {
        if (err) {
            console.error('Error fetching mission:', err)
            return res.status(500).send('Server error');
        }
        const mission = mission[0];
        
        res.json({
            message: 'Login succesful!',
            mission: mission.description,
            points: mission.rewards
        });
        
    });
});

// user profile route



app.get('/missions', (req, res) => {
    const query = 'SELECT * FROM missions WHERE completed = false';
    database.query(query, (err, missions) => {
        if (err) {
            console.error('Error fetching missions:', err);
            return res.status(500).send('Server error');
        }
        res.json(missions);
    });
});







app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Please log in');
    }
    res.send('Welcome to your profile');

    const profileQuery = 'SELECT username, ranks, points FROM users WHERE id = ?';
    database.query(profileQuery, [req.session.userId], (err, results) => {
        if (err) {
            console.error('Error fetching user profile:', err);
        return res.status(500).send('Server error');
           }
           if (results.length === 0) {
            return res.status(404).send('User not found');
           }
        const userProfile = results[0];

        // calculating points needed for next rank
        const pointsForNextRank = calculateNextRankPoints(userProfile.points);
        res.json({
            username: userProfile.username,
            rank: userProfile.rank,
            points: userProfile.points,
            pointsForNextRank
            
        
        });
    });
});


module.exports = router;