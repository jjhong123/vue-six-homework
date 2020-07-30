<template>
  <div>
    <main class="login-form">
      <div class="cotainer">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <h2 class="text-center">後台登入</h2>
            <div class="card">
              <div class="card-header">後台登入</div>
              <div class="card-body">
                <form @submit.prevent="signin">
                  <!-- Account -->
                  <div class="form-group row">
                    <label for="email-address" class="col-md-4 col-form-label text-md-right">Email</label>
                    <div class="col-md-6">
                      <input
                        type="email"
                        class="form-control"
                        name="email-address"
                        v-model="user.email"
                      />
                    </div>
                  </div>
                  <!-- Password -->
                  <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                    <div class="col-md-6">
                      <input
                        type="password"
                        class="form-control"
                        name="password"
                        v-model="user.password"
                      />
                    </div>
                  </div>
                  <!-- Login -->
                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">登入</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
    }
  },
  methods: {
    //登入功能
    signin() {
      // const api = `${process.env.VUE_APP_APIPATH}/signin`;
      const vm = this;
      this.loading = true;
      let data = {
        email: vm.user.email,
        password: vm.user.password
      };
      vm.$store
        .dispatch("setUserData", data)
        .then(res => {
          if (res.data.success) {
            vm.$router.push("/admin/products");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.6;
  color: #212529;
  text-align: left;
  background-color: #f5f8fa;
}

.navbar-laravel {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.my-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.my-form .row {
  margin-left: 0;
  margin-right: 0;
}

.login-form {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.login-form .row {
  margin-left: 0;
  margin-right: 0;
}
</style>
