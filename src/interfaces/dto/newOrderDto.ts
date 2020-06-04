export interface NewOrderDto {
  wayOfOrder: string;
  clientId: number;
  departurePoint: string;
  arrivalPoint: string;
  numberOfKm: number;
  orderDate: string;
  appointedTime: string;
  typeOfCar: string;
  typeOfPayment: string;
  approximatePrice: number;
}
