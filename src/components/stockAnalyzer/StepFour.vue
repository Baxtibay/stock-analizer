<template>
  <div class="bg-white border rounded-xl p-8">

    <h3 class="text-2xl font-semibold">
      4-etap: Multiplikatorlar
    </h3>

    <p class="text-gray-500 mt-2 mb-8">
      Kompaniyaning bozor bahosini tahlil qilish uchun multiplikatorlarni kiriting.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- PE -->

      <div>

        <label class="font-medium block mb-2">

          P/E (Price / Earnings)

        </label>

        <input
          type="number"
          placeholder="Masalan: 18.5"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

      <!-- PS -->

      <div>

        <label class="font-medium block mb-2">

          P/S (Price / Sales)

        </label>

        <input
          type="number"
          placeholder="Masalan: 3.2"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

      <!-- PB -->

      <div>

        <label class="font-medium block mb-2">

          P/B (Price / Book)

        </label>

        <input
          type="number"
          placeholder="Masalan: 2.1"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

    </div>

    <hr class="my-10">

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- Dividend -->

      <div>

        <label class="font-semibold block mb-4">

          Dividend mavjudmi?

        </label>

        <div class="flex items-center gap-4 mb-5">

          <button
            @click="hasDividend=!hasDividend"
            :class="[
              'w-16 h-9 rounded-full transition relative',
              hasDividend
                ? 'bg-blue-600'
                : 'bg-gray-300'
            ]"
          >

            <span
              :class="[
                'absolute top-1 w-7 h-7 rounded-full bg-white transition',
                hasDividend
                  ? 'right-1'
                  : 'left-1'
              ]"
            ></span>

          </button>

          <span>

            {{ hasDividend ? 'Ha' : "Yo'q" }}

          </span>

        </div>

        <div
          v-if="hasDividend"
          class="relative"
        >

          <input
            type="number"
            placeholder="Masalan: 2.50"
            class="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
          >

          <span
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >

            %

          </span>

        </div>

      </div>

      <!-- payout -->

      <div>

        <label class="font-semibold block mb-4">

          Payout Ratio mavjudmi?

        </label>

        <div class="flex items-center gap-4 mb-5">

          <button
            @click="hasPayout=!hasPayout"
            :class="[
              'w-16 h-9 rounded-full transition relative',
              hasPayout
                ? 'bg-blue-600'
                : 'bg-gray-300'
            ]"
          >

            <span
              :class="[
                'absolute top-1 w-7 h-7 rounded-full bg-white transition',
                hasPayout
                  ? 'right-1'
                  : 'left-1'
              ]"
            ></span>

          </button>

          <span>

            {{ hasPayout ? 'Ha' : "Yo'q" }}

          </span>

        </div>

        <div
          v-if="hasPayout"
          class="relative"
        >

          <input
            type="number"
            placeholder="Masalan: 45"
            class="w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
          >

          <span
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >

            %

          </span>

        </div>

      </div>

    </div>

    <div
      class="flex flex-col lg:flex-row lg:justify-end gap-3 mt-12"
    >

      <button
        class="border rounded-lg px-6 py-3"
        @click="$emit('prev')"
      >

        <i class="fa-solid fa-arrow-left mr-2"></i>

        Orqaga

      </button>

      <button
        class="border border-red-400 text-red-500 rounded-lg px-6 py-3"
      >

        Bekor qilish

      </button>

      <button
        class="bg-green-600 text-white rounded-lg px-6 py-3"
      >

        Aksiyani saqlash

      </button>

      <button
        v-if="currentStep < totalSteps"
        class="bg-blue-600 text-white rounded-lg px-6 py-3"
        @click="$emit('next')"
      >
        Keyingi etap
        <i class="fa-solid fa-arrow-right ml-2"></i>
      </button>

    </div>

  </div>
</template>

<script>
export default{

  props:[
    "currentStep",
    "totalSteps"
  ],

  data() {
    return {
      hasDividend:false,
      hasPayout:false
    }
  }

}
</script>