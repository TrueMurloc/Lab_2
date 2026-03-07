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