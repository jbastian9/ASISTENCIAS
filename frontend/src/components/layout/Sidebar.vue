<template>
  <v-navigation-drawer
    v-model="internalSidebarOpen"
    :permanent="!display.smAndDown"
    app
    width="256"
  >
    <v-list dense nav>
      <v-list-item class="px-4 py-6" style="justify-content: center;">
        <img :src="logoSrc" alt="Logo actual" style="height: 50px;" />
      </v-list-item>

      <v-list-group prepend-icon="mdi-cog-outline" no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title class="menu-label">Personalizar</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item :to="{ name: 'Fuentes' }" link>
          <template #prepend>
            <v-icon>mdi-format-font</v-icon>
          </template>
          <v-list-item-title class="menu-label">Fuentes</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'Colores' }" link>
          <template #prepend>
            <v-icon>mdi-palette-outline</v-icon>
          </template>
          <v-list-item-title class="menu-label">Colores</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ name: 'Estructura' }" link>
          <template #prepend>
            <v-icon>mdi-plus-box-outline</v-icon>
          </template>
          <v-list-item-title class="menu-label">Estructura</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-calendar-check-outline" no-action>
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title class="menu-label">Asistencias</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item :to="'#'" link>
          <template #prepend>
            <v-icon>mdi-calendar-edit</v-icon>
          </template>
          <v-list-item-title class="menu-label">Reuniones</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'#'" link>
          <template #prepend>
            <v-icon>mdi-form-select</v-icon>
          </template>
          <v-list-item-title class="menu-label">Formularios</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'#'" link>
          <template #prepend>
            <v-icon>mdi-chart-box-outline</v-icon>
          </template>
          <v-list-item-title class="menu-label">Reportes</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'#'" link>
          <template #prepend>
            <v-icon>mdi-calendar-month-outline</v-icon>
          </template>
          <v-list-item-title class="menu-label">Calendario</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const display = useDisplay()

const internalSidebarOpen = ref(props.modelValue)

watch(() => props.modelValue, val => {
  internalSidebarOpen.value = val
})

watch(internalSidebarOpen, val => {
  emit('update:modelValue', val)
})

// Ruta del logo desde src/assets/logo.svg
const logoSrc = ref(new URL('../../assets/logo.svg', import.meta.url).href)

</script>

<style scoped>
.menu-label {
  white-space: nowrap;
}

.v-list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
</style>