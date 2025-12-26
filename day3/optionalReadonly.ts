// Optional and Readonly Properties
// optional means that there are some additional items wheteher you can add or skip
interface product {
  id: number;
  name: string;
  age?: number;
}

// Readonly means that there are some items we can't change
interface prod {
  readonly id: string;
  name: string;
  age: number;
}
