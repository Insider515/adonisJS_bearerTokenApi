/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


//Реєстрація нових користувачів
Route.post('/register', 'AuthController.register')
//Аутентифікація користувачів для отримання токена
Route.post('/login', 'AuthController.login')
//Відображення змісту
Route.post('/', 'ApiController.viewResultApi')
//Група зареєстрованих користувачів
Route.group(() => {
  //Передача даних на обробку
  Route.post('/task', 'ApiController.newTaskApi')
}).middleware('auth')

