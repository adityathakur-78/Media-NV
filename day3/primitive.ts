// Primitive types and Special Types;
// boolean
let isStr: boolean = true;
console.log(isStr);
//Number
let num: Number = 12;
console.log(num);
// String
let str2: string = "Shivam";
console.log(str2);
// any
let data: any = "hello";
console.log(data);
// unknown
let char: unknown;
if (typeof char === "string") {
  console.log(char.toUpperCase());
}
// Void
function hell(msg: string): void {
  console.log(msg);
}
hell("The road to hell");
// Never
function namaste(msg: string): never {
  throw new Error(msg);
}
namaste("Sagar");
