<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传组件  :show-file-list="false"是否显示上传列表-->
    <el-upload :show-file-list="false" :http-request="uploadImg" action class="upload-btn">
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材的内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i
                @click="collectOrCancel(item)"
                :style="{color: item.is_collected ? 'red' : '' }"
                class="el-icon-star-on"
              ></i>
              <i @click="delImg(item)" class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <!-- 收藏素材的内容 -->
        <div class="card-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            :total="page.total"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 12,
        total: 0
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.page = 1
      this.getMaterial()
    },
    uploadImg (params) {
      // formdata类型
      let obj = new FormData()
      console.log(obj)
      obj.append('image', params.file)
      this.$axios({
        url: '/user/images', // 同样的地址 不同的类型
        method: 'post',
        data: obj
      }).then(() => {
        this.getMaterial() // 重新加载
      })
    },
    // 取消或收藏图片
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏这张图片？`, '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 删除图片
    delImg (item) {
      this.$confirm(`您确定要删除这张图片吗`, '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect' // collect为false就是查全部数据 collect 为true的话 是查询收藏数据
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material {
  .upload-btn {
    position: absolute;
    right: 20px;
    margin-top: -5px;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 180px;
      height: 180px;
      margin: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}
</style>
