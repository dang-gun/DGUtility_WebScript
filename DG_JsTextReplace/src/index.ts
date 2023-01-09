

import DG_JsTextReplace, { MatchResultInterface } from "./DG_JsTextReplace/DG_JsTextReplace";



export default class StartUp
{
	private TextReplace: DG_JsTextReplace = new DG_JsTextReplace();
	
	constructor()
	{
		document.getElementById("btnClick").onclick = this.TestCilck;
		document.getElementById("btnClick2").onclick = this.TestCilck2;

		let objTR = this.TextReplace;
		this.TextReplace.FormatGroupAdd("defult"
			, [
				{
					FormatName: "test2"
					, Func: function (sOriData, sMatchString, sValue, jsonValue) 
					{
						return objTR.ReplaceAll("abbbsssee : {{test002:test2}}", sMatchString, sValue);
					}
				}
			]);

		this.TextReplace.FormatGroupAdd(
			"Custom"
			, [
				{
					FormatName: "money"
					, Func: function (sOriData, sMatchString, sName, sValue, jsonValue)
					{
						return "\\" + sValue;
					}
				}
			]);

		let oriData: string = "test001 => {{test0011}}, \n"
			+ "test001:test1 => {{test001:test1}}\n"
		    + "test001 => {{test001}} \n"
			+ "test002:money => {{test002:money}}\n"
			+ "test002:test2 => {{test002:test2}}\n";

		let arrMatchData =
			[
				{
					sFindName: "test001"
					, sReplaceValue: "test-001"
				},
				{
					sFindName: "test002"
					, sReplaceValue: "test-002"
				},
			];

		
		let result: MatchResultInterface
			= this.TextReplace.PatternBind(
				oriData
				, ["defult", "Custom"]
				, arrMatchData);


		console.log(result);
		let doc = document.querySelector("#txtResult");
		doc.innerHTML = result.ResultString;
	}

	TestCilck = () =>
	{
		
		
	};

	TestCilck2 = () =>
	{
	};

}


const app = new StartUp();
