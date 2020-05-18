<template>
    <!--新歌排行榜-->
    <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
    >
        <div id="app" v-if="show">
            <div class="j-frameStyle">
                <!--顶部栏-->
                <div class="header">
                    <span class="j-header" @click="hide">返回</span>
                    <div class="j-header-li">
                        <h1 class="j-paihangbang" v-text="name"></h1>
                    </div>
                    <div class="j-top-button">
                        <div class="j-t-b-item" id="j-bofang" @click="contactAudio2">
                            <img src="../assets/md-play.png" alt />
                            <span>播放</span>
                        </div>
                        <div class="j-t-b-item" @click="contactRandomAudio">
                            <img src="../assets/ios-shuffle.png" alt />
                            <span>随机播放</span>
                        </div>
                    </div>
                </div>

                <!--功能按钮-->
                <!--50首歌曲-->
                <div id="j-content">
                    <div id="j-itemStyle" v-for="(item,idx) in list" :key="idx">
                        <img :src="item.img" alt />
                        <div class="j-rightInfo">
                            <div class="j-songInfo" @click="play(item.id)">
                                <span>{{ item.name}}</span>
                                <span>{{ item.singerName}}</span>
                            </div>
                            <img src="../assets/songmore.png" alt />
                        </div>
                    </div>
                </div>
                <div class="j-footer"></div>
            </div>
        </div>
    </transition>
</template>

<script>
import cyaxios from "@/tools/cyaxios";
import bus from "../eventBus.js";
import animate from "animate.css";
import { constants } from "crypto";
export default {
    data() {
        return {
            list: [],
            show: false,
            name: ""
        };
    },
    created() {
        bus.$on("opennewSongRankDet", obj => {
            this.$parent.shrinkFont();
            this.name = obj.name;
            this.getNewSongs(obj.url);
            this.show = true;
        });
        bus.$on("openNewSongsTransmit", obj => {
            this.$parent.shrinkFont();
            this.name = obj.name;
            this.getNewSongsTransmit(obj.url);
            this.show = true;
        });
    },
    methods: {
        //新歌速递
        async getNewSongsTransmit(url) {
            let result = await cyaxios("GET", url);
            this.list = result.playlist.tracks.splice(1, 10);
            var tmp = result.data.splice(1, 50);
            tmp.forEach(ele => {
                var obj = {
                    name: ele.album.name,
                    singerName: ele.artists[0].name,
                    img: ele.album.picUrl + "?param=40y40",
                    id: ele.id
                };

                this.list.push(obj);
            });
        },
        async getNewSongs(url) {
            let result = await cyaxios("GET", url);
            var tmp = result.playlist.tracks.splice(1, 50);
            tmp.forEach(ele => {
                var obj = {
                    name: ele.name,
                    singerName: ele.ar[0].name,
                    img: ele.al.picUrl + "?param=40y40",
                    id: ele.id
                };
                this.list.push(obj);
            });
        },
        hide() {
            this.show = false;
            this.$parent.zommFont();
            this.list.splice(0, this.list.length);
        },
        play(id) {
            this.$parent.play(id);
        },
        contactAudio2() {
            var tmp = [];
            this.list.forEach(ele => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.singerName
                };
                tmp.push(obj);
            });
            bus.$emit("contactWithWaitToPlay", tmp);
        },
        contactRandomAudio() {
            var tmp = [];
            this.list.forEach(ele => {
                var obj = {
                    id: ele.id,
                    name: ele.name,
                    singerName: ele.singerName
                };
                tmp.push(obj);
            });
            bus.$emit("randomcontactWithWaitToPlay", tmp);
        }
    }
};
</script>

<style scoped>
* {
    padding: 0px;
    margin: 0px;
}

#app {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 12;
    background-color: #222622;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #222622;
    width: 100%;
    padding: 10px;
}

.j-frameStyle {
    width: 100%;
    background-color: #222622;
    box-sizing: border-box;
    padding: 10px;
    padding-bottom: 100px;
    padding-top: 155px;
    /* position: relative; */
}

.j-paihangbang {
    color: white;
}

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
    padding-right: 8px;
}

.j-header-li {
    padding-top: 10px;
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

.j-search {
    width: 40px;
    height: 40px;
    position: absolute;
    float: right;
    top: 49px;
    right: 30px;
}

.j-top-button {
    font-size: 18px;
    color: white;
    display: flex;
    margin-top: 16px;
    text-align: center;
    line-height: 34px;
    margin-bottom: 20px;
}

.j-t-b-item {
    flex-direction: row;
    background-color: #292d33;
    width: 165px;
    height: 36px;
    border-radius: 5px;
}

.j-t-b-item:first-child {
    margin-right: 20px;
}

.j-t-b-item img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    padding-right: 10px;
}

#j-itemStyle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

#j-itemStyle > img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: white;
}

.j-content {
    margin-top: 10px;
}

.j-rightInfo {
    width: 300px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #303541;
    letter-spacing: 2px;
}

.j-songInfo {
    display: flex;
    flex-direction: column;
}

.j-songInfo span:first-child {
    display: inline-block;
    max-width: 280px;
    font-size: 18px;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 6px;
}

.j-songInfo span:last-child {
    font-size: 12px;
    color: white;
    overflow: hidden;
    margin-bottom: 8px;
}

.j-rightInfo img {
    width: 16px;
    height: 16px;
}

.j-footer {
    color: white;
    font-size: 14px;
    text-align: left;
}
</style>