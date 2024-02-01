import './styles/base.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import LoadingFwb from './components/partials/LoadingFwb.vue';

app.component('LoadingFwb', LoadingFwb);

app.mount('#app');