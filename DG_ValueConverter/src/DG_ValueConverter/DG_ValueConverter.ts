
import { BoolConverter } from "./BoolConverter";
import { IntConverter } from "./IntConverter";


export default class DG_ValueConverter
{
	/** 불린 */
	public Bool: BoolConverter = new BoolConverter();

	/** 정수 */
	public Int: IntConverter = new IntConverter();
	
	constructor()
	{
			
	}


}