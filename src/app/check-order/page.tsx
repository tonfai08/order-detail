"use client";

import OrderDetail from "@/components/OrderDetail";
import Timeline from "@/components/Timeline";
import { useEffect, useState } from "react";
import { getCustomerByTwitter } from "@/services/customerService";
import { mapCustomerToOrder } from "@/utils/helper";

const CheckOderPage = () => {
  const [username, setUsername] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("กรุณากรอกชื่อผู้ใช้ Twitter");
      return;
    }
    try {
      setError("");
      const data = await getCustomerByTwitter(username);
      const orderData: any = mapCustomerToOrder(data);

      setOrderDetail(orderData);
      setCustomerData(data);
    } catch (err) {
      setError("ไม่พบข้อมูลลูกค้า");
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
      <div className="container  mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-500">
          Welcome to the Check Order Page
        </h1>
        <div className="flex flex-col bg-gray-900 border border-gray-950 shadow-xl shadow-gray-500/50 rounded-md my-4 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 ">
            <div>
              {" "}
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                className="px-4 py-2 border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-white"
                placeholder="Enter Twitter username"
              />
            </div>
            <div>
              <button
                className="border border-gray-700 rounded-md text-white font-bold bg-gray-500 py-2 px-9 transition-all duration-200 hover:bg-gray-600 active:bg-gray-700"
                onClick={handleSearch}
              >
                Enter
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 mt-2">{error}</p>}
          {customerData && (
            <div className="px-2 py-6 md:px-6 ">
              <OrderDetail orderData={orderDetail} />
            </div>
          )}

          <div className="px-2 py-10 md:px-6 ">
            {customerData && (
              <div>
                <h2 className="p-4 text-2xl font-bold text-gray-300">
                  สถานะคำสั่งซื้อ
                </h2>
                <Timeline customerData={customerData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOderPage;
