import Vue from 'vue';

Vue.directive('priorityHighlight', {
    inserted: function(el, task){ directiveHelper(el, task)},
    update: function(el, task){ directiveHelper(el, task)}
})


function directiveHelper(el, task) {
    let priority = task.value.task.priority;
    let publicTask = task.value.task.public;
    if(!publicTask){
        el.style.backgroundColor = "#b2d8d8"
    }else if(priority === "high"){
        el.style.backgroundColor = "#98fb98";
    }else if(priority === "medium"){
        el.style.backgroundColor = "#b6fcb6";
    }else if(priority === "low"){
        el.style.backgroundColor = "#e0fde0";
    }else {
        el.style.backgroundColor = "white";
    }
}