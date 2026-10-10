<template>
  <div class="bg-white border rounded-xl p-8">

    <h3 class="text-2xl font-semibold">
      3-etap: Qarz va majburiyatlar
    </h3>

    <p class="text-gray-500 mt-2 mb-8">
      Kompaniyaning aktivlari va majburiyatlari bo'yicha ma'lumotlarni kiriting.
    </p>

    <!-- Inputs -->

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div>

        <label class="font-medium block mb-2">

          Total Current Assets (USD)

        </label>

        <input
          v-model="form.currentAssets"
          type="number"
          placeholder="Masalan: 120000000"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

        <p class="text-sm text-gray-500 mt-2">
          Tez pulga aylantiriladigan aktivlar summasi.
        </p>

      </div>

      <div>

        <label class="font-medium block mb-2">

          Total Liabilities (USD)

        </label>

        <input
          v-model="form.totalLiabilities"
          type="number"
          placeholder="Masalan: 85000000"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

        <p class="text-sm text-gray-500 mt-2">
          Barcha majburiyatlar (qisqa + uzoq muddatli).
        </p>

      </div>

      <div>

        <label class="font-medium block mb-2">

          Total Current Liabilities (USD)

        </label>

        <input
          v-model="form.currentLiabilities"
          type="number"
          placeholder="Masalan: 40000000"
          class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >

        <p class="text-sm text-gray-500 mt-2">
          Qisqa muddatli qarzlar yig'indisi.
        </p>

      </div>

    </div>

    <!-- Rules -->

    <div class="mt-10 border rounded-xl p-6 bg-blue-50">

      <h4 class="font-semibold text-lg mb-5">

        <i class="fa-solid fa-book-open mr-2 text-blue-600"></i>

        Qoidalar

      </h4>

      <div class="space-y-8">

        <!-- Rule 1 -->

        <div>

          <h5 class="font-semibold mb-2">

            Qoida - 1

          </h5>

          <p class="text-gray-700">

            <strong>Total Current Assets</strong> — tez pulga aylantiriladigan
            aktivlar summasidan barcha qarzlarni ayiramiz.

          </p>

          <p class="text-gray-700 mt-2">

            Barcha qarzlarga quyidagilar kiradi:

          </p>

          <ul class="list-disc ml-6 mt-2 text-gray-700">

            <li>Total Current Liabilities (qisqa muddatli qarzlar)</li>

            <li>Long Term Liabilities (uzoq muddatli qarzlar)</li>

          </ul>

        </div>

        <hr>

        <!-- Rule 2 -->

        <div>

          <h5 class="font-semibold mb-2">

            Qoida - 2

          </h5>

          <p class="text-gray-700">

            Koeffitsient chiqarish formulasi:

          </p>

          <div class="my-5 text-center font-semibold text-xl">

            Total Current Assets

            <hr class="my-2">

            Total Current Liabilities

          </div>

          <ul class="space-y-2 text-gray-700">

            <li>

                ✅ Natija <strong>1 yoki undan katta</strong> bo'lsa yaxshi.

            </li>

            <li>

                ⚠️ Natija <strong>1 dan kichik</strong> bo'lsa kompaniyaning qisqa muddatli qarzlarini qoplash qobiliyati sust.

            </li>

            <li>

                ❌ Agar birinchi formulada natija minus chiqsa kompaniya moliyaviy bosim ostida.

            </li>

          </ul>

        </div>

      </div>

    </div>

    <!-- Buttons -->

    <div
      class="flex flex-col lg:flex-row lg:justify-end gap-3 mt-10"
    >

      <button
        class="w-full lg:w-auto border rounded-lg px-6 py-3"
        @click="$emit('prev')"
      >
        Orqaga
      </button>

      <button
        class="w-full lg:w-auto border border-red-400 text-red-500 rounded-lg px-6 py-3"
      >
        Bekor qilish
      </button>

      <button
        class="w-full lg:w-auto bg-green-600 text-white rounded-lg px-6 py-3"
      >
        Aksiyani saqlash
      </button>

      <button
        class="w-full lg:w-auto bg-blue-600 text-white rounded-lg px-6 py-3"
        @click="$emit('next')"
      >
        Keyingi etap
        <i class="fa-solid fa-arrow-right ml-2"></i>
      </button>

    </div>

  </div>
</template>

<script>
export default {

  data() {

    return {

      form: {

        currentAssets: "",

        totalLiabilities: "",

        currentLiabilities: ""

      }

    }

  }

}
</script>