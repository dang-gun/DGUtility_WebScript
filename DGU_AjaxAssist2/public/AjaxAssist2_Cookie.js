/*
* 이 프로젝트에서 자주쓰는 아작스 호출 형식을 미리 정의 한다.
* 
* 응답에 대기하려면 await를 사용한다.(jsonOption.await을 true 로 줘야 한다.)
 * 
 
  * AjaxAssist2_Cookie (쿠키버전)
  * 쿠키버전은 인증정보를 해더에 담는 처리가 필요없다.
  * jquery ajax 형식 제외 : 기존에 지원하던 jquery ajax형식을 지원하지 않는다.
*/
export let AjaxAssist2 = {};

/**
 * AjaxAssist2에서 에러가 발생할때 
 * @param {any} responseAjaxResult
 */
export function ErrorAA2(responseAjaxResult)
{
    this.response = responseAjaxResult;
    this.status = this.response.status;
    this.statusText = this.response.statusText;;
    this.stack = (new Error()).stack;
}

/** 아작스 요청 타입 */
AjaxAssist2.AjaxType = {
    /** 검색 */
    Get: "GET",
    /** 생성 */
    Post: "POST",
    /** 수정(전체) */
    Put: "PUT",
    /** 수정(일부) */
    Patch: "PATCH",
    /** 삭제 */
    Delete: "DELETE",
    /** 검색(바디 없음) */
    Head: "HEAD",
};

/** 
 *  컨탠츠 타입.
 *  여기에 정의되지 않은 타입은 처리가 없다.
 * */
AjaxAssist2.ContentGetType = {
    /** (기본값)Text, Html 등등 텍스트 처리가 가능한 데이터 */
    Text: 0,
    /** 전달된 리스폰스를 그대로 전달한다. */
    Response: 1,
    /** Json */
    Json: 2,
    /** 바이너리 데이터 */
    Binary: 3,
};

