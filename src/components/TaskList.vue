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
            <div v-for="task in tasks" :key="task.id">
                <Task v-if="task.public"  :task="task" @delete-task="deleteTask" v-priorityHighlight="{task : task}"></Task>
                <TaskPrivate v-else :task="task" @delete-task="deleteTask" v-priorityHighlight="{task : task}"></TaskPrivate>
            </div>
        </ul>
    </div>
</template>

<script>
    import Task from './ListItem.vue'
    import TaskPrivate from './ListItemPrivate.vue'
    import mixin from './../mixins/ListItemMixin.js'

    export default {
        name: 'Task-List',
        props: {
            tasks: Array
        },
        data () {
            return {
                newTask : '',
                title: "Adding Task!",
                mixin
            }
        },
        components: {
            Task,
            TaskPrivate
        },
        methods: {
            addTask(){
                if(this.newTask !== ""){  
                    return this.$store.dispatch('addTask', {description: this.newTask})
                }else {
                    alert('You can\'t insert empty ')
                }
            },
            deleteTask(task){
                let res = confirm("Are you sure u want to delete " + task.description + " ?");
                if (res) {
                    return this.$store.dispatch('deleteTask', task)
                }
            },
        }
    }
</script>