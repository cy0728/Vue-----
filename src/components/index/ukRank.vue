// UK排行榜周榜
<template>
    <div id="newSongList" class="allContent">
        <div>榜单</div>
        <div class="titleStyle">
            <span>UK排行榜周榜</span>
            <span class="seeMore" @click="show">查看更多</span>
        </div>
        <!-- 主体内容 -->
        <div id="contain">
            <!-- 循环体 -->
            <div id="itemStyle" v-for="item in list" :key="item.id">
                <img :src="item.al.picUrl+'?param=250y250'" id="imgStyle" @click="play(item.id)" />
                <span id="itemSongName">{{ item.name }}</span>
                <span id="singer">{{ item.ar[0].name }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less">
/* 新的歌单样式 */
.allContent div:first-child {
    font-size: 15px;
    color: rgb(227, 82, 69);
    margin-bottom: 15px;
    letter-spacing: 5px;
}

#contain {
    display: flex;
    justify-content: flex-start;
    margin-top: 25px;
    margin-bottom: 40px;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding-bottom: 15px;
    overflow: scroll;
    border-bottom: 1px solid rgb(49, 53, 65);
}

#itemStyle {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-right: 20px;
    margin-bottom: 20px;
}

#imgStyle {
    width: 90px;
    height: 90px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

#imgStyleSP {
    width: 150px;
    height: 150px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

#itemSongName {
    font-size: 14px;
    display: inline-block;
    width: 90px;
    text-align: center;
    margin-top: 12px;
    font-weight: nomal;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    margin-bottom: 2px;
    letter-spacing: 2px;
}

#singer {
    font-size: 10px;
    font-weight: lighter;
    display: inline-block;
    width: 90px;
    text-align: center;
    margin-top: 5px;
    height: 15px;
    overflow: hidden;
    letter-spacing: 1px;
}
/* 标题样式 */
.titleStyle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 25px;
    letter-spacing: 3px;
}

.titleStyle img {
    width: 25px;
    height: 25px;
}
</style>

<script>
import cyaxios from "@/tools/cyaxios";
import { UKSongUrl } from "@/tools/api";
import bus from "@/eventBus.js";
export default {
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getNewSongInfo();
    },
    methods: {
        async getNewSongInfo() {
            let result = await cyaxios("GET", UKSongUrl);
            this.list = result.playlist.tracks.splice(1, 30);
        },
        play(id) {
            this.$emit("func", id);
        },
        show() {
            bus.$emit("opennewSongRankDet", {
                url: "top/list?idx=5",
                name: "UK排行榜周榜"
            });
        }
    }
};
</script>


