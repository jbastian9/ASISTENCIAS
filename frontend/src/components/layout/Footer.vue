<template>
  <v-footer app padless>
    <v-col class="text-center" cols="12">
      © {{ new Date().getFullYear() }} - {{ nombreApp }}
    </v-col>
  </v-footer>
</template>

<script setup>
const nombreApp = import.meta.env.VITE_APP_NAME
</script>