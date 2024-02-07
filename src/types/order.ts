export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface IOrder {
	_id: string;
	ingredients: Array<string>;
	status: string;
	number: number;
	name: string;
  owner?: string;
  createdAt: string;
	updatedAt: string;
}

export interface IOrders {
  orders: Array<IOrder>;
	total: number;
	totalToday: number;
}

