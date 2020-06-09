export interface ReceivedOrder {
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
    timeOfAcceptance: string;
    timeOfCompletion: string;
    typeOfPayment: string;
}
