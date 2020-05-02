<template>
  <div class="custom-page categories-page">
    <MainLayout>
      <template #mainLeft>
        <PostList
          :currentPage="currentPage"
          :perPage="perPage"
        />
        <Pagination
          :total="total"
          :perPage="perPage"
          :currentPage="currentPage"
          @getCurrentPage="handlePagination"
          v-if="Math.ceil(total / perPage) > 1"
        />
      </template>
      <template #mainRight>
        <CategoriesBar
          v-if="$categoriesAndTags.categories.length"
          :categoriesData="$categoriesAndTags.categories"
        />
      </template>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '@theme/components/MainLayout'
import PostList from '@theme/components/PostList'
import Pagination from '@theme/components/Pagination'
import CategoriesBar from '@theme/components/CategoriesBar'

export default {
  data(){
    return {
      total: 0, // 总长
      perPage: 10, // 每页长
      currentPage: 1// 当前页
    }
  },
  components: { MainLayout, PostList, Pagination, CategoriesBar },
  created() {
    this.total = this.$sortPosts.length
  },
  methods: {
    handlePagination(i) { // 分页
      this.currentPage = i
    }
  },
}
</script>

<style lang='stylus'>
@require '../styles/custom-page.styl'

.categories-page
  .categories-wrapper 
    position sticky
    top ($navbarHeight + .9rem)
    max-height calc(100vh - 10rem)
    min-height 4.2rem
    .categories
      padding-right .5rem
      max-height calc(100vh - 12rem)
      min-height 2.2rem
      overflow-y auto
      transition all .2s
      &::-webkit-scrollbar-track-piece
        background-color:rgba(0,0,0,.05)
      &::-webkit-scrollbar-thumb:vertical
        background-color:rgba(0,0,0,.15)
      &:hover
        &::-webkit-scrollbar-track-piece
          background-color:rgba(0,0,0,.1)
        &::-webkit-scrollbar-thumb:vertical
          background-color:rgba(0,0,0,.25)
</style>
