const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { con:db, createUser } = require('./db_connect');
const bcrypt = require('bcrypt');

const app = express();
const saltRounds = 10;

// We configure body-parser to parse URL-encoded form data 
//(the format used by HTML forms). The extended: false option means that it will use the 
//querystring library to parse the data.
app.use(bodyParser.urlencoded({extended:false}));


//We tell Express to serve static files (like CSS) 
//from a directory named public located in the same directory 
//as our app.js file. The __dirname variable contains 
//the path to the directory where app.js is located.
app.use(express.static(path.join(__dirname, 'public')));

//sends the index file for the chatroom page when a user signs up.
app.get('/chatroom/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//defining the /signup endpoint
app.post('/chatroom/signup', (req, res) => {
    const {username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
    // hashes the passwrod before it is stored in the MySQL database
        if (err) throw err;

        const query = 'INSERT INTO accounts (username, email, password) VALUES (?,?,?)';
        createUser(username, email, hash, (err, result) => {
            if(err) {
                console.error(err); 
                res.status(500).json({ status: 'error', message: 'Failed to create account.' });
                return;
            }
            
            console.log('Account created:', result)
            res.status(200).json({ status: 'success', message: 'Account created successfully!' });
        });


    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

