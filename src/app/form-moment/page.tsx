"use client";

import { useState } from "react";
import { sendFloatingMessage } from "@/services/messageService";

const names = ["pum", "film", "mint", "ton", "aom", "pond"];

export default function MomentFormPage() {
  const [name, setName] = useState(names[0]);
  const [detail, setDetail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!detail.trim()) {
      setMessage("⚠️ กรุณากรอกข้อความ");
      return;
    }
    try {
      await sendFloatingMessage(name, detail);
      setMessage("✅ ส่งสำเร็จแล้ว!");
      setDetail("");
    } catch (err) {
      console.error(err);
      setMessage("❌ เกิดข้อผิดพลาดในการส่ง");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <div className="bg-gray-900 p-6 rounded-xl max-w-xl mx-auto shadow-lg space-y-4">
        <h1 className="text-3xl font-bold mb-6">📝 ความดี</h1>
        <label className="block">
          <span className="text-gray-300">เลือกชื่อผู้ส่ง:</span>
          <select
            className="mt-1 p-2 w-full bg-gray-800 text-white rounded-md border border-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {names.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-300">ข้อความ:</span>
          <textarea
            className="mt-1 p-2 w-full bg-gray-800 text-white rounded-md border border-gray-600"
            rows={4}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="พิมพ์ข้อความที่จะลอย..."
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-6 rounded transition-all"
        >
          ส่งข้อความ
        </button>

        {message && (
          <p className="text-center text-sm mt-2 text-amber-300">{message}</p>
        )}
      </div>
    </main>
  );
}
