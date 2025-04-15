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

export interface Step {
  label: string;
  detail: ReactNode;
  completed: boolean;
  icon: ReactNode;
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

export const getDefaultSteps = (): Step[] => [
  {
    label: "Payment verify",
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
];

export const getOrderSteps = (customerData: CustomerType) => {
  const baseSteps = [
    {
      label: "Payment verified",
      detail:
        customerData.status !== "waiting-payment"
          ? "ตรวจสอบการชำระเงินของคุณแล้ว"
          : "ระบบกำลังตรวจสอบการชำระเงินของคุณ",
      icon: <ReceiptText className="w-6 h-6" />,
      completed: false,
    },
    {
      label: customerData.status === "shipped" ? "Processed" : "Processing",
      detail:
        customerData.status === "shipped"
          ? "คำสั่งซื้อของคุณถูกดำเนินการแล้ว"
          : "คำสั่งซื้อของคุณกำลังถูกดำเนินการ",
      icon: <Package className="w-6 h-6" />,
      completed: false,
    },
    {
      label: "Shipped",
      detail: customerData.postId ? (
        <a
          href={`https://track.thailandpost.co.th/?trackNumber=${customerData.postId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {customerData.postId}
        </a>
      ) : (
        "คำสั่งซื้อของคุณถูกจัดส่งแล้ว"
      ),
      icon: <Truck className="w-6 h-6" />,
      completed: false,
    },
  ];

  switch (customerData.status) {
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
        completed: index <= 2,
      }));
    default:
      return baseSteps;
  }
};
