# 🚀 EduConnect: Smart Academic Administration of School Database

# About the project

EduConnect is a comprehensive educational platform designed to foster seamless communication and 
collaboration among administrators, teachers, and students. This project utilizes SQL for structured data 
management and MongoDB for flexible chat functionalities, creating an integrated ecosystem to enhance 
the educational experience. EduConnect provides user authentication mechanisms, allowing secure access 
for administrators, teachers, and students. Dynamic user profiles enable individuals to manage personal 
information, educational backgrounds, and profile pictures. The platform offers academic management 
tools, allowing teachers to create, manage, and grade question papers, while students can access their test 
results, percentages, and grades.
Communication tools, powered by MongoDB, facilitate real-time interactions between students and 
counsellors. Video conferencing capabilities enable teachers to initiate virtual classrooms, enhancing 
direct interaction and doubt resolution. Administration tools empower administrators to manage users, 
post notices, and link teachers with students for effective organizational control.

# Technologies Used
## Frontend 
* **HTML**
* **CSS**
* **Javascript**
* **ReactJS**
* **Redux**

## Backend 
* **NodeJS** -> For website
* **Flask**  -> For NLP implementation

## Databases
Any of the database can be used. Code for both the database is available
* **MySQL**
* **MongoDB**

## NLP 
* **Detect Offensive Language Implementation**
* For more Details on this Code is provided here

   🔗🔗(https://github.com/Dhanush333S/offensive-language-detection)


# Images of the Website
## Home Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/09f4c4d4-255d-4562-96e1-02d89d5cb4ae)
## Add Teacher Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/760bae28-f0a2-491d-b866-24717f2f3651)
## Manage Students and Teacher Assign Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/20cce07e-8c51-440e-aa83-15e64aa325a9)
## Profile
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/955affc1-0aae-4985-9da9-721e2ec2d2b8)
## Ask Doubt Section
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/0111db9f-df98-478e-b261-01821e8c8e19)
## Doubts View Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/27e7ec07-b0ae-4372-b26d-d6ff92672a48)
## Question Paper and Student Score Upload Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/b741d605-326e-4f28-a636-a0dacf8bff40)
## Test Report Page
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/0eee39de-1d30-4707-a385-815d88fe3762)
## Chat Section
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/7db3cf87-d594-446d-ba1f-a4b862965b01)
## One-to-One Video Call 
  ![image](https://github.com/SMOHAMMEDASHIQ/educonnect-classroom/assets/105161538/323c0c9d-59e4-4fad-9efb-a960ded7604f)
  

# Installation Guidlines
## Backend Setup

1.**Add .env file inside educonnect-frontend folder containing connection link to backend**
   Example:
   
   > REACT_APP_API_URL="http://localhost:5000"

2.**Navigate to the backend directory**
   
   > cd path/to/backend

3.**Install the necessary packages**

   >npm install
   
4.**If the packages are not installed, you can initialize them**
  
   >npm init

5.**Run the backend Code**
   
   >nodemon index.js
>
   or
>
   >node index.js

## Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd path/to/frontend
2. **Install the necessary packages**
   ```bash
   npm install
3. **Run the frontend code**
   ```bash
   npm run start

## AIML Integration

1. **Neglect AIML Integration if it is not of concern**
      It is extra feature added to the project to avoid someone from commiting offensive comments.
     
3. **Navigate to the `AIML-integrate` folder**
   ```bash
   cd path/to/AIML-integrate
   
3. **Copy the model file and the dataset file**
   ```bash
    Model/logistic_regression_model.joblib
    Dataset/modified_train.csv
4. **Modify the `flask_app.py` code to ensure it points to the correct paths for the model and the dataset**
    ```bash
   python ./flask_app.py
5. **Make sure to replace "localhost:8000" with backend link in React frontend on which flask is running**

