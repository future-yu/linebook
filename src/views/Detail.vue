<template>
    <div v-loading="init_loading">
        <el-container>
            <el-header height="auto">
                <el-row>
                    <el-col :span="20">
                        <ul>
                            <li v-for="(item,index) in detailData.tags" :key="index">
                                <el-row>
                                    <el-col :span="2">
                                        <span>{{item.tag_name}}</span>
                                    </el-col>
                                    <el-col :span="22">
                                        <StatusBtn v-on:tag-select="onLoadCategory"
                                                   v-for="(tag_item,index) in item.tag_value" :key="index"
                                                   :tagName="tag_item.value"></StatusBtn>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="success" @click="onSearchTag">查询</el-button>
                    </el-col>
                </el-row>

            </el-header>
            <el-main>
                <el-row v-loading="loading" :gutter="10">
                    <el-col :span="4" v-for="(item,index) in detailData.thumbs" :key="index">
                        <div class="img_thumb_box">
                            <a :href="item.full_target">
                                <div :style="item.thumb_src"></div>
                            </a>
                        </div>
                    </el-col>
                </el-row>
                <el-button-group v-if="max_page>0">
                    <el-button type="primary" @click="onPrePage" :disabled="disabledPre">上一页</el-button>
                    <el-button type="primary">{{page_current+1}}</el-button>
                    <el-button type="primary" :disabled="disabledNext" @click="onNextPage">下一页</el-button>
                </el-button-group>
            </el-main>
        </el-container>
    </div>
</template>
<style scoped>
    .img_thumb_box {
        overflow: hidden;
        height: 149px;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: left;
    }

    li {
        margin-bottom: 10px;
    }

    span {
        padding-right: 10px;
    }

    li button {
        margin: 0 10px 10px 0 !important;
    }

</style>
<script>
    import {getDetail, loadThumb} from '../api'
    import StatusBtn from '../components/status-btn'

    export default {
        name: 'Detail',
        created() {
            let target = this.$route.query.target;
            getDetail(target).then(({data, status}) => {
                if (status == 200) {
                    this.detailData = data;
                    this.max_page = data.max - 1;
                    this.loading = false;
                    this.init_loading = false;
                }
            }).catch((e) => {
                throw e;
            })
        },
        data() {
            return {
                detailData: {},
                page_current: 0,
                disabledPre: true,
                disabledNext: false,
                max_page: 0,
                loading: true,
                init_loading: true,
                tag_select: {}
            }
        },
        methods: {
            onLoadCategory(tag_name) {
                this.tag_select[tag_name] = !this.tag_select[tag_name];
            },
            onSearchTag(){
              let allTags = [];
              for (let key in this.tag_select){
                  if(this.tag_select[key]){
                      allTags.push(key);
                  }
              }
              this.$router.push(`/?search_input=${allTags.join('+')}`)
            },
            onPrePage() {
                let page_index = this.page_current - 1;
                if (page_index < 1) {
                    this.page_current = 0;
                    this.disabledPre = true
                } else {
                    this.page_current = page_index;
                    this.disabledPre = false
                }
                this.disabledNext = false;
                this.loading = true;

                this.loadThumbPage();

            },
            onNextPage() {
                let page_index = this.page_current + 1;
                if (page_index > this.max_page - 1) {
                    this.page_current = this.max_page;
                    this.disabledNext = true
                } else {
                    this.page_current = page_index;
                    this.disabledNext = false
                }
                this.disabledPre = false;
                this.loading = true;
                this.loadThumbPage();
            },
            loadThumbPage() {
                loadThumb(this.$route.query.target, this.page_current).then(({data, status}) => {
                    if (status == 200) {
                        this.detailData.thumbs = data;
                        this.loading = false;
                    }
                }).catch((e) => {
                    throw e;
                })
            }
        },
        components: {
            StatusBtn
        }
    }

</script>
