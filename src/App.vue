<template>
  <div id="app">
    <div class="testing">
      {{ message }}
      <button @click="handleClick">Click Me</button>
      <router-link to="/">Go To Home</router-link>
      <router-link to="/about">Go To About</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Testing'
    }
  },
  created () {
    console.log('Testing 1')
  },
  mounted () {
    console.log('Testing')
  },
  methods: {
    handleClick () {
      console.log('Testing, Hello')
      this.message = 'Testing, Hello'
    }
  }
}
</script>

<style>
.testing {
  color: red;
}
</style>