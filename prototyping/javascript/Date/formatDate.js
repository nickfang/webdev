date = new Date();

console.log('format for input for <input type="date">');
const format2Digit = (int) => ('0' + int).slice(-2);
const displayDate = `${date.getFullYear()}-${format2Digit(date.getMonth()+1)}-${format2Digit(date.getDate())}`;
console.log(displayDate);

const newDate = new Date(date.valueOf());
console.log(newDate);
console.log(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

const testDate = new Date('2019-09-10');
console.log(testDate)