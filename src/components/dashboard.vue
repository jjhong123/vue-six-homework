<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <!-- 插入元件 -->
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>



<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Alert from "./AlertMessage";

//區域註冊元件
export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route() {
      this.transitionName = "fade";
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active, 
.fade-leave-active {
  transition: opacity .6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>