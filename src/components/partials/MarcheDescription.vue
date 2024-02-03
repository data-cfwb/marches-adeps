<template>
  <div>
    <div class="mt-8 border-t border-gray-200 pt-8">
      <h2 class="text-sm font-medium text-gray-900">
        Marche {{ marche.nom }} à {{ marche.localite }} ({{ marche.province }})
      </h2>

      <div class="prose prose-sm mt-4 text-gray-500">
        <ul>
          <li><strong>Entité:</strong> {{ marche.entite }}</li>
          <li><strong>Groupement:</strong> {{ marche.groupement }}</li>
          <li><strong>Nom:</strong> {{ marche.prenom }} {{ marche.nom }}</li>
          <li><strong>Gare:</strong> {{ marche.gare }}</li>
          <li><strong>Infos Rendez-vous:</strong> {{ marche.infos_rendez_vous }}</li>
          <li><strong>Lieu de Rendez-vous:</strong> {{ marche.lieu_de_rendez_vous }}</li>
          <li><strong>Date:</strong> {{ marche.frenchDate }} — dans {{ marche.diffDays }} jours</li>
          <li><strong>Latitude:</strong> {{ marche.latLong[0] }}</li>
          <li><strong>Longitude:</strong> {{ marche.latLong[1] }}</li>
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

      <dt class="sr-only">
        Téléphone
      </dt>
      <dd>
        <a :href="'tel:' + marche.gsm">
          {{ marche.gsm }}
        </a>
      </dd>
    </dl>
    <button
      class="text-indigo-600 hover:text-indigo-900"
      @click="downloadIcs"
    >
      <CalendarIcon
        class="h-6 w-6 text-green-600"
        aria-hidden="true"
      />
      <span class="sr-only">Télécharger le calendrier, {{ marche.name }}</span>
    </button>

    <a
      :href="'https://www.google.be/maps/dir/?api=1&destination=' + marche.latLong[0] + ',' + marche.latLong[1]"
      target="_blank"
      class="text-indigo-600 hover:text-indigo-900"
    >
      <MapIcon
        class="h-6 w-6 text-green-600"
        aria-hidden="true"
      />
      <span class="sr-only">Carte vers, {{ marche.name }}</span>
    </a>
  </div>
</template>

<script>
import { MapIcon, CalendarIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    MapIcon,
    CalendarIcon,
  },
  props: {
    marche: {
      type: Object,
      required: true,
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
      a.download = `${this.marche.id}-${this.ndeg_pv}.ics`;
      a.click();
      window.URL.revokeObjectURL(url);
    },

  },
};
</script>