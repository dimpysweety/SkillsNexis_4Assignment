Student Management Dashboard

A responsive Student Management Dashboard built using HTML, CSS,
and JavaScript ES6.

This project is the Week 4 JavaScript Advanced Capstone and demonstrates
CRUD operations, localStorage, JSON, form validation, API Fetch, DOM
manipulation, and modern JavaScript features.

Features

Add new student records

Edit existing student records

Delete individual students

Delete all student records

Store student data in browser localStorage

Persist data after page refresh

Search students by name or email

Filter students by course

Filter students by year

Form validation for name, email, course, year, and phone

Fetch a random motivational quote from a free API

Export student data as a JSON file

Dashboard statistics

Responsive design for desktop, tablet, and mobile

Success and error toast notifications

Student initials displayed as avatars

Confirmation before deleting records

Technologies Used

HTML5

CSS3

JavaScript ES6

DOM Manipulation

Local Storage API

JSON

Fetch API

Async/Await

Array methods such as filter(), find(), findIndex(), map(),
and forEach()

Project Structure

student-management-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md

How to Run the Project

Option 1: Using VS Code Live Server

Open the project folder in Visual Studio Code.

Make sure these files are present:

index.html

style.css

script.js

Install the Live Server extension if it is not already
installed.

Right-click index.html.

Select Open with Live Server.

The dashboard will open in your browser.

Option 2: Open Directly

You can also open index.html directly in a modern browser.

For the best experience, using Live Server is recommended because the
project also demonstrates API Fetch functionality.

How to Use

1. Add a Student

Fill in:

Student Name

Email Address

Course

Year

Phone Number (optional)

Click Add Student.

The student will immediately appear in the table.

2. Edit a Student

Click the pencil icon beside a student.

The student's information will be loaded into the form.

Make the required changes and click Update Student.

3. Delete a Student

Click the trash icon beside a student.

A confirmation message will appear.

Click OK to permanently remove that student from the current browser
storage.

4. Search Students

Use the search box to search by:

Student name

Email address

The table updates automatically while typing.

5. Filter Students

Use the course and year dropdowns to filter the displayed records.

The search and filters can also be combined.

6. Export Student Data

Click Export JSON.

The application creates and downloads:

students-data.json

This demonstrates converting JavaScript data into JSON using
JSON.stringify().

7. Clear All Data

Click Clear All to remove every student record.

A confirmation is required before the data is deleted.

Local Storage

Student records are stored in the browser using:

localStorage.setItem(
    "studentDashboardData",
    JSON.stringify(students)
);

When the application starts, the stored JSON data is converted back into
a JavaScript array using:

const storedStudents =
    localStorage.getItem("studentDashboardData");

const students =
    JSON.parse(storedStudents);

Therefore, student records remain available after refreshing or
reopening the page in the same browser.

JSON

The project uses two important JSON methods:

JSON.stringify()

Converts a JavaScript object or array into a JSON string.

JSON.stringify(students);

JSON.parse()

Converts a JSON string back into a JavaScript object or array.

JSON.parse(storedStudents);

Form Validation

The student form validates the following fields:

Student Name

Cannot be empty

Must contain at least 3 characters

Email

A JavaScript regular expression checks whether the email has a valid
basic structure.

Example:

student@example.com

Course

A course must be selected.

Year

A year must be selected.

Phone

The phone number is optional, but if entered, it must contain exactly 10
digits.

API Fetch

The dashboard contains a Daily Motivation section.

It fetches a random quote from:

https://dummyjson.com/quotes/random

The JavaScript uses fetch() and async/await:

const response =
    await fetch(
        "https://dummyjson.com/quotes/random"
    );

const data =
    await response.json();

The returned quote and author are then displayed dynamically on the
page.

Clicking New Quote requests another quote from the API.

ES6 Features

This project demonstrates modern JavaScript ES6 features.

let

Used for variables whose values can change:

let students = getStudentsFromStorage();

const

Used for values that should not be reassigned:

const STORAGE_KEY = "studentDashboardData";

Arrow Functions

Examples:

const saveStudentsToStorage = () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );
};

and:

const filteredStudents =
    students.filter(student =>
        student.name
            .toLowerCase()
            .includes(searchValue)
    );

Async/Await

Used for API requests:

const loadRandomQuote = async () => {
    const response =
        await fetch(
            "https://dummyjson.com/quotes/random"
        );

    const data =
        await response.json();
};

DOM Manipulation

JavaScript dynamically updates the page using DOM methods such as:

document.getElementById()

document.createElement()

element.innerHTML

element.textContent

element.classList.add()

element.classList.remove()

Event listeners are also used for form submission, searching, filtering,
editing, deleting, and button clicks.

Week 4 Practice Questions

Question 1: Store Data in localStorage

The project stores student records in localStorage and displays them
again after a page reload.

Question 2: Validate an Email Field

The student form validates the email field using JavaScript.

Question 3: Fetch Data from a Free API

The Daily Motivation section fetches random quotes from a free API and
displays them on the page.

Question 4: Arrow Function to Filter Numbers Greater Than 50

The following example demonstrates the required arrow-function
filtering:

const numbers = [
    10,
    25,
    51,
    60,
    45,
    75,
    90,
    32
];

const numbersGreaterThan50 =
    numbers.filter(number => number > 50);

console.log(numbersGreaterThan50);

Output:

[51, 60, 75, 90]

CRUD Operations

The project implements all four basic CRUD operations:

Operation   Implementation

Create      Add a new student
Read        Display students in the table
Update      Edit an existing student
Delete      Delete a student or clear all

Dashboard Statistics

The dashboard displays:

Total number of students

Number of unique courses

Number of currently visible/filtered students

Storage type

The statistics automatically update whenever student data changes.

Browser Storage Note

The data is stored only in the browser's local storage.

This means:

No backend server is required.

No database is required.

Data is specific to the browser/device.

Clearing the browser's local storage can remove the student records.

Recommended Browser

Use a modern version of:

Google Chrome

Microsoft Edge

Mozilla Firefox

Safari

Learning Outcomes

After completing this project, the following JavaScript concepts are
demonstrated:

Variables using let and const

Arrow functions

Arrays and objects

Array methods

Functions

Events

DOM manipulation

Form handling

Form validation

Regular expressions

localStorage

JSON

Fetch API

Promises

Async/Await

CRUD operations

Dynamic HTML generation

Responsive front-end integration

Conclusion

The Student Management Dashboard is a complete front-end JavaScript
project that combines the major concepts covered during Week 4 into one
practical application.

It provides a simple way to manage student records while demonstrating
modern JavaScript, browser storage, API integration, validation, DOM
manipulation, and responsive UI development.
