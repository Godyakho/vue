function Dep() {
    this.subs = []
}

Dep.prototype = {
    addsub(sub) {
        this.subs.push(sub)
    },
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

export default Dep;