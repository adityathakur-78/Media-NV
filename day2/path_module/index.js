import path from "path";

// join method will join my path one by one
console.log(path.join("aditya", "imp", "docs"));

// basename will tell  base name of our file
console.log(path.basename("aditya/imp/docs.text"));

// dirname will tell the parent folder name
console.log(path.dirname("aditya/imp/docs.text"));

// extname will tell extension of your file
console.log(path.extname("docs.js"));
