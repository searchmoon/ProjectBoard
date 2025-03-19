export const formatStatusType = (status: string | undefined) => {
  if (status === 'in-progress') return '진행중';
  if (status === 'not-in-progress') return '시작전';
  if (status === 'completed') return '완료';
  return '';
};
