<template>
    <div class="main">
        <van-swipe class="my-swipe" :autoplay="3000">
            <van-swipe-item v-for="item in bannerList" :key="item.imageUrl">
                <img v-lazy="item.imageUrl" />
            </van-swipe-item>
        </van-swipe>

        <!-- 播放器 -->
        <!-- <audio id="myAudio" ref="myAudio" preload="true" loop="false"></audio> -->
        <MyAudio ref="myAudio" :msg="songLrc"></MyAudio>

        <!-- 最新专辑 -->
        <NewAlbum></NewAlbum>
        <!-- 最新专辑详情页面 -->
        <NewAlbumDet ref="nabd"></NewAlbumDet>
        <!-- 最新专辑二级页面 -->
        <NewAlbumSec></NewAlbumSec>

        <!-- 新歌排行榜 -->
        <NewSongList @func="play"></NewSongList>
        <!-- 新歌排行榜详情页面 -->
        <NewSongRankDet></NewSongRankDet>

        <!-- 热歌榜 -->
        <TheRankOfNewSong @func="play"></TheRankOfNewSong>

        <!-- UK排行榜周榜 -->
        <UKRank @func="play"></UKRank>

        <!-- 美国Billboard周榜 -->
        <BillBoard @func="play"></BillBoard>

        <!-- 热门歌单 -->
        <RecoListHot></RecoListHot>
        <!-- 热门歌单详情页面 -->
        <HotsonglistDet></HotsonglistDet>
        <!-- 热门歌单二级页面 -->
        <hotSongListSec></hotSongListSec>

        <!-- 新碟上架 -->
        <NewAlbumSell></NewAlbumSell>

        <!-- 功能按钮页面 -->
        <SharePage ref="sharepage"></SharePage>

        <!-- 底部栏 -->
        <div id="mainplay" @scroll="mainplayEvent">
            <div class="content">
                <!-- 800 -->
                <div class="bottom-flex">
                    <img src="@/assets/yinyuex2.png" id="pic" @click="show" />
                    <!-- <img alt="" id="pic" @click='show'> -->
                    <div id="information">
                        <div id="songName">
                            <span>未在播放</span>
                        </div>
                        <span id="playStyle">♬ 扬声器</span>
                    </div>

                    <div class="playState">
                        <div class="burger2 menu" @click="changePlayState">
                            <div class="icon"></div>
                        </div>
                        <div class="next" @click="getNextSong">
                            <div id="u-l1" class="m-line"></div>
                            <div id="u-l2" class="m-line"></div>
                            <div id="u-l3" class="m-line"></div>
                        </div>
                    </div>
                </div>

                <!-- 控制条 -->
                <div id="control" @click="movePoint">
                    <div id="fill"></div>
                    <div id="point"></div>
                    <span id="start">00:00</span>
                    <span id="end">00:00</span>
                </div>
                <div id="maxSongName">
                    <span>未在播放</span>
                </div>
                <div id="maxSingerName">
                    <span>未知</span>
                </div>
                <!-- 暂停播放栏 -->
                <div class="bigState">
                    <!-- 上一曲 -->
                    <div class="pre" @click="getPreSong">
                        <div id="m-l1" class="m-line"></div>
                        <div id="m-l2" class="m-line"></div>
                        <div id="m-l3" class="m-line"></div>
                    </div>
                    <!-- //开始暂停 -->
                    <div class="burger2 menu" @click="changePlayState">
                        <div class="icon"></div>
                    </div>
                    <!-- 下一曲 -->
                    <div class="next next1" @click="getNextSongSmall">
                        <div id="u-l11" class="m-line"></div>
                        <div id="u-l21" class="m-line"></div>
                        <div id="u-l31" class="m-line"></div>
                    </div>
                </div>
                <!-- 音量条/剩余区-->
                <div id="restAera">
                    <div class="volumeControl">
                        <img src="@/assets/yinliang.png" alt />
                        <div class="vc-outline" @click="skipTime">
                            <div class="vc-fill"></div>
                            <div class="vc-point"></div>
                        </div>
                        <img src="@/assets/yinliangbig.png" alt />
                    </div>
                    <ul class="lrcList">
                        <li v-for="item in songLrc" :key="item.t">{{ item.c }}</li>
                    </ul>
                </div>

                <!-- 评论区 -->
                <review ref="rev"></review>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import cyaxios from "@/tools/cyaxios";
