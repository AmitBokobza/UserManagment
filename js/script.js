let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let eMail = document.getElementById("mailInput");
let password = document.getElementById("userPass");
let logMail = document.getElementById("logEmail");
let logPassword = document.getElementById("logPass");
let users = [];

//check storage and load if exists
if(typeof Storage !== undefined){
    if (localStorage.getItem("users")){
        users = JSON.parse(localStorage.getItem("users"));
        renderTable();
    }
}

//user object constructor
class User {
    constructor(firstName, lastName, email, pass) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.pass = pass;
        this.isLoggedIn = false;
    }
}

//pushes new user object to array
function newUser() {
    users.push(new User(fName.value, lName.value, eMail.value, password.value));
    console.log(users);

    fName.value = "";
    lName.value = "";
    eMail.value = "";
    password.value = "";

    saveArr();
    renderTable();
}

//renders the table according to the array
function renderTable() {
    document.getElementById("tableBody").innerHTML = "";

    users.forEach((user, index) => {
        document.getElementById("tableBody").innerHTML +=
            `
        <tr id="row${index}">
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.pass}</td>
        <td class="isConnect"></td>
        <td><button class="editBtn" onclick="editUser(${index})">Edit</button></td>
        <td><button class="delBtn" onclick="delUser(${index})">Delete</button></td>
        </tr>
        `;
        let connectNode = document.querySelectorAll(".isConnect");
        connectNode.forEach((node, index) => {
            if (users[index].isLoggedIn) {
                node.innerHTML = "מחובר";
                node.addEventListener('click', () => {
                    users[index].isLoggedIn = false;
                    console.log(users);

                    renderTable();
                });
                node.addEventListener('mouseover', () => {
                    node.innerHTML = "התנתקות??"
                });
                node.addEventListener("mouseout", () => {
                    node.innerHTML = "מחובר"
                })
            } else {
                node.innerHTML = "מנותק"

            }
        })
    })
};

//delete user according to index
function delUser(index) {
    users.splice(index, 1);
    console.log(users);
    saveArr();
    renderTable();
};

//connect user with right conditions
function userConnect() {
    for (user of users) {
        if (user.email == logMail.value && user.pass == logPassword.value) {
            user.isLoggedIn = true;
            console.log(users);
            renderTable();
            logMail.value = "";
            logPassword.value = "";
            return;
        };
    };
};

//add inputs to edit user
function editUser(index) {
    document.getElementById(`row${index}`).innerHTML =
        `
        <td><input class="newInput" type="text" id="editName"></td>
        <td><input class="newInput" type="text" id="editLast"></td>
        <td><input class="newInput" type="email" id="editMail"></td>
        <td><input class="newInput" type="text" id="editPass"></td>
        <td class="isConnect"></td>
        <td><button class="editBtn" onclick="saveUser(${index})">Save</button></td>
        <td><button class="delBtn" onclick="delUser(${index})">Delete</button></td>
    `;

}

//update the user to the new values and run the render table function
function saveUser(index) {
    users[index].firstName = document.getElementById("editName").value || users[index].firstName;
    users[index].lastName = document.getElementById("editLast").value || users[index].lastName;
    users[index].email = document.getElementById("editMail").value || users[index].email;
    users[index].pass = document.getElementById("editPass").value || users[index].pass;
    
    saveArr();
    renderTable();
}

//save the array to storage
function saveArr(){
    localStorage.setItem("users", JSON.stringify(users));
}