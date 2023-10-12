
/**
 * DangGun Utility Pagination
 * 페이지네이션 UI를 구현해주는 유틸
 */
export default class DGU_Pagination
{
    /** 사용할 url 쿼리 - 페이지 번호 */
    public UrlQuery_PageNowNumber: string = "pn";

    /** 생성시 사용한 옵션 개체*/
    public Option: DGU_Pagination_OptionModel;


    /** 전체를 감싸고 있는 ul 개체*/
    public UlDom: HTMLUListElement;

    //#region
    /** 아이템 개체 - 맨 앞*/
    private PageItem_First: DGU_Pagination_ItemModel;
    /** 아이템 개체 - 한칸 앞*/
    private PageItem_Before: DGU_Pagination_ItemModel;

    /** 아이템 개체 - 앞쪽 번호*/
    private PageItem_BeforeList: DGU_Pagination_ItemModel[] = [];

    /** 아이템 개체 - 지금 페이지*/
    private PageItem_Now: DGU_Pagination_ItemModel;

    /** 아이템 개체 - 뒤쪽 번호*/
    private PageItem_AfterList: DGU_Pagination_ItemModel[] = [];

    /** 아이템 개체 - 한칸 뒤*/
    private PageItem_After: DGU_Pagination_ItemModel;
    /** 아이템 개체 - 맨 뒤*/
    private PageItem_Last: DGU_Pagination_ItemModel;
    
    //endregion

    constructor(option: DGU_Pagination_OptionModel)
    {
        this.Option = option;
        this.Reset(this.Option);
    }

    /**
     * 가지고있는 UI개체를 초기화한다.
     * @param option 초기화 할때 사용할 옵션 정보
     */
    private Reset = (option: DGU_Pagination_OptionModel) =>
    {
        this.UlDom = document.createElement("ul");
        this.UlDom.classList.add("dg-page-nav");

        //버튼 미리 생성*****

        //맨 앞으로
        //&lt;&lt;
        this.PageItem_First = this.PaginationButton_Create("<<");
        this.PageItem_First.Li.classList.add("dg-page-first");
        this.UlDom.appendChild(this.PageItem_First.Li);

        //앞으로
        //&lt;
        this.PageItem_Before = this.PaginationButton_Create("<");
        this.PageItem_Before.Li.classList.add("dg-page-before");
        this.UlDom.appendChild(this.PageItem_Before.Li);

        //앞쪽 번호
        this.PageItem_BeforeList.splice(0, this.PageItem_BeforeList.length);
        for (let nBefore = 0; nBefore < option.PageButtonAddCount; ++nBefore)
        {
            //버튼 생성
            let item: DGU_Pagination_ItemModel = this.PaginationButton_Create("");
            item.Li.classList.add("dg-page-before-item");
            //배열에 백업
            this.PageItem_BeforeList.push(item);
            //UI에 넣기
            this.UlDom.appendChild(item.Li);
        }

        //현재 페이지
        this.PageItem_Now = this.PaginationButton_Create("");
        this.PageItem_Now.Li.classList.add("dg-page-now");
        this.PageItem_Now.Li.classList.add("dg-page-active");
        this.UlDom.appendChild(this.PageItem_Now.Li);

        //뒤쪽 번호
        for (let nAfter = 0; nAfter < option.PageButtonAddCount; ++nAfter)
        {
            //버튼 생성
            let item: DGU_Pagination_ItemModel = this.PaginationButton_Create("");
            item.Li.classList.add("dg-page-after-item");
            //배열에 백업
            this.PageItem_AfterList.push(item);
            //UI에 넣기
            this.UlDom.appendChild(item.Li);
        }

        //뒤로
        //&gt;
        this.PageItem_After = this.PaginationButton_Create(">");
        this.PageItem_After.Li.classList.add("dg-page-after");
        this.UlDom.appendChild(this.PageItem_After.Li);

        //맨 뒤으로
        //&gt;&gt;
        this.PageItem_Last = this.PaginationButton_Create(">>");
        this.PageItem_Last.Li.classList.add("dg-page-last");
        this.UlDom.appendChild(this.PageItem_Last.Li);
    }

