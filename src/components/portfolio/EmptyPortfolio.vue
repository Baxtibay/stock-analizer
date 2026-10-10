<template>
  <section
    class="bg-white border border-[#E2E5EA] rounded-2xl px-6 py-14 flex flex-col items-center text-center gap-[18px]"
  >
    <div class="w-16 h-16 rounded-2xl bg-[#EEF2FB] text-[#1E4FD8] flex items-center justify-center">
      <i class="fa-solid fa-briefcase text-[26px]"></i>
    </div>

    <div class="flex flex-col gap-2 max-w-[460px]">
      <h2 class="m-0 text-[20px] font-bold">Portfelingiz bo'sh</h2>
      <p class="m-0 text-[15px] leading-relaxed text-[#565E6B]">
        Aksiyalar ro'yxatida kartochkadagi ⋯ menyusidan "Sotib olish" ni tanlang
        yoki pozitsiyani shu yerdan qo'lda qo'shing.
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-2.5">
      <RouterLink
        to="/"
        class="h-11 px-[18px] rounded-[10px] border border-[#D3D8DF] bg-white text-[#11151B] text-[14px] font-semibold flex items-center hover:bg-gray-50"
      >
        Aksiyalar ro'yxatiga o'tish
      </RouterLink>
      <button
        type="button"
        class="h-11 px-[18px] rounded-[10px] bg-[#11151B] text-white text-[14px] font-semibold flex items-center gap-2 hover:bg-black"
        @click="$emit('add')"
      >
        <i class="fa-solid fa-plus"></i>
        Pozitsiya qo'shish
      </button>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['add']
}
</script>
