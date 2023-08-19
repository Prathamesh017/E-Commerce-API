E-Commerce API DOCUMENATION

Welcome to the E-Commerce API documentation. This API allows you to see products ,add and remove them from cart and place order 

Hosted on Server URL 
```bash
https://e-commerce-api-bjp2.onrender.com/
```
Swagger 
```bash
https://e-commerce-api-bjp2.onrender.com/api/swagger
```


## Authentication
This API requires API key authentication. Include your API key in the Authorization header of your requests.

## ENDPOINTS
- AUTH </br>
 a) /auth/login  logins user  </br>
 Method - Post. </br>
 Request - {  _
  email,       _
  password  _
  }</br>
 Response  - Token (Use this for authentication)  </br>
 
  b) /auth/register -  register user </br>
  Method - Post </br>
  Request - {
  name,
  email,
  password
  } </br>
  Response  - Token(Use this for authentication) </br>

 - Product </br>
   a) /product -  Get All Product </br>
   Method - Get  </br>
   Response  - All Products</br>
   
   b) /product/category -  Get All Category </br>
   Method - Get </br>
   Response  - All Category  </br>
   
   c) /product/{id} -  Get A Product </br>
   Method - Get </br>
   Response  - A Product </br>
   
   d) /product -  Add a Product </br>
   Method - Post </br>
   Request- require admin token </br>
   Response  - Product </br>


  - Cart </br>
    a)/cart/view  see cart </br>
    Method - GET </br>
    Response - Cart  </br>
    
    b)/cart/add  add item in cart </br>
    Method - POST </br>
    Request :{
    productID,
    quantity
    } </br>
    Response - Cart  </br>
  
    c)/cart/remove  remove item in cart </br>
   Method - POST </br>
   Request :{
   productID
   } </br>
  Response - Cart  </br>

 - ORDER </br>
   a)/order/history  see all order history </br>
   Method - GET </br>
   Response - order history </br>
 
   b)/order  add  order  </br>
   Method - POST </br>
   Response - Order Added </br>
 
   c) /order/{id} -  Get Order Details </br>
   Method - Get </br>
   Response  - A Order Detail </br>


