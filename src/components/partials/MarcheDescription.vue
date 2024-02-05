<template>
  <div
    v-if="marche"
    class="p-5"
    :class="marche.statut != 'OK' ? 'bg-orange-100' : 'bg-white'"
  >
    <div class="px-4 sm:px-0">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        <span
          v-if="marche.statut != 'OK'"
          class="text-red-900"
        >{{ marche.statut }}</span> {{ marche.province }} {{ marche.localite }} ({{ marche.entite }}) du {{ marche.frenchDate }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Description de la marche ADEPS de {{ marche.localite }} ({{ marche.entite }})
      </p>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Où
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ marche.province }} {{ marche.localite }} ({{ marche.entite }})
          </dd>
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Quand
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div
              v-if="marche.statut != 'OK'"
              class="text-red-900"
            >
              {{ marche.statut }}
            </div>
            <div v-else>
              {{ marche.frenchDate }} ({{ marche.diffFromTodayInFrench }}) <button
                type="button"
                class="text-indigo-600 hover:text-indigo-900"
                @click="downloadIcs"
              >
                Télécharger le calendrier
              </button>
            </div>
          </dd>
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Parcours
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <ParcoursComponent :parcours="marche.parcours" />
          </dd>
          <dt
            v-if="marche.services.length > 0"
            class="text-sm font-medium leading-6 text-gray-900"
          >
            Services
          </dt>
          <dd
            v-if="marche.services.length > 0"
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <ServicesComponent :services="marche.services" />
          </dd>
          <dt
            class="text-sm font-medium leading-6 text-gray-900"
          >
            Organisateur
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ marche.groupement }}
          </dd>
          <dt
            class="text-sm font-medium leading-6 text-gray-900"
          >
            Contact
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ marche.fullName }} <a
              :href="'tel:' + marche.gsm"
              class="text-indigo-600 hover:text-indigo-900
        "
            >
              {{ marche.gsm }}
            </a>
          </dd>
          <dt
            class="text-sm font-medium leading-6 text-gray-900"
          >
            Adresse
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <a
              :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
              target="_blank"
              class="text-indigo-600 hover:text-indigo-900"
            >
              {{ marche.address }}</a>
          </dd>
          <dt
            class="text-sm font-medium leading-6 text-gray-900 text-right"
          >
            Information complémentaire
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ marche.infos_rendez_vous }} {{ marche.lieu_de_rendez_vous }}
          </dd>
          
          <dt
            v-if="marche.gare"
            class="text-sm font-medium leading-6 text-gray-900"
          >
            Gare
          </dt>
          <dd
            v-if="marche.gare"
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ marche.gare }}
          </dd>
        </div>
      </dl>
    </div>


    
    <button
      type="button"
      class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      @click="downloadIcs"
    >
      <CalendarIcon
        class="h-6 w-6 text-green-600"
        aria-hidden="true"
      />
      Télécharger le calendrier
    </button>

    <a
      type="button"
      class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
      target="_blank"
    ><MapIcon
      class="h-6 w-6 text-green-600"
      aria-hidden="true"
    /> Voir sur une carte
    </a>
  </div>
</template>

<script>
import { MapIcon, CalendarIcon } from '@heroicons/vue/24/outline';
import ServicesComponent from './ServicesComponent.vue';
import ParcoursComponent from './ParcoursComponent.vue';

export default {
  components: {
    MapIcon,
    CalendarIcon,
    ServicesComponent,
    ParcoursComponent,
  },
  props: {
    marche: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    downloadIcs() {
      // replace , and ; with - in the adresse
      const icsAddress = this.marche.address.replace(/,/g, ' - ').replace(/;/g, ' - ').replace(/ {2}/g, ' ');
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CFWB//Marches-Adeps//FR
BEGIN:VEVENT
UID:${this.marche.id}
DTSTART:${this.marche.icsStartDate}
DTEND:${this.marche.icsEndDate}
SUMMARY: Marche Adeps de ${this.marche.localite} (${this.marche.province})
DESCRIPTION:${this.marche.infos_rendez_vous} ${this.marche.lieu_de_rendez_vous}
LOCATION: ${icsAddress}
GEO:${this.marche.latLong[0]};${this.marche.latLong[1]}
END:VEVENT
END:VCALENDAR`;

      // console.log(ics);

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.marche.id}.ics`;
      a.click();
      window.URL.revokeObjectURL(url);
    },

  },
};
</script>