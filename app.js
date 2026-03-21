const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const nodemailer = require('nodemailer');

const app = express(feathers());

// 1. Налаштування статики (Завдання 1.a, 1.b)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public')); // Роздача файлів з папки public

// 2. Конфігурація Nodemailer для Mailjet (Завдання 2.c)
const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
        user: ' 03d4ebb3a23b416a8a2ecd5b8bf55fb0',
        pass: '332dbb9a7d691880a6dccaa2ded0bb48'
    }
});

// 3. Ендпоінт POST /api/contact з валідацією (Завдання 2.a, 2.b)
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Базова валідація
    if (!name || name.length < 2) {
        return res.status(400).send('Помилка: Ім’я занадто коротке.');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Помилка: Некоректний формат email.');
    }

    if (!message || message.length < 10) {
        return res.status(400).send('Помилка: Повідомлення має бути довшим за 10 символів.');
    }

    // Формування листа
    const mailOptions = {
        from: 'mixa251106@gmail.com', 
        to: 'mixa2511061@gmail.com', 
        subject: `[Contact Form] ${subject || 'Без теми'}`,
        text: `Повідомлення від: ${name} (${email})\n\nТекст:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Лист успішно надіслано через Mailjet!');
    } catch (error) {
        console.error('Помилка Mailjet:', error);
        res.status(500).send('Сталася помилка на сервері при відправці.');
    }
});

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Сервер FeathersJS запущено на http://localhost:${PORT}`);
});