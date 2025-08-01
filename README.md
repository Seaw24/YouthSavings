```markdown

  


YouthSavings


  Personal Finance Management for Young People
  Empowering the next generation to build strong financial habits—save smart, spend wisely, and plan for a secure future.


---

## 📝 Description

**YouthSavings** is a full-stack web app designed to help young people take control of their money. By offering intuitive tools for savings goals, emergency fund planning, and detailed transaction tracking, it fosters financial literacy in an engaging and fun way.

No more boring spreadsheets—YouthSavings delivers an interactive, visually appealing platform that guides users through managing their finances, setting realistic goals, and celebrating every saving milestone. Whether you’re building an emergency fund or tracking weekly allowances, YouthSavings helps you become financially savvy—one smart choice at a time.

---

## 🚀 Features

- 🎯 **Savings Goal Management:** Set, track, and achieve personalized savings targets with visual progress.
- 🛡️ **Emergency Fund Planning:** Build a safety net with dedicated tools and recommendations.
- 📊 **Transaction History:** Review your entire financial journey and understand your money habits.
- 🔐 **User Authentication:** Secure, magic link–enabled login for smooth access.
- ⚡ **Real-time Updates:** Dynamic data sync for a seamless experience.
- 📱 **Responsive Design:** Works beautifully on both desktop and mobile devices.
- 💾 **Reliable Data Storage:** Robust backend ensures your data is always safe.
- ⚙️ **User Settings:** Personalize your financial dashboard.

---

## 🛠️ Technologies Used

**Frontend:**
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)

**Other:**
- Magic link authentication
- RESTful API
- Security (Helmet, XSS-clean, Rate Limiting)
- Docker (optional, for deployment)

---

## ⚡ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) instance (local or remote)

### Backend Setup

```
git clone https://github.com/Seaw24/YouthSavings.git
cd YouthSavings/YouthSavingsBE
npm install
```

Create a `.env` file in `YouthSavingsBE` with:
```
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```
npm run dev
```

### Frontend Setup

```
cd ../YouthSavingsUI
npm install
```

Create a `.env` file in `YouthSavingsUI` with:
```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app!

---

## 💡 Usage

1. **Sign Up:** Create an account securely via magic link.
2. **Personalize:** Set your savings preferences in your user settings.
3. **Start Saving:** Add new savings goals or contributions.
4. **Track Progress:** Monitor your journey through the History and Summary dashboards.
5. **Emergency Fund:** Build peace of mind with dedicated emergency savings tools.

Example: Fetching your savings data via API
```
fetch('/api/fixeddata', {
  headers: { 'Authorization': 'Bearer your_token' }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🤝 Contributing

We welcome all contributors! To make YouthSavings better:

1. **Fork** this repository.
2. **Create** a feature branch: `git checkout -b feature/YourFeature`
3. **Commit** your changes: `git commit -m 'Add YourFeature'`
4. **Push** to your branch: `git push origin feature/YourFeature`
5. **Open a pull request** and share your ideas!

Please follow our coding style (TypeScript + React best practices) and include tests where possible.

---


  Made with ❤️ by a team dedicated to empowering youth with financial knowledge.

```
