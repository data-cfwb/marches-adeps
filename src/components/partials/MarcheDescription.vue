<template>
  <div
    v-if="marche"
    class="p-5"
    :class="marche.statut != 'OK' ? 'bg-orange-100' : 'bg-blue-50'"
  >
    <div class="mt-3 border-t border-gray-200 pt-4">
      <h3 class="text-medium font-medium text-gray-600">
        <span
          v-if="marche.statut != 'OK'"
          class="text-red-900"
        >{{ marche.statut }}</span>
        [{{ marche.province }}]
      </h3>
      <h2 class="text-medium font-medium text-gray-900">
        Marche de {{ marche.localite }} ({{ marche.entite }})
      </h2>

      <div class="prose prose-sm mt-4 text-gray-500">
        <ParcoursComponent :parcours="marche.parcours" />
        <br>
        <ServicesComponent :services="marche.services" />
        <ul class="py-2">
          <li>
            <strong>Date:</strong> {{ marche.frenchDate }} ({{ marche.diffFromTodayInFrench }}) <span
              v-if="marche.statut != 'OK'"
              class="text-red-900"
            >{{ marche.statut }}</span>
          </li>

          <li><strong>Organisateur:</strong> {{ marche.groupement }}</li>
          <li>
            <strong>Contact:</strong> {{ marche.fullName }} <a
              :href="'tel:' + marche.gsm"
              class="text-indigo-600 hover:text-indigo-900
        "
            >
              {{ marche.gsm }}
            </a>
          </li>
          <li>
            <strong>Adresse: </strong> 
            <a
              :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
              target="_blank"
              class="text-indigo-600 hover:text-indigo-900"
            >
              {{ marche.address }}</a>
          </li>
          <li><strong>Gare:</strong> {{ marche.gare }}</li>

          <li><strong>Infos:</strong> {{ marche.infos_rendez_vous }}</li>
        </ul>
      </div>
    </div>
    <dl>
      <dt class="sr-only">
        Adresse
      </dt>
      <dd>
        <address class="not-italic">
          {{ marche.lieu_de_rendez_vous }}
        </address>
      </dd>
    </dl>
    <span class="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        class="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        @click="downloadIcs"
      >Télécharger le calendrier
        <CalendarIcon
          class="h-6 w-6 text-green-600"
          aria-hidden="true"
        />
      </button>

      <a
        type="button"
        class="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
        target="_blank"
      >Voir sur une carte
        <MapIcon
          class="h-6 w-6 text-green-600"
          aria-hidden="true"
        /></a>
    </span>
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
      const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CFWB//Marches-Adeps//FR
BEGIN:VEVENT
UID:${this.marche.id}
DTSTART:${this.marche.icsStartDate}
DTEND:${this.marche.icsEndDate}
SUMMARY: Marche Adeps de ${this.marche.localite} (${this.marche.province})
DESCRIPTION:${this.marche.infos_rendez_vous}
LOCATION:${this.marche.lieu_de_rendez_vous}, ${this.marche.localite}, Belgique
END:VEVENT
END:VCALENDAR`;

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