"use client";

const OrderDetail = () => {
  const order = {
    book1: 1,
    book2: 1,
    set: "Premium",
    postType: "EMS",
    totalPrice: "1100",
  };

  return (
    <div className="flex flex-col items-start lg:items-center gap-6 p-4 md:p-6 relative text-white border border-gray-800 shadow-[0_0_20px_rgba(107,114,128,0.8)] rounded-md">
      <h2 className="text-2xl font-bold text-gray-300">รายละเอียดคำสั่งซื้อ</h2>

      <div className="flex justify-between w-full max-w-md">
        <span>📖 หนังสือเล่ม 1:</span>
        <span className="font-semibold">{order.book1} เล่ม</span>
      </div>

      <div className="flex justify-between w-full max-w-md">
        <span>📖 หนังสือเล่ม 2:</span>
        <span className="font-semibold">{order.book2} เล่ม</span>
      </div>

      <div className="flex justify-between w-full max-w-md">
        <span>🎁 Set ที่เลือก:</span>
        <span className="font-semibold">{order.set}</span>
      </div>

      <div className="flex justify-between w-full max-w-md">
        <span>📦 ประเภทการส่ง:</span>
        <span className="font-semibold">{order.postType}</span>
      </div>

      <div className="flex justify-between w-full max-w-md text-lg">
        <span>💰 ราคารวม:</span>
        <span className="font-bold text-green-400">{order.totalPrice} บาท</span>
      </div>
    </div>
  );
};

export default OrderDetail;
