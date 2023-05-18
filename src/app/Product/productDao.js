// 전 제품 정보 조회
async function selectProductList(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 좋아요순
async function selectProductListLikes(connection) {
  const selectProductListQuery = `
    SELECT p.ProductID, p.ImageURL, p.Name, p.Name, p.Brand, p.Price
    FROM Product p
    JOIN (
      SELECT ProductID
      FROM UserLike
      GROUP BY ProductID
      ORDER BY COUNT(*) DESC
    ) ul ON p.ProductID = ul.ProductID;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 조회수순
async function selectProductListHits(connection) {
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.hits DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가격 높은 순
async function selectProductListHighprice(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
    ORDER BY Price DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가격 낮은 순
async function selectProductListLowprice(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
    ORDER BY Price;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가나다 순
async function selectProductListABC(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
    ORDER BY Name;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가나다 역순
async function selectProductListZXY(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
    ORDER BY Name DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}






// 특정 제품 정보 조회
async function selectProduct(connection, productId) {
  const selectProductQuery = `
    SELECT ProductID, Name, Top, Middle, Base, Brand, Price, Description, hits, ImageURL
    FROM Product
    WHERE ProductId = ${productId};
  `;
  const [productInfo] = await connection.query(selectProductQuery, productId);
  return productInfo[0];
}

// 기본 추천 제품 정보 조회
async function selectRecProduct(connection, productId) {
  const selectRecProductQuery = `
    SELECT rp.ProductID,
      rp.Rec1, p1.Name AS Rec1_Name, p1.ImageURL AS Rec1_ImageURL,
      rp.Rec2, p2.Name AS Rec2_Name, p2.ImageURL AS Rec2_ImageURL,
      rp.Rec3, p3.Name AS Rec3_Name, p3.ImageURL AS Rec3_ImageURL,
      rp.Rec4, p4.Name AS Rec4_Name, p4.ImageURL AS Rec4_ImageURL,
      rp.Rec5, p5.Name AS Rec5_Name, p5.ImageURL AS Rec5_ImageURL,
      rp.Rec6, p6.Name AS Rec6_Name, p6.ImageURL AS Rec6_ImageURL
    FROM RecProduct rp
      INNER JOIN Product p1 ON p1.ProductID = rp.Rec1
      INNER JOIN Product p2 ON p2.ProductID = rp.Rec2
      INNER JOIN Product p3 ON p3.ProductID = rp.Rec3
      INNER JOIN Product p4 ON p4.ProductID = rp.Rec4
      INNER JOIN Product p5 ON p5.ProductID = rp.Rec5
      INNER JOIN Product p6 ON p6.ProductID = rp.Rec6
    WHERE rp.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectRecProductQuery, productId);
  return productInfo[0];
}

// 탑노트 기반 추천 제품 조회
async function selectTopRecProduct(connection, productId) {
  const selectTopRecProductQuery = `
    SELECT rp.ProductID,
      rp.Rec1, p1.Name AS Rec1_Name, p1.ImageURL AS Rec1_ImageURL,
      rp.Rec2, p2.Name AS Rec2_Name, p2.ImageURL AS Rec2_ImageURL,
      rp.Rec3, p3.Name AS Rec3_Name, p3.ImageURL AS Rec3_ImageURL,
      rp.Rec4, p4.Name AS Rec4_Name, p4.ImageURL AS Rec4_ImageURL,
      rp.Rec5, p5.Name AS Rec5_Name, p5.ImageURL AS Rec5_ImageURL,
      rp.Rec6, p6.Name AS Rec6_Name, p6.ImageURL AS Rec6_ImageURL
    FROM TopRecProduct rp
      INNER JOIN Product p1 ON p1.ProductID = rp.Rec1
      INNER JOIN Product p2 ON p2.ProductID = rp.Rec2
      INNER JOIN Product p3 ON p3.ProductID = rp.Rec3
      INNER JOIN Product p4 ON p4.ProductID = rp.Rec4
      INNER JOIN Product p5 ON p5.ProductID = rp.Rec5
      INNER JOIN Product p6 ON p6.ProductID = rp.Rec6
    WHERE rp.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectTopRecProductQuery, productId);
  return productInfo[0];
}

// 베이스 노트 기반 추천 제품 조회
async function selectBaseRecProduct(connection, productId) {
  const selectBaseRecProductQuery = `
    SELECT rp.ProductID,
      rp.Rec1, p1.Name AS Rec1_Name, p1.ImageURL AS Rec1_ImageURL,
      rp.Rec2, p2.Name AS Rec2_Name, p2.ImageURL AS Rec2_ImageURL,
      rp.Rec3, p3.Name AS Rec3_Name, p3.ImageURL AS Rec3_ImageURL,
      rp.Rec4, p4.Name AS Rec4_Name, p4.ImageURL AS Rec4_ImageURL,
      rp.Rec5, p5.Name AS Rec5_Name, p5.ImageURL AS Rec5_ImageURL,
      rp.Rec6, p6.Name AS Rec6_Name, p6.ImageURL AS Rec6_ImageURL
    FROM BaseRecProduct rp
      INNER JOIN Product p1 ON p1.ProductID = rp.Rec1
      INNER JOIN Product p2 ON p2.ProductID = rp.Rec2
      INNER JOIN Product p3 ON p3.ProductID = rp.Rec3
      INNER JOIN Product p4 ON p4.ProductID = rp.Rec4
      INNER JOIN Product p5 ON p5.ProductID = rp.Rec5
      INNER JOIN Product p6 ON p6.ProductID = rp.Rec6
    WHERE rp.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectBaseRecProductQuery, productId);
  return productInfo[0];
}


// 특정 제품 정보 조회 - 조회수 증가
async function updateProductHits(connection, productId) {
  const updateHitsQuery = `
    UPDATE Product
    SET hits = hits + 1
    WHERE ProductID = '${productId}';
  `;
  const updateHits = connection.query(updateHitsQuery, productId);
  return updateHits[0];
}

// 설문 결과 조회
async function selectQuestionResult(connection, result) {
  const selectProductQuery = `
    SELECT P.ProductID, Name, Top, Middle, Base, Brand, Price, Description
    FROM Product P, TestResult T
    WHERE P.ProductID = T.ProductID and T.Result = '${result}';
  `;
  const [questionResultInfo] = await connection.query(selectProductQuery, result);
  return questionResultInfo[0];
}


// 검색 결과 조회
async function selectSearchResult(connection, keyword) {
  const selectKeywordQuery = `
    SELECT ProductID, Name, Top, Middle, Base, Brand, Price, Description, ImageURL
    FROM Product
    WHERE Name LIKE '%${keyword}%' or Top LIKE '%${keyword}%' or Middle LIKE '%${keyword}%' or Base LIKE '%${keyword}%' or Brand LIKE '%${keyword}%';
  `;
  const [searchResultInfo] = await connection.query(selectKeywordQuery, keyword);
  return searchResultInfo[0];
}





module.exports = {
  selectProductList,
  selectProductListLikes,
  selectProductListHits,
  selectProductListHighprice,
  selectProductListLowprice,
  selectProductListABC,
  selectProductListZXY,

  selectProduct,
  selectRecProduct,
  selectTopRecProduct,
  selectBaseRecProduct,

  selectQuestionResult,
  selectSearchResult,

  updateProductHits,
};