<template>

<div class="bg-white border rounded-lg p-8">

<h3 class="text-xl font-semibold mb-1">

1-etap: Asosiy ma'lumotlar

</h3>

<p class="text-gray-500 mb-8">

Kompaniya haqida asosiy ma'lumotlarni kiriting.

</p>

<!-- Company -->

<div class="mb-6">

<label class="font-medium block mb-2">

Kompaniya nomi *

</label>

<input
type="text"
placeholder="Masalan: Apple Inc."
class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>

</div>

<!-- Why -->

<div class="mb-6">

<label class="font-medium block mb-2">

Nega aynan shu kompaniya?

</label>

<textarea

rows="5"

class="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"

placeholder="Tanlovingizni asoslab bering..."

></textarea>

</div>

<!-- Revenue -->

<div class="mb-6">

<label class="font-medium block mb-2">

Kompaniya nima orqali daromad ko'radi?

</label>

<textarea

rows="5"

class="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"

placeholder="Asosiy daromad manbalari..."

></textarea>

</div>

<!-- Moat -->

<div class="mb-8">

<label class="font-medium block mb-2">

Kompaniya qanchalik himoyalangan (Business Moat)?

</label>

<textarea

rows="5"

class="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"

placeholder="Raqobat ustunliklari..."

></textarea>

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