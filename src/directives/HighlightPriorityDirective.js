import Vue from 'vue';

Vue.directive('priorityHighlight', {
    inserted: function(task, priority){ directiveHelper(task, priority)},
    update: function(task, priority){ directiveHelper(task, priority)}
})


function directiveHelper(task, priority) {
    priority = priority.value.priority;
    if(priority === "high"){
        task.style.backgroundColor = "red";
    }else if(priority === "medium"){
        task.style.backgroundColor = "yellow";
    }else if(priority === "low"){
        task.style.backgroundColor = "green";
    }else {
        task.style.backgroundColor = "white";
    }
}