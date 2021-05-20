
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
      return new Promise((resolve) => {
        // eslint-disable-next-line no-undef
        abc
        resolve();
      });
    },
    catchError() {
      this.errFunc();
      // eslint-disable-next-line no-undef
      error;
      // try {
      // } catch (error) {
      //   console.log(error);
      // }
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
