async function fetchData() {
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error:", err);
  }
}
fetchData();
