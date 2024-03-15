/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth.ts":
/*!*******************************************************!*\
  !*** ./src/DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AjaxCallOptionModel_1 = __webpack_require__(/*! ./ModelData/AjaxCallOptionModel */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionModel.ts");
__exportStar(__webpack_require__(/*! ./ModelData/AjaxCallOptionModel */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionModel.ts"), exports);
/**
 * 아작스 지원2(인증없는 버전)
 */
class DGU_AjaxAssist2_NoAuth {
    constructor(callOptionDefult) {
        /**
         * ajax 호출(동기)
         * 반듯이 await로 호출해야 합니다.
         * ajax가 응답할때까지 기다렸다가 callOption.contentGetType 설정된 결과값으로 리턴한다.
         *
         * callOption.success, callOption.error가 있다면 우선 호출된다.
         * @param callOption 아작스 호출옵션(비어있는 옵션은 기본옵션이 사용된다.)
         * @returns callOption.contentGetType에 맞춰 변환된 data.
         * 에러가 발생한경우 무조건 Response를 리턴한다.
         */
        this.Call = (callOption) => __awaiter(this, void 0, void 0, function* () {
            //강제 설정 변경
            callOption.await = true;
            //리턴용
            let returnData = null;
            //아작스 호출에 사용할 옵션을 완성시킨다.
            let jsonCallOptionComplete = this.CallOptionCheck(callOption);
            //아작스 호출
            yield fetch(jsonCallOptionComplete.urlTarget, jsonCallOptionComplete.completeFetch)
                .then((response) => {
                //응답데이터를 설정에 맞게 변환한다.
                returnData
                    = this.ResponseToData(response, jsonCallOptionComplete.callOption.contentGetType);
                jsonCallOptionComplete.callOption.success(returnData, response);
            }).catch((response) => {
                returnData = response;
                jsonCallOptionComplete.callOption.error(response);
            });
            return returnData;
        });
        /**
         * ajax 호출(비동기)
         * ajax가 응답을 기다리지 않는다.
         * 결과를 callOption.success, callOption.error로 전달받거나
         * Promise패턴을 사용하여 받으면 된다.
         *
         * @param callOption 아작스 호출옵션(비어있는 옵션은 기본옵션이 사용된다.)
         * @returns 사용된 Promise개체
         */
        this.CallAsync = (callOption) => {
            callOption.await = false;
            let jsonCallOptionComplete = this.CallOptionCheck(callOption);
            //완성된 리스폰스
            let returnRespAjaxResult = null;
            returnRespAjaxResult
                = fetch(jsonCallOptionComplete.urlTarget, jsonCallOptionComplete.completeFetch).then((response) => {
                    //전달용 데이터
                    let returnData = null;
                    //응답데이터를 설정에 맞게 변환한다.
                    //returnData
                    //	= this.ResponseToData(
                    //		response
                    //		, jsonCallOptionComplete.callOption.contentGetType);
                    //jsonCallOptionComplete.callOption.success(returnData, response);
                    return response;
                }).catch((response) => {
                    jsonCallOptionComplete.callOption.error(response);
                    return response;
                });
            return returnRespAjaxResult;
        }; //end Call
        /**
         * 아작스 호출 옵션 체크
         * @param callOption
         * @returns
         */
        this.CallOptionCheck = (callOption) => {
            //전달된 옵션 합치기(들어온 옵션 우선)
            let callOpt = Object.assign({}, this.CallOptionDefult, callOption);
            //만약 하위트를 사용할 예정이면(예> callOpt.fetchOption)
            //하위 트리는 포인터가 저장되므로 수작업으로 다시 저장한다.
            //아작스 호출에 사용할 최종 Fetch옵션
            //새로 생성해서 기본 옵션과 전달 받은 옵션을 합친다.
            let jsonCompleteFetch = Object.assign({}, this.CallOptionDefult.fetchOption, callOption.fetchOption);
            //url을 개체로 변경
            let urlTarget = new URL(callOpt.url, window.location.origin);
            if (!(callOpt.fetchOption.method)) { //fetchOption에 메소드가 없다.
                jsonCompleteFetch.method = callOpt.method;
            }
            if (AjaxCallOptionModel_1.AjaxCallMethodType.Get === jsonCompleteFetch.method
                || AjaxCallOptionModel_1.AjaxCallMethodType.Head === jsonCompleteFetch.method) { //메서드가 Get 이거나
                //메서드가 Head 이다.
                //데이터 임시 저장
                let objDataTemp = null;
                if (jsonCompleteFetch.body) { //jsonCompleteFetch.body가 있다.
                    //jsonCompleteFetch.body가 1순위
                    //바디의 내용을 데이터로 옮긴다.
                    objDataTemp = jsonCompleteFetch.body;
                }
                else if (callOpt.data) { //callOpt.data가 있다.
                    //callOpt.data가 2순위
                    objDataTemp = callOpt.data;
                }
                else if (callOpt.body) { //callOpt.body가 있다.
                    //callOpt.body가 3순위
                    objDataTemp = callOpt.body;
                }
                //바디를 제거한다.
                delete jsonCompleteFetch["body"];
                //url쿼리를 만든다.
                if (objDataTemp) { //전달할 데이터가 있다.
                    //이 메서드들은 url쿼리로 데이터를 전달해야하므로
                    //데이터를 SearchParams로 변환한 후
                    //생성한 쿼리를 문자열로 바꿔 넣어준다.
                    urlTarget.search
                        = this.JsonToSearchParams(objDataTemp).toString();
                }
            }
            else { //이외의 메서드
            }
            //최종 완성된 요청 정보를 만든다.****************
            let returnTemp = new AjaxCallOptionModel_1.AjaxCallOptionCheckCompleteDataModel();
            returnTemp.callOption = callOpt;
            returnTemp.urlTarget = urlTarget;
            returnTemp.completeFetch = jsonCompleteFetch;
            return returnTemp;
        };
        if (callOptionDefult) { //기본값으로 사용할 콜옵션이 있다.
            //전달받은 값을 기본값으로 사용한다.
            this.CallOptionDefult = callOptionDefult;
        }
        else { //없다.
            //임의로 세팅된 기본값을 사요한다.
            this.CallOptionDefult = {
                await: false,
                contentGetType: 2 /* AjaxCallContentGetType.Json */,
                method: AjaxCallOptionModel_1.AjaxCallMethodType.Get,
                url: "",
                fetchOption: {
                    /** no-cors, cors, *same-origin */
                    mode: 'cors',
                    /** // *default, no-cache, reload, force-cache, only-if-cached */
                    cache: 'no-cache',
                    /** include, *same-origin, omit */
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json'
                        /** */
                        //,'Content-Type': 'application/json;charset=utf-8'
                        //'Content-Type': 'text/plain',
                        ,
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    /** manual, *follow, error */
                    redirect: 'follow',
                    /** no-referrer, *client */
                    referrer: 'no-referrer',
                },
                data: null,
                body: null,
                success: function (data, response) { },
                error: function (response) { },
            };
        }
    }
    /**
     * json 오브젝트를 URLSearchParams로 변환한다.
     * @param object
     * @returns
     */
    JsonToSearchParams(object) {
        let urlSearchParams = new URLSearchParams();
        //한개씩 넣어준다.
        for (const [key, value] of Object.entries(object)) {
            urlSearchParams.append(key, value.toString());
        }
        return urlSearchParams;
    }
    /**
     * 리스폰스 데이터를 옵션에 맞게 변환하여 리턴한다.
     *
     * @param response
     * @param typeContentGet
     * @returns
     */
    ResponseToData(response, typeContentGet) {
        let objReturn = null;
        if (true === response.ok) { //성공
            switch (typeContentGet) {
                case 1 /* AjaxCallContentGetType.Response */:
                    objReturn = response;
                    break;
                case 2 /* AjaxCallContentGetType.Json */:
                    objReturn = response.json();
                    break;
                case 3 /* AjaxCallContentGetType.Binary */:
                    objReturn = response.arrayBuffer();
                    break;
                case 0 /* AjaxCallContentGetType.Text */:
                default:
                    objReturn = response.text();
                    break;
            }
        }
        return objReturn;
    } //end ResponseToData
}
exports["default"] = DGU_AjaxAssist2_NoAuth;


/***/ }),

