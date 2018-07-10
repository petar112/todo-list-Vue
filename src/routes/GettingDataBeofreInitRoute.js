import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoApp from '../components/toDoApp.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: ToDoApp }
    ]
})
