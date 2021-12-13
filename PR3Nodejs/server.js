const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('views'));
app.set('view engine', 'ejs');

const database = require('./static/database');
const inpData = require('./static/dataInpCheck');
const storage = require('./static/upload');

app.post('/registration', urlencodedParser, function (req, res) {
	if (inpData.appPost(req, res)) {
		database.insertDate(req, res);
		res.send("Регистрация прошла успешно<br><a href=\"login.html\"><b>войти в профиль</b></a>");
		console.log("Пользователь зарегестрирован");
	}
	else {
		res.send("Регистрация была прервана<br><a href=\"index.html\">Вернуться на страницу</a>");
		console.log("Регистрация была прервана");
	}
});

const fileFilter = (req, file, cb) => {

	if (file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg") {
		cb(null, true);
	}
	else {
		cb(null, false);
		console.log("Неверный формат файла");
	}
}

app.post("/upload", multer({ storage: storage.getStorage(), fileFilter: fileFilter }).single("image"), (req, res) => {
	let filedata = req.file;
	console.log(filedata);
	if (fileFilter)
		console.log("Файл загружен");
	else
		res.send("Неверный формат файла. <br>Допустимые форматы аватара .png, .jpg, .jpeg");
});

app.post('/addimg', urlencodedParser, function (req, res) {
	database.addimg(req, res);
});

app.post('/login', urlencodedParser, function (req, res) {
	database.getData(req, function (usinfo) {
		console.log(usinfo);
		database.usercheck(req, usinfo[0].password, function (usexists) {
			console.log(usexists);
			if (usexists) {
				res.send("Авторизация успешна<br><div>Здравствуйте," + usinfo[0].login + "</div><div>ID:" + usinfo[0].ID + "</div><div> Логин:" + usinfo[0].login + "</div><div>Почта:" + usinfo[0].mail + "</div><div>Номер телефона:" + usinfo[0].phone + "</div><div><a href=\"addimg.html\"><b>Загрузить изображение</b></a></div>");
            }
			else
				res.send("Ошибка пользовательских данных<br><a href=\"login.html\">Вернуться на страницу</a>");
		});
	});
});

app.listen(1337);
console.log("Сервер запущен");