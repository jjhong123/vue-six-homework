<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div>
            <div
              class="card__img"
              style="height: 250px; background-size: cover; background-position: center;"
              :style="{backgroundImage: `url(${item.image})`}"
            ></div>
          </div>

          <!-- <div>
            <img style="height: 250px; background-size: cover; background-position: center;" :src="item.image" />
          </div>-->
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProducts_ID(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 購物車列表 -->
    <div class="col-6" style="margin:0 auto;">
      <h2 style="text-align:center;">購物車列表</h2>
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in carts.carts" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ carts.total }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ carts.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
    <!--結帳畫面  -->
    <div class="my-5 row justify-content-center">
      <ValidationObserver class="col-md-6" v-slot="{ handleSubmit }">
        <form class="col-md-12" @submit.prevent="handleSubmit(createOrders)">
          <div class="form-group">
            <label for="useremail">Email</label>

            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <input
                type="email"
                class="form-control"
                id="email"
                :class="{'is-invalid':errors[0]}"
                v-model="form.user.email"
                placeholder="請輸入信箱"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                :class="{'is-invalid':errors[0]}"
                v-model="form.user.name"
                placeholder="請輸入姓名"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="tel"
                class="form-control"
                name="tel"
                id="usertel"
                :class="{'is-invalid':errors[0]}"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="address"
                class="form-control"
                name="address"
                id="useraddress"
                :class="{'is-invalid':errors[0]}"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { getProduct_ALL, getProduct_ID } from "@/api/product"; //產品類_API
import { getCarts, addCarts, deleteCarts } from "@/api/cart"; //購物車_API
import { addCoupon } from "@/api/coupons";
import { createOrder } from "@/api/order";
import $ from "jquery";

export default {
  data() {
    return {
      products: [], //所有產品
      product: {}, //取得單項產品的資料(查看更多)
      carts: {},
      isLoading: false,
      status: {
        loadingItem: "" // 目前正在選取中的產品
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      coupon_code: "" //優惠卷
    };
  },
  components: {},
  created() {
    this.getProducts(); //取得所有商品
    this.getCart(); //取得購物車
  },
  methods: {
    //取得產品
    getProducts() {
      let vm = this;
      vm.isLoading = true;
      getProduct_ALL().then(response => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    //取得產品(單)
    getProducts_ID(id) {
      let vm = this;
      vm.status.loadingItem = id;
      const data = {
        id
      };
      getProduct_ID(data).then(response => {
        console.log(response);
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    //加入購物車
    addtoCart(id, qty = 1) {
      let vm = this;
      vm.status.loadingItem = id;
      const data = {
        product_id: id,
        qty
      };
      addCarts(data).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    //取得購物車
    getCart() {
      const vm = this;
      vm.isLoading = true;
      getCarts().then(response => {
        vm.isLoading = false;
        vm.carts = response.data.data;
        console.log(vm.carts.carts);
      });
    },
    //刪除購物車產品
    removeCartItem(id) {
      const vm = this;
      let data = {
        id: id
      };
      vm.isLoading = true;
      deleteCarts(data).then(response => {
        vm.isLoading = false;
        this.$bus.$emit("message:push", response.data.message, "success");
        vm.getCart();
      });
    },
    //加入折價卷
    addCouponCode() {
      const vm = this;
      vm.isLoading = true;
      const data = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      addCoupon(data).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    //新建訂單
    createOrders() {
      console.log('here')
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      createOrder(order).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  transition: all 0.3s;
  overflow: hidden;

  &:hover {
    transform: translateY(-5%);
    .card__img {
      transition: all 0.3s;
      transform: scale(1.1);
    }
  }
}
</style>