/***/ "./src/DGU_AjaxAssist2/ModelData/AjaxCallContentGetType.ts":
/*!*****************************************************************!*\
  !*** ./src/DGU_AjaxAssist2/ModelData/AjaxCallContentGetType.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/DGU_AjaxAssist2/ModelData/AjaxCallFetchOptionInterface.ts":
/*!***********************************************************************!*\
  !*** ./src/DGU_AjaxAssist2/ModelData/AjaxCallFetchOptionInterface.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
;


/***/ }),

/***/ "./src/DGU_AjaxAssist2/ModelData/AjaxCallMethodType.ts":
/*!*************************************************************!*\
  !*** ./src/DGU_AjaxAssist2/ModelData/AjaxCallMethodType.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AjaxCallMethodType = void 0;
/** 아작스 요청 메서드 타입 */
class AjaxCallMethodType {
}
exports.AjaxCallMethodType = AjaxCallMethodType;
;


/***/ }),

/***/ "./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionCheckCompleteDataModel.ts":
/*!*******************************************************************************!*\
  !*** ./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionCheckCompleteDataModel.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AjaxCallOptionCheckCompleteDataModel = void 0;
/**
 * 아작스 호출 옵션 체크 완료 데이터 모델
 */
class AjaxCallOptionCheckCompleteDataModel {
}
exports.AjaxCallOptionCheckCompleteDataModel = AjaxCallOptionCheckCompleteDataModel;
;


/***/ }),

