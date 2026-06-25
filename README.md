# Workout Whisperer

Workout Whisperer is an AI-powered fitness web app that helps users generate, save, and manage personalized workout plans based on their fitness goal and experience level.

## Project Goal

The goal of Workout Whisperer is to make workout planning easier for beginners and regular users by using AI to suggest simple, safe, and structured workout plans.

## What It Does

- Provides simple login/logout authentication
- Lets users choose a fitness goal
- Lets users choose a fitness level
- Uses an LLM call to generate workout plans
- Shows AI-generated exercises, sets, reps, and safety tips
- Allows users to save generated workout plans
- Allows users to view saved workout plans
- Allows users to delete individual saved plans
- Allows users to clear all saved plans
- Stores saved plans locally in the browser
- Shows loading and error states for a better user experience

## Core Screens

- Login screen: Lets the user enter their name and access the app
- Dashboard screen: Shows the app title, logged-in user, and logout option
- AI Workout Generator screen: Lets the user choose goal and level, then ask AI for a workout
- AI Result screen: Displays the generated workout plan
- Saved Plans screen: Shows saved workout plans with delete and clear-all actions

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- OpenAI SDK
- Vercel serverless API route
- Browser local storage

## Main Features

### Authentication

The app includes simple browser-based authentication. A user enters their name to access the workout dashboard. The logged-in user is saved in local storage, so the session can remain after refreshing the page.

### AI Workout Generation

The app includes a serverless API endpoint at:

```text
api/workout.js
