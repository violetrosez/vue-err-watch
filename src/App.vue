
<template>
  <div></div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.catchError();
  },
  methods: {
    errFunc() {
      // eslint-disable-next-line no-undef
      error;
    },
    catchError() {
      try {
        this.errFunc();
      } catch (error) {
        console.log(error);
      }
      // throw new Error("ERROR");
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
  margin-top: 60px;
}
</style>
