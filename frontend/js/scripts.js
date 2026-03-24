const API = "http://localhost:6969/api";

// ============================================================
//  REGISTER PAGE — Role selector
// ============================================================

// Tracks which role is selected on register page
let registerRole = "patient";

// Called when Patient or Doctor button is clicked
function setRole(btn, r) {
  document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  registerRole = r;

  // Show specialization field only for doctors
  const specField = document.getElementById("specField");
  if (specField) {
    specField.classList.toggle("show", r === "doctor");
  }
}

// ============================================================
//  REGISTER PAGE — Password helpers
// ============================================================

// Password strength meter — called on every keypress
function checkStrength(val) {
  const segs  = [1, 2, 3, 4].map(i => document.getElementById("s" + i));
  const label = document.getElementById("strengthLabel");

  segs.forEach(s => s.style.background = "#dce8f5");

  if (!val) {
    label.textContent = "Enter a password";
    return;
  }

  let score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const colors = ["#e53e3e", "#ed8936", "#38a169", "#007bff"];
  const labels = ["Weak",    "Fair",    "Good",    "Strong"];

  for (let i = 0; i < score; i++) {
    segs[i].style.background = colors[score - 1];
  }
  label.textContent = labels[score - 1] || "";
}

// Toggle password show/hide — used on register page
function togglePwd(id, btnId) {
  const input     = document.getElementById(id);
  const btn       = document.getElementById(btnId);
  input.type      = input.type === "password" ? "text" : "password";
  btn.textContent = input.type === "password" ? "👁️" : "🙈";
}

// ============================================================
//  REGISTER PAGE — Submit
// ============================================================

async function register() {
  const fname    = document.getElementById("fname").value;
  const lname    = document.getElementById("lname").value;
  const name     = fname + " " + lname;
  const email    = document.getElementById("email").value;
  const phone    = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const role     = registerRole;

  const body = { name, email, phone, password, role };

  // Add specialization only if registering as doctor
  if (role === "doctor") {
    body.specialization = document.getElementById("specialization").value;
  }

  const res = await fetch(`${API}/auth/register`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    window.location.href = "login.html";
  }
}

// ============================================================
//  LOGIN PAGE — Submit
// ============================================================

async function login() {
  const email    = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    // Save token and user to browser storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(data.user));

    // Redirect based on role
    const role = data.user.role;

    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (role === "doctor") {
      window.location.href = "doctor-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } else {
    alert(data.message);
  }
}

// ============================================================
//  DASHBOARD PAGE — Load doctors and book appointment
// ============================================================

// Load all doctors and show as cards
async function loadDoctors() {
  const res     = await fetch(`${API}/doctors`);
  const doctors = await res.json();

  const container = document.getElementById("doctorList");
  container.innerHTML = "";

  doctors.forEach(doc => {
    const div = document.createElement("div");
    div.style.border        = "1px solid #ccc";
    div.style.padding       = "10px";
    div.style.marginBottom  = "10px";

    div.innerHTML = `
      <strong>${doc.name}</strong><br>
      Specialization: ${doc.specialization}<br>
      Experience: ${doc.experience || 0} years<br>
      <button onclick="book('${doc._id}')">Book</button>
    `;

    container.appendChild(div);
  });
}

// Book an appointment with a doctor
async function book(doctorId) {
  const date  = prompt("Enter date (YYYY-MM-DD):");
  const time  = prompt("Enter time (e.g. 10:00 AM):");
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/appointments`, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ doctorId, date, time })
  });

  const data = await res.json();
  alert(data.message);
}

// ============================================================
//  LOGOUT — Used on all pages
// ============================================================

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ============================================================
//  ADMIN DASHBOARD — Helper functions
// ============================================================

// Show toast notification (bottom right)
function showToast(msg, type) {
  const t       = document.getElementById("toast");
  t.textContent = msg;
  t.className   = "toast show " + type;
  setTimeout(() => t.classList.remove("show"), 3000);
}

// Get initials from name e.g. "Dr. Ali Khan" → "AK"
function getInitials(name) {
  return name.replace("Dr.", "").trim()
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

// ============================================================
//  ADMIN DASHBOARD — Load data
// ============================================================

// Load all users
async function loadUsers() {
  const token = localStorage.getItem("token");
  try {
    const res   = await fetch(`${API}/admin/users`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const users = await res.json();

    document.getElementById("totalUsers").textContent  = users.length;
    document.getElementById("usersCount").textContent  = users.length + " total";

    // Count patients only
    const patients = users.filter(u => u.role === "patient");
    document.getElementById("totalPatients").textContent = patients.length;

    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = "";

    if (users.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="4">No users found</td></tr>`;
      return;
    }

    users.forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="avatar">${getInitials(u.name)}</span>${u.name}</td>
        <td>${u.email}</td>
        <td><span class="badge badge-${u.role}">${u.role}</span></td>
        <td>
          <button class="action-btn btn-delete" onclick="deleteUser('${u._id}', '${u.name}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    document.getElementById("usersTableBody").innerHTML =
      `<tr class="empty-row"><td colspan="4">Could not load users</td></tr>`;
    console.log(err);
  }
}

