import React, { type ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import type { NotificationType } from '../../types';

interface AlertProps {
  type: NotificationType;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, title, children, className = '' }) => {
  const typeStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="text-blue-600" size={20} />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="text-green-600" size={20} />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="text-yellow-600" size={20} />
    },
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle className="text-red-600" size={20} />
    }
  };

  const style = typeStyles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 ${className}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-1 ${style.text}`}>{title}</h4>
          )}
          <div className={style.text}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
