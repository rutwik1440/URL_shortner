const { getUser } = require("../service/auth"); 

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies.uid;

    if (!userUid) {
        return res.redirect("/login");
    }
    console.log("User UID:", userUid);
    const user = getUser(userUid);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function ckeckAuth(req, res, next) {
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    ckeckAuth,
};