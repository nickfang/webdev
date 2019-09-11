date = new Date();

console.log('format for input for <input type="date">');
const format2Digit = (int) => ('0' + int).slice(-2);
const displayDate = `${date.getFullYear()}-${format2Digit(date.getMonth()+1)}-${format2Digit(date.getDate())}`;
console.log(displayDate);

