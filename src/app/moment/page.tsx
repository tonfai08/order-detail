"use client";

import { useEffect, useState } from "react";
import FlyingCard from "@/components/FlyingMessage";
import { getFloatingMessages } from "@/services/messageService";

type MessageType = {
  name: string;
  detail: string;
};

export default function CardFlyingPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const fetchMessages = async () => {
    try {
      const data = await getFloatingMessages();
      setMessages(data);
    } catch (error) {
      console.error("โหลดข้อความล้มเหลว", error);
    }
  };

  useEffect(() => {
    // โหลดครั้งแรก
    fetchMessages();

    // โหลดใหม่ทุก 60 วินาที
    const interval = setInterval(() => {
      fetchMessages();
    }, 20000);

    return () => clearInterval(interval); // cleanup ตอน unmount
  }, []);

  return (
    <main className="relative min-h-screen bg-slate-900 overflow-hidden p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">🧚‍♀️ Micromoment Wall</h1>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {messages.map((msg, idx) => (
          <FlyingCard key={idx} name={msg.name} text={msg.detail} />
        ))}
      </div>
    </main>
  );
}
