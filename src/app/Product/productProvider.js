const { pool } = require("../../../config/database");

const productDao = require("./productDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveProductList = async function(){
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductList(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProductListHits = async function(){
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductListHits(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProductListHighprice = async function(){
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductListHighprice(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProductListLowprice = async function(){
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductListLowprice(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProductListABC = async function() {
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductListABC(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProductListZXY = async function() {
  const connection = await pool.getConnection(async (conn) => conn);
  const productListResult = await productDao.selectProductListZXY(connection);
  connection.release;

  return productListResult;
}

exports.retrieveProduct = async function(productId){
  const connection = await pool.getConnection(async (conn) => conn);
  const productResult = await productDao.selectProduct(connection, productId);
  connection.release;

  return productResult;
}

exports.retrieveQuestionResult = async function(result){
  const connection = await pool.getConnection(async (conn) => conn);
  const questionResult = await productDao.selectQuestionResult(connection, result);
  connection.release;

  return questionResult;
}


exports.retrieveSearchResult = async function(keyword){
  const connection = await pool.getConnection(async (conn) => conn);
  const searchResult = await productDao.selectSearchResult(connection, keyword);
  connection.release;

  return searchResult;
}