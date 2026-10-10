<template>
  <div class="flex flex-col gap-1.5">
    <fieldset
      class="group m-0 min-w-0 rounded-xl border-[1.5px] px-3.5 bg-white transition-shadow"
      :class="[
        as === 'textarea' ? 'pb-1.5' : 'pb-0.5',
        error
          ? 'border-[#D92D20] focus-within:shadow-[0_0_0_4px_rgba(217,45,32,0.12)]'
          : 'border-[#B7BFCB] hover:border-[#8A93A1] focus-within:!border-[#1E4FD8] focus-within:shadow-[0_0_0_4px_rgba(30,79,216,0.10)]'
      ]"
    >
      <legend
        class="px-1.5 -ml-0.5 text-[13px] font-semibold"
        :class="error ? 'text-[#B42318]' : 'text-[#2B323C] group-focus-within:text-[#1E4FD8]'"
      >
        <label :for="fieldId">
          {{ label }}
          <span v-if="required" class="text-[#B42318]">*</span>
        </label>
      </legend>

      <div class="flex items-center gap-2">
        <textarea
          v-if="as === 'textarea'"
          :id="fieldId"
          :value="modelValue"
          :rows="rows"
          :placeholder="placeholder"
          :aria-invalid="!!error"
          :aria-describedby="message ? `${fieldId}-msg` : undefined"
          v-bind="$attrs"
          class="w-full py-2 border-0 outline-none bg-transparent resize-y text-[15px] leading-relaxed text-[#11151B] placeholder:text-[#8A93A1]"
          @input="update"
        ></textarea>

        <select
          v-else-if="as === 'select'"
          :id="fieldId"
          :value="modelValue"
          :aria-invalid="!!error"
          :aria-describedby="message ? `${fieldId}-msg` : undefined"
          v-bind="$attrs"
          class="w-full h-11 border-0 outline-none bg-transparent text-[15px] text-[#11151B] cursor-pointer"
          @change="update"
        >
          <slot />
        </select>

        <input
          v-else
          :id="fieldId"
          :value="modelValue"
          :type="type"
          :placeholder="placeholder"
          :aria-invalid="!!error"
          :aria-describedby="message ? `${fieldId}-msg` : undefined"
          v-bind="$attrs"
          class="flex-1 min-w-0 h-11 border-0 outline-none bg-transparent text-[15px] text-[#11151B] placeholder:text-[#8A93A1]"
          @input="update"
        >

        <span v-if="suffix" class="flex-none text-[13px] font-semibold text-[#5D6573]">
          {{ suffix }}
        </span>
      </div>
    </fieldset>

    <p
      v-if="message"
      :id="`${fieldId}-msg`"
      class="m-0 pl-4 text-[12px]"
      :class="error ? 'text-[#B42318]' : 'text-[#5D6573]'"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
let uid = 0

export default {
  // Qo'shimcha atributlar (min, step, maxlength...) to'g'ridan-to'g'ri input'ga tushadi
  inheritAttrs: false,

  props: {
    modelValue: { type: [String, Number], default: '' },
    label: { type: String, required: true },
    // input | textarea | select
    as: { type: String, default: 'input' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    rows: { type: [String, Number], default: 5 },
    required: { type: Boolean, default: false },
    // Input o'ng tomonidagi yozuv, masalan: USD yoki %
    suffix: { type: String, default: '' },
    // Pastdagi kulrang yordamchi matn
    hint: { type: String, default: '' },
    // Xato matni — berilsa ramka qizil bo'ladi
    error: { type: String, default: '' },
    id: { type: String, default: '' }
  },

  emits: ['update:modelValue'],

  data() {
    return { autoId: `field-${++uid}` }
  },

  computed: {
    fieldId() {
      return this.id || this.autoId
    },

    message() {
      return this.error || this.hint
    }
  },

  methods: {
    update(e) {
      const value = e.target.value
      this.$emit(
        'update:modelValue',
        this.type === 'number' && value !== '' ? Number(value) : value
      )
    }
  }
}
</script>
