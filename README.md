# Countdown App

The Countdown App is a responsive and dynamic application built with Angular. It allows users to
define an event by specifying its name and end date. Once set, the app displays a live countdown
(Days, Hours, Minutes, Seconds) until the event occurs. The display text automatically scales to
fill the full width of the screen, regardless of device orientation, thanks to a custom fit-text
directive.

## Features

- **Responsive Design:** Works seamlessly in both portrait and landscape modes.
- **Dynamic Countdown:** Displays a live countdown timer that updates every second.
- **Adaptive Text Sizing:** Utilizes a custom directive to resize text dynamically, ensuring it
  fills the entire screen width.
- **State Persistence:** Saves the event name and end date in localStorage, ensuring they persist
  between page reloads.
- **Form Submission:** Adds a submit button for the form with inputs for event name and end date.
  This ensures that users explicitly confirm their inputs, preventing accidental submissions and
  only updating the countdown when the data is finalized.
- **Input Character Limit:** Restricts the event name input to 50 characters to maintain design
  consistency and readability, preventing layout issues caused by overly long event names.

## Live Demo

A live version of the app is available at:  
[https://event-countdown-mobile-app.netlify.app/](https://event-countdown-mobile-app.netlify.app/)

## Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/DinaraDemi/FrontendChallenge.git
cd countdown-app
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
ng serve
```

Open your browser and navigate to http://localhost:4200/ to see the app in action.

## Suggestions for Improvement

### Progressive Web App (PWA) Support

Enhance the mobile experience by making the app installable and functional offline. This involves:

- Integrating a service worker to cache assets and data
- Configuring a web app manifest for home screen installation
- Ensuring compatibility across various devices and browsers

### Enhanced Error Handling

Improve the user experience and simplify debugging by implementing robust error handling:

- Establish global error boundaries to catch runtime errors
- Log errors using centralized services (e.g., Sentry)
- Provide user-friendly error messages and fallback interfaces

### Smooth Animations

Create a more engaging and responsive UI by incorporating subtle animations, particularly for
dynamic elements like the event name and timer:

- Use CSS transitions or animation libraries (e.g., Framer Motion)
- Ensure smooth transitions without affecting performance

### Accessibility Improvements

Make the app more inclusive by following accessibility best practices:

- Conduct accessibility audits with tools like Axe or Lighthouse
- Apply proper semantic HTML and ARIA roles
- Test with screen readers and keyboard navigation

### Automated Testing

Enhance reliability by integrating automated tests into the development pipeline:

- Implement unit, integration, and end-to-end tests
- Ensure tests run as part of the CI/CD process

### Enhanced Documentation

Improve maintenance and onboarding with clear and up-to-date documentation:

- Provide a developer guide covering setup, deployment, and troubleshooting
- Explain key architectural decisions for future improvements

### Security Enhancements

Protect user data and maintain application integrity by addressing security risks:

- Conduct security audits and implement best practices
- Use input validation and encryption where needed
- Keep dependencies updated and monitor security advisories

### User Feedback and Analytics

Refine the app based on real-world usage by integrating feedback and analytics:

- Track user interactions to understand behavior
- Provide in-app channels for users to report issues or suggest features

By implementing these improvements, the Countdown App will become more robust, user-friendly, and
production-ready.
