<template>
    <!-- 新碟上架 -->
    <div id="newAlbumSell" class="allContent">
        <div>上新</div>
        <div class="titleStyle">
            <span>新碟上架</span>
            <span class="seeMore" @click="show">查看更多</span>
        </div>
        <div id="contain">
            <!-- 循环体 -->
            <div id="itemStyle" v-for="item in newablum" :key="item.id">
                <img
                    :src="item.blurPicUrl + '?param=250y250'"
                    id="imgStyle"
                    @click="getAlbumSongs(item.id)"
                />
                <span id="itemSongName">{{ item.name }}</span>
                <span id="singer">{{ item.artist.name }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped></style>
<script>
import cyaxios from "@/tools/cyaxios";
import { AlbumSellUrl } from "@/tools/api";
import bus from "@/eventBus.js";
export default {
    data() {
        return { newablum: [] };
    },
    created() {
        this.getNewAlbum();
    },
    methods: {
        //新碟上架
        async getNewAlbum() {
            let result = await cyaxios("GET", AlbumSellUrl);
            if (result.code == 200) {
                this.newablum = result.albums;
            }
        },
        show() {
            bus.$emit("openNewAlbumDet", {
                name: "新碟上架",
                url: "top/album",
            });
        },
        getAlbumSongs(id) {
            bus.$emit("contactNewAlbumSec", id);
        },
    },
};
</script>
