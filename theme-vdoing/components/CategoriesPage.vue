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

</style>
