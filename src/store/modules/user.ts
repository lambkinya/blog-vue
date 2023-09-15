import { getUserInfo, logout } from "@/api/login";
import { UserInfo } from "@/api/user/types";
import { removeToken } from "@/utils/token";
import { UserState } from "../types";

const useUserStore = defineStore("useUserStore", {
  state: (): UserState => ({
    no: "",
    avatar: "",
    nickname: "",
    email: "",
    account: "",
    website: "",
    saying: "",
    loginType: undefined,
    path: "",
    articleLikeSet: [],
    commentLikeSet: [],
    talkLikeSet: [],
  }),
  actions: {
    GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            if (data.flag) {
              this.no = data.data.no;
              this.avatar = data.data.avatar;
              this.nickname = data.data.nickname;
              this.email = data.data.email;
              this.account = data.data.account;
              this.website = data.data.website;
              this.saying = data.data.saying;
              this.loginType = data.data.loginType;
              this.articleLikeSet = data.data.articleLikeSet;
              this.commentLikeSet = data.data.commentLikeSet;
              this.talkLikeSet = data.data.talkLikeSet;
            }
            resolve(data);           
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.$reset();
            removeToken();
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    forceLogOut() {
      this.$reset();
      removeToken();
    },
    savePath(path: string) {
      this.path = path;
    },
    articleLike(articleId: number) {
      let index = this.articleLikeSet.indexOf(articleId);
      if (index != -1) {
        this.articleLikeSet.splice(index, 1);
      } else {
        this.articleLikeSet.push(articleId);
      }
    },
    commentLike(commentId: number) {
      let index = this.commentLikeSet.indexOf(commentId);
      if (index != -1) {
        this.commentLikeSet.splice(index, 1);
      } else {
        this.commentLikeSet.push(commentId);
      }
    },
    talkLike(talkId: number) {
      let index = this.talkLikeSet.indexOf(talkId);
      if (index != -1) {
        this.talkLikeSet.splice(index, 1);
      } else {
        this.talkLikeSet.push(talkId);
      }
    },
    updateUserInfo(user: UserInfo) {
      this.nickname = user.nickname;
      this.website = user.website;
      this.saying = user.saying;
      this.avatar = user.avatar;
    },
  },
  getters: {},
  persist: {
    key: "user",
    storage: sessionStorage,
  },
});

export default useUserStore;
