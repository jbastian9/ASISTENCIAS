<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="10" class="pa-0 d-flex flex-column flex-md-row overflow-hidden rounded-xl position-relative">
          <!-- Controles de accesibilidad -->
          <div class="access-controls">
            <v-btn icon @click="toggleContrast" size="small">
              <v-icon>
                {{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}
              </v-icon>
            </v-btn>
            <v-btn icon @click="cycleFontSize" size="small">
              <v-icon>mdi-format-size</v-icon>
            </v-btn>
          </div>

          <!-- Formulario de Inicio de Sesión -->
          <v-col cols="12" md="6" class="pa-4 pa-md-8">
            <!-- Logo institucional -->
            <div class="text-center mb-6">
              <v-img
                :src="logo"
                max-height="60"
                contain
                class="mx-auto"
              />
            </div>

            <v-card-title class="text-h5 font-weight-bold mb-4">Iniciar sesión</v-card-title>
            <v-form v-model="esValido" ref="formRef">
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
                type="email"
                :rules="reglasCorreo"
                prepend-inner-icon="mdi-email"
                required
                density="comfortable"
              />
              <v-text-field
                v-model="contrasena"
                label="Contraseña"
                type="password"
                :rules="reglasContrasena"
                prepend-inner-icon="mdi-lock"
                required
                density="comfortable"
              />
              <v-btn
                :disabled="!esValido || cargando"
                color="primary"
                class="mt-4"
                block
                @click="ingresar"
              >
                <template v-if="cargando">
                  <v-progress-circular indeterminate size="20" color="white" />
                </template>
                <template v-else>
                  Ingresar
                </template>
              </v-btn>

              <v-alert
                v-if="errorMensaje"
                type="error"
                class="mt-4"
                dense
                border="left"
                colored-border
              >
                {{ errorMensaje }}
              </v-alert>

              <!-- Redes Sociales -->
              <div class="text-center mt-4">
                <p class="text-subtitle-2 mb-2">O inicia sesión con</p>
                <v-btn icon class="mx-1" color="red lighten-1">
                  <v-icon>mdi-google</v-icon>
                </v-btn>
                <v-btn icon class="mx-1" color="blue darken-3">
                  <v-icon>mdi-microsoft</v-icon>
                </v-btn>
                <v-btn icon class="mx-1" color="indigo darken-4">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon class="mx-1" color="light-blue darken-1">
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-col>

          <!-- Panel Derecho de Invitación -->
          <v-col cols="12" md="6" class="pa-4 pa-md-8 d-flex align-center justify-center right-panel">
            <div class="text-center">
              <v-icon size="48" color="primary">mdi-account-plus</v-icon>
              <h3 class="mt-2">¿Eres nuevo?</h3>
              <p class="text-body-2">Te invitamos a registrarte.</p>
              <v-btn variant="outlined" color="primary" class="mt-4" @click="irARegistro">
                Registrarse
              </v-btn>

              <div class="mt-6">
                <p class="text-body-2">¿Olvidaste tu contraseña?</p>
                <v-btn
                  variant="text"
                  color="secondary"
                  class="text-caption"
                  @click="irARecuperacion"
                >
                  Haz clic aquí para recuperarla
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import axios from 'axios'
import logo from '../assets/logo.svg'

const router = useRouter()
const correo = ref('')
const contrasena = ref('')
const esValido = ref(false)
const formRef = ref(null)
const cargando = ref(false)
const errorMensaje = ref(null)

const reglasCorreo = [
  v => !!v || 'El correo es obligatorio',
  v => /.+@.+\..+/.test(v) || 'El correo no es válido',
]

const reglasContrasena = [
  v => !!v || 'La contraseña es obligatoria',
  v => v.length >= 6 || 'Debe tener al menos 6 caracteres',
]

// Cambiar tema
const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')

const toggleContrast = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

// Cambiar tamaño fuente
const fontSizes = ['100%', '110%', '120%']
const fontIndex = ref(0)

const cycleFontSize = () => {
  fontIndex.value = (fontIndex.value + 1) % fontSizes.length
  document.documentElement.style.fontSize = fontSizes[fontIndex.value]
}

const ingresar = async () => {
  if (!formRef.value?.validate()) return
  errorMensaje.value = null
  cargando.value = true

  try {
    const baseURL = import.meta.env.VITE_BACKEND_ORIGEN || 'http://localhost:8000'
    const response = await axios.post(
      `${baseURL}/login`,
      new URLSearchParams({
        username: correo.value,
        password: contrasena.value
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    localStorage.setItem('token', response.data.access_token)
    router.push('/dashboard')
  } catch (error) {
    errorMensaje.value = error.response?.status === 401
      ? 'Correo o contraseña incorrectos'
      : 'Error en la conexión. Intente nuevamente.'
  } finally {
    cargando.value = false
  }
}

const irARegistro = () => router.push('/registro')
const irARecuperacion = () => router.push('/recuperar-contrasena')
</script>

<style scoped>
.right-panel {
  background-color: var(--v-theme-surface);
  border-left: 1px solid var(--v-theme-outline);
}

@media (max-width: 959px) {
  .right-panel {
    border-left: none;
    border-top: 1px solid #e0e0e0;
    margin-top: 20px;
  }
}

.access-controls {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 1;
}
</style>