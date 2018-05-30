import godvue from './godvue'

var vm = new godvue({
    el:'#app',
    data: {
        message:'实现vue双向绑定'
    }
})

console.log(vm)
console.log(vm.$options.data.message )
console.log(vm.message)
window.godvue = vm

export default godvue