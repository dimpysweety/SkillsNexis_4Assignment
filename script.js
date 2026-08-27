/* =========================================
   STUDENT MANAGEMENT DASHBOARD
   JavaScript ES6
========================================= */


/* =========================================
   1. LOCAL STORAGE CONFIGURATION
========================================= */

const STORAGE_KEY = "studentDashboardData";


/* =========================================
   2. GET HTML ELEMENTS
========================================= */

const studentForm = document.getElementById("studentForm");

const studentId = document.getElementById("studentId");

const studentName = document.getElementById("studentName");

const studentEmail = document.getElementById("studentEmail");

const studentCourse = document.getElementById("studentCourse");

const studentYear = document.getElementById("studentYear");

const studentPhone = document.getElementById("studentPhone");

const submitBtn = document.getElementById("submitBtn");

const formTitle = document.getElementById("formTitle");

const resetFormBtn = document.getElementById("resetFormBtn");

const headerAddBtn = document.getElementById("headerAddBtn");

const emptyAddBtn = document.getElementById("emptyAddBtn");

const searchInput = document.getElementById("searchInput");

const courseFilter = document.getElementById("courseFilter");

const yearFilter = document.getElementById("yearFilter");

const studentTableBody = document.getElementById("studentTableBody");

const emptyState = document.getElementById("emptyState");

const totalStudents = document.getElementById("totalStudents");

const totalCourses = document.getElementById("totalCourses");

const showingStudents = document.getElementById("showingStudents");

const exportBtn = document.getElementById("exportBtn");

const clearAllBtn = document.getElementById("clearAllBtn");

const quoteBtn = document.getElementById("quoteBtn");

const quoteText = document.getElementById("quoteText");

const quoteAuthor = document.getElementById("quoteAuthor");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const toastIcon = document.getElementById("toastIcon");


/* =========================================
   3. STUDENT ARRAY
========================================= */

let students = getStudentsFromStorage();


/* =========================================
   4. LOAD STUDENTS FROM LOCAL STORAGE
========================================= */

function getStudentsFromStorage() {

    const storedStudents = localStorage.getItem(STORAGE_KEY);

    if (!storedStudents) {
        return [];
    }

    try {

        /*
         JSON.parse converts the JSON string
         back into a JavaScript array.
        */

        return JSON.parse(storedStudents);

    } catch (error) {

        console.error(
            "Error reading localStorage:",
            error
        );

        return [];
    }
}


/* =========================================
   5. SAVE STUDENTS TO LOCAL STORAGE
========================================= */

const saveStudentsToStorage = () => {

    /*
     JSON.stringify converts the JavaScript
     array into a JSON string.
    */

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );
};


/* =========================================
   6. INITIALIZE APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderStudents();

    updateDashboardStats();

    loadRandomQuote();

});


/* =========================================
   7. RENDER STUDENTS
========================================= */

const renderStudents = () => {

    const filteredStudents = getFilteredStudents();

    studentTableBody.innerHTML = "";

    if (filteredStudents.length === 0) {

        emptyState.classList.add("show");

    } else {

        emptyState.classList.remove("show");

        filteredStudents.forEach((student, index) => {

            const row = createStudentRow(
                student,
                index
            );

            studentTableBody.appendChild(row);

        });
    }

    updateDashboardStats(filteredStudents.length);
};


/* =========================================
   8. CREATE STUDENT TABLE ROW
========================================= */

