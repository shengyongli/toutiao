<template>
  <el-card v-loading="loading">
    <!-- 插槽内容 标题 -->
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="550"></el-table-column>
      <!-- formatter是el-table-column属性 -->
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            type="text"
            :style="{color:obj.row.comment_status?'#E6A23C' :'#409EFF'}"
          >{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { getComments, openOrClose } from '../../api/comment.js'
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1, // 当前页
        pageSize: 10, // 当前每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // openOrClose (row) {
    //   let mess = row.comment_status ? '关闭' : '打开';
    //   this.$confirm(`您是否要${mess}评论`, '提示').then(() => {
    //     this.$axios({
    //       method: 'put',
    //       url: '/comments/status',
    //       params: { article_id: row.id.toString() },
    //       data: { allow_comment: !row.comment_status }
    //     }).then(result => {
    //       this.getComments()
    //     })
    //   })
    // },
    async openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`您是否要${mess}评论`, '提示')
      // await this.$axios({
      //   method: 'put',
      //   url: '/comments/status',
      //   params: { article_id: row.id.toString() },
      //   data: { allow_comment: !row.comment_status }
      // })
      await openOrClose(
        { article_id: row.id.toString() },
        { allow_comment: !row.comment_status }
      )
      this.getComments()
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    async getComments () {
      this.loading = true
      // this.$axios({
      //   url: '/articles',
      //   params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      // }).then(result => {
      //   this.loading = false // 响应数据之后关系
      //   this.list = result.data.results
      //   this.page.total = result.data.total_count
      // })
      // let result = await this.$axios({
      //   url: '/articles',
      //   params: {
      //     response_type: 'comment',
      //     page: this.page.page,
      //     per_page: this.page.pageSize
      //   }
      // })
      let result = await getComments({
        response_type: 'comment',
        page: this.page.page,
        per_page: this.page.pageSize
      })
      this.loading = false
      this.list = result.data.results
      this.page.total = result.data.total_count
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getComments() // 获取最新页的数据
    }
  },

  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
