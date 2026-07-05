<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Home</h2>

    <div class="bg-white p-6 rounded-lg border">
      <h3 class="text-lg font-semibold mb-2">
        Search Stock
      </h3>

      <p class="text-gray-500 text-sm mb-5">
        Search by company name or ticker symbol (e.g. AAPL, TSLA, NVDA)
      </p>

      <form class="flex gap-3">
        <div class="relative flex-1">
          <i
            class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          ></i>

          <input
            type="text"
            placeholder="Search stocks..."
            class="w-full pl-11 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</template>