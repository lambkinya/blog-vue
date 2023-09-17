<template>
  <div>
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem></twoPoem>
    </div>

    <div style="background: var(--background);padding-top: 40px;" class="my-animation-slide-bottom">
      <!-- 标签 -->
      <div class="sort-warp shadow-box" v-if="!$common.isEmpty(sort) && !$common.isEmpty(sort.tagInfoList)">
        <div v-for="(label, index) in sort.tagInfoList" :key="index"
          :class="{isActive: !$common.isEmpty(labelId) && labelId === label.no}" @click="listArticle(label)">
          <proTag :info="label.name+' '+label.articleCount"
            :color="$constant.before_color_list[Math.floor(Math.random() * 6)]" style="margin: 12px">
          </proTag>
        </div>
      </div>

      <!-- 文章 -->
      <div class="article-wrap">
        <articleList :articleList="articles"></articleList>
        <div class="pagination-wrap">
          <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articles.length">
            下一页
          </div>
          <div v-else style="user-select: none">
            ~~到底啦~~
          </div>
        </div>
      </div>
      <!-- 页脚 -->
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
  const twoPoem = () => import("./common/twoPoem");
  const proTag = () => import("./common/proTag");
  const articleList = () => import("./articleList");
  const myFooter = () => import("./common/myFooter");

  export default {
    components: {
      twoPoem,
      proTag,
      articleList,
      myFooter
    },

    data () {
      return {
        categoryNo: this.$route.query.categoryNo,
        labelId: this.$route.query.labelId,
        sort: null,
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          categoryNo: this.$route.query.categoryNo,
          labelId: this.$route.query.labelId
        },
        articles: []
      }
    },

    computed: {},

    watch: {
      $route () {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          categoryNo: this.$route.query.categoryNo,
          labelId: this.$route.query.labelId
        };
        this.articles.splice(0, this.articles.length);
        this.categoryNo = this.$route.query.categoryNo;
        this.labelId = this.$route.query.labelId;
        this.getSort();
        this.getArticles();
      }
    },

    created () {
      this.getSort();
      this.getArticles();
    },

    mounted () {
    },

    methods: {
      pageArticles () {
        this.pagination.current = this.pagination.current + 1;
        this.getArticles();
      },

      getSort () {
        let sortInfo = this.$store.state.sortInfo;

        if (!this.$common.isEmpty(sortInfo)) {
          let sortArray = sortInfo.filter(f => {
            return f.no === this.categoryNo;
          });
          if (!this.$common.isEmpty(sortArray)) {
            this.sort = sortArray[0];
          }
        }
      },
      listArticle (label) {
        this.labelId = label.id;
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          categoryNo: this.$route.query.categoryNo,
          labelId: label.id
        };
        this.articles.splice(0, this.articles.length);
        this.$nextTick(() => {
          this.getArticles();
        });
      },
      getArticles () {
        this.$http.post(this.$constant.baseURL + "/articles/list", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.articles = this.articles.concat(res.data.records);
              this.pagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      }
    }
  }
</script>

<style scoped>
  .sort-warp {
    width: 70%;
    max-width: 780px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .article-wrap {
    width: 70%;
    margin: 40px auto;
    min-height: 600px;
  }

  .isActive {
    animation: scale 1.5s ease-in-out infinite;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .pagination {
    padding: 13px 15px;
    border: 1px solid var(--lightGray);
    border-radius: 3rem;
    color: var(--greyFont);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .pagination:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }


  @media screen and (max-width: 900px) {
    .sort-warp {
      width: 90%;
    }

    .article-wrap {
      width: 90%;
    }
  }
</style>