import { motion } from "framer-motion";

function StatCard({ title, value, color, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-7
      shadow-2xl
      relative
      overflow-hidden
      "
    >

      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="flex items-center justify-between relative z-10">

        <div>

          <h2 className="text-slate-400 text-lg">
            {title}
          </h2>

          <p className={`text-5xl font-bold mt-4 ${color}`}>
            {value}
          </p>

        </div>

        <div className="text-indigo-400">
          {icon}
        </div>

      </div>

    </motion.div>
  );
}

export default StatCard;