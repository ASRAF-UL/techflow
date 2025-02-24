import { motion } from "framer-motion";
import { X } from "lucide-react";

const LeftSideModal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-semi-transparent"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed left-0 top-0 h-full bg-white shadow-lg p-10"
      >
        <button
          className="absolute top-2 left-2 p-2 flex items-center gap-2"
          onClick={onClose}
        >
          <X size={18} />
          <span>Close</span>
        </button>
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
};

export default LeftSideModal;
