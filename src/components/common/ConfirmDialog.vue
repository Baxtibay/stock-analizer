<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click.self="$emit('cancel')"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        class="w-full max-w-[420px] bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-xl"
      >
        <div class="flex gap-4">
          <div
            v-if="danger"
            class="w-11 h-11 flex-none rounded-full bg-[#FDE7E5] text-[#B42318] flex items-center justify-center"
          >
            <i class="fa-solid fa-trash-can"></i>
          </div>
          <div class="flex flex-col gap-1.5">
            <h2 id="confirm-title" class="m-0 text-[18px] font-bold text-[#11151B]">{{ title }}</h2>
            <p id="confirm-message" class="m-0 text-[14px] text-[#565E6B] leading-relaxed">
              <slot>{{ message }}</slot>
            </p>
          </div>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <button
            ref="cancel"
            type="button"
            class="h-11 px-5 rounded-[10px] border border-[#D3D8DF] bg-white font-semibold text-[14px] text-[#11151B] hover:bg-gray-50"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="h-11 px-5 rounded-[10px] font-semibold text-[14px] text-white"
            :class="danger ? 'bg-[#B42318] hover:bg-[#8F1D14]' : 'bg-[#11151B] hover:bg-black'"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    title: { type: String, required: true },
    message: { type: String, default: '' },
    confirmText: { type: String, default: 'Tasdiqlash' },
    cancelText: { type: String, default: 'Bekor qilish' },
    danger: { type: Boolean, default: false }
  },

  emits: ['confirm', 'cancel'],

  watch: {
    // Ochilganda xavfsiz tugma — "Bekor qilish" — fokusda bo'ladi
    open(value) {
      if (value) this.$nextTick(() => this.$refs.cancel?.focus())
    }
  },

  mounted() {
    document.addEventListener('keydown', this.onKey)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKey)
  },

  methods: {
    onKey(e) {
      if (this.open && e.key === 'Escape') this.$emit('cancel')
    }
  }
}
</script>
