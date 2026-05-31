<template>
  <nav>
    <a href="#inicio" class="logo">MACELI <span>·</span> Eat Fit</a>
    <ul class="nav-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#sobre">Sobre nosotros</a></li>
      <li><a href="#planes">Planes</a></li>
      <li><a href="#beneficios">Beneficios</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
    <a href="#planes" class="nav-cta">Ver planes</a>
    <button class="burger" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" aria-label="Abrir menú" @click="openMenu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div id="mobile-menu" class="mobile-menu" :class="{ open: menuOpen }">
    <button class="mobile-close" type="button" aria-label="Cerrar menú" @click="closeMenu">×</button>
    <a href="#inicio"     @click="closeMenu">Inicio</a>
    <a href="#sobre"      @click="closeMenu">Sobre nosotros</a>
    <a href="#planes"     @click="closeMenu">Planes</a>
    <a href="#beneficios" @click="closeMenu">Beneficios</a>
    <a href="#faq"        @click="closeMenu">Preguntas frecuentes</a>
    <a href="#contacto"   @click="closeMenu">Contacto</a>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const openMenu  = () => menuOpen.value = true
const closeMenu = () => menuOpen.value = false
</script>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.4rem 5%;
  background: rgba(28,28,28,0.88);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(217,165,165,0.12);
  transition: padding .3s;
}
.logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.55rem; font-weight: 700; letter-spacing: .08em;
  color: var(--light); text-decoration: none; white-space: nowrap;
}
.logo span { color: var(--accent); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a {
  font-size: .86rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--mid); text-decoration: none; transition: color .25s;
}
.nav-links a:hover { color: var(--accent); }
.nav-cta {
  padding: .6rem 1.45rem;
  border: 1px solid var(--accent); color: var(--accent);
  background: transparent; font-family: 'DM Sans', sans-serif;
  font-size: .84rem; letter-spacing: .1em; text-transform: uppercase;
  cursor: pointer; text-decoration: none;
  transition: background .25s, color .25s; border-radius: 2px;
}
.nav-cta:hover { background: var(--accent); color: var(--black); }
.burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: 0; padding: .3rem; }
.burger span { width: 26px; height: 2px; background: var(--light); transition: .3s; }
.mobile-menu {
  display: none; flex-direction: column; gap: 1.4rem;
  position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 101;
  background: var(--black); align-items: center; justify-content: center; padding: 2rem;
}
.mobile-menu.open { display: flex; }
.mobile-menu a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; color: var(--light); text-decoration: none; letter-spacing: .08em; transition: color .2s;
}
.mobile-menu a:hover { color: var(--accent); }
.mobile-close {
  position: absolute; top: 1.6rem; right: 5%;
  font-size: 2rem; color: var(--mid); cursor: pointer; background: none; border: none;
}
@media (max-width: 1040px) {
  .nav-links { gap: 1.2rem; }
  .nav-links a { font-size: .78rem; }
}
@media (max-width: 900px) {
  .nav-links, .nav-cta { display: none; }
  .burger { display: flex; }
}
</style>
