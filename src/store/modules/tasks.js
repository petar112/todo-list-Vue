import axios from 'axios'
import Vue from 'vue'

const state = {
    tasks: []
}

const getters = {
    getAllTasks : (state) => {
        return state.tasks
    }
}

const actions = {
    loadTasks ({ commit }) {
        axios.get('http://localhost:8000/api/tasks')
            .then(Response => {
                commit('SET_TASK', Response.data)
            })
    },
    deleteTask ({ commit }, task) {
        axios.delete('http://localhost:8000/api/tasks/delete', {
            params : task
        })
        .then(() => {
            commit('REMOVE_TASK', task)
        })
    },
    addTask({ commit }, {description}){
        axios.post('http://localhost:8000/api/tasks/add', {
            'description': description, 'completed': false, 'priority' : "high", 'public' : true
        })
        .then((res) => {
            commit('ADD_TASK', res.data)
        })                    
        .catch(error => {
                if(error.response.status == 422)
                alert(error.response.data.message + '\nTask List Item can\'t be empty')
            })    
    },
    modifyTask({ commit }, task){
        axios.put('http://localhost:8000/api/tasks/update', task)
        .then(() => {
            commit('MODIFY_TASK', task)
        })
        .catch(error => {
            if(error.res.status == 422)
            alert(error.res.data.message + '\nTask List Item can\'t be empty')
        })
    }
}


const mutations = {
    ADD_TASK (state, task){
        state.tasks.push(task)
    },
    SET_TASK (state, tasks) {
        state.tasks = tasks
    },
    REMOVE_TASK (state, task) {
        state.tasks.splice(state.tasks.indexOf(task), 1);
    },
    MODIFY_TASK (state, task) {
        Vue.set(state.tasks, task, task.id)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}