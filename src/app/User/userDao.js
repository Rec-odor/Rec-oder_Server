// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
      SELECT UserID, UserName, Status 
      FROM User
      WHERE UserID = ${userId};
    `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
  }
  
  


module.exports = {
    selectUserId,
};
