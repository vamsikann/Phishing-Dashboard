# Our Dashboard Template

![Mosaic TailwindCSS template preview](https://github.com/cruip/tailwind-dashboard-template/assets/2683512/d252e308-8869-4b70-bce8-bb44071f8b2e)

Created and maintained with ❤️ by [Cruip.com](https://cruip.com/).

## Live demo

Check the live demo here 👉️ [https://mosaic.cruip.com/](https://mosaic.cruip.com/)

## Design files

If you need the design files, you can download them from Figma's Community 👉 https://bit.ly/3sigqHe

## Table of contents

* [Usage](#usage)
  * [Project setup](#project-setup)
  * [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  * [Compiles and minifies for production](#compiles-and-minifies-for-production)
  * [Customize configuration](#customize-configuration)
* [Support notes](#support-notes)            
* [Credits](#credits)
* [Terms and License](#terms-and-license)
* [About Us](#about-us)
* [Stay in the loop](#stay-in-the-loop)

## Usage

This project was bootstrapped with [Vite](https://vitejs.dev/).

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run dev
```

#### Compiles and minifies for production
```
npm run build
```

## Credits

- [Nucleo](https://nucleoapp.com/)

## Terms and License

- Released under the [GPL](https://www.gnu.org/licenses/gpl-3.0.html).
- Copyright 2020 [Cruip](https://cruip.com/).
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the template.
- Attribution is not required, although it is really appreciated.

# Cybersecurity Awareness Campaign

This project is part of a cybersecurity awareness campaign. We create quizzes on Microsoft Forms, use Power Automate to gather the data, and use an Azure gateway to gather all the user submission files (.csv) into our repository. We use Django and Flask for the backend, SQLite for the database, and React for the frontend dashboard where we display analytics about the quizzes.

## Installation

Here are the steps to install the necessary dependencies:

1. Install Python and Pip (Python's package installer): Follow the instructions on the [official Python website](https://www.python.org/).

2. Install Django: Open a terminal and run `pip install Django`

3. Install Flask: In the terminal, run `pip install Flask`

4. To use SQLite in Python, import the built-in `sqlite3` module in your script using `import sqlite3`. No additional installation is required.

5. Install Node.js and NPM:
   - On Windows or MacOS:
     - Navigate to the [Node.js official website downloads page](https://nodejs.org/en/download/).
     - Download the appropriate version for your operating system.
     - Run the downloaded installer and follow the prompts to install Node.js and NPM.
   - On Ubuntu:
     - Run the following commands in the terminal:
     - `sudo apt update`
     - `sudo apt install nodejs npm`

6. Install React: After installing Node.js and NPM, open a terminal and run `npm install -g create-react-app`

7. For all additional dependencies, please check 'requirements.txt' and install all the dependencies listed.

## Usage

Once all the dependencies are installed:

1. Open a terminal, navigate to the project directory and run `python app.py` this will start Flask backend.

2. Open another terminal, navigate to the project directory and run `npm run dev` this will start the dashboard.

3. Open the dashboard in localhost as prompted by the terminal. For example, for me it is: 'http://localhost:5173/'

The dashboard should now be running and ready to display the quiz analytics.

## Additional Guides

1. All backend scripts related to Django, Flask, and SQLite3 can be found in the root directory of the project on github.

2. All dashboard cards are in src/partials/dashboard

3. GITHUB LINK: https://github.com/vamsikann/Phishing-Dashboard

## Contact

If you have any questions, contact dpere455@fiu.edu
