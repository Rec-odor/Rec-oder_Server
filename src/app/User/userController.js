const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


exports.kakaoLogin = async function (req, res) {
    console.log("req.user ->", req.user);
    console.log("req.session ->", req.session);
    const userByUserId = await userProvider.retrieveUser(req.user.id); // 기존 회원 찾기

    if (!userByUserId) return res.redirect("/join");

    return res.send(response(baseResponse.SUCCESS));
};

exports.kakaoLogout = async function (req, res) {
    await req.logout(function (err) {
        if (err) {
            console.log(err);
        }
        return res.send(response(baseResponse.SUCCESS));
    });
};

exports.getUserLikes = async function (req,res){
    const userLikeResult = await userProvider.retrieveUserLikes(req.user.id);     

    return res.send(response(baseResponse.SUCCESS, userLikeResult));
}

exports.postUserLikes = async function (req, res){
    const productId = req.params.productId;

    const productLikeResponse = await userService.postProductLike(req.user.id, productId);
    return res.send(productLikeResponse);
}

exports.deleteUserLikes = async function (req, res){
    const productId = req.params.productId;

    const deleteLikeResponse = await userService.deleteUserLike(req.user.id, productId);
    return res.send(deleteLikeResponse);
}