// Load all doctors into admin table
async function loadDoctorsTable() {
  try {
    const res     = await fetch(`${API}/doctors`);
    const doctors = await res.json();

    document.getElementById("totalDoctors").textContent = doctors.length;
    document.getElementById("doctorsCount").textContent = doctors.length + " total";

    const tbody = document.getElementById("doctorsTableBody");
    tbody.innerHTML = "";

    if (doctors.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="4">No doctors found</td></tr>`;
      return;
    }

    doctors.forEach(doc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="avatar">${getInitials(doc.name)}</span>${doc.name}</td>
        <td>${doc.specialization || "General"}</td>
        <td>${doc.experience || 0} years</td>
        <td>
          <button class="action-btn btn-view" onclick="showToast('Viewing ${doc.name}', '')">View</button>
          <button class="action-btn btn-delete" onclick="deleteDoctor('${doc._id}', '${doc.name}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    document.getElementById("doctorsTableBody").innerHTML =
      `<tr class="empty-row"><td colspan="4">Could not load doctors</td></tr>`;
    console.log(err);
  }
}

// Load all appointments into admin table
async function loadAppointmentsTable() {
  const token = localStorage.getItem("token");
  try {
    const res          = await fetch(`${API}/admin/appointments`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const appointments = await res.json();

    document.getElementById("totalAppointments").textContent = appointments.length;
    document.getElementById("appointmentsCount").textContent = appointments.length + " total";

    const tbody = document.getElementById("appointmentsTableBody");
    tbody.innerHTML = "";

    if (appointments.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No appointments found</td></tr>`;
      return;
    }

    appointments.forEach(appt => {
      const status = appt.status || "pending";
      const tr     = document.createElement("tr");
      tr.innerHTML = `
        <td>${appt.patientName || appt.userId?.name || "Patient"}</td>
        <td>${appt.doctorName  || appt.doctorId?.name || "Doctor"}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    document.getElementById("appointmentsTableBody").innerHTML =
      `<tr class="empty-row"><td colspan="5">Could not load appointments</td></tr>`;
    console.log(err);
  }
}

// ============================================================
//  ADMIN DASHBOARD — Delete actions
// ============================================================

// Delete a user by ID
async function deleteUser(id, name) {
  const token = localStorage.getItem("token");
  if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
  try {
    const res = await fetch(`${API}/admin/users/${id}`, {
      method:  "DELETE",
      headers: { "Authorization": "Bearer " + token }
    });
    if (res.ok) {
      showToast(`${name} deleted successfully.`, "success");
      loadUsers();
    } else {
      showToast("Could not delete user.", "error");
    }
  } catch (err) {
    showToast("Server error.", "error");
  }
}

// Delete a doctor by ID
async function deleteDoctor(id, name) {
  const token = localStorage.getItem("token");
  if (!confirm(`Delete doctor "${name}"? This cannot be undone.`)) return;
  try {
    const res = await fetch(`${API}/admin/doctors/${id}`, {
      method:  "DELETE",
      headers: { "Authorization": "Bearer " + token }
    });
    if (res.ok) {
      showToast(`${name} deleted successfully.`, "success");
      loadDoctorsTable();
    } else {
      showToast("Could not delete doctor.", "error");
    }
  } catch (err) {
    showToast("Server error.", "error");
  }
}
// ============================================================
//  DOCTOR DASHBOARD FUNCTIONS
//  Used by: doctor-dashboard.html
// ============================================================

// Load doctor's own appointments
async function loadDoctorAppointments() {
  const token = localStorage.getItem("token");
  try {
    const res   = await fetch(`${API}/appointments/doctor`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const appts = await res.json();

    // Update stats
    document.getElementById("totalAppts").textContent     = appts.length;
    document.getElementById("pendingAppts").textContent   = appts.filter(a => a.status === "pending").length;
    document.getElementById("completedAppts").textContent = appts.filter(a => a.status === "completed").length;
    document.getElementById("cancelledAppts").textContent = appts.filter(a => a.status === "cancelled").length;
    document.getElementById("apptsCount").textContent     = appts.length + " total";

    const tbody = document.getElementById("apptsTableBody");
    tbody.innerHTML = "";

    if (appts.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No appointments yet</td></tr>`;
      return;
    }

    appts.forEach(appt => {
      const status   = appt.status || "pending";
      const patient  = appt.patientName || appt.userId?.name || "Patient";
      const initials = patient.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="avatar">${initials}</span>${patient}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
        <td>
          ${status === "pending" || status === "confirmed" ? `
            <button class="action-btn btn-complete" onclick="updateStatus('${appt._id}', 'completed')">Complete</button>
            <button class="action-btn btn-cancel"   onclick="updateStatus('${appt._id}', 'cancelled')">Cancel</button>
          ` : "—"}
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    document.getElementById("apptsTableBody").innerHTML =
      `<tr class="empty-row"><td colspan="5">Could not load appointments</td></tr>`;
    console.log(err);
  }
}

// Update appointment status (complete or cancel)
async function updateStatus(id, status) {
  const token = localStorage.getItem("token");
  const label = status === "completed" ? "complete" : "cancel";
  if (!confirm(`Mark this appointment as ${label}?`)) return;

  try {
    const res = await fetch(`${API}/appointments/${id}/status`, {
      method:  "PUT",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      showToast(`Appointment marked as ${status}.`, "success");
      loadDoctorAppointments();
    } else {
      showToast("Could not update appointment.", "error");
    }

  } catch (err) {
    showToast("Server error.", "error");
    console.log(err);
  }
}
// Load admin dashboard stats
async function loadDashboardStats() {
  const token = localStorage.getItem("token");
  try {
    const res  = await fetch(`${API}/admin/dashboard`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();

    document.getElementById("totalUsers").textContent        = data.totalUsers;
    document.getElementById("totalDoctors").textContent      = data.totalDoctors;
    document.getElementById("totalAppointments").textContent = data.totalAppointments;

  } catch (err) {
    console.log(err);
  }
}