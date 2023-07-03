// Students Array
const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
  ];
  
  const studentsTableBody = document.getElementById('students-table-body');
  const nameInput = document.getElementById('name-input');
  const ageInput = document.getElementById('age-input');
  const gradeInput = document.getElementById('grade-input');
  const degreeInput = document.getElementById('degree-input');
  const emailInput = document.getElementById('email-input');
  const addStudentBtn = document.getElementById('add-student-btn');
  const searchInput = document.getElementById('search-input');
  
  function displayStudents() {
    studentsTableBody.innerHTML = '';
  
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td class="edit-btn">Edit</td>
        <td class="delete-btn">Delete</td>
      `;
  
      const editBtn = row.querySelector('.edit-btn');
      const deleteBtn = row.querySelector('.delete-btn');
  
      editBtn.addEventListener('click', () => editStudent(student.ID));
      deleteBtn.addEventListener('click', () => deleteStudent(student.ID));
  
      studentsTableBody.appendChild(row);
    });
  }
  
  function addStudent() {
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const grade = gradeInput.value;
    const degree = degreeInput.value;
    const email = emailInput.value;
  
    if (name && age && grade && degree && email) {
      const newStudent = {
        ID: students.length + 1,
        name,
        age,
        grade,
        degree,
        email
      };
  
      students.push(newStudent);
      displayStudents();
  
      nameInput.value = '';
      ageInput.value = '';
      gradeInput.value = '';
      degreeInput.value = '';
      emailInput.value = '';
    }
  }
  
  function editStudent(studentID) {
    const student = students.find(s => s.ID === studentID);
  
    if (student) {
      nameInput.value = student.name;
      ageInput.value = student.age;
      gradeInput.value = student.grade;
      degreeInput.value = student.degree;
      emailInput.value = student.email;
  
      addStudentBtn.textContent = 'Edit Student';
      addStudentBtn.removeEventListener('click', addStudent);
      addStudentBtn.addEventListener('click', () => updateStudent(studentID));
    }
  }
  
  function updateStudent(studentID) {
    const student = students.find(s => s.ID === studentID);
  
    if (student) {
      student.name = nameInput.value;
      student.age = parseInt(ageInput.value);
      student.grade = gradeInput.value;
      student.degree = degreeInput.value;
      student.email = emailInput.value;
  
      displayStudents();
  
      nameInput.value = '';
      ageInput.value = '';
      gradeInput.value = '';
      degreeInput.value = '';
      emailInput.value = '';
  
      addStudentBtn.textContent = 'Add Student';
      addStudentBtn.removeEventListener('click', updateStudent);
      addStudentBtn.addEventListener('click', addStudent);
    }
  }
  
  function deleteStudent(studentID) {
    const studentIndex = students.findIndex(s => s.ID === studentID);
  
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      displayStudents();
    }
  }
  
  function searchStudents() {
    const searchQuery = searchInput.value.toLowerCase();
  
    const filteredStudents = students.filter(student => {
      const { name, email, degree } = student;
      return name.toLowerCase().includes(searchQuery)
        || email.toLowerCase().includes(searchQuery)
        || degree.toLowerCase().includes(searchQuery);
    });
  
    studentsTableBody.innerHTML = '';
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td class="edit-btn">Edit</td>
        <td class="delete-btn">Delete</td>
      `;
  
      const editBtn = row.querySelector('.edit-btn');
      const deleteBtn = row.querySelector('.delete-btn');
  
      editBtn.addEventListener('click', () => editStudent(student.ID));
      deleteBtn.addEventListener('click', () => deleteStudent(student.ID));
  
      studentsTableBody.appendChild(row);
    });
  }
  
  addStudentBtn.addEventListener('click', addStudent);
  searchInput.addEventListener('input', searchStudents);
  
  displayStudents();
  