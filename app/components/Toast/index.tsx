import { useEffect, useState } from 'react';
import './styles.css';
import Image from 'next/image';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  duration: number;
  type: ToastType;
  onClose: () => void;
  testing?: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, duration, type, onClose, testing = false }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (testing) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(() => onClose(), 500);
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose, testing]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 500);
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return { icon: '/success.svg', className: 'toast-success' };
      case 'error':
        return { icon: '/warning.svg', className: 'toast-error' };
      case 'info':
        return { icon: '/info.svg', className: 'toast-info' };
      case 'warning':
        return { icon: '/warning-1.svg', className: 'toast-warning' };
      default:
        return { icon: '/info.svg', className: 'toast-info' };
    }
  };

  const { icon, className } = getToastStyles();

  return (
    <div className={`toast ${isExiting ? 'slide-out' : 'slide-in'} ${className}`}>
      <Image height={24} width={24} src={icon} alt={`${type} icon`} className="toast-icon" />
      <p className='text-base'>{message}</p>
      <button className="close-btn" onClick={handleClose}>
        <Image src={'/cross.svg'} height={16} width={16} alt='close' />
      </button>
      <div className="progress-bar-container">
        <div
          className={`progress-bar ${className}`}
          style={{ width: testing ? '100%' : `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
