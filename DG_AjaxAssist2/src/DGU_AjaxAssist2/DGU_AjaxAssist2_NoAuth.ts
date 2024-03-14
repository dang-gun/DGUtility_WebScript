

import { AjaxCallContentGetType, AjaxCallMethodType, AjaxCallOptionModel, AjaxCallOptionCheckCompleteDataModel } from "./ModelData/AjaxCallOptionModel";
export * from "./ModelData/AjaxCallOptionModel";


/**
 * 아작스 지원2(인증없는 버전)
 */
export default class DGU_AjaxAssist2_NoAuth
{
	/** 아작스 호출시 기본값으로 사용할 옵션 */
	public CallOptionDefult: AjaxCallOptionModel;

	constructor(callOptionDefult?: AjaxCallOptionModel)
	{
		if (callOptionDefult)
		{//기본값으로 사용할 콜옵션이 있다.

			//전달받은 값을 기본값으로 사용한다.
			this.CallOptionDefult = callOptionDefult;
		}
		else
		{//없다.

			//임의로 세팅된 기본값을 사요한다.
			this.CallOptionDefult = {
				await: false,
				contentGetType: AjaxCallContentGetType.Json,
				method: AjaxCallMethodType.Get,
				url: "",
				fetchOption: {
					/** no-cors, cors, *same-origin */
					mode: 'cors',
					/** // *default, no-cache, reload, force-cache, only-if-cached */
					cache: 'no-cache',
					/** include, *same-origin, omit */
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json'
						/** */
						//,'Content-Type': 'application/json;charset=utf-8'
						//'Content-Type': 'text/plain',
						, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					/** manual, *follow, error */
					redirect: 'follow',
					/** no-referrer, *client */
					referrer: 'no-referrer',
				},

				data: null,
				body: null,

				success: function (data: object, response: Response) { },
				error: function (response: Response) { },
			}
		}

		//메뉴 추가
		let divMain = document.getElementById("divMain");
		divMain.innerHTML = "Test";

		
	}

	/**
	 * ajax 호출(동기)
	 * ajax가 응답할때까지 기다렸다가 callOption.contentGetType 설정된 결과값으로 리턴한다.
	 * 
	 * callOption.success, callOption.error가 있다면 우선 호출된다.
	 * @param callOption
	 * @returns callOption.contentGetType에 맞춰 변환된 data.
	 * 에러가 발생한경우 무조건 Response를 리턴한다.
	 */
	public Call = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//강제 설정 변경
		callOption.await = true;

		//리턴용
		let returnData: null | Response | ArrayBuffer | string | any = null;

		//아작스 호출에 사용할 옵션을 완성시킨다.
		let jsonCallOptionComplete: AjaxCallOptionCheckCompleteDataModel
			= this.CallOptionCheck(callOption);

		//아작스 호출
		await fetch(jsonCallOptionComplete.urlTarget
					, jsonCallOptionComplete.completeFetch)
			.then((response) =>
			{
				//응답데이터를 설정에 맞게 변환한다.
				returnData
					= this.ResponseToData(
						response
						, jsonCallOptionComplete.callOption.contentGetType);

				jsonCallOptionComplete.callOption.success(returnData, response);
			})
			.catch((response) =>
			{
				returnData = response;
				jsonCallOptionComplete.callOption.error(response);
			});

