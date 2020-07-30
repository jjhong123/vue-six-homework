import request from "@/utils/request";

// 取得購物車
export function getCarts() {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/cart`,
    method: "get"
  });
}

// 刪除單項購物車產品
export function deleteCarts(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/cart/${data.id}`,
    method: "delete"
  });
}

// 新增單項購物車產品
export function addCarts(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/cart`,
    method: "post",
    data:{
      data:{
        ...data
      }
    }
  });
}