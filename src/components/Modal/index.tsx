import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen' | 'auto';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'medium',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <Image
            src="/assets/images/icons/cancel-circle.svg"
            alt="close icon"
            width={30}
            height={30}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
