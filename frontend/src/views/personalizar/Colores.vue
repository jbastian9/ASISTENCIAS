<template>
  <v-container class="pa-4" fluid>
    <v-row dense>
      <!-- Formulario para agregar paleta -->
      <v-col cols="12" sm="6" md="4">
        <v-card outlined class="pa-4 d-flex flex-column justify-space-between palette-card">
          <v-card-title class="text-h6">Agregar paleta</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newPaletteName"
              label="Nombre de la paleta"
              density="compact"
              outlined
            />
            <v-row class="mt-2" dense>
              <v-col
                v-for="(color, index) in newColors"
                :key="index"
                cols="2"
              >
                <v-text-field
                  v-model="newColors[index]"
                  label="#Hex"
                  maxlength="7"
                  placeholder="#123ABC"
                  density="compact"
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              color="success"
              variant="outlined"
              :disabled="!canAdd"
              @click="addPalette"
              block
              size="small"
            >
              <v-icon start>mdi-plus</v-icon>
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Cards de paletas -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="(palette, index) in palettes"
        :key="palette.name"
      >
        <v-card outlined class="pa-4 palette-card d-flex flex-column justify-space-between">
          <v-card-title class="text-h6">{{ palette.name }}</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col
                v-for="(color, i) in palette.colors"
                :key="i"
                cols="2"
                class="d-flex flex-column align-center"
              >
                <div
                  class="color-block"
                  :style="{ backgroundColor: color }"
                  :title="color"
                />
                <span class="color-code">{{ color }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="d-flex flex-column gap-2">
            <v-btn
              color="info"
              variant="outlined"
              size="small"
              block
              @click="usePalette(index)"
            >
              <v-icon start>mdi-check</v-icon>
              Usar
            </v-btn>
            <v-btn
              color="error"
              variant="outlined"
              size="small"
              block
              @click="deletePalette(index)"
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
import { ref, computed } from 'vue'

const palettes = ref([
  {
    name: 'Opción 1',
    colors: ['#203A68', '#EDB600', '#FEC707', '#4E4D4D', '#686868'],
  },
  {
    name: 'Opción 2',
    colors: ['#2F4858', '#7E8B9E', '#FEC707', '#DAD9CC', '#FF8B21'],
  },
  {
    name: 'Opción 3',
    colors: ['#4D4D4D', '#A7A7A7', '#FEC707', '#D9D9D9', '#EDB600'],
  },
  {
    name: 'Opción 4',
    colors: ['#011226', '#14AEA3', '#FEC707', '#FF8B21', '#FF3300'],
  },
  {
    name: 'Opción 5',
    colors: ['#2C4FB2', '#68C3EA', '#FEC707', '#DAD9CC', '#4E4D4D'],
  },
  {
    name: 'Opción 6',
    colors: ['#3BB377', '#CFEDD1', '#FEC707', '#D9D9D9', '#4E4D4D'],
  },
])

const newPaletteName = ref('')
const newColors = ref(['', '', '', '', ''])

const canAdd = computed(() => {
  if (!newPaletteName.value.trim()) return false
  return newColors.value.every((color) =>
    /^#([0-9A-Fa-f]{6})$/.test(color.trim())
  )
})

function addPalette() {
  if (!canAdd.value) return
  palettes.value.push({
    name: newPaletteName.value.trim(),
    colors: newColors.value.map((c) => c.trim()),
  })
  newPaletteName.value = ''
  newColors.value = ['', '', '', '', '']
}

function usePalette(index) {
  alert(`Usando paleta: ${palettes.value[index].name}`)
}

function deletePalette(index) {
  palettes.value.splice(index, 1)
}
</script>

<style scoped>
.palette-card {
  min-height: 300px;
  height: 100%;
}

.color-block {
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.color-code {
  margin-top: 4px;
  font-size: 0.8rem;
  color: var(--v-theme-on-surface);
  user-select: text;
}
</style>