<template>
  <div class="relative flex h-screen bg-gray-50">

    <!-- 🔥 1️⃣ Mobile Overlay (ENG YUQORIDA) -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
      @click="mobileOpen = false"
    />

    <!-- 🔥 2️⃣ Sidebar -->
    <Sidebar
      :collapsed="collapsed"
      :mobileOpen="mobileOpen"
      @toggle="collapsed = !collapsed"
      @closeMobile="mobileOpen = false"
    />

    <!-- 🔥 3️⃣ Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="h-12 border-b bg-white flex items-center px-4 md:px-6 relative">
        <button
          class="md:hidden mr-3 text-gray-600"
          @click="mobileOpen = true"
        >
          <i class="fa-solid fa-bars text-2xl"></i>
        </button>

        <!-- Search (header o'rtasida, faqat asosiy sahifada). Enter bosilganda qidiradi -->
        <form
          v-if="$route.path === '/'"
          class="flex-1 max-w-xl mx-auto"
          @submit.prevent="onSearch"
        >
          <div class="relative">
            <i
              class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            ></i>

            <input
              v-model="query"
              type="text"
              placeholder="Search stocks..."
              class="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </header>

      <main class="flex-1 overflow-auto p-4 md:p-8">
        <slot />
      </main>
    </div>

  </div>
</template>


<script>
import Sidebar from './Sidebar.vue'

export default {
  components: { Sidebar },
  data() {
    return {
      collapsed: false,
      mobileOpen: false,
      query: ''
    }
  },
  methods: {
    onSearch() {
      const q = this.query.trim()
      if (!q) return
      // TODO: shu yerda qidiruv logikasini ulang (API so'rovi va h.k.)
      this.$router.push({ path: '/', query: { q } })
    }
  }
}
</script>
