
import request from "@/utils/request";

// 取得商品資料
export function getProduct_PAGE(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/products/?page=${data.page}`,
    method: "get",
  });
}

// 取得商品資料ALL
export function getProduct_ALL() {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/products`,
    method: "get",
  });
}

// 取得商品資料(單)
export function getProduct_ID(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/product/${data.id}`,
    method: "get",
  });
}

// 上傳商品資料
export function newProduct(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/product`,
    method: "post",
    data: {
      data
    }
  });
}

// 更新商品資料
export function updateProduct(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/product/${data.id}`,
    method: "put",
    data: {
      data
    }
  });
}

// 刪除商品資料
export function deleteProduct(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/product/${data.id}`,
    method: "delete",
    data:{
      data
    }
  });
}