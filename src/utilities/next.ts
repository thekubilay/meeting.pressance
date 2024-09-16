function NEXT<T>(arr: T[]): T | null {
  if (arr.length === 0) {
    return null; // Return null if the array is empty
  }
  return arr[0]; // Return the first element of the array
}


export default NEXT;