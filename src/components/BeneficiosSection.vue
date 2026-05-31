<template>
  <section id="beneficios">
    <div class="beneficios-inner">
      <div class="beneficios-header">
        <div class="fade-up">
          <p class="section-label">Por qué elegirnos</p>
          <h2 class="section-title">Beneficios que marcan la diferencia</h2>
          <div class="divider"></div>
        </div>
        <p class="section-sub fade-up">No solo vendemos comida. Ofrecemos un cambio de estilo de vida con el respaldo de nutrición real y sabor auténtico.</p>
      </div>
      <div class="beneficios-grid">
        <div v-for="b in beneficios" :key="b.num" class="bene-card fade-up">
          <img :src="b.icon" :alt="b.alt" class="bene-icon" loading="lazy" />
          <div class="bene-num">{{ b.num }}</div>
          <h4>{{ b.title }}</h4>
          <p>{{ b.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import almuerzoIcon from '@/icos/almuerzo_saludable.png'
import asesoriaIcon from '@/icos/asesoria_nutr.png'
import deliveryIcon from '@/icos/delivery_punt.png'
import ingredientesIcon from '@/icos/ingredientes_fresc.png'
import nutricionIcon from '@/icos/nutricion_per.png'
import familiarIcon from '@/icos/plan_familiar.png'

const beneficios = [
  { num: '01', icon: ingredientesIcon, alt: 'Ingredientes frescos', title: 'Sin conservantes',     text: 'Preparación diaria con ingredientes frescos, sin aditivos artificiales ni conservantes.' },
  { num: '02', icon: nutricionIcon, alt: 'Nutrición personalizada', title: 'Personalización real', text: 'Cada plan adaptado a tus objetivos, preferencias y necesidades nutricionales específicas.' },
  { num: '03', icon: deliveryIcon, alt: 'Delivery puntual', title: 'Delivery puntual',     text: 'Tu comida llega cuando la necesitas. Puntualidad como valor, no como promesa vacía.' },
  { num: '04', icon: familiarIcon, alt: 'Plan familiar', title: 'Ahorro de tiempo',     text: 'Olvídate de planificar, comprar y cocinar. Nosotros lo hacemos por ti.' },
  { num: '05', icon: almuerzoIcon, alt: 'Almuerzo saludable', title: 'Sabor garantizado',    text: 'Lo saludable no tiene que ser insípido. Recetas deliciosas que querrás repetir.' },
  { num: '06', icon: asesoriaIcon, alt: 'Asesoría nutricional', title: 'Asesoría incluida',    text: 'Orientación nutricional en planes especializados para alcanzar tus metas con información real.' },
]
</script>

<style scoped>
#beneficios { background: var(--dark); }
.beneficios-inner { max-width: 1100px; margin: 0 auto; }
.beneficios-header { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: end; margin-bottom: 4rem; }
.beneficios-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.bene-card { padding: 2rem 1.6rem; border-top: 2px solid rgba(217,165,165,0.2); transition: border-color .3s; }
.bene-card:hover { border-color: var(--accent); }
.bene-icon {
  width: 86px; height: 86px; object-fit: contain;
  margin-bottom: 1.25rem; opacity: .98;
}
.bene-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem; color: rgba(217,165,165,0.22); font-weight: 700; line-height: 1; margin-bottom: .8rem;
}
.bene-card h4 { font-family: 'Cormorant Garamond', serif; font-size: 1.28rem; color: var(--light); margin-bottom: .55rem; }
.bene-card p { font-size: .94rem; color: var(--mid); line-height: 1.75; }
@media (max-width: 900px) {
  .beneficios-header { grid-template-columns: 1fr; gap: 2rem; }
  .beneficios-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .beneficios-grid { grid-template-columns: 1fr; }
}
</style>
