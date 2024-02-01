<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead>
      <tr>
        <th
          scope="col"
          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
        >
          Localité / Province
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Entité / Groupement
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          PMR / Poussettes
        </th>
        <th
          scope="col"
          class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Date
        </th>
        <th
          scope="col"
          class="relative py-3.5 pl-3 pr-4 sm:pr-0"
        >
          <span class="sr-only">Voir</span>
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr
        v-for="marche in marches"
        :key="marche.id"
      >
        <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div class="flex items-center">
            <div class="ml-4">
              <div class="font-medium text-gray-900">
                {{ marche.localite }}
              </div>
              <div class="mt-1 text-gray-500">
                {{ marche.province }}
              </div>
            </div>
          </div>
        </td>
        <td class="px-3 py-5 text-sm text-gray-500">
          <div class="text-gray-900">
            {{ marche.entite }}
          </div>
          <div class="mt-1 text-gray-500">
            {{ marche.groupement }}
          </div>
        </td>
        <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
          <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{ marche.pmr }} {{ marche.poussettes }}</span>
        </td>
        <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
          {{ marche.date }} 
          <br>Dans <time :datetime="marche.diffDays">{{ marche.diffDays }} jours</time>
        </td>
        <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-sm font-medium sm:pr-0">
          <ul>            
            <li>
              <a
                href="#"
                class="text-indigo-600 hover:text-indigo-900"
                @click="marche.seeDetails = !marche.seeDetails"
              >Voir les détails<span class="sr-only">de {{ marche.name }}</span></a>
              <DetailsComponent
                v-if="marche.seeDetails"
                class="absolute inset-0"
                :marche="marche"
              />
            </li>
            <li>
              <a
                :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
                target="_blank"
                class="text-indigo-600 hover:text-indigo-900"
              >
                <MapIcon
                  class="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
                <span class="sr-only">Carte vers, {{ marche.name }}</span></a>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>
  
<script>
import DetailsComponent from '@/components/DetailsComponent.vue';
import { MapIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    DetailsComponent,
    MapIcon
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
  },
   
  
};
</script>