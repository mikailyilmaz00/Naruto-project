const database = require('../databaseSetup.js');
const mysql = require('mysql2');
const db = mysql


const login = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        database.query(query, [username, password], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) resolve(null); //means no user found
            else resolve(results[0]); // return user data if login is succesful

        });
    });
};

// registering a new user

const register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, email, password, rank, points) VALUES (?, ?, ?, "Genin", 0)';
        database.query(query, [username, email, password], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, username, email, rank: "Genin", points: 0 }); // responding with new user data
        });
    });
};

// fetching user's profile

const getProfile = (userId) => {
    return new Promise((RESOLVE, REJECT) => {
        const query = 'SELECT username, rank, points FROM users WHERE id = ?';
        database.query(query, [userId], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) resolve(null);
            else resolve(results[0]);
        });
    });
};

// updating user's points and rank
const updatePointsAndRank = (userId, points) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET points = ?, rank = ? WHERE id = ?';
        database.query(query, [points, "UpdatedRankHere", userId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = { login, register, getProfile, updatePointsAndRank };