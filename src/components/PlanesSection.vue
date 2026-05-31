<template>
  <section id="planes">
    <div class="planes-header fade-up">
      <p class="section-label">Nuestros planes</p>
      <h2 class="section-title">Elige tu plan saludable</h2>
      <div class="divider"></div>
      <p class="section-sub">Planes flexibles adaptados a tu estilo de vida. Sin complicaciones, con sabor y bienestar garantizado.</p>
    </div>

    <div class="planes-grid fade-up">
      <template v-if="loading">
        <div v-for="n in 6" :key="n" class="plan-card skeleton">
          <div class="plan-name">Cargando...</div>
        </div>
      </template>

      <template v-else-if="planes.length">
        <div
          v-for="plan in planes"
          :key="plan.id"
          class="plan-card"
          :class="{ featured: isFeatured(plan) }"
        >
          <div v-if="isFeatured(plan)" class="plan-badge-top">Más solicitado</div>
          <div class="plan-name">{{ plan.nombre }}</div>
          <div class="plan-desc">{{ plan.descripcion }}</div>
          <div class="plan-price">S/. {{ formatPrice(plan.precio) }}</div>
          <div class="plan-price-label">{{ plan._etiqueta || plan.categoria }}</div>
          <ul v-if="plan._beneficios?.length" class="plan-features">
            <li v-for="b in plan._beneficios" :key="b">{{ b }}</li>
          </ul>
          <button v-if="plan.imagen_url" type="button" class="plan-secondary-btn" @click="openImage(plan)">
            Ver plan
          </button>
          <a :href="whatsappLink(`Quiero el ${plan.nombre} de MACELI`)" target="_blank" rel="noopener" class="plan-btn">Pedir ahora</a>
        </div>
      </template>

      <p v-else class="empty-msg">No hay planes disponibles en este momento.</p>
    </div>

    <div class="plan-custom fade-up">
      <div>
        <h3>¿Necesitas algo más específico?</h3>
        <p>Diseñamos un plan 100% a medida según tus objetivos: pérdida de peso, masa muscular, planes especializados o restricciones alimentarias.</p>
      </div>
      <a :href="whatsappLink('Quiero un plan personalizado de MACELI')" target="_blank" rel="noopener" class="btn-primary">Consultar plan personalizado</a>
    </div>

    <div v-if="selectedPlan" class="image-modal" role="dialog" aria-modal="true" :aria-label="`Imagen de ${selectedPlan.nombre}`" @click.self="closeImage">
      <div class="image-modal-inner">
        <button type="button" class="image-modal-close" aria-label="Cerrar imagen" @click="closeImage">×</button>
        <img :src="mediaUrl(selectedPlan.imagen_url)" :alt="selectedPlan.nombre" />
        <p>{{ selectedPlan.nombre }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { apiFetch, mediaUrl, whatsappLink } from '@/config/app'

const loading = ref(true)
const planes  = ref([])
const selectedPlan = ref(null)

const FALLBACK = [
  {
    id: 1, nombre: 'Plan Fit Maceli', descripcion: 'Almuerzos saludables altos en proteína, carbohidratos balanceados, grasas saludables y micronutrientes esenciales.',
    precio: 360, categoria: 'Plan mensual', activo: true, imagen_url: '',
    _etiqueta: '24 almuerzos + bebidas + postres',
    _beneficios: ['Almuerzos de carta semanal', 'Bebidas incluidas', 'Postres fit incluidos', 'Enfoque nutricional balanceado'],
    _destacado: true,
  },
  {
    id: 2, nombre: 'Plan Familiar', descripcion: 'Alimentación equilibrada, nutritiva y variada para el hogar, adaptada a necesidades diarias con ingredientes frescos.',
    precio: 1125, categoria: 'Plan familiar', activo: true, imagen_url: '',
    _etiqueta: '75 almuerzos + bebidas + postres',
    _beneficios: ['Pensado para familias', 'Ingredientes frescos', 'Delivery coordinado', 'Variedad semanal']
  },
  {
    id: 3, nombre: 'Plan Doble Pack', descripcion: 'Almuerzo y cena saludables, sabrosos y equilibrados, personalizados según preferencias y necesidades.',
    precio: 860, categoria: 'Mensual · semanal S/. 220', activo: true, imagen_url: '',
    _etiqueta: 'almuerzo + cena',
    _beneficios: ['Carta semanal', 'Almuerzo saludable', 'Cena saludable', 'Opción mensual o semanal']
  },
  {
    id: 4, nombre: 'Plan Personalizado', descripcion: 'Almuerzos elaborados de acuerdo con requerimientos específicos para apoyar tus objetivos con orientación nutricional.',
    precio: 430, categoria: 'Plan mensual', activo: true, imagen_url: '',
    _etiqueta: '24 almuerzos personalizados',
    _beneficios: ['Bebidas incluidas', 'Postres personalizados', 'Orientación nutricional', 'Ajuste por objetivos']
  },
  {
    id: 5, nombre: 'Plan Triple Pack', descripcion: 'Planificación completa con tres comidas esenciales personalizadas al día para mantener menús variados y balanceados.',
    precio: 1160, categoria: 'Mensual · semanal S/. 300', activo: true, imagen_url: '',
    _etiqueta: 'desayuno + almuerzo + cena',
    _beneficios: ['24 desayunos personalizados', '24 almuerzos personalizados', '24 cenas personalizadas', 'Opción mensual o semanal']
  },
  {
    id: 6, nombre: 'Menú Saludable del Día', descripcion: 'Opción flexible para organizar tu alimentación día a día con una comida rica, saludable y casera.',
    precio: 16, categoria: 'Plato individual', activo: true, imagen_url: '',
    _etiqueta: 'delivery según punto de entrega',
    _beneficios: ['Bebida incluida', 'Postre fit incluido', 'Carta semanal', 'Ideal para probar MACELI']
  },
]

const priceFormatter = new Intl.NumberFormat('es-PE', {
  maximumFractionDigits: 0,
})

function formatPrice(price) {
  return priceFormatter.format(Number(price || 0))
}

function isFeatured(plan) {
  return Boolean(plan._destacado) || /fit/i.test(plan.nombre || '')
}

function openImage(plan) {
  selectedPlan.value = plan
}

function closeImage() {
  selectedPlan.value = null
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeImage()
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  try {
    const res = await apiFetch('/planes')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    planes.value = Array.isArray(data) ? data : (data.data || [])
  } catch {
    planes.value = FALLBACK
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
#planes { background: var(--black); min-height: 100vh; }
.planes-header { max-width: 1100px; margin: 0 auto 4rem; }
.planes-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  max-width: 1100px; margin: 0 auto;
}
.plan-card {
  border: 1px solid rgba(191,191,191,0.12);
  border-radius: 4px; padding: 2.6rem 2rem;
  background: var(--dark); position: relative;
  transition: border-color .3s, transform .3s;
  display: flex; flex-direction: column;
}
.plan-card.skeleton { opacity: .4; pointer-events: none; min-height: 220px; }
.plan-card:hover { border-color: var(--accent); transform: translateY(-6px); }
.plan-card.featured {
  border-color: var(--accent);
  background: linear-gradient(160deg, #3A3A3A 0%, #2a2020 100%);
}
.plan-badge-top {
  position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: var(--black);
  font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
  padding: .34rem 1rem; border-radius: 0 0 3px 3px; white-space: nowrap;
}
.plan-name { font-family: 'Cormorant Garamond', serif; font-size: 1.62rem; font-weight: 600; color: var(--light); margin-bottom: .55rem; }
.plan-desc { font-size: .94rem; color: var(--mid); line-height: 1.7; margin-bottom: 1.7rem; }
.plan-price { font-family: 'Cormorant Garamond', serif; font-size: 2.9rem; font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: .35rem; }
.plan-price-label { font-size: .84rem; color: var(--mid); margin-bottom: 1.8rem; min-height: 1rem; }
.plan-features { list-style: none; display: flex; flex-direction: column; gap: .7rem; flex-grow: 1; }
.plan-features li { font-size: .92rem; color: var(--mid); display: flex; align-items: center; gap: .7rem; }
.plan-features li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
.plan-secondary-btn {
  margin-top: 1.6rem; padding: .8rem;
  border: 1px solid rgba(191,191,191,.26); color: var(--mid);
  background: transparent; font-family: 'DM Sans', sans-serif;
  font-size: .82rem; letter-spacing: .08em; text-transform: uppercase;
  cursor: pointer; text-decoration: none; border-radius: 2px;
  transition: border-color .25s, color .25s; display: block;
}
.plan-secondary-btn:hover { border-color: var(--accent); color: var(--accent); }
.plan-btn {
  margin-top: 1rem; padding: .9rem; text-align: center;
  border: 1px solid var(--accent); color: var(--accent);
  background: transparent; font-family: 'DM Sans', sans-serif;
  font-size: .84rem; letter-spacing: .1em; text-transform: uppercase;
  cursor: pointer; text-decoration: none; border-radius: 2px;
  transition: background .25s, color .25s; display: block;
}
.plan-btn:hover, .plan-card.featured .plan-btn { background: var(--accent); color: var(--black); }
.empty-msg { color: var(--mid); text-align: center; grid-column: 1/-1; padding: 2rem; }
.plan-custom {
  max-width: 1100px; margin: 2rem auto 0;
  background: var(--dark); border: 1px solid rgba(217,165,165,0.15);
  border-radius: 4px; padding: 2.5rem;
  display: flex; align-items: center; justify-content: space-between;
  gap: 2rem; flex-wrap: wrap;
}
.plan-custom h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.72rem; color: var(--light); margin-bottom: .4rem; }
.plan-custom p { font-size: .96rem; color: var(--mid); max-width: 520px; line-height: 1.7; }
.image-modal {
  position: fixed; inset: 0; z-index: 200;
  display: grid; place-items: center;
  padding: 2rem; background: rgba(0,0,0,.78);
}
.image-modal-inner {
  position: relative; width: min(920px, 94vw); max-height: 88vh;
  display: grid; gap: 1rem; justify-items: center;
}
.image-modal-inner img {
  max-width: 100%; max-height: 78vh; object-fit: contain;
  border-radius: 4px; box-shadow: 0 18px 60px rgba(0,0,0,.55);
}
.image-modal-inner p {
  color: var(--light); font-size: .92rem; letter-spacing: .08em; text-transform: uppercase;
}
.image-modal-close {
  position: absolute; top: -1.1rem; right: -1.1rem;
  width: 2.4rem; height: 2.4rem; border-radius: 50%;
  border: 1px solid rgba(217,165,165,.45); color: var(--light);
  background: var(--black); cursor: pointer; font-size: 1.4rem;
}
@media (max-width: 900px) {
  .planes-grid { grid-template-columns: 1fr; }
  .plan-custom { flex-direction: column; align-items: flex-start; }
}
</style>
