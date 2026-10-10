<template>
  <section
    :id="id"
    class="bg-white border border-[#E2E5EA] rounded-2xl p-5 md:p-6 flex flex-col gap-4 scroll-mt-4"
  >
    <div class="flex items-center gap-3">
      <span
        v-if="number"
        class="w-8 h-8 flex-none rounded-lg bg-[#EEF2FB] text-[#1E4FD8] flex items-center justify-center font-mono font-semibold text-[14px]"
      >
        {{ number }}
      </span>
      <div class="flex flex-col gap-0.5">
        <h2 class="m-0 text-[20px] font-bold text-[#11151B]">{{ title }}</h2>
        <p v-if="subtitle" class="m-0 text-[14px] text-[#565E6B]">{{ subtitle }}</p>
      </div>
    </div>

    <slot />
  </section>
</template>

<script>
export default {
  props: {
    id: { type: String, default: undefined },
    number: { type: [String, Number], default: null },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' }
  }
}
</script>
