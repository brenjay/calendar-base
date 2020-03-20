<template>
  <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
    <div class="tag">{{item.departing}}-{{item.arriving}}</div>
  </transition>
</template>

<script>
export default {
  name: "Tag",
  props: ["result"],
  data() {
    return {
      item: this.result
    };
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

.tag {
  cursor: pointer;
}
</style>