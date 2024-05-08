/** 열거형 맴버를 플래그로 처리 지원 유틸*/
var DG_FlagEnum_Assist = {};
/**
 * Flag 타입을 Html로 변환합니다.
 * @param {string} sItemHtml html생성시 항목으로 사용할 html
 * @param {json} typeFlag 값으로 쓸 타입이 선언된 json
 * @param {json} jsonTypeFlagName typeFlag의 이름으로 사용할 데이터가 들어있는 json
 * @param {type} nValue 미리 넣을 typeFlag값
 * @returns {string} 완성된 Html
 */
DG_FlagEnum.ToHtml = function (
    sItemHtml
    , typeFlag
    , jsonTypeFlagName
    , nValue)
{

    var sReturn = "";

    //플래그 키리스트
    var arrFlagKey = Object.keys(typeFlag);

    for (var i = 1; i < arrFlagKey.length; ++i)
    {
        //선택된 값
        var itemFlagKey = arrFlagKey[i];
        var itemFlag = typeFlag[itemFlagKey];
        var itemFlagName = jsonTypeFlagName[itemFlagKey];

        var sItemHtmlTemp = sItemHtml;
        //값 넣기
        sItemHtmlTemp = sItemHtmlTemp.replace(/{{value}}/g, itemFlag);
        //이름 넣기
        sItemHtmlTemp = sItemHtmlTemp.replace(/{{Name}}/g, itemFlagName);
        //체크 여부
        var sChecked = "";
        if (true === DG_FlagEnum.HasFlag(nValue, itemFlag))
        {
            sChecked = "checked";
        }
        sItemHtmlTemp = sItemHtmlTemp.replace(/{{checked}}/g, sChecked);

        //완성된 아이템 저장
        sReturn += sItemHtmlTemp;
    }

    return sReturn;
};

/**
 * 지정된 그룹이름(name)으로 된 모든 체크박스(input type="checkbox")를 찾아 
 * 값(value)을 추출하여 비트연산을 통해 플래그(flag)값으로 만들어 리턴합니다.
 * @param {any} sGroupName
 * @returns {int} 추출한 값을 비트연산을 하여 완성된 플래그(flag)값
 */
DG_FlagEnum.GetCheckBoxData = function(sGroupName)
{
    //계산된 권한 값
    var typeAuthReturn = 0;

    //체크된 dom 개체 검색
    var arrChk = document.querySelectorAll("input[name=" + sGroupName + "]:checked");

    //선택된 값계산
    for (var i = 0; i < arrChk.length; ++i)
    {
        var itemChk = arrChk[i];
        //값받기
        var val = itemChk.value;
        if ((typeof val === "undefined")
            || (val === ""))
        {//값이 없거나
            //비어있다.
            val = 0;
        }
        else
        {//값이 있다.
            //숫자형으로 바꾼다.
            val = Number(val);
        }

        //리턴용 flag에 넣기
        typeAuthReturn |= val;
    }


    return typeAuthReturn;
};