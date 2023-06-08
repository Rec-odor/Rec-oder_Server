const productProvider = require("../Product/productProvider");
const productService = require("../Product/productService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const { callChatGPT } = require('../Product/chatGPT');


// 전제품 정보 조회
exports.allProducts = async function (req, res){

    const { order } = req.query;

    if(order =="like"){

        const productListResult = await productProvider.retrieveProductListLikes();
        return res.send(response(baseResponse.SUCCESS, productListResult));

    }
    else if(order == "hits"){

        const productListResult = await productProvider.retrieveProductListHits();
        return res.send(response(baseResponse.SUCCESS, productListResult));

    }
    else if(order == "highprice"){

        const productListResult = await productProvider.retrieveProductListHighprice();
        return res.send(response(baseResponse.SUCCESS, productListResult));

    }
    else if(order == "lowprice"){

        const productListResult = await productProvider.retrieveProductListLowprice();
        return res.send(response(baseResponse.SUCCESS, productListResult));

    }
    else if(order == "abc"){

        const productListResult = await productProvider.retrieveProductListABC();
        return res.send(response(baseResponse.SUCCESS, productListResult));

    }
    else if(order == "zyx"){

        const productListResult = await productProvider.retrieveProductListZYX();
        return res.send(response(baseResponse.SUCCESS, productListResult));
        
    }
    else {      // default

        const productListResult = await productProvider.retrieveProductList();
        return res.send(response(baseResponse.SUCCESS, productListResult));
        
    }

}

// 특정 제품 정보 조회
exports.getProduct = async function (req, res){

    const productId = req.params.productId;
    const productResult = await productProvider.retrieveProductAndRec(productId);

    // 조회수 증가
    const hits = await productService.updateHits(productId);                     

    return res.send(response(baseResponse.SUCCESS, productResult));
}

// 설문 결과 조회
exports.getQuestionResult = async function (req, res){

    let param = "" + req.params.result;
    const result = param.substring(0, 2);
    const questionResult = await productProvider.retrieveQuestionResult(result);

    return res.send(response(baseResponse.SUCCESS, questionResult));
}

// 검색 결과 조회
exports.searchItem = async function (req, res){

    const keyword = decodeURIComponent(req.params.keyword);             // 한글 파라미터를 위해 디코딩
    const searchResult = await productProvider.retrieveSearchResult(keyword);

    return res.send(response(baseResponse.SUCCESS, searchResult));

}

exports.askQuestion = async function (req, res){
    const { prompt } = req.body;

    if(!prompt)
        return res.send(response(baseResponse.FAILURE));              // 수정
    const answer = await callChatGPT(prompt +" 향수\n이 내용 100자 이내로 요약해줘");
    
    if(answer){
        req.session.answer = answer;
        return res.redirect('/chatGPT/qna');
    } else {
        return res.send(response(baseResponse.FAILURE));
    }
}

exports.getAnswer = async function (req, res){
    const answer = req.session.answer;
    return res.send(response(baseResponse.SUCCESS, {answer: answer}));
}