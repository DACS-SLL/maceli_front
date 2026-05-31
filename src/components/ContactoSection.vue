<template>
  <section id="contacto">
    <div class="contacto-inner">
      <div class="fade-up">
        <p class="section-label">Contáctanos</p>
        <h2 class="section-title">Hablemos de tu plan ideal</h2>
        <div class="divider"></div>
        <p class="section-sub">Estamos para ayudarte a encontrar la mejor opción. Escríbenos y te respondemos rápido.</p>

        <div class="contacto-list">
          <div v-for="info in infoItems" :key="info.label" class="contacto-item">
            <div>
              <strong>{{ info.label }}</strong>
              <span>{{ info.value }}</span>
            </div>
          </div>
        </div>

        <a :href="waLink" target="_blank" rel="noopener" class="whatsapp-btn">
          Pedir por WhatsApp
        </a>
      </div>

      <div class="fade-up">
        <form class="contacto-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input id="nombre" v-model="form.nombre" name="nombre" type="text" placeholder="Tu nombre" autocomplete="name" required />
          </div>
          <div class="form-group">
            <label for="correo">Correo electrónico</label>
            <input id="correo" v-model="form.correo" name="correo" type="email" placeholder="tu@correo.com" autocomplete="email" />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono / WhatsApp</label>
            <input id="telefono" v-model="form.telefono" name="telefono" type="tel" placeholder="+51 977 545 862" autocomplete="tel" required />
          </div>
          <div class="form-group">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" v-model="form.mensaje" name="mensaje" rows="4" placeholder="Cuéntanos tus objetivos o restricciones alimentarias..." required></textarea>
          </div>
          <p v-if="errorMsg" class="error-msg" role="alert">{{ errorMsg }}</p>
          <p v-if="success" class="success-msg" role="status">Mensaje enviado. Te responderemos pronto.</p>
          <button type="submit" class="form-submit" :disabled="submitting">
            {{ submitLabel }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CONTACT_EMAIL, PUBLIC_WHATSAPP, apiFetch, whatsappLink } from '@/config/app'

const form = ref({ nombre: '', correo: '', telefono: '', mensaje: '' })
const errorMsg  = ref('')
const submitting = ref(false)
const success   = ref(false)
const waLink = whatsappLink('Hola MACELI, quiero información')

const submitLabel = computed(() => {
  if (submitting.value) return 'Enviando...'
  if (success.value)   return 'Mensaje enviado'
  return 'Enviar mensaje'
})

const infoItems = [
  { label: 'Ubicación',           value: 'Yanahuara, Arequipa, Perú · Dark Kitchen' },
  { label: 'WhatsApp',             value: PUBLIC_WHATSAPP },
  { label: 'Email',                value: CONTACT_EMAIL },
  { label: 'Horario de atención',  value: 'Lunes a Sábado · 7:00 am - 8:00 pm' },
]

async function handleSubmit() {
  errorMsg.value = ''
  success.value = false
  const { nombre, correo, telefono, mensaje } = form.value
  if (!nombre.trim() || !telefono.trim() || !mensaje.trim()) {
    errorMsg.value = 'Por favor completa nombre, teléfono y mensaje.'
    return
  }

  submitting.value = true
  try {
    const res = await apiFetch('/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono, correo, mensaje }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `HTTP ${res.status}`)
    }

    success.value = true
    form.value = { nombre: '', correo: '', telefono: '', mensaje: '' }
    window.setTimeout(() => success.value = false, 4000)
  } catch (err) {
    const message = err.name === 'AbortError' ? 'La solicitud tardó demasiado' : err.message
    errorMsg.value = `Error: ${message}. Intenta por WhatsApp.`
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
#contacto { background: var(--dark); }
.contacto-inner {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
}
.contacto-list { margin-top: 2.5rem; }
.contacto-item { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; }
.contacto-item strong { display: block; font-size: .86rem; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); margin-bottom: .25rem; }
.contacto-item span { font-size: .98rem; color: var(--mid); }
.whatsapp-btn {
  display: inline-flex; align-items: center; gap: .8rem;
  padding: 1rem 2rem; background: #25D366; color: #fff;
  font-family: 'DM Sans', sans-serif; font-size: .9rem; letter-spacing: .08em;
  text-transform: uppercase; border: none; cursor: pointer;
  text-decoration: none; border-radius: 2px; margin-top: 1.6rem;
  transition: opacity .25s, transform .2s;
}
.whatsapp-btn:hover { opacity: .88; transform: translateY(-2px); }
.contacto-form { display: flex; flex-direction: column; gap: 1.1rem; }
.form-group { display: flex; flex-direction: column; gap: .4rem; }
.form-group label { font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; color: var(--mid); }
.form-group input,
.form-group textarea {
  background: rgba(28,28,28,.7); border: 1px solid rgba(191,191,191,0.18);
  color: var(--light); font-family: 'DM Sans', sans-serif; font-size: .98rem;
  padding: .9rem 1rem; border-radius: 2px; outline: none;
  transition: border-color .25s; resize: none;
}
.form-group input:focus,
.form-group textarea:focus { border-color: var(--accent); }
.error-msg { font-size: .9rem; color: #e57373; }
.success-msg { font-size: .9rem; color: #9ad29a; }
.form-submit {
  padding: .95rem 2rem; background: var(--accent); color: var(--black);
  font-family: 'DM Sans', sans-serif; font-size: .86rem; letter-spacing: .1em;
  text-transform: uppercase; border: none; cursor: pointer; border-radius: 2px;
  transition: opacity .25s; align-self: flex-start;
}
.form-submit:hover:not(:disabled) { opacity: .88; }
.form-submit:disabled { opacity: .6; cursor: default; }
@media (max-width: 900px) {
  .contacto-inner { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
