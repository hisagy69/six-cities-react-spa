const dateString = (date) => {
  const dateTime = new Date(date);
  const formatMonth = new Intl.DateTimeFormat(`en-US`, {
    month: `long`,
    year: `numeric`
  });
  return formatMonth.format(dateTime);
};
export default dateString;
