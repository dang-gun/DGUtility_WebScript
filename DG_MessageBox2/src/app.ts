import DG_MessageBox2 from "./DG_MessageBox2";

export default class StartUp
{
    private DG_MessageBox: DG_MessageBox2 = new DG_MessageBox2({});
    public DG_Popup = this.DG_MessageBox.DG_Popup;

    private nCount = 0;

    constructor() { }

    public ShowMgr = () =>
    {
        const SelectButtonShowType = document.getElementById('selectButtonShowType') as HTMLSelectElement;
        const SelectBigIconType = document.getElementById('selectBigIconType') as HTMLSelectElement;
        const TextMessage = document.getElementById('txtMsg') as HTMLTextAreaElement;

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
                            결과 :'+ btnType + ' <br />\
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

                    OverlayClick: function (nPopupIndex: number, divPopupParent: HTMLDivElement)
                    {
                        console.log(nPopupIndex + ", " + divPopupParent);
                        this.DG_Popup.CloseTarget(divPopupParent);
                    }
                });
            }
        });
    };

    /** 닫기 이벤트 구현 */
    public Close()
    {
        this.DG_Popup.Close();
    }

    public CloseAll()
    {
        this.DG_Popup.CloseAll();
    }
}