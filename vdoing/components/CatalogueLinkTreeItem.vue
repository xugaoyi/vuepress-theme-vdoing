<template>
  <div>
    <dt>
      <span id='expandSpan' @click="toggle" v-if="!data.link" :style="cursorPointer">
        <em v-if="hasChild && iconShow" class="icon">{{ open ? "-" : "+" }}</em>
        <em v-if="!hasChild" class="icon file-text"></em>
        <template v-if="data.number">
          {{ `${data.number}. ` }}
        </template>
        {{ `${data.title}` }}
      </span>
    </dt>
    <dd v-show="open" v-if="data.items">
      <CatalogueLinkChildrenItems :itemsData="data.items"/>
    </dd>
    <dd v-show="open" v-if="hasChild" >
      <CatalogueLinkTreeItem
        v-for="(item, index) in data.children"
        :data="item"
        :key="index"
      >
      </CatalogueLinkTreeItem>
    </dd>

  </div>
</template>

<script>
import CatalogueLinkChildrenItems from "./CatalogueLinkChildrenItems";
export default {
  name: "CatalogueLinkTreeItem",
  components: {
    CatalogueLinkChildrenItems,
  },
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      open: true,
      iconShow: false,
      cursorPointer: null,
    };
  },
  mounted() {
    this.init()
  },
  computed: {
    hasChild() {
      return this.data.children && this.data.children.length || this.data.items;
    },
  },
  methods: {
    init() {
      let catalogueLink = this.$themeConfig.catalogueLink
      let expand = catalogueLink.expand
      let iconShow = catalogueLink.iconShow

      this.open = expand == undefined ? true : expand
      this.iconShow = iconShow == undefined ? false : iconShow
      if (this.iconShow) {
        this.cursorPointer = 'cursor:pointer'
      }
    },
    toggle() {
      if (this.hasChild && this.iconShow) {
        this.open = !this.open;
      }
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
em.icon {
  display: inline-block;
  width: 10px;
  height: 25px;
  margin-top: -5px
  // margin-right: 1px;
  background-repeat: no-repeat;
  vertical-align: middle;
}

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
        margin 0
        font-size 1.1rem
        &:hover .header-anchor
          opacity 1
      dd
        margin-top 0.2rem
        margin-left 0.7rem
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
