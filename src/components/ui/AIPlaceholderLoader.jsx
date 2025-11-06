"use client";

import { motion } from "framer-motion";

export default function CustomLoader({ text = "Analyzing data..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-muted rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <p className="text-gray-500 text-sm font-medium">{text}</p>
    </div>
  );
}
