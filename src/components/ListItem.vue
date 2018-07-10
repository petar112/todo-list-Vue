<template>
    <li class="list-group-item">
        <s v-if="task.completed == true ">{{ task.description }}</s>
        <b v-else>{{ task.description }}</b>
        <button style="float:right" @click="modifyingTask(task)">&#x270D;</button>
        <button style="float:right" @click="deleteTask">&#x2716;</button>
        <button style="float:right" @click="completeTask(task)">&#x2705;</button>
        <button style="float:right" v-if='task.public == true' @click="setTaskPrivate(task)">&#x2606;</button>
        <button style="float:right" v-else @click="setTaskPrivate(task)">&#x2605;</button>
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
    import mixin from './../mixins/ListItemMixin.js'

    export default {
        name: 'Task',

        mixins: [mixin],

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
            task: Object,
        },
        methods: {
            modifyTaskPriority(task){
                return this.$store.dispatch('modifyTask', task);
            },
        }
    }
</script>