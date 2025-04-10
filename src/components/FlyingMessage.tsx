"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type Props = {
  name: string;
  text: string;
};

const EDGE_PADDING = 100;

export default function FlyingCard({ name, text }: Props) {
  const controls = useAnimation();

  const getRandomEdgePosition = (): { x: number; y: number } => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const edges = ["top", "bottom", "left", "right"];
    const edge = edges[Math.floor(Math.random() * edges.length)];

    if (edge === "top") {
      return {
        x: Math.random() * (screenW - EDGE_PADDING * 2) + EDGE_PADDING,
        y: EDGE_PADDING,
      };
    } else if (edge === "bottom") {
      return {
        x: Math.random() * (screenW - EDGE_PADDING * 2) + EDGE_PADDING,
        y: screenH - EDGE_PADDING,
      };
    } else if (edge === "left") {
      return {
        x: EDGE_PADDING,
        y: Math.random() * (screenH - EDGE_PADDING * 2) + EDGE_PADDING,
      };
    } else {
      // "right"
      return {
        x: screenW - EDGE_PADDING,
        y: Math.random() * (screenH - EDGE_PADDING * 2) + EDGE_PADDING,
      };
    }
  };

  const moveToNext = async () => {
    const nextPos = getRandomEdgePosition();
    await controls.start({
      x: nextPos.x,
      y: nextPos.y,
      transition: {
        duration: 10 + Math.random() * 2, // 🎯 ช้าลง
        ease: "easeInOut",
      },
    });
    moveToNext(); // วนต่อ
  };

  useEffect(() => {
    const startPos = getRandomEdgePosition();
    controls.set({ x: startPos.x, y: startPos.y });
    moveToNext();
  }, []);

  return (
    <motion.div
      animate={controls}
      className="absolute bg-white text-black rounded-2xl shadow-xl flex items-center gap-5 p-5 max-w-lg border border-gray-400"
      style={{ pointerEvents: "none" }}
    >
      <img
        src={`/profile/${name}.jpg`}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border border-gray-500"
      />
      <div>
        <p className="font-bold capitalize text-xl">{name}</p>
        <p className="text-lg text-gray-700">{text}</p>
      </div>
    </motion.div>
  );
}
