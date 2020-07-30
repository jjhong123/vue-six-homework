<template>
  <div id="navbar">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">後台管理</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { logout } from "@/api/user";
export default {
  methods: {
    signout() {
      const vm =this;
      //登出
      logout().then(response => {
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style>
</style>