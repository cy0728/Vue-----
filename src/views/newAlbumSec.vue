<template>
    <div>
        <transition
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutRight"
        >
            <div id="newAlbumContent" v-if="isSecondPage">
                <div id="mjpheader">
                    <div class="TopHomeAll">
                        <span class="j-header" @click="BackHome">返回</span>
                    </div>
                    <div id="topnav">
                        <span></span>
                        <div class="topSearch">
                            <!-- 搜索的图片 -->
                            <img src="../assets/sousuo.png" alt class="topSearchPic" />
                        </div>
                    </div>
                </div>
                <div class="newPicture">
                    <img src alt class="picture" />
                    <div class="firstText"></div>
                    <div class="secondText">2019</div>
                </div>
                <!-- 中间菜单部分 -->
                <div class="middleMenu">
                    <div class="bofang" @click="contactAudio1">
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
                <!-- 歌曲列表每项 -->
                <div class="songDetails" v-for="item in songList" :key="item.id">
                    <div class="songNumber">
                        <div>{{ item.no }}.</div>
                    </div>
                    <div class="song" @click="play(item.id)">
                        <div class="songname">{{ item.name }}</div>
                        <div class="author">{{ item.ar[0].name }}-{{item.al.name}}</div>
                    </div>
                </div>
                <!-- 占位 -->
                <div style="width: 100%;height:150px;"></div>
            </div>
        </transition>
    </div>
</template>


<script>
import $ from "jquery";
import cyaxios from "@/tools/cyaxios";
import { AlbumIdUrl } from "@/tools/api";
import bus from "../eventBus.js";
export default {
    data: function() {
        return {
            songList: [],
            isSecondPage: false
        };
    },
    created() {
        bus.$on("contactNewAlbumSec", id => {
            this.$parent.shrinkFont();
            this.getAlbumSongs(id);
            this.isSecondPage = true;
        });
    },
    methods: {
        //最新专辑二级页面
        async getAlbumSongs(id) {
            var that = this;
            this.isSecondPage = false;
            let result = await cyaxios("GET", AlbumIdUrl + id);
            this.songList = result.songs;
            $("#topnav span").text(that.songList[0].al.name);
            $(".newPicture img").attr(
                "src",
                that.songList[0].al.picUrl + "?param=250y250"
            );
            $(".firstText").text(that.songList[0].ar[0].name);
        },
        //最新专辑返回主页
        BackHome() {
            this.isSecondPage = false;
            this.$store.state.flag = false;
        },
        play(id) {
            this.$parent.play(id);
        },
        contactAudio1() {
            var tmp = [];
            this.songList.forEach(ele => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.ar[0].name
                };
                tmp.push(obj);
            });
            bus.$emit("contactWithWaitToPlay", tmp);
        },
        contactRandomAudio() {
            var tmp = [];
            this.songList.forEach(ele => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.ar[0].name
                };
                tmp.push(obj);
            });
            bus.$emit("randomcontactWithWaitToPlay", tmp);
        }
    }
};
</script>





<style scoped>
/* MJP的最新专辑二级页面的样式 */

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
    margin-left: 10px;
    margin-top: 10px;
    padding-right: 8px;
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

#newAlbumContent {
    width: 100%;
    height: 750px;
    z-index: 16;
    position: fixed;
    top: 0px;
    right: 0px;
    background: rgb(27, 31, 37);
    box-sizing: "border-box";
    overflow: scroll;
}

#mjpheader {
    position: fixed;
    width: 100%;
    background-color: rgb(35, 38, 44);
}

#topnav {
    width: 100%;
    height: 63px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    /* padding: 40px; */
    background-color: rgb(35, 38, 44);
}

#topnav span {
    margin-left: 13px;
    font-size: 30px;
    width: 300px;
    height: 45px;
    color: #fff;
    letter-spacing: 5px;
    overflow: hidden;
    display: inline-block;
}

/* 搜索图片的样式 */
.topSearchPic {
    margin-top: -4px;
    margin-right: 6px;
    width: 30px;
    height: 30px;
}

.newPicture {
    margin-top: 139px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 350px;
    justify-content: center;
}

.picture {
    width: 250px;
    height: 250px;
    border-radius: 20px;
    margin: 0 auto;
}

.firstText {
    width: 100%;
    height: 28px;
    font-size: 20px;
    color: #bdbdc2;
    text-align: center;
    margin: 12px 0 0px;
}

.secondText {
    color: #bababf;
    font-size: 15px;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
}

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
    height: 45px;
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
    height: 45px;
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
    height: 45px;
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

.songDetails {
    display: flex;
    width: 100%;
    height: 93px;
    margin: 5px 0 10px 0;
}

.songNumber {
    width: 12%;
    height: 96px;
    line-height: 96px;
    margin-left: 20px;
}

.songNumber div {
    font-size: 19px;
    justify-content: center;
    color: rgb(130, 130, 130);
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
}

.song {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid #303541;
    align-items: flex-start;
    margin: 5px 0 5px;
}

.songname {
    width: 270px;
    height: 25px;
    overflow: hidden;
    color: #fff;
    font-size: 19px;
}

.author {
    width: 270px;
    height: 20px;
    overflow: hidden;
    color: #fff;
    font-size: 15px;
}

.TopHomeAll {
    width: 100%;
    height: 40px;
}

.TopHome {
    width: 60px;
    height: 23px;
    margin-top: 10px;
    margin-left: 10px;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    justify-content: space-around;
}

.leftTriangle {
    width: 15px;
    height: 15px;
    margin-top: 4px;
    margin-right: 45px;
}
</style>

