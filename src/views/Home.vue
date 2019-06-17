<template>
    <div class="container">
        <el-container>
            <el-header>
                <el-input placeholder="请输入内容" v-model="search_input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-header>
            <el-main v-loading="loading">
                <el-row :gutter="10">
                    <el-col :span="6" v-for="(item,index) in img_items" :key="index">
                        <div class="img_item_box">
                            <el-image :fit="'cover'" :src="item.img_url" :data-target="item.target_url"
                                      @click="onShowDetail" :alt="item.title" lazy></el-image>
                        </div>
                        <p class="item_title">{{item.title}}</p>
                    </el-col>
                </el-row>
                <el-button v-if="page>0&&page<max_page" type="primary" :loading="item_loading" @click="onLoadMore">加载更多</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
    .img_item_box {
        height: 10rem;
        overflow-y: hidden;
    }

    .item_title {
        height: 1.5rem;
        font-size: 1rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.5rem;
        padding: 0;
    }
</style>

<script>
    let {getSearchInfo} = require('../api')
    export default {
        name: 'Home',
        created() {
            this.loadItems();
        },
        data() {
            return {
                search_input: '',
                page: 0,
                img_items: [],
                loading: true,
                item_loading: true,
                max_page:0
            }
        },
        methods: {
            onLoadMore() {
                this.item_loading = true;
                let cPage = this.page + 1;
                if(cPage>this.max_page){
                    this.page = this.max_page;
                }else{
                    this.page = cPage;
                    this.loadItems(true);
                }
            },
            loadItems(is_more = false) {
                getSearchInfo(this.page, this.search_input).then(({data, status}) => {
                    if (status == 200) {
                        console.log(data)
                        if (is_more) {
                            this.img_items = this.img_items.concat(data.items);
                        } else {
                            this.img_items = data.items;
                        }
                        this.max_page = data.max-1;
                    } else {
                        const h = this.$createElement;
                        this.$message({
                            message: h('p', null, [
                                h('span', null, '失败 '),
                                h('i', {style: 'color: teal'}, '请求错误!')
                            ])
                        });
                    }
                    this.loading = false;
                    this.item_loading = false;
                }).catch((e) => {
                    throw e;
                })
            },
            onShowDetail(e) {
                let target = e.currentTarget.dataset.target;
                this.$router.push('/detail?target='+target)
            }
        }
    }
</script>
