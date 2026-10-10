<template>
  <div class="bg-white border rounded-xl p-6 mb-6">

    <!-- Desktop -->
    <div class="hidden md:flex items-start">

      <div
        v-for="(item,index) in steps"
        :key="index"
        class="flex-1 flex flex-col items-center relative"
      >

        <!-- line -->

        <div
          v-if="index !== steps.length-1"
          class="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200"
        >
        </div>

        <!-- Etap raqami ham, nomi ham bosiladi -->
        <button
          type="button"
          class="group relative z-10 flex flex-col items-center rounded-lg px-2 pb-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          :aria-current="index+1===step ? 'step' : undefined"
          :aria-label="`${index+1}-etap: ${item}`"
          @click="$emit('select', index+1)"
        >
          <span
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition',
              index+1===step ? 'ring-4 ring-blue-100' : '',
              index+1<=step
                ? 'bg-blue-600 text-white group-hover:bg-blue-700'
                : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
            ]"
          >
            {{ index+1 }}
          </span>

          <span
            :class="[
              'mt-3 text-sm text-center group-hover:text-blue-600',
              index+1===step ? 'font-semibold text-gray-900' : 'text-gray-700'
            ]"
          >
            {{ item }}
          </span>
        </button>

      </div>

    </div>


    <!-- Mobile -->

    <div class="md:hidden">

      <div class="flex justify-between items-center">

        <div
          class="flex items-center gap-2 overflow-x-auto pb-2"
        >

          <template
            v-for="(item,index) in steps"
            :key="index"
          >

            <button
              type="button"
              :class="[
                'w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0 transition outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                index+1===step ? 'ring-4 ring-blue-100' : '',
                index+1<=step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              ]"
              :aria-current="index+1===step ? 'step' : undefined"
              :aria-label="`${index+1}-etap: ${item}`"
              @click="$emit('select', index+1)"
            >
              {{ index+1 }}
            </button>

            <div
              v-if="index!==steps.length-1"
              class="w-5 h-0.5 bg-gray-300 shrink-0"
            ></div>

          </template>

        </div>

      </div>

      <div
        class="mt-5 flex justify-between items-center"
      >

        <div>

          <p class="text-sm text-gray-500">

            {{ step }} / {{ steps.length }}

          </p>

          <h3 class="font-semibold">

            {{ steps[step-1] }}

          </h3>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    step: Number,
    steps: Array
  },
  emits: ['select']
}
</script>