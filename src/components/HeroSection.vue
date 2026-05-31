<template>
  <section id="inicio">
    <div class="hero-bg"></div>
    <div class="hero-grid">
      <div class="hero fade-up">
        <span class="hero-tag">Dark Kitchen · Arequipa, Perú</span>
        <h1>Come bien.<br>Vive <em>mejor.</em></h1>
        <p>Planes de comida saludable, deliciosa y personalizada. Delivery directo a tu puerta, sin excusas para comer mal.</p>
        <div class="hero-btns">
          <a href="#planes" class="btn-primary">Ver planes</a>
          <a :href="waLink" target="_blank" rel="noopener" class="btn-outline">Pedir por WhatsApp</a>
        </div>
      </div>
      <div class="hero-visual fade-up">
        <div class="hero-plate">
          <img src="@/assets/logo.png" alt="MACELI logo" class="plate-img" />
        </div>
        <div class="hero-badge">
          <strong>100%</strong>
          <span>Natural & fresco</span>
        </div>
      </div>
    </div>
    <div class="scroll-line">Scroll</div>
  </section>
</template>

<script setup>
import { whatsappLink } from '@/config/app'

const waLink = whatsappLink('Hola MACELI, quiero información sobre sus planes')
</script>

<style scoped>
#inicio {
  min-height: 100vh;
  display: grid; place-items: center;
  position: relative; overflow: hidden;
  padding: 8rem 5% 5rem;
}
.plate-img {
  width: 65%;
  height: 65%;
  object-fit: contain;
  border-radius: 50%;
}
.hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(217,165,165,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 50% 80% at 20% 80%, rgba(217,165,165,0.04) 0%, transparent 60%);
}
.hero-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  position: relative; max-width: 1200px; width: 100%;
}
.hero-tag {
  display: inline-block;
  font-size: .76rem; letter-spacing: .22em; text-transform: uppercase;
  color: var(--accent); border: 1px solid rgba(217,165,165,0.35);
  padding: .35rem 1rem; border-radius: 2px; margin-bottom: 1.6rem;
}
.hero h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 600; line-height: 1.05;
  color: var(--light); margin-bottom: 1.4rem;
}
.hero h1 em { color: var(--accent); font-style: normal; }
.hero p {
  font-size: 1.08rem; line-height: 1.78; color: var(--mid);
  max-width: 480px; margin-bottom: 2.4rem;
}
.hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-visual {
  position: relative; display: flex; align-items: center; justify-content: center;
}
.hero-plate {
  width: clamp(260px, 38vw, 440px); aspect-ratio: 1;
  border-radius: 50%; background: var(--dark);
  display: flex; align-items: center; justify-content: center;
  font-size: 8rem; position: relative;
  box-shadow: 0 0 80px rgba(217,165,165,0.12), inset 0 0 40px rgba(0,0,0,.4);
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
.hero-badge {
  position: absolute; bottom: 8%; right: -6%;
  background: var(--black); border: 1px solid rgba(217,165,165,.3);
  padding: .9rem 1.3rem; border-radius: 4px; text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,.5);
}
.hero-badge strong {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem; color: var(--accent); display: block;
}
.hero-badge span { font-size: .76rem; letter-spacing: .08em; color: var(--mid); text-transform: uppercase; }
.scroll-line {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: .5rem;
  font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--mid);
}
.scroll-line::after {
  content: ''; width: 1px; height: 50px; background: linear-gradient(var(--accent), transparent);
  animation: scrollpulse 2s ease-in-out infinite;
}
@keyframes scrollpulse { 0%,100%{opacity:.3} 50%{opacity:1} }
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; gap: 3rem; }
  .hero-visual { order: -1; }
  .hero-plate { width: min(300px, 70vw); font-size: 5rem; }
}
@media (max-width: 560px) {
  .hero-btns { flex-direction: column; }
}
</style>
