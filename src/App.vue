<template>
  <div id="app">
    <router-view></router-view>
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
