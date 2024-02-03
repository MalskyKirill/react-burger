export interface IOrder {
	_id: string;
	ingredients: Array<string>;
	status: string;
	number: number;
	name: string;
  owner: string;
  createdAt: string;
	updatedAt: string;
}

export interface IOrders {
  success: boolean;
  orders: Array<IOrder>;
	total: number;
	totalToday: number;
}
