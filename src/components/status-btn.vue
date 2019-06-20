<template>
    <el-button round :type="isActive?'primary':'default'" size="small" @click="onTagSelect">{{tagName}}</el-button>
</template>

<script>
    export default {
        name: "status-btn",
        props:['tagName'],
        data(){
            return{
                isActive:false
            }
        },
        methods:{
            onTagSelect(){
                let tag_name = this.tagName.trim().split(' ').join('+');
                this.isActive=!this.isActive;
                this.$emit('tag-select',tag_name)
            }
        }
    }
</script>
