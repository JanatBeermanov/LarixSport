<script>
  // Обработчик отправки формы
  document.getElementById('add-student-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузка страницы)

    // Получаем данные из полей формы
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const tournamentResults = document.getElementById('tournament-results').value;
    const avatar = document.getElementById('avatar').value;

    // Создаем новую карточку студента
    const studentCard = document.createElement('div');
    studentCard.classList.add('card');
    
    // Создаем элемент изображения
    const studentImage = document.createElement('img');
    studentImage.src = avatar || 'https://via.placeholder.com/250';  // Если фото не указано, используем стандартное изображение
    studentImage.alt = 'Avatar';
    studentImage.classList.add('avatar');
    
    // Создаем элемент с информацией о студенте
    const studentContent = document.createElement('div');
    studentContent.classList.add('card-content');
    
    studentContent.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Возраст:</strong> ${age} лет</p>
      <p><strong>Рост:</strong> ${height} см</p>
      <p><strong>Вес:</strong> ${weight} кг</p>
      <p><strong>Результаты турниров:</strong> ${tournamentResults}</p>
    `;
    
    // Добавляем изображение и содержимое в карточку
    studentCard.appendChild(studentImage);
    studentCard.appendChild(studentContent);
    
    // Добавляем карточку на страницу
    document.body.appendChild(studentCard);
    
    // Очищаем поля формы
    document.getElementById('add-student-form').reset();
  });
</script>

// Функция для сортировки студентов
function sortStudents(attribute) {
  const studentsList = document.getElementById('students-list');
  const students = Array.from(studentsList.getElementsByClassName('card'));
  
  students.sort((a, b) => {
    const aValue = a.querySelector(`.${attribute}`).textContent;
    const bValue = b.querySelector(`.${attribute}`).textContent;
    return aValue.localeCompare(bValue);
  });

  students.forEach(student => {
    studentsList.appendChild(student); // Перемещаем элементы в отсортированном порядке
  });
}

// Слушатели событий для кнопок сортировки
document.getElementById('sort-name').addEventListener('click', () => sortStudents('name'));
document.getElementById('sort-age').addEventListener('click', () => sortStudents('age'));
document.getElementById('sort-height').addEventListener('click', () => sortStudents('height'));

document.getElementById('filter-input').addEventListener('input', function() {
  const filterValue = this.value.toLowerCase();
  const studentsList = document.getElementById('students-list');
  const students = studentsList.getElementsByClassName('card');
  
  Array.from(students).forEach(student => {
    const name = student.querySelector('.name').textContent.toLowerCase();
    const age = student.querySelector('.age').textContent.toLowerCase();
    
    if (name.includes(filterValue) || age.includes(filterValue)) {
      student.style.display = 'block'; // Показываем студент
    } else {
      student.style.display = 'none'; // Скрываем студент
    }
  });
});

document.getElementById('add-student-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  
  const studentCard = document.createElement('div');
  studentCard.classList.add('card');
  
  studentCard.innerHTML = `
    <div class="card-content">
      <h3 class="name">${name}</h3>
      <p class="age">Возраст: ${age} лет</p>
      <p class="height">Рост: ${height} см</p>
      <p class="weight">Вес: ${weight} кг</p>
      <button class="edit-btn">Редактировать</button>
    </div>
  `;

  // Кнопка редактирования
  const editButton = studentCard.querySelector('.edit-btn');
  editButton.addEventListener('click', () => {
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('height').value = height;
    document.getElementById('weight').value = weight;
  });

  document.getElementById('students-list').appendChild(studentCard);
});
