

import { type } from "os";
import { isArray } from "util";
import
	{
		FormatItemInterface
		, FormatGroupInterface
		, MatchResultInterface
		, MatchReplaceValueInterface
		, FormatGroupFavoritesInterface
	} from "./MatchPatternItemInterface"
export * from "./MatchPatternItemInterface";



/**
 * \{\{[a-zA-Z0-9]+\:[a-zA-Z0-9]+\}\}|\{\{[a-zA-Z0-9]+\}\}/g
 * test : {{aa:11a1}}, {{aa:222a}}, {{dd:33a3}}, {{cc22}}, {{2eee22:}}
 * */
export default class DG_JsTextReplace
{
	/** 패턴의 앞쪽 */
	private Mark_FrontOri = "{{";
	/** 패턴의 앞쪽 - 정규식용 */
	private Mark_FrontRegex = "\\{\\{";

	public get Mark_Front()
	{
		return this.Mark_FrontOri;
	}
	public set Mark_Front(value: string)
	{
		this.Mark_FrontOri = value;

		//정규식용 문자를 따로 저장
		let arrValue: string[] = [...this.Mark_FrontOri];
		this.Mark_FrontRegex = arrValue.join("\\");
	}


	/** 패턴의 뒷쪽 */
	private Mark_BackOri = "}}";
	/** 패턴의 뒷쪽 - 정규식용 */
	private Mark_BackRegex = "\\}\\}";

	public get Mark_Back()
	{
		return this.Mark_BackOri;
	}
	public set Mark_Back(value: string)
	{
		this.Mark_BackOri = value;

		//정규식용 문자를 따로 저장
		let arrValue: string[] = [...this.Mark_BackOri];
		this.Mark_BackRegex = arrValue.join("\\");
	}


	/** 저장된 포맷 그룹 */
	private FormatGroupList: FormatGroupInterface[] = [];

	/** 자주쓰는 포맷 그룹 */
	public FormatGroupFavoritesList: FormatGroupFavoritesInterface[] = [];

	constructor()
	{
	}

	/**
	 * 포맷 그룹을 추가한다.
	 * @param sFormatGroupName 이 포맷을 구분할 이름
	 * @param arrFormatList 이 포맷 그룹에 포함된 포맷 리스트
	 */
	public FormatGroupAdd(
		sFormatGroupName: string
		, arrFormatList: FormatItemInterface[])
	{
		//그룹을 저장한다.
		this.FormatGroupList.push({
			FormatGroupName: sFormatGroupName
			, FormatItemList: arrFormatList
		});
	}

	/**
	 * 자주쓰는 포맷 그룹 저장
	 * @param Name 구문용 이름(혹은 숫자)
	 * @param Target 대상이 되는 포맷 이름 리스트
	 */
	public FormatGroupFavoritesAdd(
		Name: string | number
		, Target: string[])
	{
		this.FormatGroupFavoritesList.push({
			Name: Name
			, Target: Target
		});
	}

	printConsole(a: number): void;
	printConsole(a: string): void;
	printConsole(a: number, b: string): void;
	printConsole(a: string, b: number): void;

	printConsole(a: any, b?: any): void
	{
		console.log(a, b);
	}

	
	/**
	 * 패턴 바인드
	 * 즐겨찾기로 등록된 포맷 그룹 이름을 적용하여 바인드 한다.
	 * @param sOriData 원본 문자열
	 * @param sFavoritesName 사용할 포맷 그룹 이름
	 * @param jsonValue 매칭용 값
	 * @param typeMatch 매칭 방식
	 * @returns 매치 결과
	 */
	public PatternBind_Favorites(
		sOriData: string
		, sFavoritesName: number | string
		, jsonValue: MatchReplaceValueInterface[])
		: MatchResultInterface;
	/**
	 * 패턴 바인드
	 * 즐겨찾기로 등록된 포맷 그룹 이름을 적용하여 바인드 한다.
	 * @param sOriData 원본 문자열
	 * @param arrFavoritesName 사용할 포맷 그룹 이름 리스트
	 * @param jsonValue 매칭용 값
	 * @param typeMatch 매칭 방식
	 * @returns 매치 결과
	 */
	public PatternBind_Favorites(
		sOriData: string
		, arrFavoritesName: any[]
		, jsonValue: MatchReplaceValueInterface[])
		: MatchResultInterface;

