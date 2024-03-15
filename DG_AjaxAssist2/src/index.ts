import DGU_AjaxAssist2_NoAuth, { AjaxCallContentGetType } from "./DGU_AjaxAssist2/DGU_AjaxAssist2_NoAuth";

export default class App
{
	/**  아작스 지원2(인증없는 버전) 개체 */
	private AA: DGU_AjaxAssist2_NoAuth = new DGU_AjaxAssist2_NoAuth();

	/** GET 테스트 버튼 */
	private btnGetTest: HTMLButtonElement;

	constructor()
	{
		

		//GET를 동기로 호출
		let btnGetTest1: HTMLButtonElement
			= document.getElementById("btnGetTest1") as HTMLButtonElement;
		btnGetTest1.onclick = async () =>
		{
			console.log("------- GET await (json) ------");
			let jsonData: JSON =
				await this.AA.Call({
					method: "GET",
					url: "/api/keywords",
				});
				
			console.log(jsonData);


			//console.log("------- GET await (string) ------");
			//let jsonData2: string =
			//	await this.AA.Call({
			//		method: "GET",
			//		url: "/api/keywords",
			//		contentGetType: AjaxCallContentGetType.Text
			//	});
			
			//console.log(jsonData2);
		};




		//GET를 비동기로 호출1
		let btnGetTest2_1: HTMLButtonElement
			= document.getElementById("btnGetTest2_1") as HTMLButtonElement;
		btnGetTest2_1.onclick = async () =>
		{

			console.log("------- GET callback (json) : call ------");
			this.AA.CallAsync({
				method: "GET",
				url: "/api/keywords",
				success: (data: JSON, response: Response) =>
				{//아작스 호출이 성공함

					console.log("------- GET callback (json) : resutl ------");
					console.log(data);
				},
				error: (response: Response) =>
				{//아작스 호출이 실패함

					console.log("------- GET callback (json) : error ------");
					console.log(response);
				}
			});
		};


		//GET를 비동기로 호출2
		let btnGetTest2_2: HTMLButtonElement
			= document.getElementById("btnGetTest2_2") as HTMLButtonElement;
		btnGetTest2_2.onclick = async () =>
		{
			console.log("------- GET Promise (json) : call ------");
			this.AA.CallAsync({
				method: "GET",
				url: "/api/keywords",
				success: null,
			}).then(async (response: Response) =>
			{//아작스 호출이 성공함
				console.log("------- GET Promise (json) : resutl ------");
				console.log(await response.json());
			}).catch((response: Response) =>
			{//아작스 호출이 실패함

				console.log("------- GET Promise (json) : error ------");
				console.log(response);
			});
		};


	}

}

(window as any).app = new App();
