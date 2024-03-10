// 404Page.tsx
import React from "react";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-100 text-gray-800"
    >
      <motion.h1
        className="text-6xl font-bold"
        initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ type: "spring", stiffness: 150 }}
      >
        404.
      </motion.h1>
      <div className="flex flex-col items-center gap-1">
        <motion.p
          className="text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Halaman yang Anda cari tidak ditemukan.
        </motion.p>
        <motion.p
          className="text-base font-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Mohon cek kembali URL yang Anda masukkan.
        </motion.p>
      </div>
      <motion.a
        href="/"
        className="mt-2 text-lg text-blue-500 hover:animate-pulse"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Balik ke beranda
      </motion.a>
    </motion.div>
  );
};

export default NotFound;
