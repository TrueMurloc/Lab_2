document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Робота з LocalStorage (ОС та Браузер) ---
    function saveSystemInfo() {
        const info = {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language
        };
        localStorage.setItem('os_browser_data', JSON.stringify(info));
    }

    function displaySystemInfo() {
        const storedData = localStorage.getItem('os_browser_data');
        const displayDiv = document.getElementById('system-info-display');
        
        if (storedData && displayDiv) {
            const data = JSON.parse(storedData);
            displayDiv.innerHTML = `
                <ul>
                    <li><strong>ОС (Платформа):</strong> ${data.platform}</li>
                    <li><strong>Браузер:</strong> ${data.userAgent}</li>
                    <li><strong>Мова:</strong> ${data.language}</li>
                </ul>
            `;
        }
    }
    saveSystemInfo();
    displaySystemInfo();

    // --- 2. Завантаження коментарів (JSONPlaceholder) ---
    const variant = 20; 
    const container = document.getElementById('comments-container');
    
    if (container) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
            .then(response => response.json())
            .then(comments => {
                container.innerHTML = comments.map(comment => `
                    <div class="comment-item">
                        <strong>${comment.name}</strong> (${comment.email})
                        <p>${comment.body}</p>
                        <hr>
                    </div>
                `).join('');
            })
            .catch(err => console.error("Помилка завантаження коментарів:", err));
    }

    // --- 3. Модальне вікно (Поява через 1 хв) ---
    const modal = document.getElementById('contactModal');
    setTimeout(() => {
        if (modal) modal.style.display = 'block';
    }, 60000); 

    // --- 4. НОВА ЧАСТИНА: Відправка форми на твій Node.js сервер ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Зупиняємо стандартну перезагрузку

            // Збираємо дані
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Базова валідація на клієнті
            if (formData.message.length < 10) {
                alert("Повідомлення має бути довше 10 символів!");
                return;
            }

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.text();

                if (response.ok) {
                    alert("Успішно: " + result);
                    contactForm.reset();
                    modal.style.display = 'none'; // Закриваємо модалку після успіху
                } else {
                    alert("Помилка сервера: " + result);
                }
            } catch (error) {
                alert("Не вдалося з'єднатися з сервером. Перевір, чи запущений node app.js");
            }
        });
    }

    // --- 5. Перемикач теми ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            this.textContent = isDark ? "☀️ Денний режим" : "🌙 Нічний режим";
        });

        const hour = new Date().getHours();
        if (hour >= 21 || hour < 7) {
            document.body.classList.add('dark-mode');
            themeBtn.textContent = "☀️ Денний режим";
        }
    }
});