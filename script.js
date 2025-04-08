const menu = document.querySelector("#menu__btn");
const navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function changeSlide(n) {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  slides[slideIndex].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  slides[slideIndex].classList.add("active");
  setInterval(() => changeSlide(1), 3000); // Auto-slide every 3 seconds
});

let slideIndex1 = 0;
const slides1 = document.querySelectorAll('.about-slide');
const totalSlides = slides1.length;
const slideInterval1 = 5000; // Time interval in milliseconds (e.g., 3000ms = 3 seconds)

function changeSlide1(n) {
  slideIndex1 = (slideIndex1 + n + totalSlides) % totalSlides; // To loop through the slides
  updateSliderPosition();
}

// Update the position of the slider to show the current slide
function updateSliderPosition() {
  const slider = document.querySelector('.about-image-slider');
  const slideWidth = slides1[0].clientWidth; // Get the width of one image
  slider.style.transform = `translateX(-${slideIndex1 * slideWidth}px)`; // Slide to the correct position
}

// Automatically change slides every 'slideInterval' milliseconds
setInterval(() => {
  changeSlide1(1); // Change to the next slide
}, slideInterval1);

// Slider for services
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".services__slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

/** Booking form logic */
function confirmBooking() {
  // Get form values
  let name = document.getElementById("name").value.trim();
  let number = document.getElementById("number").value.trim();
  let email = document.getElementById("email").value.trim();
  let date = document.getElementById("date").value;
  let timeSlot = document.getElementById("timeSlot").value;

  // Validation
  if (name === "" || number === "" || email === "" || date === "" || timeSlot === "") {
    alert("Please fill in all fields before booking.");
    return;
  }

  // Validate phone number (only digits, length 10)
  let phonePattern = /^\d{10}$/;
  if (!phonePattern.test(number)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  // Validate email
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate the date - check if it's a past date
  let selectedDate = new Date(date);
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set today's time to midnight for comparison (ignore time part)

  if (selectedDate < today) {
    alert("Please select a valid date. Past dates are not allowed.");
    return;
  }

  // Validate the time slot - check if the time slot is in the future
  let selectedTime = new Date(date + ' ' + timeSlot); // Combining date and time to create a Date object
  if (selectedTime < new Date()) {
    alert("Please select a future time slot.");
    return;
  }
// Initialize EmailJS with your Public Key
 // Replace this with your actual Public Key
  // Send email to user
  sendEmailToUser(name, email, number, date, timeSlot);

  // Send email to admin
  sendEmailToAdmin(name, email, number, date, timeSlot);
}



// Function to send email to the user
function sendEmailToUser(name, email, number, date, timeSlot) {
  // Ensure the email address is not empty
  if (!email || email.trim() === "") {
    alert("Email address is required.");
    return;
  }
    // Validate email directly inside the function
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple email regex pattern
  if (!emailPattern.test(email)) {
    alert("Invalid email address. Please check and try again.");
    return;
  }

  const userEmailTemplateParams = {
    to_email: email,
    name: name,
    number: number,
    email: email,
    date: date,
    timeSlot: timeSlot
  };

  emailjs.send("Service ID", "user Template ID", userEmailTemplateParams)
    .then((response) => {
      console.log("User email sent successfully:", response);
      showPopup(); // Show the popup after successful email
    })
    .catch((error) => {
      console.error("Error sending user email:", error);
    });
}

// Function to send email to the admin
function sendEmailToAdmin(name, email, number, date, timeSlot) {
  const adminEmailTemplateParams = {
    name: name,
    number: number,
    email: email,
    date: date,
    timeSlot: timeSlot
  };

  emailjs.send("Service ID", "Admin Template ID", adminEmailTemplateParams)
    .then((response) => {
      console.log("Admin email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending admin email:", error);
    });
}

// Show the popup message after successful email sending
function showPopup() {
  document.getElementById("popup").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  // Ensure the 'closePopupButton' element is available
  const closePopupButton = document.getElementById("closePopupButton");
  if (closePopupButton) {
    closePopupButton.onclick = closePopup; // Assign closePopup function
  } else {
    console.error("The button with ID 'closePopupButton' does not exist.");
  }
});
// Close the popup and refresh the page when OK is clicked
function closePopup() {
  document.getElementById("popup").style.display = "none";
  // Refresh the page when OK is clicked
  location.reload();
}

// Form submit handler
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form from reloading the page
      confirmBooking(); // Call the booking function
    });
  } else {
    console.error("Form with ID 'bookingForm' not found.");
  }
});

// Set the minimum date to today for the date input
const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
  dateInput.setAttribute("min", today); // Set the "min" attribute to today's date
}

// Update available time slots based on selected date
const timeSlotInput = document.getElementById("timeSlot");
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// Function to update time slots
function updateAvailableTimeSlots() {
  const selectedDate = new Date(dateInput.value);
  const currentDate = new Date();
  const timeSlotSelect = document.getElementById("timeSlot");

  // Clear existing time slots
  timeSlotSelect.innerHTML = "";

  // If no date is selected, disable the time slot dropdown
  if (!dateInput.value) {
    timeSlotSelect.disabled = true;
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Please select a date first";
    timeSlotSelect.appendChild(option);
    return;
  }

  // Enable the time slot dropdown once a date is selected
  timeSlotSelect.disabled = false;

  // Check if the selected date is today
  if (selectedDate.toDateString() === currentDate.toDateString()) {
    const currentTime = currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes());

    // Show only time slots that are greater than or equal to the current time
    timeSlots.forEach((time) => {
      if (time >= currentTime) {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        timeSlotSelect.appendChild(option);
      }
    });
  } else {
    // Show all time slots for future dates
    timeSlots.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      timeSlotSelect.appendChild(option);
    });
  }
}

// Listen for date changes to update time slots
if (dateInput) {
  dateInput.addEventListener("change", updateAvailableTimeSlots);
}

// Initial call to update time slots when page loads
updateAvailableTimeSlots();
