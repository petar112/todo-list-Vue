import axios from 'axios'

export default {
    methods: {
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
            }else{
                task.completed = false;
            }
            axios.put('http://localhost:8000/api/tasks/update', task)
            .then(() => {})
        },

        modifyingTask(task){
            if (this.modifyingTasks === task.id) {
                this.modifyingTasks = null
            }else {
                this.modifyingTasks = task.id
            }
        },

        deleteTask () {
            this.$emit('delete-task', this.task)
        },
        
        setTaskPrivate(task) {
            if(!task.public)
            task.public = true;
            else
            task.public = false;

            axios.put('http://localhost:8000/api/tasks/update', task).then(() => {})
        }
    }
}
