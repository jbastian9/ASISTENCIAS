<template>
  <v-container class="pa-4" fluid>
    <v-row dense>
      <!-- Formulario para agregar fuente -->
      <v-col cols="12" sm="6" md="3">
        <v-card outlined class="pa-4 d-flex flex-column justify-space-between font-card">
          <v-card-title class="text-h6">Agregar fuente</v-card-title>
          <v-card-text>
            <p class="text-caption mb-2">
              Solo se permiten fuentes de
              <a href="https://fonts.google.com" target="_blank">Google Fonts</a>.
            </p>
            <v-text-field
              v-model="newFont"
              label="Nombre"
              placeholder="Ej: Nunito Sans"
              density="compact"
              outlined
            />
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="success"
              variant="outlined"
              :block="true"
              @click="addFont"
              :disabled="!newFont"
              size="small"
              class="add-btn"
            >
              <v-icon start>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Cards de fuentes quemadas -->
      <v-col cols="12" sm="6" md="3" v-for="font in fonts" :key="font.family">
        <v-card outlined class="pa-4 d-flex flex-column justify-space-between font-card">
          <v-card-title class="text-h6">{{ font.family }}</v-card-title>
          <v-card-text>
            <p :style="{ fontFamily: font.family, fontWeight: 900, fontSize: '2rem' }">
              Título
            </p>
            <p :style="{ fontFamily: font.family, fontWeight: 'bold', fontSize: '1rem' }">
              Subtítulo
            </p>
            <p :style="{ fontFamily: font.family, fontSize: '14px' }">
              Párrafo, lorem ipsum dolor sit amet.
            </p>
            <p class="mt-4">
              <a
                :href="`https://fonts.google.com/specimen/${font.family.replace(/ /g, '+')}`"
                target="_blank"
                class="text-caption"
              >
                Ver en Google Fonts →
              </a>
            </p>
          </v-card-text>
          <v-card-actions class="d-flex flex-column ga-2">
            <v-btn
                color="info"
                variant="outlined"
                size="small"
                block
            >
                <v-icon start>mdi-check</v-icon>
                Usar
            </v-btn>
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              block
            >
              <v-icon start>mdi-trash-can-outline</v-icon>
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const newFont = ref('')

const fonts = ref([
  { family: 'Nunito Sans' },
  { family: 'Verdana' },
  { family: 'Roboto' }
])

function addFont() {
  const trimmed = newFont.value.trim()
  if (trimmed) {
    fonts.value.push({ family: trimmed })
    newFont.value = ''
  }
}
</script>

<style scoped>
.font-card {
  min-height: 300px;
  height: 100%;
}
</style>