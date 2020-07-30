
import request from "@/utils/request";

// 取得優惠卷
export function getCoupons(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/coupons`,
    method: "get",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 更新優惠卷
export function updateCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/coupon/${data.id}`,
    method: "put",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 新建優惠卷
export function createCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/coupon`,
    method: "post",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 新建優惠卷
export function addCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/coupon`,
    method: "post",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 刪除優惠卷
export function delCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_COUSTOMERPATH}/admin/coupon/${data.id}`,
    method: "delete"
  });
}