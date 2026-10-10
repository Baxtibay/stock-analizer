<template>

<div class="bg-white border rounded-lg p-8">

<h3 class="text-xl font-semibold mb-1">

1-etap: Asosiy ma'lumotlar

</h3>

<p class="text-gray-500 mb-8">

Kompaniya haqida asosiy ma'lumotlarni kiriting.

</p>

<div class="flex flex-col gap-6 mb-8">
  <FormField
    v-model="form.company"
    label="Kompaniya nomi"
    placeholder="Masalan: Apple Inc."
    required
  />

  <FormField
    v-model="form.why"
    as="textarea"
    label="Nega aynan shu kompaniya?"
    placeholder="Tanlovingizni asoslab bering..."
  />

  <FormField
    v-model="form.revenue"
    as="textarea"
    label="Kompaniya nima orqali daromad ko'radi?"
    placeholder="Asosiy daromad manbalari..."
  />

  <FormField
    v-model="form.moat"
    as="textarea"
    label="Kompaniya qanchalik himoyalangan (Business Moat)?"
    placeholder="Raqobat ustunliklari..."
  />
</div>

<div class="flex flex-col md:flex-row md:justify-end gap-3 mt-10">

<button
class="px-6 py-3 rounded-lg border hover:bg-gray-100"
>

Bekor qilish

</button>

<button
class="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
>

Aksiyani saqlash

</button>

<button
  @click="$emit('next')"
  class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  Keyingi etap
  <i class="fa-solid fa-arrow-right ml-2"></i>
</button>

</div>

</div>

</template>

<script>
import FormField from '../common/FormField.vue'

export default {
  components: { FormField },
  data() {
    return {
      form: {
        company: '',
        why: '',
        revenue: '',
        moat: ''
      }
    }
  }
}
</script>