/** 아작스 기본 옵션 */
AjaxAssist2.OptionDefult = {
    /** await 사용여부 */
    await: false
    /** 컨탠츠 받기 타입. 
     * AjaxAssist2.ContentGetType 사용.
     * 컨탠츠를 리턴받을때 어떤 타입으로 처리해서 받을지를 설정한다.*/
    , contentGetType: AjaxAssist2.ContentGetType.Json
    /** 메소드 : 기본값 get */
    , method: AjaxAssist2.AjaxType.Get
    /** 사용할 주소 */
    , url: ""

    /** fetch를 호출할때 강제로 전달하고 싶은 데이터가 있다면 여기에 입력한다.
     * 이 옵션이 가장 우선 된다.*/
    , fetchOption: {
        /** no-cors, cors, *same-origin */
        mode: 'cors'
        /** // *default, no-cache, reload, force-cache, only-if-cached */
        , cache: 'no-cache'
        /** include, *same-origin, omit */
        , credentials: 'same-origin'
        , headers: {
            'Accept': 'application/json'
            /** */
            //,'Content-Type': 'application/json;charset=utf-8'
            //'Content-Type': 'text/plain',
            , 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        /** manual, *follow, error */
        , redirect: 'follow'
        /** no-referrer, *client */
        , referrer: 'no-referrer'
    }

    /** 데이터 : 여기에 있는 데이터를 우선하며, 없으면  body를 사용한다.*/
    , data: {}
    , success: function (data) { }
    , error: function (obj, sStatus, sStatusText) { }
};

/**
 * get로 아작스 요청을 한다.
 * @param {json} jsonOption jsonOption 아작스 요청에 사용할 옵션 데이터. 지정하지 않은 옵션은기본 옵션을 사용한다.
 */
AjaxAssist2.get = async function (jsonOption)
{
    jsonOption.method = AjaxAssist2.AjaxType.Get;
    if (true === jsonOption.await)
    {//응답 대기
        return await AjaxAssist2.call(jsonOption);
    }
    else
    {
        return AjaxAssist2.call(jsonOption);
    }
};
/**
 * post로 아작스 요청을 한다.
 * @param {json} jsonOption jsonOption 아작스 요청에 사용할 옵션 데이터. 지정하지 않은 옵션은기본 옵션을 사용한다.
 */
AjaxAssist2.post = async function (jsonOption)
{
    jsonOption.method = AjaxAssist2.AjaxType.Post;
    if (true === jsonOption.await)
    {//응답 대기
        return await AjaxAssist2.call(jsonOption);
    }
    else
    {
        return AjaxAssist2.call(jsonOption);
    }
};
/**
 * put로 아작스 요청을 한다.
 * @param {json} jsonOption jsonOption 아작스 요청에 사용할 옵션 데이터. 지정하지 않은 옵션은기본 옵션을 사용한다.
 */
AjaxAssist2.put = async function (jsonOption)
{
    jsonOption.method = AjaxAssist2.AjaxType.Put;
    if (true === jsonOption.await)
    {//응답 대기
        return await AjaxAssist2.call(jsonOption);
    }
    else
    {
        return AjaxAssist2.call(jsonOption);
    }
};
/**
 * patch로 아작스 요청을 한다.
 * @param {json} jsonOption jsonOption 아작스 요청에 사용할 옵션 데이터. 지정하지 않은 옵션은기본 옵션을 사용한다.
 */
AjaxAssist2.patch = async function (jsonOption)
{
    jsonOption.method = AjaxAssist2.AjaxType.Patch;
    if (true === jsonOption.await)
    {//응답 대기
        return await AjaxAssist2.call(jsonOption);
    }
    else
    {
        return AjaxAssist2.call(jsonOption);
    }
};
/**
 * delete로 아작스 요청을 한다.
 * @param {json} jsonOption jsonOption 아작스 요청에 사용할 옵션 데이터. 지정하지 않은 옵션은기본 옵션을 사용한다.
 */
AjaxAssist2.delete = async function (jsonOption)
{
    jsonOption.method = AjaxAssist2.AjaxType.Delete;
    if (true === jsonOption.await)
    {//응답 대기
        return await AjaxAssist2.call(jsonOption);
    }
    else
    {
        return AjaxAssist2.call(jsonOption);
    }
};

/**
 * 전달받은 옵션으로 api를 호출한다.
 * @param {any} jsonOption
 */
AjaxAssist2.call = async function (jsonOption)
{
    //옵션 저장
    let jsonOpt = Object.assign({}, AjaxAssist2.OptionDefult, jsonOption);
    //하위 트리는 포인터가 저장되므로 수작업으로 다시 저장한다.
    jsonOpt.fetchOption = Object.assign({}
                            , AjaxAssist2.OptionDefult.fetchOption
                            , jsonOption.fetchOption);


    //url을 개체로 변경
    jsonOpt.UrlObj = new URL(jsonOpt.url, window.location.origin);

    if (undefined === jsonOpt.fetchOption.method
        || null === jsonOpt.fetchOption.method
        || "" === jsonOpt.fetchOption.method)
    {//fetchOption에 메소드가 없다.
        jsonOpt.fetchOption.method = jsonOpt.method;
    }

    //메소드 대문자로 변환
    jsonOpt.fetchOption.method = jsonOpt.fetchOption.method.toUpperCase();

    if (AjaxAssist2.AjaxType.Get === jsonOpt.fetchOption.method
        || AjaxAssist2.AjaxType.Head === jsonOpt.fetchOption.method)
    {//메소드가 Get 이거나
        //메소드가 Head 이다.

        //Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body.
        //'창'에서 '가져오기' 실행 실패: GET/HEAD 메서드를 사용한 요청은 본문을 가질 수 없습니다.

        //바디 내용 저장
        if (undefined === jsonOpt.fetchOption.body
            || null === jsonOpt.fetchOption.body
            || "" === jsonOpt.fetchOption.body
            || {} === jsonOpt.fetchOption.body)
        {//바디 내용이 없다.
        }
        else
        {
            //바디의 내용을 데이터로 옮긴다.
            jsonOpt.data = jsonOpt.fetchOption.body;
        }

        //바디를 제거한다.
        delete jsonOpt.fetchOption["body"];

        //url쿼리를 만든다.
        jsonOpt.UrlObj.search
            = new URLSearchParams(jsonOpt.data);
    }
    else
    {//이외의 메소드

        let bJson = false;
        let sContentType = jsonOpt.fetchOption.headers["Content-Type"];


        if ("string" === (typeof sContentType))
        {
            if (-1 < sContentType.indexOf("application/x-www-form-urlencoded"))
            {
                //"application/x-www-form-urlencoded"인경우
                //json 형식이 아니고 url 쿼리모양으로 바꿔야 한다.
                //예> nData=1000&sData="test111"
                jsonOpt.body = (new URLSearchParams(jsonOpt.data));
            }
            else
            {//예외
                bJson = true;
            }
        }
        else
        {//예외
            bJson = true;
        }

        if (true === bJson)
        {//json 처리 필요
            //예외는 모두 json으로 처리한다.
            jsonOpt.fetchOption.body = JSON.stringify(jsonOpt.data);
        }

    }


    //fetch에 사용될 옵션 정리 *****************
    let jsonFetch = {
        method: jsonOpt.method,
        body: jsonOpt.body,
    };

    let jsonFetchComplete = Object.assign({}, jsonFetch, jsonOpt.fetchOption);

    //필요없는 정보 제거
    delete jsonFetchComplete["data"];
    delete jsonFetchComplete["success"];
    delete jsonFetchComplete["error"];


    //완성된 리스폰스
    let responseAjaxResult = null;
    //리스폰스 처리
    if (true === jsonOpt.await)
    {//응답 대기

        responseAjaxResult
            = await fetch(jsonOpt.UrlObj, jsonFetchComplete);
        let responseCheckResult
            = await AjaxAssist2.ResponseCheck(responseAjaxResult, jsonOpt);
        if (null !== responseCheckResult)
        {//성공
            jsonOpt.success(
                responseCheckResult
                , responseAjaxResult.status
                , responseAjaxResult);
        }
        else
        {//실패
            let errorAA2 = new ErrorAA2(responseAjaxResult);
            jsonOpt.error(
                errorAA2.response
                , errorAA2.statusText
                , errorAA2
            );
        }
    }
    else
    {
        responseAjaxResult
            = fetch(jsonOpt.UrlObj, jsonFetchComplete)
                .then(function (response)
                {
                    return AjaxAssist2.ResponseCheck(response, jsonOpt);
                })
                .then(function (sData)
                {//정상 처리
                    jsonOpt.success(
                        sData
                        , responseAjaxResult.status
                        , responseAjaxResult);
                })
                .catch(function (errorAA2)
                {
                    jsonOpt.error(
                        errorAA2.response
                        , errorAA2.statusText
                        , errorAA2
                    );
                });
    }



    //responseAjaxResult


    return responseAjaxResult;
};

/**
 * 
 * @param {any} response
 * @param {any} jsonOption
 * @returns 
 */
AjaxAssist2.ResponseCheck = async function (
    response
    , jsonOption)
{
    if (true === response.ok)
    {//성공
        let objReturn = null;
        switch (jsonOption.contentGetType)
        {
            case AjaxAssist2.ContentGetType.Response:
                objReturn = response;
                break;
            case AjaxAssist2.ContentGetType.Json:
                objReturn = response.json();
                break;
            case AjaxAssist2.ContentGetType.Binary:
                objReturn = response.arrayBuffer();
                break;

            case AjaxAssist2.ContentGetType.Text:
            default:
                objReturn = response.text();
                break;
        }

        return objReturn;
    }
    else
    {
        return null;
    }
};


/**
 * 전달받은 변수에 값을 확인하고 비어있으면 파일을 로드하여 html을 리턴한다.(동기)
 * 이미 있다면 아무 처리 없이 함수가 끝난다.
 * @param {any} sHtml 체크할(or 전달받을) 변수
 * @param {any} FileUrl 파일 주소
 * @returns {string}
 */
AjaxAssist2.HtmlFileLoadCheckAwait = async function (
    sHtml
    , FileUrl)
{
    if ("" === sHtml)
    {//비어 있다.

        //파일 읽기
        sHtml = await AjaxAssist2.HtmlFileLoadAwait(FileUrl);
    }

    return sHtml;
};

/**
 * 전달받은 변수에 값을 확인하고 비어있으면 파일을 로드하여 html로드한다..(비동기)
 * 이미 있다면 아무 처리 없이 funSuccess를 호출한다. 끝난다.
 * @param {any} sHtml 확인할 데이터
 * @param {any} FileUrl 파일의 위치
 * @param {any} funSuccess 성공시 호출할 함수
 * @param {any} jsonOption ajax 호출 옵션
 */
AjaxAssist2.HtmlFileLoadCheck = async function (
    sHtml
    , FileUrl
    , funSuccess
    , jsonOption)
{
    if ("" === sHtml)
    {//비어 있다.

        //파일 읽기
        AjaxAssist2.FileLoad(FileUrl, funSuccess, jsonOption);
    }
    else
    {//이미 데이터가 있다.

        //데이터를 그대로 전달한다.
        funSuccess(sHtml);
    }
};

/**
 * 단순 파일 로드(동기)
 * @param {any} sFileUrl
 */
AjaxAssist2.HtmlFileLoadAwait = async function (sFileUrl)
{
    let jsonOption = {};
    jsonOption.fetchOption = {};

    jsonOption.await = true;
    let sReturn = "";
    await AjaxAssist2.FileLoad(
        sFileUrl
        , function (sHtml)
        {
            sReturn = sHtml;
            //console.log("sHtml : " + sHtml);
        }
        , jsonOption);

    return sReturn;
};

/**
 * 단순 파일 로드.(비동기)
 * funSuccess(data)로 
 * @param {string} sFileUrl
 * @param {Function} funSuccess
 * @param {json} jsonOption
 */
AjaxAssist2.FileLoad = async function (
    sFileUrl
    , funSuccess
    , jsonOption)
{
    if (undefined === jsonOption.fetchOption)
    {
        jsonOption.fetchOption = {};
    }

    jsonOption.url = sFileUrl;
    jsonOption.contentGetType = AjaxAssist2.ContentGetType.Text;

    jsonOption.fetchOption.method = AjaxAssist2.AjaxType.Get;
    jsonOption.fetchOption.cache = "default";

    if ("function" === typeof funSuccess)
    {
        jsonOption.success = funSuccess;
    }

    if (true === jsonOption.await)
    {//대기
        await AjaxAssist2.call(jsonOption);
    }
    else
    {
        AjaxAssist2.call(jsonOption);
    }
};