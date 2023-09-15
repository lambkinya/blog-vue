import { PageQuery } from "@/model";

/**
 * 最近评论
 */
export interface RecentComment {
  /**
   * 评论id
   */
  id: number;
  /**
   * 昵称
   */
  nickname: number;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评论内容
   */
  commentContent: string;
  /**
   * 评论时间
   */
  createTime: string;
}

/**
 * 评论查询参数
 */
export interface CommentQuery extends PageQuery {
  /**
   * 类型id
   */
  typeId?: number;
  /**
   * 评论类型
   */
  commentType: number;
}

/**
 * 回复
 */
export interface Reply {
/**
   * 评论编号
   */
  no: string;
  /**
   * 评论用户编号
   */
  coderNo: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评论内容
   */
  content: string;
  /**
   * 所回复的目标评论的用户编号
   */
  toCoderNo: string;
  /**
   * 所回复的目标评论的用户名
   */
  toNickname: String;
  /**
   * 点赞数
   */
  likeCount: number;
  /**
   * 评论时间
   */
  createTime: string;
}

/**
 * 评论
 */
export interface Comment {
  /**
   * 评论编号
   */
  no: string;
  /**
   * 评论用户编号
   */
  coderNo: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 评论内容
   */
  content: string;
  /**
   * 所回复的目标评论的用户编号
   */
  toCoderNo: string;
  /**
   * 点赞数
   */
  likeCount: number;
  /**
   * 回复量
   */
  replyCount: number;
  /**
   * 回复列表
   */
  childrenCommentList: Comment[];
  /**
   * 评论时间
   */
  createTime: string;

  /**
   * 当前评论位于第几页
   */
  pageNo: string;
}

/**
 * 评论表单
 */
export interface CommentForm {
  /**
   * 类型id
   */
  typeId?: number;
  /**
   * 评论类型 (1文章 2友链 3说说)
   */
  commentType: number;
  /**
   * 父评论编号
   */
  root_comment_no?: string;
  /**
   * 被回复评论编号
   */
  to_comment_no?: string;
  /**
   * 被回复用户编号
   */
  to_coder_no?: string;
  /**
   * 评论内容
   */
  content: string;
}
