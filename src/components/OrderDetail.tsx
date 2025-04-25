"use client";

import { OrderType } from "@/utils/helper";

const OrderDetail = ({ orderData }: { orderData: OrderType }) => {
  const order = orderData;

  const displayItems = [
    { label: "🎞️ KRTSK Book", value: order.krtBook, unit: "เล่ม" },
    { label: "🎞️ KHN Book", value: order.khnBook, unit: "เล่ม" },
    { label: "🎬 Premiere", value: order.premiere, unit: "เซ็ต" },
    { label: "📽️ KRTSK Box Office", value: order.krtBox, unit: "เซ็ต" },
    { label: "📽️ KHN Box Office", value: order.khnBox, unit: "เซ็ต" },
    { label: "🌟 Blockbuster", value: order.blockbuster, unit: "เซ็ต" },
    { label: "🍿 Additional order", value: order.additional, unit: "ชิ้น" },
    {
      label: "🪆 KRTSK Acrylic Standee",
      value: order.additionalKRTSK,
      unit: "ชิ้น",
    },
    {
      label: "🪆 KHN Acrylic Standee",
      value: order.additionalKHN,
      unit: "ชิ้น",
    },
    {
      label: "🪆 KRTSK & KHN Acrylic Standee",
      value: order.additionalKRTSKKHN,
      unit: "เซ็ต",
    },
  ];

  return (
    <div className="flex flex-col items-start lg:items-center gap-6 p-4 md:p-6 relative text-white border border-gray-800 shadow-[0_0_20px_rgba(107,114,128,0.8)] rounded-md">
      <h2 className="text-2xl font-bold text-gray-300">รายละเอียดคำสั่งซื้อ</h2>

      {displayItems
        .filter((item) => item.value > 0)
        .map((item, index) => (
          <div key={index} className="flex justify-between w-full max-w-md">
            <span>{item.label}:</span>
            <span className="font-semibold">
              {item.value} {item.unit}
            </span>
          </div>
        ))}

      <div className="flex justify-between w-full max-w-md">
        <span>📦 ประเภทการส่ง:</span>
        <span className="font-semibold">{order.postType}</span>
      </div>

      <div className="flex justify-between w-full max-w-md text-lg">
        <span>💰 ราคารวม:</span>
        <span className="font-bold text-green-400">
          {order.totalPrice.toLocaleString()} บาท
        </span>
      </div>
    </div>
  );
};

export default OrderDetail;
