<template>
    <div>
        {{message}}
    </div>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return {
            message:'默认页'
        }
    },
    mounted(){
        console.log(this.id)
        console.log(this.$route)
    }
}
</script>

<style>

</style>

