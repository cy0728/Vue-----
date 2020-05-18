<template>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown ">
        <div class="comment" v-if="isdisplay">
            <input type="text" placeholder="说点什么吧，也许Ta能听得到" v-model="content" />
            <div class="comment-info" @click="sendMsg">发表</div>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            isdisplay: false,
            content: ""
        };
    },
    created() {
        // console.log(this.$parent.$parent.phone);
    },
    methods: {
        sendMsg() {
            var that = this;
            console.log(that.$parent.id);
            axios({
                url:
                    "login/cellphone?phone=" +
                    that.$parent.$parent.phone +
                    "&password=" +
                    that.$parent.$parent.password
            }).then(function(res) {
                axios({
                    url:
                        "/comment?t=1&type=0&id=" +
                        that.$parent.id +
                        "&content=" +
                        that.content,
                    withCredentials: true //关键
                }).then(function(res) {
                    if (res.data.code == 200) {
                        var obj = {
                            user: {
                                avatarUrl:
                                    res.data.comment.user.avatarUrl +
                                    "?param=50y50",
                                nickname: res.data.comment.user.nickname
                            },
                            time: new Date(),
                            likedCount: 0,
                            content: that.content
                        };
                        that.$parent.newReview.unshift(obj);
                        that.content = "";
                    }
                });
            });
        }
    }
};
</script>

<style  scoped>
.comment {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: -2px;
    left: 0;
}
input {
    flex: 6;
    height: 40px;
    border: 0;
    padding-left: 10px;
    outline: none;
}
.comment-info {
    height: 100%;
    flex: 1;
    line-height: 40px;
    background-color: #e86459;
    text-align: center;
    letter-spacing: 2px;
}
</style>
