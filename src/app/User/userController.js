const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


exports.kakaoLogin = async function (req, res) {
    console.log("req.user ->", req.user);
    console.log("req.session ->", req.session);
    const userByUserId = await userProvider.retrieveUser(req.user.id); // 기존 회원 찾기

    if (!userByUserId[0]) return res.redirect("/join");

    console.log(userByUserId[0].nickname);
    return res.redirect("/startPage");
};

exports.kakaoLogout = async function (req, res) {
    await req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        return res.redirect("/");
    });
};

exports.getUserLikes = async function (req,res){
    const userId = req.params.userId;
    const userLikeResult = await userProvider.retrieveUserLikes(userId);     

    return res.send(response(baseResponse.SUCCESS, userLikeResult));
}
