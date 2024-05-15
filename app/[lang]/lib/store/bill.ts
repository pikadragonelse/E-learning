import { create } from "zustand";
import { BillInfo, defaultBillInfo } from "../model/bill";

type BillStore = {
    billData: BillInfo;
    updateBillData: any;
};

export const useBillStore = create<BillStore>((set) => ({
    billData: defaultBillInfo,
    updateBillData: (newBillData: BillInfo) => set({ billData: newBillData }),
}));
