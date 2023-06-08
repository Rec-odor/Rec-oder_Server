const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


exports.kakaoLogin = async function (req, res) {
    console.log("req.user ->", req.user);
    console.log("req.session ->", req.session);
    const userByUserId = await userProvider.retrieveUser(req.user.id); // 기존 회원 찾기

    if (!userByUserId) return res.redirect("/join");

    return res.redirect("/");
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
    const userLikeResult = await userProvider.retrieveUserLikes(req.user.id);     

    return res.send(response(baseResponse.SUCCESS, userLikeResult));
}

exports.postUserLikes = async function (req, res){
    const { userId, productId } = req.params;

    const productLikeResponse = await userService.postProductLike(userId, productId);
    return res.send(productLikeResponse);
}

exports.deleteUserLikes = async function (req, res){
    const { userId, productId } = req.params;

    const deleteLikeResponse = await userService.deleteUserLike(userId, productId);
    return res.send(deleteLikeResponse);
}