import {login} from '@/api/user';

const app = {
  state: {
    isLoading: false,
    isLogin: false,
    alertstate: []
  },
  mutations: {
    //登入
    LOGIN(state,loginstate) {
      state.isLogin = loginstate;
    },
    //關閉讀取中
    CHANGE_LOADING: (state, loadingstate) => {
      state.isLoading = loadingstate;
    },
    //警告視窗
    CHANGE_ALERT: (state, alertstate) => {
      state.alertstate = alertstate;
    }
  },
  actions: {
    // Change Loading
    // ChangeLoading: ({ commit },{ loadingstate }) => {
    //   console.log(loadingstate);
    //   commit('CHANGE_LOADING',loadingstate);
    // },
    // Change login
    setUserData({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data.email,data.password).then(response => {
          commit('LOGIN', true);//登入狀態
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // Alert
    // ChangeAlert({ commit }, data) {
    //   return new Promise(resole => {
    //     setTimeout(() => {
    //       commit('CHANGE_ALERT',loadingstate);
    //       resole();
    //     }, 1000);
    //   });
    // }
  }
};

export default app;