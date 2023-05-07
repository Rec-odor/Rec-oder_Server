const { pool } = require("../../../config/database");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.retrieveUser = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserId(connection, userId);
  
    connection.release();
  
    return userResult[0];
  };