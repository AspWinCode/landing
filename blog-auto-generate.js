#!/usr/bin/env node
// Автоматическая генерация SEO-статей через Mistral + Pollinations
// Запуск: node blog-auto-generate.js
// Env: PORTAL_URL, PORTAL_EMAIL, PORTAL_PASSWORD, MISTRAL_API_KEY

const PORTAL_URL = process.env.PORTAL_URL || 'https://tirskix.space';
const PORTAL_EMAIL = process.env.PORTAL_EMAIL;
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

// 150 тем — ~5 месяцев ежедневных публикаций без повторов
const TOPICS = [
  // ── Родителям (50 тем) ──────────────────────────────────────────────────
  { title: 'Стоит ли отдавать ребёнка на программирование: плюсы и минусы', category: 'roditelyam', keywords: 'программирование для детей, стоит ли учить программирование, курсы программирования для детей' },
  { title: 'В каком возрасте начинать учить ребёнка программированию', category: 'roditelyam', keywords: 'с какого возраста учить программирование, когда начинать программирование ребёнок' },
  { title: 'Как выбрать онлайн-школу программирования для ребёнка', category: 'roditelyam', keywords: 'онлайн школа программирования для детей, выбрать курсы программирования' },
  { title: 'Перспективы IT для детей: сколько зарабатывают программисты', category: 'roditelyam', keywords: 'зарплата программиста, перспективы IT, будущее ребёнка программирование' },
  { title: 'Как мотивировать ребёнка учиться программированию', category: 'roditelyam', keywords: 'мотивация ребёнка программирование, как заинтересовать программированием' },
  { title: 'Онлайн vs офлайн курсы программирования для детей', category: 'roditelyam', keywords: 'онлайн курсы программирования, дистанционное обучение программированию' },
  { title: 'Программирование для девочек: мифы и реальность', category: 'roditelyam', keywords: 'программирование для девочек, девочки в IT, женщины программисты' },
  { title: 'Как не навредить здоровью ребёнка за компьютером', category: 'roditelyam', keywords: 'здоровье ребёнка компьютер, зрение ребёнок экран, осанка за компьютером' },
  { title: 'Как родителю помочь ребёнку изучать программирование', category: 'roditelyam', keywords: 'помочь ребёнку программирование, поддержка родителей обучение' },
  { title: 'Программирование и математика: нужны ли способности', category: 'roditelyam', keywords: 'математика и программирование, нужна ли математика для программирования' },
  { title: 'Сколько времени в неделю уделять программированию', category: 'roditelyam', keywords: 'расписание занятий программирование, сколько учиться программированию ребёнку' },
  { title: 'Признаки того, что ваш ребёнок готов к программированию', category: 'roditelyam', keywords: 'готов ли ребёнок программирование, когда начать учить кодить' },
  { title: 'Истории успеха: дети-программисты которые изменили мир', category: 'roditelyam', keywords: 'юные программисты, дети создавшие игры приложения, вундеркинды IT' },
  { title: 'Групповые или индивидуальные занятия: что лучше для ребёнка', category: 'roditelyam', keywords: 'групповые занятия программирование, индивидуальные уроки программирование дети' },
  { title: 'Что спросить у школы программирования перед записью', category: 'roditelyam', keywords: 'выбор школы программирования, вопросы курсы программирование дети' },
  { title: 'Как понять, что курсы программирования дают результат', category: 'roditelyam', keywords: 'результаты курсов программирования, прогресс ребёнка программирование' },
  { title: 'Программирование как хобби или профессия: что выбрать', category: 'roditelyam', keywords: 'программирование хобби профессия, IT карьера ребёнок' },
  { title: 'Как совместить учёбу в школе и курсы программирования', category: 'roditelyam', keywords: 'совмещать школу и курсы, нагрузка ребёнок программирование' },
  { title: 'Нужен ли мощный компьютер для обучения программированию', category: 'roditelyam', keywords: 'компьютер для программирования, какой ноутбук нужен для курсов' },
  { title: 'Что такое пробный урок и зачем он нужен', category: 'roditelyam', keywords: 'пробный урок программирование, бесплатный урок курсы программирование' },
  { title: 'Портфолио ребёнка-программиста: зачем и как создать', category: 'roditelyam', keywords: 'портфолио школьника программиста, проекты ребёнок программирование' },
  { title: 'Как IT-навыки помогут ребёнку в любой профессии', category: 'roditelyam', keywords: 'IT навыки будущее, цифровые компетенции дети, программирование любая профессия' },
  { title: 'Международные сертификаты по программированию для школьников', category: 'roditelyam', keywords: 'сертификат программирование школьник, международные экзамены IT дети' },
  { title: 'Стипендии и гранты для детей в IT-образовании', category: 'roditelyam', keywords: 'гранты IT образование дети, стипендия программирование школьник' },
  { title: 'Летние IT-лагеря и интенсивы для детей', category: 'roditelyam', keywords: 'IT лагерь дети, летний лагерь программирование, интенсив программирование' },
  { title: 'Как выбрать первый проект ребёнку-программисту', category: 'roditelyam', keywords: 'первый проект программирование ребёнок, идеи проектов дети программирование' },
  { title: 'Онлайн-курсы или репетитор по программированию: что лучше', category: 'roditelyam', keywords: 'репетитор программирование, онлайн курсы или репетитор, обучение программированию' },
  { title: 'Почему дети бросают курсы программирования и как этого избежать', category: 'roditelyam', keywords: 'бросил курсы программирование, как удержать ребёнка на курсах' },
  { title: 'Геймификация в обучении: как игры помогают учить программирование', category: 'roditelyam', keywords: 'геймификация обучение программирование, игровое обучение дети IT' },
  { title: 'Как программирование развивает логику и мышление ребёнка', category: 'roditelyam', keywords: 'программирование логика ребёнок, развитие мышления программирование' },
  { title: 'Топ ошибок родителей при выборе курсов программирования', category: 'roditelyam', keywords: 'ошибки выбора курсов программирование, как не ошибиться школа программирования' },
  { title: 'Что такое Scratch и почему с него начинают обучение', category: 'roditelyam', keywords: 'Scratch для детей, зачем Scratch начинать программирование, визуальное программирование' },
  { title: 'Как поддержать ребёнка когда программирование не получается', category: 'roditelyam', keywords: 'ребёнок не понимает программирование, поддержка при неудачах обучение' },
  { title: 'Что такое алгоритмическое мышление и как его развить', category: 'roditelyam', keywords: 'алгоритмическое мышление дети, развитие логики программирование' },
  { title: 'Сравнение популярных школ программирования для детей в России', category: 'roditelyam', keywords: 'школы программирования дети Россия, сравнение курсов программирование' },
  { title: 'Можно ли учиться программированию бесплатно', category: 'roditelyam', keywords: 'бесплатное обучение программирование, бесплатные курсы программирование дети' },
  { title: 'Как часто нужно менять язык программирования при обучении', category: 'roditelyam', keywords: 'смена языка программирования, прогрессия обучения программирование' },
  { title: 'IT-профессии для интровертов: почему программирование подходит', category: 'roditelyam', keywords: 'программирование интроверт, IT для застенчивых детей, работа дома программист' },
  { title: 'Как оценить уровень ребёнка перед записью на курсы', category: 'roditelyam', keywords: 'уровень программирование ребёнок, тест знаний программирование дети' },
  { title: 'Диплом программиста или самообразование: что ценнее в IT', category: 'roditelyam', keywords: 'диплом программист самообразование, образование IT карьера' },
  { title: 'Soft skills программиста: что важно кроме кода', category: 'roditelyam', keywords: 'soft skills программист, навыки программиста, коммуникация IT' },
  { title: 'Как найти сообщество для ребёнка-программиста', category: 'roditelyam', keywords: 'сообщество программисты дети, клуб программирование школьники' },
  { title: 'Детское программирование в цифрах: статистика и исследования', category: 'roditelyam', keywords: 'статистика программирование дети, исследования IT образование' },
  { title: 'Можно ли зарабатывать программированием в школьном возрасте', category: 'roditelyam', keywords: 'заработок программирование школьник, фриланс подросток программист' },
  { title: 'Как выбрать специализацию в программировании: веб, игры, AI', category: 'roditelyam', keywords: 'специализация программирование, веб разработка игры AI дети' },
  { title: 'Разница между кодингом и программированием: что учить', category: 'roditelyam', keywords: 'кодинг или программирование, разница кодинг программирование' },
  { title: 'Как программирование помогает в точных науках в школе', category: 'roditelyam', keywords: 'программирование и физика математика, помощь в учёбе программирование' },
  { title: 'Эмоциональный интеллект программиста: почему это важно', category: 'roditelyam', keywords: 'эмоциональный интеллект программист, EQ IT дети' },
  { title: 'Зарубежные университеты по программированию: как подготовить ребёнка', category: 'roditelyam', keywords: 'зарубежный университет программирование, поступление IT вуз' },
  { title: 'Что такое хакатон и стоит ли отправлять ребёнка', category: 'roditelyam', keywords: 'хакатон для школьников, хакатон дети программирование' },

  // ── Подготовка к экзаменам (35 тем) ───────────────────────────────────
  { title: 'ОГЭ по информатике 2025: полный гайд для подготовки', category: 'podgotovka-k-ekzamenam', keywords: 'ОГЭ информатика 2025, подготовка ОГЭ информатика, как сдать ОГЭ информатика' },
  { title: 'ЕГЭ по информатике 2025: структура и как набрать 90+ баллов', category: 'podgotovka-k-ekzamenam', keywords: 'ЕГЭ информатика 2025, подготовка ЕГЭ информатика, баллы ЕГЭ информатика' },
  { title: 'Типичные ошибки на ОГЭ по информатике и как их избежать', category: 'podgotovka-k-ekzamenam', keywords: 'ошибки ОГЭ информатика, как не завалить ОГЭ, подготовка к экзамену информатика' },
  { title: 'Как подготовиться к ОГЭ по информатике за 3 месяца', category: 'podgotovka-k-ekzamenam', keywords: 'подготовка ОГЭ информатика 3 месяца, план подготовки ОГЭ' },
  { title: 'Алгоритмы для ОГЭ по информатике: что нужно знать', category: 'podgotovka-k-ekzamenam', keywords: 'алгоритмы ОГЭ информатика, задания с алгоритмами ОГЭ' },
  { title: 'Системы счисления для ОГЭ: двоичная, восьмеричная, шестнадцатеричная', category: 'podgotovka-k-ekzamenam', keywords: 'системы счисления ОГЭ, перевод чисел ОГЭ информатика' },
  { title: 'Логические операции в ОГЭ по информатике: разбор заданий', category: 'podgotovka-k-ekzamenam', keywords: 'логические операции ОГЭ информатика, алгебра логики ОГЭ' },
  { title: 'Олимпиады по информатике для школьников: как подготовиться', category: 'podgotovka-k-ekzamenam', keywords: 'олимпиада информатика школьники, олимпиадное программирование, подготовка олимпиада' },
  { title: 'Разбор типовых заданий ОГЭ по информатике 2025', category: 'podgotovka-k-ekzamenam', keywords: 'типовые задания ОГЭ информатика, решение задач ОГЭ информатика' },
  { title: 'Электронные таблицы в ОГЭ и ЕГЭ: формулы и функции', category: 'podgotovka-k-ekzamenam', keywords: 'электронные таблицы ОГЭ ЕГЭ, Excel задания экзамен информатика' },
  { title: 'Кодирование информации для ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'кодирование информации ОГЭ, задания кодирование ОГЭ информатика' },
  { title: 'Работа с файлами и папками в заданиях ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'файловая система ОГЭ, задания файлы папки ОГЭ информатика' },
  { title: 'Сортировка и поиск в заданиях ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'сортировка поиск ОГЭ информатика, алгоритмы сортировки ОГЭ' },
  { title: 'Как использовать Python при подготовке к ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'Python ОГЭ информатика, программирование подготовка ОГЭ' },
  { title: 'Граф и дерево: задания с графами на ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'графы ОГЭ информатика, задания с деревьями ОГЭ' },
  { title: 'Сколько баллов нужно для хорошей оценки на ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'баллы ОГЭ информатика оценки, перевод баллов ОГЭ информатика' },
  { title: 'Как составить план подготовки к ЕГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'план подготовки ЕГЭ информатика, расписание ЕГЭ информатика' },
  { title: 'Разбор задания 27 ЕГЭ по информатике: программирование', category: 'podgotovka-k-ekzamenam', keywords: 'задание 27 ЕГЭ информатика, программирование ЕГЭ, сложные задания ЕГЭ' },
  { title: 'Рекурсия для ОГЭ и ЕГЭ: простое объяснение', category: 'podgotovka-k-ekzamenam', keywords: 'рекурсия ОГЭ ЕГЭ, рекурсивные алгоритмы экзамен' },
  { title: 'Как решать задачи на исполнителей в ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'исполнители ОГЭ информатика, задачи на исполнителей' },
  { title: 'Строки и символы в заданиях ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'строки ОГЭ информатика, задания со строками ОГЭ' },
  { title: 'Как работать с базами данных в заданиях ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'базы данных ОГЭ информатика, SQL ОГЭ задания' },
  { title: 'Метод ветвей и границ: олимпиадные задачи по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'олимпиадные задачи информатика, сложные задачи программирование' },
  { title: 'Теория информации: что нужно знать для ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'теория информации ОГЭ, количество информации ОГЭ информатика' },
  { title: 'Как пользоваться Python IDLE на экзамене ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'Python IDLE ОГЭ, среда разработки ОГЭ информатика' },
  { title: 'Числа Фибоначчи и рекурсия в задачах ЕГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'числа Фибоначчи ЕГЭ, рекурсия задачи ЕГЭ информатика' },
  { title: 'Что такое Big-O нотация и нужна ли она для ОГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'Big-O нотация, сложность алгоритма, алгоритмы школьники' },
  { title: 'Топ-10 ресурсов для подготовки к ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'ресурсы подготовка ОГЭ информатика, сайты ОГЭ информатика' },
  { title: 'Как справиться с волнением на экзамене по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'волнение экзамен информатика, как успокоиться ОГЭ ЕГЭ' },
  { title: 'Разбор ошибок при написании программ на ЕГЭ', category: 'podgotovka-k-ekzamenam', keywords: 'ошибки программирование ЕГЭ, частые ошибки ЕГЭ информатика' },
  { title: 'Как проверить свою программу на ОГЭ: советы', category: 'podgotovka-k-ekzamenam', keywords: 'проверка программы ОГЭ, тестирование программ экзамен' },
  { title: 'Задачи на подсчёт и перебор в ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'подсчёт перебор ОГЭ информатика, задачи на перебор' },
  { title: 'Динамическое программирование для ЕГЭ: введение', category: 'podgotovka-k-ekzamenam', keywords: 'динамическое программирование ЕГЭ, DP задачи школьники' },
  { title: 'КДР и пробный ЕГЭ по информатике: как подготовиться', category: 'podgotovka-k-ekzamenam', keywords: 'пробный ЕГЭ информатика, КДР информатика подготовка' },
  { title: 'Массивы и списки в задачах ОГЭ по информатике', category: 'podgotovka-k-ekzamenam', keywords: 'массивы ОГЭ информатика, задания с массивами ОГЭ' },

  // ── Для учеников (35 тем) ─────────────────────────────────────────────
  { title: 'С чего начать изучение программирования ребёнку 10 лет', category: 'dlya-uchenikov', keywords: 'начать программирование 10 лет, первый язык программирования ребёнок, учиться кодить' },
  { title: 'Scratch или Python: какой язык программирования выбрать первым', category: 'dlya-uchenikov', keywords: 'Scratch или Python, первый язык программирования, с чего начать программирование' },
  { title: 'Как создать свою первую игру на Python: пошаговый гайд', category: 'dlya-uchenikov', keywords: 'создать игру Python, Python игры для начинающих, pygame начинающие' },
  { title: 'Что такое алгоритм: объяснение для детей с примерами', category: 'dlya-uchenikov', keywords: 'алгоритм для детей, что такое алгоритм, алгоритмы в программировании' },
  { title: 'Переменные в программировании: простое объяснение для школьников', category: 'dlya-uchenikov', keywords: 'переменные программирование, что такое переменная, переменные для начинающих' },
  { title: 'Циклы в программировании: for и while простыми словами', category: 'dlya-uchenikov', keywords: 'циклы программирование, for while цикл, циклы для начинающих' },
  { title: 'Условия в программировании: if-else для школьников', category: 'dlya-uchenikov', keywords: 'условия программирование, if else, ветвление программирование начинающие' },
  { title: 'Как создать сайт с нуля: первые шаги для школьника', category: 'dlya-uchenikov', keywords: 'создать сайт школьнику, HTML CSS начинающие, как сделать сайт' },
  { title: 'Что такое функция в программировании: объяснение с примерами', category: 'dlya-uchenikov', keywords: 'функция программирование, что такое функция, функции Python начинающие' },
  { title: 'Топ-5 игр которые учат программированию незаметно', category: 'dlya-uchenikov', keywords: 'игры обучающие программированию, игры для программистов, учиться программировать играя' },
  { title: 'Git для школьников: зачем это нужно и как начать', category: 'dlya-uchenikov', keywords: 'git для начинающих, система контроля версий, github школьник' },
  { title: 'Как решать задачи по программированию: алгоритмическое мышление', category: 'dlya-uchenikov', keywords: 'алгоритмическое мышление, решение задач программирование, логика программист' },
  { title: 'Списки и массивы: что это и зачем нужно', category: 'dlya-uchenikov', keywords: 'массивы программирование, списки Python, что такое массив' },
  { title: 'Словари в Python: объяснение для начинающих', category: 'dlya-uchenikov', keywords: 'словари Python, dict Python, что такое словарь программирование' },
  { title: 'Как читать чужой код: советы для начинающих', category: 'dlya-uchenikov', keywords: 'читать код программирование, понимать чужой код, навыки программиста' },
  { title: 'Что такое отладка программы и как искать ошибки', category: 'dlya-uchenikov', keywords: 'отладка программа, debugging, поиск ошибок программирование' },
  { title: 'Как сделать Telegram-бота на Python: простой гайд', category: 'dlya-uchenikov', keywords: 'Telegram бот Python, создать бота, aiogram начинающие' },
  { title: 'HTML и CSS: создаём первую веб-страницу за час', category: 'dlya-uchenikov', keywords: 'HTML CSS для начинающих, создать страницу HTML, веб разработка школьник' },
  { title: 'Что такое объектно-ориентированное программирование: просто о сложном', category: 'dlya-uchenikov', keywords: 'ООП для начинающих, объекты и классы, объектно-ориентированное программирование' },
  { title: 'Как работает компьютерная игра изнутри', category: 'dlya-uchenikov', keywords: 'как работает игра программирование, движок игры, разработка игр школьник' },
  { title: 'Числа в программировании: целые, дробные, отрицательные', category: 'dlya-uchenikov', keywords: 'числа программирование, int float, типы данных Python' },
  { title: 'Строки в Python: всё что нужно знать новичку', category: 'dlya-uchenikov', keywords: 'строки Python, работа со строками, str методы Python' },
  { title: 'Как создать мобильное приложение в 14 лет', category: 'dlya-uchenikov', keywords: 'создать приложение подросток, мобильное приложение школьник, первое приложение' },
  { title: 'Топ-10 проектов для начинающего программиста', category: 'dlya-uchenikov', keywords: 'проекты начинающий программист, идеи проектов Python, что сделать программирование' },
  { title: 'Как правильно гуглить ошибки в коде', category: 'dlya-uchenikov', keywords: 'искать ошибки программирование, гуглить код, stack overflow начинающие' },
  { title: 'Что такое библиотека в программировании', category: 'dlya-uchenikov', keywords: 'библиотека программирование, что такое library, импорт Python' },
  { title: 'Как делать красивые графики на Python с matplotlib', category: 'dlya-uchenikov', keywords: 'matplotlib Python, графики Python, визуализация данных школьник' },
  { title: 'Рекурсия для начинающих: что это и зачем', category: 'dlya-uchenikov', keywords: 'рекурсия для начинающих, что такое рекурсия, рекурсивные функции' },
  { title: 'Как участвовать в соревнованиях по программированию', category: 'dlya-uchenikov', keywords: 'соревнования программирование, Codeforces школьник, олимпиада программирование' },
  { title: 'Что такое переменная окружения и зачем она нужна', category: 'dlya-uchenikov', keywords: 'переменная окружения, environment variable, конфигурация программ' },
  { title: 'Как написать свою первую функцию на Python', category: 'dlya-uchenikov', keywords: 'написать функцию Python, def Python, функции для начинающих' },
  { title: 'Кортежи в Python: когда использовать вместо списков', category: 'dlya-uchenikov', keywords: 'кортеж Python, tuple Python, разница список кортеж' },
  { title: 'Работа с файлами в Python: чтение и запись', category: 'dlya-uchenikov', keywords: 'файлы Python, чтение файлов Python, open write read Python' },
  { title: 'Как установить Python и запустить первую программу', category: 'dlya-uchenikov', keywords: 'установить Python, первая программа Python, Python начало' },
  { title: 'Типы данных в Python: int, str, float, bool', category: 'dlya-uchenikov', keywords: 'типы данных Python, int str float bool, переменные Python' },

  // ── О программировании (30 тем) ───────────────────────────────────────
  { title: 'Python vs JavaScript: какой язык учить в 2025 году', category: 'o-programmirovanii', keywords: 'Python или JavaScript, какой язык программирования учить, лучший язык программирования 2025' },
  { title: 'Что такое искусственный интеллект: объяснение для детей', category: 'o-programmirovanii', keywords: 'искусственный интеллект для детей, что такое AI, нейросети объяснение' },
  { title: 'Как работает интернет: объяснение для школьников', category: 'o-programmirovanii', keywords: 'как работает интернет, что такое сервер, интернет объяснение детям' },
  { title: 'Профессии в IT: кем можно стать после курсов программирования', category: 'o-programmirovanii', keywords: 'профессии IT, кем стать программист, IT специальности зарплата' },
  { title: 'Как создаются видеоигры: разработка игр изнутри', category: 'o-programmirovanii', keywords: 'как создаются игры, разработка игр, gamedev для детей' },
  { title: 'Что такое машинное обучение простыми словами', category: 'o-programmirovanii', keywords: 'машинное обучение для детей, machine learning объяснение, нейросети как работают' },
  { title: 'Кибербезопасность для детей: как защитить данные в интернете', category: 'o-programmirovanii', keywords: 'кибербезопасность дети, безопасность в интернете, защита данных школьник' },
  { title: 'Как устроен компьютер: процессор, память, накопитель', category: 'o-programmirovanii', keywords: 'как устроен компьютер, железо компьютера, архитектура компьютера для детей' },
  { title: 'Мобильные приложения: как они создаются', category: 'o-programmirovanii', keywords: 'создание мобильных приложений, разработка приложений, iOS Android программирование' },
  { title: 'Что такое open source и почему это важно', category: 'o-programmirovanii', keywords: 'open source для детей, открытый исходный код, github open source' },
  { title: 'Роботы и программирование: как это связано', category: 'o-programmirovanii', keywords: 'роботы программирование, робототехника дети, Arduino школьники' },
  { title: 'История программирования: от перфокарт до нейросетей', category: 'o-programmirovanii', keywords: 'история программирования, первые компьютеры, эволюция программирования' },
  { title: 'Что такое API: объяснение для начинающих программистов', category: 'o-programmirovanii', keywords: 'что такое API, REST API для начинающих, API объяснение просто' },
  { title: 'Программирование и математика: почему они неразлучны', category: 'o-programmirovanii', keywords: 'математика для программистов, нужна ли математика, логика и программирование' },
  { title: 'Облачные технологии: что это и зачем нужно', category: 'o-programmirovanii', keywords: 'облачные технологии для детей, что такое облако, cloud computing' },
  { title: 'Будущее IT: профессии которые появятся через 10 лет', category: 'o-programmirovanii', keywords: 'будущее IT профессии, новые специальности программирование, профессии будущего' },
  { title: 'Что такое база данных: объяснение на примерах', category: 'o-programmirovanii', keywords: 'база данных для детей, что такое БД, SQL объяснение' },
  { title: 'Нейросети: как они учатся и принимают решения', category: 'o-programmirovanii', keywords: 'нейросети как работают, обучение нейросети, deep learning' },
  { title: 'Что такое DevOps и почему это важная профессия', category: 'o-programmirovanii', keywords: 'DevOps профессия, что такое DevOps, CI/CD объяснение' },
  { title: 'Блокчейн для детей: простое объяснение', category: 'o-programmirovanii', keywords: 'блокчейн для детей, что такое блокчейн, криптовалюта объяснение' },
  { title: 'Что такое Big Data и зачем это нужно', category: 'o-programmirovanii', keywords: 'Big Data для детей, большие данные, анализ данных профессия' },
  { title: 'Frontend vs Backend: в чём разница и что выбрать', category: 'o-programmirovanii', keywords: 'frontend backend разница, что учить веб разработка, фронтенд бэкенд' },
  { title: 'Что такое фреймворк и зачем он нужен программисту', category: 'o-programmirovanii', keywords: 'фреймворк программирование, что такое framework, Django Flask React' },
  { title: 'Как работают поисковые системы: Яндекс и Google изнутри', category: 'o-programmirovanii', keywords: 'как работает поиск, поисковые алгоритмы, Яндекс Google индексация' },
  { title: 'Что такое VPN и как он работает', category: 'o-programmirovanii', keywords: 'что такое VPN, как работает VPN, VPN объяснение' },
  { title: 'Операционные системы: Windows, Linux, macOS — в чём разница', category: 'o-programmirovanii', keywords: 'операционные системы, Windows Linux macOS, выбор ОС программист' },
  { title: 'Что такое компилятор и интерпретатор', category: 'o-programmirovanii', keywords: 'компилятор интерпретатор, как работает код, выполнение программы' },
  { title: 'Как программисты работают в команде: Agile и Scrum', category: 'o-programmirovanii', keywords: 'командная разработка, Agile Scrum, работа программиста в команде' },
  { title: 'Что такое виртуальная реальность и как её программируют', category: 'o-programmirovanii', keywords: 'виртуальная реальность программирование, VR разработка, Unity VR' },
  { title: 'Интернет вещей: как обычные предметы становятся умными', category: 'o-programmirovanii', keywords: 'интернет вещей IoT, умный дом программирование, IoT устройства' },
];

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}

function sanitizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function withRetry(fn, label, attempts = 3) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      const last = i === attempts;
      console.error(`❌ ${label} — попытка ${i}/${attempts}: ${err.message}`);
      if (last) throw err;
      const delay = i * 5000;
      console.log(`⏳ Повтор через ${delay / 1000}s...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

async function login() {
  return withRetry(async () => {
    const form = new URLSearchParams();
    form.append('username', PORTAL_EMAIL);
    form.append('password', PORTAL_PASSWORD);

    const res = await fetch(`${PORTAL_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Login failed: ${res.status} ${body}`);
    }
    const data = await res.json();
    return data.access_token;
  }, 'login');
}

async function getCategories(token) {
  const res = await fetch(`${PORTAL_URL}/api/v1/blog/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Get categories failed: ${res.status}`);
  return res.json();
}

async function generateArticle(topic) {
  const prompt = `Ты SEO-копирайтер онлайн-школы программирования для детей 10–18 лет TirSkix Academy.

Напиши полноценную SEO-статью для блога.
Тема: "${topic.title}"
Ключевые слова: ${topic.keywords}

Требования:
- Язык: русский
- Объём контента: 900–1200 слов
- Формат content: только HTML-теги body (h2, p, ul, li, ol, strong) — без html/body/head тегов
- Минимум 3 подзаголовка h2
- Полезный экспертный текст без воды
- Органично вписать ключевые слова
- В конце статьи абзац с мягким призывом записаться в TirSkix Academy

Верни ТОЛЬКО валидный JSON без markdown-обёртки:
{
  "title": "заголовок статьи (до 70 символов)",
  "seo_title": "SEO заголовок (до 60 символов, включает главное ключевое слово)",
  "seo_description": "мета-описание (120–160 символов, побуждает кликнуть)",
  "excerpt": "краткое описание для карточки (2–3 предложения, до 200 символов)",
  "slug": "url-slug-latinskimi-bukvami-i-defisami",
  "image_prompt": "English prompt for AI image: children programming theme, photorealistic, bright",
  "content": "<h2>...</h2><p>...</p>..."
}`;

  const mistralCall = async () => {
    const r = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      throw new Error(`Mistral API error: ${r.status} ${body}`);
    }
    return r;
  };

  const res = await withRetry(mistralCall, 'Mistral API', 3);

  const data = await res.json();
  const raw = data.choices[0].message.content;
  console.log('📨 Mistral raw (first 300 chars):', raw.slice(0, 300));

  let article;
  try {
    article = JSON.parse(raw);
  } catch {
    // убираем markdown-обёртку ```json ... ```
    const stripped = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    try {
      article = JSON.parse(stripped);
    } catch {
      const match = stripped.match(/\{[\s\S]*\}/);
      if (!match) {
        console.error('❌ Полный ответ Mistral:', raw);
        throw new Error('Cannot parse Mistral response as JSON');
      }
      article = JSON.parse(match[0]);
    }
  }

  article.slug = sanitizeSlug(article.slug || article.title);
  return article;
}

function getImageUrl(imagePrompt, seed) {
  // Strip non-ASCII (Cyrillic encodes to 6 chars each and blows past the 500-char portal limit)
  const ascii = String(imagePrompt || '').replace(/[^\x20-\x7E]/g, '').trim().slice(0, 40);
  const text = ascii || 'children coding programming classroom';
  const prompt = encodeURIComponent(`flat design, ${text}, kids coding, colorful`);
  const negative = encodeURIComponent(`realistic, photo, hands`);
  return `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&model=flux&seed=${seed}&negative=${negative}&nologo=true`;
}

async function createAndPublish(token, article, categoryId, imageUrl) {
  let slug = article.slug;
  let createRes;
  let slugRetried = false;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const body = JSON.stringify({
      title: article.title,
      slug,
      content: article.content,
      excerpt: article.excerpt || '',
      seo_title: article.seo_title || article.title,
      seo_description: article.seo_description || '',
      cover_image: imageUrl,
      category_id: categoryId,
      status: 'draft',
    });

    createRes = await fetch(`${PORTAL_URL}/api/v1/blog/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body,
    });

    if (createRes.status === 409) {
      if (slugRetried) {
        throw new Error(`Slug '${slug}' уже занят даже после добавления суффикса — публикация отменена`);
      }
      slugRetried = true;
      slug = `${article.slug}-${Date.now().toString(36)}`;
      console.log(`⚠️  Slug '${article.slug}' уже занят, пробуем '${slug}'`);
      continue;
    }
    if (createRes.status >= 500) {
      const text = await createRes.text();
      console.error(`❌ Create post — попытка ${attempt}/3: ${createRes.status} ${text}`);
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 5000));
        continue;
      }
      throw new Error(`Create post failed: ${createRes.status} ${text}`);
    }
    if (!createRes.ok) {
      throw new Error(`Create post failed: ${createRes.status} ${await createRes.text()}`);
    }
    break;
  }
  article.slug = slug;

  const post = await createRes.json();
  console.log(`✅ Черновик создан: id=${post.id} slug=${post.slug}`);

  const publishRes = await fetch(`${PORTAL_URL}/api/v1/blog/posts/${post.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status: 'published' }),
  });

  if (!publishRes.ok) {
    throw new Error(`Publish failed: ${publishRes.status} ${await publishRes.text()}`);
  }

  return publishRes.json();
}

async function main() {
  if (!PORTAL_EMAIL || !PORTAL_PASSWORD || !MISTRAL_API_KEY) {
    console.error('❌ Нужны переменные: PORTAL_EMAIL, PORTAL_PASSWORD, MISTRAL_API_KEY');
    process.exit(1);
  }

  const now = new Date();
  const day = getDayOfYear(now);
  const year = now.getFullYear();
  const cycle = Math.floor(day / TOPICS.length);
  const topicIndex = day % TOPICS.length;
  const topic = TOPICS[topicIndex];

  console.log(`📅 День ${day} (${now.toLocaleDateString('ru-RU')}), тема #${topicIndex + 1}: "${topic.title}"`);

  console.log('🔑 Авторизация...');
  const token = await login();

  console.log('📂 Загружаем категории...');
  const categories = await getCategories(token);
  const category = categories.find((c) => c.slug === topic.category);
  if (!category) throw new Error(`Категория '${topic.category}' не найдена`);
  console.log(`📁 Категория: ${category.name} (id=${category.id})`);

  console.log('✍️  Генерируем статью через Mistral...');
  const article = await generateArticle(topic);

  // На втором цикле добавляем год к slug чтобы избежать конфликтов
  if (cycle > 0) {
    article.slug = `${article.slug}-${year}`;
  }

  console.log(`📝 Заголовок: ${article.title}`);
  console.log(`🔗 Slug: ${article.slug}`);

  const imageUrl = getImageUrl(article.image_prompt || topic.title, day + year * 365);
  console.log(`🖼️  Картинка: ${imageUrl}`);

  console.log('🚀 Публикуем...');
  const published = await createAndPublish(token, article, category.id, imageUrl);

  console.log(`🎉 Опубликовано! tirskix-academy.com/blog/${published.slug}`);
}

main().catch((err) => {
  console.error('❌ Ошибка:', err.message);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
