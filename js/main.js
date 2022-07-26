let productNameInput= document.getElementById("productName"); 
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescInput = document.getElementById("productDesc");
let productCountInput = document.getElementById("count")
let addBtn = document.getElementById("addBtn");
let inputs = document.querySelectorAll(".form-control");
let products= [];
currentIndex =0;

// Retrive Data On Refresh Page
if(JSON.parse(localStorage.getItem("ProductList")) != null) {
  products = JSON.parse(localStorage.getItem("ProductList"));
  displayData()
}





addBtn.onclick = function() {
  if(addBtn.innerHTML == 'Add product') {
    addProduct()
  } else {
    updateProduct()
  }

  

  displayData()
  resetData()
}
// Add Product
function addProduct() {
  var product = {
    name:productNameInput.value,
    price:productPriceInput.value,
    catogry:productCategoryInput.value,
    desc:productDescInput.value,
    count: productCountInput.value
  }

  // Count 
  if(product.count > 1) {
    for(let i = 0; i < product.count; i++) {
      products.push(product);
    } 
  } else {
    products.push(product);
  }
  
  localStorage.setItem("ProductList", JSON.stringify(products));
}

// Display Data
function displayData() {
  let cartona = '';
  for(let i=0; i < products.length;i++) {
   cartona+= `<tr>
   <td>${i + 1}</td>
   <td>${products[i].name}</td>
   <td>${products[i].price}</td>
   <td>${products[i].catogry}</td>
   <td>${products[i].desc}</td>
    <td><button onclick="getProductInfo(${i})" class="btn btn-outline-success">Update</button></td>
    <td><button  onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
   
   </tr>`
  }
  document.getElementById('tableBody').innerHTML = cartona;
  if(products.length > 0) {
    document.getElementById("delete").innerHTML = `
    <button onclick="deleteAll()" class="btn btn-outline-primary mb-3 w-100">Delete All <span class="ms-2">(${products.length})</span></button>
    `
  } else {
    document.getElementById("delete").innerHTML = ``
  }
}

// deleteAll() 
function deleteAll() {
  localStorage.clear();
  products.splice(0)
  displayData()
}

// reset Data
function resetData() {
  for(let i=0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
}


// Delete Product
function deleteProduct(index) {
  products.splice(index, 1);
  displayData();
  localStorage.setItem("ProductList", JSON.stringify(products));

}


// Search 
function search(searchItem) {
  let cartona = '';
  for(let i=0; i < products.length;i++) {
    if(products[i].name.toLowerCase().includes(searchItem.toLowerCase()) )
   cartona+= `<tr>
   <td>${products[i].name}</td>
   <td>${products[i].price}</td>
   <td>${products[i].catogry}</td>
   <td>${products[i].desc}</td>
    <td><button onClick()="getProductInfo(${i}) class="btn btn-outline-success">Update</button></td>
    <td><button  onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
   
   </tr>`
  }
  document.getElementById('tableBody').innerHTML = cartona
  
}


// getProductInfo()
// function getProductInfo(index) {
//   currentIndex = index;
//  var currentProduct =products[index];
//   productNameInput.value = currentProduct.name
//   productPriceInput.value = currentProduct.price
//   productCategoryInput.value = currentProduct.catogry
//   productDescInput.value = currentProduct.desc
//   addBtn.innerText = 'Update Product'
// }

// // updateProduct()
// function updateProduct() {
//   var product = {
//     name:productNameInput.value,
//     price:productPriceInput.value,
//     catogry:productCategoryInput.value,
//     desc:productDescInput.value
//   }
//   products[currentIndex] = product

// }

// getProductInfo()
function getProductInfo(index) {
  currentIndex = index
  var currentProduct = products[index];
    productNameInput.value = currentProduct.name
    productPriceInput.value = currentProduct.price
    productCategoryInput.value = currentProduct.catogry
    productDescInput.value = currentProduct.desc
    addBtn.innerHTML ='Update Product'
}

//  updateProduct()
function  updateProduct() {
    var product = {
         name:productNameInput.value,
         price:productPriceInput.value,
         catogry:productCategoryInput.value,
         desc:productDescInput.value
       }
       products[currentIndex] = product
       localStorage.setItem("ProductList", JSON.stringify(products));
}

productNameInput.onkeyup = function() {
  var regex =  /^[A-Z][a-z]{2,8}$/;
  if(regex.test(productNameInput.value)) {
  addBtn.removeAttribute("disabled");
  productNameInput.classList.add("is-valid")
  productNameInput.classList.remove("is-invalid")
  } else {
    addBtn.disabled = 'true'
    productNameInput.classList.remove("is-valid")
    productNameInput.classList.add("is-invalid")
  }
}