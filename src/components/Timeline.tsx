"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, ReceiptText, Truck, Package } from "lucide-react";

const Timeline = ({
  direction: propDirection,
}: {
  direction?: "horizontal" | "vertical";
}) => {
  const [direction, setDirection] = useState(propDirection || "horizontal");

  useEffect(() => {
    if (!propDirection) {
      const handleResize = () => {
        if (window.innerWidth <= 1024) {
          setDirection("vertical");
        } else {
          setDirection("horizontal");
        }
      };

      handleResize(); // Set initial state
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [propDirection]);

  const steps = [
    {
      label: "ตรวจสอบการชำระเงิน",
      detail: "ระบบกำลังตรวจสอบการชำระเงินของคุณ",
      completed: true,
      icon: <ReceiptText className="w-6 h-6" />,
    },
    {
      label: "Processing",
      detail: "คำสั่งซื้อของคุณกำลังถูกดำเนินการ",
      completed: true,
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

  const currentStepIndex = steps.findIndex((step) => !step.completed);

  return direction === "vertical" ? (
    <div className="flex flex-col items-start lg:items-center gap-16 p-2 md:p-6 relative">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 relative w-auto md:w-70"
        >
          {index !== steps.length - 1 && (
            <div className="absolute left-4 top-14 w-1 h-8 bg-gray-300"></div>
          )}

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.completed
                ? "border-green-500 text-green-500"
                : "border-gray-400 text-gray-400"
            } ${index === currentStepIndex ? "animate-pulse" : ""}`}
          >
            {step.icon}
          </div>

          <div>
            <p
              className={`text-lg font-medium ${
                step.completed ? "text-green-500" : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            <p className="hidden md:flex text-sm text-gray-400">
              {step.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center space-x-8 p-6">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.completed
                ? "border-green-500 text-green-500"
                : "border-gray-400 text-gray-400"
            } ${index === currentStepIndex ? "animate-pulse" : ""}`}
          >
            {step.icon}
          </div>

          <p
            className={`text-lg font-medium mt-2 ${
              step.completed ? "text-green-500" : "text-gray-500"
            }`}
          >
            {step.label}
          </p>
          <p className="text-sm text-gray-400 text-center">{step.detail}</p>

          {index !== steps.length - 1 && (
            <div className="absolute top-2 left-full w-12 h-1 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
