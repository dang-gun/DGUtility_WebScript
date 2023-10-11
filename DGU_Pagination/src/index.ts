

import DGU_Pagination, { DGU_Pagination_OptionModel } from "./DGU_Pagination";


export default class StartUp
{
	//테스트 div
	divTest: HTMLDivElement = null;

	dgPagination: DGU_Pagination = null;



	constructor()
	{
		//적용 버튼
		let btnApply: HTMLButtonElement
			= document.getElementById("btnApply") as HTMLButtonElement;
		btnApply.onclick = () =>
		{
			let txtTotalPageCount: HTMLInputElement
				= document.getElementById("txtTotalPageCount") as HTMLInputElement;
			let txtPageNow: HTMLInputElement
				= document.getElementById("txtPageNow") as HTMLInputElement;

			this.dgPagination.Rebind(
				Number(txtPageNow.value)
				, Number(txtTotalPageCount.value));
		};


		//전달할 옵션
		let option: DGU_Pagination_OptionModel = new DGU_Pagination_OptionModel();
		option.PageButtonAddCount = 3;
		option.MoveUrlCreateFunc = (nPageNumber: number) =>
		{
			return "#?pn=" + nPageNumber;
		};

		option.VoidHref_AttrAdd.push("VoidHrefTest");
		option.VoidHref_AttrAdd.push("VoidHrefTest2");


		this.dgPagination = new DGU_Pagination(option);

		//테스트 div 찾기
		this.divTest = document.getElementById("divTest") as HTMLDivElement;
		this.divTest.classList.add("dg-page");

		this.divTest.innerHTML = "";
		this.divTest.appendChild(this.dgPagination.UlDom);
		this.dgPagination.Rebind(2, 10);
	}


}


const app = new StartUp();
