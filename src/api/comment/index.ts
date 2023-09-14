import { PageQuery, PageResult, Result } from "@/model";
import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Comment, CommentForm, CommentQuery, RecentComment, Reply } from "./types";

/**
 * 查看最新评论
 * @returns 最新评论
 */
export function getRecentComment(): AxiosPromise<Result<RecentComment[]>> {
  return request({
    url: "/recent/comment",
    method: "get",
  });
}

/**
 * 添加评论
 */
export function addComment(data: CommentForm): AxiosPromise<Result<null>> {
  return request({
    url: "/comments/add",
    method: "post",
    data,
  });
}

/**
 * 查看评论列表
 * @returns 评论列表
 */
export function getCommentList(params: CommentQuery): AxiosPromise<Result<PageResult<Comment[]>>> {
  return request({
    url: "/comments/list",
    method: "get",
    params,
  });
}

/**
 * 查看回复评论
 * @param commentNo 评论编号
 * @param pageNo 分页参数
 * @returns 回复评论列表
 */
export function getReplyList(commentNo: string, pageNo: number ): AxiosPromise<Result<Reply[]>> {
  return request({
    url: `/comments/${commentNo}/reply?pageNo=${pageNo}`,
    method: "get",
  });
}

/**
 * 点赞评论
 * @param commentId 评论id
 */
export function likeComment(commentId: number): AxiosPromise<Result<null>> {
  return request({
    url: `/comment/${commentId}/like`,
    method: "post",
  });
}
