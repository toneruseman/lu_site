/* lu_site — interactions */
(() => {
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ============ DATA ============ */
  const SERVICES = [
    // ── Лид-магнит ────────────────────────────────────────────
    { cat: 'free', stage: 'Лид-магнит', num: '01',
      title: 'Диагностика бизнеса',
      duration: '30 минут · Zoom / Телемост',
      price: 'бесплатно',
      who: 'Хочешь посмотреть на свой бизнес чужими глазами и понять, что тормозит рост.',
      what: 'Задаю неудобные вопросы про финансы, продажи, команду и твою роль. Смотрю на бизнес со стороны — так, как ты не можешь изнутри.',
      res: 'Честная картина: где теряешь деньги, время и управляемость. План первых шагов — что сделать самому, где нужна помощь.' },

    { cat: 'free', stage: 'Лид-магнит', num: '02',
      title: 'Тайный покупатель · диагностика менеджера',
      duration: '1 мой звонок в твой отдел продаж',
      price: 'бесплатно',
      who: 'Продажи не закрываются. Менеджеры «сливают» клиентов. Хочешь понять, где конкретно.',
      what: 'Звоню в твой отдел продаж как обычный клиент. Прохожу путь от «здравствуйте» до «я подумаю». Слушаю, как говорят, что отвечают, куда ведут.',
      res: 'Подробный разбор звонка: что прозвучало плохо, что — хорошо, где именно уходит клиент. Конкретные шаги, что править в скрипте и поведении.' },

    // ── Трипваер ───────────────────────────────────────────────
    { cat: 'tripwire', stage: 'Быстрый разбор', num: '03',
      title: 'Аудит системы мотивации менеджеров',
      duration: '45 минут · Телемост',
      price: '2 900 ₽',
      who: 'Менеджеры «сидят на окладе», план не выполняется, сильные уходят к конкурентам.',
      what: 'Разбираем твою действующую схему: оклад, KPI, процент, бонусы, штрафы. Смотрю, что стимулирует правильное поведение, а что — наоборот. Сравниваем с рыночной практикой в нише.',
      res: 'Конкретные правки в формуле мотивации: что оставить, что убрать, что добавить. Прогноз, как это повлияет на выручку.' },

    { cat: 'tripwire', stage: 'Быстрый разбор', num: '04',
      title: 'Разбор воронки продаж',
      duration: '45 минут · Телемост',
      price: '2 900 ₽',
      who: 'Лиды есть, продаж мало. Не понимаешь, где отваливаются клиенты.',
      what: 'Берём твою воронку по шагам: первый контакт, квалификация, презентация, возражения, сделка. Считаем конверсии между этапами. Ищем узкое место.',
      res: 'Видишь, на каком шаге теряешь большинство клиентов. Понимаешь, что именно менять — скрипт, процесс или сам этап.' },

    // ── Вход ──────────────────────────────────────────────────
    { cat: 'entry', stage: 'Вход', num: '05',
      title: 'Экспресс-стратегия',
      duration: '2 × 45 минут · Телемост или живая встреча',
      price: '5 900 ₽',
      who: 'Бизнес развивается стихийно. Нужно решить, куда расти в ближайшие 6–12 месяцев.',
      what: 'Первая встреча — фиксируем «где я сейчас»: цифры, ресурсы, ключевые задачи. Между встречами — домашка. Вторая — формулируем 2–3 приоритета и план на 90 дней.',
      res: 'Чёткий план: что делаем, в каком порядке, с какими ресурсами. Без размытых «увеличим продажи» — конкретные шаги.' },

    { cat: 'entry', stage: 'Вход', num: '06',
      title: 'Выход из кассового разрыва',
      duration: '2 × 45 минут · Телемост или живая встреча',
      price: '5 900 ₽',
      who: '«Деньги есть — и вдруг их нет». Платить нечем, а на бумаге прибыль. Кредиты на текущие расходы.',
      what: 'Первая встреча — разбираем, откуда приходят и уходят деньги по неделям. Находим утечки и точки задержки. Вторая — собираем план: ДДС на 8–12 недель, подушка, график платежей.',
      res: 'Видишь свой денежный поток на 2 месяца вперёд. Знаешь, когда и откуда будут деньги — и где их не хватит.' },

    // ── Основной ──────────────────────────────────────────────
    { cat: 'main', stage: 'Основной', num: '07',
      title: '«Операционка без тебя»',
      duration: '3 месяца · индивидуально',
      price: 'от 80 000 ₽',
      who: 'Ты — «затычка на все дыры». Сотрудники звонят по любому вопросу. Отпуск невозможен.',
      what: 'Полная сборка системы: продажи, команда, мотивация, процессы. Раз в неделю — встреча с разбором. Между встречами — внедрение. Сопровождаю с первой постановки задач до первой «недели без тебя».',
      res: 'Работаешь над бизнесом, а не в нём. 2–4 часа в неделю вместо 24/7. Команда принимает решения сама.' },

    { cat: 'main', stage: 'Основной', num: '08',
      title: 'Сопровождение отдела продаж',
      duration: 'ежемесячно',
      price: 'от 30 000 ₽ / мес',
      who: 'Отдел продаж уже есть, но результат нестабильный. Нужна системная оптимизация, а не разовый аудит.',
      what: 'Ежемесячно: разборы звонков менеджеров, корректировка скриптов, работа с воронкой, настройка мотивации, планёрки с РОПом. Выступаю внешним трекером для твоего отдела.',
      res: 'Предсказуемый план продаж. Менеджеры растут. РОП получает обратную связь не только от тебя.' },

    // ── Флагман ───────────────────────────────────────────────
    { cat: 'flagship', stage: 'Флагман', num: '09',
      title: '«Бизнес без хаоса»',
      duration: '6 месяцев · индивидуально',
      price: 'от 200 000 ₽',
      who: 'Серьёзно хочешь перестроить бизнес целиком. Готов к 6 месяцам работы и реальным изменениям.',
      what: 'Индивидуальная программа + мои инструменты: продажи, команда, финансы, выход собственника из операционки. Еженедельные встречи, доступ на связи между ними, разбор кадровых и партнёрских решений.',
      res: 'Через 6 месяцев — собственник управляет стратегией, а не тушит пожары. Бизнес устойчив без ежедневного участия.' },
  ];

  const CASES = [
    {
      tag: 'Личный опыт · генеральный директор',
      title: 'Из долга 14 млн ₽ — в прибыль за год. Без бюджета, только через систему',
      before: ['Долг компании 14 млн ₽', 'Кассовые разрывы каждый месяц', 'Паника в команде, хаос в процессах', 'Собственники на грани закрытия'],
      after:  ['Долги закрыты за 12 месяцев', 'Выход в операционную прибыль', 'Налаженные регламенты и процессы', 'Удержаны и развиты рабочие места'],
      quote:  'Не было ни волшебства, ни внешних денег. Была честная диагностика, план и системные решения — неделя за неделей.',
      who:    'Луиза Зайнуллина'
    },
    {
      tag: 'NDA · производство мебели',
      title: 'Собственник перестал быть «главным менеджером по продажам»',
      before: ['Заявки только через личные контакты владельца', 'Нет регламентов и CRM', 'Текучка продавцов, каждого учили с нуля', 'Выручка зависит от настроения собственника'],
      after:  ['Воронка, скрипты, CRM, система мотивации', 'Прогнозируемый план продаж на месяц', 'Команда закрывает сделки без собственника', 'Рост выручки × 2 за 6 месяцев'],
      quote:  'Впервые за много лет я знаю, сколько мы заработаем в следующем месяце — и не дёргаю менеджеров каждый час.',
      who:    'Собственник, NDA'
    },
    {
      tag: 'NDA · онлайн-услуги',
      title: 'Кассовый разрыв закрыт, учёт прозрачен, прибыль нашлась',
      before: ['«Деньги есть — и вдруг их нет»', 'ОПиУ и ДДС не велись', 'Прибыль на бумаге / денег на счёте нет', 'Кредиты на текущие расходы'],
      after:  ['ДДС по неделям на 12 недель вперёд', 'Юнит-экономика каждого продукта', 'Финансовая подушка 2 месяца', 'Два убыточных направления закрыты'],
      quote:  'Оказалось, что у меня нет проблем с продажами. У меня были проблемы с тем, что я не видела своих денег.',
      who:    'Собственник, NDA'
    },
    {
      tag: 'NDA · опт + маркетплейсы',
      title: 'Отпуск без тревоги впервые за 7 лет',
      before: ['Собственники 24/7 в операционке', 'Сотрудники звонят по любому вопросу', 'Отпуск = проверка почты каждый час', 'Рост упёрся в потолок личного ресурса'],
      after:  ['Зоны ответственности закреплены', 'Регламенты и точки контроля', 'Команда решает 90% вопросов сама', 'Собственники уехали на 3 недели — бизнес работал'],
      quote:  'Впервые я отдыхал, а не работал удалённо с пляжа. Бизнес без меня не развалился.',
      who:    'Собственник, NDA'
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
      <article class="service service--${s.cat}" data-cat="${s.cat}">
        <div class="service__top">
          <span class="service__num">${s.num}</span>
          <span class="service__stage">${s.stage}</span>
          <span class="service__price">${s.price}</span>
        </div>
        <h3>${s.title}</h3>
        <p class="service__duration">${s.duration}</p>
        <div class="service__meta">
          <p><b>Для кого</b><br>${s.who}</p>
          <p><b>Что делаем</b><br>${s.what}</p>
          <p><b>Результат</b><br>${s.res}</p>
        </div>
        <div class="service__toggle"><span>Подробнее</span><i aria-hidden="true"></i></div>
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

  /* ============ FORMS ============ */
  const formatPhone = el => el.addEventListener('input', e => {
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

  // TODO: заменить на реальный эндпоинт (Cloudflare Worker / Vercel function),
  // который перекладывает payload в Telegram через Bot API
  const LEAD_ENDPOINT = '';

  document.querySelectorAll('form[data-form]').forEach(form => {
    const status = form.querySelector('.form-status');
    form.querySelectorAll('input[type="tel"]').forEach(formatPhone);

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);

      const required = [...form.querySelectorAll('[required]')];
      const missing = required.some(el => el.type === 'checkbox' ? !el.checked : !el.value.trim());
      if (missing) {
        status.textContent = 'Заполните обязательные поля и подтвердите согласие.';
        status.classList.add('error');
        return;
      }

      status.classList.remove('error');
      status.textContent = 'Отправляем…';
      const payload = Object.fromEntries(fd.entries());
      payload._form = form.dataset.form;
      payload._page = location.href;

      try {
        if (LEAD_ENDPOINT) {
          const r = await fetch(LEAD_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!r.ok) throw new Error('http ' + r.status);
        } else {
          await new Promise(res => setTimeout(res, 700));
        }
        status.textContent = form.dataset.form === 'mystery'
          ? 'Спасибо! Луиза прочитает заявку и перезвонит в ближайшее рабочее время.'
          : 'Спасибо! Перезвоню в ближайшее рабочее время.';
        form.reset();
      } catch (err) {
        status.textContent = 'Не удалось отправить. Напишите в Telegram @lulumax.';
        status.classList.add('error');
      }
    });
  });

  /* ============ COOKIE ============ */
  const cookie = $('#cookie');
  if (cookie) {
    if (localStorage.getItem('lu_cookie_ok')) {
      cookie.remove();
    } else {
      cookie.hidden = false;
      cookie.classList.remove('is-hidden');
      $('#cookie-ok')?.addEventListener('click', () => {
        cookie.classList.add('is-hidden');
        localStorage.setItem('lu_cookie_ok', '1');
        setTimeout(() => cookie.remove(), 300);
      });
    }
  }
})();
