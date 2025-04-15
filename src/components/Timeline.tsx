"use client";

import { useState, useEffect } from "react";
import { CustomerType, getOrderSteps, StepData } from "@/utils/helper";
import { ReceiptText, Package, Truck } from "lucide-react";
const Timeline = ({
  customerData,
  direction: propDirection,
}: {
  direction?: "horizontal" | "vertical";
  customerData: CustomerType;
}) => {
  const [direction, setDirection] = useState(propDirection || "horizontal");
  const [stepOrder, setStepOrder] = useState<StepData[]>([]);

  const iconMap = {
    receipt: <ReceiptText className="w-6 h-6" />,
    package: <Package className="w-6 h-6" />,
    truck: <Truck className="w-6 h-6" />,
  };

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
  useEffect(() => {
    if (customerData) {
      setStepOrder(getOrderSteps(customerData));
    }
  }, [customerData]);
  const currentStepIndex = stepOrder.findIndex((step) => !step.completed);

  return direction === "vertical" ? (
    <div className="flex flex-col items-start lg:items-center gap-16 p-2 md:p-6 relative">
      {stepOrder.map((step, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 relative w-auto md:w-70"
        >
          {index !== stepOrder.length - 1 && (
            <div className="absolute left-4 top-14 w-1 h-8 bg-gray-300"></div>
          )}

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.completed
                ? "border-green-500 text-green-500"
                : "border-gray-400 text-gray-400"
            } ${index === currentStepIndex ? "animate-pulse" : ""}`}
          >
            {iconMap[step.type]}
          </div>

          <div>
            <p
              className={`justify-start md:justify-center flex text-lg font-medium ${
                step.completed ? "text-green-500" : "text-gray-500"
              }`}
            >
              {step.label}
            </p>
            {step.label === "Shipped" && customerData.postId ? (
              <div className="text-xs md:text-sm text-center">
                <a
                  href={`https://track.thailandpost.co.th/?trackNumber=${customerData.postId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {customerData.postId}
                </a>
              </div>
            ) : (
              <div className="text-xs md:text-sm text-gray-400 text-center">
                {step.detail}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center space-x-8 p-6">
      {stepOrder.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center relative flex-1 max-w-[220px]"
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step.completed
                ? "border-green-500 text-green-500"
                : "border-gray-400 text-gray-400"
            } ${index === currentStepIndex ? "animate-pulse" : ""}`}
          >
            {iconMap[step.type]}
          </div>

          <p
            className={`text-lg font-medium mt-2 ${
              step.completed ? "text-green-500" : "text-gray-500"
            }`}
          >
            {step.label}
          </p>
          {step.label === "Shipped" && customerData.postId ? (
            <div className="text-xs md:text-sm text-center">
              <a
                href={`https://track.thailandpost.co.th/?trackNumber=${customerData.postId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {customerData.postId}
              </a>
            </div>
          ) : (
            <div className="text-xs md:text-sm text-gray-400 text-center">
              {step.detail}
            </div>
          )}

          {index !== stepOrder.length - 1 && (
            <div className="absolute top-2 left-full w-12 h-1 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
