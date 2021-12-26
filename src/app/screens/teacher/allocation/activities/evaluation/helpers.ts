export const validateMarks = (marks: string, total: number) => {
  const intMarks = parseInt(marks);
  return (
    intMarks.toString() !== marks ||
    (intMarks !== 0 && !intMarks) ||
    intMarks < 0 ||
    intMarks > total
  );
};
