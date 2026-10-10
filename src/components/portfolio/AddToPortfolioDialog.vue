<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click.self="$emit('cancel')"
    >
      <form
        ref="form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-portfolio-title"
        class="w-full max-w-[380px] bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
        novalidate
        @submit.prevent="submit"
      >
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 flex-none rounded-full bg-[#EEF2FB] text-[#1E4FD8] flex items-center justify-center">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div class="flex flex-col gap-0.5 min-w-0">
            <h2 id="add-portfolio-title" class="m-0 text-[18px] font-bold text-[#11151B]">Sotib olish</h2>
            <span class="text-[14px] text-[#565E6B] truncate">
              <b class="font-mono text-[#11151B]">{{ stock?.ticker }}</b> · {{ stock?.name }}
            </span>
          </div>
        </div>

        <FormField
          v-model="quantity"
          type="number"
          label="Nechta aksiya?"
          placeholder="Masalan: 10"
          suffix="dona"
          min="1"
          step="1"
          inputmode="numeric"
          :error="error"
          required
        />

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <button
            type="button"
            class="h-11 px-5 rounded-[10px] border border-[#D3D8DF] bg-white font-semibold text-[14px] text-[#11151B] hover:bg-gray-50"
            @click="$emit('cancel')"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            class="h-11 px-5 rounded-[10px] bg-[#11151B] hover:bg-black font-semibold text-[14px] text-white"
          >
            Sotib olish
          </button>
        </div>
      </form>
    </div>
  </Teleport>
</template>

<script>
import FormField from '../common/FormField.vue'

export default {
  components: { FormField },

  props: {
    open: { type: Boolean, default: false },
    // { ticker, name }
    stock: { type: Object, default: null }
  },

  emits: ['confirm', 'cancel'],

  data() {
    return {
      quantity: '',
      error: ''
    }
  },

  watch: {
    open(value) {
      if (!value) return
      this.quantity = ''
      this.error = ''
      // Ochilganda kursor darhol son kiritish maydonida turadi
      this.$nextTick(() => this.$refs.form?.querySelector('input')?.focus())
    },

    quantity() {
      this.error = ''
    }
  },

  mounted() {
    document.addEventListener('keydown', this.onKey)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    submit() {
      const qty = Number(this.quantity)
      if (!Number.isInteger(qty) || qty < 1) {
        this.error = "1 yoki undan katta butun son kiriting."
        return
      }
      this.$emit('confirm', qty)
    },

    onKey(e) {
      if (this.open && e.key === 'Escape') this.$emit('cancel')
    }
  }
}
</script>
