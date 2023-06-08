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
async function selectProductListZYX(connection) {
  const selectProductListQuery = `
    SELECT ProductID, Name, Brand, Price, ImageURL
    FROM Product
    ORDER BY Name DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 제품 정보 조회
async function selectProductAndRec(connection, productId) {
  const selectProductAndRecQuery = `
    SELECT P.ProductID, P.Name, P.Top, P.Middle, P.Base, P.Brand, P.Category, P.Price, P.Description, P.hits, P.ImageURL,
      RP.Rec1, PR1.Name AS Rec1_Name, PR1.ImageURL AS Rec1_ImageURL,
      RP.Rec2, PR2.Name AS Rec2_Name, PR2.ImageURL AS Rec2_ImageURL,
      RP.Rec3, PR3.Name AS Rec3_Name, PR3.ImageURL AS Rec3_ImageURL,
      RP.Rec4, PR4.Name AS Rec4_Name, PR4.ImageURL AS Rec4_ImageURL,
      RP.Rec5, PR5.Name AS Rec5_Name, PR5.ImageURL AS Rec5_ImageURL,
      RP.Rec6, PR6.Name AS Rec6_Name, PR6.ImageURL AS Rec6_ImageURL,
      TRP.Rec1 AS TopRec1, TPR1.Name AS TopRec1_Name, TPR1.ImageURL AS TopRec1_ImageURL,
      TRP.Rec2 AS TopRec2, TPR2.Name AS TopRec2_Name, TPR2.ImageURL AS TopRec2_ImageURL,
      TRP.Rec3 AS TopRec3, TPR3.Name AS TopRec3_Name, TPR3.ImageURL AS TopRec3_ImageURL,
      TRP.Rec4 AS TopRec4, TPR4.Name AS TopRec4_Name, TPR4.ImageURL AS TopRec4_ImageURL,
      TRP.Rec5 AS TopRec5, TPR5.Name AS TopRec5_Name, TPR5.ImageURL AS TopRec5_ImageURL,
      TRP.Rec6 AS TopRec6, TPR6.Name AS TopRec6_Name, TPR6.ImageURL AS TopRec6_ImageURL,
      BRP.Rec1 AS BaseRec1,  BPR1.Name AS BaseRec1_Name, BPR1.ImageURL AS BaseRec1_ImageURL,
      BRP.Rec2 AS BaseRec2, BPR2.Name AS BaseRec2_Name, BPR2.ImageURL AS BaseRec2_ImageURL,
      BRP.Rec3 AS BaseRec3, BPR3.Name AS BaseRec3_Name, BPR3.ImageURL AS BaseRec3_ImageURL,
      BRP.Rec4 AS BaseRec4, BPR4.Name AS BaseRec4_Name, BPR4.ImageURL AS BaseRec4_ImageURL,
      BRP.Rec5 AS BaseRec5, BPR5.Name AS BaseRec5_Name, BPR5.ImageURL AS BaseRec5_ImageURL,
      BRP.Rec6 AS BaseRec6, BPR6.Name AS BaseRec6_Name, BPR6.ImageURL AS BaseRec6_ImageURL
    FROM
      Product P
      LEFT JOIN RecProduct RP ON P.ProductID = RP.ProductID
      LEFT JOIN TopRecProduct TRP ON P.ProductID = TRP.ProductID
      LEFT JOIN BaseRecProduct BRP ON P.ProductID = BRP.ProductID
      LEFT JOIN Product PR1 ON RP.Rec1 = PR1.ProductID
      LEFT JOIN Product PR2 ON RP.Rec2 = PR2.ProductID
      LEFT JOIN Product PR3 ON RP.Rec3 = PR3.ProductID
      LEFT JOIN Product PR4 ON RP.Rec4 = PR4.ProductID
      LEFT JOIN Product PR5 ON RP.Rec5 = PR5.ProductID
      LEFT JOIN Product PR6 ON RP.Rec6 = PR6.ProductID
      LEFT JOIN Product TPR1 ON TRP.Rec1 = TPR1.ProductID
      LEFT JOIN Product TPR2 ON TRP.Rec2 = TPR2.ProductID
      LEFT JOIN Product TPR3 ON TRP.Rec3 = TPR3.ProductID
      LEFT JOIN Product TPR4 ON TRP.Rec4 = TPR4.ProductID
      LEFT JOIN Product TPR5 ON TRP.Rec5 = TPR5.ProductID
      LEFT JOIN Product TPR6 ON TRP.Rec6 = TPR6.ProductID
      LEFT JOIN Product BPR1 ON BRP.Rec1 = BPR1.ProductID
      LEFT JOIN Product BPR2 ON BRP.Rec2 = BPR2.ProductID
      LEFT JOIN Product BPR3 ON BRP.Rec3 = BPR3.ProductID
      LEFT JOIN Product BPR4 ON BRP.Rec4 = BPR4.ProductID
      LEFT JOIN Product BPR5 ON BRP.Rec5 = BPR5.ProductID
      LEFT JOIN Product BPR6 ON BRP.Rec6 = BPR6.ProductID
    WHERE
      P.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectProductAndRecQuery, productId);
  return productInfo[0];
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
    SELECT RP.ProductID, RP.Rec1, P1.Name AS Rec1_Name, P1.ImageURL AS Rec1_ImageURL,
      RP.Rec2, P2.Name AS Rec2_Name, P2.ImageURL AS Rec2_ImageURL,
      RP.Rec3, P3.Name AS Rec3_Name, P3.ImageURL AS Rec3_ImageURL
    FROM TestResult TR
      LEFT JOIN RecProduct RP ON TR.ProductID = RP.ProductID
      LEFT JOIN Product P ON TR.ProductID = P.ProductID
      LEFT JOIN Product P1 ON RP.Rec1 = P1.ProductID
      LEFT JOIN Product P2 ON RP.Rec2 = P2.ProductID
      LEFT JOIN Product P3 ON RP.Rec3 = P3.ProductID
    WHERE TR.Result = '${result}';
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
  return searchResultInfo;
}





module.exports = {
  selectProductList,
  selectProductListLikes,
  selectProductListHits,
  selectProductListHighprice,
  selectProductListLowprice,
  selectProductListABC,
  selectProductListZYX,

  selectProductAndRec,
  selectProduct,
  selectRecProduct,
  selectTopRecProduct,
  selectBaseRecProduct,

  selectQuestionResult,
  selectSearchResult,

  updateProductHits,
};