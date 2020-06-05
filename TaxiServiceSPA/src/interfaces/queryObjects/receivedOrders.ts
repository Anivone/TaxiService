export interface ReceivedOrders {
    orderId: number;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    departurePoint: string;
    arrivalPoint: string;
    numberOfKm: number;
    approximatePrice: number;
    appointedTime: string;
    typeOfPayment: string;
}
