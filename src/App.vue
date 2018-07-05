<template>
  <div id="app">
    <toDoApp></toDoApp>
    </div>
</template>

<script>
import toDoApp from './components/toDoApp.vue'
import './directives/HighlightPriorityDirective.js'
import './directives/FocusOnInput.js'

export default {
  name: 'app',
  components: {
    toDoApp
  },
}
</script>