	/**
	 * 패턴 바인드
	 * 즐겨찾기로 등록된 포맷 그룹 이름을 적용하여 바인드 한다.
	 * @param sOriData 원본 문자열
	 * @param arrFavoritesName 사용할 포맷 그룹 이름 리스트(단일 숫자, 단일 문자열, 배열(숫자,문자열))
	 * @param jsonValue 매칭용 값
	 * @param typeMatch 매칭 방식
	 * @returns 매치 결과
	 */
	public PatternBind_Favorites(
		sOriData: string
		, sFavoritesName: number | string | any[]
		, jsonValue: MatchReplaceValueInterface[])
		: MatchResultInterface
	{
		let arrName: string[] = [];

		//숫자와 문자만 된다.
		let arrFavoritesName: any = [];

		if (false === Array.isArray(sFavoritesName))
		{//단일 문자열이나 숫자이다.
			arrFavoritesName.push(sFavoritesName);
		}
		else
		{//배열이다.

			arrFavoritesName.push(...(sFavoritesName as any[]));
		}

		//중복 제거
		arrFavoritesName = [...(new Set(arrFavoritesName))];

		for (let idx in arrFavoritesName)
		{
			let item: string = arrFavoritesName[idx];

			arrName.push(
				...this.FormatGroupFavoritesList
					.filter(f => f.Name === item)
					.map(m => m.Target)[0]);
		}

		//중복 제거
		arrName = [...(new Set(arrName))];

		return this.PatternBind(
			sOriData
			, arrName
			, jsonValue);
	}


	
	/**
	 * 패턴 바인드
	 * 저장된 모든 포맷을 사용하여 패턴을 바인드한다.
	 * @param sOriData 원본 문자열
	 * @param jsonValue 매칭용 값
	 */
	public PatternBind(
		sOriData: string
		, jsonValue: MatchReplaceValueInterface[]
	): MatchResultInterface

	/**
	 * 
	 * @param sOriData 원본 문자열
	 * @param arrFormatGroupName 사용할 포맷 그룹 이름 리스트
	 * @param jsonValue 매칭용 값
	 */
	public PatternBind(
		sOriData: string
		, arrFormatGroupName: string[]
		, jsonValue: MatchReplaceValueInterface[]
	): MatchResultInterface

	public PatternBind(
		sOriData: string
		, arrFormatGroupName?: any
		, jsonValue?: any
	): MatchResultInterface
	{
		if (true === this.MatchResultInterfaceIs(jsonValue))
		{//arrFormatGroupName가 MatchResultInterface이다.

		}
		else
		{//아니다.

			//arrFormatGroupName 들어있는 값이 jsonValue라는 의미이므로 전달한다.
			jsonValue = arrFormatGroupName;

			//arrFormatGroupName은 전체를 쓴다는 의미이므로
			//가지고 있는 리스트의 전체 그룹명을 넘겨준다.
			arrFormatGroupName = this.FormatGroupList.map(m => m.FormatGroupName);
		}


		return this.PatternBind_Ori(
			sOriData
			, arrFormatGroupName
			, jsonValue
		);
	}

	/**
	 * 지정된 오브젝트가 'MatchResultInterface'인지 판단
	 * obj는 MatchResultInterface[] 이여야 true가 나온다.
	 * @param obj
	 */
	private MatchResultInterfaceIs(obj: any): obj is MatchResultInterface
	{
		if (typeof obj === "object")
		{
			if (true === Array.isArray(obj))
			{
				let item = obj[0];
				return ('sFindName' in item) && ('sReplaceValue' in item);
			}
			else
			{
				return false;
			}	
		}
		else
		{
			return false;
		}
	}
	
