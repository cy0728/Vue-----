<template>
    <!-- 热门歌单 -->
    <div id="recoListHot" class="allContent">
        <div>歌单</div>
        <div class="titleStyle">
            <span>热门歌单</span>
            <span class="seeMore" @click="show">查看更多</span>
        </div>
        <div id="contain">
            <!-- 循环体 -->
            <!-- <div
                id="itemStyle"
                v-for="(item,idx) in playlist"
                :key="idx"
                @click="getHotList(item.id)"
            >
                <img :src="item.coverImgUrl+'?param=250y250'" id="imgStyle" />
                <span id="playlistDisc">{{ item.name }}</span>
      </div>-->
            <div
                class="newSongListStyle"
                v-for="(item, idx) in playlist"
                @click="getHotList(item.id)"
                :key="idx"
            >
                <img :src="item.coverImgUrl + '?param=830y830'" alt />
                <div class="newSongListStyleDisc">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
#playlistDisc {
    font-size: 14px;
    display: inline-block;
    width: 90px;
    text-align: center;
    margin-top: 12px;
    font-weight: lighter;
    height: 45px;
    overflow: hidden;
    margin-bottom: 5px;
    line-height: 22px;
    letter-spacing: 2px;
}
</style>

<script>
import cyaxios from "@/tools/cyaxios";
import { RecoListHotUrl } from "@/tools/api";
import bus from "@/eventBus.js";
export default {
    data() {
        return {
            playlist: [],
        };
    },
    created() {
        this.getPlaylistInfo();
        bus.$on("enterhotsongsec", (id) => {
            this.getHotList(id);
        });
    },
    methods: {
        //获取热门歌单
        async getPlaylistInfo() {
            var that = this;
            let result = await cyaxios("GET", RecoListHotUrl);
            this.playlist = result.playlists;
        },
        show() {
            bus.$emit("openHotsonglistkDet");
        },

        getHotList(id) {
            bus.$emit("contactHotList", id);
        },
    },
};
</script>
