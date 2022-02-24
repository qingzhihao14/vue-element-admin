<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <audio
          ref="audioPlay"
          src="http://static.asia:70/new_order.mp3"
          autoplay="autoplay"
          controls="controls"
        >Your browser does not support the audio element.</audio> -->
        <el-badge :value="myvalue" class="right-menu-item" :type="myvalue>0?'danger':'primary'">
          <router-link to="/table/drag-table">
            <a style="font-size: 15px;text-decoration: underline;">新订单</a>
          </router-link>
        </el-badge>
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { taskFindOrders } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data() {
    return {
      myvalue: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created() {
    this.setTiming()
  },
  mounted() {
    // this.play()
  },
  methods: {
    // 设置定时获取列表
    setTiming() {
      var that = this
      that.timed = window.setInterval(() => {
        setTimeout(() => {
          // that.play()
          if (that.myvalue === 0) {
            that.getList()
          }
        }, 0)
      }, 3000)// 3s获取一次
    },
    // // 播放
    // play() {
    //   this.dialogVisible = true
    //   this.$refs.audioPlay.play()
    // },
    // // 音频暂停
    // stop() {
    //   this.dialogVisible = false
    //   this.$refs.audioPlay.pause()
    //   this.$refs.audioPlay.currentTime = 0
    // },
    async getList() {
      var that = this
      // that.listLoading = true
      await taskFindOrders({ 'pageNum': 1, 'pageSize': 100000, 'searchParam': '' }).then((result) => {
        if (result && result.code === 0) {
          // that.listQuery.page = result.data.
          console.log(JSON.parse(JSON.stringify(result.data.content)))
          if (result.data.content.length > 0 && that.myvalue === 0) {
            that.myvalue = result.data.totalSize
            // element ui 右上角提示窗
            // const speechInstance = new window.SpeechSynthesisUtterance('叮Dong,您有新订单啦！')
            const speechInstance = new window.SpeechSynthesisUtterance('您有新的订单待处理')
            window.speechSynthesis.speak(speechInstance)
            console.log(JSON.parse(JSON.stringify(result)))
            that.$notify({
              title: '新订单',
              message: '您有' + result.data.content.length + '个新的订单待处理',
              position: 'bottom-right'
            })
            // result.data.content.forEach(arr => {
            //   console.log('arr' + JSON.parse(JSON.stringify(result)))
            //   debugger
            // })
          }
        } else {
          that.$message.warning('保存失败')
        }
      })
      // that.list = [{ 'id': 1, 'timestamp': 803380321626, 'author': 'Elizabeth', 'reviewer': 'Charles', 'title': 'Phto Umfhyvn Bbpctd Gppelbjobs Huha Cod Qcewjhx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 49.69, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1971-09-25 22:21:09', 'comment_disabled': true, 'pageviews': 4435, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 2, 'timestamp': 203661565471, 'author': 'Jeffrey', 'reviewer': 'Joseph', 'title': 'Liutpj Srzxsyo Qbvto Jrek Ktph Lvxggjitej', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 23.07, 'importance': 2, 'type': 'US', 'status': 'published', 'display_time': '1980-10-01 05:34:34', 'comment_disabled': true, 'pageviews': 4231, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 3, 'timestamp': 1575937832164, 'author': 'Kevin', 'reviewer': 'James', 'title': 'Kesnq Fwmtlufih Qpie Twfm Bkkbzkx Qkct Ljjanvm', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 83.28, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '2019-10-25 20:18:19', 'comment_disabled': true, 'pageviews': 4492, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 4, 'timestamp': 893621388286, 'author': 'Thomas', 'reviewer': 'Brian', 'title': 'Djfbcnvht Twpvmd Qjbw Tvrq Xftjujkf Pomrxapk Mobs Dplr Tfijiamu', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 71.13, 'importance': 2, 'type': 'JP', 'status': 'published', 'display_time': '1974-03-05 12:45:40', 'comment_disabled': true, 'pageviews': 1997, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 5, 'timestamp': 417094195427, 'author': 'Jessica', 'reviewer': 'Ruth', 'title': 'Bxtit Vumcdmvork Dorkn Smunohkhki Qkvqwlk Ptyhgk Krrjend Tlrezmd Byfmeau Qqdfjp', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 54.75, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '1979-11-30 02:01:46', 'comment_disabled': true, 'pageviews': 4501, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 6, 'timestamp': 1301855019498, 'author': 'Jeffrey', 'reviewer': 'Karen', 'title': 'Iksk Fjgpdxwb Fhlw Wdzht Xxyixe Qknrqwtdsv Dqllmsggu Uuauosnld Kwqs Cdld', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 5.47, 'importance': 1, 'type': 'US', 'status': 'draft', 'display_time': '1994-04-13 05:13:29', 'comment_disabled': true, 'pageviews': 2336, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 7, 'timestamp': 1375880283337, 'author': 'Steven', 'reviewer': 'Larry', 'title': 'Uuqjfylfwh Rsfgw Rxwxla Pmom Igrkgu', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 0.95, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1984-12-30 12:27:26', 'comment_disabled': true, 'pageviews': 4354, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 8, 'timestamp': 836327661361, 'author': 'Gary', 'reviewer': 'Daniel', 'title': 'Qplyhouldr Riwike Hcidbmh Jqghzh Fttc Gffgifgdu Dtffwylfw Lhngvk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 74.43, 'importance': 2, 'type': 'CN', 'status': 'draft', 'display_time': '1970-10-10 15:01:51', 'comment_disabled': true, 'pageviews': 540, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 9, 'timestamp': 1249461168915, 'author': 'Carol', 'reviewer': 'Sarah', 'title': 'Yxuorxy Ulfi Pywcfbtlg Mujjwuh Jeoitnx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 66.71, 'importance': 3, 'type': 'US', 'status': 'draft', 'display_time': '1999-08-01 14:59:51', 'comment_disabled': true, 'pageviews': 2206, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 10, 'timestamp': 991010925276, 'author': 'Edward', 'reviewer': 'Lisa', 'title': 'Kxyj Hloyfd Djcq Kxqmdmfdsb Ucixtcx Jngclip', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 72.43, 'importance': 2, 'type': 'CN', 'status': 'draft', 'display_time': '2002-09-07 14:57:22', 'comment_disabled': true, 'pageviews': 4718, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 11, 'timestamp': 1002220180868, 'author': 'Nancy', 'reviewer': 'Sandra', 'title': 'Wgswkyc Lmmtzbeu Jxhs Xvno Ovtnm Otfpumcf Jfqbenvap', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 6.62, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '2018-11-16 10:29:07', 'comment_disabled': true, 'pageviews': 1985, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 12, 'timestamp': 47657650328, 'author': 'Mary', 'reviewer': 'Matthew', 'title': 'Tagjo Veimsieot Pueippd Zkjnqq Tzbv Ttnx', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 88.88, 'importance': 2, 'type': 'JP', 'status': 'published', 'display_time': '1979-11-18 03:50:42', 'comment_disabled': true, 'pageviews': 738, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 13, 'timestamp': 436962300263, 'author': 'Brenda', 'reviewer': 'Thomas', 'title': 'Nsdio Ezxcml Ybslm Ufwk Eflmiaozy Edfsugk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 33.72, 'importance': 2, 'type': 'JP', 'status': 'draft', 'display_time': '1973-09-30 10:38:33', 'comment_disabled': true, 'pageviews': 1552, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 14, 'timestamp': 1211302507717, 'author': 'Dorothy', 'reviewer': 'Jason', 'title': 'Eopryw Yswjcvoub Hoqsh Xdvp Vjsvgtuy Pnpp Jpqoqcs', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 44.42, 'importance': 3, 'type': 'JP', 'status': 'draft', 'display_time': '2001-06-08 08:50:07', 'comment_disabled': true, 'pageviews': 2039, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 15, 'timestamp': 57519122580, 'author': 'Eric', 'reviewer': 'Jeffrey', 'title': 'Jsjneeg Rfcywbt Ennh Cpdvrq Csdnhmxbr Kuwk Rdoghbihs Irccm', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 22.44, 'importance': 2, 'type': 'EU', 'status': 'published', 'display_time': '1990-08-28 20:08:46', 'comment_disabled': true, 'pageviews': 4250, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 16, 'timestamp': 1331305306184, 'author': 'Kimberly', 'reviewer': 'Gary', 'title': 'Cfuqrg Pcdl Epmdpxlodo Jwhjgep Szqnim Ohwltyy Tsrxkuvfy Wbbvk Mcxsyrxd', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 26.03, 'importance': 3, 'type': 'US', 'status': 'published', 'display_time': '2020-10-12 21:44:35', 'comment_disabled': true, 'pageviews': 915, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 17, 'timestamp': 737661074299, 'author': 'Anthony', 'reviewer': 'Scott', 'title': 'Imn Dvmnidlvp Lpylchwui Vtzzbtex Pybogro Ooxhfsozk', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 53.16, 'importance': 2, 'type': 'US', 'status': 'draft', 'display_time': '2011-03-15 10:36:47', 'comment_disabled': true, 'pageviews': 4298, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 18, 'timestamp': 111502496706, 'author': 'Jessica', 'reviewer': 'Christopher', 'title': 'Krroywn Syudufqw Gczhbjr Gcrm Wsbr Qxqvnp Dzgi Ekbfls Ycefwpceid Garqgum', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 61.13, 'importance': 3, 'type': 'US', 'status': 'draft', 'display_time': '1970-01-07 21:19:02', 'comment_disabled': true, 'pageviews': 2385, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 19, 'timestamp': 233294636091, 'author': 'Maria', 'reviewer': 'Richard', 'title': 'Ktxhz Kguzcvvfl Zaofe Cyhxxxdb Ddyetbya Pjxd', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 9.55, 'importance': 2, 'type': 'US', 'status': 'published', 'display_time': '1999-05-01 00:13:30', 'comment_disabled': true, 'pageviews': 3531, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }, { 'id': 20, 'timestamp': 1518814286075, 'author': 'Carol', 'reviewer': 'Elizabeth', 'title': 'Cgbstrg Sjzchlkd Qqnokrui Scqpp Nmqrqfucow Rhusz Cdeoriql', 'content_short': 'mock data', 'content': '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>', 'forecast': 26.67, 'importance': 2, 'type': 'EU', 'status': 'published', 'display_time': '1980-11-22 20:56:47', 'comment_disabled': true, 'pageviews': 2665, 'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3', 'platforms': ['a-platform'] }]
      // that.total = 100

      // Just to simulate the time of the request
      setTimeout(() => {
        that.listLoading = false
      }, 1.5 * 100)
      // fetchList(this.listQuery).then(response => {
      // })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>

// .hamburger-container{
//   position: relative;
// }
// .el-badge__content.el-badge__content--undefined.is-fixed{
//   position: relative;
// }
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      ::v-deep sup {
        top: 0.2em;
        position: relative;
        left: -2em;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
