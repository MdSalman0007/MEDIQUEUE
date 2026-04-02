const API = "http://localhost:6969/api";

// ============================================================
//  REGISTER PAGE — Role selector
// ============================================================

let registerRole = "patient";

function setRole(btn, r) {
  document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  registerRole = r;

  const doctorFields = ["specField", "expField", "countryField", "stateField", "cityField"];
  doctorFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("show", r === "doctor");
  });
}

// ============================================================
//  LOCATION — Register page dropdowns
// ============================================================

function loadCountries() {
  const el = document.getElementById("country");
  if (!el) return;
  el.innerHTML = '<option value="">Select Country</option>';
  for (let c in locationData) {
    el.innerHTML += `<option value="${c}">${c}</option>`;
  }
}

function loadStates() {
  const country = document.getElementById("country")?.value;
  const stateEl = document.getElementById("state");
  if (!stateEl) return;
  stateEl.innerHTML = '<option value="">Select State</option>';
  document.getElementById("city").innerHTML = '<option value="">Select City</option>';
  if (!country || !locationData[country]) return;
  for (let s in locationData[country]) {
    stateEl.innerHTML += `<option value="${s}">${s}</option>`;
  }
}

function loadCities() {
  const country = document.getElementById("country")?.value;
  const state   = document.getElementById("state")?.value;
  const cityEl  = document.getElementById("city");
  if (!cityEl) return;
  cityEl.innerHTML = '<option value="">Select City</option>';
  if (!country || !state || !locationData[country]?.[state]) return;
  locationData[country][state].forEach(c => {
    cityEl.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// ============================================================
//  LOCATION — Landing page search dropdowns
// ============================================================

function loadSearchCountries() {
  const el = document.getElementById("searchCountry");
  if (!el) return;
  el.innerHTML = '<option value="">All Countries</option>';
  for (let c in locationData) {
    el.innerHTML += `<option value="${c}">${c}</option>`;
  }
}

function updateSearchStates() {
  const country = document.getElementById("searchCountry")?.value;
  const stateEl = document.getElementById("searchState");
  const cityEl  = document.getElementById("searchCity");
  if (!stateEl) return;
  stateEl.innerHTML = '<option value="">All States</option>';
  if (cityEl) cityEl.innerHTML = '<option value="">All Cities</option>';
  if (!country || !locationData[country]) return;
  Object.keys(locationData[country]).forEach(s => {
    stateEl.innerHTML += `<option value="${s}">${s}</option>`;
  });
}

function updateSearchCities() {
  const country = document.getElementById("searchCountry")?.value;
  const state   = document.getElementById("searchState")?.value;
  const cityEl  = document.getElementById("searchCity");
  if (!cityEl) return;
  cityEl.innerHTML = '<option value="">All Cities</option>';
  if (!country || !state || !locationData[country]?.[state]) return;
  locationData[country][state].forEach(c => {
    cityEl.innerHTML += `<option value="${c}">${c}</option>`;
  });
}

// ============================================================
//  REGISTER PAGE — Password helpers
// ============================================================

function checkStrength(val) {
  const segs  = [1, 2, 3, 4].map(i => document.getElementById("s" + i));
  const label = document.getElementById("strengthLabel");
  segs.forEach(s => s.style.background = "#dce8f5");
  if (!val) { label.textContent = "Enter a password"; return; }
  let score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const colors = ["#e53e3e", "#ed8936", "#38a169", "#007bff"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  for (let i = 0; i < score; i++) segs[i].style.background = colors[score - 1];
  label.textContent = labels[score - 1] || "";
}

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

  if (role === "doctor") {
    body.specialization = document.getElementById("specialization").value;
    body.experience     = document.getElementById("experience")?.value || 0;
    body.country        = document.getElementById("country")?.value || "";
    body.state          = document.getElementById("state")?.value   || "";
    body.city           = document.getElementById("city")?.value    || "";
  }

  const res = await fetch(`${API}/auth/register`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body)
  });

  const data = await res.json();

  if (res.ok) {
    showMessage("Account created successfully! Redirecting…", "success");
    setTimeout(() => { window.location.href = "login.html"; }, 1500);
  } else {
    showMessage(data.message || "Registration failed. Try again.", "error");
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
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(data.user));

    const role = data.user.role;
    if (role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else if (role === "doctor") {
      window.location.href = "doctor-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    showMessage(data.message || "Invalid email or password.", "error");
  }
}

// ============================================================
//  PATIENT DASHBOARD — Load doctors as cards
// ============================================================

async function loadDoctors() {
  try {
    const res     = await fetch(`${API}/doctors`);
    const doctors = await res.json();

    const container = document.getElementById("doctorList");
    if (!container) return;
    container.innerHTML = "";

    // Update stat
    const statEl = document.getElementById("statDoctors");
    if (statEl) statEl.textContent = doctors.length;
    const countEl = document.getElementById("doctorCount");
    if (countEl) countEl.textContent = doctors.length + " doctors found";

    if (doctors.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-icon">👨‍⚕️</div>
          <h3>No doctors available</h3>
          <p>Please check back later.</p>
        </div>`;
      return;
    }

    doctors.forEach((doc, i) => {
      const nameParts = doc.name.replace("Dr.", "").trim().split(" ");
      const initials  = nameParts.map(n => n[0]).join("").toUpperCase().slice(0, 2);

      const card = document.createElement("div");
      card.className = "doctor-card";
      card.style.animationDelay = (i * 0.07) + "s";
      card.innerHTML = `
        <div class="doc-avatar">${initials}</div>
        <h3>${doc.name}</h3>
        <span class="spec-tag">${doc.specialization || "General Medicine"}</span>
        <div class="available-label">
          <span class="available-dot"></span> Available Now
        </div>
        <button class="book-btn" onclick="openBooking('${doc._id}', '${doc.name}')">
          📅 Book Appointment
        </button>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.log(err);
  }
}

// ============================================================
//  PATIENT DASHBOARD — Booking modal
// ============================================================

let selectedDoctor = null;
let selectedTime   = "";

function openBooking(id, name) {
  selectedDoctor = id;
  selectedTime   = "";

  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.style.display = "flex";
    generateSlots();
  }
}

function closeModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.style.display = "none";

  const overlay = document.getElementById("bookModal");
  if (overlay) overlay.classList.remove("show");
}

// Generate 20-minute time slots from 9am to 5pm
function generateSlots() {
  const container = document.getElementById("timeSlots");
  if (!container) return;
  container.innerHTML = "";

  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += 20) {
      const time = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
      const btn  = document.createElement("button");
      btn.textContent    = time;
      btn.style.margin   = "4px";
      btn.style.padding  = "6px 10px";
      btn.style.border   = "1px solid #dce8f5";
      btn.style.borderRadius = "8px";
      btn.style.cursor   = "pointer";
      btn.style.fontFamily = "'Nunito', sans-serif";
      btn.style.fontWeight = "600";

      btn.onclick = () => {
        selectedTime = time;
        document.querySelectorAll("#timeSlots button")
          .forEach(b => { b.style.background = ""; b.style.color = ""; });
        btn.style.background = "#007bff";
        btn.style.color      = "white";
      };

      container.appendChild(btn);
    }
  }
}

