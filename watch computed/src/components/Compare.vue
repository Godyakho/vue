<template>
  <div>
      <div>{{fullname}}</div>
      <div>{{firstname}}</div>
      <div>{{lastname}}</div>
      <button @click="changeF()">通过methods修改firstname 触发 computed</button>
      <br>
      <button @click="changeL()">通过methods修改lastname 触发 computed</button>
      <br>
      <p>计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter</p>
      <input type="text" v-model="fullname">
      <br>
      <br>
      <div>{{skill.skill1}}</div>
      <div>{{skill.skill2}}</div>
      <div>{{skill.skill3}}</div>
      watch监听setskill  修改title:<input type="text" v-model="setskill">
      <br>
      <br>
      <h2>methos 调用就执行</h2>
      <h2>computed 追踪依赖依赖项不改变，不发生变化</h2>
      <br>
      <button @click="AlertDate()">methods</button>
      <button @click="getComputed()">computed</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstname: 'Hello',
      lastname: ' word',
      setskill: '',
      skill: {
        skill1: '深入浅出react',
        skill2: '深入浅出vue',
        skill3: '深入浅出angular'
      }
    }
  },
  // methods 只提供调用函数
  methods: {
    changeF () {
      this.firstname === 'Hi ' ? this.firstname = 'Hello' : this.firstname = 'Hi '
    },
    changeL () {
      this.lastname = ' javascript'
    },
    AlertDate () {
      alert(new Date())
    },
    getComputed () {
      alert(this.now)
    }
  },
  // 1.watch擅长处理的场景：一个数据影响多个数据
  // 2.computed擅长处理的场景：一个数据受多个数据影响
  computed: {
    fullname: {
      get () {
        return this.firstname + this.lastname
      },
      set () {
        this.firstname = 1
        this.lastname = 2
      }
    },
    now () {
      return new Date()
    }
  },
  watch: {
    setskill (newname) {
      this.skill.skill1 = newname + 'react'
      this.skill.skill2 = newname + 'vue'
      this.skill.skill3 = newname + 'angular'
    }
  }
}
</script>

<style>

</style>
