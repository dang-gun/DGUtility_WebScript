import DG_MessageBox2 from "./DG_MessageBox2.js";
export default class StartUp
{
    constructor()
    {
        this.DG_MessageBox = new DG_MessageBox2({});
        this.DG_Popup = this.DG_MessageBox.DG_Popup;
        this.nCount = 0;
        this.ShowMgr = () =>
        {
            const SelectButtonShowType = document.getElementById('selectButtonShowType');
            const SelectBigIconType = document.getElementById('selectBigIconType');
            const TextMessage = document.getElementById('txtMsg');
            ++this.nCount;
            const sMsg = `
                <pre>${TextMessage.value}</pre>
                <br />
                count : ${this.nCount}
            `;
            this.DG_MessageBox.Show({
                Title: "테스트 메시지 박스 " + this.nCount,
                Content: sMsg,
                ContentCss: "asdfasdfasd",
                ButtonShowType: Number(SelectButtonShowType.value),
                BigIconType: Number(SelectBigIconType.value),
                ButtonEvent: (btnType) =>
                {
                    console.log("button : " + btnType);
                    this.Close();
                    var TestContentsHtml = ' \
                        <div class="divTitle DG_PopupTitle">버튼 결과! </div> \
                        <div class="divContents"> \
                            결과 :' + btnType + ' <br />\
                            <br />\
                            <br />\
                            <button onclick="app.CloseAll()">All Close</button>\
                            <br />\
                            <button onclick="app.Close()">Close</button>\
                        </div>';
                    this.DG_Popup.Show({
                        Content: TestContentsHtml,
                        ContentCss: "DG_PopupContentCssAdd",
                        top: 200,
                        left: 200,
                        OverlayClick: function (nPopupIndex, divPopupParent)
                        {
                            console.log(nPopupIndex + ", " + divPopupParent);
                            this.DG_Popup.CloseTarget(divPopupParent);
                        }
                    });
                }
            });
        };
    }
    /** 닫기 이벤트 구현 */
    Close()
    {
        this.DG_Popup.Close();
    }
    CloseAll()
    {
        this.DG_Popup.CloseAll();
    }
}
