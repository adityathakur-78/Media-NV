// union and intersections types
// union -  it means that name can be number or string both are valid
type data = {
  name: string | number;
};
let dat: data = {
  name: 1233,
};
console.log(dat);
// Intersections means that it should contain both name and id
type data1 = {
  id: number;
};
type data2 = {
  name: string;
};
type finalData = data1 & data2;

let res7: finalData = {
  id: 1,
  name: "Rana",
};
console.log(res7);
