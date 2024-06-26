﻿

import { AjaxCallContentGetType, AjaxCallMethodType, AjaxCallOptionModel, AjaxCallOptionCheckCompleteDataModel } from "./ModelData/AjaxCallOptionModel";
export * from "./ModelData/AjaxCallOptionModel";


/**
 * 아작스 지원2(인증없는 버전)
 * 헤더이 인증용 토큰을 담지 않는 버전.
 * 쿠키와 같은 다른 수단으로 인증할때 사용한다.
 * 
 * 헤더에 인증용 토큰을 담고 자동으로 엑세스토큰과 리플레시토큰을 처리하려면 DGU_AjaxAssist2_Auth를 사용해야 한다.
 */
export default class DGU_AjaxAssist2
{
	/** 아작스 호출시 기본값으로 사용할 옵션 */
	public CallOptionDefult: AjaxCallOptionModel;

	/**
	 * 개체를 초기화하면서 기본값으로 사용할 호출 옵션을 초기화 한다.
	 * @param callOptionDefult 초기화에 사용할 기본 호출 옵션
	 * 값이 없으면 임의로 세팅된 기본값을 사용한다.
	 */
	constructor(callOptionDefult?: AjaxCallOptionModel)
	{
		if (callOptionDefult)
		{//기본값으로 사용할 콜옵션이 있다.

			//전달받은 값을 기본값으로 사용한다.
			this.CallOptionDefult = callOptionDefult;
		}
		else
		{//없다.

			//임의로 세팅된 기본값을 사용한다.
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

				success: null,
				error: null,
			}
		}
	}

	//#region ajax 호출 : 메서드 지정

	/**
	 * ajax get 요청
	 * 동기호출을 할때는 반드시 await로 호출해야 한다.
	 * @returns 옵션에 따른 리턴
	 * 동기 : callOption.contentGetType에 맞춰 변환된 data.
	 * 비동기 : Promise<Response>
	 */
	public get = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//메서드 타입 강제 지정
		callOption.method = AjaxCallMethodType.Get;

		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}

	/**
	 * ajax post 요청
	 * 동기호출을 할때는 반드시 await로 호출해야 한다.
	 * @returns 옵션에 따른 리턴
	 * 동기 : callOption.contentGetType에 맞춰 변환된 data.
	 * 비동기 : Promise<Response>
	 */
	public post = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//메서드 타입 강제 지정
		callOption.method = AjaxCallMethodType.Post;

		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}

	/**
	 * ajax put 요청
	 * 동기호출을 할때는 반드시 await로 호출해야 한다.
	 * @returns 옵션에 따른 리턴
	 * 동기 : callOption.contentGetType에 맞춰 변환된 data.
	 * 비동기 : Promise<Response>
	 */
	public put = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//메서드 타입 강제 지정
		callOption.method = AjaxCallMethodType.Put;

		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}

	/**
	 * ajax patch 요청
	 * 동기호출을 할때는 반드시 await로 호출해야 한다.
	 * @param callOption
	 * @returns 옵션에 따른 리턴
	 * 동기 : callOption.contentGetType에 맞춰 변환된 data.
	 * 비동기 : Promise<Response>
	 */
	public patch = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//메서드 타입 강제 지정
		callOption.method = AjaxCallMethodType.Patch;

		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}

	/**
	* ajax delete 요청
	* 동기호출을 할때는 반드시 await로 호출해야 한다.
	* @param callOption
	* @returns 옵션에 따른 리턴
	* 동기 : callOption.contentGetType에 맞춰 변환된 data.
	* 비동기 : Promise<Response>
	*/
	public delete = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		//메서드 타입 강제 지정
		callOption.method = AjaxCallMethodType.Delete;

		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}
	//#endregion

	/**
	 * ajax call 요청
	 * 동기호출을 할때는 반드시 await로 호출해야 한다.
	 * 
	 * callOption.await옵션에 따라 동기/비동기 호출을 한다.
	 * @param callOption
	 * @returns 옵션에 따른 리턴
	 * 동기 : callOption.contentGetType에 맞춰 변환된 data.
	 * 비동기 : Promise<Response>
	 */
	public call = async (callOption: AjaxCallOptionModel)
		: Promise<null | Response | ArrayBuffer | string | any> =>
	{
		if (true === callOption.await)
		{//동기
			return await this.callAwait(callOption);
		}
		else
		{//비동기
			return this.callAsync(callOption);
		}
	}

	/**
	 * ajax 호출(동기)
	 * 반드시 await로 호출해야 한다.
	 * ajax가 응답할때까지 기다렸다가 callOption.contentGetType 설정된 결과값으로 리턴한다.
	 * 
	 * callOption.success, callOption.error가 있다면 우선 호출된다.
	 * @param callOption 아작스 호출옵션(비어있는 옵션은 기본옵션이 사용된다.)
	 * @returns callOption.contentGetType에 맞춰 변환된 data.
	 * 에러가 발생한경우 무조건 Response를 리턴한다.
	 */
	public callAwait = async (callOption: AjaxCallOptionModel)
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
			.then((response: Response) =>
			{
				//응답데이터를 설정에 맞게 변환한다.
				returnData
					= this.ResponseToData(
						response
						, jsonCallOptionComplete.callOption.contentGetType!);

				if (jsonCallOptionComplete.callOption.success)
				{//함수가 있으면 호출
					jsonCallOptionComplete.callOption.success(returnData, response);
				}
			}).catch((response: Response) =>
			{
				returnData = response;
				if (jsonCallOptionComplete.callOption.error)
				{//함수가 있으면 호출
					jsonCallOptionComplete.callOption.error(response);
				}
			});

		return returnData;
	}

	/**
	 * ajax 호출(비동기)
	 * ajax가 응답을 기다리지 않는다.
	 * 결과를 callOption.success, callOption.error로 전달받거나 
	 * Promise패턴을 사용하여 받으면 된다.
	 * 
	 * @param callOption 아작스 호출옵션(비어있는 옵션은 기본옵션이 사용된다.)
	 * @returns 사용된 Promise개체
	 */
	public callAsync = (callOption: AjaxCallOptionModel)
		: Promise<Response> =>
	{
		callOption.await = false;

		let jsonCallOptionComplete: AjaxCallOptionCheckCompleteDataModel
			= this.CallOptionCheck(callOption);

		//완성된 리스폰스
		let returnRespAjaxResult: Promise<Response> | null = null;

		returnRespAjaxResult
			= fetch(jsonCallOptionComplete.urlTarget
				, jsonCallOptionComplete.completeFetch
			).then((response: Response) =>
			{
				if (jsonCallOptionComplete.callOption.success)
				{
					//전달용 데이터
					let returnData: null | Response | ArrayBuffer | string | any = null;

					//응답데이터를 설정에 맞게 변환한다.
					returnData
						= this.ResponseToData(
							response
							, jsonCallOptionComplete.callOption.contentGetType!);

					jsonCallOptionComplete.callOption.success(returnData, response);
				}


				return response;
			}).catch((response: Response) =>
			{
				if (jsonCallOptionComplete.callOption.error)
				{
					jsonCallOptionComplete.callOption.error(response);
				}
				return response;
			});

		return returnRespAjaxResult;

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


		if ( !(callOpt.fetchOption) || !(callOpt.fetchOption.method))
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

	/**
	 * 리스폰스 데이터를 옵션에 맞게 변환하여 리턴한다.
	 * 
	 * @param response
	 * @param typeContentGet
	 * @returns
	 */
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
					let aaa: JSON = objReturn as JSON;
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

