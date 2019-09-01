// Trying to figure out if the array can be modified from a filter function.
// It looks like it cannot, but you can create a new array from the filtered values.
// That way you can generate jsx in one pass of the array.
// It seems like there will be three arrays in memory using this method.
// Though you don't have to save the filtered array.

test = [1,2,3,4,5,6,7,8,9];

const output = [];

const listOutput = test.filter((item, index, arr) => {
   if (item > 4) {
      output.push(`updated with ${item}`);
      return true;
   }
   return false;
});

console.log(listOutput);
console.log(output);
