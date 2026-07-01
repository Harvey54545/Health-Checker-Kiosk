document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmiForm');
  const formCard = document.getElementById('formCard');
  const resultCard = document.getElementById('resultCard');
  const resetButton = document.getElementById('resetButton');

  const resultName = document.getElementById('resultName');
  const resultAvatar = document.getElementById('resultAvatar');
  const resultCategoryBadge = document.getElementById('resultCategoryBadge');
  const resultBmi = document.getElementById('resultBmi');
  const resultMessage = document.getElementById('resultMessage');
  const bmiProgressRing = document.getElementById('bmiProgressRing');

  const scaleUnder = document.getElementById('scaleUnder');
  const scaleNormal = document.getElementById('scaleNormal');
  const scaleOver = document.getElementById('scaleOver');
  const scaleObese = document.getElementById('scaleObese');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqDEZvhB727bUrpC_t9FgLFtDUPLxgfdRKmVOIRYHdkmShJxhEfjFVKgy7jK_WhHXJ/exec';

  const circumference = 2 * Math.PI * 70;

  function recordSubmission(record) {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    }).catch(err => console.error('Could not record submission:', err));
  }

  function validateFields(fieldsArray) {
    let valid = true;
    fieldsArray.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) input.setCustomValidity('');
    });

    fieldsArray.forEach(field => {
      const element = document.getElementById(field.id);
      if (!element) return;
      const value = element.value.trim();

      if (field.required && value === '') {
        element.setCustomValidity(`${field.label} is required.`);
        valid = false;
      } else if (field.type === 'number' && value !== '') {
        const num = parseFloat(value);
        if (isNaN(num)) {
          element.setCustomValidity(`${field.label} must be a number.`);
          valid = false;
        } else if (field.min !== undefined && num < field.min) {
          element.setCustomValidity(`${field.label} minimum is ${field.min}.`);
          valid = false;
        } else if (field.max !== undefined && num > field.max) {
          element.setCustomValidity(`${field.label} maximum is ${field.max}.`);
          valid = false;
        } else if (num <= 0) {
          element.setCustomValidity(`${field.label} must be positive.`);
          valid = false;
        }
      }
    });

    fieldsArray.forEach(field => {
      const input = document.getElementById(field.id);
      if (input) input.reportValidity();
    });

    return valid;
  }

  function clearActiveScales() {
    [scaleUnder, scaleNormal, scaleOver, scaleObese].forEach(el => {
      if (el) el.classList.remove('active');
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const fieldsToCheck = [
      { id: 'name', label: 'Full Name', required: true, type: 'text' },
      { id: 'age', label: 'Age', required: true, type: 'number', min: 1, max: 120 },
      { id: 'weight', label: 'Weight', required: true, type: 'number', min: 1 },
      { id: 'height', label: 'Height', required: true, type: 'number', min: 1 }
    ];

    const isValid = validateFields(fieldsToCheck);
    if (!isValid) return;

    const sexSelect = document.getElementById('sex');
    if (!sexSelect.value) {
      alert('Please select your biological sex.');
      sexSelect.focus();
      return;
    }

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const sex = sexSelect.value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
      alert('Please enter valid positive numbers for weight and height.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    let category, message, color, glowColor;
    switch (true) {
      case bmi < 18.5:
        category = 'Underweight';
        color = '#40C4FF';
        glowColor = 'rgba(64, 196, 255, 0.6)';
        message = 'Your BMI indicates you may be underweight. Consider a nutrient-rich, calorie-sufficient diet. Campus nutrition services offer free personalized meal planning to help you reach a healthy weight.';
        break;
      case bmi < 25:
        category = 'Normal';
        color = '#00E676';
        glowColor = 'rgba(0, 230, 118, 0.6)';
        message = 'Excellent! Your weight is within the healthy range. Maintain your balanced lifestyle with regular physical activity and wholesome nutrition. Preventive care is still important.';
        break;
      case bmi < 30:
        category = 'Overweight';
        color = '#FFAB40';
        glowColor = 'rgba(255, 171, 64, 0.6)';
        message = 'You may benefit from increased physical activity and mindful eating habits. The campus fitness center offers free wellness consultations and exercise programs.';
        break;
      default:
        category = 'Obese';
        color = '#FF5252';
        glowColor = 'rgba(255, 82, 82, 0.6)';
        message = 'We strongly recommend scheduling a confidential appointment with campus health services. Early support and guidance lead to the best long-term health outcomes.';
    }

    showResult(name, bmi, category, message, color, glowColor);

    const record = { name, age, sex, weight, heightCm, bmi, category };
    recordSubmission(record);
    storeLocalSubmission(record);
  });

  function showResult(name, bmi, category, message, color, glowColor) {
    resultName.textContent = name;
    resultAvatar.textContent = name.charAt(0).toUpperCase();
    resultBmi.textContent = bmi;
    resultMessage.textContent = message;
    resultCategoryBadge.textContent = category;
    resultCategoryBadge.style.backgroundColor = color;
    resultCategoryBadge.style.boxShadow = `0 0 18px ${glowColor}`;

    const maxBMI = 40;
    const progress = Math.min(bmi / maxBMI, 1);
    const offset = circumference - (progress * circumference);
    
    if (bmiProgressRing) {
      bmiProgressRing.style.strokeDasharray = circumference;
      bmiProgressRing.style.strokeDashoffset = circumference;
      
      setTimeout(() => {
        bmiProgressRing.style.stroke = color;
        bmiProgressRing.style.strokeDashoffset = offset;
      }, 100);
    }

    clearActiveScales();
    if (bmi < 18.5 && scaleUnder) scaleUnder.classList.add('active');
    else if (bmi < 25 && scaleNormal) scaleNormal.classList.add('active');
    else if (bmi < 30 && scaleOver) scaleOver.classList.add('active');
    else if (scaleObese) scaleObese.classList.add('active');

    formCard.classList.add('hidden');
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  resetButton.addEventListener('click', () => {
    form.reset();
    formCard.classList.remove('hidden');
    resultCard.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (bmiProgressRing) {
      bmiProgressRing.style.strokeDashoffset = circumference;
    }
    clearActiveScales();
    
    ['name', 'age', 'weight', 'height'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setCustomValidity('');
    });
  });

  const recentSubmissions = [];

  function storeLocalSubmission(record) {
    recentSubmissions.push(record);
    if (recentSubmissions.length > 5) {
      recentSubmissions.shift();
    }
    console.log('📋 Recent local submissions:');
    recentSubmissions.forEach((sub, index) => {
      console.log(`${index + 1}. ${sub.name} – BMI: ${sub.bmi} (${sub.category})`);
    });
  }
});