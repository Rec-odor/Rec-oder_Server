// 전 제품 정보 조회
async function selectProductList(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 조회수순
async function selectProductListHits(connection){
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
async function selectProductListHighprice(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.Price DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가격 높은 순
async function selectProductListHighprice(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.Price DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가격 낮은 순
async function selectProductListLowprice(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.Price;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가나다 순
async function selectProductListABC(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.Name;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 전 제품 정보 조회 - 가나다 역순
async function selectProductListZXY(connection){
  const selectProductListQuery = `
    SELECT P1.ProductID, Name, Brand, Price, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID
    ORDER BY P1.Name DESC;
  `;
  const [productRows] = await connection.query(selectProductListQuery);
  return productRows;
}

// 특정 제품 정보 조회
async function selectProduct(connection, productId){
  const selectProductQuery = `
    SELECT P1.ProductID, Name, Top, Middle, Base, Brand, Price, Description, hits, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID and P1.ProductId = ${productId};
  `;
  const [productInfo] = await connection.query(selectProductQuery, productId);
  return productInfo[0];
}

// 기본 추천 제품 정보 조회
async function selectRecProduct(connection, productId){
  const selectRecProductQuery = `
    SELECT P1.ProductID AS Rec1, P1.ImageURL AS Rec1_ImageURL,
      P2.ProductID AS Rec2, P2.ImageURL AS Rec2_ImageURL, P3.ProductID AS Rec3, P3.ImageURL AS Rec3_ImageURL, 
      P4.ProductID AS Rec4, P4.ImageURL AS Rec4_ImageURL, P5.ProductID AS Rec5, P5.ImageURL AS Rec5_ImageURL, 
      P6.ProductID AS Rec6, P6.ImageURL AS Rec6_ImageURL
    FROM  RecProduct R
      LEFT JOIN Product_Image P1 ON R.Rec1 = P1.ProductID
      LEFT JOIN Product_Image P2 ON R.Rec2 = P2.ProductID
      LEFT JOIN Product_Image P3 ON R.Rec3 = P3.ProductID
      LEFT JOIN Product_Image P4 ON R.Rec4 = P4.ProductID
      LEFT JOIN Product_Image P5 ON R.Rec5 = P5.ProductID
      LEFT JOIN Product_Image P6 ON R.Rec6 = P6.ProductID
    WHERE R.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectRecProductQuery, productId);
  return productInfo[0];
}

// 탑노트 기반 추천 제품 조회
async function selectTopRecProduct(connection, productId){
  const selectTopRecProductQuery = `
    SELECT P1.ProductID AS Rec1, P1.ImageURL AS Rec1_ImageURL,
      P2.ProductID AS Rec2, P2.ImageURL AS Rec2_ImageURL, P3.ProductID AS Rec3, P3.ImageURL AS Rec3_ImageURL, 
      P4.ProductID AS Rec4, P4.ImageURL AS Rec4_ImageURL, P5.ProductID AS Rec5, P5.ImageURL AS Rec5_ImageURL, 
      P6.ProductID AS Rec6, P6.ImageURL AS Rec6_ImageURL
    FROM  TopRecProduct T
      LEFT JOIN Product_Image P1 ON T.Rec1 = P1.ProductID
      LEFT JOIN Product_Image P2 ON T.Rec2 = P2.ProductID
      LEFT JOIN Product_Image P3 ON T.Rec3 = P3.ProductID
      LEFT JOIN Product_Image P4 ON T.Rec4 = P4.ProductID
      LEFT JOIN Product_Image P5 ON T.Rec5 = P5.ProductID
      LEFT JOIN Product_Image P6 ON T.Rec6 = P6.ProductID
    WHERE T.ProductID = ${productId};
  `;
  const [productInfo] = await connection.query(selectTopRecProductQuery, productId);
  return productInfo[0];
}

// 베이스 노트 기반 추천 제품 조회
async function selectBaseRecProduct(connection, productId){
  const selectBaseRecProductQuery = `
    SELECT P1.ProductID AS Rec1, P1.ImageURL AS Rec1_ImageURL,
      P2.ProductID AS Rec2, P2.ImageURL AS Rec2_ImageURL, P3.ProductID AS Rec3, P3.ImageURL AS Rec3_ImageURL, 
      P4.ProductID AS Rec4, P4.ImageURL AS Rec4_ImageURL, P5.ProductID AS Rec5, P5.ImageURL AS Rec5_ImageURL, 
      P6.ProductID AS Rec6, P6.ImageURL AS Rec6_ImageURL
    FROM  BaseRecProduct B
      LEFT JOIN Product_Image P1 ON B.Rec1 = P1.ProductID
      LEFT JOIN Product_Image P2 ON B.Rec2 = P2.ProductID
      LEFT JOIN Product_Image P3 ON B.Rec3 = P3.ProductID
      LEFT JOIN Product_Image P4 ON B.Rec4 = P4.ProductID
      LEFT JOIN Product_Image P5 ON B.Rec5 = P5.ProductID
      LEFT JOIN Product_Image P6 ON B.Rec6 = P6.ProductID
    WHERE B.ProductID = ${productId};
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
async function selectQuestionResult(connection, result){
  const selectProductQuery = `
    SELECT P.ProductID, Name, Top, Middle, Base, Brand, Price, Description
    FROM Product P, TestResult T
    WHERE P.ProductID = T.ProductID and T.Result = '${result}';
  `;
  const [questionResultInfo] = await connection.query(selectProductQuery, result);
  return questionResultInfo[0];
}


// 검색 결과 조회
async function selectSearchResult(connection, keyword){
  const selectKeywordQuery = `
    SELECT ProductID, Name, Top, Middle, Base, Brand, Price, Description
    FROM Product
    WHERE Name LIKE '%${keyword}%' or Top LIKE '%${keyword}%' or Middle LIKE '%${keyword}%' or Base LIKE '%${keyword}%' or Brand LIKE '%${keyword}%';
  `;
  const [searchResultInfo] = await connection.query(selectKeywordQuery, keyword);
  return searchResultInfo[0];
}






module.exports = {
  selectProductList,
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
