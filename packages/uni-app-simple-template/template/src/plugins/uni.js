import { primaryColor, mainColor } from '@style/variables-export.scss'
/* 
    https://uniapp.dcloud.io/api/ui/prompt?id=showmodal
    title	String	否	提示的标题	
    content	String	否	提示的内容	
    showCancel	Boolean	否	是否显示取消按钮，默认为 true	
    cancelText	String	否	取消按钮的文字，默认为"取消"，最多 4 个字符	
    cancelColor	HexColor	否	取消按钮的文字颜色，默认为"#000000"	H5、微信小程序、百度小程序
    confirmText	String	否	确定按钮的文字，默认为"确定"，最多 4 个字符	
    confirmColor	HexColor	否	确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"	H5、微信小程序、百度小程序
    success	Function	否	接口调用成功的回调函数	
    fail	Function	否	接口调用失败的回调函数	
    complete	Function	否	接口调用结束的回调函数（调用成功、失败都会执行）	 
*/

export default {
  install(Vue) {
    Vue.prototype.$toast = function (config) {
      uni.showToast(config)
    }

    // 必须搭配hideLoading使用
    Vue.prototype.$loading = function (config) {
      uni.showLoading({
        config
      })
    }

    Vue.prototype.$hideLoading = function () {
      uni.hideLoading()
    }

    Vue.prototype.$confirm = function (config) {
      return new Promise((resolve, reject) => {
        uni.showModal({
          ...config,
          showCancel: true,
          confirmColor: primaryColor,
          cancelColor: mainColor,
          success(res) {
            if (res.confirm) {
              resolve()
            } else if (res.cancel) {
              reject('用户点击了取消')
            }
          }
        })
      })
    }
    Vue.prototype.$alert = function (config) {
      return new Promise(resolve => {
        uni.showModal({
          ...config,
          showCancel: false,
          confirmColor: primaryColor,
          cancelColor: mainColor,
          success(res) {
            if (res.confirm) {
              resolve()
            }
          }
        })
      })
    }
  }
}
