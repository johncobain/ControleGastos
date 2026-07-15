import type { PropsWithChildren } from "react";
import "./styles.css";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  footer?: React.ReactNode;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  title,
  footer,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="modal-header"
        >
          {title && <h2>{title}</h2>}
          <button 
            className="modal-close-button" 
            onClick={onClose}
          > 
            x 
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;