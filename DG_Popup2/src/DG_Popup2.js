var DG_Popup2 = /** @class */ (function () {
    function DG_Popup2(jsonShowDefaultOption) {
        var _this = this;
        this.ShowDefaultOption = {
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
        this.ZIndexStart = 1000;
        /** 다음 팝업의 z-index 추가 값 */
        this.ZIndexAdd = 10;
        /** 생성된 팝업의 고유번호 발행용 */
        this.PopupIndex = 0;
        /** 현재 선택된 인덱스 */
        this.CurrentSelectIndex = 0;
        /** 현재 선택된 팝업 */
        this.CurrentSelectDiv = null;
        /**
         * 0: 없음
         * 1: 다운
         * 2: 업
         */
        this.MouseState = 0;
        /** 마우스 다운 계산값 X */
        this.MouseDownX = 0;
        /** 마우스 다운 계산값 Y */
        this.MouseDownY = 0;
        /** 팝업이 생성되면 쌓이게 될 배열 */
        this.List = [];
        this.TitleMouseDownEvent = function (event) {
            var target = event.target;
            // 타겟이 div.DG_PopupTitle이 아닐 경우 이벤트를 발생시키지 않는다.
            if (!target.classList.contains('DG_PopupTitle')) {
                return;
            }
            var Parent = target.parentElement;
            var SelectDiv = Parent.parentElement.parentElement;
            // 좌표가 수정될 상위 DOM을 찾는다.
            // this.CurrentSelectDiv = event.target.parentElement.parentElement;
            _this.CurrentSelectDiv = SelectDiv;
            _this.CurrentSelectIndex = _this.CurrentSelectDiv.getAttribute("data-index");
            // 마우스 상태 변경
            _this.MouseState = 1;
            // 마우스 다운 계산값
            _this.MouseDownX = event.clientX - _this.CutBack(_this.CurrentSelectDiv.style.left);
            _this.MouseDownY = event.clientY - _this.CutBack(_this.CurrentSelectDiv.style.top);
        };
        this.TitleMouseMoveEvent = function (event) {
            if (1 === _this.MouseState) {
                // 마우스 다운 상태
                // 창 위치 변경
                _this.CurrentSelectDiv.style.left = (event.clientX - _this.MouseDownX) + "px";
                _this.CurrentSelectDiv.style.top = (event.clientY - _this.MouseDownY) + "px";
            }
        };
        this.TitleMouseUpEvent = function (event) {
            // 마우스 상태 변경
            _this.MouseState = 2;
        };
        // 기본 옵션을 사용자 옵션으로 덮어쓴다.
        this.ShowDefaultOption
            = Object.assign(this.ShowDefaultOption, jsonShowDefaultOption);
        var PopupTitleElement = document.querySelector(".DG_PopupTitle");
        document.addEventListener("mousedown", this.TitleMouseDownEvent);
        document.addEventListener("mousemove", this.TitleMouseMoveEvent);
        document.addEventListener("mouseup", this.TitleMouseUpEvent);
    }
    /**
     * DG_Popup2를 사용하여 팝업을 생성한다.
     */
    DG_Popup2.prototype.Show = function (jsonOption) {
        var jsonShowDefaultOption = this.ShowDefaultOption;
        // 기본 옵션을 사용자 옵션으로 덮어쓴다.
        var NewJsonOption = Object.assign({}, jsonShowDefaultOption, jsonOption);
        // 고유키 증가
        var nPopupIndex = ++this.PopupIndex;
        // 고유키 확인
        if (0 < NewJsonOption.PopupIndex) {
            // 지정한 인덱스가 있으면 그 인덱스를 사용한다.
            nPopupIndex = NewJsonOption.PopupIndex;
        }
        else {
            // 지정한 인덱스가 없으면 새로운 인덱스를 사용한다.
            nPopupIndex = ++this.PopupIndex;
            NewJsonOption.PopupIndex = nPopupIndex;
        }
        // 사용할 z-index를 계산
        var nZIndex = this.ZIndexStart + (this.ZIndexAdd * this.List.length);
        // 부모용 div를 생성한다.
        var PopupParentElement = this.CreatePopupParent(NewJsonOption, nPopupIndex);
        // Overlay를 생성한다.
        var PopupOverlayElement = this.CreatePopupOverlay(NewJsonOption, nPopupIndex, nZIndex);
        // 컨텐츠용 div를 생성한다.
        var PopupContentElement = this.CreatePopupContent(NewJsonOption, nPopupIndex, nZIndex);
        // 부모 div에 Overlay와 Content를 추가한다.
        PopupParentElement.appendChild(PopupContentElement);
        PopupParentElement.appendChild(PopupOverlayElement);
        // 부모 div를 body에 추가한다.
        document.body.appendChild(PopupParentElement);
        // 새롭게 추가한 팝업 개체를 찾는다.
        var NewPopupParentElement = document.querySelector("#divDG_PopupParent" + nPopupIndex);
        var NewPopupOverlayElement = document.querySelector("#divDG_PopupOverlay" + nPopupIndex);
        var NewPopupContentElement = document.querySelector("#divDG_Popup" + nPopupIndex);
        if (true === NewJsonOption.SizeFixed) {
            // 팝업이 완성되면 크기를 고정할지 여부
            // 완성된 크기를 가져온다.
            var nSize = NewPopupContentElement.offsetWidth;
            // 완성된 크기를 고정값으로 지정한다.
            NewPopupContentElement.style.width = nSize + "px";
        }
        // 센터 여부
        if ("center" === NewJsonOption.top) {
            // 센터일 경우
            // 중앙값을 계산한다.
            var nTopCenter = (window.innerHeight / 2)
                - (NewPopupContentElement.offsetHeight / 2)
                + (NewPopupContentElement.getBoundingClientRect().top);
            NewPopupContentElement.style.top = nTopCenter + "px";
        }
        if ("center" === NewJsonOption.left) {
            // 센터일 경우
            // 중앙값을 계산한다.
            var nLeftCenter = (window.innerWidth / 2)
                - (NewPopupContentElement.offsetWidth / 2)
                + (NewPopupContentElement.getBoundingClientRect().left);
            NewPopupContentElement.style.left = nLeftCenter + "px";
        }
        // 빈 곳을 클릭했을 때 이벤트 적용
        if (typeof NewJsonOption.OverlayClick === "function") {
            NewPopupOverlayElement.addEventListener("click", function () {
                NewJsonOption.OverlayClick(nPopupIndex, NewPopupParentElement);
            });
        }
        // 배열에 추가한다.
        this.List.push(NewPopupParentElement);
        // 완성된 팝업을 리턴한다.
        return PopupParentElement;
    };
    /**
     * Css의 데이터값에 단위를 제거해준다.
     * @param {string} sData 변환할 데이터
     * @returns {number} 변환된 값
     */
    DG_Popup2.prototype.CutBack = function (sData) {
        var nReturn = 0;
        if (false === isNaN(Number(sData))) {
            // 숫자면 숫자로 변환
            nReturn = Number(sData);
        }
        else {
            // 숫자형이 아니라면
            // 단위는 끝에 2자리이다.
            if (2 < sData.length) {
                // 2자리 이상이면 뒤에서 2자리를 잘라서 숫자로 변환한다.
                var sCut = sData.substring(0, sData.length - 2);
                if (false === isNaN(Number(sCut))) {
                    // 남은 글자가 숫자면 숫자로 변환
                    nReturn = Number(sCut);
                }
            }
        }
        return nReturn;
    };
    /** 제일 마지막 팝업을 닫는다. */
    DG_Popup2.prototype.Close = function () {
        // 리스트 개수
        var nIndex = this.List.length - 1;
        this.CloseIndex(nIndex);
    };
    /**
     * 지정한 인덱스의 팝업을 닫는다.
     * @param {number} nIndex 닫을 인덱스
     */
    DG_Popup2.prototype.CloseIndex = function (nIndex) {
        // 팝업 개체 삭제
        this.List[nIndex].remove();
        // 리스트에서 해당 인덱스 삭제
        this.List.splice(nIndex, 1);
    };
    /** 모든 팝업을 닫는다. */
    DG_Popup2.prototype.CloseAll = function () {
        var nArrayLength = this.List.length;
        for (var i = 0; i < nArrayLength; i++) {
            this.Close();
        }
    };
    /**
     * 지정한 대상을 닫는다.
     * @param {HTMLDivElement} objTarget 닫을 대상
     */
    DG_Popup2.prototype.CloseTarget = function (objTarget) {
        var nArrayLength = this.List.length;
        for (var i = 0; i < nArrayLength; i++) {
            if (true === Object.is(this.List[i], objTarget)) {
                // 일치하면 오브젝트를 찾아서 닫는다.
                this.CloseIndex(i);
                break;
            }
        }
    };
    /**
     * 팝업의 부모 Element를 생성한다.
     * @param {JsonShowDefaultOption} NewJsonOption 사용자 정의 옵션
     * @param {number} nPopupIndex 팝업 인덱스
     * @returns
     */
    DG_Popup2.prototype.CreatePopupParent = function (NewJsonOption, nPopupIndex) {
        // 부모용 div를 생성한다.
        var PopupParentElement = document.createElement("div");
        PopupParentElement.id = "divDG_PopupParent" + nPopupIndex;
        PopupParentElement.classList.add("DG_PopupParentCss");
        PopupParentElement.dataset.popupIndex = nPopupIndex.toString();
        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.ParentCss) {
            PopupParentElement.classList.add(NewJsonOption.ParentCss);
        }
        return PopupParentElement;
    };
    DG_Popup2.prototype.CreatePopupOverlay = function (NewJsonOption, nPopupIndex, nZIndex) {
        // Overlay를 생성한다.
        var PopupOverlayElement = document.createElement("div");
        PopupOverlayElement.id = "divDG_PopupOverlay" + nPopupIndex;
        PopupOverlayElement.classList.add("DG_PopupOverlayCss");
        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.OverlayCss) {
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
    };
    DG_Popup2.prototype.CreatePopupContent = function (NewJsonOption, nPopupIndex, nZIndex) {
        // 컨텐츠용 div를 생성한다.
        var PopupContentElement = document.createElement("div");
        PopupContentElement.id = "divDG_Popup" + nPopupIndex;
        PopupContentElement.classList.add("DG_PopupContentCss");
        PopupContentElement.dataset.popupIndex = nPopupIndex.toString();
        // 사용자 정의 CSS 추가
        if ("" !== NewJsonOption.ContentCss) {
            PopupContentElement.classList.add(NewJsonOption.ContentCss);
        }
        // 포지션 지정
        PopupContentElement.style.position = "absolute";
        // 배경색 지정
        PopupContentElement.style.background = NewJsonOption.ContentBackground;
        var nTop = NewJsonOption.top;
        var nLeft = NewJsonOption.left;
        // 센터 여부
        if ("center" === NewJsonOption.top) {
            // 센터일 경우
            // 우선 0으로 초기화 한다.
            nTop = 0;
        }
        if ("center" === NewJsonOption.left) {
            // 센터일 경우
            // 우선 0으로 초기화 한다.
            nLeft = 0;
        }
        if (true === NewJsonOption.StartViewWeight) {
            // 페이지 시작시 보고 있는 위치(예>스크롤로 위치가 바뀌는 경우)를 기준으로 표시할지 여부
            // 스크롤 위치를 더한다.
            if (typeof nTop === "number" && typeof nLeft === "number") {
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
        PopupContentElement.style.zIndex = (nZIndex + 1).toString();
        // HTML 출력
        if (typeof NewJsonOption.Content === "string") {
            // 문자열이면 그대로 출력
            PopupContentElement.innerHTML = NewJsonOption.Content;
        }
        else if (typeof NewJsonOption.Content === "object") {
            // 오브젝트일 경우
            PopupContentElement.appendChild(NewJsonOption.Content);
        }
        return PopupContentElement;
    };
    return DG_Popup2;
}());
