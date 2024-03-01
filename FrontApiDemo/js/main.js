let products = [];

getData()
function getData() {
  fetch("http://localhost:3000/products") // 1min
    .then((response) => response.json())
    .then((ResponseData) => {
      if (ResponseData.message == "success") {
        products = ResponseData.data;
        showData();
      }
      console.log(products);
    });
}

function showData() {
  var cardouna = ``;

  for (let index = 0; index < products.length; index++) {
    cardouna += `
      
      <tr>
      <td>${products[index].name}</td>
      <td>${products[index].price}</td>
      <td>${products[index].description}</td>
      <td>
          <button onclick="deleteProduct(${products[index].id})" class="btn btn-danger">Delete</button>
          <button class="btn btn-success">Update</button>
      </td>
   </tr>
      `;
  }

  document.getElementById("tbody").innerHTML = cardouna;
}

function getInputValue() {
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;
  let productDesc = document.getElementById("productDesc").value;

  let productObj = {
    name: productName,
    price: productPrice,
    description: productDesc,
  };

  //& POST request using fetch()
  ApiCRUD('POST',productObj )
}

  function ApiCRUD(endPoint, body){
    // POST request using fetch()
  fetch("http://localhost:3000/products", {
    // Adding method type
    method: endPoint,

    // Adding body or contents to send
    body: JSON.stringify(body),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())
    .then(data => {
        if(data.message === "success"){
            getData()
        }
    
    })
  }

  function deleteProduct(id){
    ApiCRUD('DELETE', {id})
  }






