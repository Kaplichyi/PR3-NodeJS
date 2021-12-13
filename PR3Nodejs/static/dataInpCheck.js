function errEmailFormat(email) {
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (pattern.test(email)) {
        return true;
    } else {
        console.log("Uncorrect email");
        return false;
    }
}

function errOneType(inputText) {
    if (inputText.length < 5) {
        console.log("Each field require more then 5 symbols");
        return false;
    } else {
        return true;
    }
}

function errPhone(inputPhone) {
    if (inputPhone.length != 11) {
        console.log("Uncorrect phone number");
        return false;
    } else {
        return true;
    }
}

function errPass(inputPass, inputPass2) {
    if (inputPass === inputPass2) {
        return true;
    } else {
        console.log("Password are mismatch");
        return false;
    }
}

exports.appPost = function (req, res) {
    var data = req.body;
    if (errOneType(data.inpLogin) && errPhone(data.inpPhone) && errOneType(data.inpMail) && errEmailFormat(data.inpMail) && errOneType(data.inpPassword) && errPass(data.inpPassword, data.inpPassword_repeat))
        return true;
    return false;
}