const createStudentRow = (student, index) => {

    const row = document.createElement("tr");

    const initials = getInitials(student.name);

    row.innerHTML = `

        <td>
            ${index + 1}
        </td>

        <td>

            <div class="student-info">

                <div class="avatar">
                    ${initials}
                </div>

                <div>
                    <div class="student-name">
                        ${escapeHTML(student.name)}
                    </div>
                </div>

            </div>

        </td>

        <td>
            <span class="email">
                ${escapeHTML(student.email)}
            </span>
        </td>

        <td>

            <span class="course-badge">
                ${escapeHTML(student.course)}
            </span>

        </td>

        <td>

            <span class="year-badge">
                ${escapeHTML(student.year)}
            </span>

        </td>

        <td>
            ${student.phone
                ? escapeHTML(student.phone)
                : "—"
            }
        </td>

        <td>

            <div class="action-buttons">

                <button
                    class="action-btn edit-btn"
                    title="Edit student"
                    data-action="edit"
                    data-id="${student.id}"
                >
                    ✏️
                </button>

                <button
                    class="action-btn delete-btn"
                    title="Delete student"
                    data-action="delete"
                    data-id="${student.id}"
                >
                    🗑
                </button>

            </div>

        </td>
    `;

    return row;
};


/* =========================================
   9. GET FILTERED STUDENTS
========================================= */

const getFilteredStudents = () => {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedCourse =
        courseFilter.value;

    const selectedYear =
        yearFilter.value;


    return students.filter(student => {

        const matchesSearch =
            student.name
                .toLowerCase()
                .includes(searchValue)

            ||

            student.email
                .toLowerCase()
                .includes(searchValue);


        const matchesCourse =
            selectedCourse === "all"
            ||
            student.course === selectedCourse;


        const matchesYear =
            selectedYear === "all"
            ||
            student.year === selectedYear;


        return (
            matchesSearch &&
            matchesCourse &&
            matchesYear
        );

    });
};


/* =========================================
   10. UPDATE DASHBOARD STATISTICS
========================================= */

const updateDashboardStats = (visibleCount = 0) => {

    totalStudents.textContent =
        students.length;


    const uniqueCourses =
        new Set(
            students.map(
                student => student.course
            )
        );

    totalCourses.textContent =
        uniqueCourses.size;


    showingStudents.textContent =
        visibleCount;
};


/* =========================================
   11. FORM VALIDATION
========================================= */

const validateForm = () => {

    let isValid = true;


    /* Clear old errors */

    clearErrors();


    /* NAME */

    const name =
        studentName.value.trim();

    if (name === "") {

        showError(
            studentName,
            "nameError",
            "Student name is required."
        );

        isValid = false;

    } else if (name.length < 3) {

        showError(
            studentName,
            "nameError",
            "Name must contain at least 3 characters."
        );

        isValid = false;
    }


    /* EMAIL */

    const email =
        studentEmail.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        showError(
            studentEmail,
            "emailError",
            "Email address is required."
        );

        isValid = false;

    } else if (!emailPattern.test(email)) {

        showError(
            studentEmail,
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    /* COURSE */

    if (studentCourse.value === "") {

        showError(
            studentCourse,
            "courseError",
            "Please select a course."
        );

        isValid = false;
    }


    /* YEAR */

    if (studentYear.value === "") {

        showError(
            studentYear,
            "yearError",
            "Please select the student's year."
        );

        isValid = false;
    }


    /* PHONE */

    const phone =
        studentPhone.value.trim();

    const phonePattern =
        /^[0-9]{10}$/;


    if (
        phone !== "" &&
        !phonePattern.test(phone)
    ) {

        showError(
            studentPhone,
            "phoneError",
            "Phone number must contain exactly 10 digits."
        );

        isValid = false;
    }


    return isValid;
};


/* =========================================
   12. SHOW FORM ERROR
========================================= */

const showError = (
    inputElement,
    errorId,
    message
) => {

    inputElement.classList.add("invalid");

    document.getElementById(
        errorId
    ).textContent = message;
};


/* =========================================
   13. CLEAR FORM ERRORS
========================================= */

const clearErrors = () => {

    const inputs = [
        studentName,
        studentEmail,
        studentCourse,
        studentYear,
        studentPhone
    ];

    inputs.forEach(input => {

        input.classList.remove("invalid");

    });


    document.querySelectorAll(
        ".error-message"
    ).forEach(error => {

        error.textContent = "";

    });
};


/* =========================================
   14. ADD / UPDATE STUDENT
========================================= */

studentForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateForm()) {

            showToast(
                "Please fix the errors in the form.",
                "error"
            );

            return;
        }


        const existingId =
            studentId.value;


        const studentData = {

            id: existingId
                ? existingId
                : generateId(),

            name:
                studentName.value.trim(),

            email:
                studentEmail.value.trim(),

            course:
                studentCourse.value,

            year:
                studentYear.value,

            phone:
                studentPhone.value.trim()

        };


        /* EDIT EXISTING STUDENT */

        if (existingId) {

            const studentIndex =
                students.findIndex(
                    student =>
                        student.id === existingId
                );


            if (studentIndex !== -1) {

                students[studentIndex] =
                    studentData;

                showToast(
                    "Student updated successfully!",
                    "success"
                );
            }

        }

        /* ADD NEW STUDENT */

        else {

            students.push(studentData);

            showToast(
                "Student added successfully!",
                "success"
            );
        }


        /* SAVE DATA */

        saveStudentsToStorage();


        /* REFRESH UI */

        renderStudents();


        updateDashboardStats();


        /* RESET */

        resetStudentForm();


        /* SCROLL TO TABLE */

        setTimeout(() => {

            document
                .getElementById("students")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 200);

    }
);


