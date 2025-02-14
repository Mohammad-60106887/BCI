# 🚀 BCI Project

## 📌 Overview
This project integrates **FastAPI** (backend) and **Next.js** (frontend) to interface with the Neurosity Crown for brain-computer interaction. The backend processes brainwave data and communicates with an AI model (future implementation), while the frontend provides a dashboard for users to interact with the system.

## 📂 Project Structure
```
BCI/
│── app/
│   ├── backend/  # FastAPI backend
│   │   ├── routes/  # API routes (device, actions, AI model)
│   │   ├── main.py  # FastAPI entry point
│   │   ├── database.py  # Placeholder for database connection
│   │   └── requirements.txt  # Python dependencies
│   ├── frontend/  # Next.js frontend
│   │   ├── app/  # Main Page & Components
│   │   ├── Components/  # Components for the app (ActionAssing, DeviceStatus, LogMessages)
│   │   └── next.config.js  # Next.js config
│── .gitignore  # Git ignored files
│── README.md  # Project documentation
```

---

## 🛠️ Installation
Follow these steps to set up and run the project.

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/bci-project.git
cd bci-project
```

### **2️⃣ Set Up the Backend (FastAPI)**
#### **🔹 Create a Virtual Environment (Recommended)**
```sh
cd app/backend
python -m venv .venv
.venv\Scripts\activate  # Windows
or
source .venv/bin/activate  # Mac/Linux
```

#### **🔹 Install Dependencies**
```sh
pip install -r requirements.txt
```

#### **🔹 Create a `.env` File**
Inside `app/backend/`, create a `.env` file with:
```env
NEXT_PUBLIC_DEVICE_ID=your_neurosity_device_id
NEXT_PUBLIC_EMAIL=your_email@example.com
NEXT_PUBLIC_PASSWORD=your_password
```

#### **🔹 Run FastAPI Backend**
```sh
uvicorn backend.main:app --reload
```
Visit **http://127.0.0.1:8000/docs** to see the API documentation.

---

### **3️⃣ Set Up the Frontend (Next.js)**
```sh
cd app/frontend
npm install  # Install dependencies
npm run dev  # Start the development server
```
Open **http://localhost:3000/** in your browser.

---

## 📌 Useful Commands
| Command | Description |
|---------|-------------|
| `source .venv/bin/activate` | Activate Python virtual environment (Mac/Linux) |
| `.venv\Scripts\activate` | Activate Python virtual environment (Windows) |
| `pip install -r requirements.txt` | Install Python dependencies |
| `uvicorn backend.main:app --reload` | Run FastAPI backend |
| `npm install` | Install frontend dependencies |
| `npm run dev` | Start Next.js frontend |

---

## 🚀 Future Work
- **Integrate AI Model** for EEG data processing
- **Connect to a database** to store metadata
- **Improve the UI/UX** with additional features

