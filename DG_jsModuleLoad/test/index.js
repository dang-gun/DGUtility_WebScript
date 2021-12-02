
var dgMD = null;

function TestStart()
{
    let sD01 = "";
    let sD02 = "";
    let sD03 = "";

    dgMD
        = new DG_jsModuleLoad(
            [
                {
                    url: "../test/Download01.html"
                    , downloadcallback: function (data) { sD01 = data; }
                },
                {
                    url: "../test/Download02.json"
                    , downloadcallback: function (data) { sD02 = data; }
                },
                {
                    url: "../test/Download03.js"
                    , downloadcallback: function (data) { sD03 = data; }
                }
            ]
            , function ()
            {
                console.log("sD01 : " + sD01);
                console.log("sD02 : " + sD02);
                console.log("sD03 : " + sD03);
            });
}