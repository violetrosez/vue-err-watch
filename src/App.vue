
<template>
  <div>
    <vis-page></vis-page>
  </div>
</template>

<script>
import VisPage from "@/components/vis-page.vue";
export default {
  name: "App",
  components: {
    VisPage,
  },
  created() {
    this.errFunc();
  },
  methods: {
    errFunc() {
      abc;
      return new Promise((resolve) => {
        resolve();
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
