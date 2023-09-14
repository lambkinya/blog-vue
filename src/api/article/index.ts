import { PageQuery, PageResult, Result } from "@/model";
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Article, ArticleInfo, ArticleRecommend, ArticleSearch } from "./types";

/**
 * 查看文章列表
 * @param params 查询条件
 * @returns 文章列表
 */
export function getArticleList(params: PageQuery): AxiosPromise<Result<PageResult<Article[]>>> {
  return request({
    url: "/articles/page",
    method: "get",
    params,
  });
}

/**
 * 查看文章
 * @param articleId 文章id
 */
export function getArticle(articleId: number): AxiosPromise<Result<ArticleInfo>> {
  return request({
    url: `/articles/${articleId}`,
    method: "get",
  });
}

/**
 * 查看推荐文章【昨日访问量前三】
 * @returns 推荐文章
 */
export function getArticleRecommend(): AxiosPromise<Result<ArticleRecommend[]>> {
  return request({
    url: "/articles/hotArticleList",
    method: "get",
  });
}

/**
 * 搜索文章
 * @returns 文章列表
 */
export function searchArticle(keyword: string): AxiosPromise<Result<ArticleSearch[]>> {
  return request({
    url: "/article/search",
    method: "get",
    params: {
      keyword,
    },
  });
}

/**
 * 点赞文章
 * @param articleId 文章id
 */
export function likeArticle(articleId: number): AxiosPromise<Result<null>> {
  return request({
    url: `/article/${articleId}/like`,
    method: "post",
  });
}
