import moment from "moment";

export function isNew(date) {
  return moment().subtract(15, 'days').toDate() < moment(date).toDate();
}