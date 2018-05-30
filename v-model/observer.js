import Dep from './Dep'

// var dep =new Dep()
// // 数据监听
// function observe(data){
//     if(!data||typeof data!== 'object') return
//     Object.keys(data).forEach(key => {
//         var val = data[key]
//         observe(data[key])  // 将对象子对象的值同时监听
//         Object.defineProperty(data,key,{
//             get: function() {
//                 if(Dep.target) dep.addsub(Dep.target)
//                 return val
//             },
//             set: function(newValue) {
//                 if(val === newValue) return
//                 val = newValue
//                 console.log('我订阅了这个属性'+key+'现在为'+data[key])
//                 dep.notify()
//             }
//         })
//     });
// }
// 改为es6
class observer{
    constructor(data){
      this.data = data
      this._observe(this.data)
    }
    _observe(data){
        var self = this
        if(!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            self._bind(data,key,data[key])
        })
    }
    _bind(data,key,val){
        this._observe(val)
        var dep =new Dep()
        Object.defineProperty(data,key,{
            get() {
                if(Dep.target) dep.addsub(Dep.target)
                return val
            },
            set(newval) {
                if(val === newval) return
                val = newval
                console.log('订阅了'+key+'现在值为'+newval)
                dep.notify()
            }
        })
    }
}
export default observer



