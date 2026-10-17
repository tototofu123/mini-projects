# 🎨 Fourier Draw: Mathematical Epicycles

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white&style=flat-square)](https://www.python.org/)
[![NumPy](https://img.shields.io/badge/NumPy-1.2x-013243?logo=numpy&logoColor=white&style=flat-square)](https://numpy.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8?logo=opencv&logoColor=white&style=flat-square)](https://opencv.org/)
[![Matplotlib](https://img.shields.io/badge/Matplotlib-3.x-11557c?style=flat-square)](https://matplotlib.org/)

An algorithmic drawing engine that utilizes the **Discrete Fourier Transform (DFT)** to decompose complex paths into a series of rotating circles, or **epicycles**. By calculating complex Fourier coefficients, the tool can reconstruct any closed loop path with mathematical precision.

## 🧠 How it Works

1. **Path Mapping**: The tool takes a set of 2D coordinates representing a shape.
2. **Complex Transformation**: Each coordinate $(x, y)$ is treated as a complex number $x + iy$.
3. **Discrete Fourier Transform**: The script applies the DFT to these complex numbers to calculate the frequency, amplitude, and phase for a set of rotating vectors.
4. **Epicycle Animation**: These vectors are visualized as a chain of connected circles (epicycles). As they rotate, the tip of the final vector traces out the original path.

## ✨ Key Features

- **📐 Precise Reconstruction**: Decompose any hand-drawn or generated path into its mathematical components.
- **🔄 Real-time Visualization**: Watch the epicycles rotate and draw the path frame-by-frame using OpenCV or Matplotlib.
- **🎛️ Variable Detail**: Control the number of Fourier coefficients used. Fewer coefficients result in a simplified, "abstract" version of the shape, while more coefficients provide 1:1 fidelity.
- **🧪 Math-Driven Art**: A perfect bridge between signal processing concepts and generative art.

## 🚀 Getting Started

1. **Clone the Repo:**
   ```bash
   gh repo clone tototofu123/fourier_draw
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Simulation:**
   ```bash
   python fourier_draw.py
   ```

## 📜 License

This project is licensed under the MIT License.

---
*Developed as an exploration of Fourier analysis in generative art. Updated 17-05-2026.*
