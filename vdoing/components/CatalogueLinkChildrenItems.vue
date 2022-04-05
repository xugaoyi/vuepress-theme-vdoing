<template>
  <div class="catalogue-content">
    <template v-for="(item, index) in itemsData">
      <dl :key="index" class="inline">
        <dd>
          <router-link :to="item.link">
            <template v-if="item.number && !onlyLink">
              {{ `${item.number}. ` }}
            </template>
            <template v-else-if="onlyLink && show">
              {{ `${index + 1}. ` }}
            </template>
            {{ `${item.text}` }}
          </router-link>
        </dd>
      </dl>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    itemsData: {
      type: [],
      required: true,
    },
  },
  data() {
    return {
      onlyLink: null,
      show: null,
    };
  },
  mounted() {
    let treeNumberSet = this.$themeConfig.catalogueLink.treeNumberSet;
    this.onlyLink = treeNumberSet.onlyLink == undefined ? false : treeNumberSet.onlyLink;
    this.show = treeNumberSet.show;
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
dl, dd
  margin 0
.catalogue-content
  dl
    // margin-bottom 1.8rem
    &.inline
      display inline-block
      width 50%
      // margin-bottom 1rem
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
      // margin-top 0.7rem
      // margin-left 0.5rem
    a:not(.header-anchor)
      margin-bottom 0.7rem
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