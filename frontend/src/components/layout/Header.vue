<template>
  <v-app-bar flat :color="isDark ? 'grey-darken-4' : 'grey-lighten-4'" :dark="isDark" app>
    <v-btn icon @click="$emit('toggle-sidebar')">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-toolbar-title class="d-none d-sm-flex">{{ appName }}</v-toolbar-title>

    <v-spacer />

    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>

    <v-btn icon @click="toggleContrast">
      <v-icon>
        {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
      </v-icon>
    </v-btn>

    <v-btn icon @click="cycleFontSize">
      <v-icon>mdi-format-size</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar size="32">
            <img src="https://i.pravatar.cc/32" alt="Usuario" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="editProfile" link>
          <template #prepend>
            <v-icon>mdi-account-edit</v-icon>
          </template>
          <v-list-item-title>Editar perfil</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout" link>
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const appName = import.meta.env.VITE_APP_NAME

const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')

const toggleContrast = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

const fontSizes = ['100%', '110%', '120%']
const fontIndex = ref(0)

const cycleFontSize = () => {
  fontIndex.value = (fontIndex.value + 1) % fontSizes.length
  document.documentElement.style.fontSize = fontSizes[fontIndex.value]
}

const logout = () => {
  console.log('Cerrar sesión')
}

const editProfile = () => {
  console.log('Editar perfil')
}
</script>

<style scoped>
@media (max-width: 600px) {
  .v-toolbar-title {
    display: none;
  }
}
</style>