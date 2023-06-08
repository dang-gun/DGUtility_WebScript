import Events from "./Events/Events";
import { JsonShowDefaultOption } from "./Types";

export default class DG_Popup2
{
    private ShowDefaultOption: JsonShowDefaultOption = {
        /** 
         *  인덱스 지정.
         *  0이하의 값을 지정하면 자동으로 인덱스가 지정된다.
         *  인덱스가 중복되면 창을 생성하지 않고 기존 창을 찾아 연다.
         * */
        PopupIndex: 0,

        /** 시작위치 - Y */
        top: 0,
        /** 시작위치 - X */
        left: 0,
        /** 가로 크기 */
        width: "auto",
        /** 세로 크기 */
        height: "auto",
        /** 페이지 시작시 보고 있는 위치(예>스크롤로 위치가 바뀌는 경우)를 기준으로 표시할지 여부  */
        StartViewWeight: false,

        /** 부모에 적용할 css */
        ParentCss: "",
        /** 팝업이 완성되면 크기를 고정할지 여부 
            이 옵션이 없으면 창이동시 크기가 변경될수 있다.
        */
        SizeFixed: false,

        /** 팝업 안에 표시할 컨탠츠
         * 오브젝트도 가능하다. */
        Content: "",
        /** 컨탠츠에 적용할 css */
        ContentCss: "",
        /** 컨탠츠에 적용할 배경색 */
        ContentBackground: "#fff",

        /**
         * 오버레이 클릭시 사용할 이벤트
         * null이면 오버레이를 클릭해도 동작하지 않는다.
         * 창을 닫으려면 'DG_Popup.CloseTarget(divPopupParent);'를 넣는다.
         * 
         * function (nPopupIndex, divPopupParent)
         * nPopupIndex : 생성에 사용된 인덱스
         * divPopupParent : 생성된 창의 개체 
         * */
        OverlayClick: null,
        /** 오버레이용 배경색 */
        OverlayBackground: "#aaa",
        /** 오버레이 불투명 값 */
        OverlayOpacity: 0.3,
        /** 오버레이에 적용할 css */
        OverlayCss: ""
    };

    /** z-index 시작 값 */
    private ZIndexStart: number = 1000;
    /** 다음 팝업의 z-index 추가 값 */
    private ZIndexAdd: number = 10;

    /** 생성된 팝업의 고유번호 발행용 */
    private PopupIndex: number = 0;

    /** 현재 선택된 인덱스 */
    public CurrentSelectIndex: number = 0;
    /** 현재 선택된 팝업 */
    public CurrentSelectDiv: HTMLDivElement | null = null;

    /**
     * 0: 없음
     * 1: 다운
     * 2: 업
     */
    public MouseState: number = 0;
    /** 마우스 다운 계산값 X */
    public MouseDownX: number = 0;
    /** 마우스 다운 계산값 Y */
    public MouseDownY: number = 0;

    /** 팝업이 생성되면 쌓이게 될 배열 */
    private List: HTMLDivElement[] = [];

    /** 팝업에 사용되는 이벤트 */
    private Events: Events = new Events();

    constructor(jsonShowDefaultOption: JsonShowDefaultOption)
    {
        // 기본 옵션을 사용자 옵션으로 덮어쓴다.
        this.ShowDefaultOption
            = Object.assign(this.ShowDefaultOption, jsonShowDefaultOption);

        const PopupTitleElement = document.querySelector(".DG_PopupTitle") as HTMLDivElement;
        PopupTitleElement.addEventListener("mousedown", this.Events.TitleMouseDownEvent);
        PopupTitleElement.addEventListener("mousemove", this.Events.TitleMouseMoveEvent);
        PopupTitleElement.addEventListener("mouseup", this.Events.TitleMouseUpEvent);
    }

    /**
     * DG_Popup2를 사용하여 팝업을 생성한다.
     */
    public Show(jsonOption: JsonShowDefaultOption): void
    {
        const jsonShowDefaultOption = this.ShowDefaultOption;

        // 기본 옵션을 사용자 옵션으로 덮어쓴다.
        const NewJsonOption: JsonShowDefaultOption = Object.assign({}, jsonShowDefaultOption, jsonOption);

        // 고유키 증가
        let nPopupIndex: number = ++this.PopupIndex;

        // 고유키 확인
        if (0 < NewJsonOption.PopupIndex)
        {
            // 지정한 인덱스가 있으면 그 인덱스를 사용한다.
            nPopupIndex = NewJsonOption.PopupIndex;
        }
        else
        {
            // 지정한 인덱스가 없으면 새로운 인덱스를 사용한다.
            nPopupIndex = ++this.PopupIndex;
            NewJsonOption.PopupIndex = nPopupIndex;
        }

        // 사용할 z-index를 계산
        const nZIndex = this.ZIndexStart + (this.ZIndexAdd * this.List.length);

        // 부모용 div를 생성한다.
        const PopupParentElement = this.CreatePopupParent(NewJsonOption, nPopupIndex);

        // Overlay를 생성한다.
        const PopupOverlayElement = this.CreatePopupOverlay(NewJsonOption, nPopupIndex, nZIndex);

        // 컨텐츠용 div를 생성한다.
        const PopupContentElement = this.CreatePopupContent(NewJsonOption, nPopupIndex);

    }

