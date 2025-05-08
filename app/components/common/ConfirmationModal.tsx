import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import CrossIcon from 'public/icons/CrossIcon';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  showButtons?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  showButtons = true,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 border border-gray-300 text-center relative"
        >
          <div onClick={onClose} className="absolute top-2 right-2 text-gray-500 cursor-pointer">
            <CrossIcon />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          {showButtons && (
            <div className="flex justify-center gap-4">
              <Button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer w-30"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark cursor-pointer w-30"
              >
                Delete
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