/* =========================================
   15. GENERATE UNIQUE ID
========================================= */

const generateId = () => {

    return (
        Date.now().toString() +
        Math.random()
            .toString(16)
            .slice(2)
    );
};


/* =========================================
   16. EDIT / DELETE BUTTONS
========================================= */

studentTableBody.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;

        const id =
            button.dataset.id;


        if (action === "edit") {

            editStudent(id);

        }


        if (action === "delete") {

            deleteStudent(id);

        }

    }
);


/* =========================================
   17. EDIT STUDENT
========================================= */

const editStudent = id => {

    const student =
        students.find(
            student =>
                student.id === id
        );


    if (!student) {

        showToast(
            "Student not found.",
            "error"
        );

        return;
    }


    studentId.value =
        student.id;

    studentName.value =
        student.name;

    studentEmail.value =
        student.email;

    studentCourse.value =
        student.course;

    studentYear.value =
        student.year;

    studentPhone.value =
        student.phone;


    formTitle.textContent =
        "Edit Student";

    submitBtn.innerHTML =
        "<span>✓</span> Update Student";


    clearErrors();


    document
        .getElementById("addStudent")
        .scrollIntoView({
            behavior: "smooth"
        });


    studentName.focus();

};


/* =========================================
   18. DELETE STUDENT
========================================= */

const deleteStudent = id => {

    const student =
        students.find(
            student =>
                student.id === id
        );


    if (!student) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {
        return;
    }


    students =
        students.filter(
            student =>
                student.id !== id
        );


    saveStudentsToStorage();

    renderStudents();

    updateDashboardStats();


    showToast(
        "Student deleted successfully.",
        "success"
    );
};


/* =========================================
   19. RESET FORM
========================================= */

const resetStudentForm = () => {

    studentForm.reset();

    studentId.value = "";

    formTitle.textContent =
        "Add New Student";

    submitBtn.innerHTML =
        "<span>+</span> Add Student";

    clearErrors();
};


/* =========================================
   20. SEARCH EVENT
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        renderStudents();

    }
);


/* =========================================
   21. COURSE FILTER EVENT
========================================= */

courseFilter.addEventListener(
    "change",
    () => {

        renderStudents();

    }
);


/* =========================================
   22. YEAR FILTER EVENT
========================================= */

yearFilter.addEventListener(
    "change",
    () => {

        renderStudents();

    }
);


/* =========================================
   23. RESET FORM BUTTON
========================================= */

resetFormBtn.addEventListener(
    "click",
    () => {

        resetStudentForm();

        studentName.focus();

    }
);


/* =========================================
   24. HEADER ADD BUTTON
========================================= */

