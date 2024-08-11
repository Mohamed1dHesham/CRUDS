let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discounts = document.getElementById('discounts');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let cancel = document.getElementById('cancel');
let deleteDate = document.getElementById('delete');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let tbody = document.getElementById('tbody');
total.style.display = 'none';
//show delete button
function showDeleteButton() 
{
    if(localStorage.product != null)
    {   
        deleteDate.style.display = 'block';
        deleteDate.innerHTML = `Delete All [${dataPro.length}]`;
    }
}
//delete data
function onclickDeleteDate()
{
    localStorage.removeItem('product');
    dataPro=[];
    deleteDate.style.display='none';
    showData();
}
function clearInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discounts.value = '';
    total.style.display = 'none';
    count.value = '';
    category.value = '';
}
function getTotal() 
{
    if (price.value != '') 
    {
        total.style.display = 'block';
        let result = (+price.value + +count.value + +taxes.value + +ads.value) - +discounts.value;
        total.innerHTML=`${result}`
        total.style.backgroundColor = '#050';
        total.style.padding= '5px 2px';
        total.style.borderRadius='4px';
    }
    else
    {
        total.style.backgroundColor = '#f50';
        total.style.display='none';
    }
}
let dataPro;
if (localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
}
else{dataPro = [];}
submit.onclick =()=>
{
    let newPro = 
    {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discounts: discounts.value,
        total:total.innerHTML,
        count: count.value,
        category: category.value    
    }
    if(newPro.count > 1){
        for(let i=0; i<newPro.count ; i++){    
            dataPro.push(newPro);
        }
    }
    else{
        dataPro.push(newPro);
    }
    localStorage.setItem('product', JSON.stringify(dataPro))
    clearInput()
    showDeleteButton();
    showData();
}
//read
function showData()
{
    let table='';
    for(let i=0 ; i<dataPro.length ; i++)
    {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discounts}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick='updateData(${i})'>Update</button></td>
        <td><button onclick='delData(${i})'>Delete</button></td>
        </tr>`;
    }
    tbody.innerHTML=table;
    tbody.style.textAlign='center';
}
function updateData(i) {
    count.style.display='none';
    submit.innerHTML = 'Update';
    cancel.style.display='block';
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discounts.value = dataPro[i].discounts;
    total.innerHTML = dataPro[i].total;
    category.value = dataPro[i].category;
    function subCan(){
        {            
            localStorage.product = JSON.stringify(dataPro);   
            clearInput();
            showDeleteButton();
            showData();
            count.style.display='block';
            submit.innerHTML = 'Create';
            cancel.style.display='none';
        }
    }
    submit.onclick = () => {
        dataPro[i] = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discounts: discounts.value,
            total: total.innerHTML,
            category: category.value
        } 
        subCan();
    }
    cancel.onclick = () => {subCan()}
}
function delData(i)
{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
} 

showData();
showDeleteButton();
