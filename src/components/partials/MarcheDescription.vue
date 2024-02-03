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
          <li><strong>PMR:</strong> {{ marche.pmr }}</li>
          <li><strong>Poussettes:</strong> {{ marche.poussettes }}</li>
          <li><strong>Balade Guidée:</strong> {{ marche.balade_guidee }}</li>
          <li><strong>BEWAPP:</strong> {{ marche.bewapp }}</li>
          <li><strong>Vélo:</strong> {{ marche.velo }}</li>
          <li><strong>VTT:</strong> {{ marche.vtt }}</li>
          <li><strong>Ravitaillement:</strong> {{ marche.ravitaillement }}</li>
          <li><strong>Prénom:</strong> {{ marche.prenom }}</li>
          <li><strong>Nom:</strong> {{ marche.nom }}</li>
          <li><strong>Adeps Santé:</strong> {{ marche.adeps_sante }}</li>
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
  </div>
</template>

<script>
import { MapIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    MapIcon,
  },
  props: {
    marche: {
      type: Object,
      required: true,
    },
  },
};
</script>