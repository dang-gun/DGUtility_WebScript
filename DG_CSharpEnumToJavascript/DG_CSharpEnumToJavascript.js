function Converter()
{
    var txtOri = $("#txtOri");
    var txtOutput = $("#txtOutput");

    var sOutput = "";

    //시작 중괄호 자르기
    var arrCut01 = txtOri.text().split("{");

    //첫줄과 2번째줄 만들기
    sOutput += arrCut01[0] + "{";

    //마지막 중괄호 찾기 및 제거
    var arrCut02 = arrCut01[1].split("}");

    //내용물 자르기
    var arrCut03 = arrCut02[0].split(",");

    //내용물 변환
    for (var i = 0; i < arrCut03.length; ++i)
    {
        
        //슬러시 3개(///)제거
        var sItem = arrCut03[i].replace(/\/\/\//gi, "");
		sItem = sItem.replace(/=/gi, ":");
		
        //<summary>를 주석 시작으로 변환
        sItem = sItem.replace("<summary>", "/**");
        sItem = sItem.replace("</summary>", "*/");

        //변환 결과 저장
        sOutput += sItem + ",";
    }

    //마직막 중괄호 넣기
    sOutput = sOutput + "}";

    txtOutput.text(sOutput);
}