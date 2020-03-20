<template>
  <div>{{mymessage}} - {{waiting}}</div>
</template>

<script>
export default {
  name: "Result",
  props: ["departing", "arriving"],
  data() {
    return {
      mymessage: `${this.departing} - ${this.arriving}`,
      waiting: false
    };
  },
  created() {
    this.waiting = true;
    setTimeout(resolve => {
      this.waiting = false;
    }, Math.floor(Math.random() * 25000) + 7000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>