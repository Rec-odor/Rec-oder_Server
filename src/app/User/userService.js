
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const productProvider = require("../Product/productProvider")
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");


// Service: Create, Update, Delete 비즈니스 로직 처리
exports.postProductLike = async function (userId, productId) {
    // Users 테이블에 유저 존재 여부 확인
    const userRows = await userProvider.retrieveUser(userId);
    if (userRows.length < 1)
        return errResponse(baseResponse.USER_NOT_EXIST);

    // Points 테이블에 포인트 존재 여부 확인
    const productRows = await productProvider.retrieveProduct(productId);
    if (productRows.length < 1)
        return errResponse(baseResponse.PRODUCT_NOT_EXIST);

    // UserLike 테이블에 이미 해당 정보가 있는지 여부 확인
    const userPointLikeRows = await userProvider.retrieveUserPointLike(
        userId,
        productId
    );
    if (userPointLikeRows.length > 0)
        return errResponse(baseResponse.PRODUCT_LIKE_EXIST);

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const addUserProductLike = await userDao.insertUserProductLike(
            connection,
            userId,
            productId
        );
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteUserLike = async function (userId, productId) {

    // UserLike 테이블에 이미 해당 정보가 있는지 여부 확인
    const userPointLikeRows = await userProvider.retrieveUserPointLike(
        userId,
        productId
    );
    if (userPointLikeRows.length <= 0)
        return errResponse(baseResponse.PRODUCT_LIKE_NOT_EXIST);

    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteUserProductLike = await userDao.deleteUserProductLike(
            connection,
            userId,
            productId
        );
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch (err) {
        return errResponse(baseResponse.DB_ERROR);
    }
};

