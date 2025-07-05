# PetSoft - Pet daycare software

This project is built with [Next.js](https://nextjs.org/), a popular React-based framework for building server-rendered, statically generated, and performance optimized web applications.
This project has a live preview available at:

### [fudi-petsoft.vercel.app](https://fudi-petsoft.vercel.app/)

## Getting Started Locally

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Core Capabilities

#### 1. Full-Stack Application Architecture
Architected a performant, scalable, and maintainable full-stack application by leveraging the modern features of the **Next.js** App Router.
* **Server-Side Rendering (SSR) & API Routes:** Utilized SSR to deliver superior SEO performance and minimal first-paint times. Built decoupled, reusable API handlers for all backend logic.
* **Middleware:** Implemented server-side middleware for centralized concerns like authentication checks and request logging, keeping page and API logic clean.

#### 2. Intuitive & Performant Frontend
Developed a highly interactive and responsive user interface focused on an exceptional and fluid user experience.
* **Component-Driven UI:** Composed a cohesive and reusable component library using **React**, styled with **Tailwind CSS**, and accelerated with **Shadcn-ui** for rapid, consistent development.
* **Advanced State Management:** Employed React Hooks (**useState, useEffect, Context API**) to manage complex UI state efficiently, preventing prop-drilling and centralizing application-wide data.

#### 3. Advanced Asynchronous Form Handling
Engineered a cutting-edge, non-blocking form submission experience that enhances user interaction and perceived performance.
* **Optimistic UI Updates:** Implemented **Next.js Server Actions** along with `useOptimistic` to update the UI instantly, providing immediate feedback to the user before the server has responded.
* **Seamless Transitions:** Leveraged the `useTransition` hook to manage pending states gracefully, ensuring the UI remains interactive and never locks up during data mutations.
* **Robust Client-Side Validation:** Used **React Hook Form** for complex client-side state management and validation, improving accessibility and the user experience.

#### 4. End-to-End Data Integrity & Type Safety
Established a fully type-safe architecture from the database schema to the frontend components, dramatically reducing runtime errors and improving developer velocity.
* **Database Modeling & ORM:** Designed the database schema and managed all data access logic with **Prisma ORM**, which generated type-safe queries and ensured data consistency.
* **Schema & API Validation:** Deployed **Zod** to enforce strict, parseable schemas for all incoming API requests and form data, creating a secure and predictable data boundary.

#### 5. Fortified Authentication & Authorization
Architected a secure, credential-based authentication system to protect user data and control access to application resources.
* **Secure Session Management:** Integrated **Next-Auth** to handle the complete authentication lifecycle, using **JWT (JSON Web Tokens)** for stateless, secure session management across server and client components.
* **Protected Routes:** Implemented route protection strategies for both server-rendered pages and API endpoints, restricting access based on user session status.

#### 6. Secure & Reliable Payment Processing
Integrated a complete payment lifecycle solution with **Stripe**, ensuring both a seamless user checkout experience and reliable back-office data synchronization.
* **Stripe API Integration:** Managed Stripe Checkout sessions, payment intents, and customer creation directly from the Next.js backend.
* **Webhook Handling:** Built a secure and resilient **webhook** handler to process asynchronous events from Stripe (e.g., `checkout.session.completed`), guaranteeing that critical actions like order fulfillment are executed reliably.
