# Yumflix — Food Video Sharing Platform 🍽️🎥

Welcome to **Yumflix**, a platform where passionate food partners can create accounts, upload cooking videos, and share their culinary delights with users who can watch, like, save, and explore partner profiles.

***

## Project Journey 🚀

This project was a rewarding journey of learning and problem-solving. Starting from scratch, the goal was to build a smooth, interactive, and SEO-friendly web app that handles real-time video content and user interactions seamlessly both on frontend and backend.

Along the way, challenges such as managing asynchronous calls, handling authentication with secure cross-domain cookies, optimizing performance with lazy loading and Intersection Observer, and ensuring SEO best practices pushed the boundaries of the project. Iterative debugging of CORS issues, token-based auth flows, and deployment configurations taught invaluable lessons.

***

## Tech Stack 🛠️

- **Frontend:** React, React Router, Axios, React Helmet, Intersection Observer API, React.memo and Suspense for optimization  
- **Backend:** Node.js, Express.js, MongoDB, JWT for authentication, CORS handling, cookie-parser  
- **Deployment:** Render.com for hosting both frontend and backend, managing environment variables, SSL, and cross-origin setups

***

## Problems & Solutions 🔧

- **Cross-Origin Authentication:** Cookies blocked due to `SameSite` policy required setting `SameSite='None'` and `Secure=true` on cookies along with HTTPS deployment.  
- **CORS Configuration:** Dynamically validating allowed origins with correct credentials support fixed blocked requests.  
- **Performance Optimization:** Implemented lazy loading, React Suspense, and memoization to speed up load times and reduce unnecessary renders. Videos load only on view using Intersection Observer.  
- **SEO:** Added dynamic meta tags per route with React Helmet for better search engine visibility.  
- **Deployment Issues:** Learned importance of `npm run build`, correct static serving, and routing fallback setups for SPA deployment.

***

## Learnings 📚

This project strengthened skills in full-stack development, learned real-world handling of authentication and security on modern web apps, deepened knowledge of React optimization patterns, and gained hands-on experience in deploying production-ready apps on cloud platforms.

Building a cohesive, user-friendly, and performant platform while tackling practical challenges has been an enriching and fulfilling developer experience.

***

Thank you for checking out Yumflix! 🍜✨  