		return returnData;
	}

	public CallAsync = (callOption: AjaxCallOptionModel)
		: Promise<Response>   =>
	{
		callOption.await = false;

		let jsonCallOptionComplete: AjaxCallOptionCheckCompleteDataModel
			= this.CallOptionCheck(callOption);
		
		//완성된 리스폰스
		let responseAjaxResult: Promise<Response> = null;
		

		return responseAjaxResult;

	}//end Call

	/**
	 * 아작스 호출 옵션 체크
	 * @param callOption
	 * @returns
	 */
	private CallOptionCheck = (
		callOption: AjaxCallOptionModel)
		: AjaxCallOptionCheckCompleteDataModel =>
	{
		//전달된 옵션 합치기(들어온 옵션 우선)
		let callOpt: AjaxCallOptionModel
			= Object.assign({}, this.CallOptionDefult, callOption);
		//만약 하위트를 사용할 예정이면(예> callOpt.fetchOption)
		//하위 트리는 포인터가 저장되므로 수작업으로 다시 저장한다.

		//아작스 호출에 사용할 최종 Fetch옵션
		//새로 생성해서 기본 옵션과 전달 받은 옵션을 합친다.
		let jsonCompleteFetch: RequestInit
			= Object.assign(
				{}
				, this.CallOptionDefult.fetchOption
				, callOption.fetchOption);


		//url을 개체로 변경
		let urlTarget: URL = new URL(callOpt.url, window.location.origin);


		if (!(callOpt.fetchOption.method))
		{//fetchOption에 메소드가 없다.
			jsonCompleteFetch.method = callOpt.method;
		}

		if (AjaxCallMethodType.Get === jsonCompleteFetch.method
			|| AjaxCallMethodType.Head === jsonCompleteFetch.method)
		{//메서드가 Get 이거나
			//메서드가 Head 이다.


			//데이터 임시 저장
			let objDataTemp: null | Object = null;



			if (jsonCompleteFetch.body)
			{//jsonCompleteFetch.body가 있다.

				//jsonCompleteFetch.body가 1순위
				//바디의 내용을 데이터로 옮긴다.
				objDataTemp = jsonCompleteFetch.body;
			}
			else if (callOpt.data)
			{//callOpt.data가 있다.

				//callOpt.data가 2순위
				objDataTemp = callOpt.data;
			}
			else if (callOpt.body)
			{//callOpt.body가 있다.

				//callOpt.body가 3순위
				objDataTemp = callOpt.body;
			}

			//바디를 제거한다.
			delete jsonCompleteFetch["body"];

			//url쿼리를 만든다.
			if (objDataTemp)
			{//전달할 데이터가 있다.

				//이 메서드들은 url쿼리로 데이터를 전달해야하므로
				//데이터를 SearchParams로 변환한 후
				//생성한 쿼리를 문자열로 바꿔 넣어준다.
				urlTarget.search
					= this.JsonToSearchParams(objDataTemp).toString();
			}

		}
		else
		{//이외의 메서드

		}




		//최종 완성된 요청 정보를 만든다.****************
		let returnTemp: AjaxCallOptionCheckCompleteDataModel
			= new AjaxCallOptionCheckCompleteDataModel();

		returnTemp.callOption = callOpt;
		returnTemp.urlTarget = urlTarget;
		returnTemp.completeFetch = jsonCompleteFetch;

		return returnTemp;
	}

	/**
	 * json 오브젝트를 URLSearchParams로 변환한다.
	 * @param object
	 * @returns
	 */
	private JsonToSearchParams(object: object): URLSearchParams
	{
		let urlSearchParams = new URLSearchParams();

		//한개씩 넣어준다.
		for (const [key, value] of Object.entries(object))
		{
			urlSearchParams.append(key, value.toString());
		}

		return urlSearchParams;
	}

	private ResponseToData(
		response: Response
		, typeContentGet: AjaxCallContentGetType)
		: void | Response | ArrayBuffer | string | any
	{
		let objReturn: null | Response | ArrayBuffer | string | any = null;

		if (true === response.ok)
		{//성공
			
			switch (typeContentGet)
			{
				case AjaxCallContentGetType.Response:
					objReturn = response;
					break;
				case AjaxCallContentGetType.Json:
					objReturn = response.json();
					break;
				case AjaxCallContentGetType.Binary:
					objReturn = response.arrayBuffer();
					break;

				case AjaxCallContentGetType.Text:
				default:
					objReturn = response.text();
					break;
			}
		}

		return objReturn;
	}//end ResponseToData
}

