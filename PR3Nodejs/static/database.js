var sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
var db = new sqlite3.Database('./users.db');
const storage = require('./upload');

exports.insertData = async function(req, res) {
    var data = req.body;
    const hash = await bcrypt.hash(data.inpPassword, 7);
    
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO Users (login, password, phone, mail) VALUES (?, ?, ?, ?);");
        stmt.run(data.inpLogin, hash, data.inpPhone, data.inpMail);
        stmt.finalize();
    });
}

exports.addimg = function(req, res) {
    var data = req.body;
    let imgpath = storage.getFilename();
    console.log(imgpath);
    let sql = "UPDATE Users SET imgpath='" + imgpath + "' WHERE login = '" + data.inpLogin + "';";
    console.log(sql);
    db.serialize(function () {
        db.run(sql);
    });
}

exports.usercheck = function (req, ushashedpassword, callback) {
    var data = req.body;
    console.log(ushashedpassword, data.inpPassword);
    bcrypt.compare(data.inpPassword, ushashedpassword, function (err, isMatch) {
        if (err) {
            throw err
        }
        else if (!isMatch) {
            console.log('Failed');
        }
        else {
            console.log('Successful');
        }
        callback(isMatch);
    });
}

exports.getData = function (req, callback) {
    var data = req.body;
    var usinfo = [];
    db.serialize(function () {
        db.each("SELECT * FROM Users WHERE login = '" + data.inpLogin + "';", function (err, row) {
            usinfo.push(row);
        }, function () {
            callback(usinfo);
        });
    });
}

exports.sendQuestion = async function (req, res) {
    var data = req.body;

    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO Questions (Author, Question) VALUES (?, ?);");
        stmt.run(data.inpLogin, data.inpQuestion);
        stmt.finalize();
    });
}
exports.insertData = async function (req, res) {
    var data = req.body;
    const hash = await bcrypt.hash(data.inpPassword, 7);

    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO Users (login, password, phone, mail) VALUES (?, ?, ?, ?);");
        stmt.run(data.inpLogin, hash, data.inpPhone, data.inpMail);
        stmt.finalize();
    });
}

exports.getQuestionsData = async function (req, res) {
    /*var questioninfo = [];
    db.serialize(function () {
        db.each("SELECT * FROM Questions;", function (err, row) {
            questioninfo.push(row);
        }, function () {
            callback(questioninfo);
        });
    });*/
    db.all("SELECT * FROM Questions;", (err, rows) => {
        res.render('questionslist', { rows: rows });
    });
}