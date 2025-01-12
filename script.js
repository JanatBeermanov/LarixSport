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
