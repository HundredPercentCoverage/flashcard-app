export default function randomiseArray<T>(array: T[]): T[] {
  let arrayOfIndexes: number[] = [];
  let count = 0;

  // Generate array of unique indexes
  while (count < array.length) {
    // Generate random number in range
    const index = Math.floor(Math.random() * array.length);

    // Check index value doesn't already exist in the new array
    if(!arrayOfIndexes.some(element => element === index)) {
      arrayOfIndexes.push(index);
      count++;
    }
  }

  // Build the return array with array of random indexes
  const newArray: T[] = arrayOfIndexes.map(index => array[index]);

  return newArray;
}