
document.addEventListener("DOMContentLoaded", function () {
    display()
})



function display() {
    axios.get(`http://localhost:3000/students`)
        .then(response => {
            const data = response.data
            fetchData(data)
        })
}

async function addData() {
    await search().then(result => {
        if (result) {
            console.log("success")
            alert("student exists !!!")

        } else {

            let rollno = document.getElementById("rollno").value
            let name = document.getElementById("name").value
            let age = document.getElementById("age").value
            let course = document.getElementById("course").value
            let id = Math.floor(Math.random() * 1000).toString()
            const data = { id, rollno, name, age, course };
            try {
                axios.post(`http://localhost:3000/students`, data)
                display()
            }
            catch (err) {
                console.log(err)
            }
        }
    })


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

function sortByField(field) {
    return function (a, b) {
        if (field == 'rollno' || field == 'age') {
            num1 = Number(a[field])
            num2 = Number(b[field])
        }
        else {
            num1 = a[field]
            num2 = b[field]
        }
        if (num1 > num2) {
            return 1;
        } else if (num1 < num2) {
            return -1;
        }
        else {
            return 0;
        }
    }
}

function sortAsc(str) {
    axios(`http://localhost:3000/students`)
        .then(response => {
            const data = response.data
            data.sort(sortByField(str))
            fetchData(data)
        }
        )
}

async function search() {
    ele = []
    let b = false
    let a = document.getElementById("rollno").value
    await axios.get(`http://localhost:3000/students`)
        .then(response => {
            const data = response.data
            data.forEach(element => {
                if (element.rollno == a) {
                    ele.push(element)
                    b = true
                }
            })

        })
    console.log(ele)
    fetchData(ele)
    return b
}
function fetchData(data) {
    const tableBody = document.getElementById('tb');
    tableBody.innerText = ""
    data.forEach(element => {
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
        actionCell.innerHTML = `<button onclick="edit('${element.id}')"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})"><i class='fas fa-trash-alt' style='font-size:15px'></i></button>`
        row.appendChild(actionCell)
        tableBody.appendChild(row);
    })

}


