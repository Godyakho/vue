function observe(data){
    if(!data||typeof data!== 'object') return
    Object.keys(data).forEach(key => {
        var val = data[key]
        observe(data[key])  // 将对象子对象的值同时监听
        Object.defineProperty(data,key,{
            get: function() {
                return val
            },
            set: function(newValue) {
                val = newValue
                console.log('我订阅了这个属性'+key+'现在为'+data[key])
            }
        })
    });
}

var book = {
    name: '',
    classify: {
        sub: '',
    }
}

observe(book)
book.name = 'vue'
book.classify.sub = 'v-model'


