<template>
    <div class="artists-main-wrapper">
        <component :is="componentName"/>
    </div>
</template>

<script>
import Artists from "./components/Artists"
export default {
  name: 'app',
  data() {
    return {
      componentName : "Artists"
    }
  },
  components: {
    Artists
  }
  
}
</script>
