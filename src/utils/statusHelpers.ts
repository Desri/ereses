export type StatusType = 'Pending' | 'Revisi' | 'Tolak' | 'Verifikasi';

export const isValidStatus = (status: string): status is StatusType => {
  return ['Pending', 'Revisi', 'Tolak', 'Verifikasi'].includes(status);
};
