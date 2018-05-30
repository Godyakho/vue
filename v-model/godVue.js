import observer from './observer'
import complier from './compiler'

class godVue {
    constructor(options){
        this.$options = options
        this.$el = this.$options.el
        this._data = this.$options.data
        Object.keys(this._data).forEach(key=>{
            this._proxy(key)
        })
        new observer(this._data)
        new complier(this.$el, this)
    }    
    // 代理映射 vm.$options.data.message => vm.message
    _proxy(key){
        var self = this
        Object.defineProperty(this,key,{
            get(){
                return self._data[key]
            },
            set(val){
                self._data[key] = val
            }
        })
    }
}

export default godVue;