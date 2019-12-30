// Trying to figure out if the array can be modified from a filter function.
// It looks like it can, but removing elements when they are filtered causes an issue since
// you're trying to remove elements while traversing the array.
// You can also create a new array from the filtered values.
// That way you can generate jsx in one pass of the array.
// It seems like there will be three arrays in memory using this method.
// Though you don't have to save the filtered array.

original = [1,2,3,4,5,6,7,8,9];

const external = [];
// var numRemoved = 0;

const returned = original.filter((item, index, arr) => {
   if (item % 2 === 1) {
      external.push(`created with ${item}`);
      // It seems like arr is a copy of the original array
      arr[index] = `updated in filter to ${item}`;
      console.log(arr);
      return true;
   }
   // arr.splice(index-numRemoved,1);
   // numRemoved += 1;
   return false;
});



console.log(`original: ${original}`)
console.log(`returned: ${returned}`);
console.log(`external: ${external}`);


// With that, it seems like it would be better to use the reduce function.
// You can have your accumulator be an array and just add jsx for the
// elements that pass the filter.  That is essentially what was done here.

