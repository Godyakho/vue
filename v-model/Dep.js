class Dep {
    constructor(){
        this.subs = []
    }
    addsub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

export default Dep;