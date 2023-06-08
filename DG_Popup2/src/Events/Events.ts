import DG_Popup2 from "..";

export default class Events
{
    private DG_Popup: DG_Popup2 = new DG_Popup2({});

    constructor() { }

    public TitleMouseDownEvent(event: MouseEvent)
    {
        const target = event.target as HTMLDivElement;
        const parent = target.parentElement as HTMLDivElement;
        const SelectDiv = parent.parentElement as HTMLDivElement;

        // 좌표가 수정될 상위 DOM을 찾는다.
        // this.CurrentSelectDiv = event.target.parentElement.parentElement;
        this.DG_Popup.CurrentSelectDiv = SelectDiv;
        this.DG_Popup.CurrentSelectIndex = this.DG_Popup.CurrentSelectDiv.getAttribute("data-index") as unknown as number;

        // 마우스 상태 변경
        this.DG_Popup.MouseState = 1;

        // 마우스 다운 계산값
        // this.DG_Popup.MouseDownX = event.clientX - this.DG_Popup.CutBack(this.DG_Popup.CurrentSelectDiv.style.left);
        // this.DG_Popup.MouseDownY = event.clientY - this.DG_Popup.CutBack(this.DG_Popup.CurrentSelectDiv.style.top);
    }

    public TitleMouseMoveEvent(event: MouseEvent)
    {
        if (1 === this.DG_Popup.MouseState)
        {
            // 마우스 다운 상태
            // 창 위치 변경
            this.DG_Popup.CurrentSelectDiv.style.left = (event.clientX - this.DG_Popup.MouseDownX) + "px";
            this.DG_Popup.CurrentSelectDiv.style.top = (event.clientY - this.DG_Popup.MouseDownY) + "px";
        }
    }

    public TitleMouseUpEvent()
    {
        // 마우스 상태 변경
        this.DG_Popup.MouseState = 2;
    }
}