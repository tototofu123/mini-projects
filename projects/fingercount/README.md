# 🖐 Finger Count Recognizer

An AI-powered application that detects and counts fingers in real-time using computer vision. This project features both a robust Python backend and a sleek web-based landing page.

## ✨ Features

- **Real-time Detection:** High-speed hand tracking and finger counting using MediaPipe.
- **Dual Hand Support:** Capable of detecting and counting fingers on both hands simultaneously.
- **Accuracy:** Optimized confidence thresholds to minimize false positives.
- **Visual Feedback:** Live video feed with overlaid landmarks and hand labels.
- **Modern Web UI:** A polished landing page showcasing the project.

## 🚀 Getting Started

### Python Version (Core)

1. **Install Dependencies:**
   `ash
   pip install opencv-python mediapipe
   `
2. **Run the Script:**
   `ash
   python finger_counter.py
   `
3. **How to use:** Position your hand(s) in front of the camera. The application will automatically detect your fingers and display the count.

### Web Landing Page

- Simply open index.html in any modern web browser to view the project showcase.

## 🛠 Technology Stack

- **Computer Vision:** OpenCV, MediaPipe.
- **Programming Language:** Python 3.x.
- **Web Frontend:** HTML5, CSS3 (Custom Properties, Flexbox).
- **CI/CD:** GitHub Actions for automated deployment.

## 📁 Project Structure

- inger_counter.py: Core Python script for real-time hand tracking and counting.
- index.html: Project landing page.
- .github/workflows/: CI/CD pipelines for metrics and deployment.