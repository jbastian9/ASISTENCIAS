<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="position-relative">
        <v-card elevation="10" class="pa-0 d-flex flex-column flex-md-row overflow-hidden rounded-xl">
          <div class="controls-top-right">
            <v-btn icon small @click="toggleContrast" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
              <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
            </v-btn>
            <v-btn icon small @click="cycleFontSize" title="Cambiar tamaño de fuente">
              <v-icon>mdi-format-size</v-icon>
            </v-btn>
          </div>
          <!-- Panel Izquierdo -->
          <v-col cols="12" md="6" class="pa-4 pa-md-8 d-flex align-center justify-center left-panel">
            <div class="text-center">
              <v-icon size="48" color="primary">mdi-login</v-icon>
              <h3 class="mt-2">¿Ya tienes una cuenta?</h3>
              <p class="text-body-2">Inicia sesión para acceder.</p>
              <v-btn variant="outlined" color="primary" class="mt-4" @click="goToLogin">
                Iniciar sesión
              </v-btn>
            </div>
          </v-col>

          <!-- Formulario de Registro -->
          <v-col cols="12" md="6" class="pa-4 pa-md-8">
            <!-- Logo -->
            <div class="text-center mb-6">
              <v-img :src="logo" max-height="60" contain class="mx-auto" />
            </div>

            <v-card-title class="text-h5 font-weight-bold mb-4">Registro</v-card-title>
            <v-form v-model="isValid" ref="formRef">
              <v-text-field
                v-model="correo"
                label="Correo Electrónico"
                type="email"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
                density="comfortable"
              />
              <v-text-field
                v-model="contrasena"
                label="Contraseña"
                type="password"
                prepend-inner-icon="mdi-lock"
                :rules="passwordRules"
                density="comfortable"
              />
              <v-text-field
                v-model="repetirContrasena"
                label="Repetir Contraseña"
                type="password"
                prepend-inner-icon="mdi-lock-check"
                :rules="[v => v === contrasena || 'Las contraseñas no coinciden']"
                density="comfortable"
              />

              <!-- Placeholder para reCAPTCHA -->
              <div class="mt-4 mb-4 text-center">
                <div class="recaptcha-placeholder">
                  Aquí irá reCAPTCHA
                </div>
              </div>

              <v-btn
                :disabled="!isValid"
                color="primary"
                class="mt-4"
                block
                @click="registrar"
              >
                Registrarse
              </v-btn>
            </v-form>
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
import logo from '../assets/logo.svg'

const router = useRouter()
const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')

const isValid = ref(false)
const formRef = ref(null)

const correo = ref('')
const contrasena = ref('')
const repetirContrasena = ref('')

const emailRules = [
  v => !!v || 'El correo es obligatorio',
  v => /.+@.+\..+/.test(v) || 'El correo no es válido',
]

const passwordRules = [
  v => !!v || 'La contraseña es obligatoria',
  v => v.length >= 6 || 'Mínimo 6 caracteres',
]

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

const registrar = () => {
  if (formRef.value?.validate()) {
    console.log('Registrando:', {
      correo: correo.value,
      contrasena: contrasena.value,
    })
    router.push('/dashboard')
  }
}

const goToLogin = () => {
  router.push('/ingreso')
}
</script>

<style scoped>
.left-panel {
  background-color: var(--v-theme-surface);
  border-right: 1px solid var(--v-theme-outline);
}

/* Controles arriba derecha - a nivel del contenedor principal */
.controls-top-right {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 1;
}

.recaptcha-placeholder {
  height: 78px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  border-radius: 8px;
}

/* Adaptación para móvil */
@media (max-width: 959px) {
  .left-panel {
    border-right: none;
    border-top: 1px solid var(--v-theme-outline);
    margin-top: 20px;
  }
}
</style>