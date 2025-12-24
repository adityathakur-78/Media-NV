// os - it allows you to perform operating system tasks
import os from "os";

// it will tell on which platform i am like window or Mac etc.
console.log(os.platform());

// it will tell how much free space is there in memory
console.log(os.freemem());

// it will tell who is using the system
console.log(os.userInfo().username);

// it will tell my home folder name
console.log(os.homedir());