    private CreatePopupParent(NewJsonOption: JsonShowDefaultOption, nPopupIndex: number): HTMLDivElement
    {
        // 부모용 div를 생성한다.
        const PopupParentElement = document.createElement("div");
        PopupParentElement.id = "divDG_PopupParent" + nPopupIndex;
        PopupParentElement.classList.add("DG_PopupParentCss");
        PopupParentElement.dataset.popupIndex = nPopupIndex.toString();

        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.ParentCss)
        {
            PopupParentElement.classList.add(NewJsonOption.ParentCss);
        }

        return PopupParentElement;
    }

    private CreatePopupOverlay(NewJsonOption: JsonShowDefaultOption, nPopupIndex: number, nZIndex: number): HTMLDivElement
    {
        // Overlay를 생성한다.
        const PopupOverlayElement = document.createElement("div");
        PopupOverlayElement.id = "divDG_PopupOverlay" + nPopupIndex;
        PopupOverlayElement.classList.add("DG_PopupOverlayCss");

        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.OverlayCss)
        {
            PopupOverlayElement.classList.add(NewJsonOption.OverlayCss);
        }

        // 배경색 지정
        PopupOverlayElement.style.background = NewJsonOption.OverlayBackground;
        // 투명도 지정
        PopupOverlayElement.style.opacity = NewJsonOption.OverlayOpacity.toString();

        // 포지션 지정
        PopupOverlayElement.style.position = "fixed";
        // 포지션 위치 지정
        PopupOverlayElement.style.top = "0";
        PopupOverlayElement.style.left = "0";
        // 크기 지정
        PopupOverlayElement.style.width = "100%";
        PopupOverlayElement.style.height = "100%";

        // z-index 지정
        PopupOverlayElement.style.zIndex = nZIndex.toString();

        return PopupOverlayElement;
    }

    private CreatePopupContent(NewJsonOption: JsonShowDefaultOption, nPopupIndex: number): HTMLDivElement
    {
        // 컨텐츠용 div를 생성한다.
        const PopupContentElement = document.createElement("div");
        PopupContentElement.id = "divDG_Popup" + nPopupIndex;
        PopupContentElement.classList.add("DG_PopupContentCss");
        PopupContentElement.dataset.popupIndex = nPopupIndex.toString();

        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.ContentCss)
        {
            PopupContentElement.classList.add(NewJsonOption.ContentCss);
        }

        // 포지션 지정
        PopupContentElement.style.position = "absolute";

        // 배경색 지정
        PopupContentElement.style.background = NewJsonOption.ContentBackground;

        let nTop = NewJsonOption.top;
        let nLeft = NewJsonOption.left;

        // 센터 여부
        if ("center" === NewJsonOption.top)
        {
            // 센터일 경우
            // 우선 0으로 초기화 한다.
            nTop = 0;
        }
        if ("center" === NewJsonOption.left)
        {
            // 센터일 경우
            // 우선 0으로 초기화 한다.
            nLeft = 0;
        }

        if (true === NewJsonOption.StartViewWeight)
        {
            // 페이지 시작시 보고 있는 위치(예>스크롤로 위치가 바뀌는 경우)를 기준으로 표시할지 여부
            // 스크롤 위치를 더한다.
            if (typeof nTop === "number" && typeof nLeft === "number")
            {
                nTop += window.scrollY;
                nLeft += window.scrollX;
            }
        }

        // 시작 위치 지정
        PopupContentElement.style.top = nTop + "px";
        PopupContentElement.style.left = nLeft + "px";
        // 크기 지정
        PopupContentElement.style.width = NewJsonOption.width;
        PopupContentElement.style.height = NewJsonOption.height;
        // z-index 지정
        PopupContentElement.style.zIndex = (nPopupIndex + 1).toString();

        // HTML 출력
        if (typeof NewJsonOption.Content === "string")
        {
            // 문자열이면 그대로 출력
            PopupContentElement.innerHTML = NewJsonOption.Content;
        }
        else if (typeof NewJsonOption.Content === "object")
        {
            // 오브젝트일 경우
            PopupContentElement.appendChild(NewJsonOption.Content);
        }

        return PopupContentElement;
    }
}