var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDesc = document.getElementById("productDesc")
var productList = []
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var tmp;

if (localStorage.getItem("list") == null) {
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem("list"));
    displayProduct(...productList);
}
function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        cateegory: productCategory.value,
        desc: productDesc.value,
    }
    productList.push(product);
    localStorage.setItem("list", JSON.stringify(productList));
    clearForm();
    displayProduct(...productList);
}
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";

}
function displayProduct(...list) {
    var x = ``;
    for (var i = 0; i < list.length; i++) {
        x += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].cateegory}</td>
        <td>${list[i].desc}</td>
        <td> <button onclick="getUpdateProduct(${i})" class="btn btn-warning btn-group-sm"> Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-group-sm"> Delate</button></td>
    </tr>`

    }
    document.getElementById('tBody').innerHTML = x;
}
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(productList));
    displayProduct(...productList);
}

function searchByName(term) {
    var foundedItem = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            productList[i].newName = productList[i].name.toLowerCase().replace(term, `<span class="text-danger fw-bolder">${term}</span>`)
            foundedItem.push(productList[i]);
        }
    }
    displayProduct(...foundedItem)
}
function getUpdateProduct(index) {
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].cateegory;
    productDesc.value = productList[index].desc;
    updateBtn.classList.replace("d-none", "d-block")
    addBtn.classList.add("d-none")
    tmp=index;
}
function updateProduct(){
    addBtn.classList.replace("d-none","d-block")
    updateBtn.classList.replace("d-block","d-none")
   product={
        name:productName.value,
        price:productPrice.value,
        cateegory:productCategory.value,
        desc:productDesc.value,
    }
    productList.splice(tmp,1,product);
    localStorage.setItem("list",JSON.stringify(productList));
    clearForm();
    displayProduct(...productList);}