# Healthcare System README [![DeepScan grade](https://deepscan.io/api/teams/23854/projects/27043/branches/864569/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23854&pid=27043&bid=864569)

## Overview

Welcome to our healthcare system! This browser-based platform is designed to address critical challenges within the healthcare sector, including efficiency, security, and accessibility. Our goal is to provide a seamless experience for users, whether they are managing their medical history, scheduling appointments, or accessing reports from various healthcare providers.

### Key Features

1. **Reservation System:**

   - Users can easily book appointments with specific conditions and preferences.
   - Seamless integration with healthcare providers' schedules ensures efficient appointment management.

2. **Medical History Management:**

   - Users can access and update their medical history, including diagnoses, treatments, and medications.
   - Secure storage and easy retrieval of medical records enhance patient care.

3. **Appointment Tracking:**

   - View upcoming appointments, receive reminders, and manage your healthcare schedule.
   - Real-time notifications keep users informed about any changes.

4. **Receipts and Reports:**

   - Access digital receipts for services rendered.
   - Retrieve detailed reports from doctors, labs, and other healthcare professionals.

5. **Clinic Management (Admin Panel):**
   - Administrators can efficiently handle reservations, allocate resources, and manage staff schedules.
   - Streamlined workflows enhance clinic operations.

## Technologies Used

### Frontend

- **React**: A powerful JavaScript library for building user interfaces.
- **TypeScript**: Provides static typing and improved tooling for JavaScript.
- **Libraries**:
- [**React**](https://github.com/facebook/react): A JavaScript library for building user interfaces. It allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple.
  - Version: `^18.2.0`
- [**TypeScript**](https://github.com/microsoft/TypeScript): An open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions. Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.
  - Version: `^5.2.2`
- [**Axios**](https://github.com/axios/axios): A promise-based HTTP client for the browser and Node.js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. It can be used in plain JavaScript or with a library such as Vue or React.
  - Version: `^1.6.8`
- [**Zustand**](https://github.com/pmndrs/zustand): A small, fast and scaleable bearbones state-management solution. Has a comfy api based on hooks, isn't boilerplatey or opinionated, but still just enough to be explicit and flux-like.
  - Version: `^4.5.2`
- [**Zod**](https://github.com/colinhacks/zod): A TypeScript-first schema declaration and validation library. It's like TypeScript and Joi had a baby. Zod schemas are a source of truth for your data model, used for validation, serialization, ORMs, and more.
  - Version: `^3.22.4`
- [**React Query**](https://github.com/tannerlinsley/react-query): A library that provides hooks for fetching, caching and updating asynchronous data in React. It helps you to sync your server state to your UI in a very flexible way.
  - Version: `^3.39.3`
- [**Framer Motion**](https://github.com/framer/motion): A production-ready motion library for React. Utilize the power behind Framer, the best prototyping tool for teams. Proudly open source.
  - Version: `^11.0.25`
- [**JWT Decode**](https://github.com/auth0/jwt-decode): A small browser library that helps decoding JWTs token which are Base64Url encoded.
  - Version: `^4.0.0`
- [**React Router DOM**](https://github.com/ReactTraining/react-router): Declarative routing for React. It helps you create a single page application with navigation without the page refreshing as the user navigates.
  - Version: `^6.22.3`
- [**SweetAlert2**](https://github.com/sweetalert2/sweetalert2): A beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes. Zero dependencies.
  - Version: `^11.6.13`
- [**@microsoft/signalr**](https://github.com/dotnet/aspnetcore/tree/main/src/SignalR): ASP.NET Core SignalR is a library for ASP.NET Core developers that makes it incredibly simple to add real-time web functionality to your applications. It's the ability to have your server-side code push content to the connected clients as it happens, in real-time.
  - Version: `^8.0.0`
- [**date-fns**](https://github.com/date-fns/date-fns): Modern JavaScript date utility library. It provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.
  - Version: `^3.6.0`
- [**apexcharts**](https://github.com/apexcharts/apexcharts.js): A modern JavaScript charting library to build interactive charts and visualizations with simple API.
  - Version: `^3.49.1`
- [**react-hook-form**](https://github.com/react-hook-form/react-hook-form): Performant, flexible and extensible forms with easy-to-use validation. It is a form library that embraces uncontrolled components and native HTML inputs.
  - Version: `^7.51.2`
  - 
### Backend

- **ASP.NET 8.0**: A robust framework for building web applications.
- **Entity Framework**: Simplifies database interactions.
- **Identity**: Provides authentication and authorization features.
- **Web API**: Exposes endpoints for frontend communication.
