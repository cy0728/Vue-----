<template>
    <!-- 评论区 -->
    <!-- 精彩评论 -->
    <div class="review">
        <div class="top-title">精彩评论</div>
        <div class="review-item" v-for="(item, idx) in goodReview" :key="idx">
            <div class="review-top">
                <div class="review-top-left">
                    <img :src="item.user.avatarUrl + '?param=100y100'" alt />
                    <div class="review-user">
                        <span>{{ item.user.nickname }}</span>
                        <span>{{ item.time | formatTime }}</span>
                    </div>
                </div>
                <div class="review-top-right">
                    <span>{{ item.likedCount }}</span>
                    <!-- <div id="out"> -->
                    <img
                        class="nozan"
                        @click="boom($event)"
                        src="@/assets/space.png"
                    />
                    <!-- </div> -->
                </div>
            </div>
            <div class="review-body">{{ item.content }}</div>
        </div>
        <!-- 最新评论 -->
        <div class="newtop-title">最新评论</div>
        <transition-group
            enter-active-class="animated lightSpeedIn"
            mode="in-out"
        >
            <div
                class="review-item"
                v-for="item in newReview"
                :key="item.time"
            >
                <div class="review-top">
                    <div class="review-top-left">
                        <img
                            :src="item.user.avatarUrl + '?param=100y100'"
                            alt
                        />
                        <div class="review-user">
                            <span>{{ item.user.nickname }}</span>
                            <span>{{ item.time | formatTime }}</span>
                        </div>
                    </div>
                    <div class="review-top-right">
                        {{ item.likedCount }}
                        <img src="@/assets/feed_like@2x.png" alt />
                    </div>
                </div>
                <div class="review-body">{{ item.content }}</div>
            </div>
        </transition-group>
        <div class="loadMore" @click="getMoreReview">加载更多......</div>
        <comment ref="com"></comment>
    </div>
</template>
<style lang="less" scoped>
/* 评论 */
.review {
    width: 100%;
    margin-top: 50px;
    // padding-bottom: 40px;
    position: relative;
    /* background-color: skyblue; */
}

.top-title {
    color: white;
    font-size: 22px;
    margin-bottom: 20px;
}
.newtop-title {
    color: white;
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 60px;
}

.review-item {
    margin-top: 30px;
}

.review-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.review-top-left {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.review-top-left img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.review-user {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    margin-left: 7px;
}

.review-user span:first-child {
    font-size: 16px;
    color: #e86459;
    font-weight: normal;
}

.review-user span:last-child {
    font-size: 12px;
    color: white;
    font-weight: lighter;
    letter-spacing: 1px;
}

.review-top-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: flex-start;
    justify-content: flex-start;
    font-size: 14px;
    color: white;
    /* justify-content: flex-end; */
}

.review-top-right img {
    width: 25px;
    height: 25px;
    margin-left: 10px;
    border: none;
}

.review-top-right img.nozan {
    background-image: url(../../assets/picture/feed_like@2x.png);
    background-size: cover;
}

.review-top-right img.zan {
    background-image: url(../../assets/feed_like_press@2x.png);
    background-size: cover;
}

.review-body {
    margin-left: 30px;
    width: 295px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    padding-bottom: 30px;
    letter-spacing: 2px;
    font-weight: 300;
    line-height: 1.7;
    border-bottom: 1px solid #e86459;
}
.loadMore {
    width: 100%;
    height: 60px;
    // background-color: #fff;
    margin-top: 20px;

    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: bisque;
    letter-spacing: 2px;
}
//  #zanPic {
//       margin: 200px 200px;
//     }

#out {
    position: relative;
}

.boom {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    /* transition: all 0.5s; */
    transform: translate(0, 0);
}

#shownum {
    position: absolute;
    left: 0;
    right: 0;
    width: 20px;
    height: 20px;
}

#level {
    position: absolute;
    left: 0;
    right: 0;
    width: 80px;
    height: 40px;
}
</style>
<script>
import $ from "jquery";
import cyaxios from "@/tools/cyaxios";
import { GoodReviewUrl } from "@/tools/api";
import { NewReviewUrl } from "@/tools/api";
import animate from "animate.css";
import comment from "@/components/comment/comment.vue";
import { request } from "http";
import { constants } from "crypto";
export default {
    data() {
        return {
            id: "",
            goodReview: [],
            newReview: [],
            num: 1,
            count: 0,
            tv: "",
            flag: false,
        };
    },
    methods: {
        //获取热门评论
        async getGoodReview(id) {
            this.id = id;
            this.num = 1;
            let result = await cyaxios("GET", GoodReviewUrl + id + "&type=0");
            this.goodReview = result.hotComments;
        },
        //获取最新评论
        async getNewReview(id) {
            let result = await cyaxios("GET", NewReviewUrl + id + "&limit=20&offset=1");
            this.newReview = result.comments;
        },

        //获取更多评论
        async getMoreReview() {
            this.num++;
            let result = await cyaxios("GET", NewReviewUrl + id + "&limit=20&offset=" + this.num * 20 + 1);
            let tmp = result.comments;
            tmp.forEach((ele) => {
                this.newReview.push(ele);
            });
        },
        boom(e) {
            $(e.target).addClass("zan").removeClass(".nozan");
            this.$parent.boom(e);
        },
    },
    filters: {
        //评论时间格式化
        formatTime: function(msg) {
            var dt = new Date(msg);
            var y = dt.getFullYear();
            var m = dt.getMonth() + 1;
            var d = dt.getDate();
            var hh = dt.getHours();
            var mm = dt.getMinutes();
            var ss = dt.getSeconds();
            hh = hh < 10 ? "0" + hh : hh;
            mm = mm < 10 ? "0" + mm : mm;
            ss = ss < 10 ? "0" + ss : ss;
            return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`;
        },
    },
    components: {
        comment,
    },
};
</script>
