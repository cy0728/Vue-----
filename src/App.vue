<template>
    <div id="app">
        <div class="header">
            <van-nav-bar title="希 声">
                <template #right>
                    <van-icon name="search" size="20" @click="openSearchPage"/>
                </template>
            </van-nav-bar>
            <van-tabs v-model="activeName">
                <van-tab title="推荐" name="推荐"></van-tab>
                <van-tab title="歌手" name="歌手"></van-tab>
                <van-tab title="排行" name="排行"></van-tab>
            </van-tabs>
        </div>

        <router-view></router-view>

        <!-- 搜索组件 -->
        <searchIndex></searchIndex>
        <!-- 搜索界面 -->
        <searchIndex ref="searchpage"></searchIndex>
    </div>
</template>

<script>
import searchIndex from "@/components/search/seachIndex.vue";
export default {
    data() {
        return {
            activeName: "推荐",
        };
    },
    components: {
        searchIndex
    },
    methods: {
        //打开搜索界面
        openSearchPage() {
            this.$refs.searchpage.showSearchPage = true;
        },
    },
};
</script>

<style lang="less">
/* .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #222622;
    width: 100%;
    height: 90px;
} */

[class*="van-hairline"]::after {
    border: none !important;
}
.van-nav-bar__title {
    color: #fff !important;
    font-weight: bold !important;
}
.van-tab--active {
    color: #fff !important;
    font-weight: bold !important;
}
.van-tabs__line {
    background-color: #23262c !important;
}
.van-tab__text {
    font-size: 15px;
}
.van-nav-bar {
    background-color: #23262c !important;
}
.van-tabs__nav {
    background-color: #23262c !important;
}
.van-nav-bar .van-icon {
    color: #fff !important;
}
</style>
