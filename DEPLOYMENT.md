# GitHub Pages Deployment Setup

## Quick Setup Guide

### 1. Set up GitHub Secrets

1. Go to your GitHub repository: `https://github.com/gourav8jain/react_gemini-quiz`
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Fill in:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyCxskWMit0V6WBJ0S-ADQYimsDYPrG3NNY`
6. Click **Add secret**
7. Click **New repository secret** again
8. Fill in:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (get from https://platform.openai.com/api-keys)
9. Click **Add secret**

### 2. Enable GitHub Pages

1. Still in **Settings**, click **Pages** in the left sidebar
2. Under **Source**, select **Deploy from a branch**
3. Under **Branch**, select **gh-pages** (will be created automatically)
4. Click **Save**

### 3. Deploy

1. Commit and push your changes to the main branch
2. The GitHub Action will automatically:
   - Build your app with the API key from secrets
   - Deploy to GitHub Pages
   - Create the `gh-pages` branch

### 4. Access Your App

Your app will be available at: `https://gourav8jain.github.io/react_gemini-quiz`

## How It Works

- The GitHub Action creates a `.env` file during build with your API keys from secrets
- The built app includes the API keys in the JavaScript bundle
- The app tries Gemini API first, then falls back to OpenAI if Gemini fails
- GitHub Pages serves the static files
- Your app works perfectly with both AI services!

## Security Note

The API keys are only included in the built JavaScript bundle, not in your source code. This is a common pattern for client-side applications that need API access. The app will automatically try Gemini first and fall back to OpenAI if needed.
