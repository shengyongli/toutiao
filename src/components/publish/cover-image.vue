<template>
  <div class="cover-image">
    <div @click="showDialog(index)" class="image-item" v-for="(item,index) in images" :key="index">
      <img :src="item ?item : defaultImg" alt />
    </div>
    <el-dialog @close="hideDialog" :visible="dialogVisible">
      <!-- 素材选择/上传图片 -->
      <select-image @onSelectImg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
// 根据image渲染页面
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    // 接收子组件传过来的地址
    receiveImg (url) {
      // url不能再cover-image中修改，要在publish中修改
      // 要再次将url传给父组件
      this.$emit('onClickImg', url, this.selectIndex)
      this.dialogVisible = false // 点击后关闭显示弹层
    },
    showDialog (index) {
      this.selectIndex = index // 将当前点击的索引赋值给data中的一个变量
      this.dialogVisible = true // 显示弹层
    },
    hideDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
