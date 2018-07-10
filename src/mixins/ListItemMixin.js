export default {
    methods: {
        modifyTaskDescription(task){
            if(this.modifiedTaskDescription !== ""){
                let res = confirm("Are you sure u want to update " + task.description + " with " + this.modifiedTaskDescription + " ?");
                if(res){
                    task.description = this.modifiedTaskDescription;
                    this.modifyingTask(task);
                    return this.$store.dispatch('modifyTask', task);
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
            return this.$store.dispatch('modifyTask', task)
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
            return this.$store.dispatch('modifyTask', task)
        }
    }
}
