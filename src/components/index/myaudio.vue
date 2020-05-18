<template>
    <div>
        <audio
            id="myAudio"
            ref="audio"
            preload="true"
            @canplay="oncanplay"
            @timeupdate="ontimeupdate"
        ></audio>
    </div>
</template>
<script>
import $ from "jquery";
import { constants } from "crypto";
var width = $("#control").width();
var vc_width = $(".vc-outline").width();
var myAudio = document.getElementById("myAudio");
var VsongLrc = "";
var line = 0;
var totalTime = "";
var nowTime = "";
var rate = "";
export default {
    data() {
        return {
            audio: {
                preload: true,
                loop: false,
            },
            props: ["msg"],
            url: "",
            VsongLrc: "",
            ispaused: false,
            // 1最近播放 2播放列表
            list: 1,
        };
    },
    mounted() {
        var that = this;
        document.getElementById("myAudio").addEventListener(
            "ended",
            function() {
                if (that.list == 1) {
                    that.$parent.getNextSong();
                }
            },
            false
        );
    },
    methods: {
        clickToPlay() {
            this.$refs.audio.play();
        },
        clickToStop() {
            this.$refs.audio.pause();
        },
        audioPlay(songurl) {
            this.$refs.audio.src = songurl;
            this.$refs.audio.play();
            this.ispaused = false;
        },
        setVolume(num) {
            this.$refs.audio.volume = num;
        },
        oncanplay() {
            totalTime = this.$refs.audio.duration;
        },
        ontimeupdate() {
            nowTime = this.$refs.audio.currentTime;
            rate = nowTime / totalTime;
            var restTime = totalTime - nowTime;
            $("#fill").css("width", $("#control").width() * rate + "px");
            $("#point").css("left", $("#control").width() * rate + "px");
            $("#start").text(getResult(this.$refs.audio.currentTime) + " 秒");
            $("#end").text("- " + getResult(restTime));

            //字幕滚动
            if (this.$parent.songLrc[line].t <= nowTime) {
                $(".lrcList")
                    .stop(true, false)
                    .animate({
                        scrollTop: 40 * line,
                    });
                line++;
            }
        },

        audioMovePoint(skipRate) {
            var current = totalTime * skipRate;
            this.$refs.audio.currentTime = current;
        },
    },
};
function getResult(time) {
    var minute = Math.floor((time % 3600) / 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second = Math.floor(time % 60);
    second = second < 10 ? "0" + second : second;
    return minute + ":" + second;
}
</script>
