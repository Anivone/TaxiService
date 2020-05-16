export interface Order {
    orderId: number;
    wayOfOrder: string;
    operatorId: number;
    driverId: number;
    clientId: number;
    departurePoint: string;
    arrivalPoint: string;
    numberOfKm: number;
    approximatePrice: number;
    orderDate: string;
    appointedTime: string;
    typeOfCar: string;
    timeOfAcceptance: string;
    timeOfCompletion: string;
    typeOfPayment: string;
    finalPrice: number;
}
