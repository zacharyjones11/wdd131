// Initialize the current participant count
let participantCount = 1;

// Function to create a template for a new participant section
function participantTemplate(count) {
    return `
    <section class="participant${count}">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname${count}"> First Name<span>*</span></label>
          <input id="fname${count}" type="text" name="fname${count}" value="" required />
        </div>
        <div class="item activities">
          <label for="activity${count}">Activity #<span>*</span></label>
          <input id="activity${count}" type="text" name="activity${count}" />
        </div>
        <div class="item">
          <label for="fee${count}">Fee ($)<span>*</span></label>
          <input id="fee${count}" type="number" name="fee${count}" />
        </div>
        <div class="item">
          <label for="date${count}">Desired Date <span>*</span></label>
          <input id="date${count}" type="date" name="date${count}" />
        </div>
        <div class="item">
          <p>Grade</p>
          <select id="grade${count}">
            <option selected value="" disabled></option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
    </section>`;
}

// Add event listener for the "Add Participant" button
const addButton = document.getElementById("add");
addButton.addEventListener("click", function () {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
});

// Function to calculate the total fees
function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements]; // Convert NodeList to an Array
    return feeElements.reduce((total, feeElement) => {
        return total + (parseFloat(feeElement.value) || 0); // Add fee value or 0 if empty
    }, 0);
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const total = totalFees();
    const adultName = document.getElementById("adult_name").value;
    const summaryElement = document.getElementById("summary");
    const formElement = document.querySelector("form");

    // Hide the form and show the summary message
    formElement.style.display = "none";
    summaryElement.innerHTML = `
        <p>Thank you ${adultName} for registering. You have registered ${participantCount} participant(s) and owe $${total} in Fees.</p>
    `;
    summaryElement.style.display = "block";
}

// Add event listener for the form submission
const registerForm = document.querySelector("form");
registerForm.addEventListener("submit", submitForm);
