import tkinter as tk
from tkinter import filedialog, messagebox
import cv2
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# ==========================================
# 1. Fourier & Image Logic (Backend)
# ==========================================

def get_contours(image_path, skip_step):
    """Reads image and returns complex coordinates for all significant contours."""
    # Read image
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError("Could not read image file.")

    # Thresholding
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    
    if not contours:
        raise ValueError("No contours found. Try a simpler image with high contrast.")

    # Keep all contours, including holes and internal details.
    # Sorting by area draws the main outline first, then smaller details.
    contours = sorted(contours, key=cv2.contourArea, reverse=True)

    all_points = []
    for contour in contours:
        if cv2.contourArea(contour) < 1.0:
            continue

        contour_points = np.asarray(contour).reshape(-1, 2)
        contour_points = contour_points[::skip_step]

        if len(contour_points) < 2:
            continue

        all_points.append(contour_points)

    if not all_points:
        raise ValueError("No usable contours found. Try a higher-contrast image.")

    contour_points = np.vstack(all_points)

    # Convert to complex numbers (x + iy)
    # We flip 'y' because images are indexed from top-left, plots from bottom-left
    complex_signal = contour_points[:, 0] - 1j * contour_points[:, 1]
    
    return complex_signal

def compute_fourier(signal):
    """Computes DFT and returns sorted coefficients."""
    N = len(signal)
    dft = np.fft.fft(signal)
    freqs = np.fft.fftfreq(N)
    
    coeffs = []
    for k, X_k in zip(freqs, dft):
        coeffs.append({
            'freq': k,
            'amp': np.abs(X_k) / N,
            'phase': np.angle(X_k),
            'complex': X_k / N
        })
        
    # Sort by amplitude (radius) so largest circles are drawn first
    coeffs.sort(key=lambda x: x['amp'], reverse=True)
    return coeffs

def run_animation(coeffs, num_circles_to_draw, total_points):
    """Sets up and shows the matplotlib animation."""
    
    # Slice the coefficients to the user's desired amount
    coeffs = coeffs[:num_circles_to_draw]
    
    fig, ax = plt.subplots(figsize=(8, 8))
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Plot elements
    line_draw, = ax.plot([], [], 'k-', lw=2)     # The path being drawn
    circles, = ax.plot([], [], 'g-', lw=0.5, alpha=0.3) # The circles
    vectors, = ax.plot([], [], 'r-', lw=1)       # The radii lines
    
    path_x, path_y = [], []
    
    # Number of frames = number of points in original contour for a smooth loop
    num_frames = 300 
    
    def init():
        line_draw.set_data([], [])
        circles.set_data([], [])
        vectors.set_data([], [])
        return line_draw, circles, vectors

    def update(frame):
        # Time t goes from 0 to 2pi
        t_normalized = frame / num_frames
        
        # Calculate current tip position
        x, y = 0, 0
        
        circ_x = []
        circ_y = []
        vec_x = [0]
        vec_y = [0]
        
        for c in coeffs:
            prev_x, prev_y = x, y
            
            # Angle = phase + 2*pi * freq * time
            # Note: freq from fftfreq is normalized. We multiply by N (total_points)
            # to get integer harmonic number, then by t_normalized.
            angle = c['phase'] + 2 * np.pi * (c['freq'] * total_points) * t_normalized
            
            x += c['amp'] * np.cos(angle)
            y += c['amp'] * np.sin(angle)
            
            vec_x.append(x)
            vec_y.append(y)
            
            # Circle geometry for visualization
            theta = np.linspace(0, 2*np.pi, 50)
            circ_x.extend(prev_x + c['amp'] * np.cos(theta))
            circ_y.extend(prev_y + c['amp'] * np.sin(theta))
            circ_x.append(np.nan)
            circ_y.append(np.nan)

        path_x.append(x)
        path_y.append(y)
        
        line_draw.set_data(path_x, path_y)
        circles.set_data(circ_x, circ_y)
        vectors.set_data(vec_x, vec_y)
        
        # Dynamic centering
        if path_x:
            ax.set_xlim(min(path_x)-50, max(path_x)+50)
            ax.set_ylim(min(path_y)-50, max(path_y)+50)

        return line_draw, circles, vectors

    ani = animation.FuncAnimation(fig, update, frames=num_frames, 
                                  init_func=init, blit=False, interval=20)
    plt.title(f"Drawing with {num_circles_to_draw} Epicycles")
    plt.show()

# ==========================================
# 2. GUI Interface (Tkinter)
# ==========================================

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Fourier Series Artist")
        self.root.geometry("400x350")
        
        self.file_path = None
        
        # UI Elements
        tk.Label(root, text="Fourier Series Image Drawer", font=("Arial", 16, "bold")).pack(pady=10)
        
        # File Selection
        self.btn_select = tk.Button(root, text="1. Select Image", command=self.select_file, bg="#ddd", height=2)
        self.btn_select.pack(pady=5, fill=tk.X, padx=20)
        
        self.lbl_file = tk.Label(root, text="No file selected", fg="gray")
        self.lbl_file.pack()
        
        # Settings
        tk.Label(root, text="Number of Circles (Detail):").pack(pady=(15,0))
        self.slider_circles = tk.Scale(root, from_=10, to=500, orient=tk.HORIZONTAL)
        self.slider_circles.set(100) # Default
        self.slider_circles.pack(fill=tk.X, padx=20)
        
        tk.Label(root, text="Skip Points (Speed vs Accuracy):").pack(pady=(10,0))
        self.slider_skip = tk.Scale(root, from_=1, to=20, orient=tk.HORIZONTAL)
        self.slider_skip.set(5) # Default
        self.slider_skip.pack(fill=tk.X, padx=20)
        
        # Run Button
        self.btn_run = tk.Button(root, text="2. Draw!", command=self.process, bg="#4CAF50", fg="white", font=("Arial", 12, "bold"), height=2)
        self.btn_run.pack(pady=20, fill=tk.X, padx=20)
        
    def select_file(self):
        filename = filedialog.askopenfilename(title="Select Image", 
                                              filetypes=[("Images", "*.jpg *.jpeg *.png *.bmp")])
        if filename:
            self.file_path = filename
            # Show just the filename, not full path
            display_name = filename.split('/')[-1]
            self.lbl_file.config(text=f"Selected: {display_name}", fg="black")
            
    def process(self):
        if not self.file_path:
            messagebox.showwarning("Warning", "Please select an image first!")
            return
            
        try:
            skip = self.slider_skip.get()
            num_circles = self.slider_circles.get()
            
            # 1. Process Image
            self.lbl_file.config(text="Processing...", fg="blue")
            self.root.update()
            
            coords = get_contours(self.file_path, skip)
            
            # 2. Compute Fourier
            coeffs = compute_fourier(coords)
            
            # 3. Animate
            self.lbl_file.config(text="Drawing!", fg="green")
            run_animation(coeffs, num_circles, len(coords))
            
            # Reset label after window closes
            self.lbl_file.config(text=f"Done. Select new image?", fg="black")
            
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred:\n{str(e)}")
            self.lbl_file.config(text="Error", fg="red")

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()