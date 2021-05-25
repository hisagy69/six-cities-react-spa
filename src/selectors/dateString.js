const dateString = (date) => {
  const dateTime = new Date(date);
  let monthStringArr = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  return `${monthStringArr[dateTime.getMonth()]} ${dateTime.getFullYear()}`;
};
export default dateString;