	/**
	 * 패턴 바인드
	 * 패턴에 포맷을 적용하여 바인드 한다.
	 * @param sOriData 원본 문자열
	 * @param arrFormatGroupName 사용할 포맷 그룹 이름 리스트
	 * @param jsonValue 매칭용 값
	 */
	private PatternBind_Ori(
		sOriData: string
		, arrFormatGroupName: string[]
		, jsonValue: MatchReplaceValueInterface[]
	): MatchResultInterface
	{
		//파라메타 백업
		let sOriDataTemp: string = sOriData;
		let jsonValueTemp: MatchReplaceValueInterface[] = jsonValue;

		//리턴용 결과
		let mrReturn: MatchResultInterface = {
			MatchIs: false
			, ResultString: sOriDataTemp
		};


		//사용할 포맷 그룹
		let arrMPI: FormatItemInterface[] = [];

		//사용할 포맷 정리
		for (let nFormatNameIdx = 0
			; nFormatNameIdx < arrFormatGroupName.length
			; ++nFormatNameIdx)
		{
			let itemGroupName: string = arrFormatGroupName[nFormatNameIdx];

			//매치 그룹에 일치하는 이름을 찾는다.
			let findFG: FormatGroupInterface[]
				= this.FormatGroupList
					.filter(f => f.FormatGroupName === itemGroupName);

			//사용할 매치 리스트에 넣는다.
			for (let nFindGroupIdx = 0; nFindGroupIdx < findFG.length; ++nFindGroupIdx)
			{
				arrMPI.push(...findFG[nFindGroupIdx].FormatItemList);
			}
			
		}//end for nGroupNameIdx


		//매치 데이터 리스트 기준으로 원본에서 대상을 찾는다.
		for (let nValIdx = 0
			; nValIdx < jsonValueTemp.length
			; ++nValIdx)
		{
			let itemValue: MatchReplaceValueInterface = jsonValueTemp[nValIdx];

			//검색할 대상을 정규식으로 만들기
			let sMatchPattern: string
				= this.Mark_FrontRegex + itemValue.sFindName + ":[a-zA-Z0-9]+" + this.Mark_BackRegex
				+ "|"
				+ this.Mark_FrontRegex + itemValue.sFindName + this.Mark_BackRegex;

			//정규식 개체 생성
			let regTarget: RegExp = new RegExp(sMatchPattern, "g");
			//원본에서 일치하는 대상 검색
			let arrTarget: RegExpMatchArray = mrReturn.ResultString.match(regTarget);
			//일치하는 대상의 이름과 패턴 부분 분리
			let arrTargetCut: RegTargetInterface[]
				= this.TargetCut(arrTarget);

			if (0 < arrTargetCut.length)
			{
				//매치가 있었다고 표시하고
				mrReturn.MatchIs = true;

				//일치하는 대상 기준으로 사용할 패턴을 찾는다.
				for (let nTargetCutIdx: number = 0
					; nTargetCutIdx < arrTargetCut.length
					; ++nTargetCutIdx)
				{
					let item: RegTargetInterface = arrTargetCut[nTargetCutIdx];

					//변환에 사용할 문자열
					let sReplaceString: string = "";

					if (null === item.Format
						|| undefined === arrTargetCut
						|| "" === item.Format)
					{//패턴값이 없다.

						//그대로 리플레이스 한다.
						sReplaceString = itemValue.sReplaceValue;
					}
					else
					{//패턴 값이 있다.

						//일치하는 패턴을 찾는다.
						let findFI: FormatItemInterface[]
							= arrMPI.filter(f => f.FormatName === item.Format);

						if (0 >= findFI.length)
						{//일치하는 패턴이 없다.

							//그대로 리플레이스 한다
							sReplaceString = itemValue.sReplaceValue;
						}
						else
						{//일치하는 패턴이 있다.

							//지정된 함수를 실행한다.
							sReplaceString
								= findFI[0].Func
									(sOriDataTemp
										, item.OriData
										, item.Name
										, itemValue.sReplaceValue
										, jsonValueTemp);
						}
					}

					//변환할 값으로 전체 리플레이스 한다.
					mrReturn.ResultString =
						this.ReplaceAll(
							mrReturn.ResultString
							, item.OriData
							, sReplaceString);

					
				}//end for nTargetCutIdx
			}
		}//end for nValIdx


		

		return mrReturn;
	}

	/**
	 * 정규식으로 일치하는 대상을 검색한 결과를 가지고 
	 * 처리하기 슆도록 'TargetCutInterface[]'로 변환한다.
	 * @param arrRegTarget
	 */
	private TargetCut(arrRegTarget: RegExpMatchArray): RegTargetInterface[]
	{
		let arrReturn: RegTargetInterface[] = [];

		//일치하는 대상 기준으로 일치하는 패턴을 찾는다.
		for (let nRegIdx: number = 0
			; nRegIdx < arrRegTarget.length
			; ++nRegIdx)
		{
			let item: string = arrRegTarget[nRegIdx];

			//배열에 추가할 개체
			let itemResult: RegTargetInterface = {
				OriData: item
				, Name: ""
				, Format: ""
			};

			//앞뒤 구분자를 제거한다.
			let sCut1
				= item.substring(0, item.length - this.Mark_BackOri.length)
					.substring(this.Mark_FrontOri.length);

			//이름과 사용할 패턴을 구분해준다.
			let nFindIdx: number = sCut1.indexOf(":");
			
			if (0 < nFindIdx)
			{
				itemResult.Name = sCut1.slice(0, nFindIdx);
				itemResult.Format = sCut1.slice(nFindIdx + 1);
			}
			else
			{
				//인덱스가 없으면 포맷이 없다는 의미다.
				itemResult.Name = sCut1.slice(0);
			}
			


			if (false === arrReturn.includes(itemResult))
			{//일치하는 값이 없다.

				//리턴할 배열에 추가
				arrReturn.push(itemResult);
			}
			
		}//end for nRegIdx


		return arrReturn;
	}


	/**
	 * 지정한 문자열을 모두 찾아 
	 * @param {string} sOriData 원본
	 * @param {string} sSearch 찾을 문자열
	 * @param {string} sReplacement 바꿀 문자열
	 * @returns {string} 완성된 결과
	 */
	public ReplaceAll = function (sOriData, sSearch, sReplacement)
	{
		return sOriData.replace(new RegExp(sSearch, 'g'), sReplacement);
	};
}

/** 정규식으로 찾아낸 대상의 데이터를 처리하기 쉽도록 가공한 리스트에 사용할 인터페이스 */
export interface RegTargetInterface 
{
	/** 원본 문자열 */
	OriData: string,

	/** 이름 부분 문자열 */
	Name: string,
	/** 패턴 부분 문자열 */
	Format: string,
}