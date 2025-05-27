<template>
  <v-container class="pa-4" fluid>
    <v-row dense>
      <!-- FORMULARIO PARA AGREGAR SECCIÓN -->
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4">
          <v-card-title class="text-h6">Agregar sección</v-card-title>
          <v-card-text>
            <v-text-field v-model="newSection.name" label="Nombre de la sección" outlined density="compact" />
            <v-text-field v-model="newSection.icon" label="Ícono (mdi-...)" outlined density="compact" />
            <v-text-field v-model="newSection.position" label="Posición" type="number" outlined density="compact" />

            <h4 class="mt-4 mb-2 text-subtitle-2">Opciones / Hijos</h4>
            <div v-for="(child, i) in newSection.children" :key="i" class="child-form mb-2">
              <v-row dense>
                <v-col cols="12" sm="5">
                  <v-text-field v-model="child.name" label="Nombre" density="compact" outlined />
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="child.position" type="number" label="Pos" density="compact" outlined />
                </v-col>
                <v-col cols="12" sm="5">
                  <v-text-field v-model="child.icon" label="Ícono" density="compact" outlined />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="child.url" label="URL" density="compact" outlined />
                </v-col>
              </v-row>
            </div>
            <v-btn variant="text" color="primary" @click="addChild">
              <v-icon start>mdi-plus</v-icon> Añadir opción
            </v-btn>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="success" variant="outlined" @click="addSection">
              <v-icon start>mdi-check</v-icon> Guardar sección
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- PREVISUALIZACIÓN DE SECCIONES -->
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4">
          <v-card-title class="text-h6">Secciones actuales</v-card-title>
          <v-card-text>
            <v-list>
              <!-- Sección inicial fija -->
              <v-list-item>
                <v-list-item-title>
                  <v-icon start>mdi-cog</v-icon>
                  Personalizar (1)
                </v-list-item-title>
                <v-list-item-subtitle>
                  └ <v-icon start small>mdi-palette</v-icon> Colores – /personalizar/colores (1)
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  └ <v-icon start small>mdi-format-font</v-icon> Fuentes – /personalizar/fuentes (2)
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  └ <v-icon start small>mdi-view-grid-plus-outline</v-icon> Secciones – /personalizar/secciones (3)
                </v-list-item-subtitle>
              </v-list-item>

              <!-- Secciones dinámicas -->
              <v-list-item
                v-for="section in sectionsSorted"
                :key="section.name"
              >
                <v-list-item-title>
                  <v-icon start>{{ section.icon }}</v-icon>
                  {{ section.name }} ({{ section.position }})
                </v-list-item-title>
                <v-list-item-subtitle
                  v-for="child in section.children"
                  :key="child.name"
                >
                  └ <v-icon start small>{{ child.icon }}</v-icon>
                  {{ child.name }} – {{ child.url }} ({{ child.position }})
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- SUBIR NUEVO LOGO -->
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4">
          <v-card-title class="text-h6">Cambiar logo</v-card-title>
          <v-card-text>
            <div class="mb-3">
              <p class="text-caption mb-1">Logo actual:</p>
              <img :src="logoSrc" alt="Logo actual" style="height: 50px;" />
            </div>
            <v-file-input
              accept=".svg"
              label="Subir nuevo logo (.svg)"
              prepend-icon="mdi-upload"
              @change="handleLogoUpload"
              density="compact"
              outlined
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// Ruta del logo desde src/assets/logo.svg
const logoSrc = ref(new URL('../../assets/logo.svg', import.meta.url).href)

// Sección nueva
const newSection = ref({
  name: '',
  icon: '',
  position: 0,
  children: []
})

// Secciones creadas dinámicamente
const sections = ref([])

const addChild = () => {
  newSection.value.children.push({
    name: '',
    icon: '',
    position: 0,
    url: ''
  })
}

const addSection = () => {
  if (!newSection.value.name || newSection.value.children.length === 0) return
  sections.value.push(JSON.parse(JSON.stringify(newSection.value)))
  newSection.value = { name: '', icon: '', position: 0, children: [] }
}

const sectionsSorted = computed(() =>
  [...sections.value].sort((a, b) => a.position - b.position)
)

// Solo reemplazo visual del logo
function handleLogoUpload(files) {
  const file = files?.[0]
  if (!file) return
  if (!file.name.endsWith('.svg')) {
    alert('Solo se permiten archivos .svg')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    try {
      const blob = new Blob([reader.result], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      logoSrc.value = url
      console.log('Logo reemplazado visualmente.')
      // TODO: Enviar `file` al backend y reemplazar logo real en src/assets/logo.svg
    } catch (e) {
      console.error('Error al reemplazar el logo:', e)
    }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.text-subtitle-2 {
  font-weight: 600;
  margin-top: 1rem;
}
</style>