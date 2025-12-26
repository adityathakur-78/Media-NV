// interfaces and time aliases
// Interface is like a rule book it tells that it should looks liek this
interface User {
  id: number;
  name: string;
  email: string;
}
interface Admin extends User {
  role: string;
}

const pers: Admin = {
  id: 1,
  name: "Aditya",
  email: "aditya@email.com",
  role: "User",
};
console.log(pers);

// type aliases
type User1 = {
  name: string;
};

type Admin1 = User & {
  role: string;
};
