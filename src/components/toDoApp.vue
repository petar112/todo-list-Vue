<template>
    <div>
        <h2 class="bg-warning">All Tasks</h2>
        <Task-List :tasks="tasks"></Task-List>
    </div>
</template>

<script>
    import Task from './ListItem.vue'
    import TaskList from './TaskList.vue'
    import axios from 'axios'

    export default {
        name: 'toDoApp',

        components: {
            Task,
            TaskList
        },

        data () {
            return {
                tasks: []
            }
        },

        created () {
            let url = 'http://localhost:8000/api/tasks';
            axios.get(url).then(
                response => { this.tasks = response.data }
            )
        },
    }
</script>