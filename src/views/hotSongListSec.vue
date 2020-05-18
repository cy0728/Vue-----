<template>
    <div>
        <transition
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutRight"
        >
            <div id="app" v-if="isHotListPage">
                <!-- 主页 -->
                <div class="topAll">
                    <div class="mjptopbar" @click="hide">
                        <span class="j-header">返回</span>
                    </div>
                    <!-- 顶部歌单名字内容 -->
                    <div class="mjptitle">
                        <div class="topTitleText">
                            <span v-text="name"></span>
                        </div>
                        <img src="../assets/search.png" alt />
                    </div>
                </div>

                <!-- 中间图片移动部分 -->
                <div class="content">
                    <div class="outer">
                        <img
                            :src="item.al.picUrl + '?param=100y100'"
                            alt
                            v-for="item in list"
                            :key="item.name"
                        />
                    </div>
                </div>
                <!-- 中间歌单介绍内容 -->
                <div class="middleText">
                    <span
                        class="middleFirstText"
                        :class="flag"
                        @click="clickMore"
                        >{{ description }}</span
                    >
                </div>
                <!-- 中间按钮部分 -->
                <div class="middleMenu">
                    <div class="bofang" @click="contactAudio">
                        <img src="../assets/boFangSanJiaoXing.png" alt />
                        <span class="broadcast">播放</span>
                    </div>
                    <div class="suiji" @click="contactRandomAudio">
                        <img
                            src="../assets/suijibofang.png"
                            alt
                            id="suiji"
                            style="margin-right: 20px"
                        />
                        <span class="broadcast">随机播放</span>
                    </div>
                    <div class="more">
                        <img src="../assets/gengduojietu.png" alt id="more" />
                    </div>
                </div>
                <div
                    class="bottomSongDetails"
                    v-for="item in list"
                    :key="item.id"
                >
                    <div class="eachSongDetails" @click="play(item.id)">
                        <img
                            :src="item.al.picUrl + '?param=100y100'"
                            class="firstImg"
                        />
                        <div class="bottomText">
                            <span class="bottomFirstText">{{ item.name }}</span>
                            <span class="bottomSecondText">{{
                                item.ar[0].name
                            }}</span>
                        </div>
                        <img
                            src="../assets/songmore.png"
                            alt
                            class="secondImg"
                        />
                    </div>
                </div>
                <!-- 占位 -->
                <div style="width: 100%;height:150px;"></div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
.j-header {
    display: inline-block;
    width: 46px;
    height: 20px;
    text-align: right;
    border: 1px solid white;
    border-radius: 20px;
    background-color: white;
    color: black;
    position: relative;
    font-size: 14px;
    padding-right: 11px;
}

.j-header::after {
    content: "";
    border: 5px solid transparent;
    border-right-color: black;
    position: absolute;
    top: 5px;
    left: 0px;
    padding-left: 4px;
} 

#app {
    z-index: 14;
}
.hidden {
    height: 40px;
    overflow: hidden;
}
/* .middleText{
    height: 40px; 
    overflow: hidden;
} */
.topAll {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #23262c;
    width: 375px;
}

.eachSongDetails {
    display: flex;
    justify-content: space-between;
}
.firstImg {
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 5px;
    margin-top: 8px;
}
.secondImg {
    width: 16px;
    height: 16px;
    margin-top: 23px;
    margin-right: 10px;
}
.bottomText {
    display: flex;
    width: 285px;
    height: 65px;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-around;
    border-bottom: 1px solid #303541;
}
.bottomText span {
    color: #fff;
}

.bottomSecondText {
    margin-bottom: 5px;
    font-size: 13px;
    color: rgb(209, 212, 217);
}
#app {
    width: 100%;
    height: 750px;
    background: rgb(27, 31, 37);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 11;
    padding: 10px;
    /* overflow: scroll; */
}

.mjptopbar {
    margin-top: 10px;
    margin-left: 10px;
    width: 60px;
    height: 22px;
    border-radius: 10px;

    background-color: #fff;
}
.mjptopbar img {
    width: 10px;
    height: 10px;
    margin-left: 5px;
}
.mjptitle {
    height: 60px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
}
.topTitleText {
    font-size: 30px;
    color: white;
    width: 320px;
    height: 60px;
    overflow: hidden;
}
.topTitleText span {
    margin-left: 10px;
    display: inline-block;
}
.mjptitle img {
    width: 28px;
    height: 28px;
    margin-top: 12px;
    margin-right: 10px;
}

