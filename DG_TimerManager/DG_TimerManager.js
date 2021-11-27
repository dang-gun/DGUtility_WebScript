/**
 * 타이머 메니저
 * 타임아웃() 이나 인터벌()을 관리하기위한 유틸리티
 * */
var DG_TimerManager = {};


DG_TimerManager.RemoveAll = function ()
{
    for (var i = 1; i < 99999; ++i)
    {
        window.clearInterval(i);
    }
};

