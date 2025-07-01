# PilatesApp Frontend 🧘‍♀️🖥️

A modern, production-ready frontend for Pilates studio management, delivering a seamless user and admin experience for booking, managing, and overseeing Pilates training sessions. Built with React, this project is architected for clarity, maintainability, and scalability, and is designed to work with the official [PilatesApp Backend](https://github.com/kobihanoch/pilatesapp-backend).

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Connecting to the Backend](#connecting-to-the-backend)
- [Main Features](#main-features)
- [Contribution](#contribution)
- [Responsible Use](#responsible-use)
- [License](#license)
- [Contact](#contact)

---

## Project Overview ✨

PilatesApp Frontend is the user interface for a real Pilates studio management system.  
It supports all user journeys: guests (newcomers), authenticated members, and studio administrators.  
The system is structured for clear separation of concerns, robust navigation, and role-based UI, ensuring each type of user receives a tailored experience.

---

## Architecture 🏗️

The application is built in a modular, scalable fashion:

- **Component-Driven UI**:  
  All UI elements are organized in the `src/components` directory, grouped by feature (e.g., `HomeComponents`, `LoginandregisterComponents`, `Loading`).  
  This enables reuse, easier testing, and clean code separation.

- **Page-Based Routing**:  
  The `src/pages` directory is divided by user role:

  - `Admins/` (e.g., [AdminDashboard.js](https://github.com/kobihanoch/pilatesapp-frontend/blob/feature/adminpage/src/pages/Admins/AdminDashboard.js)) – Full admin dashboard for user/session management.
  - `Authenticated/` (e.g., [Home.js](https://github.com/kobihanoch/pilatesapp-frontend/blob/feature/adminpage/src/pages/Authenticated/Home.js)) – Authenticated user home and personal session management.
  - `Guests/` (e.g., [Intro.js](https://github.com/kobihanoch/pilatesapp-frontend/blob/feature/adminpage/src/pages/Guests/Intro.js), [Loginandregister.js](https://github.com/kobihanoch/pilatesapp-frontend/blob/feature/adminpage/src/pages/Guests/Loginandregister.js)) – Welcome/landing, registration, and login pages.

- **Layout Abstraction**:  
  The `src/Layouts` directory contains layout components (e.g., [AuthenticatedLayout.js](https://github.com/kobihanoch/pilatesapp-frontend/blob/feature/adminpage/src/Layouts/AuthenticatedLayout.js)), providing a consistent look and logic for each user context, reducing duplication and improving maintainability.

- **Service Layer**:  
  The `src/services` folder centralizes all API calls, keeping data-fetching logic separate from UI components.

- **State and Context Management**:  
  Shared app state is managed using React Context in `src/context`, supporting authentication, user data, and more.

- **Hooks & Utilities**:  
  Custom hooks (`src/hooks`) and utilities (`src/utils`) encapsulate logic for reuse and separation of concerns.

- **Styling**:  
  Styles are modular (per component/page) and organized under each feature, with additional shared/global styles.

---

## Tech Stack 🛠️

- **React.js** with Hooks and Context API
- **React Router** for navigation
- **Axios** for HTTP/API requests
- **CSS Modules** and custom styles
- **Jest** & **React Testing Library** for testing

---

## Installation 🚀

```bash
git clone https://github.com/kobihanoch/pilatesapp-frontend.git
cd pilatesapp-frontend
git checkout feature/adminpage
npm install
```

---

## Running the Project 🏃

```bash
npm start
```

The app will be available at `http://localhost:3000`.

---

## Connecting to the Backend 🔗

This frontend is built to work with the official PilatesApp backend:  
👉 [PilatesApp Backend](https://github.com/kobihanoch/pilatesapp-backend)

Clone and run the backend project as described in its README for full functionality (authentication, booking, admin, etc).

---

## Main Features 🌟

- **Role-Based User Experience**:

  - Guests: Welcome page, registration, and login
  - Authenticated Users: Book, view, and manage Pilates sessions, update profile, see personalized info
  - Admins: Full dashboard for managing users and sessions, with advanced tools and analytics

- **Separation of Concerns**:

  - UI, data-fetching, and business logic are clearly separated for maintainability and scalability.

- **Responsive Design**:

  - Mobile-friendly and desktop-optimized layouts.

- **Reusable Components**:

  - All visual and logic elements are modular and reusable.

- **Testing**:
  - Built-in tests for core components and logic.

---

## Contribution 🤝

Contributions are welcome!

- Fork the repo and create your branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Open a Pull Request

Please open an issue to discuss significant changes before submitting a PR.

---

## Responsible Use ⚠️

> **Warning:**  
> This code is provided for educational and development purposes only. Misuse, unauthorized deployment, or use in violation of applicable laws and regulations is strictly prohibited.  
> **Do not share, expose, or use the code for malicious or unethical purposes.**

---

## License 📝

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact 📧

For questions, suggestions, or collaboration inquiries, please contact:  
**Kobi Hanoch**  
✉️ kobikobi622@gmail.com
