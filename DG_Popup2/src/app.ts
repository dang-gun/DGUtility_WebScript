import DG_Popup2 from "./DG_Popup2";

export default class StartUp
{
    private DG_Popup = new DG_Popup2({});

    private popTemp: HTMLDivElement = null;
    private nCount: number = 0;

    constructor() { }

    /** 팝업 열기 예제 */
    public Show1(nType: number)
    {
        ++this.nCount;

        let nTop: number | "center" = 0;
        let nLeft: number | "center" = 0;

        switch (nType)
        {
            case 1:
                nTop = 100;
                nLeft = 100;
                break;

            default:
                nTop = this.getRandomInt(100, 400);
                nLeft = this.getRandomInt(100, 400);
                break;
        }

        const TestContentsHtml = `
            <div><div><div class="divTitle DG_PopupTitle">생성 순서 : ${this.nCount}</div> 
            <div class="divContents"> 
                내용물<br />
                내용물2
                <br />
                    <button onclick="app.Show1()">Add New Popup!!</button>
                <br />
                <br />
                <br />
                <br />
                <button onclick="app.CloseAll()">All Close</button>
                <br />
                <button onclick="app.Close()">Close</button>
            </div></div></div>
        `;

        this.popTemp = this.DG_Popup.Show({
            Content: TestContentsHtml,
            ContentCss: "DG_PopupContentCssAdd",

            top: nTop,
            left: nLeft,

            OverlayClick: function (nPopupIndex, divPopupParent)
            {
                console.log(nPopupIndex + ", " + divPopupParent);
                this.DG_Popup.CloseTarget(divPopupParent);
            }
        });
    }

    public Show2(nType: number)
    {
        ++this.nCount;

        let nTop: number | "center" = 0;
        let nLeft: number | "center" = 0;

        switch (nType)
        {
            case 1:
                nTop = 100;
                nLeft = 100;
                break;

            default:
                nTop = this.getRandomInt(100, 400);
                nLeft = this.getRandomInt(100, 400);
                break;
        }

        const TestContentsHtml = `
            <div><div><div class="divTitle DG_PopupTitle">생성 순서 : ${this.nCount}</div> 
            <div class="divContents"> 
                내용물<br />
                내용물2
                <br />
                    <button onclick="app.Show2()">Add New Popup!!</button>
                <br />
                <br />
                <br />
                <br />
                <button onclick="app.CloseAll()">All Close</button>
                <br />
                <button onclick="app.Close()">Close</button>
            </div></div></div>
        `;

        this.popTemp = this.DG_Popup.Show({
            Content: TestContentsHtml,
            ContentCss: "DG_PopupContentCssAdd",

            top: nTop,
            left: nLeft,
            StartViewWeight: true,

            OverlayClick: function (nPopupIndex, divPopupParent)
            {
                console.log(nPopupIndex + ", " + divPopupParent);
                this.DG_Popup.CloseTarget(divPopupParent);
            }
        });
    }

    public Show3()
    {
        ++this.nCount;

        let nTop: number | "center" = 0;
        let nLeft: number | "center" = 0;

        let nType = this.getRandomInt(0, 3);

        //테스트
        nType = 0;

        switch (nType)
        {
            case 1:
                nTop = this.getRandomInt(100, 400);
                nLeft = this.getRandomInt(100, 400);
                break;
            case 2:
                nTop = "center";
                nLeft = this.getRandomInt(100, 400);
                break;
            case 3:
                nTop = this.getRandomInt(100, 400);
                nLeft = "center";
                break;

            default:
                nTop = "center";
                nLeft = "center";
                break;
        }

        let TestContentsHtml = `
            <div><div><div class="divTitle DG_PopupTitle">생성 순서 : ${this.nCount}</div> 
            <div class="divContents"> 
                내용물<br />
                내용물2
                <br />
                    <button onclick="app.Show3()">Add New Popup!!</button>
                <br />
                <br />
                <br />
                <br />
                <button onclick="app.CloseAll()">All Close</button>
                <br />
                <button onclick="app.Close()">Close</button>
            </div></div></div>
        `;

        this.popTemp = this.DG_Popup.Show({
            Content: TestContentsHtml,
            ContentCss: "DG_PopupContentCssAdd",

            top: nTop,
            left: nLeft,
            StartViewWeight: true,

            OverlayClick: function (nPopupIndex, divPopupParent)
            {
                console.log(nPopupIndex + ", " + divPopupParent);
                this.DG_Popup.CloseTarget(divPopupParent);
            }
        });
    }

    /** 닫기 이벤트 구현 */
    public Close()
    {
        this.DG_Popup.Close();
    }

    public CloseAll()
    {
        this.DG_Popup.CloseAll();
    }

    /**
     * 예제에 사용할 랜덤 함수
     * @param min 최소
     * @param max 최대
     */
    private getRandomInt(min: number, max: number)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}