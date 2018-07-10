<template>
    <div>
        <h2 class="bg-warning">All Tasks</h2>
        <Task-List :tasks="tasks"></Task-List>
    </div>
</template>

<script>
    import Task from './ListItem.vue'
    import TaskList from './TaskList.vue'

    export default {
        name: 'toDoApp',

        components: {
            Task,
            TaskList
        },
        computed: {
            tasks () {
                return this.$store.getters.getAllTasks
            }
        },
        // watch: {
        //     tasks: {
        //         handler: function(oldVal, newVal) {
        //             // Showing same value since we are working with array, and all references showing on same array
        //             // Vue doesn't keep copy of premutated array
        //             console.log(newVal);
        //             console.log(oldVal);
        //         },
        //         deep: true
        //     }
        // },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$store.dispatch('loadTasks')
            })
        }
    }
</script>