import { ReceiptText, Package, Truck } from "lucide-react";
import { ReactNode } from "react";

export interface CustomerType {
  _id: string;
  twitter: string;
  __v: number;
  address: string;
  books: {
    krtBook: number;
    khnBook: number;
    premiere: number;
    krtBox: number;
    khnBox: number;
    blockbuster: number;
    additional: number;
  };
  createdAt: string;
  name: string;
  postId: string | null;
  postStatus: string | null;
  setBook: string;
  slip: string;
  status: string;
  tel: string;
  totalPrice: number;
  typeShipping: string;
}

export interface StepData {
  label: string;
  detail: string;
  completed: boolean;
  type: "receipt" | "package" | "truck";
}
export interface OrderType {
  krtBook: number;
  khnBook: number;
  premiere: number;
  krtBox: number;
  khnBox: number;
  blockbuster: number;
  additional: number;
  set: string;
  postType: string;
  totalPrice: number;
}

export const mapCustomerToOrder = (customer: CustomerType): OrderType => {
  return {
    krtBook: customer.books?.krtBook ?? 0,
    khnBook: customer.books?.khnBook ?? 0,
    premiere: customer.books?.premiere ?? 0,
    krtBox: customer.books?.krtBox ?? 0,
    khnBox: customer.books?.khnBox ?? 0,
    blockbuster: customer.books?.blockbuster ?? 0,
    additional: customer.books?.additional ?? "",
    set: customer.setBook ?? "",
    postType: customer.typeShipping ?? "",
    totalPrice: customer.totalPrice ?? 0,
  };
};

export const getOrderSteps = (customerData: CustomerType): StepData[] => {
  return [
    {
      label: "Payment verified",
      detail:
        customerData.status !== "waiting-payment"
          ? "ตรวจสอบการชำระเงินของคุณแล้ว"
          : "ระบบกำลังตรวจสอบการชำระเงินของคุณ",
      type: "receipt",
      completed: customerData.status !== "waiting-payment",
    },
    {
      label: customerData.status === "shipped" ? "Processed" : "Processing",
      detail:
        customerData.status === "shipped"
          ? "คำสั่งซื้อของคุณถูกดำเนินการแล้ว"
          : "คำสั่งซื้อของคุณกำลังถูกดำเนินการ",
      type: "package",
      completed: customerData.status === "shipped",
    },
    {
      label: "Shipped",
      detail: customerData.postId || "คำสั่งซื้อของคุณถูกจัดส่งแล้ว",
      type: "truck",
      completed: customerData.status === "shipped",
    },
  ];
};
