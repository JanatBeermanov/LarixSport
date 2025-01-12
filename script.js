// Массив для хранения данных студентов
let students = [];

// Функция для добавления студента в таблицу
function addStudentToTable(student) {
    const studentsList = document.getElementById('students-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.age}</td>
        <td>${student.height} см</td>
        <td>${student.weight} кг</td>
        <td>${student.payment} ₽</td>
        <td>
            <button class="edit-btn" onclick="editStudent(${student.id})">Редактировать</button>
            <button class="delete-btn" onclick="deleteStudent(${student.id})">Удалить</button>
        </td>
    `;

    studentsList.appendChild(row);
}

// Функция для добавления нового студента через форму
document.getElementById('add-student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const payment = document.getElementById('payment').value;

    // Генерируем уникальный ID для студента
    const studentId = students.length + 1;

    const student = {
        id: studentId,
        firstName,
        lastName,
        age,
        height,
        weight,
        payment
    };

    // Добавляем студента в массив
    students.push(student);

    // Обновляем таблицу
    addStudentToTable(student);

    // Очищаем форму
    document.getElementById('add-student-form').reset();
});

// Функция для редактирования данных студента
function editStudent(id) {
    const student = students.find(student => student.id === id);

    // Заполняем форму редактирования
    document.getElementById('first-name').value = student.firstName;
    document.getElementById('last-name').value = student.lastName;
    document.getElementById('age').value = student.age;
    document.getElementById('height').value = student.height;
    document.getElementById('weight').value = student.weight;
    document.getElementById('payment').value = student.payment;

    // Удаляем студента из массива
    students = students.filter(student => student.id !== id);

    // Удаляем строку из таблицы
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();
}

// Функция для удаления студента
function deleteStudent(id) {
    // Удаляем студента из массива
    students = students.filter(student => student.id !== id);

    // Удаляем строку из таблицы
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();
}

// Включаем форму добавления студентов только для администраторов
function enableAdminAccess(isAdmin) {
    const adminForm = document.getElementById('admin-form');
    if (isAdmin) {
        adminForm.style.display = 'block'; // Показываем форму
    }
}

// Включаем доступ администратора (для теста включим доступ по умолчанию)
enableAdminAccess(true);
