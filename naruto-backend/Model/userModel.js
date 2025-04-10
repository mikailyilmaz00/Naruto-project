const database = require('../DB/databaseSetup');
const mysql = require('mysql2');
const db = mysql
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');




const login = (req, username, password) => {
    return new Promise((resolve, reject) => {
        // Step 1: Query the database for the user by username
        const query = 'SELECT id, password FROM users WHERE username = ?';
        database.query(query, [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }

            if (results.length === 0) {
                // No user found
                return resolve(null);
            }

            const user = results[0]; // Extract the user data (id and hashed password)
            
            console.log("Password input ", password)

            console.log("Exisitng user in db", user)
            // Step 2: Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Bcrypt error:', err);
                    return reject(err);
                }

                if (!isMatch) {
                    // Password does not match
                    return resolve(null);
                }

                // Step 3: Successful login, return the user ID
                resolve(user.id);
            });
        });
    });
};


    


// registering a new user

const register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        // Step 1: Check if user already exists based on username
        const query1 = 'SELECT username FROM users WHERE username = ?';
        database.query(query1, [username], async (err, result) => {
            if (err) return reject(err);

            if (result.length > 0) {
                // User already exists  
                return reject(new Error('User already exists'));
            }
           
            // step 2 - hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            
            console.log("User does not exist. Proceeding to register...");
        

            // Step 3: Insert new user into the database
            const query2 = 'INSERT INTO users (username, email, password, points) VALUES (?, ?, ?, 0)';
            database.query(query2, [username, email, hashedPassword], (err, result) => {
                if (err) return reject(err);

                // Respond with the new user data
                resolve({
                    id: result.insertId, // The ID of the newly inserted user
                    username,
                    email,
                    points: 0
                });
            });
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