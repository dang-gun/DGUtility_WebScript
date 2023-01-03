
export class IntConverter
{
	/** 기본값으로 쓸 데이터 - 원본 */
	private DefultValueOri: number = 0;

	/** 기본값으로 쓸 데이터 */
	public get DefultValue()
	{
		return this.DefultValueOri;
	}
	/** 기본값으로 쓸 데이터 */
	public set DefultValue(nValue: number)
	{
		this.DefultValueOri = nValue;
	}


	constructor()
	{
	}

	/**
	 * 들어온 오브젝트가 숫자값인지 판단
	 * @param sValue 판단할 오브젝트
	 * @returns 숫자인지 여부
	 */
	public Is(sValue: string | object): boolean
	{
		let bReturn = false;
		
		if (false === isNaN(Number(sValue)))
		{
			bReturn = true;
		}

		return bReturn;
	}

	/**
	 * 지정된 값을 숫자로 변환한다.
	 * 숫자로 변환할 수 없으면 설정된 기본값을 리턴한다.
	 * @param sValue
	 * @returns 변환된 정수값
	 */
	public Parse(sValue: string): number;
	/**
	 * 지정된 값을 숫자로 변환한다.
	 * 숫자로 변환할 수 없으면 지정한 값을 기본값으로 리턴한다.
	 * @param sValue
	 * @param nDefultValue
	 * @returns 변환된 정수값
	 */
	public Parse(sValue: string, nDefultValue: number): number;
	/**
	 * 지정된 값을 숫자로 변환한다.
	 * 숫자로 변환할 수 없으면
	 *  - 지정한 값을 기본값으로 리턴한다.
	 *  - 지정한 값이 없으면 설정된 기본값을 리턴한다.
	 * @param sValue
	 * @returns 변환된 정수값
	 */
	public Parse(sValue: string, nDefultValue?: number): number
	{
		//이 함수에서 사용할 기본값
		let nDefultValueTemp = nDefultValue;
		if (undefined === nDefultValueTemp)
		{//전달받은 기본값이 없으면 클래스에 저장된 값을 사용한다.
			nDefultValueTemp = this.DefultValue;
		}

		return this.ParseOri(sValue, nDefultValueTemp);
	}

	/**
	 * 지정된 값을 숫자로 변환한다.
	 * 숫자로 변환할 수 없으면 지정한 값을 기본값으로 리턴한다.
	 * @param sValue
	 * @param nDefultValue
	 * @returns 변환된 정수값
	 */
	private ParseOri(
		sValue: string
		, nDefultValue: number)
		: number
	{
		let nReturn = 0;

		if (true === this.Is(sValue))
		{
			//parseInt는 자동으로 소수점을 잘라버린다.
			nReturn = parseInt(sValue);
		}
		else
		{//숫자가 아니다.

			//설정된 기본값 리턴
			nReturn = nDefultValue;
		}

		return nReturn;
	}

	/**
	 * 들어온 오브젝트가 정수로 변환 가능한 값인지 여부 판단하고 
	 * 결과물을 'refResult.result'에 전달한다.
	 * @param sValue
	 * @param refResult refResult.result: 판단된 결과, 'Parse'와 동일
	 * @returns {boolean} 정수로 변환가능한지 여부. 'Is'와 동일
	 */
	public TryParse(
		sValue: string
		, refResult: TryParseInt)
		: boolean
	{
		let bReturn: boolean = this.Is(sValue);

		//변환 결과 입력
		refResult.result = this.Parse(sValue);

		return bReturn;
	}
	
}

/** 
 *  IntConverter.TryParse 결과
 *  자바스크립트는 ref가 없어서 이렇게 전달해야 한다.
 * */
export interface TryParseInt
{
	/** 변환된 정수 */
	result: number
}