<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="6" lg="4">
        <v-card elevation="10" class="pa-4 pa-md-8 rounded-xl position-relative">
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

          <!-- Logo institucional -->
          <div class="text-center mb-6">
            <v-img :src="logo" max-height="60" contain class="mx-auto" />
          </div>

          <v-card-title class="text-h5 font-weight-bold mb-2 text-center">
            Recuperar Contraseña
          </v-card-title>

          <v-card-subtitle class="text-center mb-6">
            Ingresa tu correo electrónico para enviarte instrucciones de recuperación.
          </v-card-subtitle>

          <v-form v-model="isValid" ref="formRef">
            <v-text-field
              v-model="correo"
              label="Correo Electrónico"
              type="email"
              :rules="reglasCorreo"
              prepend-inner-icon="mdi-email"
              required
              density="comfortable"
            />

            <!-- Placeholder de reCAPTCHA -->
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
              @click="recuperar"
            >
              Enviar Instrucciones
            </v-btn>

            <div class="text-center mt-4">
              <v-btn variant="text" @click="volverAlLogin">
                Volver al inicio de sesión
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import logo from '../assets/logo.svg'

const router = useRouter()
const correo = ref('')
const isValid = ref(false)
const formRef = ref(null)

const reglasCorreo = [
  v => !!v || 'El correo es obligatorio',
  v => /.+@.+\..+/.test(v) || 'El correo no es válido',
]

// Tema
const theme = useTheme()
const isDark = ref(theme.global.name.value === 'dark')

const toggleContrast = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

// Tamaños de fuente
const fontSizes = ['100%', '110%', '120%']
const fontIndex = ref(0)

const cycleFontSize = () => {
  fontIndex.value = (fontIndex.value + 1) % fontSizes.length
  document.documentElement.style.fontSize = fontSizes[fontIndex.value]
}

const recuperar = () => {
  if (formRef.value?.validate()) {
    alert('Se han enviado las instrucciones a tu correo.')
    router.push('/ingreso')
  }
}

const volverAlLogin = () => {
  router.push('/ingreso')
}
</script>

<style scoped>
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

.access-controls {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
}
</style>