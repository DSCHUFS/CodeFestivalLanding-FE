export const formatCodeFestivalDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Seoul',
  }).format(new Date(`${value}+09:00`));

export const getEnrollmentStatusNotice = (eventDate: string) => {
  const [year, month] = eventDate.split('-');
  const numericYear = Number(year);
  const numericMonth = Number(month);
  const academicYear = numericMonth <= 2 ? numericYear - 1 : numericYear;
  const semester = numericMonth >= 3 && numericMonth <= 8 ? 1 : 2;
  return `${academicYear}학년도 ${semester}학기 기준 재학 상태를 선택해 주시기 바랍니다.`;
};

export const getCodeFestivalOptionLabel = (
  options: { value: string; label: string }[],
  value: string,
) => options.find(option => option.value === value)?.label ?? value;
