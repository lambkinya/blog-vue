/**
 * 邮箱
 */
export interface EmailForm {
  /**
   * 邮箱号
   */
  email: string;
  /**
   * 验证码
   */
  code: string;
}

/**
 * 用户信息
 */
export interface UserInfo {
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 个人网站
   */
  website: string;
  /**
   * 个人简介
   */
  saying: string;
  /**
   * 头像
   */
  avatar: string;
}
