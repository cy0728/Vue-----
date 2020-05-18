<template>
    <div id="app">
        <div class="title">
            <div class="title-left">
                <span class="firstText">HISTORY</span>
                <span class="secondText">最近</span>
            </div>
            <div class="rubbish" @click="garbage">
                <img src="../../assets/lajitong.png" width="30" height="30" />
            </div>
        </div>

        <div v-for="item in todos" :key="item.text" class="searchHistoryContent">
            <span>{{ item.text }}</span>
            <div class="cloud">
                <img src="../../assets/yun.png" alt width="30" height="30" />
            </div>
        </div>
    </div>
</template>
<style scoped>
/* .cloud img {
  margin-right: 5px;
} */
.title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 25px;
    height: 65px;
    margin-bottom: 40px;
}
.rubbish img {
    margin-top: 25px;
    margin-right: 10px;
}

.title-left {
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 6px;
}
.firstText {
    letter-spacing: 2px;
    font-size: 10px;
    width: 80px;
    color: #e86459;
}
.secondText {
    letter-spacing: 5px;
    width: 80px;
    font-size: 25px;
}
.searchHistoryContent {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    /* border-bottom: 1px solid #fff; */
    width: 360px;
    margin-left: 2px;
}
.searchHistoryContent span {
    color: #fff;
    margin-left: 15px;
    font-size: 18px;
    letter-spacing: 4px;
}

#app {
    width: 375px;
    height: 630px;
    overflow: scroll;
    /* background-color: #fff; */
    /* margin-left: 10px; */
    margin-top: 105px;
    box-sizing: border-box;
    padding: 0;
}
/* #app span {
  color: #e86459;
  position: absolute;
  top: 10px;
  left: 0px;
}

#app h2 {
  color: white;
  position: absolute;
  top: 30px;
  left: 0px;
}
.rubbish {
  
  position: absolute;
  top: 22px;
  right: 10px;
} */
/* .searchmore ul {
  width: 340px;
  position: absolute;
  top: 80px;
  left: 0px;
} */
/* .searchmore ul li {
  
  border-bottom: 1px solid gray;
  padding-top: 15px;
  padding-bottom: 20px;
  color: white;
} 
.searchmore ul li .cloud {
  float: right;
  margin-right: 6px;
} */
</style>

<script>
import bus from "../../eventBus.js";
export default {
    data() {
        return {
            todos: []
        };
    },
    created() {
        this.todos = this.$parent.todos;
    },
    methods: {
        add(content) {
            this.todos.unshift({
                text: content
            });
        },
        garbage() {
            this.todos.splice(0, this.todos.length);
        }
    }
};
</script>
