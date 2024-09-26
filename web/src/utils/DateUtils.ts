import { format } from "date-fns";

export const timestampStringISOFormated = (
  timestampStringISOFormated: string
) => {
  const date = new Date(timestampStringISOFormated);

  return format(date, "dd/MM/yyyy HH:mm");
};

export const dateStringISOFormated = (timestamp: string) => {
  const date = new Date(timestamp);

  return format(date, "dd/MM/yyyy");
};
