<template>
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut ">
        <div id="app" v-if="showSearchPage">
            <div class="out">
                <div class="topBar">
                    <div class="backInput" @click="hide">
                        <img src="../../assets/fanhuisanjiaoxing.png" alt class="leftTriangle" />
                    </div>

                    <img src="../../assets/cuohao.png" alt width="30" height="30" @click="hide" />
                </div>
                <div class="left">
                    <img src="../../assets/search.png" alt width="20" height="20" />
                    <input
                        type="text"
                        placeholder="在这里输入要搜索的内容"
                        v-model="content"
                        v-on:keyup.enter="getinfo()"
                        v-focus="true"
                    />
                </div>
            </div>

            <div>
                <router-view ref="child"></router-view>
            </div>
        </div>
    </transition>
</template>
<style  scoped>
* {
    padding: 0;
    margin: 0;
}
.topBar {
    display: flex;
    margin-top: 10px;
    padding-right: 10px;
    justify-content: space-between;
}
.backInput {
    width: 60px;
    height: 23px;
    margin-left: 10px;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    justify-content: space-around;
}
.leftTriangle {
    width: 15px;
    height: 15px;
    margin-top: 4px;
    margin-right: 45px;
}
#app {
    width: 100%;
    height: 700px;

    background-color: #1b1f25;

    position: fixed;
    top: 0px;
    left: 0px;
    border-radius: 20px;

    z-index: 15;
    overflow: hidden;
}

.left {
    width: 345px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    border-radius: 15px;
    background-color: rgb(25, 25, 33);
    margin-left: 9px;
    margin-top: 20px;
    /* background-color: red; */
}
.left input {
    width: 250px;
    height: 30px;
    border: 0;
    background-color: transparent;
    outline: none;
    padding-left: 10px;
    color: white;
    font-size: 16px;
}
</style>



<script>
import bus from "@/eventBus.js";
export default {
    data() {
        return {
            content: "",
            flag: true,
            todos: [],
            showSearchPage: false,
            searchArtistName: ""
        };
    },
    created() {
        content: "";
    },
    mounted() {
        bus.$on("msg", data => {
            this.searchArtistName = data;
            this.content = this.searchArtistName;
            if (this.searchArtistName != "") {
                this.getinfo();
            }
        });
    },
    directives: {
        focus: {
            inserted: function(el, { value }) {
                if (value) {
                    el.focus();
                }
            }
        }
    },

    methods: {
        getinfo() {
            var flag = false;
            this.todos.forEach(data => {
                if (data == this.content) {
                    flag = true;
                }
            });
            if (flag == false) {
                this.todos.unshift({
                    text: this.content
                });
            }

            var ct = this.content;

            this.$router.push({
                name: "sSecond",
                params: { ct: this.content }
            });
            this.$refs.child.getinfo(this.content);
        },
        hide() {
            this.showSearchPage = false;
            this.content = "";
        }
    },
    watch: {
        content(val) {
            console.log(val);
            if (val == "") {
                this.$router.push({
                    name: "lSearch",
                    params: { ct: this.content }
                });
            }
        }
    }
};
</script>



