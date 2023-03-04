import dayjs from "dayjs";
export const formatDateUI = (date?: string | number | Date ) => {
  return dayjs(date).format("DD-MM-YYYY");
};
export const formatTimeUI = (date?: string | number | Date) => {
  return dayjs(date).format("HH:mm:ss");
};
export const formatYearMonthDayUI = (date?: string | number | Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};
export const formatOnlyDayUI = (date?: string | number | Date) => {
  return dayjs(date).format("DD");
};