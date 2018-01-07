
function* getNumber(start, end) {
   let temp = start;
   while (temp < end) {
      yield(temp);
      temp += 1;
   }
}

function* getNumbers(numbers) {
   for (let x = 0; x < numbers.length; x += 1) {

      yield* getNumber(numbers[x], numbers[x]+5);
   }
}

