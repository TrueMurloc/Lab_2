// 1.a. recieve data about OS, browser, language and seving it to localstorage
function saveSystemInfo() {
    const info = {
        browserName: navigator.appName,
        browserVersion: navigator.appVersion,
        platform: navigator.platform, // OS
        userAgent: navigator.userAgent, // browser
        language: navigator.language // system language
    };

    // localstorage saves only strings
    localStorage.setItem('os_browser_data', JSON.stringify(info));
}

// 1.b. show data from storage in footer
function displaySystemInfo() {
    const storedData = localStorage.getItem('os_browser_data');
    
    if (storedData) {
        // string into object
        const data = JSON.parse(storedData);
        
        // find footer by id
        const displayDiv = document.getElementById('system-info-display');
        
        // formating text for display
        displayDiv.innerHTML = `
            <ul>
                <li><strong>ОС (Платформа):</strong> ${data.platform}</li>
                <li><strong>Браузер (UserAgent):</strong> ${data.userAgent}</li>
                <li><strong>Мова:</strong> ${data.language}</li>
            </ul>
        `;
    }
}

// Func calls
saveSystemInfo();
displaySystemInfo();



const variant = 2; 
fetch(`https://jsonplaceholder.typicode.com/posts/${variant}/comments`)
    .then(response => response.json())
    .then(comments => {
        const container = document.getElementById('comments-container');
        container.innerHTML = ''; 
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<strong>${comment.name}</strong> (${comment.email}): <p>${comment.body}</p><hr>`;
            container.appendChild(commentDiv);
        });
    });


    setTimeout(() => {
        document.getElementById('contactModal').style.display = 'block';
    }, 60000); // 60000 ms = 1 min    


document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');

    if (!themeBtn) {
        console.error("Кнопку не знайдено! Перевір id='theme-toggle' в HTML.");
        return;
    }

    // toggle function
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // logs
        console.log("Клас dark-mode зараз: ", document.body.classList.contains('dark-mode'));
        
        // button text update
        if (document.body.classList.contains('dark-mode')) {
            this.textContent = "☀️ Денний режим";
        } else {
            this.textContent = "🌙 Нічний режим";
        }
    });

    // Automatic dark mode based on time
    const hour = new Date().getHours();
    if (hour >= 21 || hour < 7) {
        document.body.classList.add('dark-mode');
        themeBtn.textContent = "☀️ Денний режим";
    }
});