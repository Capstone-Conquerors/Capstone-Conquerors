# Parking App (Capstone Project)
## Set up
  **1. Install NodeJs**
  You can find it here: https://nodejs.org/en/

  **2. Install Firebase**
  Run the following commands on terminal:
  ```
    npm install firebase
    npm install firebase-tools
  ```

  **3. Initialize project**
  Run the following commands using the provided credentials from the project's directory:
  ```
    firebase login
    firebase projects:list
    firebase init
  ```
  Enable the following features:
  - Database
  - Hosting
  - Functions
  - Emulators
  Select an existing project and select emulators for the features created in order to test locally. Finally:
  ```
    firebase use parkinglotcapstone
    firebase serve
  ```
