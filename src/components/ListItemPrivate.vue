<template>
    <li class="list-group-item">
        <s v-if="task.completed == true ">{{ task.description }}</s>
        <b v-else>{{ task.description }}</b>
        <button style="float:right" @click="modifyingTask(task)">&#x270D;</button>
        <button style="float:right" @click="deleteTask">&#x2716;</button>
        <button style="float:right" @click="completeTask(task)">&#x2705;</button>
        <button style="float:right" v-if='task.public == true' @click="setTaskPrivate(task)">&#x2606;</button>
        <button style="float:right" v-else @click="setTaskPrivate(task)">&#x2605;</button>
        <div v-if="modifyingTasks === task.id" style="float: right">
            <input type="text" v-model="modifiedTaskDescription" @keyup.enter="modifyTaskDescription(task)" v-focus placeholder="Modify Task" aria-describedby="basic-addon2">
            <button @click="modifyTaskDescription(task)">&#8594;</button>
        </div>
    </li>
</template>

<script>
    import mixin from './../mixins/ListItemMixin.js'
    // import axios from 'axios'

    export default {
        name: 'Task',

        mixins: [mixin],

        props: {
            task: Object,
        },

        data () {
            return {
                modifiedTaskDescription: '',
                modifyingTasks: '',
            }
        },
    }
</script>