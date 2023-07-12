import DG_jsFileSelector2 from "./DG_jsFileSelector2.js";
export default class StartUp
{
    constructor()
    {
        this.DG_jsFileSelector2 = new DG_jsFileSelector2({
            Area: document.querySelector(".file-dnd-box"),
            Area_ItemList: document.querySelector(".file-preview-list"),
            Debug: true,
            MaxFileCount: 2,
        });
        console.log("Start App");
    }
    Test_FileAdd()
    {
        this.DG_jsFileSelector2.FileAdd_CompleteList([
            {
                Name: "테스트 파일01.test",
                Extension: ".test",
                Size: 3000,
                Type: "",
                Description: "테스트 파일",
                EditorDivision: "테스트 파일01.test/1",
                BinaryIs: false,
                BinaryReadyIs: false,
                Binary: "",
                idFile: 1,
                Url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9945DA4E5EB820131E2E30",
                Edit: false,
                Delete: false,
            },
            {
                Name: "테스트 파일02.jpg",
                Extension: ".jpg",
                Size: 3000,
                Type: "",
                Description: "테스트 파일",
                EditorDivision: "테스트 파일02.jpg/2",
                BinaryIs: false,
                BinaryReadyIs: false,
                Binary: "",
                idFile: 1,
                Url: "https://t1.daumcdn.net/cfile/tistory/995EA74E5E5A9BB409?original",
                Edit: false,
                Delete: false,
            }
        ]);
    }
    Test_GetItemList()
    {
        console.log(this.DG_jsFileSelector2.GetItemList());
    }
    FS_LoadComplete()
    {
        console.log('로드 완료');
    }
}
