  # Parking App (Capstone Project)
  ## Set up

    **1. Install NodeJs**

    You can find it here: [NodeJs]

    **2. Install dependencies**

    Go to the functions directory and run:
    ``` sh
      npm install
    ```
    This should install all the project dependencies.

    **3. Initialize project**

    Run the following commands using the provided credentials from the project's directory:
    ``` sh
      firebase login
      firebase projects:list
      firebase init
    ```
    Enable the following features:
    - Database
    - Hosting
    - Functions
    - Emulators

    **4. Obtain serviceAccount**

    You should obtain a service account from your firebase project, name it serviceAccount.json, and put it in the functions folder.

    **5. Run**

    Select an existing project and select emulators for the features created in order to test locally. Finally:
    ``` sh
      firebase use parkinglotcapstone
      firebase emulators:start
    ```
  [NodeJs]: <https://nodejs.org/en/>
