/* lu_site — interactions */
(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ============ DATA ============ */
  const SERVICES = [
    { cat: 'owner', num: '01', price: 'от 99 000 ₽',  title: 'Вывод собственника из операционки',
      who: 'Собственники, перегруженные операционкой и не успевающие заниматься развитием.',
      what: 'Анализируем нагрузку и зависимость бизнеса от собственника. Выстраиваем делегирование, зоны ответственности, управленческие процессы.',
      res: 'Собственник высвобождает время и управляет на уровне стратегии.' },
    { cat: 'team', num: '02', price: 'от 49 000 ₽',  title: 'Кадровая стратегия и формирование команды',
      who: 'Проблемы найма, текучки или качества сотрудников.',
      what: 'Определяем роли, профиль сотрудников, систему найма, адаптации, удержания и развития.',
      res: 'Сильная команда без постоянной замены сотрудников.' },
    { cat: 'team', num: '03', price: 'от 29 000 ₽',  title: 'Обучение управленческой команды',
      who: 'Руководители не справляются или растут быстрее компетенций.',
      what: 'Планирование, постановка задач, делегирование, контроль, мотивация, развитие. Кейсы, инструменты, единый подход.',
      res: 'Управленческая команда, способная достигать результатов самостоятельно.' },
    { cat: 'sales', num: '04', price: 'от 99 000 ₽', title: 'Построение и оптимизация отдела продаж',
      who: 'Нестабильные продажи или неуправляемый отдел.',
      what: 'Воронка, структура, регламенты, скрипты, система контроля, метрики.',
      res: 'Прогнозируемый рост продаж и управляемый отдел со стабильным результатом.' },
    { cat: 'owner', num: '05', price: 'от 149 000 ₽', title: 'Стратегическая сессия',
      who: 'Собственники и команды в поиске направления развития.',
      what: 'Формулируем цели, приоритеты, направления роста. Варианты развития и план действий.',
      res: 'Чёткое понимание направления и конкретный план.' },
    { cat: 'ops', num: '06', price: 'от 49 000 ₽',  title: 'Финансовый консалтинг',
      who: 'Собственники, не понимающие финансовую картину бизнеса.',
      what: 'Учёт доходов/расходов, ДДС, прибыль, показатели, выявление потерь, финмодель.',
      res: 'Прозрачные финансы и понимание доходности.' },
    { cat: 'sales', num: '07', price: 'от 99 000 ₽', title: 'Отдел маркетинга и маркетинговая стратегия',
      who: 'Маркетинг не даёт достаточного потока клиентов.',
      what: 'Анализ каналов и эффективности. Стратегия привлечения. Процессы и метрики.',
      res: 'Поток целевых клиентов по оптимальной стоимости.' },
    { cat: 'ops', num: '08', price: 'от 49 000 ₽',  title: 'Определение метрик эффективности',
      who: 'Нет прозрачности результатов и понимания влияния на прибыль.',
      what: 'КПЭ для бизнеса, отделов, сотрудников. Учёт и контроль. Связь с целями.',
      res: 'Понятная система показателей для управления результатом.' },
    { cat: 'sales', num: '09', price: 'от 49 000 ₽', title: 'Маркетолог в аренду',
      who: 'Нужен маркетолог, создающий результат.',
      what: 'Планирование, запуск, контроль рекламы. Аналитика, корректировки. Внешний отдел.',
      res: 'Работающий маркетинг без штатного специалиста.' },
    { cat: 'ops', num: '10', price: 'от 49 000 ₽',  title: 'Аудит бизнес-процессов и показателей',
      who: 'Чувствуете неэффективность, но не видите проблему.',
      what: 'Анализ процессов, структуры, показателей. Узкие места, потери, точки роста. Рекомендации.',
      res: 'Понимание потерь эффективности и необходимых изменений.' },
    { cat: 'sales', num: '11', price: 'от 49 000 ₽', title: 'Анализ конкурентов',
      who: 'Хотите усилить позиции на рынке.',
      what: 'Продукты, цены, позиционирование, каналы. Сильные/слабые стороны. Рекомендации.',
      res: 'Понимание рынка и преимуществ для роста.' },
    { cat: 'team', num: '12', price: 'от 49 000 ₽',  title: 'Медиация',
      who: 'Конфликты или сложная коммуникация между собственниками, партнёрами, командами.',
      what: 'Структурированный диалог с нейтральной позиции. Прояснение интересов. Договорённости.',
      res: 'Снижено напряжение, восстановлена коммуникация.' },
  ];

  const CASES = [
    {
      tag: 'Благотворительный фонд «Все все вместе»',
      title: '+200 % к обороту и 28 часов свободы в неделю для основателя фонда',
      before: ['30 ч/нед личного времени', '1 млн ₽/мес оборот', 'Большое количество операционных задач'],
      after:  ['2 ч/нед личной занятости', '3 млн ₽/мес оборот', 'Полная система управления без участия основателя', 'Без расширения штата'],
      quote:  'Наконец-то я могу уделить внимание и другим проектам.',
      who:    'Ольга Ващенкова, основатель'
    },
    {
      tag: 'NDA-проект',
      title: 'От 200 тыс. к 3,7 млн: как собственник перестал быть главным менеджером по продажам',
      before: ['Единичные заявки на основе личного бренда', '< 200 тыс ₽/мес', 'Зависимость от участия собственника'],
      after:  ['3,7 млн ₽/мес стабильной выручки', 'Работающие автоворонки', 'Прогнозируемый поток клиентов', 'Самоуправляемая команда', 'Каскадные отделы продаж'],
      quote:  'Теперь я знаю, сколько клиентов придёт завтра и сколько мы заработаем в следующем месяце.',
      who:    'Собственник, NDA'
    },
    {
      tag: 'Онлайн-школа «Бизнес-Гаечка»',
      title: 'Средний чек ×1,8 и в 6 раз больше одновременных запусков',
      before: ['700 тыс ₽/мес', 'LTV 7 111 ₽', 'Зависимость от участия собственника'],
      after:  ['1,5 млн ₽/мес через 2 месяца', 'LTV 13 200 ₽', 'Среднегодовой оборот ×2', 'Маркетинговая продуктовая линейка'],
      quote:  'Рост выручки ×2. Благодарю за надёжное партнёрство.',
      who:    'Наталья Сидорова, основатель'
    },
    {
      tag: 'Производственная компания «7 путей»',
      title: 'Производительность и выручка выросли в 2 раза',
      before: ['Страх нанимать из-за сезонности', 'Вся операционка на собственниках', 'Ограниченный рост и привязанность к бизнесу'],
      after:  ['Созданы отделы: маркетинг, продажи, исполнение', 'Профессиональная команда', 'Круглогодичный ФОТ окупается', 'Устойчивый и предсказуемый бизнес'],
      quote:  'Впервые за 8 лет мы смогли спокойно уехать в отпуск без вреда для бизнеса.',
      who:    'Собственники, «7 путей»'
    }
  ];

  const QUIZ = [
    'Погрязли в рутине и решаете операционные задачи вместо стратегии?',
    'Нет времени на личную жизнь, хобби и отдых — бизнес поглотил вас целиком?',
    'Чувствуете, что компания топчется на месте и не может расти?',
    'Сотрудники дёргают вас по мелочам и не хотят принимать решения самостоятельно?',
    'Боитесь, что если уйдёте в отпуск — всё посыпется?',
    'Испытываете сложности с прогнозированием доходов и расходов?',
    'Постоянное ощущение, что никто не сделает работу так хорошо, как вы сами?',
    'Дефицит сильных людей в команде, на которых можно положиться?',
    'Бизнес развивается стихийно, нет долгосрочного плана?',
    'Не понимаете, по каким показателям оценивать эффективность сотрудников и процессов?'
  ];

  /* ============ NAV: hide on scroll down ============ */
  const nav = $('#nav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80 && y > lastY) nav.classList.add('is-hidden');
    else                      nav.classList.remove('is-hidden');
    lastY = y;
  }, { passive: true });

  // mobile menu
  $('.nav__toggle')?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    $('.nav__toggle').setAttribute('aria-expanded', open);
  });
  $$('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* ============ CUSTOM CURSOR ============ */
  const cursor = $('.cursor');
  if (cursor && matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
      if (!cursor.style.transform.includes('scale')) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    });
    document.addEventListener('pointerover', e => {
      if (e.target.closest('[data-cursor], a, button, label')) cursor.classList.add('active');
      else cursor.classList.remove('active');
    });
  }

  /* ============ REVEAL ON SCROLL ============ */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

  const revealTargets = [
    '.section-head', '.hero__grid', '.hero__cta',
    '.about__body > *', '.principles__list li',
    '.service', '.case', '.results__list li',
    '.cta__text', '.cta__form', '.stat'
  ];
  requestAnimationFrame(() => {
    revealTargets.forEach(sel => $$(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i * 40, 400) + 'ms';
      io.observe(el);
    }));
  });

  /* ============ ANIMATED COUNTERS ============ */
  function animateCount(el) {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const countIo = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { animateCount(en.target); countIo.unobserve(en.target); }
    });
  }, { threshold: .4 });
  $$('[data-count]').forEach(el => countIo.observe(el));

  /* ============ SERVICES GRID ============ */
  const grid = $('#services-grid');
  if (grid) {
    grid.innerHTML = SERVICES.map(s => `
      <article class="service" data-cat="${s.cat}">
        <div class="service__top">
          <span class="service__num">${s.num}</span>
          <span class="service__price">${s.price}</span>
        </div>
        <h3>${s.title}</h3>
        <div class="service__meta">
          <p><b>Для кого</b><br>${s.who}</p>
          <p><b>Что делаем</b><br>${s.what}</p>
          <p><b>Результат</b><br>${s.res}</p>
        </div>
        <div class="service__toggle"><span>Подробнее</span><i>+</i></div>
      </article>
    `).join('');

    $$('.service', grid).forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('is-open'));
    });

    $$('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        $$('.chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const filter = chip.dataset.filter;
        $$('.service', grid).forEach(card => {
          const match = filter === 'all' || card.dataset.cat === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ============ CASES CAROUSEL ============ */
  const track = $('#cases-track');
  const dots  = $('#cases-dots');
  if (track) {
    track.innerHTML = CASES.map(c => `
      <article class="case">
        <span class="case__tag">${c.tag}</span>
        <h3>${c.title}</h3>
        <div class="case__compare">
          <div class="col--before">
            <h4>Было</h4>
            <ul>${c.before.map(x => `<li>${x}</li>`).join('')}</ul>
          </div>
          <div class="col--after">
            <h4>Стало</h4>
            <ul>${c.after.map(x => `<li>${x}</li>`).join('')}</ul>
          </div>
        </div>
        <blockquote class="case__quote">
          «${c.quote}»
          <cite>${c.who}</cite>
        </blockquote>
      </article>
    `).join('');

    dots.innerHTML = CASES.map((_, i) => `<span class="dot${i===0?' is-active':''}" data-i="${i}"></span>`).join('');

    const cards  = $$('.case', track);
    const dotEls = $$('.dot', dots);
    let idx = 0;

    const scrollTo = (i) => {
      idx = (i + cards.length) % cards.length;
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      dotEls.forEach((d, j) => d.classList.toggle('is-active', j === idx));
    };

    $$('.arrow').forEach(btn => btn.addEventListener('click', () => scrollTo(idx + +btn.dataset.dir)));
    dotEls.forEach(d => d.addEventListener('click', () => scrollTo(+d.dataset.i)));

    // sync dots when user scrolls manually
    let raf;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0, bestD = Infinity;
        cards.forEach((c, i) => {
          const cx = c.offsetLeft + c.clientWidth / 2;
          const d = Math.abs(cx - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        idx = best;
        dotEls.forEach((d, j) => d.classList.toggle('is-active', j === idx));
      });
    });
  }

  /* ============ QUIZ ============ */
  const stage    = $('#quiz-stage');
  const barFill  = $('#quiz-bar');
  const counter  = $('#quiz-count');
  const prevBtn  = $('#quiz-prev');
  const nextBtn  = $('#quiz-next');
  const answers  = new Array(QUIZ.length).fill(null);
  let qi = 0;

  function renderQ() {
    const q = QUIZ[qi];
    const a = answers[qi];
    stage.innerHTML = `
      <p class="kicker">Вопрос ${qi+1} из ${QUIZ.length}</p>
      <h3 class="quiz__question">${q}</h3>
      <div class="quiz__options" role="radiogroup">
        <label class="${a === 'yes' ? 'is-selected' : ''}" data-v="yes">Да</label>
        <label class="${a === 'rarely' ? 'is-selected' : ''}" data-v="rarely">Скорее да</label>
        <label class="${a === 'sometimes' ? 'is-selected' : ''}" data-v="sometimes">Иногда</label>
        <label class="${a === 'no' ? 'is-selected' : ''}" data-v="no">Нет</label>
      </div>
    `;
    $$('.quiz__options label').forEach(l => l.addEventListener('click', () => {
      answers[qi] = l.dataset.v;
      $$('.quiz__options label').forEach(x => x.classList.remove('is-selected'));
      l.classList.add('is-selected');
    }));

    barFill.style.width = ((qi+1) / QUIZ.length * 100) + '%';
    counter.textContent = `${qi+1} / ${QUIZ.length}`;
    prevBtn.disabled = qi === 0;
    nextBtn.textContent = qi === QUIZ.length - 1 ? 'Показать результат' : 'Далее';
  }

  function renderResult() {
    const yesCount = answers.filter(a => a === 'yes' || a === 'rarely').length;
    let title, text, tone;
    if (yesCount <= 3) {
      title = 'Бизнес достаточно стабилен — но есть резерв';
      text  = 'Ваш бизнес работает достаточно стабильно. Свежий взгляд на систематизацию может открыть новые возможности роста и сократить ваши трудозатраты.';
      tone  = 'Зелёная зона';
    } else if (yesCount <= 6) {
      title = 'Хаос ещё не захватил — самое время навести порядок';
      text  = 'У вас уже есть понимание, что не всё работает гладко. Внимание к порядку в бизнесе сейчас окажет значительное влияние на его стабильность и рост.';
      tone  = 'Жёлтая зона';
    } else {
      title = 'Тревожно. Риски для устойчивости и прибыли высоки';
      text  = 'Слишком много неуправляемых и неподконтрольных вам процессов. Бизнес работает вопреки, а не благодаря. Рекомендую срочный разбор.';
      tone  = 'Красная зона';
    }

    stage.innerHTML = `
      <div class="quiz__result">
        <p class="kicker">${tone}</p>
        <div class="score">${yesCount}<span style="color:var(--ink-dim);font-size:.5em">/${QUIZ.length}</span></div>
        <h3>${title}</h3>
        <p>${text}</p>
        <a href="#contact" class="btn btn--gold" style="justify-self:start;margin-top:12px" data-cursor>Записаться на разбор</a>
      </div>
    `;
    barFill.style.width = '100%';
    counter.textContent = 'готово';
    prevBtn.disabled = false;
    nextBtn.disabled = true;
    nextBtn.style.opacity = .3;
  }

  nextBtn?.addEventListener('click', () => {
    if (!answers[qi]) { nextBtn.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 300 }); return; }
    if (qi < QUIZ.length - 1) { qi++; renderQ(); }
    else renderResult();
  });
  prevBtn?.addEventListener('click', () => {
    if (nextBtn.disabled) { nextBtn.disabled = false; nextBtn.style.opacity = 1; }
    if (qi > 0) { qi--; renderQ(); }
  });
  if (stage) renderQ();

  /* ============ FORM ============ */
  const form = $('#lead-form');
  const status = $('#form-status');
  const phoneInput = form?.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', e => {
      let d = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (d.startsWith('8')) d = '7' + d.slice(1);
      if (!d.startsWith('7') && d.length > 0) d = '7' + d;
      let out = '+7';
      if (d.length > 1) out += ' (' + d.slice(1, 4);
      if (d.length >= 4) out += ') ' + d.slice(4, 7);
      if (d.length >= 7) out += '-' + d.slice(7, 9);
      if (d.length >= 9) out += '-' + d.slice(9, 11);
      e.target.value = out;
    });
  }
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    if (!fd.get('name') || !fd.get('phone') || !fd.get('tg') || !fd.get('consent')) {
      status.textContent = 'Заполните все поля и подтвердите согласие.';
      status.classList.add('error');
      return;
    }
    status.classList.remove('error');
    status.textContent = 'Отправляем…';
    setTimeout(() => {
      status.textContent = 'Благодарю за обращение — свяжусь с вами в ближайшее рабочее время!';
      form.reset();
    }, 800);
  });

  /* ============ COOKIE ============ */
  const cookie = $('#cookie');
  if (cookie && !localStorage.getItem('lu_cookie_ok')) {
    cookie.hidden = false;
    $('#cookie-ok')?.addEventListener('click', () => {
      cookie.hidden = true;
      localStorage.setItem('lu_cookie_ok', '1');
    });
  }
})();
