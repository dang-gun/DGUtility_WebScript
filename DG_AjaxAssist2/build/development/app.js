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
        this.Call = (callOption) => __awaiter(this, void 0, void 0, function* () {
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
            //완성된 리스폰스
            let responseAjaxResult = null;
            //리스폰스 처리
            if (true === callOpt.await) { //응답 대기
                //responseAjaxResult
                //	= await fetch(urlTarget, jsonCompleteFetch);
                //let responseCheckResult
                //	= await AjaxAssist2.ResponseCheck(responseAjaxResult, jsonOpt);
                //if (null !== responseCheckResult)
                //{//성공
                //	jsonOpt.success(
                //		responseCheckResult
                //		, responseAjaxResult.status
                //		, responseAjaxResult);
                //}
                //else
                //{//실패
                //	let errorAA2 = new ErrorAA2(responseAjaxResult);
                //	jsonOpt.error(
                //		errorAA2.response
                //		, errorAA2.statusText
                //		, errorAA2
                //	);
                //}
            }
            else { //응답 대기 안함
            }
            return responseAjaxResult;
        }); //end Call
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
        //메뉴 추가
        let divMain = document.getElementById("divMain");
        divMain.innerHTML = "Test";
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const DGU_AjaxAssist2_NoAuth_1 = __webpack_require__(/*! ./DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth */ "./src/DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth.ts");
class App {
    constructor() {
        /**  아작스 지원2(인증없는 버전) 개체 */
        this.AA = new DGU_AjaxAssist2_NoAuth_1.default();
        //버튼과 연결
        this.btnGetTest = document.getElementById("btnGetTest");
        this.btnGetTest.onclick = () => {
            //this.AA.Call()
        };
    }
}
exports["default"] = App;
window.app = new App();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FDVixDQUFDO1FBRUg7OzthQUdLO1FBQ0wsU0FBSSxHQUFtQixJQUFJLENBQUM7UUFDNUI7Ozs7V0FJRztRQUNILFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRTVCOzs7O1dBSUc7UUFDSCxZQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFEOzs7V0FHRztRQUNILFVBQUssR0FBRyxDQUFDLFFBQWtCLEVBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQUE7QUEzRUQsa0RBMkVDOzs7Ozs7O1VDdEZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSx3SkFBOEU7QUFFOUUsTUFBcUIsR0FBRztJQVF2QjtRQU5BLDJCQUEyQjtRQUNuQixPQUFFLEdBQTJCLElBQUksZ0NBQXNCLEVBQUUsQ0FBQztRQVNqRSxRQUFRO1FBQ1IsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztRQUM3RSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFFOUIsZ0JBQWdCO1FBQ2pCLENBQUMsQ0FBQztJQUVILENBQUM7Q0FFRDtBQXJCRCx5QkFxQkM7QUFFQSxNQUFjLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGFuZGFsb25ldHlwZXNjcmlwdF93ZWJwYWNrLy4vc3JjL0RHVV9BamF4QXNzaXN0Mi9ER1VfQWpheEFzc2lzdDJfTm9BdXRoLnRzIiwid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvREdVX0FqYXhBc3Npc3QyL01vZGVsRGF0YS9BamF4Q2FsbENvbnRlbnRHZXRUeXBlLnRzIiwid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvREdVX0FqYXhBc3Npc3QyL01vZGVsRGF0YS9BamF4Q2FsbEZldGNoT3B0aW9uSW50ZXJmYWNlLnRzIiwid2VicGFjazovL3N0YW5kYWxvbmV0eXBlc2NyaXB0X3dlYnBhY2svLi9zcmMvREdVX0FqYXhBc3Npc3QyL01vZGVsRGF0YS9BamF4Q2FsbE1ldGhvZFR5cGUudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay8uL3NyYy9ER1VfQWpheEFzc2lzdDIvTW9kZWxEYXRhL0FqYXhDYWxsT3B0aW9uTW9kZWwudHMiLCJ3ZWJwYWNrOi8vc3RhbmRhbG9uZXR5cGVzY3JpcHRfd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdGFuZGFsb25ldHlwZXNjcmlwdF93ZWJwYWNrLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgQWpheENhbGxDb250ZW50R2V0VHlwZSwgQWpheENhbGxNZXRob2RUeXBlLCBBamF4Q2FsbE9wdGlvbk1vZGVsIH0gZnJvbSBcIi4vTW9kZWxEYXRhL0FqYXhDYWxsT3B0aW9uTW9kZWxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vTW9kZWxEYXRhL0FqYXhDYWxsT3B0aW9uTW9kZWxcIjtcclxuXHJcblxyXG4vKipcclxuICog7JWE7J6R7IqkIOyngOybkDIo7J247Kad7JeG64qUIOuyhOyghClcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERHVV9BamF4QXNzaXN0Ml9Ob0F1dGhcclxue1xyXG5cdC8qKiDslYTsnpHsiqQg7Zi47Lac7IucIOq4sOuzuOqwkuycvOuhnCDsgqzsmqntlaAg7Ji17IWYICovXHJcblx0cHVibGljIENhbGxPcHRpb25EZWZ1bHQ6IEFqYXhDYWxsT3B0aW9uTW9kZWw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNhbGxPcHRpb25EZWZ1bHQ/OiBBamF4Q2FsbE9wdGlvbk1vZGVsKVxyXG5cdHtcclxuXHRcdGlmIChjYWxsT3B0aW9uRGVmdWx0KVxyXG5cdFx0ey8v6riw67O46rCS7Jy866GcIOyCrOyaqe2VoCDsvZzsmLXshZjsnbQg7J6I64ukLlxyXG5cclxuXHRcdFx0Ly/soITri6zrsJvsnYAg6rCS7J2EIOq4sOuzuOqwkuycvOuhnCDsgqzsmqntlZzri6QuXHJcblx0XHRcdHRoaXMuQ2FsbE9wdGlvbkRlZnVsdCA9IGNhbGxPcHRpb25EZWZ1bHQ7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7Ly/sl4bri6QuXHJcblxyXG5cdFx0XHQvL+yehOydmOuhnCDshLjtjIXrkJwg6riw67O46rCS7J2EIOyCrOyalO2VnOuLpC5cclxuXHRcdFx0dGhpcy5DYWxsT3B0aW9uRGVmdWx0ID0ge1xyXG5cdFx0XHRcdGF3YWl0OiBmYWxzZSxcclxuXHRcdFx0XHRjb250ZW50R2V0VHlwZTogQWpheENhbGxDb250ZW50R2V0VHlwZS5Kc29uLFxyXG5cdFx0XHRcdG1ldGhvZDogQWpheENhbGxNZXRob2RUeXBlLkdldCxcclxuXHRcdFx0XHR1cmw6IFwiXCIsXHJcblx0XHRcdFx0ZmV0Y2hPcHRpb246IHtcclxuXHRcdFx0XHRcdC8qKiBuby1jb3JzLCBjb3JzLCAqc2FtZS1vcmlnaW4gKi9cclxuXHRcdFx0XHRcdG1vZGU6ICdjb3JzJyxcclxuXHRcdFx0XHRcdC8qKiAvLyAqZGVmYXVsdCwgbm8tY2FjaGUsIHJlbG9hZCwgZm9yY2UtY2FjaGUsIG9ubHktaWYtY2FjaGVkICovXHJcblx0XHRcdFx0XHRjYWNoZTogJ25vLWNhY2hlJyxcclxuXHRcdFx0XHRcdC8qKiBpbmNsdWRlLCAqc2FtZS1vcmlnaW4sIG9taXQgKi9cclxuXHRcdFx0XHRcdGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG5cdFx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0XHRcdFx0XHRcdC8qKiAqL1xyXG5cdFx0XHRcdFx0XHQvLywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCdcclxuXHRcdFx0XHRcdFx0Ly8nQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nLFxyXG5cdFx0XHRcdFx0XHQsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04J1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdC8qKiBtYW51YWwsICpmb2xsb3csIGVycm9yICovXHJcblx0XHRcdFx0XHRyZWRpcmVjdDogJ2ZvbGxvdycsXHJcblx0XHRcdFx0XHQvKiogbm8tcmVmZXJyZXIsICpjbGllbnQgKi9cclxuXHRcdFx0XHRcdHJlZmVycmVyOiAnbm8tcmVmZXJyZXInLFxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdGRhdGE6IG51bGwsXHJcblx0XHRcdFx0Ym9keTogbnVsbCxcclxuXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IG9iamVjdCwgcmVzcG9uc2U6IFJlc3BvbnNlKSB7IH0sXHJcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZTogUmVzcG9uc2UpIHsgfSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8v66mU64m0IOy2lOqwgFxyXG5cdFx0bGV0IGRpdk1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpdk1haW5cIik7XHJcblx0XHRkaXZNYWluLmlubmVySFRNTCA9IFwiVGVzdFwiO1xyXG5cdH1cclxuXHJcblx0cHVibGljIENhbGwgPSBhc3luYyAoY2FsbE9wdGlvbjogQWpheENhbGxPcHRpb25Nb2RlbClcclxuXHRcdDogbnVsbCB8IFByb21pc2U8UmVzcG9uc2U+ID0+XHJcblx0e1xyXG5cdFx0XHJcblx0XHQvL+yghOuLrOuQnCDsmLXshZgg7ZWp7LmY6riwKOuTpOyWtOyYqCDsmLXshZgg7Jqw7ISgKVxyXG5cdFx0bGV0IGNhbGxPcHQ6IEFqYXhDYWxsT3B0aW9uTW9kZWxcclxuXHRcdFx0PSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLkNhbGxPcHRpb25EZWZ1bHQsIGNhbGxPcHRpb24pO1xyXG5cdFx0Ly/rp4zslb0g7ZWY7JyE7Yq466W8IOyCrOyaqe2VoCDsmIjsoJXsnbTrqbQo7JiIPiBjYWxsT3B0LmZldGNoT3B0aW9uKVxyXG5cdFx0Ly/tlZjsnIQg7Yq466as64qUIO2PrOyduO2EsOqwgCDsoIDsnqXrkJjrr4DroZwg7IiY7J6R7JeF7Jy866GcIOuLpOyLnCDsoIDsnqXtlZzri6QuXHJcblxyXG5cdFx0Ly/slYTsnpHsiqQg7Zi47Lac7JeQIOyCrOyaqe2VoCDstZzsooUgRmV0Y2jsmLXshZhcclxuXHRcdC8v7IOI66GcIOyDneyEse2VtOyEnCDquLDrs7gg7Ji17IWY6rO8IOyghOuLrCDrsJvsnYAg7Ji17IWY7J2EIO2Vqey5nOuLpC5cclxuXHRcdGxldCBqc29uQ29tcGxldGVGZXRjaDogUmVxdWVzdEluaXRcclxuXHRcdFx0PSBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHRcdHt9XHJcblx0XHRcdFx0LCB0aGlzLkNhbGxPcHRpb25EZWZ1bHQuZmV0Y2hPcHRpb25cclxuXHRcdFx0XHQsIGNhbGxPcHRpb24uZmV0Y2hPcHRpb24pO1xyXG5cclxuXHJcblxyXG5cdFx0Ly91cmzsnYQg6rCc7LK066GcIOuzgOqyvVxyXG5cdFx0bGV0IHVybFRhcmdldDogVVJMID0gbmV3IFVSTChjYWxsT3B0LnVybCwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XHJcblxyXG5cclxuXHRcdGlmICghKGNhbGxPcHQuZmV0Y2hPcHRpb24ubWV0aG9kKSlcclxuXHRcdHsvL2ZldGNoT3B0aW9u7JeQIOuplOyGjOuTnOqwgCDsl4bri6QuXHJcblx0XHRcdGpzb25Db21wbGV0ZUZldGNoLm1ldGhvZCA9IGNhbGxPcHQubWV0aG9kO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChBamF4Q2FsbE1ldGhvZFR5cGUuR2V0ID09PSBqc29uQ29tcGxldGVGZXRjaC5tZXRob2RcclxuXHRcdFx0fHwgQWpheENhbGxNZXRob2RUeXBlLkhlYWQgPT09IGpzb25Db21wbGV0ZUZldGNoLm1ldGhvZClcclxuXHRcdHsvL+uplOyEnOuTnOqwgCBHZXQg7J206rGw64KYXHJcblx0XHRcdC8v66mU7ISc65Oc6rCAIEhlYWQg7J2064ukLlxyXG5cclxuXHJcblx0XHRcdC8v642w7J207YSwIOyehOyLnCDsoIDsnqVcclxuXHRcdFx0bGV0IG9iakRhdGFUZW1wOiBudWxsIHwgT2JqZWN0ID0gbnVsbDtcclxuXHJcblxyXG5cclxuXHRcdFx0aWYgKGpzb25Db21wbGV0ZUZldGNoLmJvZHkpXHJcblx0XHRcdHsvL2pzb25Db21wbGV0ZUZldGNoLmJvZHnqsIAg7J6I64ukLlxyXG5cclxuXHRcdFx0XHQvL2pzb25Db21wbGV0ZUZldGNoLmJvZHnqsIAgMeyInOychFxyXG5cdFx0XHRcdC8v67CU65SU7J2YIOuCtOyaqeydhCDrjbDsnbTthLDroZwg7Jiu6ri064ukLlxyXG5cdFx0XHRcdG9iakRhdGFUZW1wID0ganNvbkNvbXBsZXRlRmV0Y2guYm9keTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChjYWxsT3B0LmRhdGEpXHJcblx0XHRcdHsvL2NhbGxPcHQuZGF0YeqwgCDsnojri6QuXHJcblxyXG5cdFx0XHRcdC8vY2FsbE9wdC5kYXRh6rCAIDLsiJzsnIRcclxuXHRcdFx0XHRvYmpEYXRhVGVtcCA9IGNhbGxPcHQuZGF0YTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChjYWxsT3B0LmJvZHkpXHJcblx0XHRcdHsvL2NhbGxPcHQuYm9keeqwgCDsnojri6QuXHJcblxyXG5cdFx0XHRcdC8vY2FsbE9wdC5ib2R56rCAIDPsiJzsnIRcclxuXHRcdFx0XHRvYmpEYXRhVGVtcCA9IGNhbGxPcHQuYm9keTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly/rsJTrlJTrpbwg7KCc6rGw7ZWc64ukLlxyXG5cdFx0XHRkZWxldGUganNvbkNvbXBsZXRlRmV0Y2hbXCJib2R5XCJdO1xyXG5cclxuXHRcdFx0Ly91cmzsv7zrpqzrpbwg66eM65Og64ukLlxyXG5cdFx0XHRpZiAob2JqRGF0YVRlbXApXHJcblx0XHRcdHsvL+yghOuLrO2VoCDrjbDsnbTthLDqsIAg7J6I64ukLlxyXG5cclxuXHRcdFx0XHQvL+ydtCDrqZTshJzrk5zrk6TsnYAgdXJs7L+866as66GcIOuNsOydtO2EsOulvCDsoITri6ztlbTslbztlZjrr4DroZxcclxuXHRcdFx0XHQvL+uNsOydtO2EsOulvCBTZWFyY2hQYXJhbXProZwg67OA7ZmY7ZWcIO2bhFxyXG5cdFx0XHRcdC8v7IOd7ISx7ZWcIOy/vOumrOulvCDrrLjsnpDsl7TroZwg67CU6r+UIOuEo+yWtOykgOuLpC5cclxuXHRcdFx0XHR1cmxUYXJnZXQuc2VhcmNoXHJcblx0XHRcdFx0XHQ9IHRoaXMuSnNvblRvU2VhcmNoUGFyYW1zKG9iakRhdGFUZW1wKS50b1N0cmluZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0ey8v7J207Jm47J2YIOuplOyEnOuTnFxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRcclxuXHRcdC8v7JmE7ISx65CcIOumrOyKpO2PsOyKpFxyXG5cdFx0bGV0IHJlc3BvbnNlQWpheFJlc3VsdDogbnVsbCB8IFByb21pc2U8UmVzcG9uc2U+ID0gbnVsbDtcclxuXHJcblx0XHQvL+umrOyKpO2PsOyKpCDsspjrpqxcclxuXHRcdGlmICh0cnVlID09PSBjYWxsT3B0LmF3YWl0KVxyXG5cdFx0ey8v7J2R64u1IOuMgOq4sFxyXG5cclxuXHRcdFx0XHJcblx0XHRcdC8vcmVzcG9uc2VBamF4UmVzdWx0XHJcblx0XHRcdC8vXHQ9IGF3YWl0IGZldGNoKHVybFRhcmdldCwganNvbkNvbXBsZXRlRmV0Y2gpO1xyXG5cdFx0XHQvL2xldCByZXNwb25zZUNoZWNrUmVzdWx0XHJcblx0XHRcdC8vXHQ9IGF3YWl0IEFqYXhBc3Npc3QyLlJlc3BvbnNlQ2hlY2socmVzcG9uc2VBamF4UmVzdWx0LCBqc29uT3B0KTtcclxuXHRcdFx0Ly9pZiAobnVsbCAhPT0gcmVzcG9uc2VDaGVja1Jlc3VsdClcclxuXHRcdFx0Ly97Ly/shLHqs7VcclxuXHRcdFx0Ly9cdGpzb25PcHQuc3VjY2VzcyhcclxuXHRcdFx0Ly9cdFx0cmVzcG9uc2VDaGVja1Jlc3VsdFxyXG5cdFx0XHQvL1x0XHQsIHJlc3BvbnNlQWpheFJlc3VsdC5zdGF0dXNcclxuXHRcdFx0Ly9cdFx0LCByZXNwb25zZUFqYXhSZXN1bHQpO1xyXG5cdFx0XHQvL31cclxuXHRcdFx0Ly9lbHNlXHJcblx0XHRcdC8vey8v7Iuk7YyoXHJcblx0XHRcdC8vXHRsZXQgZXJyb3JBQTIgPSBuZXcgRXJyb3JBQTIocmVzcG9uc2VBamF4UmVzdWx0KTtcclxuXHRcdFx0Ly9cdGpzb25PcHQuZXJyb3IoXHJcblx0XHRcdC8vXHRcdGVycm9yQUEyLnJlc3BvbnNlXHJcblx0XHRcdC8vXHRcdCwgZXJyb3JBQTIuc3RhdHVzVGV4dFxyXG5cdFx0XHQvL1x0XHQsIGVycm9yQUEyXHJcblx0XHRcdC8vXHQpO1xyXG5cdFx0XHQvL31cclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHsvL+ydkeuLtSDrjIDquLAg7JWI7ZWoXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXNwb25zZUFqYXhSZXN1bHQ7XHJcblxyXG5cdH0vL2VuZCBDYWxsXHJcblxyXG5cdC8qKlxyXG5cdCAqIGpzb24g7Jik67iM7KCd7Yq466W8IFVSTFNlYXJjaFBhcmFtc+uhnCDrs4DtmZjtlZzri6QuXHJcblx0ICogQHBhcmFtIG9iamVjdFxyXG5cdCAqIEByZXR1cm5zXHJcblx0ICovXHJcblx0cHJpdmF0ZSBKc29uVG9TZWFyY2hQYXJhbXMob2JqZWN0OiBvYmplY3QpOiBVUkxTZWFyY2hQYXJhbXNcclxuXHR7XHJcblx0XHRsZXQgdXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuXHRcdC8v7ZWc6rCc7JSpIOuEo+yWtOykgOuLpC5cclxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpXHJcblx0XHR7XHJcblx0XHRcdHVybFNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXJsU2VhcmNoUGFyYW1zO1xyXG5cdH1cclxufVxyXG5cclxuIiwiXHJcbi8qKiBcclxuICogIOy7qO2DoOy4oCDtg4DsnoUuXHJcbiAqICDsl6zquLDsl5Ag7KCV7J2Y65CY7KeAIOyViuydgCDtg4DsnoXsnYAg7LKY66as6rCAIOyXhuuLpC5cclxuICogKi9cclxuZXhwb3J0IGNvbnN0IGVudW0gQWpheENhbGxDb250ZW50R2V0VHlwZVxyXG57XHJcblx0LyoqICjquLDrs7jqsJIpVGV4dCwgSHRtbCDrk7Hrk7Eg7YWN7Iqk7Yq4IOyymOumrOqwgCDqsIDriqXtlZwg642w7J207YSwICovXHJcblx0VGV4dCA9IDAsXHJcblx0LyoqIOyghOuLrOuQnCDrpqzsiqTtj7DsiqTrpbwg6re464yA66GcIOyghOuLrO2VnOuLpC4gKi9cclxuXHRSZXNwb25zZSA9IDEsXHJcblx0LyoqIEpzb24gKi9cclxuXHRKc29uID0gMixcclxuXHQvKiog67CU7J2064SI66asIOuNsOydtO2EsCAqL1xyXG5cdEJpbmFyeSA9IDMsXHJcbn1cclxuIiwiXHJcbi8qKiDslYTsnpHsiqTrpbwg7Zi47Lac7ZWg65WMIOyCrOyaqe2VmOuKlCDqs6DquIkg7Ji17IWYICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQWpheENhbGxGZXRjaE9wdGlvbkludGVyZmFjZVxyXG57XHJcblx0LyoqIG5vLWNvcnMsIGNvcnMsICpzYW1lLW9yaWdpbiAqL1xyXG5cdG1vZGU6IHN0cmluZztcclxuXHJcblx0LyoqIC8vICpkZWZhdWx0LCBuby1jYWNoZSwgcmVsb2FkLCBmb3JjZS1jYWNoZSwgb25seS1pZi1jYWNoZWQgKi9cclxuXHRjYWNoZTogc3RyaW5nO1xyXG5cclxuXHQvKiogaW5jbHVkZSwgKnNhbWUtb3JpZ2luLCBvbWl0ICovXHJcblx0Y3JlZGVudGlhbHM6IHN0cmluZztcclxuXHJcblx0LyoqICovXHJcblx0aGVhZGVyczogb2JqZWN0O1xyXG5cclxuXHQvKiogbWFudWFsLCAqZm9sbG93LCBlcnJvciAqL1xyXG5cdHJlZGlyZWN0OiBzdHJpbmc7XHJcblxyXG5cdC8qKiBuby1yZWZlcnJlciwgKmNsaWVudCAqL1xyXG5cdHJlZmVycmVyOiBzdHJpbmc7XHJcblx0XHJcbn07IiwiXHJcbi8qKiDslYTsnpHsiqQg7JqU7LKtIOuplOyEnOuTnCDtg4DsnoUgKi9cclxuZXhwb3J0IGNsYXNzIEFqYXhDYWxsTWV0aG9kVHlwZSBcclxue1xyXG5cdC8qKiDqsoDsg4ko67CU65SU66W8IOuqheyLnOyggeycvOuhnCDsoJzqsbDtlbTslbztlagpICovXHJcblx0c3RhdGljIHJlYWRvbmx5IEdldCA6IFwiR0VUXCI7XHJcblx0LyoqIOyDneyEsSAqL1xyXG5cdHN0YXRpYyByZWFkb25seSBQb3N0OiBcIlBPU1RcIjtcclxuXHQvKiog7IiY7KCVKOyghOyytCkgKi9cclxuXHRzdGF0aWMgcmVhZG9ubHkgUHV0OiBcIlBVVFwiO1xyXG5cdC8qKiDsiJjsoJUo7J2867aAKSAqL1xyXG5cdHN0YXRpYyByZWFkb25seSBQYXRjaDogXCJQQVRDSFwiO1xyXG5cdC8qKiDsgq3soJwgKi9cclxuXHRzdGF0aWMgcmVhZG9ubHkgRGVsZXRlOiBcIkRFTEVURVwiO1xyXG5cdC8qKiDqsoDsg4ko67CU65SU66W8IOuqheyLnOyggeycvOuhnCDsoJzqsbDtlbTslbztlagpICovXHJcblx0c3RhdGljIHJlYWRvbmx5IEhlYWQ6IFwiSEVBRFwiO1xyXG59OyIsImltcG9ydCB7IEFqYXhDYWxsQ29udGVudEdldFR5cGUgfSBmcm9tIFwiLi9BamF4Q2FsbENvbnRlbnRHZXRUeXBlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0FqYXhDYWxsQ29udGVudEdldFR5cGVcIjtcclxuXHJcbmltcG9ydCB7IEFqYXhDYWxsRmV0Y2hPcHRpb25JbnRlcmZhY2UgfSBmcm9tIFwiLi9BamF4Q2FsbEZldGNoT3B0aW9uSW50ZXJmYWNlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL0FqYXhDYWxsRmV0Y2hPcHRpb25JbnRlcmZhY2VcIjtcclxuXHJcbmltcG9ydCB7IEFqYXhDYWxsTWV0aG9kVHlwZSB9IGZyb20gXCIuL0FqYXhDYWxsTWV0aG9kVHlwZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9BamF4Q2FsbE1ldGhvZFR5cGVcIjtcclxuXHJcblxyXG4vKiog7JWE7J6R7IqkIO2YuOy2nCDsmLXshZgg66qo6424ICovXHJcbmV4cG9ydCBjbGFzcyBBamF4Q2FsbE9wdGlvbk1vZGVsXHJcbntcclxuXHQvKiogXHJcblx0ICogYXdhaXQg7IKs7Jqp7Jes67aAXHJcblx0ICog6riw67O46rCSIDogZmFsc2VcclxuXHQgKi9cclxuXHRhd2FpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvKiogXHJcblx0ICog7Luo7YOg7LigIOuwm+q4sCDtg4DsnoUuIFxyXG5cdCAqIOq4sOuzuOqwkiA6IEpzb25cclxuXHQgKiBcclxuXHQgKiDsu6jtg6DsuKDrpbwg66as7YS067Cb7J2E65WMIOyWtOuWpCDtg4DsnoXsnLzroZwg7LKY66as7ZW07IScIOuwm+ydhOyngOulvCDshKTsoJXtlZzri6QuKi9cclxuXHRjb250ZW50R2V0VHlwZTogQWpheENhbGxDb250ZW50R2V0VHlwZSA9IEFqYXhDYWxsQ29udGVudEdldFR5cGUuSnNvbjtcclxuXHJcblx0LyoqIOyVhOyekeyKpCDsmpTssq0g66mU7ISc65OcIO2DgOyehVxyXG5cdCAqIOq4sOuzuOqwkiBnZXQgXHJcblx0ICogR0VULCBIRUFE64qUIOuwlOuUlOulvCDrqoXsi5zsoIHsnLzroZwg7KCc6rGw7ZW07JW87ZWc64ukLlxyXG5cdCAqICovXHJcblx0bWV0aG9kOiBcIkdFVFwiIHwgXCJQT1NUXCIgfCBcIlBVVFwiIHwgXCJQQVRDSFwiIHwgXCJERUxFVEVcIiB8IFwiSEVBRFwiXHJcblx0XHQ9IEFqYXhDYWxsTWV0aG9kVHlwZS5HZXQ7XHJcblxyXG5cdC8qKiDsgqzsmqntlaAg7KO87IaMICovXHJcblx0dXJsOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHJcblx0LyoqIFxyXG5cdCAqIOyVhOyekeyKpOqwgCDtmLjstpzrlYwo7JiIOmZldGNoKSDsmrDshKDsoIHsnLzroZwg7IKs7Jqp65CY64qUIOyYteyFmFxyXG5cdCAqIO2XpOuNlOyZgCDqsJnsnbQg7JWE7J6R7Iqk66W8IO2YuOy2nO2VoOuVjCDrs4Trj4TroZwg67OA6rK97ZW07JW8IO2VoCDrgrTsmqnsnbQg7J6I7Jy866m0IOuEo+uKlOuLpC5cclxuXHQgKiBcclxuXHQgKiDrp4zslb0g67O466y47J2YIO2VreuqqeqzvCDqsrnsuZzripQg7ZWt66qp7J20IOyeiOycvOuptCDsnbQg7Ji17IWY7J2EIOyasOyEoOyggeycvOuhnCDsgqzsmqntlbTslbwg7ZWc64ukLlxyXG5cdCAqL1xyXG5cdGZldGNoT3B0aW9uPzogUmVxdWVzdEluaXQgPVxyXG5cdFx0e1xyXG5cdFx0XHRtb2RlOiAnY29ycycsXHJcblx0XHRcdGNhY2hlOiAnbm8tY2FjaGUnLFxyXG5cdFx0XHRjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdCdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHRcdFx0XHQvKiogKi9cclxuXHRcdFx0XHQvLywnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCdcclxuXHRcdFx0XHQvLydDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicsXHJcblx0XHRcdFx0LCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOCdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHJlZGlyZWN0OiAnZm9sbG93JyxcclxuXHRcdFx0cmVmZXJyZXI6ICduby1yZWZlcnJlcicsXHJcblxyXG5cdFx0XHRtZXRob2Q6IG51bGwsXHJcblx0XHRcdGJvZHk6IG51bGwsXHJcblx0XHR9O1xyXG5cclxuXHQvKiogXHJcblx0ICog642w7J207YSwIFxyXG5cdCAqIOyXrOq4sOyXkCDsnojripQg642w7J207YSw66W8IOyasOyEoO2VmOupsCwg7JeG7Jy866m0ICBib2R566W8IOyCrOyaqe2VnOuLpC5cclxuXHQgKiAqL1xyXG5cdGRhdGE/OiBudWxsIHwgb2JqZWN0ID0gbnVsbDtcclxuXHQvKiogXHJcblx0ICog67CU65SU7JeQIOuTpOyWtOqwiCDrgrTsmqlcclxuXHQgKiBcclxuXHQgKiBNZXRob2RUeXBlLkdldOulvCDsgqzsmqntlaDrlYzripQg66qF7Iuc7KCB7Jy866GcIGJvZHnrpbzsoJzqsbDtlZjripQg7J6R7JeF7J2EIO2VtOyVvO2VnOuLpC5cclxuXHQgKi9cclxuXHRib2R5PzogbnVsbCB8IG9iamVjdCA9IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIOyVhOyekeyKpCDsmpTssq3snbQg7ISx6rO17ZaI7J2EIOuVjCDtmLjstpzrkKAg7ZWo7IiYXHJcblx0ICogQHBhcmFtIGRhdGEg7ISx6rO17ZW07IScIOuwm+ydgCDrjbDsnbTthLDrpbwgQ29udGVudEdldFR5cGXsl5Ag66ee6rKMIOqwgOqzte2VnCDrjbDsnbTthLBcclxuXHQgKiBAcGFyYW0gcmVzcG9uc2Ug7JqU7LKt7J20IOyghOuLrO2VnCDrpqzsiqTtj7DsiqRcclxuXHQgKi9cclxuXHRzdWNjZXNzID0gKGRhdGE6IG9iamVjdCwgcmVzcG9uc2U6IFJlc3BvbnNlKTogdm9pZCA9PiB7IH07XHJcblx0LyoqXHJcblx0ICogIOyVhOyekeyKpCDsmpTssq3snbQg7Iuk7Yyo7ZaI7J2EIOuVjCDtmLjstpzrkKAg7ZWo7IiYXHJcblx0ICogQHBhcmFtIHJlc3BvbnNlIOyalOyyreydtCDsoITri6ztlZwg66as7Iqk7Y+w7IqkXHJcblx0ICovXHJcblx0ZXJyb3IgPSAocmVzcG9uc2U6IFJlc3BvbnNlKTogdm9pZCA9PiB7IH07XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IERHVV9BamF4QXNzaXN0Ml9Ob0F1dGggZnJvbSBcIi4vREdVX0FqYXhBc3Npc3QyL0RHVV9BamF4QXNzaXN0Ml9Ob0F1dGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFxyXG57XHJcblx0LyoqICDslYTsnpHsiqQg7KeA7JuQMijsnbjspp3sl4bripQg67KE7KCEKSDqsJzssrQgKi9cclxuXHRwcml2YXRlIEFBOiBER1VfQWpheEFzc2lzdDJfTm9BdXRoID0gbmV3IERHVV9BamF4QXNzaXN0Ml9Ob0F1dGgoKTtcclxuXHJcblx0LyoqIEdFVCDthYzsiqTtirgg67KE7Yq8ICovXHJcblx0cHJpdmF0ZSBidG5HZXRUZXN0OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcblx0Y29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdFxyXG5cclxuXHRcdC8v67KE7Yq86rO8IOyXsOqysFxyXG5cdFx0dGhpcy5idG5HZXRUZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5HZXRUZXN0XCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5cdFx0dGhpcy5idG5HZXRUZXN0Lm9uY2xpY2sgPSAoKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHQvL3RoaXMuQUEuQ2FsbCgpXHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4od2luZG93IGFzIGFueSkuYXBwID0gbmV3IEFwcCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=