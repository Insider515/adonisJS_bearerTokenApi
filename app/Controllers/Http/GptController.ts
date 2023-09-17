import { OpenAI } from 'openai'; //Імпортуємо бібліотеку openai для встановлення звʼязку з GPT
const natural = require('natural'); //Імпортуємо бібліотеку для підрахунку токенов в рядку
import axios from 'axios'; //Імпортуємо бібліотеку axios для відправки данніх

export default class GptController {

    //Отримуємо ключі API з env
    private static apiKeys: string[] = [
        process.env.GPT_KEY_0,
        process.env.GPT_KEY_1,
        process.env.GPT_KEY_2,
        process.env.GPT_KEY_3,
        process.env.GPT_KEY_4,
    ]; // Масив ключів API

    private static apiKeyIndex: number = 0; // Індекс поточного ключа API

    private openai: OpenAI = new OpenAI({
        apiKey: GptController.apiKeys[GptController.apiKeyIndex],
    }); // Створюємо приватне поле для екземпляра OpenAI

    static requestUrl: string = process.env.REQUEST_API || 'http://127.0.0.1:3333';  //Отримуємо адрессу для відправки запитів

    private static maxTokenCount: number = 4000; //Зберігання значення кількості токенов в одному запиті

    static gpt_type = 'gpt-4'; // Значення за замовчуванням для gpt_type
    static temperature = 1; // Значення за замовчуванням для temperature


    //Ініціалізація масиву для зберігання запитів
    questions = [];

    //Відправка данних
    static async sendPostRequest(data) {
        try {
            const response = await axios.post(this.requestUrl, data); //Створюємо запит
            console.log('Відповідь від сервера:', response.data);
            return response.data;
        } catch (error) {
            console.error('Помилка при відправці POST-запиту:', error);
            return null;
        }
    }

    //Відправляємо запити в GPT на обробку
    static async processTranslates(questionsObject) {
        const responsesObject = {}; // Створюємо об'єкт для відповідей
        let requestCount = 0; // Лічильник запитів
        const responses = await Promise.all(
            Object.keys(questionsObject).map(async (id) => {
                try {
                    const question = questionsObject[id];
                    // Вибір поточного ключа
                    const apiKey = this.apiKeys[this.apiKeyIndex];
                    // Створення екземпляра Openal з поточним ключем
                    const openai = new OpenAI({
                        apiKey,
                    });
                    // Створення екземпляра OpenAI з поточним ключем
                    const response = await openai.chat.completions.create({
                        model: this.gpt_type,
                        messages: [
                            { role: 'system', content: 'You are a helpful assistant.' },
                            { role: 'user', content: question },
                        ],
                        temperature: this.temperature,
                    });
    
                    if (response.choices && response.choices.length > 0) {
                        const message = response.choices[0].message.content;
                        responsesObject[id] = message; // Додаємо відповідь в об'єкт відповідей з id як ключем
                        return message;
                    } else {
                        console.error('Відповідь API не містить повідомлень');
                        responsesObject[id] = null; // Додаємо null, якщо відповідь порожня
                        return null;
                    }
                } catch (error) {
                    console.error('Помилка при обробці запиту:', error);
                    responsesObject[id] = null; // Обробляємо помилку і додаємо null у відповідь
                    return null;
                }
            })
        );
    
        // Інкрементуємо лічильник запитів
        requestCount++;
    
        // Перевіряємо, чи досяг лічильник значення 5
        if (requestCount >= 5) {
            // Інкрементуємо Індекс ключа і скидаємо лічильник запитів
            this.apiKeyIndex = (this.apiKeyIndex + 1) % this.apiKeys.length;
            requestCount = 0;
        }

        //REQUEST_API
        await this.sendPostRequest(responsesObject); //Відправляємо обробленні данні
        return;
    }

    // Перевіряємо обсяг токенов рядки
    static async countTokensInText(textsObject) {
        const tokenizer = new natural.WordTokenizer(); // Створюємо токенізатор
        let totalTokenCount = 0; // Створюємо змінну лічільника
        for (const key in textsObject) {
            if (textsObject.hasOwnProperty(key)) {
                const text = textsObject[key];
                const tokens = tokenizer.tokenize(text); // Ділимо текст на токіни
                const tokenCount = tokens.length; // Отримуємо кількість токенів данної строки
                totalTokenCount += tokenCount;
            }
        }
        return totalTokenCount;
    }

    // Отримання записів
    static async getAndMarkTranslations(settings, data) {
        this.maxTokenCount = settings.maxTokenCount
        this.gpt_type = settings.gpt_type;
        this.temperature = settings.temperature;
        await this.main(data);
    }

    // Збираємо об'єкти з максимальним обсягом в зазначену кількість токенов
    static async main(translatedObject) {
        let currentTokens = 0;
        let currentBatch = {};
        const batches = [];
        for (const key in translatedObject) {
            if (translatedObject.hasOwnProperty(key)) {
                const text = translatedObject[key];
                const tokenCount = await this.countTokensInText(text);
                if (currentTokens + tokenCount <= this.maxTokenCount) {
                    currentTokens += tokenCount;
                    currentBatch[key] = text;
                } else {
                    batches.push(currentBatch); //Додаємо поточний пакет до масиву batches
                    // Скидаємо лічильники і створюємо новий пакет
                    currentTokens = tokenCount;
                    currentBatch = { [key]: text };
                }
            }
        }
        batches.push(currentBatch); // Додаємо останній пакет, що залишився
        // Обробляємо кожен пакет у функції process Translates()
        for (const batch of batches) {
            await this.processTranslates(batch);
        }
    }

}
