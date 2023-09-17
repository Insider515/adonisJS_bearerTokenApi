import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GptController from './GptController';

export default class ApiController {
    //Створення завдання на обробку даних
    public async newTaskApi({ request, response }: HttpContextContract) {
        try {
            //Валідація даних
            const Validator = schema.create({
                settings: schema.object().members({
                  maxTokenCount: schema.number(),
                  gpt_type: schema.string(),
                  temperature: schema.number(),
                }),
                data: schema.object().members(
                  Object.fromEntries(
                    Object.keys(request.input("data")).map((key) => [
                      key,
                      schema.string(),
                    ])
                  )
                ),
              });
            const data = await request.validate({ schema: Validator });
            //Передача даних в обробку
            GptController.getAndMarkTranslations(data.settings, data.data);
            return response.status(200).json({ message: 'Задача создана успешно', date: new Date() });
        } catch (error) {
            return response.status(400).json({ message: `${error}`, date: new Date() });
        }
    }

    //Виведення відправлених даних
    public async viewResultApi({ request }: HttpContextContract) {
        const requestData = request.all();
        return requestData;
    }
}

