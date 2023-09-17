# AdonisJS bearer Token API

<sub>Українська</sub>

## Опис
Порожній проект на AdonisJS API зі створенним bearer Token. Зтворенний спеціально як паттерн для створення API проектів з метою економіі часу на розробку токенів.

## Початок роботи

У данному проекті існує 2 методи для реєстрації та авторизації користувачів з метою отзимання токенів для подальшої взаємодії.


## API

#### Реестрація
| Url | Зміст | Приклад | Відповідь | Помилка |
|---|---|---|---|---|
|/register|http://127.0.0.1:3333/register|{"email": "test@test.com","password": "qwerty123"}|{"user": {"email": "test@test.com","created_at": "2023-09-15T20:42:19.649+02:00","updated_at": "2023-09-15T20:42:19.649+02:00","id": 1},"token": {"type": "bearer","token": "MQ.rc0q7PNkKqwfN3PquRO-wOTFtdWEc4GM5tBCuoWo-Z-b-vKDbj7Zh-65DI6T"}}|Error registration|

#### Авторизація
| Url | Зміст | Приклад | Відповідь | Помилка |
|---|---|---|---|---|
|/login|http://127.0.0.1:3333/login|{"email": "test@test.com","password": "qwerty123"}|"token": {"type": "bearer","token": "MQ.rc0q7PNkKqwfN3PquRO-wOTFtdWEc4GM5tBCuoWo-Z-b-vKDbj7Zh-65DI6T"}}|Invalid credentials|
