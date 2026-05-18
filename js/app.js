(function () {
  "use strict";

  const QUIZ_TOTAL = 20;
  const QUIZ_MS = 40 * 60 * 1000;
  const PASS_PERCENT = 50;
  const POINTS_PER_QUESTION = 100 / QUIZ_TOTAL;
  const WARN_MS = 5 * 60 * 1000;
  const LANG_KEY = "quiz_lang";

  const GROUPS = [
    { value: "IT-201", kz: "IT-201", ru: "IT-201" },
    { value: "IT-202", kz: "IT-202", ru: "IT-202" },
    { value: "CS-101", kz: "CS-101", ru: "CS-101" },
    { value: "CS-102", kz: "CS-102", ru: "CS-102" },
    { value: "SE-301", kz: "SE-301", ru: "SE-301" },
  ];

  const SPECIALTIES = [
    {
      value: "cs",
      kz: "Есептеу техникасы және БҚ",
      ru: "Вычислительная техника и ПО",
    },
    {
      value: "se",
      kz: "Бағдарламалық инженерия",
      ru: "Программная инженерия",
    },
    {
      value: "is",
      kz: "Ақпараттық жүйелер",
      ru: "Информационные системы",
    },
    {
      value: "cyber",
      kz: "Киберқауіпсіздік",
      ru: "Кибербезопасность",
    },
  ];

  const i18n = {
    kz: {
      welcomeTitle: "Информатикадан тест",
      welcomeSub:
        "Өз біліміңізді тексеріңіз. Бастау үшін төмендегі мәліметтеріңізді енгізіп, жүйеге кіріңіз.",
      labelName: "Толық аты-жөні",
      labelGroup: "Топ",
      labelSpec: "Мамандық",
      phName: "Аты-жөніңізді енгізіңіз...",
      phGroup: "Топты таңдаңыз",
      phSpec: "Мамандықты таңдаңыз",
      btnStart: "Тестті бастау",
      questionWord: "Сұрақ",
      btnBack: "← Артқа",
      btnNext: "Келесі →",
      btnFinish: "Аяқтау",
      resultTitle: "Тест аяқталды",
      resultSub: "Сіздің жалпы нәтижеңіз:",
      statCorrect: "Дұрыс жауаптар",
      statPercent: "Көрсеткіш",
      bannerPass: "Құттықтаймыз, сіз тесттен сәтті өттіңіз!",
      bannerFail: "Тестті қайта тапсыруға болады. Қайта көріңіз.",
      btnRestart: "Қайта бастау",
      btnExit: "Шығу",
      errName: "Аты-жөніңізді енгізіңіз.",
      errGroup: "Топты таңдаңыз.",
      errSpec: "Мамандықты таңдаңыз.",
      errNoBank: "Сұрақтар жүктелмеді. js/questions.js тексеріңіз.",
      errFewQuestions: "Сұрақтар саны жеткіліксіз.",
    },
    ru: {
      welcomeTitle: "Тест по информатике",
      welcomeSub:
        "Проверьте свои знания. Чтобы начать, введите данные ниже и войдите в систему.",
      labelName: "ФИО",
      labelGroup: "Группа",
      labelSpec: "Специальность",
      phName: "Введите ФИО...",
      phGroup: "Выберите группу",
      phSpec: "Выберите специальность",
      btnStart: "Начать тест",
      questionWord: "Вопрос",
      btnBack: "← Назад",
      btnNext: "Далее →",
      btnFinish: "Завершить",
      resultTitle: "Тест завершён",
      resultSub: "Ваш общий результат:",
      statCorrect: "Правильных ответов",
      statPercent: "Показатель",
      bannerPass: "Поздравляем, вы успешно прошли тест!",
      bannerFail: "Можно пройти тест снова. Попробуйте ещё раз.",
      btnRestart: "Начать заново",
      btnExit: "Выход",
      errName: "Введите ФИО.",
      errGroup: "Выберите группу.",
      errSpec: "Выберите специальность.",
      errNoBank: "Вопросы не загружены. Проверьте js/questions.js.",
      errFewQuestions: "Недостаточно вопросов в банке.",
    },
  };

  let lang = localStorage.getItem(LANG_KEY) === "ru" ? "ru" : "kz";

  const bank = window.QUESTIONS_BANK && Array.isArray(window.QUESTIONS_BANK.questions)
    ? window.QUESTIONS_BANK.questions
    : [];

  let student = { name: "", group: "", spec: "" };
  let sessionQuestions = [];
  let answers = [];
  let currentIndex = 0;
  let deadline = 0;
  let timerId = null;
  let sessionEnded = false;

  const el = {
    langSwitch: document.getElementById("lang-switch"),
    screenWelcome: document.getElementById("screen-welcome"),
    screenQuiz: document.getElementById("screen-quiz"),
    screenResults: document.getElementById("screen-results"),
    formStart: document.getElementById("form-start"),
    formError: document.getElementById("form-error"),
    inputName: document.getElementById("input-name"),
    selectGroup: document.getElementById("select-group"),
    selectSpec: document.getElementById("select-spec"),
    hdrName: document.getElementById("hdr-name"),
    hdrGroup: document.getElementById("hdr-group"),
    hdrSpec: document.getElementById("hdr-spec"),
    qCurrent: document.getElementById("q-current"),
    qTotal: document.getElementById("q-total"),
    progressFill: document.getElementById("progress-fill"),
    progressTrack: document.querySelector(".progress-track"),
    timerDisplay: document.getElementById("timer-display"),
    timerBadge: document.getElementById("timer-badge"),
    questionText: document.getElementById("question-text"),
    optionsRoot: document.getElementById("options-root"),
    btnBack: document.getElementById("btn-back"),
    btnNext: document.getElementById("btn-next"),
    scoreBig: document.getElementById("score-big"),
    statCorrect: document.getElementById("stat-correct"),
    statPercent: document.getElementById("stat-percent"),
    bannerPass: document.getElementById("banner-pass"),
    bannerFail: document.getElementById("banner-fail"),
    btnRestart: document.getElementById("btn-restart"),
    btnExit: document.getElementById("btn-exit"),
  };

  function t(key) {
    return (i18n[lang] && i18n[lang][key]) || key;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function applyLangToDom() {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      if (key) node.setAttribute("placeholder", t(key));
    });
    el.inputName.setAttribute("placeholder", t("phName"));
    fillSelects();
    updateLangButtons();
  }

  function updateLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function fillSelects() {
    const g = el.selectGroup;
    const s = el.selectSpec;
    const gv = g.value;
    const sv = s.value;
    g.innerHTML = `<option value="">${t("phGroup")}</option>`;
    GROUPS.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = lang === "kz" ? item.kz : item.ru;
      g.appendChild(opt);
    });
    s.innerHTML = `<option value="">${t("phSpec")}</option>`;
    SPECIALTIES.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = lang === "kz" ? item.kz : item.ru;
      s.appendChild(opt);
    });
    if ([...g.options].some((o) => o.value === gv)) g.value = gv;
    if ([...s.options].some((o) => o.value === sv)) s.value = sv;
  }

  function showScreen(which) {
    const map = {
      welcome: el.screenWelcome,
      quiz: el.screenQuiz,
      results: el.screenResults,
    };
    Object.entries(map).forEach(([k, node]) => {
      const on = k === which;
      node.hidden = !on;
      node.classList.toggle("active", on);
    });
    document.body.classList.toggle("screen-results-open", which === "results");
  }

  function formatTime(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    deadline = Date.now() + QUIZ_MS;
    tick();
    timerId = setInterval(tick, 1000);
  }

  function tick() {
    const left = Math.max(0, deadline - Date.now());
    el.timerDisplay.textContent = formatTime(left);
    el.timerBadge.classList.toggle("timer-warn", left <= WARN_MS && left > 0);
    if (left === 0) {
      finishQuiz();
    }
  }

  function getQText(q) {
    return lang === "kz" ? q.text_kz : q.text_ru;
  }

  function getQOptions(q) {
    return lang === "kz" ? q.options_kz : q.options_ru;
  }

  function renderQuestion() {
    const q = sessionQuestions[currentIndex];
    el.qCurrent.textContent = String(currentIndex + 1);
    el.qTotal.textContent = String(QUIZ_TOTAL);
    const pct = ((currentIndex + 1) / QUIZ_TOTAL) * 100;
    el.progressFill.style.width = `${pct}%`;
    if (el.progressTrack) {
      el.progressTrack.setAttribute("aria-valuenow", String(Math.round(pct)));
      el.progressTrack.setAttribute("aria-valuemax", "100");
    }
    el.questionText.textContent = getQText(q);
    el.optionsRoot.innerHTML = "";
    const opts = getQOptions(q);
    const saved = answers[currentIndex];
    opts.forEach((text, idx) => {
      const lab = document.createElement("label");
      lab.className = "option" + (saved === idx ? " selected" : "");
      const inp = document.createElement("input");
      inp.type = "radio";
      inp.name = "answer";
      inp.value = String(idx);
      inp.checked = saved === idx;
      const span = document.createElement("span");
      span.textContent = text;
      lab.appendChild(inp);
      lab.appendChild(span);
      lab.addEventListener("click", () => {
        answers[currentIndex] = idx;
        el.optionsRoot.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
        lab.classList.add("selected");
        inp.checked = true;
        el.btnNext.disabled = false;
      });
      el.optionsRoot.appendChild(lab);
    });
    el.btnBack.disabled = currentIndex === 0;
    el.btnNext.disabled = saved === null || saved === undefined;
    el.btnNext.textContent = t(currentIndex === QUIZ_TOTAL - 1 ? "btnFinish" : "btnNext");
  }

  function validateForm() {
    el.formError.hidden = true;
    const name = el.inputName.value.trim();
    if (!name) {
      el.formError.textContent = t("errName");
      el.formError.hidden = false;
      return false;
    }
    if (!el.selectGroup.value) {
      el.formError.textContent = t("errGroup");
      el.formError.hidden = false;
      return false;
    }
    if (!el.selectSpec.value) {
      el.formError.textContent = t("errSpec");
      el.formError.hidden = false;
      return false;
    }
    return true;
  }

  function labelForGroup(val) {
    const g = GROUPS.find((x) => x.value === val);
    return g ? (lang === "kz" ? g.kz : g.ru) : val;
  }

  function labelForSpec(val) {
    const s = SPECIALTIES.find((x) => x.value === val);
    return s ? (lang === "kz" ? s.kz : s.ru) : val;
  }

  function beginSession() {
    if (bank.length < QUIZ_TOTAL) {
      el.formError.textContent = t(bank.length ? "errFewQuestions" : "errNoBank");
      el.formError.hidden = false;
      return;
    }
    sessionEnded = false;
    student = {
      name: el.inputName.value.trim(),
      group: el.selectGroup.value,
      spec: el.selectSpec.value,
    };
    sessionQuestions = shuffle(bank).slice(0, QUIZ_TOTAL);
    answers = Array(QUIZ_TOTAL).fill(null);
    currentIndex = 0;
    el.hdrName.textContent = student.name;
    el.hdrGroup.textContent = labelForGroup(student.group);
    el.hdrSpec.textContent = labelForSpec(student.spec);
    showScreen("quiz");
    startTimer();
    renderQuestion();
  }

  function finishQuiz() {
    if (sessionEnded) return;
    sessionEnded = true;
    stopTimer();
    let correct = 0;
    for (let i = 0; i < QUIZ_TOTAL; i++) {
      const q = sessionQuestions[i];
      const a = answers[i];
      if (a !== null && a !== undefined && Number(a) === q.correct) correct++;
    }
    const score = Math.round(correct * POINTS_PER_QUESTION);
    const percent = Math.round((correct / QUIZ_TOTAL) * 100);
    el.scoreBig.textContent = `${score} / 100`;
    el.statCorrect.textContent = `${correct} / ${QUIZ_TOTAL}`;
    el.statPercent.textContent = `${percent}%`;
    const passed = percent >= PASS_PERCENT;
    el.bannerPass.hidden = !passed;
    el.bannerFail.hidden = passed;
    showScreen("results");
  }

  el.formStart.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    beginSession();
  });

  el.btnBack.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  });

  el.btnNext.addEventListener("click", () => {
    const q = sessionQuestions[currentIndex];
    const sel = answers[currentIndex];
    if (sel === null || sel === undefined) return;
    if (currentIndex < QUIZ_TOTAL - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });

  el.btnRestart.addEventListener("click", () => {
    el.formStart.reset();
    fillSelects();
    showScreen("welcome");
  });

  el.btnExit.addEventListener("click", () => {
    el.formStart.reset();
    fillSelects();
    showScreen("welcome");
  });

  el.langSwitch.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    lang = btn.getAttribute("data-lang") === "ru" ? "ru" : "kz";
    localStorage.setItem(LANG_KEY, lang);
    applyLangToDom();
    if (!el.screenQuiz.hidden) {
      el.hdrGroup.textContent = labelForGroup(student.group);
      el.hdrSpec.textContent = labelForSpec(student.spec);
      renderQuestion();
    }
  });

  applyLangToDom();
  showScreen("welcome");
})();
