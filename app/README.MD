# GPT-WORKER

<sub>English</sub>

## Deіcription

Package for creating an ssh tunnel and sending additional messages to the PostgreSQL database

## Getting started
```
npm i forward-pg-tunnel
```
To start, you need to fill in the default configuration file located in the config folder.

### Configuration file

| Section | Key | Type | Example | Description|
|---|---|---|---|---|
|sshConfig|host|string|"20.95.0.236"|SSH route host|
|sshConfig|port|503|number|SSH port to the route|
|sshConfig|username|string|"root"|SSH route login|
|sshConfig|password|string|""|SSH route password. If not used leave blank|
|sshConfig|privateKey|string|"~/.ssh/id_rsa_dell_r620"|The path to the connection key|
|tunnelOptions|autoClose|boolean|true|Auto close tunnel|
|serverOptions|host|string|"localhost"|Local address where the TCP server will be started|
|serverOptions|port|number|5432|Local port where the TCP server will be running|
|forwardOptions|srcPort|number|5432|Port on the remote host that will be sent to the local host|
|forwardOptions|dstAddr|string|"192.168.0.105"|Database address on the remote host|
|forwardOptions|dstPort|number|5432|Database port on a remote host|
|pgClient|user|string|"postgre"|Database user|
|pgClient|host|string|"localhost"|Database host|
|pgClient|database|string|"postgre"|Database name|
|pgClient|password|string|"password"|DB password|
|pgClient|port|number|5432|DB port|
|visible|show|boolean|true|Reflection of alkalis during Operation|

### Usage examples
<sub>Create an instance and call the methods</sub>

```
import PostgreTunnelConnector from 'forward-pg-tunnel';

const dbConnector = new PostgreTunnelConnector();
dbConnector.runQuery("SELECT * FROM regions limit 5");
```
---
<sub>Українська</sub>

## Опис
Воркер служба постановки завдань на обробку в GPT. Отримуючи перелік завдань у вигляді об'єкта воркер ділить їх на запити, які поступово обробляє в GPT.
Для роботи необхідно використовувати мінімум 2 ключа openai API.

## Режими роботи
Для передачі даних і отримання відповіді використовується API. Має 2 режими роботи:
1 Повернення відповіді при запиті
2 відправка post запиту в на вказану в конфігураційному файлі адресу (перемикання здійснюється за допомогою API)

## Безпека

Для безпеки системи використовується реєстрація, яка активується/деактивується за допомогою API. Після реєстрації кожному користувачеві при авторизації видається bearer token

## Початок роботи

У данному прикладі для роботи використовуєтся 5 токенів openai API. Для зміни кількості використовуємих ключей вам знадобитьься перейти у файл /app/Controller/GptController.ts та видалити не потрібні записи

ʼʼʼ
private static apiKeys: string[] = [
        process.env.GPT_KEY_0,
        process.env.GPT_KEY_1,
        process.env.GPT_KEY_2,
        process.env.GPT_KEY_3,
        process.env.GPT_KEY_4,
    ];
ʼʼʼ

Також звістно треба буде виконати команду

ʼʼʼ
npm i
ʼʼʼ

### Конфігуційний файл

| Ключ | Тип | Приклад | Опис|
|---|---|---|---|
|PORT|number|PORT=3333|Цей параметр встановлює порт, на якому буде працювати ваш додаток. Значення 3333 вказує на порт 3333.|
|HOST|string|HOST=0.0.0.0|Цей параметр визначає хост (адресу), на якому запуститься додаток. Значення 0.0.0.0 означає, що додаток буде прослуховувати всі доступні мережеві інтерфейси та адреси.|
|NODE_ENV|string|NODE_ENV=development|Цей параметр визначає середовище виконання вашого додатку.    development: Цей режим використовується під час розробки. В ньому зазвичай включені режими налагодження, виведення на консоль помилок та інші інструменти, спрямовані на полегшення розробки.
production: Цей режим використовується в продукційному середовищі. В ньому зазвичай вимкнені режими налагодження та виведення на консоль помилок. Додаток працює в оптимальному режимі для продуктивного використання.
test: Цей режим використовується для запуску автоматичних тестів вашого додатку. В ньому можуть бути встановлені спеціальні налаштування для тестового середовища.|
|APP_KEY|string|APP_KEY=lcLbbK4jePbkwXEnBTHHKINEm8m7nN1i|Цей параметр представляє собою секретний ключ вашого додатку. Він використовується для різних цілей, таких як шифрування даних та забезпечення безпеки.|
|DRIVE_DISK|string|DRIVE_DISK=local|Цей параметр визначає диск (сховище), яке буде використовувати ваш додаток. 
local: вказує на локальне сховище.
s3: Цей параметр може вказувати на використання облікових записів Amazon S3 для зберігання файлів у хмарному сховищі Amazon S3. Це корисно, коли потрібно зберігати велику кількість файлів або забезпечити надійність та масштабованість зберігання.
google-cloud: Цей параметр може вказувати на використання Google Cloud Storage для зберігання файлів. Аналогічно до Amazon S3, Google Cloud Storage забезпечує можливість зберігання файлів у хмарному сховищі Google.
azure: Цей параметр може вказувати на використання Azure Blob Storage для зберігання файлів. Azure Blob Storage - це хмарне сховище Microsoft Azure, яке також надає можливості зберігання файлів та даних.
custom: Цей параметр може вказувати на власний кастомний диск або систему зберігання, яку ви налаштовуєте самостійно відповідно до ваших потреб.|
|DB_CONNECTION|string|DB_CONNECTION=sqlite|Цей параметр вказує тип бази даних, який буде використовувати ваш додаток.
sqlite: означає, що буде використовуватися база даних SQLite.
mysql: Цей параметр може вказувати на використання MySQL як системи управління базами даних. MySQL є дуже популярною реляційною базою даних, і вона широко використовується для зберігання та управління даними в багатьох веб-додатках.
pgsql або postgres: Цей параметр може вказувати на використання PostgreSQL
mssql: Цей параметр може вказувати на використання Microsoft SQL Server як СУБД. SQL Server - це продукт Microsoft для управління базами даних.
oracle: Цей параметр може вказувати на використання Oracle Database як СУБД. Oracle - це комерційна база даних, яка часто використовується в корпоративному середовищі.|
|GPT_KEY_0|string|GPT_KEY_0=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|Цей параметр містить ключ API для якоїсь служби або сервісу (в даному випадку, можливо, для GPT - текстової моделі).|
|REQUEST_API|string|REQUEST_API=http://127.0.0.1:3333|Цей параметр представляє собою URL-адресу, яку буде використовувати ваш додаток для відправки HTTP-запитів. Значення http://127.0.0.1:3333 вказує на адресу http://127.0.0.1 і порт 3333.|

Зверніть увагу, що параметри GPT_KEY_0 і REQUEST_API можуть бути унікальними для вашого додатку та залежать від конкретних налаштувань та використовуваних служб.
При наявності декількох API їх треба нумерувати по порядку починаючи з 0

### Приклади використання
<sub>Створіть екземпляр і викликайте методи</sub>

```
import PostgreTunnelConnector from 'forward-pg-tunnel'

const dbConnector = new PostgreTunnelConnector();
dbConnector.runQuery("SELECT * FROM regions limit 5");
```
