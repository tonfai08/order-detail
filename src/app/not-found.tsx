"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <h1 className="text-4xl font-bold mb-4">404 - ไม่พบหน้านี้</h1>
      <p className="text-lg text-gray-400 mb-6">
        เส้นทางที่คุณเข้ามาไม่มีอยู่ในระบบ
      </p>
      <Link
        href="/check-order"
        className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-md transition"
      >
        🔍 กลับไปหน้าตรวจสอบคำสั่งซื้อ
      </Link>
    </main>
  );
}
