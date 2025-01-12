// Массив студентов, который будем хранить в LocalStorage
let students = [];

// Функция для добавления студента в таблицу
function addStudentToTable(student) {
    const studentsList = document.getElementById('students-list');
    const row = document.createElement('tr');
    row.setAttribute('data-id', student.id);

    row.innerHTML = `
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
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
    const payment = document.getElementById('payment').value;

    // Генерация уникального ID для студента
    const studentId = Date.now();

    const student = {
        id: studentId,
        firstName,
        lastName,
        payment
    };

    // Добавляем студента в массив
    students.push(student);

    // Сохраняем данные в LocalStorage
    localStorage.setItem('students', JSON.stringify(students));

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
    document.getElementById('payment').value = student.payment;

    // Удаляем студента из массива
    students = students.filter(student => student.id !== id);

    // Удаляем строку из таблицы
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();

    // Сохраняем обновленные данные в LocalStorage
    localStorage.setItem('students', JSON.stringify(students));
}

// Функция для удаления студента
function deleteStudent(id) {
    // Удаляем студента из массива
    students = students.filter(student => student.id !== id);

    // Удаляем строку из таблицы
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();

    // Сохраняем обновленные данные в LocalStorage
    localStorage.setItem('students', JSON.stringify(students));
}

// Загрузка студентов из LocalStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const storedStudents = localStorage.getItem('students');
    
    if (storedStudents) {
        students = JSON.parse(storedStudents); // Преобразуем строку в массив объектов
        students.forEach(student => {
            addStudentToTable(student);
        });
    }
});

