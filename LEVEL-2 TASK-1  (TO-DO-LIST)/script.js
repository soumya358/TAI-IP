let task_count = 0


const task_container = document.querySelector('#taskDiv')
const task_input = document.querySelector('#input input')
const add_task = document.querySelector('#input button')




document.addEventListener('DOMContentLoaded', () => { load_all_tasks() })


add_task.addEventListener('click', () => {
    if (task_input.value == '') {
        alert('Input is Empty')
    }
    else {
        task_count++

        let p = document.createElement('p')
        p.textContent = task_input.value
        p.classList.add('taskNo' + task_count)

        let img1 = document.createElement('img')
        img1.src = './images/tick.png'

        let img2 = document.createElement('img')
        img2.src = './images/bin.png'

        let img3 = document.createElement('img')
        img3.src = './images/edit.png'

        let button1 = document.createElement('button')
        button1.appendChild(img1)
        button1.classList.add('taskNo' + task_count)
        button1.addEventListener('click', () => { completed(button1) })

        let button2 = document.createElement('button')
        button2.appendChild(img2)
        button2.classList.add('taskNo' + task_count)
        button2.addEventListener('click', () => { delete_task(button2) })

        let button3 = document.createElement('button')
        button3.appendChild(img3)
        button3.classList.add('taskNo' + task_count)
        button3.addEventListener('click', () => { edit(p) })

        let div = document.createElement('div')
        div.appendChild(p)
        div.appendChild(button1)
        div.appendChild(button2)
        div.appendChild(button3)
        div.classList.add('taskNo' + task_count)
        div.classList.add('task')
        task_container.appendChild(div)
        task_input.value = '';
        save_to_local_storage();
    }
})













function completed(btn) {
    let targetP = document.querySelector('p.' + btn.classList[0])
    let targetDiv = document.querySelector('div.' + btn.classList[0])
    if (targetP.classList.contains('completed')) {
        targetP.classList.remove('completed')
        targetDiv.style.opacity = '1'
    }
    else {
        targetP.classList.add('completed')
        targetDiv.style.opacity = '0.5'
    }
    save_to_local_storage()
}


function delete_task(btn) {
    let delete_taskDiv = document.querySelector('div.' + btn.classList[0])
    delete_taskDiv.style.transform = "scale(.0, .0)"
    setTimeout(() => {
        delete_taskDiv.parentNode.removeChild(delete_taskDiv)
        save_to_local_storage()
    }, 1000);
}

let editP = null
function edit(targetP) {
    editP = targetP
    document.querySelector('#modiyTaskInput').style.display = 'flex'
}
function modify() {
    if (editP != null) {
        let newText = document.querySelector('#modiyTaskInput input').value
        editP.textContent = newText
        editP = null
        document.querySelector('#modiyTaskInput').style.display = 'none'
        document.querySelector('#modiyTaskInput input').value = ''
        save_to_local_storage()
    }
}




















function save_to_local_storage() {
    const alltasks = []
    const todoText = document.querySelectorAll('.task p')
    todoText.forEach(p => {
        alltasks.push({
            text: p.textContent,
            taskNo: p.classList[0],
            completed: p.classList.contains('completed')
        })
    })
    localStorage.setItem('all-tasks', JSON.stringify(alltasks))
}


function load_all_tasks() {
    const alltasks = JSON.parse(localStorage.getItem('all-tasks')) || []
    let counter = 1
    task_count = alltasks.length
    alltasks.forEach(task => {

        let p = document.createElement('p')
        p.textContent = task.text
        p.classList.add(`taskNo${counter}`)

        let img1 = document.createElement('img')
        img1.src = './images/tick.png'
        let img2 = document.createElement('img')
        img2.src = './images/bin.png'
        let img3 = document.createElement('img')
        img3.src = './images/edit.png'

        let button1 = document.createElement('button')
        button1.appendChild(img1)
        button1.classList.add(`taskNo${counter}`)
        button1.addEventListener('click', () => { completed(button1) })

        let button2 = document.createElement('button')
        button2.appendChild(img2)
        button2.classList.add(`taskNo${counter}`)
        button2.addEventListener('click', () => { delete_task(button2) })

        let button3 = document.createElement('button')
        button3.appendChild(img3)
        button3.classList.add(`taskNo${counter}`)
        button3.addEventListener('click', () => { edit(p) })

        let div = document.createElement('div')
        if (task.completed) {
            p.classList.add('completed')
            div.style.opacity = '0.5'
        }
 
        div.appendChild(p)
        div.appendChild(button1)
        div.appendChild(button2)
        div.appendChild(button3)
        div.classList.add(`taskNo${counter}`)
        div.classList.add('task')
        task_container.appendChild(div)
        save_to_local_storage()
        counter++
    })
}