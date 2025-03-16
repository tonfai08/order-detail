import { ReceiptText, Package, Truck, CheckCircle } from "lucide-react";
import { ReactNode } from "react";

export interface CustomerType {
  _id: string;
  twitter: string;
  __v: number;
  address: string;
  book1: number;
  book2: number;
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
export interface Step {
  label: string;
  detail: string;
  completed: boolean;
  icon: ReactNode;
}
export interface OrderType {
  book1: number;
  book2: number;
  set: string;
  postType: string;
  totalPrice: number;
}

export const mapCustomerToOrder = (customer: CustomerType): OrderType => {
  return {
    book1: customer.book1 ?? 0,
    book2: customer.book2 ?? 0,
    set: customer.setBook ?? "",
    postType: customer.typeShipping ?? "",
    totalPrice: customer.totalPrice ?? 0,
  };
};

export const getDefaultSteps = (): Step[] => [
  {
    label: "ตรวจสอบการชำระเงิน",
    detail: "ระบบกำลังตรวจสอบการชำระเงินของคุณ",
    completed: false,
    icon: <ReceiptText className="w-6 h-6" />,
  },
  {
    label: "Processing",
    detail: "คำสั่งซื้อของคุณกำลังถูกดำเนินการ",
    completed: false,
    icon: <Package className="w-6 h-6" />,
  },
  {
    label: "Shipped",
    detail: "คำสั่งซื้อของคุณถูกจัดส่งแล้ว",
    completed: false,
    icon: <Truck className="w-6 h-6" />,
  },
  {
    label: "Delivered",
    detail: "สินค้าของคุณถูกจัดส่งถึงแล้ว",
    completed: false,
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export const getOrderSteps = (orderData: any) => {
  const baseSteps = [
    {
      label: "ตรวจสอบการชำระเงิน",
      detail: "ระบบกำลังตรวจสอบการชำระเงินของคุณ",
      icon: <ReceiptText className="w-6 h-6" />,
      completed: false,
    },
    {
      label: "Processing",
      detail: "คำสั่งซื้อของคุณกำลังถูกดำเนินการ",
      icon: <Package className="w-6 h-6" />,
      completed: false,
    },
    {
      label: "Shipped",
      detail: "คำสั่งซื้อของคุณถูกจัดส่งแล้ว",
      icon: <Truck className="w-6 h-6" />,
      completed: false,
    },
    {
      label: "Delivered",
      detail: "สินค้าของคุณถูกจัดส่งถึงแล้ว",
      icon: <CheckCircle className="w-6 h-6" />,
      completed: false,
    },
  ];

  switch (orderData.status) {
    case "waiting-payment":
      return baseSteps.map((step) => ({ ...step, completed: false }));
    case "processing":
      return baseSteps.map((step, index) => ({
        ...step,
        completed: index === 0,
      }));
    case "shipped":
      return baseSteps.map((step, index) => ({
        ...step,
        completed: index < 2,
      }));
    case "shipped":
      if (orderData.postStatus === "success") {
        return baseSteps.map((step) => ({ ...step, completed: true }));
      }
      return baseSteps;
    default:
      return baseSteps;
  }
};
