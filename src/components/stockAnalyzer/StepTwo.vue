<template>
  <div class="bg-white border rounded-lg p-8">

    <h3 class="text-xl font-semibold mb-1">
      2-etap: Moliyaviy ko'rsatkichlar
    </h3>

    <p class="text-gray-500 mb-8">
      Kompaniyaning moliyaviy ma'lumotlarini kiriting.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- market cap -->
      <div>

        <label class="font-medium mb-2 block">
          Market Cap (USD) *
        </label>

        <input
          type="number"
          placeholder="1000000000"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

      <!-- ticker -->

      <div>

        <label class="font-medium mb-2 block">
          Ticker *
        </label>

        <input
          type="text"
          placeholder="Masalan: AAPL"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

      <!-- sector -->

      <div>

        <label class="font-medium mb-2 block">
          Sector *
        </label>

        <select
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option>Basic Materials</option>

          <option>Communication Services</option>

          <option>Consumer Cyclical</option>

          <option>Consumer Defensive</option>

          <option>Energy</option>

          <option>Financial</option>

          <option>Healthcare</option>

          <option>Industrials</option>

          <option>Real Estate</option>

          <option>Technology</option>

          <option>Utilities</option>

          <option>Other</option>

        </select>

      </div>

      <!-- industry -->

      <div>

        <label class="font-medium mb-2 block">
          Industry *
        </label>

        <input
          type="text"
          placeholder="Masalan: Semiconductors"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

      </div>

    </div>

    <!-- Halol -->

    <div class="mt-8">

      <label class="font-medium block mb-3">

        Halol kompaniyami?

      </label>

      <div class="flex items-center gap-4">

        <button
          @click="halal=!halal"
          :class="[
            'w-16 h-9 rounded-full transition relative',
            halal
              ? 'bg-blue-600'
              : 'bg-gray-300'
          ]"
        >

          <span
            :class="[
              'absolute top-1 w-7 h-7 rounded-full bg-white transition',
              halal
                ? 'right-1'
                : 'left-1'
            ]"
          ></span>

        </button>

        <span class="font-medium">

          {{ halal ? 'Halol' : 'Halol emas' }}

        </span>

      </div>

    </div>

    <div class="flex flex-col md:flex-row md:justify-end gap-3 mt-10">

      <button
        class="border rounded-lg px-6 py-3"
        @click="$emit('prev')"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Orqaga
      </button>

      <button
        class="border border-red-300 text-red-500 rounded-lg px-6 py-3"
      >
        Bekor qilish
      </button>

      <button
        class="bg-green-600 text-white rounded-lg px-6 py-3"
      >
        Aksiyani saqlash
      </button>

      <button
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

data(){

return{

halal:false

}

}

}
</script>