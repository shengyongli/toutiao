<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:40px">
      <el-form-item label="文章状态：">
        <el-radio-group @change="changeCondition" v-model="searchForm.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select @change="changeCondition" v-model="searchForm.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
          @change="changeCondition"
          type="daterange"
          value-format="yyyy-MM-dd"
          v-model="searchForm.dataRange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 内容列表结构 -->
    <div class="total-info">共找到{{page.total}}条符合条件的内容</div>
    <div class="article-list">
      <!-- 循环项 -->
      <div class="article-item" v-for="(item,index) in list" :key="index">
        <!-- 左侧内容 -->
        <div class="left">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag :type="item.status|statusType" style="width:60px">{{item.status |statusText}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <span @click="modifyItem(item)">
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delItem(item)">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="magin:10px 0">
      <el-pagination
        @current-change="changePage"
        :current-page="page.page"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev,pager,next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg'),
      searchForm: {
        status: 5,
        channel_id: null,
        dataRange: []
      },
      channels: [], // 频道列表数据
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 修改文章
    modifyItem (item) {
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    // 删除文章
    delItem (item) {
      this.$confirm(`您确定要删除此文章吗`, '提示').then(() => {
        this.$axios({
          method: 'delete',
          // item.id 长度超过安全限制，要转成bigNumber类型，然后toString（）转成正常字符串类型
          url: `/articles/${item.id.toString()}`
        }).then(() => {
          this.getConditionArticle() // 获取筛选的数据
        })
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getConditionArticle()
    },
    changeCondition () {
      this.page.page = 1
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.dataRange.length > 0
            ? this.searchForm.dataRange[0]
            : null,
        end_pubdate:
          this.searchForm.dataRange.length > 1
            ? this.searchForm.dataRange[1]
            : null,
        page: this.page.page,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },

  created () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    //   定义一个过滤器 过滤状态
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    // 定义类型过滤器
    statusType: function (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
  color: #323745;
  font-size: 14px;
}
.article-list {
  .article-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-around;
        .title {
          color: #333;
          font-size: 14px;
        }
        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
    .right {
      font-size: 12px;
      span {
        margin-right: 8px;
        cursor: pointer;
        color: #333;
      }
    }
  }
}
</style>
