/*
 jquery 필수.
 웹서버에서만 동작합니다.

'this.Now'를 참조하여 사용한다.
 */


/** DG 다국어 지원 */
var DG_i18n = {};


DG_i18n.jsonOptionDefault =
{
    /** 설정된 언어 */
    language: "en-US",
    /** 언어를 찾지 못했을때 사용할 언어 */
    fallbackLanguage: "en-US",
    /** 언어 데이터 설정 */
    resources:
    {
        "en-US":
        {
            //"Name": "Name",
            Name: "Name",
            "Age": "Age",
            "Email": "Email",
            "Address": "Address",

            "KoOnly": "en-US Only",
            "Test001": "Test001"
        },
        "ko-KR": "LanguageFile/Location_ko-KR.json",
        "ja-JP": "LanguageFile/Location_ja-JP.json",
        "fr-FR":
        {
            "Name": "Nom nom",
            "Age": "Âge",

            "KoOnly": "fr-FR",
        },

    }
};

/** 완성된 옵션 */
DG_i18n.jsonOpt = {};

/** 기본 언어 리스트  */
DG_i18n.LangList_Default = {};
/** 사용중이 언어 리스트 */
DG_i18n.LangList = {};

/** 지금 선택된 언어 */
DG_i18n.LangNow = "";


/**
 * 초기화
 * @param {any} jsonOption 초기화 옵션
 * @param {any} callbackComplete 초기화 완료후 호출될 콜백
 */
DG_i18n.init = function (jsonOption, callbackComplete)
{
    //옵션 합치기
    DG_i18n.jsonOpt = Object.assign(DG_i18n.jsonOptionDefault, jsonOption);

    //기본 언어 로드
    DG_i18n.languageChanged_Target(
        DG_i18n.jsonOpt.fallbackLanguage
        , function (jsonLang)
        {
            DG_i18n.LangList_Default = jsonLang;
        }
        , callbackComplete);
    //언어를 변경하여 초기화
    DG_i18n.languageChanged(DG_i18n.jsonOpt.language, callbackComplete);
};


/**
 * 언어 변경
 * @param {any} sLanguage 선택된 언어
 * @param {any} callbackComplete
 */
DG_i18n.languageChanged = function (sLanguage, callbackComplete)
{
    DG_i18n.languageChanged_Target(
        sLanguage
        , function (jsonLang)
        {
            //디폴트 언어와 합쳐준다.
            DG_i18n.LangList
                = Object.assign({}, DG_i18n.LangList_Default, jsonLang);
        } 
        , callbackComplete);
};

/**
 * 언어 변경 - 대상 지정
 * @param {any} sLanguage 선택된 언어
 * @param {any} callbackListTarget 불러온 리스트를 넣을 대상
 * @param {any} callbackComplete
 */
DG_i18n.languageChanged_Target = function (
    sLanguage
    , callbackListTarget
    , callbackComplete)
{
    //언어 저장
    DG_i18n.LangNow = sLanguage;

    //언어 선택
    var objSelectLang = DG_i18n.jsonOpt.resources[sLanguage];

    if (typeof objSelectLang === "string")
    {//언어 데이터가 문자열이다
        //그럼 url로 판단한다.
        //json 파일 로드
        DG_i18n.Ajax(objSelectLang, callbackListTarget, callbackComplete);
    }
    else if (typeof objSelectLang === "object")
    {//언어 데이터가 오브젝트다.
        //데이터 자체를 오브젝트로 본다.
        callbackListTarget(objSelectLang);

        //성공시 콜백 함수 호출
        if (typeof callbackComplete === "function")
        {
            callbackComplete();
        }
    }
    else
    {//그외다.
        //데이터가 없다는 의미다.
        callbackListTarget({});

        //성공시 콜백 함수 호출
        if (typeof callbackComplete === "function")
        {
            callbackComplete();
        }
    }
};


/**
 * 파일 로드를 위한 Ajax 호출
 * @param {any} sUrl
 * @param {any} callbackListTarget 불러온 리스트를 넣을 대상
 * @param {any} callbackComplete 초기화 완료후 호출될 콜백
 */
DG_i18n.Ajax = function (
    sUrl
    , callbackListTarget
    , callbackComplete)
{
    //대상 백업
    var callbackListTargetTemp = callbackListTarget;
    //콜백 함수 백업
    var callbackCompleteTemp = callbackComplete;

    //아작스 호출용 http리퀘스트 생성
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest)
    {
        console("XMLHTTP error");
        return false;
    }

    httpRequest.onreadystatechange = function ()
    {
        if (httpRequest.readyState === XMLHttpRequest.DONE)
        {
            if (httpRequest.status === 200)
            {
                //불러온 json을 파싱해서 넣는다.
                callbackListTargetTemp(JSON.parse(httpRequest.responseText));

                //성공시 콜백 함수 호출
                if (typeof callbackCompleteTemp === "function")
                {
                    callbackCompleteTemp();
                }
            }
            else
            {
                console('XMLHTTP request error');
            }
        }
    };;
    httpRequest.open("GET", sUrl);
    httpRequest.send();
};

/**
 * 지금 설정된 언어의 값을 가지고온다.
 * @param {any} sKey 선택키
 */
DG_i18n.Get = function (sKey)
{
    var sReturn = DG_i18n.LangList[sKey];
    if (null === sReturn
        || undefined === sReturn)
    {
        sReturn = "";
    }

    return sReturn;
};