const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
        var projection = null;
        db.findMany(User, {}, projection, function(results) {
            res.render('home', {
                cards : results
            }); // This is to load the page initially
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        // your code here
        var number = req.query.number;

        db.findOne(User, {number: number}, 'number', function (result) {
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        // your code here
        var user = {
            name : req.query.name,
            number : req.query.number
        };

        var projection = null;

        db.insertOne(User, user, function (result) {
            db.findOne(User, user, projection, function (result) {
                res.render('partials/card', result);
            })
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        var query = {number : req.query.number}
        var projection = null;

        db.deleteOne(User, query, function (result) {
            db.findMany(User, {}, projection, function (results) {
                res.render('partials/card', results);
            })
        });
    }

}

module.exports = controller;
