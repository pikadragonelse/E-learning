export interface BillInfo {
    createdAt: string;
    deletedAt: string;
    id: number;
    isPayment: boolean;
    orderInfor: string;
    paymentMethod: string;
    price: number;
    status: string;
    transactionId: string;
    updatedAt: string;
    userId: number;
    paymentsDetails: Array<{
        courseId: number;
        createdAt: string;
        deletedAt: string;
        discount: number;
        id: string;
        isPaidToInstructor: boolean;
        paymentId: number;
        price: number;
        updatedAt: string;
    }>;
}

export const defaultBillInfo: BillInfo = {
    createdAt: "",
    deletedAt: "",
    id: 0,
    isPayment: false,
    orderInfor: "",
    paymentMethod: "",
    price: 0,
    status: "",
    transactionId: "",
    updatedAt: "",
    userId: 0,
    paymentsDetails: [
        {
            courseId: 0,
            createdAt: "",
            deletedAt: "",
            discount: 0,
            id: "",
            isPaidToInstructor: false,
            paymentId: 0,
            price: 0,
            updatedAt: "",
        },
    ],
};
