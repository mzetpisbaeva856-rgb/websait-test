/**
 * Серверсіз ашылу үшін: сұрақтар осы файлда (fetch JSON file:// бұғатталады).
 * 100 сұрақ — id 1..100, correct: 0..4
 */
(function () {
  const staticBank = [
    {
      text_kz: "Информатикада ақпараттың ең кіші өлшем бірлігі қандай?",
      text_ru: "Какова наименьшая единица измерения информации в информатике?",
      options_kz: ["Бит", "Байт", "Мегабайт", "Килобайт", "Пиксель"],
      options_ru: ["Бит", "Байт", "Мегабайт", "Килобайт", "Пиксель"],
      correct: 0,
    },
    {
      text_kz: "1 байт неше биттен тұрады?",
      text_ru: "Сколько бит в одном байте?",
      options_kz: ["4", "8", "16", "32", "64"],
      options_ru: ["4", "8", "16", "32", "64"],
      correct: 1,
    },
    {
      text_kz: "HTML құжатындағы тақырып үшін қай тег қолданылады?",
      text_ru: "Какой тег используется для заголовка страницы в HTML?",
      options_kz: ["<header>", "<title>", "<h1>", "<meta>", "<head>"],
      options_ru: ["<header>", "<title>", "<h1>", "<meta>", "<head>"],
      correct: 1,
    },
    {
      text_kz: "CSS-те мәтін түсін қай қасиет арқылы береміз?",
      text_ru: "Какое свойство CSS задаёт цвет текста?",
      options_kz: ["background-color", "font-color", "color", "text-style", "fill"],
      options_ru: ["background-color", "font-color", "color", "text-style", "fill"],
      correct: 2,
    },
    {
      text_kz: "JavaScript қай ортада негізінен орындалады?",
      text_ru: "Где в основном выполняется JavaScript в веб-разработке?",
      options_kz: ["Тек серверде", "Тек браузерде", "Браузерде және Node.js", "Тек SQL ішінде", "Тек компиляторда"],
      options_ru: ["Только на сервере", "Только в браузере", "В браузере и Node.js", "Только внутри SQL", "Только в компиляторе"],
      correct: 2,
    },
    {
      text_kz: "HTTP және HTTPS айырмашылығы неде?",
      text_ru: "В чём отличие HTTP от HTTPS?",
      options_kz: ["Жылдамдық", "Шифрлау / қауіпсіздік", "Түс", "Файл форматы", "Деректер базасы"],
      options_ru: ["Скорость", "Шифрование / безопасность", "Цвет", "Формат файла", "База данных"],
      correct: 1,
    },
    {
      text_kz: "IP-мекенжайдың IPv4 нұсқасында неше бит?",
      text_ru: "Сколько бит в IPv4-адресе?",
      options_kz: ["16", "32", "64", "128", "256"],
      options_ru: ["16", "32", "64", "128", "256"],
      correct: 1,
    },
    {
      text_kz: "Деректер құрылымында LIFO принципі қайда қолданылады?",
      text_ru: "Где в структурах данных используется принцип LIFO?",
      options_kz: ["Кезек (queue)", "Стек (stack)", "Список", "Кесте", "Ағаш"],
      options_ru: ["Очередь", "Стек", "Список", "Таблица", "Дерево"],
      correct: 1,
    },
    {
      text_kz: "Бірлік жүйесінде 1010₂ мәнінің ондықтағы түрі:",
      text_ru: "Десятичное значение числа 1010₂:",
      options_kz: ["8", "10", "12", "14", "16"],
      options_ru: ["8", "10", "12", "14", "16"],
      correct: 1,
    },
    {
      text_kz: "SQL-де барлық жолдарды таңдау үшін қай оператор қолданылады?",
      text_ru: "Какой оператор SQL выбирает все столбцы?",
      options_kz: ["GET *", "SELECT ALL", "SELECT *", "FETCH *", "READ *"],
      options_ru: ["GET *", "SELECT ALL", "SELECT *", "FETCH *", "READ *"],
      correct: 2,
    },
    {
      text_kz: "Операциялық жүйенің ядросы не істейді?",
      text_ru: "Что делает ядро операционной системы?",
      options_kz: ["Тек мәтін өңдеу", "Ресурстарды басқару және үдерістер", "Тек браузер ашады", "Тек сурет салады", "Тек дыбыс шығарады"],
      options_ru: ["Только редактирует текст", "Управляет ресурсами и процессами", "Только открывает браузер", "Только рисует", "Только звук"],
      correct: 1,
    },
    {
      text_kz: "Алгоритм күрделілігі O(n) дегеніміз:",
      text_ru: "Сложность алгоритма O(n) означает:",
      options_kz: ["Тұрақты уақыт", "Сызықтық уақыт", "Квадраттық", "Логарифмдік", "Экспоненциалды"],
      options_ru: ["Постоянное время", "Линейное время", "Квадратичное", "Логарифмическое", "Экспоненциальное"],
      correct: 1,
    },
    {
      text_kz: "JSON форматы не үшін кең қолданылады?",
      text_ru: "Для чего чаще всего используется формат JSON?",
      options_kz: ["Бейне кодтау", "Деректер алмасу (API)", "Графикалық дизайн", "Желілік кабель", "Принтер драйвері"],
      options_ru: ["Кодирование видео", "Обмен данными (API)", "Графический дизайн", "Сетевой кабель", "Драйвер принтера"],
      correct: 1,
    },
    {
      text_kz: "DNS не үшін қажет?",
      text_ru: "Для чего нужен DNS?",
      options_kz: ["Домен атауын IP мекенжайға аудару", "Файлды сығу", "Вирусты жою", "Кесте құру", "CSS генерациялау"],
      options_ru: ["Преобразование доменного имени в IP", "Сжатие файла", "Удаление вируса", "Создание таблицы", "Генерация CSS"],
      correct: 0,
    },
    {
      text_kz: "Git-те жергілікті өзгерістерді сақтау үшін негізгі команда:",
      text_ru: "Основная команда Git для сохранения изменений локально:",
      options_kz: ["git push", "git clone", "git commit", "git fork", "git zip"],
      options_ru: ["git push", "git clone", "git commit", "git fork", "git zip"],
      correct: 2,
    },
    {
      text_kz: "Реляциялық деректер базасында кестелерді байланыстыру үшін не қолданылады?",
      text_ru: "Что связывает таблицы в реляционной БД?",
      options_kz: ["Кілттер (primary/foreign key)", "Пиксель", "CSS класс", "HTTP cookie", "SVG"],
      options_ru: ["Ключи (первичный/внешний)", "Пиксель", "CSS-класс", "HTTP cookie", "SVG"],
      correct: 0,
    },
    {
      text_kz: "Фишер–Йетс shuffle қай мәселені шешеді?",
      text_ru: "Что решает перемешивание Фишера–Йетса?",
      options_kz: ["Сұрыптау", "Тең ықтималды рандом пермутация", "Желіні жылдамдату", "Кестені кеңейту", "Суретті сығу"],
      options_ru: ["Сортировка", "Случайную перестановку с равной вероятностью", "Ускорение сети", "Расширение таблицы", "Сжатие изображения"],
      correct: 1,
    },
    {
      text_kz: "Big O нотациясында O(1) дегеніміз:",
      text_ru: "В нотации Big O значение O(1) означает:",
      options_kz: ["Бір рет орындалады", "Кіріс өлшеміне тәуелсіз тұрақты уақыт", "Тек бір цикл", "Тек рекурсия", "Ешқашан аяқталмайды"],
      options_ru: ["Выполняется один раз", "Постоянное время не зависит от размера входа", "Только один цикл", "Только рекурсия", "Никогда не завершается"],
      correct: 1,
    },
    {
      text_kz: "TCP және UDP салыстырғанда TCP:",
      text_ru: "По сравнению с UDP, TCP:",
      options_kz: ["Әрқашан жылдам", "Байланыс орнату және сенімді жеткізу", "Тек дыбыс", "Пакеттер ретін бақыламайды", "Тек видео"],
      options_ru: ["Всегда быстрее", "Устанавливает соединение и надёжно доставляет", "Только звук", "Не следит за порядком", "Только видео"],
      correct: 1,
    },
    {
      text_kz: "HTML-де сыртқы CSS файлын қалай қосамыз?",
      text_ru: "Как подключить внешний CSS в HTML?",
      options_kz: ["<script href>", "<link rel=\"stylesheet\" href=\"...\">", "<css src>", "<import css>", "<style href>"],
      options_ru: ["<script href>", "<link rel=\"stylesheet\" href=\"...\">", "<css src>", "<import css>", "<style href>"],
      correct: 1,
    },
    {
      text_kz: "JavaScript-те const айнымалысы:",
      text_ru: "Переменная const в JavaScript:",
      options_kz: ["Қайта тағайындалады", "Тағайындалғаннан кейін қайта байланыстыруға болмайды", "Тек сан", "Тек цикл ішінде", "SQL кілті"],
      options_ru: ["Можно переназначать", "Нельзя переназначить после объявления", "Только число", "Только в цикле", "Ключ SQL"],
      correct: 1,
    },
    {
      text_kz: "REST API-да ресурс жою үшін әдетте қай HTTP әдісі?",
      text_ru: "Какой HTTP-метод обычно удаляет ресурс в REST API?",
      options_kz: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      options_ru: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      correct: 3,
    },
    {
      text_kz: "Биттік операция AND: 1 & 0 нәтижесі",
      text_ru: "Результат битовой операции AND: 1 & 0",
      options_kz: ["1", "0", "10", "2", "-1"],
      options_ru: ["1", "0", "10", "2", "-1"],
      correct: 1,
    },
    {
      text_kz: "Unicode дегеніміз не?",
      text_ru: "Что такое Unicode?",
      options_kz: ["Бейне кодек", "Символдардың стандартты кодтауы", "Желілік кабель", "Операциялық жүйе", "CSS кітапханасы"],
      options_ru: ["Видеокодек", "Стандарт кодирования символов", "Сетевой кабель", "Операционная система", "CSS-библиотека"],
      correct: 1,
    },
    {
      text_kz: "Кезек (queue) принципі:",
      text_ru: "Принцип очереди (queue):",
      options_kz: ["LIFO", "FIFO", "Random", "Heap only", "Graph only"],
      options_ru: ["LIFO", "FIFO", "Random", "Только куча", "Только граф"],
      correct: 1,
    },
    {
      text_kz: "Екілік іздеудің (binary search) шарты:",
      text_ru: "Условие для бинарного поиска:",
      options_kz: ["Кез келген массив", "Сұрыпталған массив", "Тек сандар емес", "Бос массив", "Тек JSON"],
      options_ru: ["Любой массив", "Отсортированный массив", "Только не числа", "Пустой массив", "Только JSON"],
      correct: 1,
    },
    {
      text_kz: "CSS flexbox-та негізгі ось бойынша орталау:",
      text_ru: "Выравнивание по главной оси во flexbox:",
      options_kz: ["align-items", "justify-content", "flex-wrap", "order", "gap-vertical"],
      options_ru: ["align-items", "justify-content", "flex-wrap", "order", "gap-vertical"],
      correct: 1,
    },
    {
      text_kz: "SQL injection қорғанысы:",
      text_ru: "Защита от SQL injection:",
      options_kz: ["Кез келген string қосу", "Дайындалған сұраулар (prepared statements)", "Тек GET", "Тек CSS", "Кэш өшіру"],
      options_ru: ["Конкатенация любых строк", "Подготовленные запросы", "Только GET", "Только CSS", "Отключить кэш"],
      correct: 1,
    },
    {
      text_kz: "XSS шабуылы дегеніміз:",
      text_ru: "Атака XSS — это:",
      options_kz: ["Серверді физикалық бұзу", "Скриптті басқа пайдаланушыға орындату", "Диск форматтау", "Wi‑Fi сигналын күшейту", "JSON өлшемі"],
      options_ru: ["Физическое повреждение сервера", "Выполнение скрипта у другого пользователя", "Форматирование диска", "Усиление Wi‑Fi", "Размер JSON"],
      correct: 1,
    },
    {
      text_kz: "HTTP статус коды 404 дегені:",
      text_ru: "HTTP статус 404 означает:",
      options_kz: ["Сәтті", "Табылмады", "Сервер қатесі", "Рұқсат жоқ", "Уақыт аяқталды"],
      options_ru: ["Успех", "Не найдено", "Ошибка сервера", "Нет доступа", "Таймаут"],
      correct: 1,
    },
    {
      text_kz: "Операциялық жүйеде үдеріс (process) дегеніміз:",
      text_ru: "Процесс в ОС — это:",
      options_kz: ["Тек файл аты", "Орындалатын бағдарламаның экземпляры", "Тек кесте", "Тек пиксель", "Тек DNS"],
      options_ru: ["Только имя файла", "Экземпляр выполняемой программы", "Только таблица", "Только пиксель", "Только DNS"],
      correct: 1,
    },
    {
      text_kz: "HTML5 семантикалық тег мысалы:",
      text_ru: "Пример семантического тега HTML5:",
      options_kz: ["<div>", "<span>", "<article>", "<font>", "<center>"],
      options_ru: ["<div>", "<span>", "<article>", "<font>", "<center>"],
      correct: 2,
    },
    {
      text_kz: "JavaScript массивіне соңына элемент қосу:",
      text_ru: "Добавить элемент в конец массива JavaScript:",
      options_kz: ["push()", "pop()", "shift()", "unshift()", "slice()"],
      options_ru: ["push()", "pop()", "shift()", "unshift()", "slice()"],
      correct: 0,
    },
    {
      text_kz: "CSS-те display:none дегеніміз:",
      text_ru: "display:none в CSS означает:",
      options_kz: ["Элемент көрінеді", "Элемент жасырылады және орын алмайды", "Тек мөлдір", "Тек қате", "Тек басып шығару"],
      options_ru: ["Элемент виден", "Скрыт и не занимает место", "Только прозрачный", "Только ошибка", "Только печать"],
      correct: 1,
    },
    {
      text_kz: "Желідегі localhost әдетте қай портта HTTP?",
      text_ru: "На каком порту обычно HTTP на localhost?",
      options_kz: ["21", "22", "80 немесе 8080", "443 ғана", "3306"],
      options_ru: ["21", "22", "80 или 8080", "только 443", "3306"],
      correct: 2,
    },
    {
      text_kz: "SHA-256 не үшін жиі қолданылады?",
      text_ru: "SHA-256 часто используется для:",
      options_kz: ["Суретті сығу", "Хештеу / бүтіндік тексеру", "Дыбыс кодтау", "CSS түстер", "HTML тегтер"],
      options_ru: ["Сжатия изображений", "Хеширования / проверки целостности", "Кодирования звука", "Цветов CSS", "HTML-тегов"],
      correct: 1,
    },
    {
      text_kz: "Ағашта (binary tree) әр түйіннің ең көбі неше баласы болуы мүмкін?",
      text_ru: "В бинарном дереве у узла максимум детей:",
      options_kz: ["1", "2", "3", "4", "Шексіз"],
      options_ru: ["1", "2", "3", "4", "Бесконечно"],
      correct: 1,
    },
    {
      text_kz: "Кэштеу (caching) мақсаты:",
      text_ru: "Цель кэширования:",
      options_kz: ["Қауіпсіздікті төмендету", "Жылдамдық пен жүктемені оңтайландыру", "Деректерді жою", "Тек дизайн", "Тек аудио"],
      options_ru: ["Снизить безопасность", "Ускорить и снизить нагрузку", "Удалить данные", "Только дизайн", "Только аудио"],
      correct: 1,
    },
  ];

  function wrongOptions(correct, pool) {
    const opts = [correct];
    const rest = pool.filter((x) => x !== correct);
    for (let i = 0; i < 4; i++) opts.push(rest[i]);
    return opts;
  }

  function shuffleOptions(correctText, wrongPool) {
    const arr = wrongOptions(correctText, wrongPool);
    const correct = arr[0];
    const others = arr.slice(1);
    const combined = [correct, ...others];
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    const newCorrect = combined.indexOf(correct);
    return { options: combined, correct: newCorrect };
  }

  /** KZ/RU нұсқаларын бірге араластырады */
  function shufflePairs(pairs) {
    const arr = pairs.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const correct = arr.findIndex((p) => p.ok);
    return {
      options_kz: arr.map((p) => p.kz),
      options_ru: arr.map((p) => p.ru),
      correct,
    };
  }

  /** 100 сұрақ: статик + генерацияланған (әр id бірегей мәтін) */
  const questions = [];

  staticBank.forEach((q, idx) => {
    questions.push({
      id: idx + 1,
      text_kz: q.text_kz,
      text_ru: q.text_ru,
      options_kz: q.options_kz,
      options_ru: q.options_ru,
      correct: q.correct,
    });
  });

  const baseId = staticBank.length;

  const gen = [
    (i) => {
      const n = 3 + (i % 5);
      const val = Math.pow(2, n);
      const text_kz = `2^${n} мәні неге тең?`;
      const text_ru = `Чему равно 2^${n}?`;
      const poolKz = [String(val), String(val + 1), String(val * 2), String(val - 2), String(val + 10)];
      const w = shuffleOptions(poolKz[0], poolKz.slice(1));
      return {
        text_kz,
        text_ru,
        options_kz: w.options,
        options_ru: w.options,
        correct: w.correct,
      };
    },
    (i) => {
      const a = 2 + (i % 7);
      const b = 3 + (i % 6);
      const sum = a + b;
      const text_kz = `${a} + ${b} = ?`;
      const text_ru = `${a} + ${b} = ?`;
      const pool = [String(sum), String(sum + 1), String(sum - 1), String(sum + 2), String(sum + 10)];
      const w = shuffleOptions(pool[0], pool.slice(1));
      return { text_kz, text_ru, options_kz: w.options, options_ru: w.options, correct: w.correct };
    },
    (i) => {
      const ports = [20, 21, 22, 25, 53, 80, 110, 143, 443, 3306, 5432, 8080];
      const p = ports[i % ports.length];
      const text_kz = `Келесі порттардың ішінде ${p} қай қызметпен байланыстыруға болады? (әдетті мысал)`;
      const text_ru = `С какой службой обычно связывают порт ${p}? (типичный пример)`;
      const map = {
        20: ["FTP деректер", "SSH", "DNS", "HTTP", "SMTP"],
        21: ["FTP басқару", "HTTP", "HTTPS", "DNS", "SSH"],
        22: ["SSH", "HTTP", "FTP", "SMTP", "DNS"],
        25: ["SMTP", "HTTP", "SSH", "DNS", "FTP"],
        53: ["DNS", "HTTP", "SSH", "FTP", "SMTP"],
        80: ["HTTP", "HTTPS", "SSH", "FTP", "DNS"],
        110: ["POP3", "IMAP", "HTTP", "SSH", "DNS"],
        143: ["IMAP", "POP3", "HTTP", "FTP", "DNS"],
        443: ["HTTPS", "HTTP", "FTP", "SSH", "DNS"],
        3306: ["MySQL", "PostgreSQL", "HTTP", "SSH", "DNS"],
        5432: ["PostgreSQL", "MySQL", "HTTP", "FTP", "DNS"],
        8080: ["HTTP (альтернативті)", "HTTPS стандарт", "SSH", "DNS", "SMTP"],
      };
      const opts_kz = map[p] || ["Қызмет", "A", "B", "C", "D"];
      const opts_ru = opts_kz.slice();
      const pairs = opts_kz.map((kz, idx) => ({ kz, ru: opts_ru[idx], ok: idx === 0 }));
      return { text_kz, text_ru, ...shufflePairs(pairs) };
    },
    (i) => {
      const tags = ["<section>", "<nav>", "<footer>", "<aside>", "<main>"];
      const pick = tags[i % tags.length];
      const text_kz = `HTML5-те қай тег бөлімді белгілеу үшін қолданылады: "${pick}"?`;
      const text_ru = `Какой тег HTML5 используется для разметки секции: "${pick}"?`;
      const opts_kz = [pick, "<div>", "<span>", "<table>", "<br>"];
      const opts_ru = [pick, "<div>", "<span>", "<table>", "<br>"];
      const w = shuffleOptions(opts_kz[0], opts_kz.slice(1));
      return { text_kz, text_ru, options_kz: w.options, options_ru: w.options, correct: w.correct };
    },
    (i) => {
      const props = [
        ["margin", "Сыртқы шек", "Внешний отступ"],
        ["padding", "Ішкі шек", "Внутренний отступ"],
        ["border", "Жиек", "Рамка"],
        ["width", "Ені", "Ширина"],
        ["height", "Биіктігі", "Высота"],
      ];
      const [name, kz, ru] = props[i % props.length];
      const text_kz = `CSS қасиеті "${name}" не үшін? (${kz})`;
      const text_ru = `Для чего CSS-свойство "${name}"? (${ru})`;
      const opts_kz = [kz, "Түс беру", "Шрифт түрі", "Анимация уақыты", "Кесте бағандары"];
      const opts_ru = [ru, "Задать цвет", "Тип шрифта", "Длительность анимации", "Колонки таблицы"];
      const pairs = opts_kz.map((k, idx) => ({ kz: k, ru: opts_ru[idx], ok: idx === 0 }));
      return { text_kz, text_ru, ...shufflePairs(pairs) };
    },
  ];

  for (let k = 0; k < 100 - baseId; k++) {
    const fn = gen[k % gen.length];
    const part = fn(k);
    questions.push({
      id: baseId + k + 1,
      text_kz: part.text_kz,
      text_ru: part.text_ru,
      options_kz: part.options_kz,
      options_ru: part.options_ru,
      correct: part.correct,
    });
  }

  questions.sort((a, b) => a.id - b.id);

  window.QUESTIONS_BANK = { questions };
})();
