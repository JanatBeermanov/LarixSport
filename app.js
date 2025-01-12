import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdFEXBl_d1N_Qt_e5h-RqA3EU5Cljovgo",
  authDomain: "larixsport-9f6c8.firebaseapp.com",
  projectId: "larixsport-9f6c8",
  storageBucket: "larixsport-9f6c8.firebasestorage.app",
  messagingSenderId: "627179426205",
  appId: "1:627179426205:web:30ef412c9a5f55c7561f74",
  measurementId: "G-CVR2W8V8PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to the Firestore collection
const studentsCollection = db.collection("students");

// Add student form
const studentForm = document.getElementById("student-form");
const studentsList = document.getElementById("students-list");

// Load students from Firestore
function loadStudents() {
  studentsList.innerHTML = ""; // Clear the table
  studentsCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const student = doc.data();
      student.id = doc.id;
      addStudentToTable(student);
    });
  });
}

// Add a student to the table
function addStudentToTable(student) {
  const row = document.createElement("tr");
  row.setAttribute("data-id", student.id);
  row.innerHTML = `
    <td>${student.firstName}</td>
    <td>${student.lastName}</td>
    <td>${student.payment} ₽</td>
    <td>
      <button class="edit" onclick="editStudent('${student.id}')">Редактировать</button>
      <button class="delete" onclick="deleteStudent('${student.id}')">Удалить</button>
    </td>
  `;
  studentsList.appendChild(row);
}

// Add student to Firestore
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const payment = document.getElementById("payment").value;

  const student = { firstName, lastName, payment };

  studentsCollection.add(student).then(() => {
    addStudentToTable(student);
    studentForm.reset();
  });
});

// Edit student
function editStudent(id) {
  const row = document.querySelector(`tr[data-id='${id}']`);
  const firstName = prompt("Введите новое имя:", row.children[0].textContent);
  const lastName = prompt("Введите новую фамилию:", row.children[1].textContent);
  const payment = prompt("Введите новую оплату:", row.children[2].textContent);

  if (firstName && lastName && payment) {
    studentsCollection.doc(id).update({ firstName, lastName, payment }).then(() => {
      row.children[0].textContent = firstName;
      row.children[1].textContent = lastName;
      row.children[2].textContent = `${payment} ₽`;
    });
  }
}

// Delete student
function deleteStudent(id) {
  studentsCollection.doc(id).delete().then(() => {
    const row = document.querySelector(`tr[data-id='${id}']`);
    row.remove();
  });
}

// Initial load
loadStudents();
