import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    // Реєстрація
    async register({ auth, request, response }: HttpContextContract) {
        try {
            const { email, password } = request.body() //Беремо отриманні данні
            // Створюємо користувача
            const user = await User.create({
                email, password
            })
            const token = await auth.use('api').attempt(email, password) //Отриміємо токен
            return { user, token } //Вертаємо даннi
        } catch (error) {
            response.unauthorized('Error registration')
        }
    }

    // Аутентифікація
    async login({ auth, request, response }: HttpContextContract) {
        try {
            const { email, password } = request.body() //Беремо отриманні данні
            const token = await auth.use('api').attempt(email, password) //Отриміємо токен
            return { token } //Вертаємо токен
        } catch (error) {
            response.unauthorized('Invalid credentials')
        }
    }

}
