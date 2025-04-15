"use client";

import OrderDetail from "@/components/OrderDetail";
import Timeline from "@/components/Timeline";
import { useEffect, useState } from "react";
import { getCustomerByTwitter } from "@/services/customerService";
import { CustomerType, mapCustomerToOrder, OrderType } from "@/utils/helper";
import Image from "next/image";
import dynamic from "next/dynamic";
import loadingAnim from "@/lottie/loading.json";

const CheckOderPage = () => {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  const [username, setUsername] = useState("");
  const [customerData, setCustomerData] = useState<CustomerType | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderType | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้ Twitter");
      return;
    }
    try {
      setError("");
      setLoading(true); // เริ่มโหลด

      const data: CustomerType = await getCustomerByTwitter(username);
      const orderData: OrderType = mapCustomerToOrder(data);

      setOrderDetail(orderData);
      setCustomerData(data);
    } catch (err) {
      setError("ไม่พบข้อมูลลูกค้า");
      console.error(err);
    } finally {
      // ✅ หน่วง 0.5 วินาทีค่อยปิดโหลด
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setError("");
    setCustomerData(null);
    setOrderDetail(null);
  }, [username]);

  return (
    <main className="min-h-screen bg-gray-950">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-500 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <Lottie animationData={loadingAnim} loop className="w-100 h-100" />
      </div>
      <div className="container mx-auto p-6 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/profile/logo.png"
            alt="Logo"
            width={400}
            height={400}
            priority
            className="object-contain md:w-96"
          />
        </div>

        <div className="flex flex-col bg-gray-900 border border-gray-950 shadow-xl shadow-gray-500/30 rounded-md my-4 p-4 md:p-8">
          <h1 className="pb-8 text-2xl font-bold text-gray-300">
            ตรวจสอบข้อมูล <br className="block sm:hidden" />
            Pre-order
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-4 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-white"
              placeholder="twitter account (e.g. @krtskandkhn_th)"
            />
            <button
              className="border border-gray-700 rounded-md text-white font-bold bg-gray-500 py-2 px-9 transition-all duration-200 hover:bg-gray-600 active:bg-gray-700"
              onClick={handleSearch}
            >
              Enter
            </button>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}
          <>
            {customerData && orderDetail && (
              <div className="px-2 py-8 md:px-6">
                <OrderDetail orderData={orderDetail} />
              </div>
            )}
            {customerData && (
              <div className="px-2 py-10 md:px-6">
                <h2 className="p-4 text-2xl font-bold text-gray-300">
                  สถานะคำสั่งซื้อ
                </h2>
                <Timeline customerData={customerData} />
              </div>
            )}
          </>
        </div>
      </div>
      <div className="bg-gray-700 w-full text-white flex justify-center p-2 my-7 text-xs text-center  ">
        อัปเดตข้อมูลภายใน 48 ชั่วโมง
        <br className="block sm:hidden" /> หากพบปัญหา สามารถติดต่อได้ที่ dm
        @krtskandkhn_th
      </div>
    </main>
  );
};

export default CheckOderPage;
