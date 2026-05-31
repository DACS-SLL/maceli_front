<template>
  <NavBar />
  <main>
    <template v-if="currentView === 'home'">
      <HeroSection />
      <BeneficiosSection />
      <ContactoSection />
    </template>

    <SobreSection v-else-if="currentView === 'sobre'" />
    <PlanesSection v-else-if="currentView === 'planes'" />
    <FaqSection v-else-if="currentView === 'faq'" />
  </main>
  <FooterBar />
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import NavBar            from './components/NavBar.vue'
import HeroSection       from './components/HeroSection.vue'
import SobreSection      from './components/SobreSection.vue'
import PlanesSection     from './components/PlanesSection.vue'
import BeneficiosSection from './components/BeneficiosSection.vue'
import FaqSection        from './components/FaqSection.vue'
import ContactoSection   from './components/ContactoSection.vue'
import FooterBar         from './components/FooterBar.vue'

const standaloneViews = new Set(['sobre', 'planes', 'faq'])
const currentView = ref(resolveView())
let observer

function currentHash() {
  return window.location.hash.replace('#', '') || 'inicio'
}

function resolveView() {
  const hash = currentHash()
  return standaloneViews.has(hash) ? hash : 'home'
}

function revealElements() {
  observer?.disconnect()

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
}

async function syncRoute() {
  const hash = currentHash()
  currentView.value = resolveView()
  await nextTick()
  revealElements()

  if (standaloneViews.has(hash)) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }

  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  syncRoute()
  window.addEventListener('hashchange', syncRoute)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('hashchange', syncRoute)
})
</script>
