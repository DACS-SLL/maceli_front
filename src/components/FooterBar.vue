<template>
  <footer>
    <div class="footer-logo">MACELI <span>·</span> Eat Fit</div>
    <p class="footer-copy">© 2026 MACELI - Eat Fit · Arequipa, Perú</p>
    <div class="footer-links">
      <a href="#inicio">Inicio</a>
      <a href="#sobre">Sobre nosotros</a>
      <a href="#planes">Planes</a>
      <a href="#faq">FAQ</a>
      <a href="#contacto">Contacto</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--black); border-top: 1px solid rgba(191,191,191,0.1);
  padding: 3rem 5%; display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;
}
.footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 700; color: var(--light); }
.footer-logo span { color: var(--accent); }
.footer-copy { font-size: .84rem; color: var(--mid); }
.footer-links { display: flex; gap: 1.6rem; flex-wrap: wrap; }
.footer-links a { font-size: .84rem; color: var(--mid); text-decoration: none; transition: color .25s; }
.footer-links a:hover { color: var(--accent); }
@media (max-width: 900px) {
  footer { flex-direction: column; text-align: center; }
  .footer-links { justify-content: center; }
}
</style>
