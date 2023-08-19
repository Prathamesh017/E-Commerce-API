E-Commerce API DOCUMENATION

Welcome to the E-Commerce API documentation. This API allows you to see products ,add and remove them from cart and place order 

Hosted on Server URL 
https://localhost:3000

Authentication
This API requires API key authentication. Include your API key in the Authorization header of your requests.

ENDPOINTS
AUTH
a) /auth/login -  logins user
Method - Post
Request - {
  email,
  password
}
Response  - Token(Use this for authentication)

b) /auth/register -  register user
Method - Post
Request - {
  name,
  email,
  password
}
Response  - Token(Use this for authentication)


2)Product
a) /product -  Get All Product
Method - Get
Response  - All Products
b) /product/category -  Get All Category
Method - Get
Response  - All Category
c) /product/{id} -  Get A Product
Method - Get
Response  - A Product
d) /product -  Add a Product
Method - Post
Request-require admin token
Response  - Product


3)Cart
a)/cart/view  see cart
Method - GET
Response - Cart 
b)/cart/add  add item in cart
Method - POST
Request :{
  productID
  quantity
}
Response - Cart 
c)/cart/remove  remove item in cart
Method - POST
Request :{
  productID
}
Response - Cart 

4)ORDER
a)/order/history  see all order history
Method - GET
Response - order history
b)/order  add  order 
Method - POST
Response - Order Added
c) /order/{id} -  Get Order Details
Method - Get
Response  - A Order Detail


