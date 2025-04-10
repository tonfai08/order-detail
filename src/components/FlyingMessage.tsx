"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type Props = {
  name: string;
  text: string;
};

export default function FlyingCard({ name, text }: Props) {
  const controls = useAnimation();

  const padding = 100;
  const maxX = window.innerWidth - padding;
  const maxY = window.innerHeight - padding;

  const startX = Math.random() * maxX;
  const startY = Math.random() * maxY;

  const offsetX = Math.random() * 120 - 60;
  const offsetY = Math.random() * 120 - 60;

  useEffect(() => {
    controls.start({
      x: startX + offsetX,
      y: startY + offsetY,
      transition: {
        duration: 2 + Math.random() * 1.2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, []);

  return (
    <motion.div
      initial={{ x: startX, y: startY }}
      animate={controls}
      className="absolute bg-white text-black rounded-xl shadow-lg flex items-center gap-3 p-3 max-w-sm border border-gray-300"
      style={{ pointerEvents: "none" }}
    >
      <img
        src={`/profile/${name}.jpg`}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border border-gray-400"
      />
      <div>
        <p className="font-semibold capitalize">{name}</p>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </motion.div>
  );
}
