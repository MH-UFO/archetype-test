# Archetype Test - Greek Mythology Quiz

A beautiful, interactive web application that helps users discover their personality archetype based on Greek mythology gods and goddesses. Users answer 70 questions across 7 personality categories and receive detailed results showing their similarity to different mythological archetypes.

## 🌟 Features

- **70-Question Personality Assessment**: Comprehensive test covering 7 personality dimensions
- **Mythological Archetypes**: Compare yourself to 8 gods/goddesses (Zeus, Apollo, Ares, Hermes, Athena, Aphrodite, Artemis, Persephone)
- **Beautiful Visualizations**: Interactive radar charts and comparison tables
- **Persian Localization**: Full Persian language support
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd archtypes
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Database Setup

1. **Create PostgreSQL Database**
   ```sql
   CREATE DATABASE archetype_test;
   ```

2. **Create Tables**
   You need to create two tables for questions:
   ```sql
   -- Male questions table
   CREATE TABLE male_questions (
       id SERIAL PRIMARY KEY,
       question_text TEXT NOT NULL,
       category VARCHAR(50) NOT NULL
   );

   -- Female questions table
   CREATE TABLE female_questions (
       id SERIAL PRIMARY KEY,
       question_text TEXT NOT NULL,
       category VARCHAR(50) NOT NULL
   );
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_NAME=archetype_test
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   PORT=3000
   ```

4. **Populate Database**
   Insert your 70 questions (35 for each gender) into the respective tables with appropriate categories:
   - dominance
   - strategy
   - creativity
   - independence
   - emotion
   - cunning
   - depth

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node index.js
   ```
   The backend/API will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   # In the root directory
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
archtypes/
├── src/
│   ├── components/          # React components
│   │   ├── Results.jsx      # Test results and visualization
│   │   ├── Test.jsx         # Main test component
│   │   ├── StarryBackground.jsx
│   │   └── ...
│   ├── styles/              # CSS stylesheets
│   │   ├── global.css       # Global styles and variables
│   │   ├── Results.css      # Results page styling
│   │   └── ...
│   └── main.jsx            # Application entry point
├── backend/
│   ├── index.js            # Express server
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── data/
│   └── Gods/
│       └── god's scores.md # Archetype scoring data
└── package.json           # Frontend dependencies
```

## 🎨 Customization

- **Colors**: Modify CSS variables in `src/styles/global.css`
- **Questions**: Update database tables with new questions
- **Archetypes**: Modify god scores in `src/components/Results.jsx`
- **Categories**: Add/remove personality dimensions by updating the category arrays

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-optimized layouts
- Touch-friendly interactions
- Adaptive typography and spacing
- Optimized chart rendering for small screens

