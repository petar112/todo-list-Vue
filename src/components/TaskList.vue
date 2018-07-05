<template>
    <div class="container-fluid">        
        <ul class="list-group">
            <li class="list-group-item">
                <div class="input-group">
                    <input type="text" id="input" v-model="newTask" @keyup.enter="addTask" v-focus class="form-control" placeholder="Task List Item" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button @click="addTask" :title="title" class="btn btn-outline-secondary">Add Name</button>
                    </div>
                </div>
            </li>

            <Task v-for="task in tasks" :key="task.id" :task="task" @delete-task="deleteTask" v-priorityHighlight="{priority: task.priority}"></Task>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    import Task from './ListItem.vue'

    export default {
        name: 'Task-List',
        props: {
            tasks: Array
        },
        data () {
            return {
                newTask : '',
                title: "Adding Task!"
            }
        },
        components: {
            Task
        },
        methods: {
            addTask(){
                if(this.newTask !== ""){
                    axios.post('http://localhost:8000/api/tasks/add', {
                        'description': this.newTask, 'completed': false, 'priority' : "high"
                    })
                    .then(res => {
                        this.tasks.push(res.data),
                        this.newTask = ''
                    })
                    .catch(error => {
                        if(error.response.status == 422)
                        alert(error.response.data.message + '\nTask List Item can\'t be empty')
                    })    
                }else {
                    alert('You can\'t insert empty ')
                }
            },
            deleteTask(task){
                let res = confirm("Are you sure u want to delete " + task.description + " ?");
                if (res) {
                    axios.delete('http://localhost:8000/api/tasks/delete', {
                        params : task
                    })
                    .then(() => {
                        this.tasks.splice(this.tasks.indexOf(task), 1);
                    })
                }
            },
        }
    }
</script>