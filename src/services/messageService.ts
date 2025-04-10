import axios from "axios";

const API_URL = "https://haikyu-be.vercel.app/api/floating";

// POST: ส่งข้อความใหม่
export const sendFloatingMessage = async (name: string, detail: string) => {
  try {
    const response = await axios.post(API_URL, { name, detail });
    return response.data;
  } catch (error) {
    console.error("❌ Error sending message:", error);
    throw new Error("Failed to send message");
  }
};

export const getFloatingMessages = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('response',response);
    
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching floating messages:", error);
    throw new Error("Failed to fetch messages");
  }
};
