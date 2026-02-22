// ==============================
// --- Initialize EmailJS ---
// ==============================
(function () {
  emailjs.init("V8DDD_4ceglL0pCO2"); // <-- Replace with YOUR EmailJS public key
})();

// ==============================
// --- Contact Form Submission ---
// ==============================
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  // --- Get values from the form ---
  const firstName = document.getElementById("firstName")?.value.trim() || "";
  const lastName = document.getElementById("lastName")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const phone = document.getElementById("phone")?.value.trim() || "";
  const subject = document.getElementById("subject")?.value.trim() || "";
  const message = document.getElementById("message")?.value.trim() || "";

  // --- Validation for required fields ---
  const requiredFields = [
    { id: "lastName", value: lastName },
    { id: "email", value: email },
    { id: "subject", value: subject },
    { id: "message", value: message }
  ];

  let valid = true;
  requiredFields.forEach(field => {
    const el = document.getElementById(field.id);
    if (!field.value) {
      el.style.borderColor = "#ff4444"; // Red for errors
      valid = false;
    } else {
      el.style.borderColor = "#28a745"; // Green if filled
    }
  });

  // --- Email format validation ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    document.getElementById("email").style.borderColor = "#ff4444";
    valid = false;
  }

  if (!valid) {
    // Scroll to first error field
    const firstError = document.querySelector(
      'input[style*="border-color: rgb(255, 68, 68)"], textarea[style*="border-color: rgb(255, 68, 68)"]'
    );
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // --- Prepare EmailJS template parameters ---
  const templateParams = {
    from_name: `${firstName} ${lastName}`,
    from_email: email,
    phone: phone,
    subject: subject,
    message: message
  };

  // --- Send email using EmailJS ---
  emailjs.send(
    "service_r5pnz4h",   // <-- Replace with YOUR EmailJS service ID
    "template_gxwgq85",  // <-- Replace with YOUR EmailJS template ID
    templateParams
  )
  .then(() => {
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.add("show");

    // Reset the form
    document.getElementById("contactForm").reset();

    // Reset border colors
    ["lastName", "email", "subject", "message"].forEach(id => {
      document.getElementById(id).style.borderColor = "#ddd";
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    alert("Failed to send message. Please try again later.");
  });
});

// --- Reset border color on input ---
document.querySelectorAll('input, textarea').forEach(element => {
  element.addEventListener('input', function() {
    this.style.borderColor = '#ddd';
  });
});

// ==============================
// --- Globe JS (Optional) ---
// ==============================
const tooltip = document.getElementById('tooltip');

const myGlobe = Globe()(document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .backgroundColor('#0d0d0d')
    .showGlobe(true)
    .polygonsTransitionDuration(300);

fetch('states.geojson')
    .then(res => res.json())
    .then(data => {
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        myGlobe.polygonsData(data.features)
            .polygonCapColor(d => colorScale(d.properties.name))
            .polygonSideColor(() => 'rgba(0,0,0,0.2)')
            .polygonStrokeColor(() => '#ffffff')
            .onPolygonHover(d => {
                if (d) {
                    tooltip.style.display = 'block';
                    tooltip.innerHTML = d.properties.name;
                } else {
                    tooltip.style.display = 'none';
                }
            });
    });

document.addEventListener('mousemove', e => {
    tooltip.style.top = (e.clientY + 15) + 'px';
    tooltip.style.left = (e.clientX + 15) + 'px';
});