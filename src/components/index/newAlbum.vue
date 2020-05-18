<template>
    <!-- 最新专辑 -->
    <div id="newAlbum" class="allContent">
        <div>专辑</div>
        <div class="titleStyle">
            <span>最新专辑</span>
            <span class="seeMore" @click="showIt">查看更多</span>
        </div>
        <div id="contain">
            <!-- 循环体 -->
            <div id="itemStyle" v-for="item in latestAblum" :key="item.id">
                <img
                    :src="item.picUrl + '?param=350y350'"
                    id="imgStyleSP"
                    @click="getAlbumSongs(item.id)"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less">
.seeMore {
    font-size: 13px;
    border: 1px solid #c1c1c1;
    padding-top: 3px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 5px;
    border-radius: 15px;
    text-align: center;
}
</style>
<script>
import cyaxios from "@/tools/cyaxios";
import { NewestUrl } from "@/tools/api";
import bus from "@/eventBus.js";
export default {
    data() {
        return {
            latestAblum: [],
        };
    },
    created() {
        this.getLatestAlbum();
    },
    methods: {
        async getLatestAlbum() {
            let result = await cyaxios("GET", NewestUrl);
            this.latestAblum = result.albums;
        },
        showIt() {
            bus.$emit("openNewAlbumDet", {
                name: "最新专辑",
                url: "album/newest",
            });
        },
        getAlbumSongs(id) {
            bus.$emit("contactNewAlbumSec", id);
        },
    },
};
</script>
