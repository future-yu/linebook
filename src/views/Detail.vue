<template>
    <div class="about">
        <el-container>
            <el-header height="auto">
                <ul>
                    <li v-for="(item,index) in detailData.tags" :key="index">
                        <span>{{item.tag_name}}</span>
                        <el-button v-for="(tag_item,index) in item.tag_value" :key="index"
                                   :data-target='tag_item.target' type="primary" size="small" @click="onLoadCategory">{{tag_item.value}}
                        </el-button>
                    </li>
                </ul>
            </el-header>
            <el-main>
                <el-row v-loading="loading">
                    <el-col :span="3" v-for="(item,index) in detailData.thumbs" :key="index">
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
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: left;
    }
    li{
        margin-bottom: 10px;
    }
    span{
        padding-right: 10px;
    }
</style>
<script>
    import {getDetail, loadThumb,getCategoryPage} from '../api'

    export default {
        name: 'Detail',
        created() {
            let target = this.$route.query.target;
            getDetail(target).then(({data, status}) => {
                if (status == 200) {
                    this.detailData = data;
                    this.max_page = data.max - 1;
                    this.loading = false;
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
                loading: true
            }
        },
        methods: {
            onLoadCategory(e){
                let target =e.currentTarget.dataset.target;
                getCategoryPage(target)
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
        }
    }

</script>
