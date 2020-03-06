/*
 jquery 필수.
 웹서버에서만 동작합니다.

'this.Now'를 참조하여 사용한다.
 */

/**
 * 다국어 관리
 * @param {string} sDefaultUrl 기본 url
 * @param {string} sDefaultFilePrefix 기본 url
 * @param {string} sCountryLanguage 기본으로 사용할지정할 국가-언어 코드
 * @param {function} funCallback 다국어 파일 로드가 끝나면 동잘할 함수
 */
function DG_MultiLanguage(sDefaultUrl
    , sDefaultFilePrefix
    , sCountryLanguage
    , funCallback)
{
    var objThis = this;
    var funCallbackTemp = funCallback;

    //url 저장
    objThis.UrlDefault = sDefaultUrl;
    //url 저장
    objThis.FilePrefix = sDefaultFilePrefix;
    //국가-언어 코드 저장
    objThis.CountryLanguage_Default = sCountryLanguage;

    //로드 url 만들기
    //국가-언어 코드는 소문자로만 처리한다.
    var sUrl = objThis.UrlComplete(sCountryLanguage);

    objThis.FileLoad(sUrl
        , function (json)
        {
            objThis.Default = json;
            if (typeof funCallbackTemp === "function")
            {
                funCallbackTemp();
            }
            
        }
        , {}
    );
}

/** 언어 파일을 불러오기위한 url */
DG_MultiLanguage.prototype.UrlDefault = "/LanguageFile/";
/** 언어 파일앞에 붙은 이름 */
DG_MultiLanguage.prototype.FilePrefix = "Location_";
/** 언어 파일의 확장자 */
DG_MultiLanguage.prototype.FileExtension = ".json";


/** 기본 국가-언어 코드 */
DG_MultiLanguage.prototype.CountryLanguage_Default = "";
/** 기본 언어 정보 */
DG_MultiLanguage.prototype.Default = null;
/** 지금 사용중인 국가-언어 코드 */
DG_MultiLanguage.prototype.CountryLanguage_Now = "";
/** 지금 사용중인 언어 정보 */
DG_MultiLanguage.prototype.Now = null;


DG_MultiLanguage.prototype.UrlComplete = function (sCountryLanguage)
{   
    //로드 url 만들기
    //국가-언어 코드는 소문자로만 처리한다.
    var sUrl = this.UrlDefault + this.FilePrefix
        + sCountryLanguage
        + this.FileExtension;

    return sUrl;
};

/**
 * 사용중인 언어를 교체한다.
 * @param {string} sCountryLanguage 지정할 국가-언어 코드
 * @param {function} funCallback 다국어 파일 로드가 끝나면 동잘할 함수
 */
DG_MultiLanguage.prototype.ChangeLanguage = function (sCountryLanguage, funCallback)
{
    var objThis = this;
    var funCallbackTemp = funCallback;

    //국가-언어 코드 저장
    objThis.CountryLanguage_Now = sCountryLanguage;

    //로드 url 만들기
    //국가-언어 코드는 소문자로만 처리한다.
    var sUrl = objThis.UrlComplete(sCountryLanguage);

    objThis.FileLoad(sUrl
        , function (json)
        {
            //로케이션 합치기
            objThis.Now = Object.assign({}, objThis.Default, json);
            if (typeof funCallbackTemp === "function")
            {
                funCallbackTemp();
            }
        }
        , {}
    );
};

DG_MultiLanguage.prototype.FileLoad = function (sFileUrl, funSuccess)
{
    $.ajax({
        type:"GET",
        url: sFileUrl,
        dataType: "json",
        success: funSuccess,
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    });
};