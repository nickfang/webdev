function add(a, b) {
  return a + b;
}

function add(a) {
  console.log(`a: ${a}`);
  return function add(b) {
    console.log(`b: ${b}`);
    return a + b;
  };
}

console.log(add(1)(2));

function log(info) {
  return number => {
    return message => {
      return console.log(`${info} ${number} ${message}`);
    };
  };
}

const logComponent = log("Component 1:");
logComponent(500)("test");
logComponent(300)("another test");

const log2 = name => errorNum => message =>
  console.log(`Error (${errorNum}): ${message} - from: ${name}`);

const nicksLog = log2("nick");

nicksLog(201)("invalid item");
nicksLog(333)("Timeout.");

function addNums(a) {
  return function addNumsAndA(b) {
    return function addNumAndAAndB(c) {
      return a + b + c;
    };
  };
}

console.log(addNums(1)(2)(3));
const add2 = addNums(2);

console.log(add2(100)(1000));
