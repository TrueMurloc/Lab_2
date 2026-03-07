// 1.a. Отримуємо дані про ОС та браузер і зберігаємо у localStorage
function saveSystemInfo() {
    const info = {
        browserName: navigator.appName,
        browserVersion: navigator.appVersion,
        platform: navigator.platform, // Інформація про ОС
        userAgent: navigator.userAgent, // Повний рядок браузера
        language: navigator.language // Мова системи
    };

    // Перетворюємо об'єкт у рядок, бо localStorage зберігає лише рядки
    localStorage.setItem('os_browser_data', JSON.stringify(info));
}

// 1.b. Відображаємо дані з localStorage у футері
function displaySystemInfo() {
    // Отримуємо рядок з сховища
    const storedData = localStorage.getItem('os_browser_data');
    
    if (storedData) {
        // Перетворюємо рядок назад в об'єкт
        const data = JSON.parse(storedData);
        
        // Знаходимо футер за ID
        const displayDiv = document.getElementById('system-info-display');
        
        // Формуємо текст для виводу
        displayDiv.innerHTML = `
            <ul>
                <li><strong>ОС (Платформа):</strong> ${data.platform}</li>
                <li><strong>Браузер (UserAgent):</strong> ${data.userAgent}</li>
                <li><strong>Мова:</strong> ${data.language}</li>
            </ul>
        `;
    }
}

// Викликаємо функції
saveSystemInfo();
displaySystemInfo();



const variant = 2; 
fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        container.innerHTML = ''; // Очищуємо текст завантаження
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<strong>${comment.name}</strong> (${comment.email}): <p>${comment.body}</p><hr>`;
            container.appendChild(commentDiv);
        });
    });


    setTimeout(() => {
        document.getElementById('contactModal').style.display = 'block';
    }, 60000); // 60000 мс = 1 хвилина    

    // Чекаємо, поки завантажиться весь DOM
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');

    if (!themeBtn) {
        console.error("Кнопку не знайдено! Перевір id='theme-toggle' в HTML.");
        return;
    }

    // Функція для перемикання
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Перевіряємо в консолі (натисни F12 в браузері)
        console.log("Клас dark-mode зараз: ", document.body.classList.contains('dark-mode'));
        
        // Оновлюємо текст на кнопці для наочності
        if (document.body.classList.contains('dark-mode')) {
            this.textContent = "☀️ Денний режим";
        } else {
            this.textContent = "🌙 Нічний режим";
        }
    });

    // Автоматичне перемикання за часом (твоє завдання 4.b)
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 7) {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = "☀️ Денний режим";
    }
});