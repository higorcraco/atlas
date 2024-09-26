import { FC } from "react";
import { DateUtils } from "../utils";

export enum DateFormatType {
  DATE,
  TIMESTAMP,
}

const FormatDate: FC<{ date?: string; type?: DateFormatType }> = ({
  date,
  type = DateFormatType.DATE,
}) => {
  if (!date) {
    return;
  }

  if (type === DateFormatType.DATE) {
    return DateUtils.dateStringISOFormated(date);
  }

  if (type === DateFormatType.TIMESTAMP) {
    return DateUtils.timestampStringISOFormated(date);
  }
};

export default FormatDate;
