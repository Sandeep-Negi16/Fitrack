document.addEventListener('DOMContentLoaded', () => {

  // --- Page: Fitness Tracker (index.html) ---
  const trackerForm = document.getElementById('tracker-form');
  if (trackerForm) {
    const activitySelect = document.getElementById('activity');
    const durationInput = document.getElementById('duration');
    const weightInput = document.getElementById('weight');
    const resultBox = document.getElementById('result');

    const ACTIVITIES = [
      { name: 'Select an Activity...', met: 0 },
      { name: 'Running', met: 9.8 },
      { name: 'Walking', met: 3.8 },
      { name: 'Cycling', met: 4.0 },
      { name: 'Swimming', met: 7.0 },
      { name: 'Weight Lifting', met: 6.0 },
      { name: 'Yoga', met: 2.5 },
      { name: 'Jumping Jacks', met: 8.0 },
      { name: 'Hiking', met: 6.0 },
      { name: 'Aerobics (general)', met: 6.5 },
    ];

    // Populate activities dropdown
    ACTIVITIES.forEach(activity => {
      const option = document.createElement('option');
      option.value = activity.met;
      option.textContent = activity.name;
      activitySelect.appendChild(option);
    });

    trackerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const met = parseFloat(activitySelect.value);
      const duration = parseFloat(durationInput.value);
      const weight = parseFloat(weightInput.value);

      resultBox.classList.remove('show', 'error');
      
      if (met === 0) {
        showError(resultBox, 'Please select a valid activity.');
        return;
      }
      if (isNaN(duration) || duration <= 0) {
        showError(resultBox, 'Please enter a valid duration greater than 0.');
        return;
      }
      if (isNaN(weight) || weight <= 0) {
        showError(resultBox, 'Please enter a valid weight greater than 0.');
        return;
      }

      const caloriesBurned = Math.round((met * 3.5 * weight * duration) / 200);
      
      resultBox.innerHTML = `🔥 You burned approximately <strong>${caloriesBurned}</strong> kcal!`;
      resultBox.classList.add('show');
    });
  }

  // --- Page: BMI Calculator (bmi.html) ---
  const bmiForm = document.getElementById('bmi-form');
  if (bmiForm) {
    const heightInput = document.getElementById('height');
    const weightBmiInput = document.getElementById('weight-bmi');
    const resultBmiBox = document.getElementById('result-bmi');

    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightBmiInput.value);
      
      resultBmiBox.classList.remove('show', 'error');

      if (isNaN(height) || height <= 0) {
        showError(resultBmiBox, 'Please enter a valid height greater than 0.');
        return;
      }
      if (isNaN(weight) || weight <= 0) {
        showError(resultBmiBox, 'Please enter a valid weight greater than 0.');
        return;
      }

      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      
      const { category, className } = getBmiCategory(bmi);
      
      resultBmiBox.innerHTML = `Your BMI is <strong>${bmi}</strong> <span class="${className}">(${category})</span>`;
      resultBmiBox.classList.add('show');
    });
  }

  // --- Shared Helper Functions ---
  function showError(element, message) {
    element.textContent = message;
    element.classList.add('show', 'error');
  }

  function getBmiCategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', className: 'bmi-underweight' };
    if (bmi >= 18.5 && bmi <= 24.9) return { category: 'Normal weight', className: 'bmi-normal' };
    if (bmi >= 25 && bmi <= 29.9) return { category: 'Overweight', className: 'bmi-overweight' };
    return { category: 'Obesity', className: 'bmi-obesity' };
  }
});