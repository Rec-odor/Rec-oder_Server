module.exports = function (app) {
    const user = require('./userController');
    const auth = require("./auth");
    const passport = require("passport");
    const userProvider = require("./userProvider");
    
    // const jwtMiddleware = require('../../../config/jwtMiddleware');


    // <----------------- 로그인 ----------------->
    // GET 카카오톡 로그인 페이지 이동
    app.get("/auth/kakao", passport.authenticate("kakao-login"));

    // GET User 정보 수신
    app.get(
        "/auth/kakao/callback",
        passport.authenticate("kakao-login", {
            failureRedirect: "/",
        }),
        user.kakaoLogin
    );

    // GET 로그아웃
    app.get("/auth/logout", user.kakaoLogout);

    app.get("/likes/:userId", user.getUserLikes);
    app.post("/likes/:userId/:productId", user.postUserLikes);
    app.delete("/likes/:userId/:productId", user.deleteUserLikes);
};