import { BannerUrl } from "@/tools/api";
import { LrcInfoUrl } from "@/tools/api";
import { PicInfoUrl } from "@/tools/api";
import MyAudio from "@/components/index/myaudio.vue";
import NewAlbum from "@/components/index/newAlbum.vue";
import NewAlbumDet from "@/views/newAlbumDet.vue";
import NewAlbumSec from "@/views/newAlbumSec.vue";
import NewSongList from "@/components/index/newSongList.vue";
import NewSongRankDet from "@/views/newSongRankDet.vue";
import TheRankOfNewSong from "@/components/index/theRankOfNewSong.vue";
import UKRank from "@/components/index/ukRank.vue";
import BillBoard from "@/components/index/billboard.vue";
import RecoListHot from "@/components/index/recoListHot.vue";
import HotsonglistDet from "@/views/hotsonglistDet.vue";
import HotSongListSec from "@/views/hotSongListSec.vue";
import NewAlbumSell from "@/components/index/newAlbumSell.vue";
import Review from "@/components/index/review.vue";
import SharePage from "@/components/index/sharePage.vue";
export default {
    data() {
        return {
            //轮播图列表
            bannerList: [],
            //控制底部栏
            flag: true,
            //歌词对象
            songLrc: [],
            //歌词处理前存储数组
            oLRC: [],
            //音量条
            vc_width: ""
        };
    },
    components: {
        MyAudio,
        NewAlbum,
        NewAlbumDet,
        NewAlbumSec,
        NewSongList,
        NewSongRankDet,
        TheRankOfNewSong,
        UKRank,
        BillBoard,
        RecoListHot,
        HotsonglistDet,
        HotSongListSec,
        NewAlbumSell,
        Review,
        SharePage
    },
    created() {
        this.getLunbo();
    },
    methods: {
        async getLunbo() {
            let result = await cyaxios("GET", BannerUrl);
            this.bannerList = result.banners;
        },
        // 打开最新专辑详情页面
        openNewAlbumDet() {
            this.$refs.nabd.show = true;
        },
        //打开新歌排行榜的详情页面
        opennewSongRankDet() {
            this.$refs.nabd.show = true;
        },
        //控制主页字体动画
        shrinkFont() {
            $("#allTop").css({
                "font-size": "10px",
                color: "black",
                top: "12px",
                "margin-left": "20px",
            });
        },
        zommFont() {
            $("#allTop").css({
                "font-size": "40px",
                color: "white",
                top: "10px",
                "margin-left": "10px",
            });
        },
        //播放暂停
        changePlayState() {
            $(".burger2").toggleClass("open");
            if (this.$refs.myAudio.ispaused == false) {
                this.$refs.myAudio.clickToStop();
                this.$refs.myAudio.ispaused = true;
                //暂停渐变
                this.stopchangePointColor();
            } else {
                this.$refs.myAudio.clickToPlay();
                this.$refs.myAudio.ispaused = false;
                //开始渐变
                this.changePointColor();
            }
        },
        //下一曲
        getNextSong() {
            $("#u-l2")
                .stop(true, false)
                .animate(
                    {
                        left: "40px"
                    },
                    function() {
                        $("#u-l2")
                            .css({
                                left: "-25px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "10px"
                            });
                    }
                );
            $("#u-l1")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#u-l1").css({
                            top: "0px"
                        });
                    }
                );
            $("#u-l3")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#u-l3").css({
                            top: "20px"
                        });
                    }
                );
            // myAudio.currentTime = myAudio.duration;
            this.$refs.sharepage.nextSong();
            this.$refs.waittoplay.nextSong();
        },
        //歌曲播放
        play(id) {
            Promise.all([this.getLrcInfo(id)]).then((res) => {
                this.$refs.myAudio.audioPlay(
                    "https://music.163.com/song/media/outer/url?id=" +
                        id +
                        ".mp3"
                );
                //圆点渐变
                this.changePointColor();
                this.getPicInfo(id);
            });
            // ..获取评论
            this.$refs.rev.getGoodReview(id);
            this.$refs.rev.getNewReview(id);
        },
        //获取并处理歌词
        async getLrcInfo(id) {
            let that = this;
            let result = await cyaxios("GET", LrcInfoUrl + id);
            if (result.lrc.lyric) {
                let temp = result.lrc.lyric;
                that.createLrcObj(temp);
                that.songLrc.splice(0, that.songLrc.length);
                that.oLRC.forEach(ele => {
                    if (ele != NaN) {
                        that.songLrc.push(ele);
                    }
                });
                that.oLRC.splice(0, that.oLRC.length);
            }
        },
        //歌曲图片信息
        async getPicInfo(id) {
            let that = this;
            let result = await cyaxios("GET", PicInfoUrl + id);
            //摄制播放器图片名称
            $("#pic").attr("src", "");
            $("#pic").attr(
                "src",
                result.songs[0].al.picUrl + "?param=325y325"
            );
            $("#songName span").text(result.songs[0].name);
            //标题滚动
            that.FBmove("songName");
            $("#maxSongName span").text(result.songs[0].name);
            that.FBmove("maxSongName");
            $("#maxSingerName span").text(
                result.songs[0].ar[0].name +
                    "-" +
                    result.songs[0].al.name
            );
            that.FBmove("maxSingerName");
        },
        // 播放点的背景渐变
        changePointColor() {
            $("#point").css({
                animation: "bg-color 10s infinite"
            });
        },
        stopchangePointColor() {
            $("#point").css({
                animation: "none"
            });
        },
        //进度条拖动
        movePoint(event) {
            var e = event;
            var offset = e.offsetX;
            var skipRate = offset / $("#control").width();
            this.$refs.myAudio.audioMovePoint(skipRate);
        },
        //歌词处理函数
        createLrcObj(lrc) {
            if (lrc.length == 0) return;
            var lrcs = lrc.split("\n"); //用回车拆分成数组
            for (var i in lrcs) {
                //遍历歌词数组
                lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                var t = lrcs[i].substring(
                    lrcs[i].indexOf("[") + 1,
                    lrcs[i].indexOf("]")
                ); //取[]间的内容
                var c = lrcs[i].substring(lrcs[i].indexOf("]") + 1);
                var s = t.split(":"); //分离:前后文字
                var time = Number(s[0]) * 60 + parseInt(s[1]);
                var content = c;
                var obj = {
                    t: time,
                    c: content
                };
                this.oLRC.push(obj);
            }
        },
        //歌曲跳时
        skipTime(event) {
            var offset = event.offsetX;
            var Vskip = offset / this.vc_width;
            this.$refs.myAudio.setVolume(Vskip);
            $(".vc-fill").animate({
                width: offset
            });
            $(".vc-point").animate({
                left: offset
            });
        },
        //歌名无缝滚动函数
        FBmove(id) {
            $("#" + id).css({
                "white-space": "nowrap",
                overflow: "hidden",
            });
            var rest = $("#" + id + " span").width() - $("#" + id).width();
            if (rest > 0) {
                setTimeout(function() {
                    $("#" + id).animate(
                        {
                            scrollLeft: rest,
                        },
                        7000,
                        function() {
                            setTimeout(function() {
                                $("#" + id).animate(
                                    {
                                        scrollLeft: 0,
                                    },
                                    7000
                                );
                            }, 2000);
                        }
                    );
                }, 1000);
                setInterval(function() {
                    $("#" + id).animate(
                        {
                            scrollLeft: rest,
                        },
                        7000,
                        function() {
                            setTimeout(function() {
                                $("#" + id).animate(
                                    {
                                        scrollLeft: 0,
                                    },
                                    7000
                                );
                            }, 2000);
                        }
                    );
                }, 21000);
            }
        },
        //评论
        mainplayEvent() {
            if ($("#mainplay").scrollTop() > 900) {
                this.$refs.rev.$refs.com.isdisplay = true;
            } else if ($("#mainplay").scrollTop() < 900) {
                this.$refs.rev.$refs.com.isdisplay = false;
            }
        },
        //底部栏动画
        show() {
            if (this.flag) {
                $("#pic").toggleClass("newPic");
                $("#information").animate(
                    {
                        width: "0"
                    },
                    500
                );
                $(".playState").animate(
                    {
                        width: "0"
                    },
                    500
                );
                $("#mainplay")
                    .stop(true, true)
                    .animate(
                        {
                            height: "750px"
                        },
                        500,
                        function() {
                            $(this).css({
                                overflow: "scroll"
                            });
                        }
                    );
                $("#mask")
                    .css("display", "block")
                    .animate(
                        {
                            opacity: "0.5"
                        },
                        500
                    );

                // $("#pic")
                //     .stop(true, true)
                //     .animate(
                //         {
                //             width: "325px",
                //             height: "325px"
                //         },
                //         3500
                //     );
                $("#outer").css({
                    transform: "scale(0.9,0.995)",
                    "border-radius": "40px 40px 0 0"
                });
                $("#topbar").css({
                    "border-radius": "40px 40px 0 0"
                });
                this.flag = !this.flag;
            } else {
                $("#mainplay").animate(
                    {
                        scrollTop: "0"
                    },
                    500,
                    function() {
                        $("#mask").animate(
                            {
                                opacity: "0"
                            },
                            500,
                            function() {
                                $(this).css("display", "none");
                            }
                        );
                        $("#pic").toggleClass("newPic");
                        $("#mainplay").animate(
                            {
                                height: "100px"
                            },
                            500,
                            function() {
                                $(this).css({
                                    overflow: "hidden"
                                });
                                $("#playState").animate(
                                    {
                                        width: "25vw"
                                    },
                                    500
                                );
                            }
                        );
                        this.ishidden = !this.ishidden;
                        $(".playState").animate(
                            {
                                width: "100px"
                            },
                            500
                        );

                        // $("#pic").animate(
                        //     {
                        //         width: "60px",
                        //         height: "60px"
                        //     },
                        //     500
                        // );
                        $("#information").animate(
                            {
                                width: "150px"
                            },
                            500
                        );
                        $("#topbar").css({
                            transform: "none",
                            "border-radius": "0"
                        });
                        $("#outer").css({
                            transform: "none",
                            "border-radius": "0"
                        });
                    }
                );

                this.flag = !this.flag;
            }
            //根据是否在播放歌曲,显示评论区
            if ($("#pic").attr("src") == "/static/img/音乐x2.a7876aae.png") {
                $(".review").css("display", "none");
            } else {
                $(".review").css("display", "block");
            }
        },
        getPreSong() {
            this.$refs.sharepage.preSong();
            this.$refs.waittoplay.nextSong();
            $("#m-l2")
                .stop(true, false)
                .animate(
                    {
                        left: "-25px"
                    },
                    function() {
                        $("#m-l2")
                            .css({
                                left: "40px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "0"
                            });
                    }
                );
            $("#m-l1")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#m-l1").css({
                            top: "0px"
                        });
                    }
                );
            $("#m-l3")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#m-l3").css({
                            top: "20px"
                        });
                    }
                );
        },
        getNextSongSmall() {
            this.$refs.sharepage.nextSong();
            this.$refs.waittoplay.nextSong();
            $("#u-l21")
                .stop(true, false)
                .animate(
                    {
                        left: "40px"
                    },
                    function() {
                        $("#u-l21")
                            .css({
                                left: "-25px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "10px"
                            });
                    }
                );
            $("#u-l11")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#u-l11").css({
                            top: "0px"
                        });
                    }
                );
            $("#u-l31")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#u-l31").css({
                            top: "20px"
                        });
                    }
                );
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    background-color: #23262c;
    padding-left: 15px;
    padding-right: 15px;
    // margin-top: 90px;
    margin-bottom: 65px;
}
.my-swipe {
    padding-top: 10px;
    padding-bottom: 30px;
    height: 130px;
    overflow: hidden;
    .van-swipe-item {
        height: 100%;
        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
}

.van-grid {
    /deep/ .van-icon__image {
        width: 2em;
        height: 2em;
    }
}

</style>