// Confirm and submit booking
async function confirmBooking() {
  const date  = document.getElementById("bookingDate")?.value;
  const token = localStorage.getItem("token");

  if (!date || !selectedTime) {
    showToast("Please select date and time.", "error");
    return;
  }

  try {
    const res = await fetch(`${API}/appointments`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        doctorId: selectedDoctor,
        date,
        time: selectedTime
      })
    });

    const data = await res.json();

    if (res.ok) {
      showToast("Appointment booked successfully!", "success");
      closeModal();
      loadMyAppointments(); // refresh table
    } else {
      showToast(data.message || "Booking failed.", "error");
    }

  } catch (err) {
    showToast("Server error.", "error");
    console.log(err);
  }
}

// ============================================================
//  PATIENT DASHBOARD — My Appointments table
// ============================================================

async function loadMyAppointments() {
  const token = localStorage.getItem("token");
  try {
    const res   = await fetch(`${API}/appointments/my`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const appts = await res.json();

    // Update stat count
    const statEl = document.getElementById("statAppts");
    if (statEl) statEl.textContent = appts.length;

    const countEl = document.getElementById("myApptsCount");
    if (countEl) countEl.textContent = appts.length + " total";

    const tbody = document.getElementById("myApptsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (appts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center; padding:40px; color:#6b84a0;">
            No appointments yet. Book one from the doctors list above.
          </td>
        </tr>`;
      return;
    }

    appts.forEach(appt => {
      const status    = appt.status || "pending";
      const canCancel = canCancelAppointment(appt.date, appt.time);
      const docName   = appt.doctorId?.name || "Doctor";
      const docSpec   = appt.doctorId?.specialization || "General";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${docName}</td>
        <td>${docSpec}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
        <td>
          ${status === "pending" || status === "confirmed" ? `
            ${canCancel
              ? `<button class="action-btn btn-cancel"
                   onclick="cancelMyAppointment('${appt._id}')">
                   Cancel
                 </button>`
              : `<span style="font-size:0.78rem; color:#6b84a0;">
                   Cannot cancel<br>within 2 hrs
                 </span>`
            }
          ` : "—"}
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    const tbody = document.getElementById("myApptsTableBody");
    if (tbody) tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:40px; color:#e53e3e;">
          Could not load appointments.
        </td>
      </tr>`;
    console.log(err);
  }
}

// Check if appointment is more than 2 hours away
function canCancelAppointment(date, time) {
  try {
    let apptTime = new Date(date + "T" + time);
    if (isNaN(apptTime.getTime())) apptTime = new Date(date + " " + time);
    if (isNaN(apptTime.getTime())) return true;
    const now     = new Date();
    const diffHrs = (apptTime - now) / (1000 * 60 * 60);
    return diffHrs > 2;
  } catch (e) { return true; }
}

// Patient cancel appointment
async function cancelMyAppointment(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/appointments/${id}`, {
      method:  "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ status: "cancelled" })
    });
    if (res.ok) {
      showToast("Appointment cancelled successfully.", "success");
      loadMyAppointments();
    } else {
      showToast("Could not cancel appointment.", "error");
    }
  } catch (err) {
    showToast("Server error.", "error");
  }
}

// ============================================================
//  LOGOUT
// ============================================================

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ============================================================
//  SHARED HELPERS
// ============================================================

// Show toast notification (bottom right)
function showToast(msg, type) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className   = "toast show " + type;
  setTimeout(() => t.classList.remove("show"), 3000);
}

// Show in-page message box
function showMessage(msg, type) {
  const box = document.getElementById("msgBox");
  if (!box) return;
  box.textContent = msg;
  box.style.display = "block";
  if (type === "success") {
    box.style.background = "rgba(56,161,105,0.1)";
    box.style.color      = "#38a169";
    box.style.border     = "1px solid rgba(56,161,105,0.3)";
  } else if (type === "error") {
    box.style.background = "rgba(229,62,62,0.08)";
    box.style.color      = "#e53e3e";
    box.style.border     = "1px solid rgba(229,62,62,0.2)";
  } else {
    box.style.background = "rgba(0,123,255,0.08)";
    box.style.color      = "#007bff";
    box.style.border     = "1px solid rgba(0,123,255,0.2)";
  }
  setTimeout(() => { box.style.display = "none"; }, 4000);
}

// Get 2-letter initials from name
function getInitials(name) {
  return name.replace("Dr.", "").trim()
    .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

// ============================================================
//  DOCTOR DASHBOARD — Load appointments
// ============================================================

async function loadDoctorAppointments() {
  const token = localStorage.getItem("token");
  try {
    const res   = await fetch(`${API}/appointments/doctor`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const appts = await res.json();

    const totalEl     = document.getElementById("totalAppts");
    const pendingEl   = document.getElementById("pendingAppts");
    const completedEl = document.getElementById("completedAppts");
    const cancelledEl = document.getElementById("cancelledAppts");
    const countEl     = document.getElementById("apptsCount");

    if (totalEl)     totalEl.textContent     = appts.length;
    if (pendingEl)   pendingEl.textContent   = appts.filter(a => a.status === "pending").length;
    if (completedEl) completedEl.textContent = appts.filter(a => a.status === "completed").length;
    if (cancelledEl) cancelledEl.textContent = appts.filter(a => a.status === "cancelled").length;
    if (countEl)     countEl.textContent     = appts.length + " total";

    const tbody = document.getElementById("apptsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (appts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:40px; color:#6b84a0;">
            No appointments yet.
          </td>
        </tr>`;
      return;
    }

    appts.forEach(appt => {
      const status   = appt.status || "pending";
      const patient  = appt.userId?.name || "Patient";
      const initials = patient.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="avatar">${initials}</span>${patient}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
        <td>
          ${status === "pending" || status === "confirmed" ? `
            <button class="action-btn btn-complete"
              onclick="updateStatus('${appt._id}', 'completed')">
              Complete
            </button>
            <button class="action-btn btn-cancel"
              onclick="updateStatus('${appt._id}', 'cancelled')">
              Cancel
            </button>
          ` : "—"}
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    const tbody = document.getElementById("apptsTableBody");
    if (tbody) tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:40px; color:#e53e3e;">
          Could not load appointments.
        </td>
      </tr>`;
    console.log(err);
  }
}

// Doctor: update appointment status
async function updateStatus(id, status) {
  const token = localStorage.getItem("token");
  const label = status === "completed" ? "complete" : "cancel";

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
  }
}

// ============================================================
//  ADMIN DASHBOARD — Stats
// ============================================================

async function loadDashboardStats() {
  const token = localStorage.getItem("token");
  try {
    const res  = await fetch(`${API}/admin/dashboard`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();

    const totalUsersEl  = document.getElementById("totalUsers");
    const totalDocsEl   = document.getElementById("totalDoctors");
    const totalApptsEl  = document.getElementById("totalAppointments");

    if (totalUsersEl) totalUsersEl.textContent  = data.totalUsers;
    if (totalDocsEl)  totalDocsEl.textContent   = data.totalDoctors;
    if (totalApptsEl) totalApptsEl.textContent  = data.totalAppointments;

  } catch (err) {
    console.log(err);
  }
}

// ============================================================
//  ADMIN DASHBOARD — Load users
// ============================================================

async function loadUsers() {
  const token = localStorage.getItem("token");
  try {
    const res   = await fetch(`${API}/admin/users`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const users = await res.json();

    const totalUsersEl   = document.getElementById("totalUsers");
    const usersCountEl   = document.getElementById("usersCount");
    const totalPatientsEl = document.getElementById("totalPatients");

    if (totalUsersEl)    totalUsersEl.textContent    = users.length;
    if (usersCountEl)    usersCountEl.textContent    = users.length + " total";
    if (totalPatientsEl) totalPatientsEl.textContent = users.filter(u => u.role === "patient").length;

    const tbody = document.getElementById("usersTableBody");
    if (!tbody) return;
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
          <button class="action-btn btn-delete"
            onclick="deleteUser('${u._id}', '${u.name}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    const tbody = document.getElementById("usersTableBody");
    if (tbody) tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Could not load users</td></tr>`;
    console.log(err);
  }
}

// ============================================================
//  ADMIN DASHBOARD — Load doctors
// ============================================================

async function loadDoctorsTable() {
  try {
    const res     = await fetch(`${API}/doctors`);
    const doctors = await res.json();

    const totalDocsEl  = document.getElementById("totalDoctors");
    const docsCountEl  = document.getElementById("doctorsCount");

    if (totalDocsEl) totalDocsEl.textContent = doctors.length;
    if (docsCountEl) docsCountEl.textContent = doctors.length + " total";

    const tbody = document.getElementById("doctorsTableBody");
    if (!tbody) return;
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
          <button class="action-btn btn-delete"
            onclick="deleteDoctor('${doc._id}', '${doc.name}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    const tbody = document.getElementById("doctorsTableBody");
    if (tbody) tbody.innerHTML = `<tr class="empty-row"><td colspan="4">Could not load doctors</td></tr>`;
    console.log(err);
  }
}

// ============================================================
//  ADMIN DASHBOARD — Load appointments with Cancel button
// ============================================================

async function loadAppointmentsTable() {
  const token = localStorage.getItem("token");
  try {
    const res          = await fetch(`${API}/admin/appointments`, {
      headers: { "Authorization": "Bearer " + token }
    });
    const appointments = await res.json();

    const totalApptsEl  = document.getElementById("totalAppointments");
    const apptsCountEl  = document.getElementById("appointmentsCount");

    if (totalApptsEl) totalApptsEl.textContent = appointments.length;
    if (apptsCountEl) apptsCountEl.textContent = appointments.length + " total";

    const tbody = document.getElementById("appointmentsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    if (appointments.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="6">No appointments found</td></tr>`;
      return;
    }

    appointments.forEach(appt => {
      const status  = appt.status || "pending";
      const patient = appt.userId?.name   || "Patient";
      const doctor  = appt.doctorId?.name || "Doctor";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${patient}</td>
        <td>${doctor}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td><span class="badge badge-${status}">${status}</span></td>
        <td>
          ${status === "pending" || status === "confirmed" ? `
            <button class="action-btn btn-cancel"
              onclick="adminCancelAppointment('${appt._id}', '${patient}')">
              Cancel
            </button>
          ` : "—"}
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    const tbody = document.getElementById("appointmentsTableBody");
    if (tbody) tbody.innerHTML = `<tr class="empty-row"><td colspan="6">Could not load appointments</td></tr>`;
    console.log(err);
  }
}

// ============================================================
//  ADMIN DASHBOARD — Delete actions
// ============================================================

async function deleteUser(id, name) {
  const token = localStorage.getItem("token");
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

async function deleteDoctor(id, name) {
  const token = localStorage.getItem("token");
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

async function adminCancelAppointment(id, patientName) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/appointments/${id}/status`, {
      method:  "PUT",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ status: "cancelled" })
    });
    if (res.ok) {
      showToast("Appointment cancelled.", "success");
      loadAppointmentsTable();
    } else {
      showToast("Could not cancel appointment.", "error");
    }
  } catch (err) {
    showToast("Server error.", "error");
  }
}

// ============================================================
//  LANDING PAGE — Contact form
// ============================================================

async function sendContact() {
  const name    = document.getElementById("contactName")?.value.trim();
  const email   = document.getElementById("contactEmail")?.value.trim();
  const message = document.getElementById("contactMessage")?.value.trim();
  const msgBox  = document.getElementById("contactMsg");

  if (!name || !email || !message) {
    msgBox.textContent      = "Please fill in all fields.";
    msgBox.style.display    = "block";
    msgBox.style.background = "rgba(229,62,62,0.08)";
    msgBox.style.color      = "#e53e3e";
    msgBox.style.border     = "1px solid rgba(229,62,62,0.2)";
    return;
  }

  const btn = document.querySelector(".contact-submit");
  if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

  try {
    const res  = await fetch(`${API}/contact`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name, email, message })
    });
    const data = await res.json();

    msgBox.style.display = "block";
    if (res.ok) {
      msgBox.textContent      = data.message;
      msgBox.style.background = "rgba(56,161,105,0.1)";
      msgBox.style.color      = "#38a169";
      msgBox.style.border     = "1px solid rgba(56,161,105,0.3)";
      document.getElementById("contactName").value    = "";
      document.getElementById("contactEmail").value   = "";
      document.getElementById("contactMessage").value = "";
    } else {
      msgBox.textContent      = data.message || "Failed to send.";
      msgBox.style.background = "rgba(229,62,62,0.08)";
      msgBox.style.color      = "#e53e3e";
      msgBox.style.border     = "1px solid rgba(229,62,62,0.2)";
    }
  } catch (err) {
    msgBox.textContent      = "Cannot connect to server.";
    msgBox.style.display    = "block";
    msgBox.style.background = "rgba(229,62,62,0.08)";
    msgBox.style.color      = "#e53e3e";
    msgBox.style.border     = "1px solid rgba(229,62,62,0.2)";
  }

  if (btn) { btn.textContent = "Send Message →"; btn.disabled = false; }
  setTimeout(() => { if (msgBox) msgBox.style.display = "none"; }, 4000);
}

// ============================================================
//  LANDING PAGE — Doctor search
// ============================================================

async function searchDoctorsLive() {
  const country = document.getElementById("searchCountry")?.value || "";
  const state   = document.getElementById("searchState")?.value   || "";
  const city    = document.getElementById("searchCity")?.value    || "";
  const spec    = document.getElementById("searchSpec")?.value    || "";

  try {
    const res     = await fetch(`${API}/doctors`);
    const doctors = await res.json();

    const filtered = doctors.filter(doc => {
      const matchCountry = country === "" || doc.country === country;
      const matchState   = state   === "" || doc.state   === state;
      const matchCity    = city    === "" || doc.city    === city;
      const matchSpec    = spec    === "" || doc.specialization === spec;
      return matchCountry && matchState && matchCity && matchSpec;
    });

    const results = document.getElementById("searchResults");
    const list    = document.getElementById("searchResultsList");
    if (!results || !list) return;

    results.style.display = "block";
    list.innerHTML = "";

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:#6b84a0;">
          <div style="font-size:2.5rem;margin-bottom:12px">👨‍⚕️</div>
          <h3 style="font-size:1rem;color:#1a2332;margin-bottom:8px">No doctors found</h3>
          <p style="font-size:0.875rem">Try different filters</p>
        </div>`;
      return;
    }

    filtered.forEach(doc => {
      const initials = getInitials(doc.name);
      const card = document.createElement("div");
      card.style.cssText = `background:white;padding:24px;border-radius:14px;
        box-shadow:0 4px 16px rgba(0,123,255,0.08);border:1px solid #dce8f5;`;
      card.innerHTML = `
        <div style="width:52px;height:52px;border-radius:14px;
          background:linear-gradient(135deg,#007bff,#00c2d4);
          display:flex;align-items:center;justify-content:center;
          color:white;font-size:1.1rem;font-weight:800;margin-bottom:14px;">
          ${initials}
        </div>
        <h3 style="font-size:1rem;font-weight:800;color:#1a2332;margin-bottom:6px;">
          ${doc.name}
        </h3>
        <span style="background:rgba(0,123,255,0.08);color:#007bff;
          font-size:0.75rem;font-weight:700;padding:4px 10px;
          border-radius:20px;display:inline-block;margin-bottom:10px;">
          ${doc.specialization || "General"}
        </span>
        <div style="font-size:0.82rem;color:#6b84a0;margin-bottom:4px;">
          📍 ${[doc.city, doc.state, doc.country].filter(Boolean).join(", ") || "Location not set"}
        </div>
        <div style="font-size:0.82rem;color:#6b84a0;margin-bottom:14px;">
          ${doc.experience || 0} years experience
        </div>
        <a href="login.html" style="display:block;width:100%;padding:11px;
          background:#007bff;color:white;border-radius:10px;
          text-align:center;font-weight:800;font-size:0.9rem;text-decoration:none;">
          📅 Book Appointment
        </a>
      `;
      list.appendChild(card);
    });

  } catch (err) {
    console.log(err);
  }
}

// ============================================================
//  LANDING PAGE — FAQ accordion
// ============================================================

function toggleFaq(el) {
  const item   = el.closest(".faq-item");
  const answer = item.querySelector(".faq-answer");
  const isOpen = item.classList.toggle("active");

  if (isOpen) {
    answer.style.display = "block";
    setTimeout(() => {
      item.classList.remove("active");
      answer.style.display = "none";
    }, 6000);
  } else {
    answer.style.display = "none";
  }
}

// ============================================================
//  PAGE INIT — runs on DOMContentLoaded
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  loadCountries();       // register page country dropdown
  loadSearchCountries(); // landing page search country dropdown
});

function filterByService(spec) {
  // Scroll to doctors section
  document.getElementById("doctors").scrollIntoView({
    behavior: "smooth"
  });

  // Set specialization filter
  const dropdown = document.getElementById("searchSpec");
  if (dropdown) {
    dropdown.value = spec;
  }

  // Trigger search
  searchDoctorsLive();
}