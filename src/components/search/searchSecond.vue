<template>
    <div class="container">
        <div class="header">Music</div>
        <div class="import">
            <div class="album">
                <div class="title">
                    <div class="title-left">
                        <span>Album</span>
                        <h2>专辑</h2>
                    </div>
                </div>
                <div class="border">
                    <div
                        class="albumItem"
                        v-for="item in albumList"
                        :key="item.id"
                        @click="enterNewAlbumSec(item.id)"
                    >
                        <img :src="item.artist.picUrl + '?param=70y70'" alt />
                        <div class="songInfo">
                            <span>{{ item.name }}</span>
                            <span>{{ item.artist.name }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="artists">
                <div class="title">
                    <div class="title-left">
                        <span>Artists</span>
                        <h2>歌手</h2>
                    </div>
                </div>
                <div class="border">
                    <div
                        class="artistsItem"
                        v-for="item in singerList"
                        :key="item.name"
                        @click="searchArtist(item.name)"
                    >{{ item.name }}</div>
                </div>
            </div>

            <div class="music">
                <div class="title">
                    <div class="title-left">
                        <span>Music</span>
                        <h2>歌曲</h2>
                    </div>
                </div>
                <div class="border">
                    <div class="albumItem" v-for="item in songList" :key="item.id" @click="play(item.id)">
                        <img :src="item.artists[0].img1v1Url + '?param=70y70'" alt />
                        <div class="songInfo">
                            <span>{{ item.name }}</span>
                            <span>{{ item.artists.name }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="playlist">
                <div class="title">
                    <div class="title-left">
                        <span>Playlist</span>
                        <h2>歌单</h2>
                    </div>
                </div>
                <div class="border">
                    <div class="albumItem" v-for="item in playList" :key="item.id" @click="getSongList(item.id)">
                        <img :src="item.coverImgUrl + '?param=70y70'" alt />
                        <div class="songInfo">
                            <span style="height:32px">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.artists {
    margin-left: 5px;
}
.container {
    width: 100%;
    height: 640px;
    margin-left: 10px;
    background-color: #1b1f25;
    overflow: hidden;
}
.header {
    width: 353px;
    background-color: #e86459;
    height: 30px;
    border-radius: 10px;
    font-size: 14px;
    color: white;
    text-align: center;
    line-height: 30px;
    margin-top: 20px;
}
.import {
    width: 100%;
    height: 560px;
    overflow: scroll;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
.title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.title-left {
    display: flex;
    flex-direction: column;
}
.title-left span {
    font-size: 14px;
    color: #e86459;
    /* margin-bottom: 10px; */
}
.title-left h2 {
    color: #fff;
}
.border {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    width: 100%;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
}
.albumItem {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
}
.albumItem img {
    border-radius: 10px;
}
.songInfo {
    display: flex;
    flex-direction: column;
    /* width: 70px; */
    overflow: hidden;
}
.songInfo span:first-child {
    font-size: 14px;
    color: white;
    width: 70px;
    height: 16px;
    overflow: hidden;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 5px;
}
.songInfo span:last-child {
    font-size: 12px;
    color: white;
    width: 70px;
    height: 16px;
    overflow: hidden;
    text-align: center;
    margin-bottom: 10px;
}
.artistsItem {
    height: 30px;
    color: white;
    border-radius: 20px;
    border: 1px solid white;
    line-height: 30px;
    padding: 0px 10px;
    font-size: 14px;
    margin: 10px;
    margin-left: 0;
}
</style>


<script>
import bus from "../../eventBus.js";
import cyaxios from "@/tools/cyaxios";
import { SearchUrl } from "@/tools/api";
export default {
    created() {
        this.getinfo(this.$route.params.ct);
    },
    mounted() {},
    data() {
        return {
            content: "",
            albumList: [],
            singerList: [],
            songList: [],
            playList: []
        };
    },
    methods: {
        async getinfo(ct) {
            let result = await cyaxios("GET", SearchUrl + ct);
            this.albumList = result.result.albums;
            this.singerList = result.result.artists;
            this.songList = result.result.songs;
            this.playList = result.result.playlists;
        },
        enterNewAlbumSec(id) {
            bus.$emit("enternewalbumsec", id);

            this.$store.state.flag = true;
        },
        play(id) {
            this.$parent.$parent.play(id);
        },
        searchArtist(item) {
            bus.$emit("msg", item);
        },
        getSongList(id) {
            bus.$emit("contactHotList", id);
            this.$parent.showSearchPage = false;
        }
    }
};
</script>



