# Health Self-Check Kiosk

A responsive web-based BMI screening application designed for campus walk-in kiosks. Users can privately check their Body Mass Index, receive personalized wellness recommendations, and have their data securely recorded for health staff follow-up.

---

## Table of Contents

- [The Problem It Solves](#the-problem-it-solves)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Run Locally](#how-to-run-locally)
- [How to Deploy to GitHub Pages](#how-to-deploy-to-github-pages)
- [Google Sheets Integration](#google-sheets-integration)
- [Project Structure](#project-structure)
- [BMI Classification](#bmi-classification)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Author](#author)

---

## The Problem It Solves

Many students and employees on campus have no quick, private way to check their Body Mass Index (BMI) and receive basic personalized wellness recommendations without visiting the clinic. This Health Self-Check Kiosk provides a confidential, self-service solution that computes BMI instantly from user-provided weight and height, classifies results into health categories (Underweight, Normal, Overweight, Obese), delivers tailored wellness recommendations with color-coded visual feedback, and records every submission securely to a Google Sheet for school nurses or HR to monitor and follow up with at-risk individuals.

---

## Features

The application features a visually appealing user interface with a modern glassmorphism design using a purple, white, and silver color palette, complete with floating orb animations and smooth transitions. It is fully responsive and adapts seamlessly to desktop, tablet, and mobile screen sizes using CSS Flexbox and media queries. Client-side validation checks all required fields with real-time error messages before submission. The BMI calculation uses the standard formula of weight in kilograms divided by height in meters squared. Category classification maps BMI values to Underweight, Normal, Overweight, or Obese using switch-case logic. Personalized recommendations provide tailored health guidance for each BMI category. Google Sheets integration submits form data to a Google Apps Script Web App, which appends records to a connected Google Sheet. The application is privacy-focused, with all data processed confidentially and clear messaging about data usage.

---

## Technologies Used

HTML5 provides the semantic structure and form elements. CSS3 handles styling, animations, Flexbox layout, media queries, and glassmorphism effects. JavaScript (ES6) manages form validation, BMI calculation, DOM manipulation, and control structures including if-else, switch-case, and forEach loops. Google Apps Script serves as the backend web app that receives POST requests and appends rows to Google Sheets. Google Sheets acts as a simple backend database for storing submission records. GitHub Pages hosts the live demo.

---

## How to Run Locally

First, clone the repository using the command: git clone https://github.com/your-username/health-checker-kiosk.git. Then navigate to the project folder with: cd health-checker-kiosk. To open with Live Server, install the Live Server extension in VS Code, right-click index.html, and select Open with Live Server. The app will open at http://127.0.0.1:5500/. Alternatively, you can double-click index.html to open it directly in your browser, though note that Google Sheets integration may not work when opened via the file:// protocol due to CORS restrictions.

---

## How to Deploy to GitHub Pages

Push your code to a GitHub repository named health-checker-kiosk. Go to Repository Settings, then Pages. Under Branch, select main and click Save. Wait one to two minutes for deployment. Your live site will be available at https://your-username.github.io/health-checker-kiosk/.

---

## Google Sheets Integration

To set up the integration, create a Google Sheet named BMI Kiosk Records and add headers in Row 1: Timestamp, Name, Age, Sex, Weight, Height, BMI, Category. Go to Extensions, then Apps Script, and paste the doPost function provided in the repository. Click Deploy, then New Deployment, and select Web App. Set Execute as to Me and Who has access to Anyone. Copy the Web App URL and replace YOUR_WEB_APP_URL in script.js with your deployed URL. Every time you edit the Apps Script code, create a new deployment for changes to take effect.

---

## Project Structure

The project contains index.html for the main HTML structure with semantic elements, style.css for complete styling with responsive design, script.js for BMI logic, validation, and Google Sheets integration, and README.md for project documentation.

---

## BMI Classification

BMI values below 18.5 are classified as Underweight with a blue indicator, recommending a nutrient-rich and calorie-sufficient diet. Values from 18.5 to 24.9 are classified as Normal with a green indicator, recommending maintenance of a balanced lifestyle with regular activity. Values from 25.0 to 29.9 are classified as Overweight with an orange indicator, recommending increased physical activity and mindful eating. Values of 30.0 and above are classified as Obese with a red indicator, recommending consultation with campus health services for support.

---

## Live Demo

[View Live Demo]([https://your-username.github.io/health-checker-kiosk/](https://harvey54545.github.io/Health-Checker-Kiosk/
))

Replace the link above with your actual GitHub Pages URL after deployment.

---

## Author

Harvey Laurence P. Rullan
Campus Health Self-Check Kiosk
IT Professional Elective Lab 5

---

## License

This project is created for educational purposes as part of a coursework requirement.

---

Built for campus wellness.
