// create an arry of increasing integer values.
const numElements = 10000000;

const t0 = new Date().getTime();
const test1 = Array(numElements).fill(0, 0, numElements).map((item, index) => index);
const t1 = new Date().getTime();
console.log(`elapsed time: ${t1 - t0}`);
delete t0;
delete t1;

const t2 = new Date().getTime();
const test2 = [];
for (let x = 0; x < numElements; x++) {
   test2[x] = x;
}
const t3 = new Date().getTime();
console.log(`elapsed time: ${t3 - t2}`);
delete t2;
delete t3;


const t4 = new Date().getTime();
const test3 = Array(numElements);
for (let x = 0; x < numElements; x++) {
   test3[x] = x;
}
const t5 = new Date().getTime();
console.log(`elapsed time: ${t5 - t4}`);
delete t4;
delete t5;