<template>
    <li class="list-group-item">
        <s v-if="task.completed == true ">{{ task.description }}</s>
        <b v-else>{{ task.description }}</b>
        <button style="float:right" @click="modifyingTask(task)">&#x270D;</button>
        <button style="float:right" @click="deleteTask">&#x2716;</button>
        <button style="float:right" @click="completeTask(task)">&#x2705;</button>
        <select style="float:right; margin: 0px 25px" v-model="task.priority" @change="modifyTaskPriority(task)">
            <option v-for="priority in Priority" :key="priority">{{ priority }}</option>
        </select>
        <div v-if="modifyingTasks === task.id" style="float: right">
            <input type="text" v-model="modifiedTaskDescription" @keyup.enter="modifyTaskDescription(task)" v-focus placeholder="Modify Task" aria-describedby="basic-addon2">
            <button @click="modifyTaskDescription(task)">&#8594;</button>
        </div>
    </li>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Task',
        data () {
            return {
                modifiedTaskDescription: '',
                modifyingTasks: '',
                Priority: [
                    "high",
                    "medium",
                    "low"
                ],
            }
        },
        props: {
            task: Object
        },
        methods: {
            modifyTaskPriority(task){
                axios.put('http://localhost:8000/api/tasks/update', task)
                .then(() => {
                    this.modifyingTasks = null;
                })
                .catch(error => {
                    if(error.res.status == 422)
                    alert(error.res.data.message + '\nTask List Item can\'t be empty')
                })
            },

            modifyTaskDescription(task){
                if(this.modifiedTaskDescription !== ""){
                    let res = confirm("Are you sure u want to update " + task.description + " with " + this.modifiedTaskDescription + " ?");
                    if(res){
                        task.description = this.modifiedTaskDescription;
                        axios.put('http://localhost:8000/api/tasks/update', task)
                        .then(() => {
                            this.modifyingTasks = null;
                        })
                        .catch(error => {
                            if(error.res.status == 422)
                            alert(error.res.data.message + '\nTask List Item can\'t be empty')
                        })
                    }
                }else {
                    alert('Updating with empty is not allowed')
                }
            },

            completeTask(task){
                if(task.completed == false){
                    task.completed = true;
                }
                else{
                    task.completed = false;
                }
                axios.put('http://localhost:8000/api/tasks/update', task)
                .then(() => {})
            },

            modifyingTask(task){
                if (this.modifyingTasks === task.id) {
                    this.modifyingTasks = null
                } else {
                    this.modifyingTasks = task.id
                }
            },

            deleteTask () {
                this.$emit('delete-task', this.task)
            }
        }
    }
</script>