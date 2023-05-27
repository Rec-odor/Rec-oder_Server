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

// 좋아요한 목록 조회
async function selectUserLikes(connection, userId) {
  const selectUserLikesQuery = `
    SELECT p.ProductID, p.Name, pimg.ImageURL, p.hits
    FROM Product_Image pimg
    JOIN UserLike ul ON pimg.ProductID = ul.ProductID
    JOIN Product p ON p.ProductID = ul.ProductID
    WHERE ul.UserID = ${userId};
  `;
  const [userLikesRow] = await connection.query(selectUserLikesQuery, userId);
  return userLikesRow;
}

async function selectUserProductLikes(connection, userId, productId) {
  const selectUserProductLikesQuery = `
    SELECT UserID, ProductID 
    FROM UserLike
    WHERE UserID = ${userId} and ProductID = ${productId};
  `;
  const [userLikesRow] = await connection.query(selectUserProductLikesQuery, [userId, productId]);
  return userLikesRow;
}

async function insertUserProductLike(connection, userId, productId) {
  const insertUserProductLikesQuery = `
    INSERT INTO UserLike VALUES (?, ?);
  `;
  const updateUserRow = await connection.query(insertUserProductLikesQuery, [
    userId,
    productId,
  ]);
  return updateUserRow[0];
}

async function deleteUserProductLike(connection, userId, productId) {
  const deleteUserProductLikesQuery = `
    DELETE FROM UserLike
    WHERE UserID = ${userId} and productId = ${productId};
  `;
  const updateUserRow = await connection.query(deleteUserProductLikesQuery, [
    userId,
    productId,
  ]);
  return updateUserRow[0];
}



module.exports = {
  selectUserId,
  selectUserLikes,
  selectUserProductLikes,

  insertUserProductLike,
  deleteUserProductLike,
};
