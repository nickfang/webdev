// create an arry of increasing integer values.
const numElements = 10000000;

const test = Array(numElements);
for (let x = 0; x < numElements; x++) {
   test[x] = x;
}

t0 = new Date().getTime();
const filtered1 = [];
test.filter(item => {
   if (item % 2) {
      filtered1.push(`mapped value for: ${item}`);
   }
   return false;
});
t1 = new Date().getTime();
console.log(`filter time: ${t1-t0}`);
delete t0;
delete t1;

t2 = new Date().getTime();
const filtered2 = test.reduce((acc, val) => {
   if (val % 2 === 0) {
      acc.push(`mapped value for: ${val}`);
   }
   return acc;
}, []);
t3 = new Date().getTime();
console.log(`reduce time: ${t3-t2}`);
delete t2;
delete t3;

t4 = new Date().getTime();
const filtered3 = test.filter((item, index, arr) => {
  if (item % 2) {

    arr[index] = `mapped value for: ${item}`;
    return true;
  }
  return false;
});
t5 = new Date().getTime();
console.log(`filter time: ${t5-t4}`);
// tihs causes node to crash for large values of numElements
// console.log(test);
delete t4;
delete t5;