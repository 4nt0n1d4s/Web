const API_URL = 'https://dummyjson.com/posts'; // Используем API posts

const tableBody = document.getElementById('data-table');
const form = document.getElementById('data-form');
const idInput = document.getElementById('id');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

// 1. Получение данных (READ)
async function fetchData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderTable(data.posts); // Заполняем таблицу
}

function renderTable(posts) {
    tableBody.innerHTML = '';
    posts.forEach(post => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        // Привязываем обработчики событий
        const editButton = row.querySelector('.edit-btn');
        editButton.addEventListener('click', () => editPost(post.id, post.title, post.body));

        const deleteButton = row.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => deletePost(post.id));

        tableBody.appendChild(row);
    });
}

// 2. Добавление записи (CREATE)
async function createPost(post) {
    const response = await fetch(API_URL + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
    return await response.json();
}

// 3. Обновление записи (UPDATE)
async function updatePost(post) {
    const response = await fetch(`${API_URL}/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
    });
    return await response.json();
}

// 4. Удаление записи (DELETE)
async function deletePost(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    fetchData(); // Перезагрузка данных
}

// Обработка формы
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = idInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;

    const post = { id: Number(id), title, body: description };

    if (id) {
        await updatePost(post); // Обновление
    } else {
        await createPost(post); // Добавление
    }

    form.reset(); // Сброс формы
    fetchData(); // Перезагрузка данных
});

// Заполнение формы для редактирования
function editPost(id, title, body) {
    idInput.value = id;
    titleInput.value = title;
    descriptionInput.value = body;
}

// Первоначальная загрузка данных
fetchData();