headerAddBtn.addEventListener(
    "click",
    () => {

        resetStudentForm();

        document
            .getElementById("addStudent")
            .scrollIntoView({
                behavior: "smooth"
            });

        setTimeout(() => {
            studentName.focus();
        }, 400);

    }
);


/* =========================================
   25. EMPTY STATE ADD BUTTON
========================================= */

emptyAddBtn.addEventListener(
    "click",
    () => {

        resetStudentForm();

        document
            .getElementById("addStudent")
            .scrollIntoView({
                behavior: "smooth"
            });

        setTimeout(() => {
            studentName.focus();
        }, 400);

    }
);


/* =========================================
   26. EXPORT DATA AS JSON
========================================= */

exportBtn.addEventListener(
    "click",
    () => {

        if (students.length === 0) {

            showToast(
                "There are no students to export.",
                "error"
            );

            return;
        }


        /*
         Convert JavaScript array into
         formatted JSON.
        */

        const jsonData =
            JSON.stringify(
                students,
                null,
                4
            );


        const blob =
            new Blob(
                [jsonData],
                {
                    type: "application/json"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "students-data.json";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        URL.revokeObjectURL(url);


        showToast(
            "Student data exported as JSON.",
            "success"
        );

    }
);


/* =========================================
   27. CLEAR ALL STUDENTS
========================================= */

clearAllBtn.addEventListener(
    "click",
    () => {

        if (students.length === 0) {

            showToast(
                "There are no students to delete.",
                "error"
            );

            return;
        }


        const confirmed =
            confirm(
                "Are you sure you want to delete ALL students? This cannot be undone."
            );


        if (!confirmed) {
            return;
        }


        students = [];


        saveStudentsToStorage();

        renderStudents();

        updateDashboardStats();

        resetStudentForm();


        showToast(
            "All student records have been deleted.",
            "success"
        );

    }
);


/* =========================================
   28. FETCH QUOTE FROM API
========================================= */

const loadRandomQuote = async () => {

    quoteText.textContent =
        "Loading motivational quote...";

    quoteAuthor.textContent =
        "Please wait";


    try {

        /*
         Fetch data from DummyJSON API.
        */

        const response =
            await fetch(
                "https://dummyjson.com/quotes/random"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch quote."
            );

        }


        /*
         Convert API response
         into JavaScript object.
        */

        const data =
            await response.json();


        quoteText.textContent =
            data.quote;

        quoteAuthor.textContent =
            `— ${data.author}`;


    } catch (error) {

        console.error(
            "API Error:",
            error
        );


        quoteText.textContent =
            "The future depends on what you do today.";

        quoteAuthor.textContent =
            "— Mahatma Gandhi";


        showToast(
            "Unable to load a new API quote.",
            "error"
        );

    }

};


/* =========================================
   29. NEW QUOTE BUTTON
========================================= */

quoteBtn.addEventListener(
    "click",
    () => {

        loadRandomQuote();

    }
);


/* =========================================
   30. GET INITIALS
========================================= */

const getInitials = name => {

    const words =
        name
            .trim()
            .split(" ")
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

};


/* =========================================
   31. ESCAPE HTML
   Prevents HTML injection in displayed data
========================================= */

const escapeHTML = value => {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

};


/* =========================================
   32. TOAST NOTIFICATION
========================================= */

let toastTimer;


const showToast = (
    message,
    type = "success"
) => {

    clearTimeout(toastTimer);


    toastMessage.textContent =
        message;


    if (type === "success") {

        toastIcon.textContent = "✓";

    } else {

        toastIcon.textContent = "!";
    }


    toast.className =
        `toast ${type} show`;


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

};


/* =========================================
   33. CLEAR ERRORS WHEN USER TYPES
========================================= */

[
    studentName,
    studentEmail,
    studentCourse,
    studentYear,
    studentPhone
].forEach(input => {

    input.addEventListener(
        "input",
        () => {

            input.classList.remove(
                "invalid"
            );

        }
    );

});


/* =========================================
   END OF APPLICATION
========================================= */
