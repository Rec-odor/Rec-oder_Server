const {pool} = require("../../../config/database");
const productProvider = require("./productProvider");
const productDao = require("./productDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.updateHits = async function (productId){
    try{
        const connection = await pool.getConnection(async (conn) => conn);
        const updateHitsResult = await productDao.updateProductHits(connection, productId);
        connection.release();

        return updateHitsResult;
        
    } catch(err){
        console.log(err.massage);
    }
}