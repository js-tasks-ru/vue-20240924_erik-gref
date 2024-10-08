import { defineComponent, ref } from 'vue/dist/vue.esm-bundler.js'

export default defineComponent({
  name: 'CounterApp',

  setup() {
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
      >➕</button>
    </div>
  `,
})