    /**
     * 전달받은 값으로 페이지네이션을 다시 바인딩한다.
     * @param nPageNow
     * @param nTotalPageCount
     */
    public Rebind = (
        nPageNow: number
        , nTotalPageCount: number) =>
    {
        let nTemp: number = 0;


        //맨 앞으로 ************
        if (1 >= nPageNow)
        {//맨 앞페이지다.

            //더 이상 갈때가 없다.
            this.PageItem_First.Li.classList.add("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_First, null, null);
        }
        else
        {//맨 앞이 아니다.
            this.PageItem_First.Li.classList.remove("dg-page-disabled");
            //맨 앞으로는 항상 1이므로 
            this.PaginationButton_Rebind(this.PageItem_First, null, 1);

        }


        //앞으로 **********
        nTemp = nPageNow - 1;
        if (0 >= nTemp)
        {//0보다 작다.
            //1로 처리
            nTemp = 1;
        }

        if (1 >= nPageNow)
        {//맨 앞페이지다.

            //더이상 갈때가 없다.
            this.PageItem_Before.Li.classList.add("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_Before, null, null);
        }
        else
        {
            this.PageItem_Before.Li.classList.remove("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_Before, null, nTemp);
        }


        //지금 페이지 앞번호********************
        for (let nBefore = 0; nBefore < this.Option.PageButtonAddCount; ++nBefore)
        {
            let item: DGU_Pagination_ItemModel
                = this.PageItem_BeforeList[nBefore];

            //이 아이템의 번호
            nTemp = nPageNow - this.Option.PageButtonAddCount + nBefore;

            if (0 >= nTemp)
            {//맨 앞 페이지보다 적다

                //UI에서 숨김
                item.Li.classList.add("dg-page-hidden");
                this.PaginationButton_Rebind(item, null, null);
            }
            else
            {
                item.Li.classList.remove("dg-page-hidden");
                this.PaginationButton_Rebind(item, nTemp.toString(), nTemp);
            }
        }



        //편재 페이지 ****************
        //현재 페이지는 동작이 필요없다.
        this.PaginationButton_Rebind(this.PageItem_Now, nPageNow.toString(), null);



        //지금 페이지 뒷번호********************
        for (let nAfter = 0; nAfter < this.Option.PageButtonAddCount; ++nAfter)
        {
            let item: DGU_Pagination_ItemModel
                = this.PageItem_AfterList[nAfter];

            //이 아이템의 번호
            nTemp = nPageNow + nAfter + 1;

            if (nTotalPageCount < nTemp)
            {//최대값 초과

                //UI에서 숨김
                item.Li.classList.add("dg-page-hidden");
                this.PaginationButton_Rebind(item, null, null);
            }
            else
            {
                item.Li.classList.remove("dg-page-hidden");
                this.PaginationButton_Rebind(item, nTemp.toString(), nTemp);
            }   
        }


        //뒤로 ******
        nTemp = nPageNow + 1;
        if (nTotalPageCount < nTemp)
        {//최대 페이지가 넘었다.

            //최대 페이지로 설정
            nTemp = nTotalPageCount;
        }

        if (nTotalPageCount < nTemp)
        {//맨 뒷페이지다.

            //더이상 갈때가 없다.
            this.PageItem_After.Li.classList.add("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_After, null, null);
        }
        else
        {
            this.PageItem_After.Li.classList.remove("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_After, null, nTemp);
        }



        //맨 뒤로 *******
        if (nTotalPageCount <= nPageNow)
        {//맨  뒷페이지다.

            //더이상 갈때가 없다.
            this.PageItem_Last.Li.classList.add("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_Last, null, null);
        }
        else
        {
            this.PageItem_Last.Li.classList.remove("dg-page-disabled");
            this.PaginationButton_Rebind(this.PageItem_Last, null, nTotalPageCount);
        }
    }


    /**
     * 
     * @param sText 초기 텍스트
     */
    private PaginationButton_Create(
        sText: string)
        : DGU_Pagination_ItemModel
    {
        let pitemReturn: DGU_Pagination_ItemModel
            = new DGU_Pagination_ItemModel();


        //감싸는 li
        pitemReturn.Li = document.createElement("li");
        pitemReturn.Li.classList.add("dg-page-item");

        //링크 a
        pitemReturn.Button = document.createElement("a");
        pitemReturn.Button.innerText = sText;
        //debugger;

        pitemReturn.Li.appendChild(pitemReturn.Button);

        return pitemReturn;
    }

    /**
     * 
     * @param item 수정할 개체
     * @param sText 표시 텍스트
     * null이면 text는 처리하지 않는다.
     * @param nPageNumber 생성할 페이지 번호. 
     * null이면  href는 javascript:void(0);가 들어간다.
     */
    private PaginationButton_Rebind = (
        item: DGU_Pagination_ItemModel
        , sText?:string
        , nPageNumber?: number) =>
    {
        if (null === sText)
        {
        }
        else
        {
            item.Button.innerText = sText;
        }

        if (null === nPageNumber)
        {
            
            item.Button.href = this.Option.VoidHref;
            for (let i = 0; i < this.Option.VoidHref_AttrAdd.length; ++i)
            {
                item.Button.setAttribute(
                    this.Option.VoidHref_AttrAdd[i][0]
                    , this.Option.VoidHref_AttrAdd[i][1]);
            }       
        }
        else
        {
            item.Button.href = this.Option.MoveUrlCreateFunc(nPageNumber);
            for (let i = 0; i < this.Option.VoidHref_AttrAdd.length; ++i)
            {
                item.Button.removeAttribute(
                    this.Option.VoidHref_AttrAdd[i][0]);
            }
        }
    }
}


/** 아이템 한개에 대한 개체*/
class DGU_Pagination_ItemModel
{
    /** 아이템 한개를 감싸는 Li*/
    Li: HTMLLIElement;

    /** 아이템 의 동작을 하는 링크 개체 */
    Button: HTMLAnchorElement;
}

/** DG 페이지네이션 생성 옵션*/
export class DGU_Pagination_OptionModel
{
    /** 
     * 현재 페이지를 기준으로 앞뒤로 몇개의 페이지 버튼이 추가될지 개수이다.
     * 앞뒤로 추가되므로 총 페이지 버튼 숫자는  1(현재 페이지) + (이 변수 * 2) 가 된다.
     * 예> 2로 설정하면 = 1 + (2 * 2) = 5
     */
    PageButtonAddCount: number = 2;

    /**
     * 이동 URL을 생성할때 호출하는 함수
     * @param nPageNumber 생성할 페이지 번호
     * @returns 완성된 url
     */
    MoveUrlCreateFunc: Function = (nPageNumber: number): string => { return ""; }

    /** 링크 동작이 없는 경우 사용할 a.href 값*/
    VoidHref: string = "javascript:void(0);";

    /** 
     * 링크 동작이 없는 경우 추가할 속성
     * 링크 동작이 없는 경우 특정 속성을 추가해야 한다면 이 리스트에 넣어둔다.
     * 링크에 동작이 있으면 자동으로 해당 속성을 빼준다.
     */
    VoidHref_AttrAdd: string[][] = [];
}