import DGU_AjaxAssist2_NoAuth from "./DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth";

export default class App
{
	/**  아작스 지원2(인증없는 버전) 개체 */
	private AA: DGU_AjaxAssist2_NoAuth = new DGU_AjaxAssist2_NoAuth();

	/** GET 테스트 버튼 */
	private btnGetTest: HTMLButtonElement;

	constructor()
	{
		

		//버튼과 연결
		this.btnGetTest = document.getElementById("btnGetTest") as HTMLButtonElement;
		this.btnGetTest.onclick = () =>
		{
			//this.AA.Call()
		};

	}

}

(window as any).app = new App();
