import moment from "moment";

export const DISPLAY_FORMAT = "Do MMM YY";
export const DATE_FORMAT = "dd/MM/yy"
export const DATE_FORMATS = [ "dd/MM/yy", "dd/MM/yyyy"]

export const formateDate = (date) => {
    return moment(date).format(DISPLAY_FORMAT);
}