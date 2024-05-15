document.addEventListener("DOMContentLoaded", function () {
    display()
    // document.getElementById()
})



function display() {
    const tableBody = document.getElementById('tb');
    axios.get(`http://localhost:3000/students`)
        .then(response => {
            const data = response.data
            tableBody.innerText = ""
            data.forEach(element => {
                console.log("success")
                const row = document.createElement('tr');

                const rollNoCell = document.createElement('td');
                rollNoCell.textContent = element.rollno;
                row.appendChild(rollNoCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = element.name;
                row.appendChild(nameCell);

                const ageCell = document.createElement('td');
                ageCell.textContent = element.age;
                row.appendChild(ageCell);

                const courseCell = document.createElement('td');
                courseCell.textContent = element.course;
                row.appendChild(courseCell);

                const actionCell = document.createElement('td');
                actionCell.innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})"><i class='fas fa-trash-alt' style='font-size:15px'></i></button>`
                row.appendChild(actionCell)

                tableBody.appendChild(row);
            });
        })
}

async function addData() {
    let rollno = document.getElementById("rollno").value
    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let course = document.getElementById("course").value
    let id = Math.floor(Math.random() * 1000).toString()
    const data = { id, rollno, name, age, course };
    try {
        await axios.post(`http://localhost:3000/students`, data)
        display()
    }
    catch (err) {
        console.log(err)
    }


}

function deleteData(id) {
    axios.delete(`http://localhost:3000/students/${id}`)
        .then(response => console.log("success"))
}
function edit(id) {
    data = {}
    let rollno = document.getElementById("rollno").value
    if (rollno != null && rollno != '') {
        data.rollno = rollno
    }
    let name = document.getElementById("name").value
    if (name != null && name != '') {
        data.name = name
    }

    let age = document.getElementById("age").value
    if (age != null && age != '') {
        data.age = age
    }
    let course = document.getElementById("course").value
    if (course != null && course != '') {
        data.course = course
    }
    axios.patch(`http://localhost:3000/students/${id}`, data)
        .then(response => console.log("success1"))




}

// function edit(id) {
//     let name = document.getElementById("name").value
//     axios.patch(`http://localhost:3000/students/${id}`, { "name": name })
//         .then(response => console.log(response.data))
// }

