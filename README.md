# Fourier Draw 🎨📐

An algorithmic drawing tool that uses **Fourier Series** and epicycles to reconstruct images from complex paths.

## 🚀 How it Works
This project takes a set of coordinates (representing a shape or drawing) and calculates the complex Fourier coefficients. It then uses these coefficients to generate a series of rotating circles (epicycles) that, when combined, "draw" the original shape.

## 🛠️ Tech Stack
- **Python 3**
- **NumPy** for complex math and FFT
- **Matplotlib** or **OpenCV** for visualization

## 📂 Project Structure
- `fourier_draw.py`: Main script for processing paths and animating epicycles.
- `requirements.txt`: List of necessary Python libraries.

## 📖 Usage
1. Provide a path or image data.
2. Run the script to see the Fourier reconstruction in real-time.
3. Adjust the number of circles to see how it affects the detail of the drawing.

## 📜 License
MIT
