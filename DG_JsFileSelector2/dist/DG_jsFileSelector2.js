export default class DG_jsFileSelector2 {
    constructor(jsonOptions) {
        /** 옵션 값 */
        this.jsonOptionDefault = {
            /** 디버그 활성화 여부 */
            Debug: false,
            /** 드롭다운 영역이자 아이템 표시에 사용할 영역 */
            Area: null,
            /** 아이템이 그려질 완성된 영역 */
            Area_ItemList: null,
            /** 파일 갯수 제한. -1==무한 */
            MaxFileCount: -1,
            /**
             *  허용된 확장자 리스트(소문자로 입력).
             *  전체허용은 "*.*"
             *  이미지 : ".bmp", ".dib", ".jpg", ".jpeg", ".jpe", ".gif", ".png", ".tif", ".tiff", ".raw"
             * */
            ExtAllow: ["*.*"],
            //ExtAllow: [".bmp", ".dib", ".jpg", ".jpeg", ".jpe", ".gif", ".png", ".tif", ".tiff", ".raw"],
            /** 로딩 이미지에 사용할 이미지 */
            LoadingSrc: "./Image/Rolling-2.1s-65px.gif",
            /** 별도 처리 없는(확장자 검사에서 빈값) 이미지에 사용할 이미지 */
            NoneFileImgUrl: "./Image/checkmark_3440877.png",
            /** 파일 사이즈를 문자열로 바꿀때 SI(국제단위계)사용여부 */
            FileSizeToStringUseSI: true,
            /** 프리뷰 삭제 버튼 */
            closeBtn: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#999"/>
        </svg>`,
            /**
             * 파일사이즈를 문자열로 바꾸는 함수
             * @param {number} nSizeLength 바꿀 사이즈
             * @param {boolean} bSI SI(국제단위계) 사용여부
             * @returns {string} 완성된 문자열
             */
            FileSizeToString: (nSizeLength, bSI) => {
                const thresh = bSI ? 1000 : 1024;
                if (Math.abs(nSizeLength) < thresh) {
                    return nSizeLength + ' B';
                }
                const units = bSI
                    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
                let u = -1;
                do {
                    nSizeLength /= thresh;
                    ++u;
                } while (Math.abs(nSizeLength) >= thresh && u < units.length - 1);
                return nSizeLength.toFixed(1) + ' ' + units[u];
            },
            /**
             * 확장자를 검사해서 미리보기 영역에 아이콘 혹은 이미지를 출력한다.
             * null이면 기본 함수를 사용한다.
             * @param {string} sExt 검사할 확장자
             * @returns {string} 이미지 주소.(ImgDomSet 참고)
             * 빈값이면 자체적으로 판단된다.(url이 있으면 url을 따라가고 아니면 기본 이미지)
             * "IMAGE"를 리턴하면 로컬파일은 비동기 이미지를 출력, 서버파일은 url를 넣는다.
             */
            ExtToImg: (sExt) => {
                var sReturn = "";
                //소문자로
                sExt = sExt.toLowerCase();
                switch (sExt) {
                    case ".bmp":
                    case ".dib":
                    case ".jpg":
                    case ".jpeg":
                    case ".jpe":
                    case ".gif":
                    case ".png":
                    case ".tif":
                    case ".tiff":
                    case ".raw":
                        sReturn = "IMAGE";
                        break;
                    default:
                        sReturn = "";
                        break;
                }
                return sReturn;
            },
            /**
             * 선택한 파일의 모든 처리가 끝났을때 이벤트
             */
            LoadComplete: () => {
                console.log("LoadComplete" + this.LoadCompleteMessage);
            },
            /**
             * 파일 지우기가 완료되면 전달할 이벤트
             * @param {FileItemInterface} file 아이템으로 사용하는 파일 정보(참고 : DG_JsFileSelector.prototype.jsonItemDefult)
             * @param {HTMLLIElement} dom 지울 대상
             */
            DeleteComplete: (file, dom) => {
                console.log(file);
            }
        };
        /** 가지고 있는 아이템 리스트 */
        this.ItemList = [];
        /** 파일 추가가 완료되었을 때 이번 스탭에 한 번에 추가된 개체들 */
        this.LoadCompleteFileList = [];
        /** 구분값 생성에 사용될 카운터 */
        this.EditorDivCount = 0;
        /** UI에 표시중인 파일의 총 크기 */
        this.FileTotalSize = 0;
        /** 바이너리 데이터를 사용하는 경우 모든 데이터가 로딩이 끝났는지 여부 */
        this.IsCompleteLoad = true;
        /** 선택한 파일의 처리가 끝났을 때 메세지 */
        this.LoadCompleteMessage = "LoadCompleteMessage";
        /** 만들어진 파일 열기 버튼 */
        this.DomInputFile = null;
        // 옵션을 먼저 설정한다.
        this.jsonOptionDefault = Object.assign({}, this.jsonOptionDefault, jsonOptions);
        // 영역 초기화
        // this.jsonOptoinDefult.Area.innerHTML = "";
        this.DomInputFile = document.querySelector("#file-open");
        // 허용 확장자
        let sExtAllow = "";
        for (let i = 0; i < this.jsonOptionDefault.ExtAllow.length; i++) {
            const itemExt = this.jsonOptionDefault.ExtAllow[i];
            sExtAllow += `,${itemExt}`;
        }
        // 허용 확장자 입력
        this.DomInputFile.setAttribute("accept", sExtAllow.substring(1));
        this.DomInputFile.addEventListener("change", (event) => {
            event.preventDefault();
            const target = event.target;
            this.OnChangeFile(target);
        });
        this.jsonOptionDefault.Area.addEventListener("drop", (event) => {
            event.preventDefault();
            this.OnDropEvent(event, event.currentTarget);
        });
        this.jsonOptionDefault.Area.addEventListener("dragover", (event) => {
            event.preventDefault();
            console.log('드랍중인 상태');
            this.OnDragOverEvent(event, event.currentTarget);
        });
        this.jsonOptionDefault.Area.addEventListener("dragleave", (event) => {
            event.preventDefault();
            this.jsonOptionDefault.Area.classList.remove("dragover");
        });
        this.ItemList = [];
    }
    /**
     * 파일 선택창에서 파일 선택시 이벤트
     * @param {HTMLInputElement} target 이벤트가 발생할때 자신의 오브젝트
     */
    OnChangeFile(target) {
        this.FileAdd_JsonList(target.files);
    }
    /**
     * 파일을 드래그해서 영역에 놨을때 발생하는 이벤트
     * @param {Event} event 전달 받은 이벤트 개체
     * @param {HTMLDivElement} target 이벤트를 생성할때 전달한 자신의 오브젝트
     */
    OnDropEvent(event, target) {
        if (true === this.jsonOptionDefault.Debug) {
            console.log("OnDropEvent");
        }
        const arrFile = [];
        if (event.dataTransfer.items) {
            const listItem = event.dataTransfer.items;
            for (let i = 0; i < listItem.length; i++) {
                const item = listItem[i];
                if ("file" === item.kind) {
                    arrFile.push(item.getAsFile());
                }
            }
            // 파일 추가
            this.FileAdd_JsonList(arrFile);
        }
        else {
            this.FileAdd_JsonList(event.dataTransfer.files);
        }
        this.jsonOptionDefault.Area.classList.remove("dragover");
    }
    /**
     * 파일을 드래그해서 영역에 올라왔을때 이벤트
     * @param {Event} event 전달 받은 이벤트 개체
     * @param {HTMLDivElement} target 이벤트가 발생할때 자신의 오브젝트
     */
    OnDragOverEvent(event, target) {
        this.jsonOptionDefault.Area.classList.add("dragover");
    }
    /**
     * 파일 추가 - 리스트
     * @param {FileList | FileItemInterface } arrFile 브라우저에서 넘어온 파일 정보 배열
     * @param {bool} bFileCountIgnore 파일 갯수 제한 무시여부
     */
    FileAdd_JsonList(arrFile, bFileCountIgnore) {
        const ItemList = this.FileListToItemList(arrFile);
        if (undefined === bFileCountIgnore) {
            bFileCountIgnore = true;
        }
        let bComplete = true;
        this.LoadCompleteMessage = "";
        if (0 < ItemList.length) {
            for (let i = 0; i < ItemList.length; i++) {
                const itemFile = ItemList[i];
                if (true === itemFile.BinaryIs && false === itemFile.BinaryReadyIs) {
                    //바이너리 정보를 사용하는데
                    //바이너리 준비가 끝났나지 안은 데이터가 있다.
                    bComplete = false;
                }
            }
            if (false === bComplete) {
                // 로딩이 필요한 데이터가 있다.
                this.IsCompleteLoad = false;
                this.LoadCompleteMessage = "";
                this.LoadCompleteFileList = [];
            }
        }
        let nErrorCount = 0;
        for (let i = 0; i < arrFile.length; i++) {
            if (1 === this.FileAdd_JsonItem(arrFile[i], bFileCountIgnore)) {
                nErrorCount++;
            }
        }
        if (true === bComplete) {
            // 로딩이 필요한 데이터가 있다.
        }
        else if (nErrorCount < arrFile.length) {
            // 에러 카운트가 파일 갯수보다 적다.
        }
        else {
            // 완료 이벤트 발생.
        }
    }
    FileAdd_JsonItem(file, bFileCountIgnore) {
        // 개수 확인
        if (-1 === this.jsonOptionDefault.MaxFileCount
            || true === bFileCountIgnore) {
            // 무제한
        }
        else {
            // 제한 있음
            if (this.jsonOptionDefault.MaxFileCount <= this.GetItemList().length) {
                // 개수 초과
                // TODO : 다시 확인
                this.LoadCompleteMessage += "허용 개수 초과 : " + this.jsonOptionDefault.MaxFileCount + "개\n";
                // 이 아이템은 취소 시킨다.
                return 1;
            }
        }
        const patternExt = /\.[0-9a-z]+$/i;
        // 파일 정보 추출
        const item = {
            Name: file.name,
            Extension: file.name.match(patternExt)[0].toLowerCase(),
            Size: file.size,
            Type: file.type,
            Description: "",
            EditorDivision: file.name + "/" + this.EditorDivCount,
            BinaryIs: true,
            BinaryReadyIs: false,
            Binary: file.stream(),
            idFile: 0,
            Url: "",
            Edit: false,
            Delete: false,
        };
        let sExt = this.jsonOptionDefault.ExtAllow.find((element) => element === "*.*");
        if (undefined === sExt) {
            // 전체 허용이 아니다.
            // 이 아이템의 확장자가 허용리스트에 있는지 확인
            sExt = this.jsonOptionDefault.ExtAllow.find((element) => element === item.Extension);
            if (undefined === sExt) {
                // 허용되지 않은 확장자
                this.LoadCompleteMessage += "허용되지 않은 확장자 : " + item.Extension + "\n";
                // 이 아이템은 취소 시킨다.
                return 1;
            }
        }
        this.FileAdd_UI(item, file);
    }
    FileAdd_UI(item, file) {
        // 객체 새로 만들기
        const newItem = Object.assign({}, item);
        // 아이템 UI 추가
        const domItem = document.createElement("li");
        domItem.classList.add("preview-wrap");
        domItem.setAttribute("idFile", newItem.idFile.toString());
        const domPrivewInfo = document.createElement("div");
        domPrivewInfo.classList.add("preview-info");
        const domActionsBox = document.createElement("div");
        domActionsBox.classList.add("actions-box");
        // 삭제 버튼
        const domBtnDelete = document.createElement("button");
        domBtnDelete.classList.add("remove-btn");
        domBtnDelete.innerHTML = this.jsonOptionDefault.closeBtn;
        domBtnDelete.addEventListener("click", (event) => {
            this.ItemListDelete(newItem, domItem);
            console.log(this.ItemList);
        });
        domActionsBox.appendChild(domBtnDelete);
        // 이미지 출력
        const domImg = document.createElement("img");
        let ImageTitle = newItem.Description;
        if ("" === ImageTitle) {
            ImageTitle = newItem.Name;
        }
        domImg.setAttribute("title", ImageTitle);
        // 사용할 이미지
        let ImageUrl = this.ExtToImg(newItem.Extension);
        if (true === newItem.BinaryIs) {
            // 바이너리 정보 사용
            if (true === newItem.BinaryReadyIs) {
                // 바이너리 정보가 있다.
                this.ImgDomSet(domImg, ImageUrl, newItem.Binary);
            }
            else {
                // 바이너리 정보가 아직 로드가 되지 않았다.
                // 일단 로딩 이미지 출력
                domImg.setAttribute("src", this.jsonOptionDefault.LoadingSrc);
                const fileReader = new FileReader();
                fileReader.addEventListener("load", (event) => {
                    newItem.Binary = fileReader.result;
                    this.ImgDomSet(domImg, ImageUrl, newItem.Binary);
                    // 바이너리 로드 완료
                    newItem.BinaryReadyIs = true;
                    this.LoadComplete();
                }, false);
                fileReader.readAsDataURL(file);
            }
        }
        else {
            // 바이너리 정보를 사용하지 않는다.
            this.ImgDomSet(domImg, ImageUrl, newItem.Url);
        }
        domPrivewInfo.appendChild(domImg);
        // 파일 정보 출력
        const domFileInfo = document.createElement("div");
        domFileInfo.classList.add("file-info");
        const domFileName = document.createElement("p");
        domFileName.classList.add("file-name");
        domFileName.textContent = newItem.Name;
        domFileInfo.appendChild(domFileName);
        const domFileSize = document.createElement("p");
        domFileSize.classList.add("file-size");
        domFileSize.textContent = this.jsonOptionDefault.FileSizeToString(newItem.Size, this.jsonOptionDefault.FileSizeToStringUseSI);
        domFileInfo.appendChild(domFileSize);
        domPrivewInfo.appendChild(domFileInfo);
        domItem.appendChild(domPrivewInfo);
        domItem.appendChild(domActionsBox);
        // 아이템 리스트에 추가
        if (0 >= this.ItemList.length) {
            // 첫 아이템이다.
            this.jsonOptionDefault.Area_ItemList.innerHTML = "";
        }
        this.jsonOptionDefault.Area_ItemList.appendChild(domItem);
        this.ItemList.push(newItem);
        this.LoadCompleteFileList.push(file);
        console.log(this.ItemList);
    }
    /**
     * 완성된 리스트를 UI에 출력.
     * 완성된 리스트라는 것은 로딩이 끝난데이터를 말한다.
     * 외부에서 완성된 데이터 리스트를 받아 UI에 바인딩할때 사용한다.
     * @param {FileItemInterface} fileList 파일 배열
     */
    FileAdd_CompleteList(fileList) {
        for (let i = 0; i < fileList.length; i++) {
            const itemFile = fileList[i];
            this.FileAdd_UI(itemFile, null);
        }
    }
    LoadComplete() {
        let Return = true;
        for (let i = 0; i < this.ItemList.length; i++) {
            const itemFile = this.ItemList[i];
            if (true === itemFile.BinaryIs && false === itemFile.BinaryReadyIs) {
                //바이너리 정보를 사용하는데
                //바이너리 준비가 끝났나지 안은 데이터가 있다.
                Return = false;
                break;
            }
        }
        if (true === Return && false === this.IsCompleteLoad) {
            this.IsCompleteLoad = true;
            this.jsonOptionDefault.LoadComplete();
        }
    }
    /**
     * 확장자 검사.
     * 확장자를 어떻게 처리할지를 판단한다.
     * @param {string} sExt 검사할 확장자
     * @returns {string} 이미지 주소.(ImgDomSet 참고)
     * 빈값이면 자체적으로 판단된다.(url이 있으면 url을 따라가고 아니면 기본 이미지)
     * "IMAGE"를 리턴하면 로컬파일은 비동기 이미지를 출력, 서버파일은 url를 넣는다.
     */
    ExtToImg(sExt) {
        if (null !== this.jsonOptionDefault.ExtToImg) {
            return this.jsonOptionDefault.ExtToImg(sExt);
        }
        else {
            return "";
        }
    }
    ;
    /**
     * ExtToImg에서 판단한 정보를 가지고 이미지를 출력한다.
     * @param {dom} domImg 이미지를 출력할 dom
     * @param {string} sImgUrl ExtToImg에서 판단하여 넘겨받은 정보
     * @param {byte | string} objImage "IMAGE"일때 출력할 이미지 정보
     */
    ImgDomSet(domImg, sImgUrl, objImage) {
        let Image = "";
        if ("IMAGE" === sImgUrl) {
            // 지정된 이미지가 있다.
            Image = objImage;
        }
        else if ("" === sImgUrl) {
            // 지정된 이미지가 없다.
            Image = this.jsonOptionDefault.NoneFileImgUrl;
        }
        else {
            // 지정된 이미지가 있다.
            Image = sImgUrl;
        }
        domImg.setAttribute("src", Image);
    }
    GetItemList() {
        this.ClearItemList();
        return this.ItemList;
    }
    ClearItemList() {
        const arrRemove = [];
        for (let i = 0; i < this.ItemList.length; i++) {
            const itemFile = this.ItemList[i];
            if (true === itemFile.Delete && 0 >= itemFile.idFile) {
                // 삭제 되었는데, 파일 아이디가 없다.
                // 그렇다는 것은 서버에 알릴 필요가 없는 파일이라는 뜻
                arrRemove.push(itemFile);
            }
        }
        for (let i = 0; i < arrRemove.length; i++) {
            const FindIndex = this.ItemList.indexOf(arrRemove[i]);
            if (-1 !== FindIndex) {
                this.ItemList.splice(FindIndex, 1);
            }
        }
    }
    /**
     * 선택된 개체를 지운다.
     * @param {FileItemInterface} file 아이템으로 사용하는 파일 정보
     * @param {HTMLLIElement} dom 지울 대상
     */
    ItemListDelete(file, dom) {
        file.Delete = true;
        dom.remove();
        if (0 >= file.idFile) {
            // 파일 아이디가 없다.
            // 로컬 파일이라는 것
            // 로컬 파일 삭제는 리스트에서 제거한다.
            const FindIndex = this.ItemList.indexOf(file);
            if (-1 !== FindIndex) {
                this.ItemList.splice(FindIndex, 1);
            }
        }
        this.jsonOptionDefault.DeleteComplete(file, dom);
    }
    ;
    FileListToItemList(fileList) {
        const ReturnList = [];
        //확장자 추출 정규식
        const patternExt = /\.[0-9a-z]+$/i;
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const item = {
                Name: file.name,
                Extension: file.name.match(patternExt)[0].toLowerCase(),
                Size: file.size,
                Type: file.type,
                Description: "",
                EditorDivision: file.name + "/" + this.EditorDivCount,
                BinaryIs: true,
                BinaryReadyIs: false,
                Binary: file.stream(),
                idFile: 0,
                Url: "",
                Edit: false,
                Delete: false,
            };
            ReturnList.push(item);
        }
        return ReturnList;
    }
}
