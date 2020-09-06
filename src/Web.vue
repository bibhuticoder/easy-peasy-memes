<template>
  <div>
    <div class="memeGeneratorApp">
      <MemeGenerator />
    </div>
    <AppDescription />
  </div>
</template>

<script>
import MemeGenerator from "./components/MemeGenerator.vue";
import AppDescription from "./components/AppDescription.vue";

export default {
  components: { MemeGenerator, AppDescription },
};
</script>

<style lang="scss">
.memeGeneratorApp {
  position: relative;
  height: auto;
  min-height: 100vh;
}
</style>
