<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
      <div class="img-list">
        <el-card class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="changePage"
          :current-page="page.page"
          :page-size="page.pageSize"
          background
          layout="prev,pager,next"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="avatar-uploader" action :http-request="uploadImg" :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 全部素材数组
      page: {
        page: 1,
        pageSize: 9,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      let formData = new FormData()
      formData.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: formData
      }).then(result => {
        this.$emit('onSelectImg', result.data.url)
      })
    },
    // 选择一张图片
    selectImg (item) {
      // 可以获取到点击图片的地址 item.url
      // this.$emit 触发一个自定义事件,可以在父组件标签实例上监听此事件
      this.$emit('onSelectImg', item.url)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: 'user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 图片总数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-item {
    margin: 20px 10px;
    width: 160px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
