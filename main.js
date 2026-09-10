/**
 * ====================================================================
 * U.AI — JAVASCRIPT DE INTERATIVIDADE & EFEITOS (MAIN.JS)
 * ====================================================================
 * Animações de Scroll, Efeito Karaoke, Filtro de Cases, Acordeão FAQ
 * e Calculadora Dinâmica de Economia Operacional.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Reveal on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));


  // 2. Efeito Karaoke no Manifesto (Iluminação progressiva de palavras)
  const manifestoSection = document.getElementById('manifesto');
  const karaokeWords = document.querySelectorAll('.karaoke-word');

  if (manifestoSection && karaokeWords.length > 0) {
    window.addEventListener('scroll', () => {
      const rect = manifestoSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Se a seção está visível na tela
      if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
        const totalHeight = rect.height;
        const currentScroll = (windowHeight * 0.75) - rect.top;
        const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
        const activeCount = Math.floor(progress * karaokeWords.length);

        karaokeWords.forEach((word, index) => {
          if (index <= activeCount) {
            word.classList.add('active');
          } else {
            word.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }


  // 3. Filtro Dinâmico de Cases / Portfólio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      caseCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  // 4. FAQ Accordion (Acordeão de Dúvidas)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos os outros itens
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('open');
      });

      // Alterna o atual
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });


  // 5. Calculadora de Economia Operacional & Leads
  const teamSizeSelect = document.getElementById('calcTeamSize');
  const bottleneckSelect = document.getElementById('calcBottleneck');
  const resultDisplay = document.getElementById('calcResultVal');
  const calcForm = document.getElementById('leadCalcForm');

  function calculateSavings() {
    if (!teamSizeSelect || !resultDisplay) return;

    const teamMultiplier = parseFloat(teamSizeSelect.value) || 1;
    const bottleneckMultiplier = parseFloat(bottleneckSelect ? bottleneckSelect.value : 1) || 1;

    // Base de economia estimada em R$ por ano
    const baseSavings = 84000; // Economia base equivalente a tarefas manuais
    const estimatedAnnualSavings = Math.round(baseSavings * teamMultiplier * bottleneckMultiplier);

    resultDisplay.textContent = `R$ ${estimatedAnnualSavings.toLocaleString('pt-BR')}/ano`;
  }

  if (teamSizeSelect) {
    teamSizeSelect.addEventListener('change', calculateSavings);
  }
  if (bottleneckSelect) {
    bottleneckSelect.addEventListener('change', calculateSavings);
  }

  // Executa o cálculo inicial
  calculateSavings();

  // Envio do Formulário de Diagnóstico
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('calcName')?.value || 'Lead';
      const company = document.getElementById('calcCompany')?.value || 'Empresa';
      const phone = document.getElementById('calcPhone')?.value || '';

      const submitBtn = calcForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Enviando Diagnóstico...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = '✓ Diagnóstico Solicitado com Sucesso!';
        submitBtn.style.background = 'var(--emerald)';

        // Cria mensagem direta para o WhatsApp com os dados
        const msg = encodeURIComponent(`Olá, sou ${name} da empresa ${company}. Acabei de simular o potencial de economia na U.AI e gostaria de agendar nosso diagnóstico gratuito de agentes de IA.`);
        const waUrl = `https://wa.me/5531999999999?text=${msg}`;

        setTimeout(() => {
          window.open(waUrl, '_blank');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = 'var(--cyan)';
        }, 1500);
      }, 1000);
    });
  }

});
