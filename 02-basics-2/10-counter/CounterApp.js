import { defineComponent, ref } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    // Описал решение так, ибо вызов рефа есть явная реактивност
    // Можно было написать гораздо проще
    // @click.prevent="count--"
    // @click.prevent="count++"
    // и в setup -> return { count: 0 }
    let count = ref(0)
    const plus = () => {
      count.value++
    }
    const minus = () => {
      if (count.value > 0) {
        count.value--
      }
    }
    return { count, plus, minus}
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click.prevent="minus"
        :disabled="count == 0"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click.prevent="plus"
        :disabled="count == 5"
      >➕</button>
    </div>
  `,
})
