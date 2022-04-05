<template>
  <div class="catalogue-content">
    <dl v-for="(item, index) in treeData" :key="index">
      <CatalogueLinkTreeItem :data="item"></CatalogueLinkTreeItem>
    </dl>
  </div>
</template>

<script>
import CatalogueLinkTreeItem from "./CatalogueLinkTreeItem";
export default {
  props: {
    treeData: {
      type: [Object, Array],
      required: true,
    },
  },
  components: {
    CatalogueLinkTreeItem,
  },
};
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
dl, dd
  margin 0
.column-wrapper
  margin-top 1rem
  display flex
  padding-bottom 2rem
  border-bottom 1px solid var(--borderColor)
  img
    width 80px
    height 80px
    border-radius 2px
    margin-right 1rem
  .column-info
    .title
      font-size 1.6rem
    .description
      color var(--textColor)
      opacity 0.8
      margin 0.5rem 0
.catalogue-wrapper
  .catalogue-title
    font-size 1.45rem
    margin 2rem 0
  .catalogue-content
    dl
      margin-bottom 1.8rem
      &.inline
        display inline-block
        width 50%
        margin-bottom 1rem
        @media (max-width $MQMobileNarrow)
          width 100%
        a
          width 100%
      &:not(.inline)
        dt
          margin-top -($navbarHeight)
          padding-top $navbarHeight
      dt
        font-size 1.1rem
        &:hover .header-anchor
          opacity 1
      dd
        margin-top 0.7rem
        margin-left 1rem
      a:not(.header-anchor)
        margin-bottom 0.5rem
        display inline-block
        width 50%
        &:hover
          color $activeColor
          text-decoration none
        @media (max-width $MQMobileNarrow)
          width 100%
      .sub-cat-wrap
        margin 5px 0 8px 0
        font-size 0.95rem
        &> a
          padding-left 1rem
          box-sizing border-box
        .sub-title
          margin-top -($navbarHeight)
          padding-top $navbarHeight
          margin-bottom 6px
          font-size 1rem
        &:hover
          .header-anchor
            opacity 1
</style>
