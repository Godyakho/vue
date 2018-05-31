<template>
    <div>
        this is b.vue
        <div style = "border:1px solid #000">
            b 里有 router-view 
            <br>
            <router-link to="/Bb/test">to Bb/test</router-link>
            <router-link to="/Bb">to Bb</router-link>
            <transition name="fade">  
                <router-view />
            </transition>  
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.fade-enter-active, .fade-leave-active{
    transition: opacity 2s;
}
.fade-enter, .fade-leave-to{
    opacity:0
}
</style>


