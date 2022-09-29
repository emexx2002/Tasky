var router = require("express").Router();
var authCtrl = require("../../controllers/auth");
const { verifySignUp } = require("../middlewares");


    router.route("/signup")
    .post(
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        authCtrl.signup
    );

    router.route("/signin")
    .post(authCtrl.signin);


module.exports = router;

