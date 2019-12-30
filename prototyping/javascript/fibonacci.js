function fib1(num) {
  if (num <= 1) {
    return 1;
  } else {
    return fib1(num - 1) + fib1(num - 2);
  }
}

function fib2(number) {
  const memo = {};

  function eval(num) {
    let value;
    if (num in memo) return memo[num];

    if (num <= 1) return 1;

    value = eval(num - 1) + eval(num - 2);
    memo[num] = value;

    return value;
  }

  return eval(number);
}

const testVals = [0, 1, 2, 3, 4, 5, 10, 20, 30, 40];

var t0 = new Date().getTime();
testVals.forEach(val => {
  console.log(`val ${fib1(val)}`);
});
var t1 = new Date().getTime();
console.log("Fib1 took " + (t1 - t0) + " milliseconds.");

var t0 = new Date().getTime();
testVals.forEach(val => {
  console.log(`val ${fib2(val)}`);
});
var t1 = new Date().getTime();
console.log("Fib2 took " + (t1 - t0) + " milliseconds.");
