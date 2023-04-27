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
// 추천 제품 정보 추가
async function selectProduct(connection, productId){
  const selectProductQuery = `
    SELECT P1.ProductID, Name, Top, Middle, Base, Brand, Price, Description, hits, P2.ImageURL
    FROM Product P1, Product_Image P2
    WHERE P1.ProductID = P2.ProductID and P1.ProductId = ${productId};
  `;
  const [productInfo] = await connection.query(selectProductQuery, productId);
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
  selectQuestionResult,
  selectSearchResult,

  updateProductHits,
};
