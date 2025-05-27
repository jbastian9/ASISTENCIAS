<template>
  <v-app>
    <!-- Sidebar controlado con v-model -->
    <Sidebar v-model="drawerOpen" />

    <!-- Header con botón que cambia drawerOpen -->
    <Header @toggle-sidebar="drawerOpen = !drawerOpen" />

    <!-- Contenido principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import Header from '../components/layout/Header.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import AppFooter from '../components/layout/Footer.vue'

const drawerOpen = ref(true)
const display = useDisplay()

// Cuando la pantalla sea pequeña, cerramos el sidebar automáticamente
watch(
  () => display.smAndDown,
  (smAndDown) => {
    drawerOpen.value = !smAndDown
  },
  { immediate: true }
)
</script>