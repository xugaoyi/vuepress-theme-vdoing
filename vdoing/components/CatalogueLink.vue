<template>
  <!-- 非树形 -->
  <CatalogueLinkNoTree v-if="isItems" :itemsData="itemsData"/>
  <!-- 树形 -->
  <CatalogueLinkTree v-else :treeData="treeData"/>
</template>
 
<script>
import CatalogueLinkTree from "./CatalogueLinkTree";
import CatalogueLinkNoTree from "./CatalogueLinkNoTree";
export default {
  components: {
    CatalogueLinkTree,
    CatalogueLinkNoTree,
  },
  data() {
    return {
      treeData: null,
      itemsData: null,
      isItems: false,
      level: null,
      onlyLink: null,
      linkNumberShow: null,
      
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.init();
      }
    },
  },
  methods: {
    init() {
      let treeNumberSet = this.$themeConfig.catalogueLink.treeNumberSet
      this.level = treeNumberSet.level == undefined ? -1 : treeNumberSet.level;
      this.onlyLink = treeNumberSet.onlyLink == undefined ? false : treeNumberSet.onlyLink;
      this.linkNumberShow = treeNumberSet.link == undefined ? true : treeNumberSet.link;
      
      let linksMap = this.getCatalogueMapLinks();

      if (linksMap) {
        if (treeNumberSet.show && !this.onlyLink) {
          this.addNumber(linksMap);
        }
        this.treeData = linksMap;
      }
    },
    /**
     * 获取目录映射的链接
     */
    getCatalogueMapLinks() {
      this.isItems = false;
      let catalogueLink = this.$themeConfig.catalogueLink;
      let linksMap = catalogueLink.linksMap;
      // 替换目录永久链接中的全部/字符, 以防有些人漏了后面/
      let permalink = this.$page.frontmatter.permalink.replace(/\//g, "");
      for (let index = 0; index < linksMap.length; index++) {
        let obj = linksMap[index];
        let link = obj.catalogueLink.replace(/\//g, "");
        if (permalink == link) {
          if (obj.title == undefined) {
            this.isItems = true;
            this.itemsData = obj.items;
          } else {
            return (linksMap = new Array(obj));
          }
        }
      }
    },
    /**
     * 添加序号
     * @param obj 对象
     * @param parentNumber 父级序号
     * @param currentLevel 当前级别
     * @param sn 序号
     */
    addNumber(obj, parentNumber, currentLevel = 1, sn = 0) {
      for (let index = 0; index < obj.length; index++) {
        let maxLevelShow = this.level > 0 && currentLevel > this.level
        if (maxLevelShow) {
          return;
        }
        const element = obj[index];
        let children = element.children;
        let items = element.items;
        if (!this.linkNumberShow) {
          sn = 0
        }
        let newSn = (index + 1 + sn).toString();
        let itemsLen = items == undefined ? 0 : items.length;
        let itemSn;
        if (children) {
          if (parentNumber) {
            element.number = itemSn = parentNumber.toString() + newSn;
          } else {
            element.number = index + 1;
          }
          this.addNumber(children, element.number + "-", currentLevel + 1, itemsLen);
        } else {
          element.number = itemSn = parentNumber.toString() + newSn;
        }
        // items序号处理
        if (items && itemSn && !(maxLevelShow || currentLevel == this.level)) {
          for (let k = 0; k < items.length; k++) {
            const item = items[k];
            if (this.linkNumberShow) {
              item.number = itemSn + "-" + (k + 1);
            }
          }
        }
      }
    },
  },
};
</script>