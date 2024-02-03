<template>
  <ul
    role="list"
    class="divide-y divide-gray-100"
  >
    <li
      v-for="marche in marches"
      :key="marche.id"
      class="relative flex justify-between gap-x-6 py-5"
    >
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <a
              :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
              target="_blank"
              class="relative truncate hover:underline"
            >

              <span
                class="absolute inset-x-0 -top-px bottom-0"
              />
              dd
            </a>
            {{ marche.province }},  {{ marche.entite }}<br>
            {{ marche.groupement }}
          </p>
          <p class="mt-1 flex text-xs leading-5 text-gray-500">
            <a
              :href="`mailto:${marche.email}`"
              class="relative truncate hover:underline"
            >{{ marche.localite }}, {{ marche.entite }}</a>
          </p>
          <!-- {{ marche }} -->

          {{ marche.services }}
          <span
            v-for="key in [marche.pmr, marche.poussettes, marche.balade_guidee, marche.vtt, marche.velo, marche.ravitaillement, marche.adeps_sante]"
            :key="key"
            class="items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
            :class="key === true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
          >
            {{ key }}
          </span>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p
            v-if="marche.diffDays === 0"
            class="text-sm leading-6 text-gray-900"
          >
            {{ marche.frenchDate }} aujourd'hui
          </p>
          <p
            v-if="!marche.isPast"
            class="mt-1 text-xs leading-5 text-gray-500"
          >
            {{ marche.frenchDate }} -- dans <time :datetime="marche.diffDays">{{ marche.diffDays }} jour(s)</time>
          </p>

          <p
            v-if="marche.isPast"
            class="mt-1 text-xs leading-5 text-gray-500"
          >
            {{ marche.frenchDate }} -- il y a <time :datetime="marche.diffDays">{{ marche.diffDays }} jour(s)</time>
          </p>

          
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

   
          <li><strong>Entité:</strong> {{ marche.entite }}</li>
          <li><strong>Groupement:</strong> </li>
          <li>
            <strong>Nom:</strong> {{ marche.prenom }} {{ marche.nom }} ({{ marche.groupement }})
            <a
              :href="`tel:${marche.gsm}`"
              class="text-indigo-600 hover:text-indigo-900"
            >{{ marche.gsm }}</a>
          </li>
          <li><strong>Carte IGN</strong> {{ marche.ign }}</li>
          <li><strong>Gare:</strong> {{ marche.gare }}</li>
          <li><strong>Infos Rendez-vous:</strong> {{ marche.infos_rendez_vous }}</li>
          <li><strong>Lieu de Rendez-vous:</strong> {{ marche.lieu_de_rendez_vous }}</li>
          
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
          <div
            class="mt-1 flex items-center gap-x-1.5"
          >
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p class="text-xs leading-5 text-gray-500">
              Online
            </p>
          </div>
        </div>
        <ChevronRightIcon
          class="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </div>
    </li>
  </ul>
</template>
  
<script>
import DetailsComponent from '@/components/DetailsComponent.vue';
import { MapIcon } from '@heroicons/vue/24/outline';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';
export default {
  components: {
    DetailsComponent,
    MapIcon,
    ChevronRightIcon,
  },
  props: {
    marches: {
      type: Object,
      required: true,
    },
  },
   
  
};
</script>