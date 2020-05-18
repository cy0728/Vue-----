<template>
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div class="sharePage" v-show="isDisplaySharePage">
      <div class="topFixed">
        <!-- 返回按钮(有z-index问题) -->
        <div class="z-topButton" @click="closeSharePage">
          <img src="@/assets/fanhuisanjiaoxing.png" alt width="10" height="10" />
        </div>
        <!-- 标题框 -->
        <div class="lplp-topTitle">
          <span v-text="title"></span>
          <img src="@/assets/search.png" alt width="50" heigh="50" />
        </div>
        <!-- 按钮 -->
        <div class="lplp-topBuuton">
          <div class="lplpt-out" @click="addToPlayList()">
            <img src="@/assets/md-play.png" alt width="25" height="25" />
            <div>播放列表</div>
          </div>
          <div class="lplpt-out" @click="randomPlay()">
            <img src="@/assets/ios-shuffle.png" alt width="30" height="30" />
            <div>随机播放</div>
          </div>
        </div>
      </div>
      <!-- 占位 -->
      <div style="width: 100%;height:167px;background-color: rgb(35, 38, 44);z-index:11;"></div>

      <!-- 渲染最近播放列表 -->

      

      <!-- 默认空列表 -->

      <div class="lplp-totalNumber"></div>
      <!-- 占位 -->
      <div style="width: 100%;height: 150px;"></div>
    </div>
  </transition>
</template>
<style scoped>
/* 最近播放页面 */
.sharePage {
  box-sizing: border-box;
  width: 100%;
  height: 800px;
  /* height: 0; */
  background-color: rgb(27, 31, 37);
  z-index: 11;
  position: fixed;
  top: 0;
  right: 0;
  /* padding: 40px; */
  overflow: scroll;
}
.topFixed {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: rgb(35, 38, 44);
}
.z-topButton {
  width: 60px;
  height: 22px;
  border-radius: 20px;
  background-color: #fff;
  margin: 10px;
}

.z-topButton img {
  margin-left: 5px;
}

.lplp-topTitle {
  margin: 0 auto;
  width: 450px;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.lplp-topTitle span {
  color: white;
  font-size: 30px;
  letter-spacing: 2px;
  margin-left: 10px;
}

.lplp-topBuuton {
  width: 375px;
  padding: 10px;
  box-sizing: border-box;
  height: 60px;
  /* border: 1px solid white; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.lplpt-out {
  width: 170px;
  height: 50px;
  background-color: rgb(43, 46, 52);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  color: white;
  font-size: 20px;
  letter-spacing: 2px;
  align-items: center;
  justify-content: space-around;
}

.lplp-playedList {
  width: 355px;
  height: 90px;
  /* border: 1px solid white; */
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}

.lplp-playedList > img {
  /* border: 1px solid white; */
  border-radius: 10px;
}

.lplp-right {
  width: 280px;
  height: 95px;
  border-bottom: 1px solid rgb(49, 53, 65);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.lplp-songInfo {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.lplp-songInfo span:first-child {
  width: 250px;
  height: 27px;
  overflow: hidden;
  font-size: 20px;
  letter-spacing: 1px;
}

.lplp-songInfo span:last-child {
  width: 250px;
  overflow: hidden;
  font-size: 15px;
  height: 20px;
  letter-spacing: 1px;
}

.lplp-totalNumber {
  width: 450px;
  margin: 0 auto;
  color: rgb(144, 146, 149);
  font-size: 20px;
  margin-top: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}
</style>
<script>
import bus from "@/eventBus.js";
export default {
  data() {
    return {
      isDisplaySharePage: false,
      whichList: "",
      title: "",
      latestPlayedList: [],
      i: 0
    };
  },
  created() {
    bus.$on("openLatestPage", obj => {
      this.$parent.shrinkFont();
      this.whichList = obj.list;
      this.title = obj.name;
      this.isDisplaySharePage = true;
    });
  },
  methods: {
    closeSharePage() {
      this.isDisplaySharePage = false;
      this.$parent.zommFont();
    },
    nextSong() {
      console.log("下一首");
      if (this.i < this.latestPlayedList.length - 1) {
        this.i++;
        this.$parent.play(this.latestPlayedList[this.i].id);
      } else {
        this.i = 0;

        this.$parent.play(this.latestPlayedList[this.i].id);
      }
    },
    preSong() {
      if (this.i > 0) {
        this.i--;
        this.$parent.play(this.latestPlayedList[this.i].id);
      } else {
        this.i = this.latestPlayedList.length - 1;
        this.$parent.play(this.latestPlayedList[this.i].id);
      }
    }
  }
};
</script>

