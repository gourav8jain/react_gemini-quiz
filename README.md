# AI-Powered Quiz Generator

A modern React application that generates custom quizzes using Google's Gemini AI. Built with TypeScript, Material-UI, and deployed on GitHub Pages.

## 🚀 Live Demo

**[Try the Quiz Generator →](https://gourav8jain.github.io/react_gemini-quiz)**

## 📸 Screenshot

*[Add a screenshot of your app here - you can take one from the live demo or local development]*

## ✨ Features

- **AI-Powered Quiz Generation**: Create quizzes on any topic using Google's Gemini AI
- **Customizable Settings**: Choose difficulty level, number of questions, and question types
- **Interactive Quiz Taking**: Beautiful UI with progress tracking and timer
- **Detailed Results**: Get comprehensive feedback with explanations for each answer
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern Tech Stack**: Built with React 19, TypeScript, and Material-UI

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **AI Integration**: Google Gemini AI API
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## 🎯 How It Works

1. **Generate Quiz**: Enter any topic (JavaScript, World History, Biology, etc.)
2. **Customize**: Set difficulty (Easy/Medium/Hard), number of questions (3-15), and type (Multiple Choice/True-False)
3. **Take Quiz**: Answer questions with a beautiful, interactive interface
4. **Review Results**: See your score, time taken, and detailed explanations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gourav8jain/react_gemini-quiz.git
   cd react_gemini-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your API keys:
   ```bash
   echo "REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here" > .env
   echo "REACT_APP_OPENAI_API_KEY=your_openai_api_key_here" >> .env
   ```
   
   **Important**: Replace the API keys with your actual keys:
   - **Gemini API Key**: Get one from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **OpenAI API Key**: Get one from [OpenAI Platform](https://platform.openai.com/api-keys)
   
   **Security Note**: The `.env` file is already included in `.gitignore` to prevent accidentally committing your API keys to version control.

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Deployment

This app is deployed on GitHub Pages using GitHub Actions. To deploy your own version:

### Option 1: Manual Deployment (Local Build)

1. **Fork the repository**
2. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/react_gemini-quiz"
   ```
3. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

### Option 2: Automated Deployment with GitHub Actions (Recommended)

1. **Fork the repository**
2. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/react_gemini-quiz"
   ```
3. **Set up GitHub Secrets**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Click "New repository secret" again
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (will be created automatically)
   - Folder: `/ (root)`
5. **Push to main branch** - The GitHub Action will automatically build and deploy your app

**Note**: The GitHub Actions workflow will automatically use your API keys from secrets during the build process, ensuring your deployed app works correctly. The app will try Gemini first and fall back to OpenAI if Gemini is unavailable.

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── QuizGenerator.tsx
│   ├── QuizTaker.tsx
│   └── QuizResults.tsx
├── services/           # API services
│   └── geminiService.ts
├── types/              # TypeScript type definitions
│   └── quiz.ts
└── App.tsx            # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gourav Jain**
- GitHub: [@gourav8jain](https://github.com/gourav8jain)
- Project: [React Gemini Quiz Generator](https://github.com/gourav8jain/react_gemini-quiz)

---

⭐ **Star this repository if you found it helpful!**
