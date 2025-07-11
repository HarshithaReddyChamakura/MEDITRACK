// Registration
function register() {
    const role = document.getElementById('registerRole').value;
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
  
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users') || "[]");
  
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert("User already exists!");
      return;
    }
  
    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  }
  
  // Login
  function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const users = JSON.parse(localStorage.getItem('users') || "[]");
  
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid credentials");
      return;
    }
  
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = "index.html";
  }
  
  // Logout
  function logout() {
    localStorage.removeItem('loggedInUser');
    location.href = "login.html";
  }
  
  // Load user data on dashboard
  function loadUserData() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      window.location.href = "login.html";
      return;
    }
  
    document.getElementById('userRole').innerText = user.role;
    document.getElementById('dashboardUser').innerText = user.name;
  
    // Hide sections not relevant to role
    if (user.role === 'patient') {
      document.getElementById('doctors').style.display = 'none';
      document.getElementById('notifications').style.display = 'none';
      document.getElementById('dashboard').querySelector('p').innerText = "Welcome to MediTrack (Patient)";
    }
  
    if (user.role === 'doctor') {
      document.getElementById('medicine').style.display = 'none';
      document.getElementById('ambulance').style.display = 'none';
      document.getElementById('dashboard').querySelector('p').innerText = "Welcome to MediTrack (Doctor)";
    }
  }
  let patients = [];
let doctors = [];
let appointments = [];
let notifications = [];

function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function updateDashboard() {
  document.getElementById('patientCount').innerText = patients.length;
  document.getElementById('doctorCount').innerText = doctors.length;
  document.getElementById('appointmentCount').innerText = appointments.length;
}

function addPatient() {
  const name = document.getElementById('patientName').value;
  if (!name) return;
  patients.push({ name });
  const list = document.getElementById('patientList');
  const li = document.createElement('li');
  li.textContent = name;
  list.appendChild(li);
  document.getElementById('patientName').value = '';
  updateDashboard();
}

function addDoctor() {
  const name = document.getElementById('doctorName').value;
  if (!name) return;
  doctors.push({ name });
  const list = document.getElementById('doctorList');
  const li = document.createElement('li');
  li.textContent = name;
  list.appendChild(li);
  document.getElementById('doctorName').value = '';
  updateDashboard();
}

function addAppointment() {
  const patient = document.getElementById('apptPatient').value;
  const doctor = document.getElementById('apptDoctor').value;
  const time = document.getElementById('apptTime').value;
  if (!patient || !doctor || !time) return;
  appointments.push({ patient, doctor, time });
  const list = document.getElementById('apptList');
  const li = document.createElement('li');
  li.textContent = `${patient} with Dr. ${doctor} at ${new Date(time).toLocaleString()}`;
  list.appendChild(li);
  document.getElementById('apptPatient').value = '';
  document.getElementById('apptDoctor').value = '';
  document.getElementById('apptTime').value = '';
  updateDashboard();
}

function sendNotification() {
  const message = "Reminder: Appointment coming up!";
  notifications.push(message);
  const list = document.getElementById('notificationList');
  const li = document.createElement('li');
  li.textContent = message;
  list.appendChild(li);
}
let ambulances = [];
let medicines = [];

function bookAmbulance() {
  const patient = document.getElementById('ambulancePatient').value;
  const location = document.getElementById('pickupLocation').value;
  if (!patient || !location) return;

  const booking = { patient, location };
  ambulances.push(booking);

  const list = document.getElementById('ambulanceList');
  const li = document.createElement('li');
  li.textContent = `Ambulance booked for ${patient} at ${location}`;
  list.appendChild(li);

  document.getElementById('ambulancePatient').value = '';
  document.getElementById('pickupLocation').value = '';
}

function bookMedicine() {
  const name = document.getElementById('medicineName').value;
  const qty = document.getElementById('medicineQty').value;
  if (!name || !qty) return;

  const order = { name, qty };
  medicines.push(order);

  const list = document.getElementById('medicineList');
  const li = document.createElement('li');
  li.textContent = `Ordered ${qty} x ${name}`;
  list.appendChild(li);

  document.getElementById('medicineName').value = '';
  document.getElementById('medicineQty').value = '';
}

// Mock GPS Tracking
const mockLocations = [
  "Hospital Gate",
  "Main Road",
  "Crossing Signal",
  "Near Patient's House",
  "Arrived"
];

let gpsIndex = 0;
let gpsInterval;

function startMockTracking() {
  const gpsText = document.getElementById('gpsLocation');
  gpsIndex = 0;

  if (gpsInterval) clearInterval(gpsInterval);

  gpsInterval = setInterval(() => {
    gpsText.textContent = mockLocations[gpsIndex];
    gpsIndex++;
    if (gpsIndex >= mockLocations.length) {
      clearInterval(gpsInterval);
    }
  }, 1500);
}

function logout() {
  alert("Logged out successfully!");
  location.reload();
}

updateDashboard();
