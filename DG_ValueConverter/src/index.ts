

import DG_ValueConverter from "./DG_ValueConverter/DG_ValueConverter";



export default class StartUp
{
	private ValConv: DG_ValueConverter = new DG_ValueConverter();
	
	constructor()
	{
		document.getElementById("btnClick").onclick = this.TestCilck;
		document.getElementById("btnClick2").onclick = this.TestCilck2;

		let sInt1 = "12";
		let sInt2 = "12.345";
		let sInt3 = "1aabbc";

		let nDefultValue: number = 404;

		console.log("Int.Is(sInt1)  : " + this.ValConv.Int.Is(sInt1));
		console.log("Int.Is(sInt2) : " + this.ValConv.Int.Is(sInt2));
		console.log("Int.Is(sInt3) : " + this.ValConv.Int.Is(sInt3));
		console.log(" ");
		console.log("Int.Parse(sInt1) : " + this.ValConv.Int.Parse(sInt1));
		console.log("Int.Parse(sInt2, nDefultValue) : " + this.ValConv.Int.Parse(sInt2, nDefultValue));
		console.log("Int.Parse(sInt3, nDefultValue) : " + this.ValConv.Int.Parse(sInt3, nDefultValue));

		let TryParseResult = { "result": 0 };
		let TryParse = this.ValConv.Int.TryParse(sInt1, TryParseResult);
		console.log("Int.TryParse(sInt1, TryParseResult) : " + TryParse + ", " + TryParseResult.result);
	}

	TestCilck = () =>
	{
		
		
	};

	TestCilck2 = () =>
	{
	};

}


const app = new StartUp();
