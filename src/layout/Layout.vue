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

        <h1 class="font-medium text-gray-700">
          Stock analizer
        </h1>
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
      mobileOpen: false
    }
  }
}
</script>
