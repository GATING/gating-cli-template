<script>
export default {
  onLaunch: function () {
    // #ifdef MP
    this.autoUpdate()
    // #endif
  },
  methods: {
    autoUpdate() {
      // 获取小程序更新机制兼容
      if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        //1. 检查小程序是否有新版本发布
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            //2. 小程序有新版本，则静默下载新版本，做好更新准备
            updateManager.onUpdateReady(function () {
              uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                  if (res.confirm) {
                    //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                  }
                }
              })
            })
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              uni.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
              })
            })
          }
        })
      } else {
        uni.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
@import '@style/global.scss';
page {
  height: 100%;
}
</style>
