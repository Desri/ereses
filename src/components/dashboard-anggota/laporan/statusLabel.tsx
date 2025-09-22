import React from 'react';

type StatusType = 'Pending' | 'Revisi' | 'Tolak' | 'Verifikasi';

interface StatusLabelProps {
  status: StatusType;
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Pending':
        return { label: 'Pending', color: '#d39c55' };
      case 'Revisi':
        return { label: 'Direvisi', color: '#d9aa6e' };
      case 'Tolak':
        return { label: 'Ditolak', color: '#d43535' };
      case 'Verifikasi':
        return { label: 'Diverifikasi', color: '#6aaa6d' };
      default:
        return { label: 'Tidak diketahui', color: '#999999' };
    }
  };

  const { label, color } = getStatusStyle();

  return (
    <span style={{ color }}>
      {label}
    </span>
  );
};

export default StatusLabel;
