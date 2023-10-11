

import DG_Pagination, { DG_Pagination_OptionModel } from "./DG_Pagination";


export default class StartUp
{
	//테스트 div
	divTest: HTMLDivElement = null;

	dgPagination: DG_Pagination = null;



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
		let option: DG_Pagination_OptionModel = {
			PageButtonAddCount: 3
			, MoveUrlCreateFunc: (nPageNumber: number) =>
			{
				return "#?pn=" + nPageNumber;
			}
		}
		this.dgPagination = new DG_Pagination(option);

		//테스트 div 찾기
		this.divTest = document.getElementById("divTest") as HTMLDivElement;
		this.divTest.classList.add("dg-page");

		this.divTest.innerHTML = "";
		this.divTest.appendChild(this.dgPagination.UlDom);
		this.dgPagination.Rebind(2, 10);
	}


}


const app = new StartUp();
