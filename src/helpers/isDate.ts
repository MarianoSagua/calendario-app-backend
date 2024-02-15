import moment from "moment";

export const isDate = (value: any) => {
  if (!value) return false;

  const fecha = moment(value);
  if (fecha.isValid()) return true;
};
