<template>
    <div class ="aside-wrapper">
        <el-aside class="aside">
            <browser></browser>
        </el-aside>
    </div>
</template>

<script>
    import Browser from "@/components/browser/index";
    export default {
        name: "asidePage",
        components: {Browser},
        data(){
            return {
                tabPosition:""
            }
        }
    }
</script>

<style scoped>
    .aside{
        width: 200px;
        height: 100%;
        border-right-width: 5px;
        border-right-style: ridge;
        border-color: #CCCCCC #EFEFF4;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

    }

</style>
