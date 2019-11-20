<!---
    Created by kankan on 2019/9/2.
    email: lidainzhong@gl-data.com
-->


<template>
  <div>
    <Button @click="getDate">获取数据</Button>
    <Button @click="logOut">退出</Button>

    <br>
    <div v-if="data">
      <p>账户：{{data.name}}</p>
      <p>密码：{{data.password.length}}</p>
    </div>

    <router-link to="/map1">
      <Button type="primary">map1</Button>
    </router-link>
    <router-link to="/map2">
      <Button type="primary">map2</Button>
    </router-link>
    <router-link to="/map3">
      <Button type="primary">map3</Button>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "inddex",
    data() {
      return {
        data: undefined,
      }
    },
    mounted() {
      this.timeout();
      this.getDate();
    },
    methods: {
      getDate() {
        this.$axios.get("api/login/login.json", {}).then((data) => {
          this.$set(this, "data", JSON.parse(JSON.stringify(data.data)));
        });
      },
      timeout() {
        const $ = require('jquery');
        let lastTime = new Date().getTime();
        const timeOut = parseInt(JSON.parse(sessionStorage.getItem('logout')));
        $(function () {
          $(document).mouseover(function () {
            lastTime = new Date().getTime();
          });
        });
        let timer = window.setInterval(()=>{
          if (new Date().getTime()- lastTime > timeOut) {
            sessionStorage.clear();
            this.$router.push({name:'login'});
            window.clearInterval(timer);
          }
        },1000);
      },
      logOut() {
        sessionStorage.clear();
        this.$router.push({name: 'login'});
        this.$Message.success({
          content: '退出成功!',
          duration: 1
        });
      }
    }
  }
</script>

<style scoped>
  a {
    margin: 0 10px;
    display: inline-block;
  }
</style>
