﻿/*
 * DG jsModuleDownload 1.0
 * https://blog.danggun.net/7449
 * https://github.com/dang-gun/DG_JsDataBind
 * 
 * test : https://dang-gun.github.io/DG_JsDataBind/test/index.html
 */



/**
 * 모듈 다운로드 기능을 생성하고 다운로드를 진행한다.
 * @param {Array} arrItmeJson 다운로드 받을 아이템 배열.
 * 구조 = [{downloadcallback: function(data){}, url:"다운로드할 Url"}]
 * @param {Function} funCompltCallback 리스트의 모든 아이템의 다운로드가 끝나면 전달될 콜백
 */
function DG_jsModuleDownload(
    arrItmeJson
    , funCompltCallback)
{
    let objThis = this;
    objThis.ModuleDownload(arrItmeJson, funCompltCallback);
}

/** 처리가 완료되면 전달할 콜백 */
DG_jsModuleDownload.prototype.CompltCallback = null;

/** 전달받은 데이터를 백업한다. */
DG_jsModuleDownload.prototype.ItemList = null;


/**
 * 모듈 다운로드 기능을 생성하고 다운로드를 진행한다.
 * @param {any} arrItmeJson 다운로드 받을 아이템 리스트(2중 배열).
 * 구조 = [{downloadcallback: function(data){}, url:"다운로드할 Url"}]
 * @param {Function} funCompltCallback 리스트의 모든 아이템의 다운로드가 끝나면 전달될 콜백
 */
DG_jsModuleDownload.prototype.ModuleDownload = function (
    arrItmeJson
    , funCompltCallback)
{
    let objThis = this;
    objThis.CompltCallback = funCompltCallback;

    //백업 개체 초기화
    objThis.ItemList = new Array();
    for (let i = 0; i < arrItmeJson.length; ++i)
    {
        let itemJson = arrItmeJson[i];

        //백업 개체 생성
        //[2] = 0:대기중, 1:성공, 2:실패
        let netItem = [itemJson, 0];
        //백업 개체에 추가
        objThis.ItemList.push(netItem);
    }

    //아이템 ajax 호출
    for (let i = 0; i < objThis.ItemList.length; ++i)
    {
        let item = objThis.ItemList[i];

        objThis.Ajax({
            url: item[0].url,
            success: function (data, textStatus, httpRequest)
            {
                //성공 표시
                item[1] = 1;
                //데이터 전달
                item[0].downloadcallback(data);

                //완료 체크
                objThis.AjaxCompltCheck();
            },
            error: function (httpRequest, textStatus, errorText)
            {
                //실패 표시
                item[1] = 2;

                //완료 체크
                objThis.AjaxCompltCheck();
            },
        })
    }

    objThis.Ajax();
};

/** Ajax 완료 체크 */
DG_jsModuleDownload.prototype.AjaxCompltCheck = function ()
{
    let objThis = this;

    let bComplt = true;

    for (let i = 0; i < objThis.ItemList.length; ++i)
    {
        let item = objThis.ItemList[i];
        if (0 === item[1])
        {
            bComplt = false;
            break;
        }
    }

    if (true === bComplt)
    {//다운로드가 완료됨
        //완료 알림
        objThis.CompltCallback();
    }
};

/**
 * ajax 호출
 * @param {any} jsonData 호출에 사용할 데이터. jquery.ajax와 같은 구조임.
 */
DG_jsModuleDownload.prototype.Ajax = function (jsonData)
{
    //옵션 합치기
    let jsonDataTemp
        = Object.assign(
            {}
            , {
                type: "GET",
                url: "",
                async: true,
                success: function (data, textStatus, httpRequest) { },
                error: function (httpRequest, textStatus, errorText) { },
            }
            , jsonData);

    let xmlhttp = new XMLHttpRequest();


    xmlhttp.onreadystatechange = function ()
    {
        // XMLHttpRequest.DONE == 4
        if (xmlhttp.readyState === XMLHttpRequest.DONE)
        {
            if (xmlhttp.status === 200)
            {//성공
                jsonDataTemp.success(
                    xmlhttp.responseText
                    , xmlhttp.status
                    , xmlhttp);
            }
            else
            {//실패
                jsonDataTemp.error(
                    xmlhttp
                    , xmlhttp.status
                    , xmlhttp.responseText);
            }
        }
    };

    xmlhttp.open(jsonDataTemp.type, jsonDataTemp.url, jsonDataTemp.async);
    xmlhttp.send();
};