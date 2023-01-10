

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


		this.TextReplace.FormatGroupFavoritesAdd("Two", ["defult", "Custom"]);
		this.TextReplace.FormatGroupFavoritesAdd(1, ["Custom"]);

		let oriData: string = "test001 => {{test0011}}, \n"
			+ "test001:test1 => {{test001:test1}}\n"
		    + "test001 => {{test001}} \n"
			+ "test002:money => {{test002:money}}\n"
			+ "test002:test2 => {{test002:test2}}\n"
			+ "test003:test2 => {{test003:test2}}\n"
			+ "test004:test2 => {{test004}}\n";

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

		let aaa
			= {
			test003: "test-03"
			, test004: "test-04"
		};

		
		let result: MatchResultInterface
			= this.TextReplace.PatternBind(
				oriData
				, ["defult"]
				, arrMatchData);
		console.log("result : ");
		console.log(result);


		let result2: MatchResultInterface
			= this.TextReplace.PatternBind_Favorites(
				oriData
				, ["Two", "Two", 1]
				, arrMatchData);
		console.log("result2 : ");
		console.log(result2);

		let result3: MatchResultInterface
			= this.TextReplace.PatternBind(
				oriData
				, arrMatchData);
		console.log("result3 : ");
		console.log(result3);

		
		let result4: MatchResultInterface
			= this.TextReplace.PatternBind(
				oriData
				, aaa);
		console.log("result4 : ");
		console.log(result4);







		//let doc = document.querySelector("#txtResult");
		//doc.innerHTML = result.ResultString;
	}

	TestCilck = () =>
	{
		
		
	};

	TestCilck2 = () =>
	{
	};

}


const app = new StartUp();
