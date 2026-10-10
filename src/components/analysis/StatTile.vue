<template>
  <div
    class="rounded-xl border px-4 py-3.5 flex flex-col gap-1"
    :class="toneClass.box"
  >
    <span class="text-[13px]" :class="toneClass.label">{{ label }}</span>
    <span
      class="font-semibold text-[#11151B]"
      :class="[mono ? 'font-mono' : '', large ? 'text-[24px]' : 'text-[17px]', toneClass.value]"
    >
      <slot>{{ value }}</slot>
    </span>
    <span v-if="hint" class="text-[12px] text-[#5D6573]">{{ hint }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], default: '' },
    hint: { type: String, default: '' },
    // default | good | bad
    tone: { type: String, default: 'default' },
    mono: { type: Boolean, default: true },
    large: { type: Boolean, default: false }
  },

  computed: {
    toneClass() {
      if (this.tone === 'good') {
        return { box: 'bg-[#F1FAF4] border-[#CDEBD8]', label: 'text-[#1F6B45] font-semibold', value: '' }
      }
      if (this.tone === 'bad') {
        return { box: 'bg-[#FEF4F3] border-[#F6C9C4]', label: 'text-[#8F1D14] font-semibold', value: '' }
      }
      return { box: 'bg-white border-[#EEF0F3]', label: 'text-[#5D6573]', value: '' }
    }
  }
}
</script>
