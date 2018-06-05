export default {
// 只接受两个参数 ,第二个参数多值可以写成对象, 所有state修改 都要放在mutations
  updateCount (state, {num, num2}) {
    state.count = num
    console.log(num2)
  }
}
