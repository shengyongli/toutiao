<template>
  <el-row class="layout-header" type="flex" justify="space-between">
    <el-col class="left" :span="8">
      <i
        @click="openOrClose"
        :class="{'el-icon-s-unfold':close,'el-icon-s-fold':!close}"
        class="icon"
      ></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" />
      <el-dropdown trigger="click" @command="handleMenuItem">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/events' // 公共的vue实例
export default {
  data () {
    return {
      close: false, // 默认展开
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 展开或者折叠
    openOrClose () {
      this.close = !this.close
      eventBus.$emit('openOrClose', this.close) // 拨号
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
        // console.log(this.userInfo)
      })
    },
    // 点击菜单项触发的方法
    handleMenuItem (command) {
      if (command === 'account') {
        // 账户信息
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shengyongli/toutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 听电话  => 做动作
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      padding-right: 4px;
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
