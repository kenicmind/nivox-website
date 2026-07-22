import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

const colors = {
  success: {
    bg: "bg-green-100",
    border: "border-green-500",
    text: "text-green-700",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-100",
    border: "border-red-500",
    text: "text-red-700",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-blue-100",
    border: "border-blue-500",
    text: "text-blue-700",
    icon: Info,
  },
};

const StatusMessage = ({ type = "info", message }) => {
  const style = colors[type];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${style.bg} ${style.border} ${style.text} mt-5 flex items-center gap-3 rounded-xl border p-4`}
    >
      <Icon size={22} />
      <p className="font-medium">{message}</p>
    </motion.div>
  );
};

export default StatusMessage;