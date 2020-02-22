/** 열거형 맴버를 플래그로 처리하는 것을 돕는 유틸 */
var DG_FlagEnum = {};

/**
 * 원본에 비교할 키가 들어있는지 확인한다.
 * @param {string} value 원본
 * @param {string} key 키
 * @returns {boolean} 일치 여부
 */
DG_FlagEnum.HasFlag = function (value, key)
{
    return !!(value & key);
};

/**
 * 원본에 키를 추가한다.
 * @param {string} value 원본
 * @param {string} key 키
 * @returns {type} 완성된 결과
 */
DG_FlagEnum.Add = function (value, key)
{
    return value | key;
};

/**
 * 원본에 키를 제거한다.
 * @param {string} value 원본
 * @param {string} key 키
 * @returns {type} 완성된 결과
 */
DG_FlagEnum.Delete = function (value, key)
{
    return value & ~key;
};

/**
 * 원본에서 키를 토클해줍니다.
 * @param {string} value 원본
 * @param {string} key 키
 * @returns {type} 완성된 결과
 */
DG_FlagEnum.Toggle = function (value, key)
{
    return value ^key;
};