.content {
    width: 100%;
    height: 250px;
    /* overflow: hidden; */
    overflow: scroll;
    margin-top: 90px;
}
.outer {
    /* width: 3740px; */
    height: 250px;
    background-color: #23262c;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* transition: all 100s infinte; */
    /* position: relative; */
    /* top: 0; */
    /* overflow: scroll; */
}

.outer img {
    width: 70px;
    height: 70px;
    border-radius: 6px;
    margin-top: 7px;
    margin-right: 7px;
    /* background-color: red; */
    transition: all 100s infinte;
    /* animation: move 100s linear infinite; */
}
.middleText {
    display: flex;
    justify-content: space-between;
}
.middleFirstText {
    margin-top: 10px;
    color: rgb(206, 83, 65);
    font-size: 14px;
    letter-spacing: 2px;
    width: 355px;
    text-align: center;
}

.middleSecondText {
    color: rgb(206, 83, 65);
}

/*中间按钮部分*/
.middleMenu {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    margin-top: 1-px;
    background-color: rgb(27, 31, 37);
}

/* .middleMenu div img {
     width: 42px;
     height: 50px;
 } */

.middleMenu .bofang {
    width: 140px;
    height: 40px;
    line-height: 53px;
    color: #fff;
    font-size: 15px;
    background: #2a2d33;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.middleMenu .bofang .broadcast {
    font-size: 20px;
    margin-left: 30px;
}

.middleMenu .suiji {
    width: 140px;
    height: 40px;
    line-height: 53px;
    color: #fff;
    font-size: 15px;
    background: #2a2d33;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.middleMenu .more {
    width: 15%;
    height: 40px;
    background: #2a2d33;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* .middleMenu .more img {
  width: 30px;
  height: 25px;
} */

.middleMenu .bofang img {
    width: 20px;
    height: 20px;
}

.middleMenu .suiji img {
    width: 20px;
    height: 20px;
    margin-top: 5px;
}
</style>
<script>
import cyaxios from "@/tools/cyaxios";
import { HotSongListSecUrl } from "@/tools/api";
import $ from "jquery";
import { setInterval, clearInterval } from "timers";
import bus from "../eventBus.js";
export default {
    data() {
        return {
            list: [],
            isHotListPage: false,
            description: "",
            name: "",
            sint: "",
            flag: "hidden",
        };
    },
    created() {
        // this.getinfo();
        bus.$on("contactHotList", (id) => {
            this.$parent.shrinkFont();
            this.getHotList(id);
            this.isHotListPage = true;
        });
    },
    mounted() {
        // this.move();
    },
    watch: {
        isHotListPage(newval, oldval) {
            if (newval == true) {
                this.move();
            }
        },
    },
    methods: {
        async getHotList(id) {
            this.isHotListPage = false;
            let result = await cyaxios("GET", HotSongListSecUrl + id);
            this.name = result.playlist.name;
            this.description = result.playlist.description;
            this.list = result.playlist.tracks;
            var rate = Math.ceil(this.list.length / 3);
            $(".outer").css({
                width: rate * 100,
            });
            this.$parent.FBmove("topTitleText");
        },
        move() {
            // if (this.sint) {
            //     clearInterval(this.sint);
            //     $(".content").scrollLeft(0);
            // }
            var i = 0;
            this.sint = setInterval(() => {
                i++;
                $(".content").scrollLeft(i);
            }, 200);
        },
        hide() {
            clearInterval(this.sint);
            if (this.$store.state.flag == false) {
                this.$parent.zommFont();
            } else {
                this.$parent.shrinkFont();
            }
            this.$store.state.flag = false;
            this.isHotListPage = false;
        },

        play(id) {
            this.$parent.play(id);
        },
        clickMore() {
            if (this.flag == "hidden") {
                this.flag = "";
            } else {
                this.flag = "hidden";
            }
        },
        contactAudio() {
            var tmp = [];
            this.list.forEach((ele) => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.ar[0].name,
                };
                tmp.push(obj);
            });
            bus.$emit("contactWithWaitToPlay", tmp);
        },
        contactRandomAudio() {
            var tmp = [];
            this.list.forEach((ele) => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.ar[0].name,
                };
                tmp.push(obj);
            });
            bus.$emit("randomcontactWithWaitToPlay", tmp);
        },
    },
};
</script>
