const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { Resend } = require('resend');

const app = express(feathers());
const resend = new Resend('re_ZqctR7tc_FxYp2SfKG2NGkth8Wo7YvHMw'); // Твій ключ від Resend

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Валідація (залишаємо як була)
    if (!name || !email || !message) {
        return res.status(400).send('Заповніть усі поля!');
    }

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev', // Стандартний відправник Resend для тестів
            to: 'mixa251106@gmail.com',    // Твоя пошта реєстрації
            subject: subject || 'Нове повідомлення з сайту',
            html: `
                <h3>Нове повідомлення від ${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Текст:</strong> ${message}</p>
            `
        });

        console.log('Лист надіслано успішно через Resend:', data);
        res.status(200).send('Дякуємо! Лист надіслано.');
    } catch (error) {
        console.error('Помилка Resend:', error);
        res.status(500).send('Помилка сервера при відправці.');
    }
});

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});