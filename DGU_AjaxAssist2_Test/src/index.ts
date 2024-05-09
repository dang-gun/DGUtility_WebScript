import DGU_AjaxAssist2 from "../Utility/DGU_AjaxAssist2/DGU_AjaxAssist2";
//import DGU_AjaxAssist2 from "../Utility/DGU_AjaxAssist2/DGU_AjaxAssist2";
//const DGU_AjaxAssist2 = require("../Utility/DGU_AjaxAssist2/DGU_AjaxAssist2")

//import DGU_AjaxAssist2 from "../Utility/DGU_AjaxAssist2_ori/DGU_AjaxAssist2";

export default class App
{
	/** 지금 보여주고 있는 페이지에서 사용할 개체 */
	public PageNow: any = null;

	constructor()
	{
		//메뉴 추가
		let divMain = document.getElementById("divMain");
		divMain.innerHTML = "Test";

		const ajaxA2 = new DGU_AjaxAssist2();
		
	}

}

(window as any).app = new App();
