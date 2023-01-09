/** 리플레이스 매치 인터페이스 */
export interface FormatItemInterface 
{
    /** 
     *  사용할 포맷 이름
     *  콘론(:) 뒤에 붙어나오는 패턴문자열을 의미한다.
     *  이것이 일치했을때 지정된 함수가 동작한다.
     * */
    FormatName: string,
    /**
     * 패턴이 매칭되면 동작하여 변경할 문자열을 리턴하는 함수.
     * 반듯이 완성된 문자열을 리턴해야 한다.
     * function(sOriData, sMatchString, sName, sValue, jsonValue)
     * @param sOriData 매칭에 사용한 원본 문자열
     * @param sMatchString 매칭된 문자열. 구분자를 포함한다.
     * @param sName 매칭성공하여 이 함수를 호출한 문자열. 콘론(:) 앞쪽 문자열
     * @param sValue 이 포맷에 매칭된 변환에 사용하려는 원본 값
     * @param jsonValue 매칭에 사용한 원본 리스트
     * @returns 이 매칭이 성공하여 변환이 끝난 문자열. 
     * sOriData를 가공하여 리턴해야 한다.
     * */
    Func: (sOriData: string
        , sMatchString: string
        , sName: string 
        , sValue: string 
        , jsonValue: MatchReplaceValueInterface[])
        => string
}

/** 
 *  사용할 포맷 그룹 인터페이스
 *  리플레이스에 사용할 포맷들을 묶어놓은 그룹이다.
 * */
export interface FormatGroupInterface 
{
    /** 포맷 그룹 구분용 이름 */
    FormatGroupName: string,
    /** 소속 포맷 리스트 */
    FormatItemList: FormatItemInterface[]
}

/**
 * DG_JsTextReplace.PatternBind의 결과용 인터페이스
 * */
export interface MatchResultInterface 
{
    /** 하나라도 매칭이 되었는지 여부 */
    MatchIs: boolean,

    /** 완성된 결과 문자 */
    ResultString: string
}

/** 리플레이스에 사용될 이름과 값 */
export interface MatchReplaceValueInterface 
{
    /** 찾을 이름 */
    sFindName: string,
    /** 찾은 패턴을 변환할 문자열 */
    sReplaceValue: string
}

/** 자주쓰는 포맷 그룹 저장 인터페이스 */
export interface FormatGroupFavoritesInterface 
{
    /** 구문용 이름(혹은 숫자) */
    Name: string | number,
    /** 대상이 되는 포맷 이름 리스트 */
    Target: string[],

    
}