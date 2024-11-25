document.addEventListener('DOMContentLoaded', function () {
    const householdList = [];
    const householdElement = document.querySelector('.household');
    const debugElement = document.querySelector('.debug');
    const form = document.querySelector('form');
    const ageInput = document.getElementById('age');
    const relationshipInput = document.getElementById('rel');
    const smokerInput = document.getElementById('smoker');

    // Function to render household list
    function renderHousehold() {
        householdElement.innerHTML = '';
        householdList.forEach((member, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('box', 'mb-3', 'has-background-light');
            listItem.innerHTML = `
                <span>
                    <strong>Age:</strong> ${member.age} 
                    | <strong>Relationship:</strong> ${member.relationship} 
                    | <strong>Smoker:</strong> ${member.smoker ? 'Yes' : 'No'}
                </span>
                <button 
                    class="delete is-small is-danger" 
                    aria-label="Remove member"
                    data-index="${index}">
                </button>`;
            householdElement.appendChild(listItem);
        });
    }

    // Function to validate inputs
    function validateInputs() {
        const age = parseInt(ageInput.value, 10);
        const relationship = relationshipInput.value;

        if (!age || age <= 0) {
            alert('Please enter a valid age greater than 0.');
            return false;
        }

        if (!relationship) {
            alert('Please select a relationship.');
            return false;
        }

        return true;
    }

    // Add event listener for adding household member
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const action = event.submitter.textContent.trim().toLowerCase();

        if (action === 'add') {
            if (!validateInputs()) return;

            const newMember = {
                age: parseInt(ageInput.value, 10),
                relationship: relationshipInput.value,
                smoker: smokerInput.checked,
            };

            householdList.push(newMember);
            renderHousehold();

            // Reset form fields
            form.reset();
        } else if (action === 'submit') {
            // Serialize household data to JSON
            debugElement.textContent = JSON.stringify(householdList, null, 2);
            debugElement.style.display = 'block';
        }
    });

    // Remove household member
    householdElement.addEventListener('click', function (event) {
        if (event.target.matches('.delete')) {
            const index = event.target.getAttribute('data-index');
            householdList.splice(index, 1);
            renderHousehold();
        }
    });
});