/***/ "./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionModel.ts":
/*!**************************************************************!*\
  !*** ./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionModel.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AjaxCallOptionModel = void 0;
__exportStar(__webpack_require__(/*! ./AjaxCallContentGetType */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallContentGetType.ts"), exports);
__exportStar(__webpack_require__(/*! ./AjaxCallFetchOptionInterface */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallFetchOptionInterface.ts"), exports);
const AjaxCallMethodType_1 = __webpack_require__(/*! ./AjaxCallMethodType */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallMethodType.ts");
__exportStar(__webpack_require__(/*! ./AjaxCallMethodType */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallMethodType.ts"), exports);
__exportStar(__webpack_require__(/*! ./AjaxCallOptionCheckCompleteDataModel */ "./src/DGU_AjaxAssist2/ModelData/AjaxCallOptionCheckCompleteDataModel.ts"), exports);
/** 아작스 호출 옵션 모델 */
class AjaxCallOptionModel {
    constructor() {
        /**
         * await 사용여부
         * 기본값 : false
         */
        this.await = false;
        /**
         * 컨탠츠 받기 타입.
         * 기본값 : Json
         *
         * 컨탠츠를 리턴받을때 어떤 타입으로 처리해서 받을지를 설정한다.*/
        this.contentGetType = 2 /* AjaxCallContentGetType.Json */;
        /** 아작스 요청 메서드 타입
         * 기본값 get
         * GET, HEAD는 바디를 명시적으로 제거해야한다.
         * */
        this.method = AjaxCallMethodType_1.AjaxCallMethodType.Get;
        /** 사용할 주소 */
        this.url = "";
        /**
         * 아작스가 호출때(예:fetch) 우선적으로 사용되는 옵션
         * 헤더와 같이 아작스를 호출할때 별도로 변경해야 할 내용이 있으면 넣는다.
         *
         * 만약 본문의 항목과 겹친는 항목이 있으면 이 옵션을 우선적으로 사용해야 한다.
         */
        this.fetchOption = {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json'
                /** */
                //,'Content-Type': 'application/json;charset=utf-8'
                //'Content-Type': 'text/plain',
                ,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            method: null,
            body: null,
        };
        /**
         * 데이터
         * 여기에 있는 데이터를 우선하며, 없으면  body를 사용한다.
         * */
        this.data = null;
        /**
         * 바디에 들어갈 내용
         *
         * MethodType.Get를 사용할때는 명시적으로 body를제거하는 작업을 해야한다.
         */
        this.body = null;
        /**
         * 아작스 요청이 성공했을 때 호출될 함수
         * @param data 성공해서 받은 데이터를 ContentGetType에 맞게 가공한 데이터
         * @param response 요청이 전달한 리스폰스
         */
        this.success = (data, response) => { };
        /**
         *  아작스 요청이 실패했을 때 호출될 함수
         * @param response 요청이 전달한 리스폰스
         */
        this.error = (response) => { };
    }
}
exports.AjaxCallOptionModel = AjaxCallOptionModel;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const DGU_AjaxAssist2_NoAuth_1 = __webpack_require__(/*! ./DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth */ "./src/DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth.ts");
class App {
    constructor() {
        /**  아작스 지원2(인증없는 버전) 개체 */
        this.AA = new DGU_AjaxAssist2_NoAuth_1.default();
        //GET를 동기로 호출
        let btnGetTest1 = document.getElementById("btnGetTest1");
        btnGetTest1.onclick = () => __awaiter(this, void 0, void 0, function* () {
            console.log("------- GET await (json) ------");
            let jsonData = yield this.AA.Call({
                method: "GET",
                url: "/api/keywords",
            });
            console.log(jsonData);
            console.log("------- GET await (string) ------");
            let jsonData2 = yield this.AA.Call({
                method: "GET",
                url: "/api/keywords",
                contentGetType: 0 /* AjaxCallContentGetType.Text */
            });
            console.log(jsonData2);
        });
        //GET를 비동기로 호출1
        let btnGetTest2_1 = document.getElementById("btnGetTest2_1");
        btnGetTest2_1.onclick = () => __awaiter(this, void 0, void 0, function* () {
            console.log("------- GET callback (json) : call ------");
            this.AA.CallAsync({
                method: "GET",
                url: "/api/keywords",
                success: (data, response) => {
                    console.log("------- GET callback (json) : resutl ------");
                    console.log(data);
                },
                error: (response) => {
                    console.log("------- GET callback (json) : error ------");
                    console.log(response);
                }
            });
        });
        //GET를 비동기로 호출2
        let btnGetTest2_2 = document.getElementById("btnGetTest2_2");
        btnGetTest2_2.onclick = () => __awaiter(this, void 0, void 0, function* () {
            console.log("------- GET Promise (json) : call ------");
            this.AA.CallAsync({
                method: "GET",
                url: "/api/keywords",
            }).then((response) => {
                console.log("------- GET Promise (json) : resutl ------");
                console.log(response.json());
            }).catch((response) => {
                console.log("------- GET Promise (json) : error ------");
                console.log(response);
            });
        });
    }
}
exports["default"] = App;
window.app = new App();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvREdVX0FqYXhBc3Npc3QyL0RHVV9BamF4QXNzaXN0Ml9Ob0F1dGgudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay8uL3NyYy9ER1VfQWpheEFzc2lzdDIvTW9kZWxEYXRhL0FqYXhDYWxsQ29udGVudEdldFR5cGUudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay8uL3NyYy9ER1VfQWpheEFzc2lzdDIvTW9kZWxEYXRhL0FqYXhDYWxsRmV0Y2hPcHRpb25JbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay8uL3NyYy9ER1VfQWpheEFzc2lzdDIvTW9kZWxEYXRhL0FqYXhDYWxsTWV0aG9kVHlwZS50cyIsIndlYnBhY2s6Ly9zdGFuZGFsb25ldHlwZXNjcmlwdF93ZWJwYWNrLy4vc3JjL0RHVV9BamF4QXNzaXN0Mi9Nb2RlbERhdGEvQWpheENhbGxPcHRpb25DaGVja0NvbXBsZXRlRGF0YU1vZGVsLnRzIiwid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvREdVX0FqYXhBc3Npc3QyL01vZGVsRGF0YS9BamF4Q2FsbE9wdGlvbk1vZGVsLnRzIiwid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGFuZGFsb25ldHlwZXNjcmlwdF93ZWJwYWNrL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBBamF4Q2FsbENvbnRlbnRHZXRUeXBlLCBBamF4Q2FsbE1ldGhvZFR5cGUsIEFqYXhDYWxsT3B0aW9uTW9kZWwsIEFqYXhDYWxsT3B0aW9uQ2hlY2tDb21wbGV0ZURhdGFNb2RlbCB9IGZyb20gXCIuL01vZGVsRGF0YS9BamF4Q2FsbE9wdGlvbk1vZGVsXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL01vZGVsRGF0YS9BamF4Q2FsbE9wdGlvbk1vZGVsXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOyVhOyekeyKpCDsp4Dsm5AyKOyduOymneyXhuuKlCDrsoTsoIQpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBER1VfQWpheEFzc2lzdDJfTm9BdXRoXHJcbntcclxuXHQvKiog7JWE7J6R7IqkIO2YuOy2nOyLnCDquLDrs7jqsJLsnLzroZwg7IKs7Jqp7ZWgIOyYteyFmCAqL1xyXG5cdHB1YmxpYyBDYWxsT3B0aW9uRGVmdWx0OiBBamF4Q2FsbE9wdGlvbk1vZGVsO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjYWxsT3B0aW9uRGVmdWx0PzogQWpheENhbGxPcHRpb25Nb2RlbClcclxuXHR7XHJcblx0XHRpZiAoY2FsbE9wdGlvbkRlZnVsdClcclxuXHRcdHsvL+q4sOuzuOqwkuycvOuhnCDsgqzsmqntlaAg7L2c7Ji17IWY7J20IOyeiOuLpC5cclxuXHJcblx0XHRcdC8v7KCE64us67Cb7J2AIOqwkuydhCDquLDrs7jqsJLsnLzroZwg7IKs7Jqp7ZWc64ukLlxyXG5cdFx0XHR0aGlzLkNhbGxPcHRpb25EZWZ1bHQgPSBjYWxsT3B0aW9uRGVmdWx0O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0ey8v7JeG64ukLlxyXG5cclxuXHRcdFx0Ly/snoTsnZjroZwg7IS47YyF65CcIOq4sOuzuOqwkuydhCDsgqzsmpTtlZzri6QuXHJcblx0XHRcdHRoaXMuQ2FsbE9wdGlvbkRlZnVsdCA9IHtcclxuXHRcdFx0XHRhd2FpdDogZmFsc2UsXHJcblx0XHRcdFx0Y29udGVudEdldFR5cGU6IEFqYXhDYWxsQ29udGVudEdldFR5cGUuSnNvbixcclxuXHRcdFx0XHRtZXRob2Q6IEFqYXhDYWxsTWV0aG9kVHlwZS5HZXQsXHJcblx0XHRcdFx0dXJsOiBcIlwiLFxyXG5cdFx0XHRcdGZldGNoT3B0aW9uOiB7XHJcblx0XHRcdFx0XHQvKiogbm8tY29ycywgY29ycywgKnNhbWUtb3JpZ2luICovXHJcblx0XHRcdFx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRcdFx0XHQvKiogLy8gKmRlZmF1bHQsIG5vLWNhY2hlLCByZWxvYWQsIGZvcmNlLWNhY2hlLCBvbmx5LWlmLWNhY2hlZCAqL1xyXG5cdFx0XHRcdFx0Y2FjaGU6ICduby1jYWNoZScsXHJcblx0XHRcdFx0XHQvKiogaW5jbHVkZSwgKnNhbWUtb3JpZ2luLCBvbWl0ICovXHJcblx0XHRcdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0XHRcdFx0XHQvKiogKi9cclxuXHRcdFx0XHRcdFx0Ly8sJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnXHJcblx0XHRcdFx0XHRcdC8vJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJyxcclxuXHRcdFx0XHRcdFx0LCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHQvKiogbWFudWFsLCAqZm9sbG93LCBlcnJvciAqL1xyXG5cdFx0XHRcdFx0cmVkaXJlY3Q6ICdmb2xsb3cnLFxyXG5cdFx0XHRcdFx0LyoqIG5vLXJlZmVycmVyLCAqY2xpZW50ICovXHJcblx0XHRcdFx0XHRyZWZlcnJlcjogJ25vLXJlZmVycmVyJyxcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRkYXRhOiBudWxsLFxyXG5cdFx0XHRcdGJvZHk6IG51bGwsXHJcblxyXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBvYmplY3QsIHJlc3BvbnNlOiBSZXNwb25zZSkgeyB9LFxyXG5cdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2U6IFJlc3BvbnNlKSB7IH0sXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogYWpheCDtmLjstpwo64+Z6riwKVxyXG5cdCAqIOuwmOuTr+ydtCBhd2FpdOuhnCDtmLjstpztlbTslbwg7ZWp64uI64ukLlxyXG5cdCAqIGFqYXjqsIAg7J2R64u17ZWg65WM6rmM7KeAIOq4sOuLpOuguOuLpOqwgCBjYWxsT3B0aW9uLmNvbnRlbnRHZXRUeXBlIOyEpOygleuQnCDqsrDqs7zqsJLsnLzroZwg66as7YS07ZWc64ukLlxyXG5cdCAqIFxyXG5cdCAqIGNhbGxPcHRpb24uc3VjY2VzcywgY2FsbE9wdGlvbi5lcnJvcuqwgCDsnojri6TrqbQg7Jqw7ISgIO2YuOy2nOuQnOuLpC5cclxuXHQgKiBAcGFyYW0gY2FsbE9wdGlvbiDslYTsnpHsiqQg7Zi47Lac7Ji17IWYKOu5hOyWtOyeiOuKlCDsmLXshZjsnYAg6riw67O47Ji17IWY7J20IOyCrOyaqeuQnOuLpC4pXHJcblx0ICogQHJldHVybnMgY2FsbE9wdGlvbi5jb250ZW50R2V0VHlwZeyXkCDrp57strAg67OA7ZmY65CcIGRhdGEuXHJcblx0ICog7JeQ65+s6rCAIOuwnOyDne2VnOqyveyasCDrrLTsobDqsbQgUmVzcG9uc2Xrpbwg66as7YS07ZWc64ukLlxyXG5cdCAqL1xyXG5cdHB1YmxpYyBDYWxsID0gYXN5bmMgKGNhbGxPcHRpb246IEFqYXhDYWxsT3B0aW9uTW9kZWwpXHJcblx0XHQ6IFByb21pc2U8bnVsbCB8IFJlc3BvbnNlIHwgQXJyYXlCdWZmZXIgfCBzdHJpbmcgfCBhbnk+ID0+XHJcblx0e1xyXG5cdFx0Ly/qsJXsoJwg7ISk7KCVIOuzgOqyvVxyXG5cdFx0Y2FsbE9wdGlvbi5hd2FpdCA9IHRydWU7XHJcblxyXG5cdFx0Ly/rpqzthLTsmqlcclxuXHRcdGxldCByZXR1cm5EYXRhOiBudWxsIHwgUmVzcG9uc2UgfCBBcnJheUJ1ZmZlciB8IHN0cmluZyB8IGFueSA9IG51bGw7XHJcblxyXG5cdFx0Ly/slYTsnpHsiqQg7Zi47Lac7JeQIOyCrOyaqe2VoCDsmLXshZjsnYQg7JmE7ISx7Iuc7YKo64ukLlxyXG5cdFx0bGV0IGpzb25DYWxsT3B0aW9uQ29tcGxldGU6IEFqYXhDYWxsT3B0aW9uQ2hlY2tDb21wbGV0ZURhdGFNb2RlbFxyXG5cdFx0XHQ9IHRoaXMuQ2FsbE9wdGlvbkNoZWNrKGNhbGxPcHRpb24pO1xyXG5cclxuXHRcdC8v7JWE7J6R7IqkIO2YuOy2nFxyXG5cdFx0YXdhaXQgZmV0Y2goanNvbkNhbGxPcHRpb25Db21wbGV0ZS51cmxUYXJnZXRcclxuXHRcdFx0XHRcdCwganNvbkNhbGxPcHRpb25Db21wbGV0ZS5jb21wbGV0ZUZldGNoKVxyXG5cdFx0XHQudGhlbigocmVzcG9uc2U6IFJlc3BvbnNlKSA9PlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/snZHri7XrjbDsnbTthLDrpbwg7ISk7KCV7JeQIOunnuqyjCDrs4DtmZjtlZzri6QuXHJcblx0XHRcdFx0cmV0dXJuRGF0YVxyXG5cdFx0XHRcdFx0PSB0aGlzLlJlc3BvbnNlVG9EYXRhKFxyXG5cdFx0XHRcdFx0XHRyZXNwb25zZVxyXG5cdFx0XHRcdFx0XHQsIGpzb25DYWxsT3B0aW9uQ29tcGxldGUuY2FsbE9wdGlvbi5jb250ZW50R2V0VHlwZSk7XHJcblxyXG5cdFx0XHRcdGpzb25DYWxsT3B0aW9uQ29tcGxldGUuY2FsbE9wdGlvbi5zdWNjZXNzKHJldHVybkRhdGEsIHJlc3BvbnNlKTtcclxuXHRcdFx0fSkuY2F0Y2goKHJlc3BvbnNlOiBSZXNwb25zZSkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybkRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRqc29uQ2FsbE9wdGlvbkNvbXBsZXRlLmNhbGxPcHRpb24uZXJyb3IocmVzcG9uc2UpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcmV0dXJuRGF0YTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIGFqYXgg7Zi47LacKOu5hOuPmeq4sClcclxuXHQgKiBhamF46rCAIOydkeuLteydhCDquLDri6Trpqzsp4Ag7JWK64qU64ukLlxyXG5cdCAqIOqysOqzvOulvCBjYWxsT3B0aW9uLnN1Y2Nlc3MsIGNhbGxPcHRpb24uZXJyb3LroZwg7KCE64us67Cb6rGw64KYIFxyXG5cdCAqIFByb21pc2XtjKjthLTsnYQg7IKs7Jqp7ZWY7JesIOuwm+ycvOuptCDrkJzri6QuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGNhbGxPcHRpb24g7JWE7J6R7IqkIO2YuOy2nOyYteyFmCjruYTslrTsnojripQg7Ji17IWY7J2AIOq4sOuzuOyYteyFmOydtCDsgqzsmqnrkJzri6QuKVxyXG5cdCAqIEByZXR1cm5zIOyCrOyaqeuQnCBQcm9taXNl6rCc7LK0XHJcblx0ICovXHJcblx0cHVibGljIENhbGxBc3luYyA9IChjYWxsT3B0aW9uOiBBamF4Q2FsbE9wdGlvbk1vZGVsKVxyXG5cdFx0OiBQcm9taXNlPFJlc3BvbnNlPiA9PlxyXG5cdHtcclxuXHRcdGNhbGxPcHRpb24uYXdhaXQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQganNvbkNhbGxPcHRpb25Db21wbGV0ZTogQWpheENhbGxPcHRpb25DaGVja0NvbXBsZXRlRGF0YU1vZGVsXHJcblx0XHRcdD0gdGhpcy5DYWxsT3B0aW9uQ2hlY2soY2FsbE9wdGlvbik7XHJcblx0XHRcclxuXHRcdC8v7JmE7ISx65CcIOumrOyKpO2PsOyKpFxyXG5cdFx0bGV0IHJldHVyblJlc3BBamF4UmVzdWx0OiBQcm9taXNlPFJlc3BvbnNlPiA9IG51bGw7XHJcblx0XHRcclxuXHRcdHJldHVyblJlc3BBamF4UmVzdWx0XHJcblx0XHRcdD0gZmV0Y2goanNvbkNhbGxPcHRpb25Db21wbGV0ZS51cmxUYXJnZXRcclxuXHRcdFx0XHQsIGpzb25DYWxsT3B0aW9uQ29tcGxldGUuY29tcGxldGVGZXRjaFxyXG5cdFx0XHQpLnRoZW4oKHJlc3BvbnNlOiBSZXNwb25zZSkgPT5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8v7KCE64us7JqpIOuNsOydtO2EsFxyXG5cdFx0XHRcdGxldCByZXR1cm5EYXRhOiBudWxsIHwgUmVzcG9uc2UgfCBBcnJheUJ1ZmZlciB8IHN0cmluZyB8IGFueSA9IG51bGw7XHJcblxyXG5cdFx0XHRcdC8v7J2R64u1642w7J207YSw66W8IOyEpOygleyXkCDrp57qsowg67OA7ZmY7ZWc64ukLlxyXG5cdFx0XHRcdC8vcmV0dXJuRGF0YVxyXG5cdFx0XHRcdC8vXHQ9IHRoaXMuUmVzcG9uc2VUb0RhdGEoXHJcblx0XHRcdFx0Ly9cdFx0cmVzcG9uc2VcclxuXHRcdFx0XHQvL1x0XHQsIGpzb25DYWxsT3B0aW9uQ29tcGxldGUuY2FsbE9wdGlvbi5jb250ZW50R2V0VHlwZSk7XHJcblxyXG5cdFx0XHRcdC8vanNvbkNhbGxPcHRpb25Db21wbGV0ZS5jYWxsT3B0aW9uLnN1Y2Nlc3MocmV0dXJuRGF0YSwgcmVzcG9uc2UpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2U7XHJcblx0XHRcdH0pLmNhdGNoKChyZXNwb25zZTogUmVzcG9uc2UpID0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRqc29uQ2FsbE9wdGlvbkNvbXBsZXRlLmNhbGxPcHRpb24uZXJyb3IocmVzcG9uc2UpO1xyXG5cdFx0XHRcdHJldHVybiByZXNwb25zZTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHJldHVyblJlc3BBamF4UmVzdWx0O1xyXG5cclxuXHR9Ly9lbmQgQ2FsbFxyXG5cclxuXHQvKipcclxuXHQgKiDslYTsnpHsiqQg7Zi47LacIOyYteyFmCDssrTtgaxcclxuXHQgKiBAcGFyYW0gY2FsbE9wdGlvblxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBDYWxsT3B0aW9uQ2hlY2sgPSAoXHJcblx0XHRjYWxsT3B0aW9uOiBBamF4Q2FsbE9wdGlvbk1vZGVsKVxyXG5cdFx0OiBBamF4Q2FsbE9wdGlvbkNoZWNrQ29tcGxldGVEYXRhTW9kZWwgPT5cclxuXHR7XHJcblx0XHQvL+yghOuLrOuQnCDsmLXshZgg7ZWp7LmY6riwKOuTpOyWtOyYqCDsmLXshZgg7Jqw7ISgKVxyXG5cdFx0bGV0IGNhbGxPcHQ6IEFqYXhDYWxsT3B0aW9uTW9kZWxcclxuXHRcdFx0PSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLkNhbGxPcHRpb25EZWZ1bHQsIGNhbGxPcHRpb24pO1xyXG5cdFx0Ly/rp4zslb0g7ZWY7JyE7Yq466W8IOyCrOyaqe2VoCDsmIjsoJXsnbTrqbQo7JiIPiBjYWxsT3B0LmZldGNoT3B0aW9uKVxyXG5cdFx0Ly/tlZjsnIQg7Yq466as64qUIO2PrOyduO2EsOqwgCDsoIDsnqXrkJjrr4DroZwg7IiY7J6R7JeF7Jy866GcIOuLpOyLnCDsoIDsnqXtlZzri6QuXHJcblxyXG5cdFx0Ly/slYTsnpHsiqQg7Zi47Lac7JeQIOyCrOyaqe2VoCDstZzsooUgRmV0Y2jsmLXshZhcclxuXHRcdC8v7IOI66GcIOyDneyEse2VtOyEnCDquLDrs7gg7Ji17IWY6rO8IOyghOuLrCDrsJvsnYAg7Ji17IWY7J2EIO2Vqey5nOuLpC5cclxuXHRcdGxldCBqc29uQ29tcGxldGVGZXRjaDogUmVxdWVzdEluaXRcclxuXHRcdFx0PSBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHRcdHt9XHJcblx0XHRcdFx0LCB0aGlzLkNhbGxPcHRpb25EZWZ1bHQuZmV0Y2hPcHRpb25cclxuXHRcdFx0XHQsIGNhbGxPcHRpb24uZmV0Y2hPcHRpb24pO1xyXG5cclxuXHJcblx0XHQvL3VybOydhCDqsJzssrTroZwg67OA6rK9XHJcblx0XHRsZXQgdXJsVGFyZ2V0OiBVUkwgPSBuZXcgVVJMKGNhbGxPcHQudXJsLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcclxuXHJcblxyXG5cdFx0aWYgKCEoY2FsbE9wdC5mZXRjaE9wdGlvbi5tZXRob2QpKVxyXG5cdFx0ey8vZmV0Y2hPcHRpb27sl5Ag66mU7IaM65Oc6rCAIOyXhuuLpC5cclxuXHRcdFx0anNvbkNvbXBsZXRlRmV0Y2gubWV0aG9kID0gY2FsbE9wdC5tZXRob2Q7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKEFqYXhDYWxsTWV0aG9kVHlwZS5HZXQgPT09IGpzb25Db21wbGV0ZUZldGNoLm1ldGhvZFxyXG5cdFx0XHR8fCBBamF4Q2FsbE1ldGhvZFR5cGUuSGVhZCA9PT0ganNvbkNvbXBsZXRlRmV0Y2gubWV0aG9kKVxyXG5cdFx0ey8v66mU7ISc65Oc6rCAIEdldCDsnbTqsbDrgphcclxuXHRcdFx0Ly/rqZTshJzrk5zqsIAgSGVhZCDsnbTri6QuXHJcblxyXG5cclxuXHRcdFx0Ly/rjbDsnbTthLAg7J6E7IucIOyggOyepVxyXG5cdFx0XHRsZXQgb2JqRGF0YVRlbXA6IG51bGwgfCBPYmplY3QgPSBudWxsO1xyXG5cclxuXHJcblxyXG5cdFx0XHRpZiAoanNvbkNvbXBsZXRlRmV0Y2guYm9keSlcclxuXHRcdFx0ey8vanNvbkNvbXBsZXRlRmV0Y2guYm9keeqwgCDsnojri6QuXHJcblxyXG5cdFx0XHRcdC8vanNvbkNvbXBsZXRlRmV0Y2guYm9keeqwgCAx7Iic7JyEXHJcblx0XHRcdFx0Ly/rsJTrlJTsnZgg64K07Jqp7J2EIOuNsOydtO2EsOuhnCDsmK7quLTri6QuXHJcblx0XHRcdFx0b2JqRGF0YVRlbXAgPSBqc29uQ29tcGxldGVGZXRjaC5ib2R5O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGNhbGxPcHQuZGF0YSlcclxuXHRcdFx0ey8vY2FsbE9wdC5kYXRh6rCAIOyeiOuLpC5cclxuXHJcblx0XHRcdFx0Ly9jYWxsT3B0LmRhdGHqsIAgMuyInOychFxyXG5cdFx0XHRcdG9iakRhdGFUZW1wID0gY2FsbE9wdC5kYXRhO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGNhbGxPcHQuYm9keSlcclxuXHRcdFx0ey8vY2FsbE9wdC5ib2R56rCAIOyeiOuLpC5cclxuXHJcblx0XHRcdFx0Ly9jYWxsT3B0LmJvZHnqsIAgM+yInOychFxyXG5cdFx0XHRcdG9iakRhdGFUZW1wID0gY2FsbE9wdC5ib2R5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+uwlOuUlOulvCDsoJzqsbDtlZzri6QuXHJcblx0XHRcdGRlbGV0ZSBqc29uQ29tcGxldGVGZXRjaFtcImJvZHlcIl07XHJcblxyXG5cdFx0XHQvL3VybOy/vOumrOulvCDrp4zrk6Dri6QuXHJcblx0XHRcdGlmIChvYmpEYXRhVGVtcClcclxuXHRcdFx0ey8v7KCE64us7ZWgIOuNsOydtO2EsOqwgCDsnojri6QuXHJcblxyXG5cdFx0XHRcdC8v7J20IOuplOyEnOuTnOuTpOydgCB1cmzsv7zrpqzroZwg642w7J207YSw66W8IOyghOuLrO2VtOyVvO2VmOuvgOuhnFxyXG5cdFx0XHRcdC8v642w7J207YSw66W8IFNlYXJjaFBhcmFtc+uhnCDrs4DtmZjtlZwg7ZuEXHJcblx0XHRcdFx0Ly/sg53shLHtlZwg7L+866as66W8IOusuOyekOyXtOuhnCDrsJTqv5Qg64Sj7Ja07KSA64ukLlxyXG5cdFx0XHRcdHVybFRhcmdldC5zZWFyY2hcclxuXHRcdFx0XHRcdD0gdGhpcy5Kc29uVG9TZWFyY2hQYXJhbXMob2JqRGF0YVRlbXApLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7Ly/snbTsmbjsnZgg66mU7ISc65OcXHJcblxyXG5cdFx0fVxyXG5cclxuXHJcblxyXG5cclxuXHRcdC8v7LWc7KKFIOyZhOyEseuQnCDsmpTssq0g7KCV67O066W8IOunjOuToOuLpC4qKioqKioqKioqKioqKioqXHJcblx0XHRsZXQgcmV0dXJuVGVtcDogQWpheENhbGxPcHRpb25DaGVja0NvbXBsZXRlRGF0YU1vZGVsXHJcblx0XHRcdD0gbmV3IEFqYXhDYWxsT3B0aW9uQ2hlY2tDb21wbGV0ZURhdGFNb2RlbCgpO1xyXG5cclxuXHRcdHJldHVyblRlbXAuY2FsbE9wdGlvbiA9IGNhbGxPcHQ7XHJcblx0XHRyZXR1cm5UZW1wLnVybFRhcmdldCA9IHVybFRhcmdldDtcclxuXHRcdHJldHVyblRlbXAuY29tcGxldGVGZXRjaCA9IGpzb25Db21wbGV0ZUZldGNoO1xyXG5cclxuXHRcdHJldHVybiByZXR1cm5UZW1wO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICoganNvbiDsmKTruIzsoJ3tirjrpbwgVVJMU2VhcmNoUGFyYW1z66GcIOuzgO2ZmO2VnOuLpC5cclxuXHQgKiBAcGFyYW0gb2JqZWN0XHJcblx0ICogQHJldHVybnNcclxuXHQgKi9cclxuXHRwcml2YXRlIEpzb25Ub1NlYXJjaFBhcmFtcyhvYmplY3Q6IG9iamVjdCk6IFVSTFNlYXJjaFBhcmFtc1xyXG5cdHtcclxuXHRcdGxldCB1cmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG5cdFx0Ly/tlZzqsJzslKkg64Sj7Ja07KSA64ukLlxyXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSlcclxuXHRcdHtcclxuXHRcdFx0dXJsU2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmxTZWFyY2hQYXJhbXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiDrpqzsiqTtj7DsiqQg642w7J207YSw66W8IOyYteyFmOyXkCDrp57qsowg67OA7ZmY7ZWY7JesIOumrO2EtO2VnOuLpC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0gcmVzcG9uc2VcclxuXHQgKiBAcGFyYW0gdHlwZUNvbnRlbnRHZXRcclxuXHQgKiBAcmV0dXJuc1xyXG5cdCAqL1xyXG5cdHByaXZhdGUgUmVzcG9uc2VUb0RhdGEoXHJcblx0XHRyZXNwb25zZTogUmVzcG9uc2VcclxuXHRcdCwgdHlwZUNvbnRlbnRHZXQ6IEFqYXhDYWxsQ29udGVudEdldFR5cGUpXHJcblx0XHQ6IHZvaWQgfCBSZXNwb25zZSB8IEFycmF5QnVmZmVyIHwgc3RyaW5nIHwgYW55XHJcblx0e1xyXG5cdFx0bGV0IG9ialJldHVybjogbnVsbCB8IFJlc3BvbnNlIHwgQXJyYXlCdWZmZXIgfCBzdHJpbmcgfCBhbnkgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0cnVlID09PSByZXNwb25zZS5vaylcclxuXHRcdHsvL+yEseqztVxyXG5cdFx0XHRcclxuXHRcdFx0c3dpdGNoICh0eXBlQ29udGVudEdldClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNhc2UgQWpheENhbGxDb250ZW50R2V0VHlwZS5SZXNwb25zZTpcclxuXHRcdFx0XHRcdG9ialJldHVybiA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBBamF4Q2FsbENvbnRlbnRHZXRUeXBlLkpzb246XHJcblx0XHRcdFx0XHRvYmpSZXR1cm4gPSByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEFqYXhDYWxsQ29udGVudEdldFR5cGUuQmluYXJ5OlxyXG5cdFx0XHRcdFx0b2JqUmV0dXJuID0gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRjYXNlIEFqYXhDYWxsQ29udGVudEdldFR5cGUuVGV4dDpcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0b2JqUmV0dXJuID0gcmVzcG9uc2UudGV4dCgpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb2JqUmV0dXJuO1xyXG5cdH0vL2VuZCBSZXNwb25zZVRvRGF0YVxyXG59XHJcblxyXG4iLCJcclxuLyoqIFxyXG4gKiAg7Luo7YOg7LigIO2DgOyehS5cclxuICogIOyXrOq4sOyXkCDsoJXsnZjrkJjsp4Ag7JWK7J2AIO2DgOyeheydgCDsspjrpqzqsIAg7JeG64ukLlxyXG4gKiAqL1xyXG5leHBvcnQgY29uc3QgZW51bSBBamF4Q2FsbENvbnRlbnRHZXRUeXBlXHJcbntcclxuXHQvKiogKOq4sOuzuOqwkilUZXh0LCBTdHJpbmcsIEhUTUwg65Ox65OxIO2FjeyKpO2KuCDsspjrpqzqsIAg6rCA64ql7ZWcIOuNsOydtO2EsCAqL1xyXG5cdFRleHQgPSAwLFxyXG5cdC8qKiDsoITri6zrkJwg66as7Iqk7Y+w7Iqk66W8IOq3uOuMgOuhnCDsoITri6ztlZzri6QuICovXHJcblx0UmVzcG9uc2UgPSAxLFxyXG5cdC8qKiBKc29uICovXHJcblx0SnNvbiA9IDIsXHJcblx0LyoqIOuwlOydtOuEiOumrCDrjbDsnbTthLAgKi9cclxuXHRCaW5hcnkgPSAzLFxyXG59XHJcbiIsIlxyXG4vKiog7JWE7J6R7Iqk66W8IO2YuOy2nO2VoOuVjCDsgqzsmqntlZjripQg6rOg6riJIOyYteyFmCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEFqYXhDYWxsRmV0Y2hPcHRpb25JbnRlcmZhY2Vcclxue1xyXG5cdC8qKiBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW4gKi9cclxuXHRtb2RlOiBzdHJpbmc7XHJcblxyXG5cdC8qKiAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkICovXHJcblx0Y2FjaGU6IHN0cmluZztcclxuXHJcblx0LyoqIGluY2x1ZGUsICpzYW1lLW9yaWdpbiwgb21pdCAqL1xyXG5cdGNyZWRlbnRpYWxzOiBzdHJpbmc7XHJcblxyXG5cdC8qKiAqL1xyXG5cdGhlYWRlcnM6IG9iamVjdDtcclxuXHJcblx0LyoqIG1hbnVhbCwgKmZvbGxvdywgZXJyb3IgKi9cclxuXHRyZWRpcmVjdDogc3RyaW5nO1xyXG5cclxuXHQvKiogbm8tcmVmZXJyZXIsICpjbGllbnQgKi9cclxuXHRyZWZlcnJlcjogc3RyaW5nO1xyXG5cdFxyXG59OyIsIlxyXG4vKiog7JWE7J6R7IqkIOyalOyyrSDrqZTshJzrk5wg7YOA7J6FICovXHJcbmV4cG9ydCBjbGFzcyBBamF4Q2FsbE1ldGhvZFR5cGUgXHJcbntcclxuXHQvKiog6rKA7IOJKOuwlOuUlOulvCDrqoXsi5zsoIHsnLzroZwg7KCc6rGw7ZW07JW87ZWoKSAqL1xyXG5cdHN0YXRpYyByZWFkb25seSBHZXQgOiBcIkdFVFwiO1xyXG5cdC8qKiDsg53shLEgKi9cclxuXHRzdGF0aWMgcmVhZG9ubHkgUG9zdDogXCJQT1NUXCI7XHJcblx0LyoqIOyImOyglSjsoITssrQpICovXHJcblx0c3RhdGljIHJlYWRvbmx5IFB1dDogXCJQVVRcIjtcclxuXHQvKiog7IiY7KCVKOydvOu2gCkgKi9cclxuXHRzdGF0aWMgcmVhZG9ubHkgUGF0Y2g6IFwiUEFUQ0hcIjtcclxuXHQvKiog7IKt7KCcICovXHJcblx0c3RhdGljIHJlYWRvbmx5IERlbGV0ZTogXCJERUxFVEVcIjtcclxuXHQvKiog6rKA7IOJKOuwlOuUlOulvCDrqoXsi5zsoIHsnLzroZwg7KCc6rGw7ZW07JW87ZWoKSAqL1xyXG5cdHN0YXRpYyByZWFkb25seSBIZWFkOiBcIkhFQURcIjtcclxufTsiLCJpbXBvcnQgeyBBamF4Q2FsbE9wdGlvbk1vZGVsIH0gZnJvbSBcIi4vQWpheENhbGxPcHRpb25Nb2RlbFwiO1xyXG5cclxuLyoqIFxyXG4gKiDslYTsnpHsiqQg7Zi47LacIOyYteyFmCDssrTtgawg7JmE66OMIOuNsOydtO2EsCDrqqjrjbhcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBamF4Q2FsbE9wdGlvbkNoZWNrQ29tcGxldGVEYXRhTW9kZWxcclxue1xyXG5cdC8qKiBcclxuXHQgKiDsoITri6zrsJvsnYAg7Ji17IWY7J2EIOy1nOyihSDqsIDqs7XtlZwg642w7J207YSwIFxyXG5cdCAqIOydtOqyg+ydhCDquLDspIDsnLzroZwg64uk66W4IOuNsOydtO2EsOuTpOydhCDsnpHshLHtlZzri6QuXHJcblx0ICovXHJcblx0Y2FsbE9wdGlvbjogQWpheENhbGxPcHRpb25Nb2RlbDtcclxuXHJcblx0LyoqIFxyXG5cdCAqIOy1nOyihSDsmpTssq3snYQg67O064K8IFVSTFxyXG5cdCAqIFVSTOy/vOumrOqwgCDtj6ztlajrkJwg7LWc7KKFIFVSTOydtOuLpC5cclxuXHQgKi9cclxuXHR1cmxUYXJnZXQ6IFVSTDtcclxuXHJcblx0LyoqIOyZhOyEseuQnCDstZzsooUgRmV0Y2ggKi9cclxuXHRjb21wbGV0ZUZldGNoOiBSZXF1ZXN0SW5pdDtcclxufTsiLCJpbXBvcnQgeyBBamF4Q2FsbENvbnRlbnRHZXRUeXBlIH0gZnJvbSBcIi4vQWpheENhbGxDb250ZW50R2V0VHlwZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9BamF4Q2FsbENvbnRlbnRHZXRUeXBlXCI7XHJcblxyXG5pbXBvcnQgeyBBamF4Q2FsbEZldGNoT3B0aW9uSW50ZXJmYWNlIH0gZnJvbSBcIi4vQWpheENhbGxGZXRjaE9wdGlvbkludGVyZmFjZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9BamF4Q2FsbEZldGNoT3B0aW9uSW50ZXJmYWNlXCI7XHJcblxyXG5pbXBvcnQgeyBBamF4Q2FsbE1ldGhvZFR5cGUgfSBmcm9tIFwiLi9BamF4Q2FsbE1ldGhvZFR5cGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQWpheENhbGxNZXRob2RUeXBlXCI7XHJcblxyXG5pbXBvcnQgeyBBamF4Q2FsbE9wdGlvbkNoZWNrQ29tcGxldGVEYXRhTW9kZWwgfSBmcm9tIFwiLi9BamF4Q2FsbE9wdGlvbkNoZWNrQ29tcGxldGVEYXRhTW9kZWxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vQWpheENhbGxPcHRpb25DaGVja0NvbXBsZXRlRGF0YU1vZGVsXCI7XHJcblxyXG5cclxuLyoqIOyVhOyekeyKpCDtmLjstpwg7Ji17IWYIOuqqOuNuCAqL1xyXG5leHBvcnQgY2xhc3MgQWpheENhbGxPcHRpb25Nb2RlbFxyXG57XHJcblx0LyoqIFxyXG5cdCAqIGF3YWl0IOyCrOyaqeyXrOu2gFxyXG5cdCAqIOq4sOuzuOqwkiA6IGZhbHNlXHJcblx0ICovXHJcblx0YXdhaXQ/OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8qKiBcclxuXHQgKiDsu6jtg6DsuKAg67Cb6riwIO2DgOyehS4gXHJcblx0ICog6riw67O46rCSIDogSnNvblxyXG5cdCAqIFxyXG5cdCAqIOy7qO2DoOy4oOulvCDrpqzthLTrsJvsnYTrlYwg7Ja065akIO2DgOyeheycvOuhnCDsspjrpqztlbTshJwg67Cb7J2E7KeA66W8IOyEpOygle2VnOuLpC4qL1xyXG5cdGNvbnRlbnRHZXRUeXBlPzogQWpheENhbGxDb250ZW50R2V0VHlwZSA9IEFqYXhDYWxsQ29udGVudEdldFR5cGUuSnNvbjtcclxuXHJcblx0LyoqIOyVhOyekeyKpCDsmpTssq0g66mU7ISc65OcIO2DgOyehVxyXG5cdCAqIOq4sOuzuOqwkiBnZXQgXHJcblx0ICogR0VULCBIRUFE64qUIOuwlOuUlOulvCDrqoXsi5zsoIHsnLzroZwg7KCc6rGw7ZW07JW87ZWc64ukLlxyXG5cdCAqICovXHJcblx0bWV0aG9kOiBcIkdFVFwiIHwgXCJQT1NUXCIgfCBcIlBVVFwiIHwgXCJQQVRDSFwiIHwgXCJERUxFVEVcIiB8IFwiSEVBRFwiXHJcblx0XHQ9IEFqYXhDYWxsTWV0aG9kVHlwZS5HZXQ7XHJcblxyXG5cdC8qKiDsgqzsmqntlaAg7KO87IaMICovXHJcblx0dXJsOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHJcblx0LyoqIFxyXG5cdCAqIOyVhOyekeyKpOqwgCDtmLjstpzrlYwo7JiIOmZldGNoKSDsmrDshKDsoIHsnLzroZwg7IKs7Jqp65CY64qUIOyYteyFmFxyXG5cdCAqIO2XpOuNlOyZgCDqsJnsnbQg7JWE7J6R7Iqk66W8IO2YuOy2nO2VoOuVjCDrs4Trj4TroZwg67OA6rK97ZW07JW8IO2VoCDrgrTsmqnsnbQg7J6I7Jy866m0IOuEo+uKlOuLpC5cclxuXHQgKiBcclxuXHQgKiDrp4zslb0g67O466y47J2YIO2VreuqqeqzvCDqsrnsuZzripQg7ZWt66qp7J20IOyeiOycvOuptCDsnbQg7Ji17IWY7J2EIOyasOyEoOyggeycvOuhnCDsgqzsmqntlbTslbwg7ZWc64ukLlxyXG5cdCAqL1xyXG5cdGZldGNoT3B0aW9uPzogUmVxdWVzdEluaXQgPVxyXG5cdFx0e1xyXG5cdFx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRcdGNhY2hlOiAnbm8tY2FjaGUnLFxyXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdCdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHRcdFx0XHQvKiogKi9cclxuXHRcdFx0XHQvLywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCdcclxuXHRcdFx0XHQvLydDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicsXHJcblx0XHRcdFx0LCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHJlZGlyZWN0OiAnZm9sbG93JyxcclxuXHRcdFx0cmVmZXJyZXI6ICduby1yZWZlcnJlcicsXHJcblxyXG5cdFx0XHRtZXRob2Q6IG51bGwsXHJcblx0XHRcdGJvZHk6IG51bGwsXHJcblx0XHR9O1xyXG5cclxuXHQvKiogXHJcblx0ICog642w7J207YSwIFxyXG5cdCAqIOyXrOq4sOyXkCDsnojripQg642w7J207YSw66W8IOyasOyEoO2VmOupsCwg7JeG7Jy866m0ICBib2R566W8IOyCrOyaqe2VnOuLpC5cclxuXHQgKiAqL1xyXG5cdGRhdGE/OiBudWxsIHwgb2JqZWN0ID0gbnVsbDtcclxuXHQvKiogXHJcblx0ICog67CU65SU7JeQIOuTpOyWtOqwiCDrgrTsmqlcclxuXHQgKiBcclxuXHQgKiBNZXRob2RUeXBlLkdldOulvCDsgqzsmqntlaDrlYzripQg66qF7Iuc7KCB7Jy866GcIGJvZHnrpbzsoJzqsbDtlZjripQg7J6R7JeF7J2EIO2VtOyVvO2VnOuLpC5cclxuXHQgKi9cclxuXHRib2R5PzogbnVsbCB8IG9iamVjdCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIOyVhOyekeyKpCDsmpTssq3snbQg7ISx6rO17ZaI7J2EIOuVjCDtmLjstpzrkKAg7ZWo7IiYXHJcblx0ICogQHBhcmFtIGRhdGEg7ISx6rO17ZW07IScIOuwm+ydgCDrjbDsnbTthLDrpbwgQ29udGVudEdldFR5cGXsl5Ag66ee6rKMIOqwgOqzte2VnCDrjbDsnbTthLBcclxuXHQgKiBAcGFyYW0gcmVzcG9uc2Ug7JqU7LKt7J20IOyghOuLrO2VnCDrpqzsiqTtj7DsiqRcclxuXHQgKi9cclxuXHRzdWNjZXNzPyA9IChkYXRhOiBudWxsIHwgUmVzcG9uc2UgfCBBcnJheUJ1ZmZlciB8IHN0cmluZyB8IGFueSwgcmVzcG9uc2U6IFJlc3BvbnNlKTogdm9pZCA9PiB7IH07XHJcblx0LyoqXHJcblx0ICogIOyVhOyekeyKpCDsmpTssq3snbQg7Iuk7Yyo7ZaI7J2EIOuVjCDtmLjstpzrkKAg7ZWo7IiYXHJcblx0ICogQHBhcmFtIHJlc3BvbnNlIOyalOyyreydtCDsoITri6ztlZwg66as7Iqk7Y+w7IqkXHJcblx0ICovXHJcblx0ZXJyb3I/ID0gKHJlc3BvbnNlOiBSZXNwb25zZSk6IHZvaWQgPT4geyB9O1xyXG59IiwiaW1wb3J0IERHVV9BamF4QXNzaXN0Ml9Ob0F1dGgsIHsgQWpheENhbGxDb250ZW50R2V0VHlwZSB9IGZyb20gXCIuL0RHVV9BamF4QXNzaXN0Mi9ER1VfQWpheEFzc2lzdDJfTm9BdXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBcclxue1xyXG5cdC8qKiAg7JWE7J6R7IqkIOyngOybkDIo7J247Kad7JeG64qUIOuyhOyghCkg6rCc7LK0ICovXHJcblx0cHJpdmF0ZSBBQTogREdVX0FqYXhBc3Npc3QyX05vQXV0aCA9IG5ldyBER1VfQWpheEFzc2lzdDJfTm9BdXRoKCk7XHJcblxyXG5cdC8qKiBHRVQg7YWM7Iqk7Yq4IOuyhO2KvCAqL1xyXG5cdHByaXZhdGUgYnRuR2V0VGVzdDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHRcclxuXHJcblx0XHQvL0dFVOulvCDrj5nquLDroZwg7Zi47LacXHJcblx0XHRsZXQgYnRuR2V0VGVzdDE6IEhUTUxCdXR0b25FbGVtZW50XHJcblx0XHRcdD0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5HZXRUZXN0MVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHRcdGJ0bkdldFRlc3QxLm9uY2xpY2sgPSBhc3luYyAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIGF3YWl0IChqc29uKSAtLS0tLS1cIik7XHJcblx0XHRcdGxldCBqc29uRGF0YTogSlNPTiA9XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5BQS5DYWxsKHtcclxuXHRcdFx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0XHRcdHVybDogXCIvYXBpL2tleXdvcmRzXCIsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdGNvbnNvbGUubG9nKGpzb25EYXRhKTtcclxuXHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIGF3YWl0IChzdHJpbmcpIC0tLS0tLVwiKTtcclxuXHRcdFx0bGV0IGpzb25EYXRhMjogc3RyaW5nID1cclxuXHRcdFx0XHRhd2FpdCB0aGlzLkFBLkNhbGwoe1xyXG5cdFx0XHRcdFx0bWV0aG9kOiBcIkdFVFwiLFxyXG5cdFx0XHRcdFx0dXJsOiBcIi9hcGkva2V5d29yZHNcIixcclxuXHRcdFx0XHRcdGNvbnRlbnRHZXRUeXBlOiBBamF4Q2FsbENvbnRlbnRHZXRUeXBlLlRleHRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdGNvbnNvbGUubG9nKGpzb25EYXRhMik7XHJcblx0XHR9O1xyXG5cclxuXHJcblxyXG5cclxuXHRcdC8vR0VU66W8IOu5hOuPmeq4sOuhnCDtmLjstpwxXHJcblx0XHRsZXQgYnRuR2V0VGVzdDJfMTogSFRNTEJ1dHRvbkVsZW1lbnRcclxuXHRcdFx0PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkdldFRlc3QyXzFcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblx0XHRidG5HZXRUZXN0Ml8xLm9uY2xpY2sgPSBhc3luYyAoKSA9PlxyXG5cdFx0e1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coXCItLS0tLS0tIEdFVCBjYWxsYmFjayAoanNvbikgOiBjYWxsIC0tLS0tLVwiKTtcclxuXHRcdFx0dGhpcy5BQS5DYWxsQXN5bmMoe1xyXG5cdFx0XHRcdG1ldGhvZDogXCJHRVRcIixcclxuXHRcdFx0XHR1cmw6IFwiL2FwaS9rZXl3b3Jkc1wiLFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChkYXRhOiBKU09OLCByZXNwb25zZTogUmVzcG9uc2UpID0+XHJcblx0XHRcdFx0ey8v7JWE7J6R7IqkIO2YuOy2nOydtCDshLHqs7XtlahcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIGNhbGxiYWNrIChqc29uKSA6IHJlc3V0bCAtLS0tLS1cIik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yOiAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PlxyXG5cdFx0XHRcdHsvL+yVhOyekeyKpCDtmLjstpzsnbQg7Iuk7Yyo7ZWoXHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCItLS0tLS0tIEdFVCBjYWxsYmFjayAoanNvbikgOiBlcnJvciAtLS0tLS1cIik7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vR0VU66W8IOu5hOuPmeq4sOuhnCDtmLjstpwyXHJcblx0XHRsZXQgYnRuR2V0VGVzdDJfMjogSFRNTEJ1dHRvbkVsZW1lbnRcclxuXHRcdFx0PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkdldFRlc3QyXzJcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblx0XHRidG5HZXRUZXN0Ml8yLm9uY2xpY2sgPSBhc3luYyAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIFByb21pc2UgKGpzb24pIDogY2FsbCAtLS0tLS1cIik7XHJcblx0XHRcdHRoaXMuQUEuQ2FsbEFzeW5jKHtcclxuXHRcdFx0XHRtZXRob2Q6IFwiR0VUXCIsXHJcblx0XHRcdFx0dXJsOiBcIi9hcGkva2V5d29yZHNcIixcclxuXHRcdFx0fSkudGhlbigocmVzcG9uc2U6IFJlc3BvbnNlKSA9PlxyXG5cdFx0XHR7Ly/slYTsnpHsiqQg7Zi47Lac7J20IOyEseqzte2VqFxyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIFByb21pc2UgKGpzb24pIDogcmVzdXRsIC0tLS0tLVwiKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZS5qc29uKCkpO1xyXG5cdFx0XHR9KS5jYXRjaCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PlxyXG5cdFx0XHR7Ly/slYTsnpHsiqQg7Zi47Lac7J20IOyLpO2MqO2VqFxyXG5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0gR0VUIFByb21pc2UgKGpzb24pIDogZXJyb3IgLS0tLS0tXCIpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0fVxyXG5cclxufVxyXG5cclxuKHdpbmRvdyBhcyBhbnkpLmFwcCA9IG5ldyBBcHAoKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9