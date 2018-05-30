import watcher from './watcher'
const reg = /\{\{(.*)\}\}/
class complier{
    constructor(el,vm){
        this.el = document.querySelector(el)
        this.vm = vm
        this.flag = this._creamteFragment()
        this.el.appendChild(this.flag)
    }
    _creamteFragment(){
        var flag = document.createDocumentFragment()
        var child
        while((child = this.el.firstChild)){
            this._complier(child)
            flag.appendChild(child)
        }
        return flag
    }
    _complier(node) {
        var self = this
        if(node.nodeType === 1) {
            var key = node.attributes['v-model'].nodeValue
            node.addEventListener('input',function(e){
                self.vm[key] = e.target.value
            })
            node.value = this.vm[key]
        }
        if(node.nodeType === 3) {
           if(reg.test(node.nodeValue)){
               var name = RegExp.$1
               name = name.trim()
               new watcher(node,name,this.vm)
           }
        }
    }

}

export default complier;