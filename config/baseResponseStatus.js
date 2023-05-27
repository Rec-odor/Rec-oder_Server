module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
    USER_NOT_EXIST : {"isSuccess": false, "code": 5001, "message": "회원가입 필요" },
    PRODUCT_NOT_EXIST : {"isSuccess": false, "code": 5002, "message": "존재하지 않는 제품" },
    PRODUCT_LIKE_EXIST : {"isSuccess": false, "code": 5003, "message": "이미 좋아요한 제품" },
    PRODUCT_LIKE_NOT_EXIST : {"isSuccess": false, "code": 5004, "message": "삭제할 좋아요 없음" },
}
