// Node js core modules
// fs - it allows you to perform I/O opertaions in synchronous and asynchronous ways
import fs from "fs";

// it will create a file and add a text inside it
fs.writeFileSync("ad.txt", "Aditya is good developer and good person");
// it will read all the text inside files
let text = fs.readFileSync("ad.txt", "utf-8");
console.log(text);

// append
fs.appendFileSync("ad.txt", " I am a 21 year old");
console.log(fs.readFileSync("ad.txt", "utf-8"));

// fs with Promises
import fs from "fs/promises";

try {
  const data = await fs.readFile("ad.txt", "utf-8");
  console.log(data);
} catch (error) {
  console.log(error);
}
