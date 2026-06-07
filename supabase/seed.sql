-- Seed data for Time to Torah / עת לתורה
-- Run after migrations/001_initial_schema.sql and migrations/002_rls_policies.sql

-- =================== CATEGORIES ===================
insert into public.categories (slug, name_he, name_en, description_he, description_en, icon, display_order, is_active)
values
  ('emunah',      'אמונה',           'Emunah',        'יסודות האמונה היהודית',                      'Foundations of Jewish faith',                        '✨', 1, true),
  ('parasha',     'פרשת השבוע',      'Parasha',       'לימוד שבועי בפרשת השבוע',                    'Weekly Torah portion',                               '📜', 2, true),
  ('mussar',      'מוסר',            'Mussar',         'עבודת המידות והשלמות האישית',                'Character refinement and personal growth',           '💎', 3, true),
  ('mishna',      'משנה',            'Mishna',         'לימוד יומי במשנה',                           'Daily Mishna study',                                 '📚', 4, true),
  ('gemara',      'גמרא',            'Gemara',         'קטעים נבחרים מהתלמוד הבבלי',                'Selected passages from the Babylonian Talmud',       '🕯️', 5, true),
  ('tehillim',    'תהילים',          'Tehillim',       'מזמורי תהילים עם פירוש ועומק',              'Psalms with commentary and depth',                   '🌟', 6, true),
  ('halacha',     'הלכה',            'Halacha',        'הלכה למעשה לחיי היום-יום',                  'Practical Jewish law for daily life',                '⚖️', 7, true),
  ('tzadikim',    'סיפורי צדיקים',   'Stories',        'סיפורים מחיי הצדיקים והאדמו"רים',           'Stories from the lives of tzadikim and rebbes',      '🌸', 8, true),
  ('shalom_bayit','שלום בית',         'Shalom Bayit',  'בניית בית יהודי שלם ומאושר',               'Building a wholesome and happy Jewish home',         '🏠', 9, true),
  ('parnasa',     'פרנסה',           'Parnasa',        'תורת הפרנסה — בטחון ויגיעה',                'Torah on livelihood — trust and effort',              '💰', 10, true);

-- =================== RABBIS ===================
insert into public.rabbis (name_he, name_en, bio_he, bio_en, photo_url, is_active)
values
  (
    'הרב יצחק זילברשטיין',
    'Rabbi Yitzchak Zilberstein',
    'ראש כולל בית דוד בחולון, חתן מרן הגרי"ש אלישיב זצ"ל. מחבר ספרים רבים בהלכה ואגדה.',
    'Head of Kollel Beit David in Holon, son-in-law of Maran HaGaon R'' Yosef Shalom Elyashiv zt"l. Author of numerous works on halacha and aggada.',
    'https://via.placeholder.com/200x200?text=Rabbi+Zilberstein',
    true
  ),
  (
    'הרב יגאל כהן',
    'Rabbi Yigal Cohen',
    'ראש ישיבת אור חיים, מרצה נודע בנושאי אמונה ותשובה. שיעוריו הגיעו למיליונים ברחבי העולם.',
    'Head of Yeshivat Or Chaim, renowned lecturer on faith and repentance. His lessons have reached millions worldwide.',
    'https://via.placeholder.com/200x200?text=Rabbi+Cohen',
    true
  ),
  (
    'הרבנית יעל שלו',
    'Rabbanit Yael Shalev',
    'מרצה ומחנכת בתחום הלכות שבת ומועדים, מנהלת בית המדרש לנשים "אורות". מחברת "תורה ואישה".',
    'Lecturer and educator in Shabbat and holiday law, director of the women''s beit midrash "Orot". Author of "Torah and Woman".',
    'https://via.placeholder.com/200x200?text=Rabbanit+Shalev',
    true
  ),
  (
    'הרב שלמה מאיר רובינשטיין',
    'Rabbi Shlomo Meir Rubinstein',
    'מגיד שיעור בישיבת הר המור, מתמחה בלימוד מסכתות גמרא. ידוע בכשרון הסבר עמוק לאנשים פשוטים.',
    'Maggid shiur at Yeshivat Har HaMor, specializing in Gemara tractates. Known for his ability to explain deep concepts in an accessible way.',
    'https://via.placeholder.com/200x200?text=Rabbi+Rubinstein',
    true
  ),
  (
    'הרב דוד לאו',
    'Rabbi David Lau',
    'הרב הראשי לישראל, עוסק בהרחבת לימוד התורה לכל שכבות העם. מחבר "יחל ישראל" ועוד.',
    'Chief Rabbi of Israel, dedicated to expanding Torah study to all segments of the Jewish people. Author of "Yachel Yisrael" and more.',
    'https://via.placeholder.com/200x200?text=Rabbi+Lau',
    true
  );

-- =================== LESSONS ===================
-- We insert lessons referencing categories/rabbis by slug/name with subqueries.

insert into public.lessons (title_he, title_en, content_he, content_en, summary_he, summary_en, youtube_id, audio_url, parasha, category_id, rabbi_id, lesson_date, is_free, estimated_minutes)
values
-- 1. Emunah
(
  'יסוד הבטחון — לדעת שהכל טוב',
  'The Foundation of Trust — Knowing All is Good',
  'בטחון בה'' הוא אחד מיסודות האמונה היהודית. הרב מסלנים זצ"ל אמר: "בטחון אמיתי אינו רק לדעת שהקב"ה יכול לעזור, אלא לדעת בוודאות שהוא יעזור."\n\nהחובות הלבבות מגדיר את הבטחון כ"שקט הנפש מהדאגה לפרנסה ולצרכי הגוף". כשאדם בוטח בה'' הוא אינו מפסיק לפעול, אלא פועל מתוך שלווה ואמונה שהכל בידי שמים.\n\nלימוד מעשי: תכתוב היום שלש דברים שה'' עשה לך — וכך תחזק את הבטחון.',
  'Trust in God is one of the foundations of Jewish faith. The Rebbe of Slonim zt"l said: "True trust is not only knowing that God can help, but knowing with certainty that He will help."\n\nChovot HaLevavot defines trust as "the tranquility of the soul from worry about livelihood and bodily needs."\n\nPractical lesson: Write down three things God did for you today — and thus strengthen your trust.',
  'בטחון הוא לא השלמה עם המצב, אלא ידיעה ברורה שהקב"ה מנהל הכל לטובה.',
  'Trust is not resignation, but a clear knowledge that God runs everything for the good.',
  null, null, null,
  (select id from public.categories where slug = 'emunah'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date - interval '19 days',
  true, 5
),
-- 2. Parasha
(
  'פרשת בראשית — בתחילת הדרך',
  'Parshat Bereishit — In the Beginning',
  'בראשית ברא אלהים את השמים ואת הארץ. מילים אלו הפותחות את התורה מלמדות אותנו יסוד גדול: שהעולם כולו נברא במחשבה תחילה.\n\nרש"י שואל: מדוע התורה מתחילה בבריאה ולא במצוה הראשונה? ומסביר: שאם יאמרו אומות העולם לישראל ''ליסטים אתם'', יאמרו להם: כל הארץ של הקב"ה היא.\n\nהנצי"ב מוולוז''ין מסביר שהתורה נקראת "ספר הישר" — כי גדולי ישראל בראשית נהגו ביושר עם כולם, אפילו עם עמים שאינם שומרי תורה.',
  'In the beginning God created the heavens and the earth. These words, which open the Torah, teach us a fundamental principle: the entire world was created with forethought.\n\nRashi asks: why does the Torah begin with Creation rather than the first commandment? He explains that if nations say "you are thieves," Israel can respond that the earth belongs to God.\n\nThe Netziv explains that the Torah is called "Sefer HaYashar" — for the great men of early Israel acted with integrity toward everyone, even non-observant nations.',
  'בראשית מלמדת אותנו שהעולם נברא מאהבה, ועלינו להחזיר אהבה לעולם.',
  'Bereishit teaches us the world was created with love, and we must return love to the world.',
  'dQw4w9WgXcQ', null, 'בראשית',
  (select id from public.categories where slug = 'parasha'),
  (select id from public.rabbis where name_en = 'Rabbi David Lau'),
  current_date - interval '18 days',
  true, 5
),
-- 3. Mussar
(
  'מסילת ישרים — פרק הזהירות',
  'Mesillat Yesharim — The Chapter on Watchfulness',
  'רמח"ל כותב: "יסוד החסידות ושורש העבודה התמימה הוא שיתברר ויתאמת אצל האדם מה חובתו בעולמו."\n\nהזהירות היא הבחינה הראשונה: לבחון כל מעשה ולשאול — האם זה רצון ה''? זהירות אינה חומרה יתרה, אלא ערנות לכל פרט.\n\nהשגרה היא האויב הגדול של הזהירות. לכן חייב האדם לחדש בכל יום את התשוקה ואת ההתלהבות בעבודת ה''.',
  'The Ramchal writes: "The foundation of piety is to clarify and authenticate for oneself what one''s obligation is in one''s world."\n\nWatchfulness is the first quality: to examine every action and ask — is this God''s will? Watchfulness is not excessive strictness, but alertness to every detail.\n\nRoutine is the great enemy of watchfulness. Therefore, one must renew each day the desire and enthusiasm in Divine service.',
  'זהירות פירושה לא לחיות על אוטומט, אלא לבחור בכל רגע מחדש.',
  'Watchfulness means not living on autopilot, but choosing anew at every moment.',
  null, null, null,
  (select id from public.categories where slug = 'mussar'),
  (select id from public.rabbis where name_en = 'Rabbi Yitzchak Zilberstein'),
  current_date - interval '17 days',
  false, 5
),
-- 4. Mishna
(
  'אבות פרק א — קבל את כל האדם בסבר פנים יפות',
  'Avot Chapter 1 — Receive Every Person with a Pleasant Expression',
  'שמאי אומר: "הוי מקבל את כל האדם בסבר פנים יפות." חז"ל מלמדים אותנו שהפנים הן ראי הנשמה.\n\nכשאדם מקבל את חברו בפנים מאירות, הוא נותן לו מתנה אמיתית — תחושה שהוא חשוב ואהוב. הגמרא אומרת שמראה שיניים לחברו עדיף ממתן חלב.\n\nאנו לומדים: כל פגישה עם אדם אחר היא הזדמנות לתת מתנה — חיוך, מבט, ברכה.',
  'Shammai says: "Receive every person with a pleasant expression." The Sages teach that the face is the mirror of the soul.\n\nWhen one receives another with a bright face, one gives them a real gift — the feeling of being important and loved. The Talmud says that showing one''s teeth to a friend is better than giving milk.\n\nWe learn: every meeting with another person is an opportunity to give a gift — a smile, a gaze, a blessing.',
  'חיוך הוא מצווה — ולא עולה כלום.',
  'A smile is a mitzvah — and costs nothing.',
  null, null, null,
  (select id from public.categories where slug = 'mishna'),
  (select id from public.rabbis where name_en = 'Rabbi Shlomo Meir Rubinstein'),
  current_date - interval '16 days',
  false, 5
),
-- 5. Gemara
(
  'ברכות דף ב — מאימתי קורין את שמע',
  'Berachot 2a — From When Do We Recite the Shema',
  'מסכת ברכות פותחת: "מאימתי קורין את שמע בערבית?" — שאלה פשוטה לכאורה, אך מכילה עומק עצום.\n\nהגמרא מלמדת שזמן קריאת שמע של לילה הוא "משעה שהכהנים נכנסים לאכול בתרומתם" — כלומר, צאת הכוכבים. הגדרה זו מגלה שיש שלש דרכי קביעת הזמן: מציאותית, הלכתית, ורוחנית.\n\nהנצי"ב מלמד: הגמרא פותחת בשמע מפני שהיא הצהרת האמונה הבסיסית ביותר — יחידותו של הבורא.',
  'Tractate Berachot opens: "From when do we recite the Shema in the evening?" — a seemingly simple question, but containing immense depth.\n\nThe Gemara teaches that the time for the evening Shema is "from when the kohanim enter to eat their terumah" — i.e., nightfall. This definition reveals three modes of determining time: physical, halachic, and spiritual.\n\nThe Netziv teaches: the Gemara begins with Shema because it is the most basic declaration of faith — the uniqueness of the Creator.',
  'שמע ישראל — שלש מילים שמכילות את כל היהדות.',
  'Shema Yisrael — three words that contain all of Judaism.',
  null, null, null,
  (select id from public.categories where slug = 'gemara'),
  (select id from public.rabbis where name_en = 'Rabbi Shlomo Meir Rubinstein'),
  current_date - interval '15 days',
  false, 5
),
-- 6. Tehillim
(
  'תהילים כ"ג — ה'' רועי לא אחסר',
  'Tehillim 23 — The Lord is My Shepherd, I Shall Not Want',
  'מזמור כ"ג הוא אולי המזמור הידוע ביותר בתהילים. דוד המלך כותב אותו מתוך ניסיון חייו — רועה צאן שהפך למלך.\n\n"ה'' רועי לא אחסר" — כשה'' הוא הרועה שלנו, כל צרכינו מסופקים. לא מדובר רק בפרנסה, אלא בשלמות הנפש.\n\n"גם כי אלך בגיא צלמות לא אירא רע כי אתה עמדי" — גם בתוך הצרות והחשכה, נוכחות ה'' מאירה את הדרך. המזמור מסתיים בביטחון: "ושבתי בבית ה'' לאורך ימים."',
  'Psalm 23 is perhaps the most famous psalm in Tehillim. King David wrote it from his life experience — a shepherd who became a king.\n\n"The Lord is my shepherd, I shall not want" — when God is our shepherd, all our needs are provided. This is not just about livelihood, but about the wholeness of the soul.\n\n"Even when I walk in the valley of the shadow of death, I will fear no evil for You are with me" — even in trouble and darkness, God''s presence illuminates the path.',
  'ה'' הוא הרועה שלנו — גם כשאנחנו לא מרגישים אותו.',
  'God is our shepherd — even when we do not feel Him.',
  null, null, null,
  (select id from public.categories where slug = 'tehillim'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date - interval '14 days',
  true, 5
),
-- 7. Halacha
(
  'הלכות שבת — כבוד השבת',
  'Laws of Shabbat — Honoring the Shabbat',
  'זכור את יום השבת לקדשו. מצות זכירת השבת כוללת שני יסודות: זכירה בפה ביום שישי לפני כניסת השבת, וזכירה בלב לאורך כל השבוע.\n\nמרן השולחן ערוך פוסק שמצוה לכבד את השבת בבגדים נאים, בסעודות מכובדות, ובהכנת הבית. כבוד השבת מתחיל כבר ביום חמישי.\n\nהרמב"ם מלמד שהמכבד את השבת מקבל שכר רב, שנאמר "אז תתענג על ה''" — ענג שבת הוא מן המעלות הגדולות שבתורה.',
  'Remember the Sabbath day to keep it holy. The commandment to remember Shabbat includes two elements: verbal remembrance on Friday before Shabbat, and constant mindfulness throughout the week.\n\nMaran the Shulchan Aruch rules that it is a mitzvah to honor Shabbat with nice clothing, dignified meals, and preparing the home. This honor begins already on Thursday.\n\nThe Rambam teaches that one who honors Shabbat receives great reward, as it is said "then you shall delight in God."',
  'שבת היא לא עוד יום מנוחה — היא פגישה שבועית עם הבורא.',
  'Shabbat is not just a day of rest — it is a weekly meeting with the Creator.',
  null, null, null,
  (select id from public.categories where slug = 'halacha'),
  (select id from public.rabbis where name_en = 'Rabbanit Yael Shalev'),
  current_date - interval '13 days',
  false, 5
),
-- 8. Tzadikim
(
  'הבעל שם טוב — האור הגנוז',
  'The Baal Shem Tov — The Hidden Light',
  'ישראל בן אליעזר, הידוע כ"בעל שם טוב", נולד בפולין בשנת ת"ס (1700). מוצאו מענווים, ובנערותו שמש כשומר בית כנסת.\n\nבגיל ל"ו גילה את עצמו לעולם כמנהיג רוחני גדול. תורתו הדגישה שלש עקרונות: שמחה בעבודת ה'', קרבת אלהים לכל אדם, ואהבת ישראל ללא מדה.\n\nסיפרו: פעם ראה הבעש"ט איש עני ועצוב. שאלו מדוע הוא עצוב. ענה: "מרוב דאגות." אמר לו הבעש"ט: "הדאגה לא פותרת דבר — רק התפילה פותרת." מאותו יום, האיש החל להתפלל בשמחה.',
  'Israel ben Eliezer, known as the "Baal Shem Tov," was born in Poland in 1700. Of humble origins, in his youth he served as a synagogue caretaker.\n\nAt age 36, he revealed himself to the world as a great spiritual leader. His teaching emphasized three principles: joy in Divine service, closeness to God for every person, and boundless love of Israel.\n\nIt is told: Once the Baal Shem Tov saw a poor and sad man. He asked why he was sad. The man replied: "From too many worries." The Baal Shem Tov told him: "Worry solves nothing — only prayer solves." From that day, the man began to pray with joy.',
  'הבעש"ט לימד שהשמחה היא לא תוצר של הנסיבות — אלא בחירה.',
  'The Baal Shem Tov taught that joy is not a product of circumstances — but a choice.',
  null, null, null,
  (select id from public.categories where slug = 'tzadikim'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date - interval '12 days',
  true, 5
),
-- 9. Shalom Bayit
(
  'שלום בית — הבית כמקדש מעט',
  'Shalom Bayit — The Home as a Small Sanctuary',
  'חז"ל אמרו: "ביתו של אדם זה אשתו." הבית היהודי הוא "מקדש מעט" — מקום שבו השכינה שורה כשיש שלום.\n\nהגמרא (סוטה יז.) לומדת: "איש ואשה זכו — שכינה ביניהם. לא זכו — אש אוכלתם." המילה "אִישׁ" מכילה י''ה ו"אשה" מכילה י''ה — יחד הם שם ה''.\n\nעצות מעשיות לשלום בית: הכרת טובה יומית לבן הזוג, דיבור רך ולא ביקורתי, ויחד — שמירת "זמן איכות" שבועי. שלום בית אינו נמצא — הוא נבנה בכל יום.',
  'The Sages said: "A man''s home is his wife." The Jewish home is a "small sanctuary" — a place where the Shechina dwells when there is peace.\n\nThe Talmud (Sotah 17a) derives: "A husband and wife who merit it — the Shechina is between them. If they do not merit — fire consumes them." The word "ish" contains Yud-Heh, and "isha" contains Yud-Heh — together they form God''s name.\n\nPractical tips for shalom bayit: daily gratitude to your spouse, soft and non-critical speech, and together — maintaining weekly "quality time." Shalom bayit is not found — it is built each day.',
  'שלום בית נבנה במילים רכות ובמבטים של אהבה.',
  'Shalom bayit is built with soft words and loving glances.',
  null, null, null,
  (select id from public.categories where slug = 'shalom_bayit'),
  (select id from public.rabbis where name_en = 'Rabbanit Yael Shalev'),
  current_date - interval '11 days',
  false, 5
),
-- 10. Parnasa
(
  'פרנסה בבטחון — "בזעת אפך תאכל לחם"',
  'Parnasa with Trust — "By the Sweat of Your Brow You Shall Eat Bread"',
  'התורה ציותה: "בזעת אפך תאכל לחם" — עלינו לעבוד ולהתאמץ, אך הפרנסה עצמה באה מה''.\n\nהרב דסלר מסביר בדרך ה"בחירה": ה'' קבע שיש "נקודת הבחירה" — כל אדם ומקומו. חלק מהאנשים צריכים להתאמץ יותר, חלק פחות — אך כולם תלויים בה'' בסופו של דבר.\n\nסגולות לפרנסה: א) עמל בתורה — "ועשית והצלחת". ב) צדקה — "עשר בשביל שתתעשר". ג) שמחה בחלקו — "הסתפקות היא עושר אמיתי."',
  'The Torah commanded: "By the sweat of your brow you shall eat bread" — we must work and strive, but livelihood itself comes from God.\n\nRav Dessler explains through the concept of "bechirah": God determined there is a "point of choice" — each person and their place. Some need to strive more, some less — but ultimately everyone depends on God.\n\nPractices for parnasa: 1) Torah study — "and you will do and succeed." 2) Charity — "tithe so that you shall become wealthy." 3) Contentment — "sufficiency is true wealth."',
  'אנו עובדים ומשתדלים, אבל ה'' הוא המפרנס האמיתי.',
  'We work and strive, but God is the true Provider.',
  null, null, null,
  (select id from public.categories where slug = 'parnasa'),
  (select id from public.rabbis where name_en = 'Rabbi Yitzchak Zilberstein'),
  current_date - interval '10 days',
  false, 5
),
-- 11. Emunah 2
(
  'י"ג עיקרים — האמונה בתחיית המתים',
  'The 13 Principles — Belief in the Resurrection',
  'העיקר השלושה-עשר של הרמב"ם: "אני מאמין באמונה שלמה שתהיה תחיית המתים בעת שיעלה רצון מאת הבורא."\n\nתחיית המתים היא אחד מיסודות היהדות. הגמרא (סנהדרין) אומרת: "כל ישראל יש להם חלק לעולם הבא — מלבד... האומר אין תחיית המתים מן התורה."\n\nהמהר"ל מלמד: תחיית המתים אינה רק אמונה לעתיד — היא מלמדת אותנו שכל נשמה יהודית היא נצחית. המוות הוא מעבר, לא סוף.',
  'The Rambam''s thirteenth principle: "I believe with perfect faith that there will be resurrection of the dead at a time when it shall please the Creator."\n\nResurrection of the dead is one of Judaism''s foundations. The Talmud (Sanhedrin) states: "All Israel has a share in the World to Come — except... one who says there is no resurrection from the Torah."\n\nThe Maharal teaches: resurrection is not just a belief about the future — it teaches us that every Jewish soul is eternal. Death is a transition, not an end.',
  'כל נשמה יהודית היא ניצוץ אלוהי נצחי שלא נכבה לעולם.',
  'Every Jewish soul is an eternal divine spark that is never extinguished.',
  null, null, null,
  (select id from public.categories where slug = 'emunah'),
  (select id from public.rabbis where name_en = 'Rabbi David Lau'),
  current_date - interval '9 days',
  false, 5
),
-- 12. Parasha 2
(
  'פרשת נח — הקשת בענן',
  'Parshat Noach — The Rainbow in the Cloud',
  'לאחר המבול, ה'' כורת ברית עם נח ועם כל החי: "את קשתי נתתי בענן והיתה לאות ברית."\n\nרש"י מסביר שהקשת ב ענן היא זכר לברית — כי בזמן שיש עננים שעשויים להביא גשם, הקשת מזכירה לנו שה'' הבטיח. הרמב"ן מוסיף שהקשת מסמלת שהחץ פונה כלפי שמים ולא כלפי האדם.\n\nסיפר חסידי: כשרבי לוי יצחק מברדיצ''ב ראה קשת, הוא אמר: "ריבון עולם, הכל יודעים שאתה שומר הבטחות — אני בא לזכר הנך בהבטחותיך לנו.""',
  'After the flood, God establishes a covenant with Noah and all living things: "I have set my rainbow in the cloud and it shall be a sign of the covenant."\n\nRashi explains that the rainbow is a reminder of the covenant — for when there are clouds that could bring rain, the rainbow reminds us that God promised. The Ramban adds that the rainbow symbolizes the arrow pointing toward heaven, not toward man.\n\nA Chassidic story: When Rabbi Levi Yitzchak of Berditchev saw a rainbow, he said: "Master of the Universe, everyone knows You keep promises — I come to remind You of Your promises to us."',
  'הקשת מזכירה לנו: גם אחרי הסערות הגדולות ביותר, ה'' אתנו.',
  'The rainbow reminds us: even after the greatest storms, God is with us.',
  null, null, 'נח',
  (select id from public.categories where slug = 'parasha'),
  (select id from public.rabbis where name_en = 'Rabbi Yitzchak Zilberstein'),
  current_date - interval '8 days',
  false, 5
),
-- 13. Mussar 2
(
  'ספר הכוזרי — ישראל ולבה של האנושות',
  'Sefer HaKuzari — Israel and the Heart of Humanity',
  'רבי יהודה הלוי כותב בכוזרי: ישראל ל עמים כלב לאיברים. כשם שהלב סובל הכי הרבה ומבריא הכי מהר, כך ישראל.\n\nהמשל הזה מלמד אותנו גאווה בריאה: להיות יהודי זה לא עול — זה זכות. אנחנו נושאים בלב אנושות ניצוץ אלוהי מיוחד.\n\nאבל גם אחריות: הלב שפוגע ב עצמו פוגע בכל הגוף. כשיהודי פועל בניגוד לתורה, הוא פוגע בניצוץ האלוהי שבו ובכלל ישראל.',
  'Rabbi Yehuda HaLevi writes in the Kuzari: Israel is to the nations as the heart is to the organs. Just as the heart suffers most and heals fastest, so does Israel.\n\nThis parable teaches us healthy pride: to be Jewish is not a burden — it is a privilege. We carry in the heart of humanity a special divine spark.\n\nBut also responsibility: a heart that harms itself harms the entire body. When a Jew acts against the Torah, he harms the divine spark within him and within all of Israel.',
  'להיות יהודי זה לא עול — זה זכות מיוחדת לשאת ניצוץ אלוהי.',
  'Being Jewish is not a burden — it is a special privilege to carry a divine spark.',
  null, null, null,
  (select id from public.categories where slug = 'mussar'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date - interval '7 days',
  false, 5
),
-- 14. Mishna 2
(
  'אבות פרק ב — ודע מה שתשיב לאפיקורוס',
  'Avot Chapter 2 — Know What to Answer a Heretic',
  'רבן יוחנן בן זכאי אמר לתלמידיו: "ודע מה שתשיב לאפיקורוס." חז"ל הדגישו: חשוב לא רק לדעת את האמת, אלא לדעת לבטא אותה.\n\nהתלמוד מסביר שמשנה זו מלמדת שני דברים: א) עצמת עצמך — ודע את עיקרי האמונה שלך. ב) הכן עצמך לשיחה — כי ייתכן שאחר ישאל, ואתה תוכל להאיר את עיניו.\n\nלימוד מעשי: בחר השבוע שאלה יהודית אחת שאתה מתקשה לענות עליה — ועסוק בה ביחד עם ספר, חבר, או רב.',
  'Rabban Yochanan ben Zakkai said to his students: "Know what to answer a heretic." The Sages emphasized: it is important not only to know the truth, but to know how to express it.\n\nThe Talmud explains this Mishna teaches two things: a) Strengthen yourself — know your core beliefs. b) Prepare yourself for conversation — because another may ask, and you can enlighten them.\n\nPractical lesson: Choose this week one Jewish question you find difficult to answer — and engage with it together with a book, a friend, or a rabbi.',
  'אמונה שלא ניתן לבטאה — אינה שלמה. חשוב ללמוד לדבר על מה שאנו מאמינים.',
  'Faith that cannot be expressed is incomplete. It is important to learn to speak about what we believe.',
  null, null, null,
  (select id from public.categories where slug = 'mishna'),
  (select id from public.rabbis where name_en = 'Rabbi David Lau'),
  current_date - interval '6 days',
  true, 5
),
-- 15. Tehillim 2
(
  'תהילים קי"ט — אשרי תמימי דרך',
  'Tehillim 119 — Ashrei Temimei Darech',
  'תהילים קי"ט הוא הפרק הארוך ביותר בתנ"ך — 176 פסוקים, מאורגנים באלפבית עברי. כל שמונה פסוקים מתחילים באותה אות.\n\n"אשרי תמימי דרך ההולכים בתורת ה''." — אשרי מי שדרכו תמימה, כלומר, ישרה ושלמה. הדרך היא לא רק מה שאנו עושים, אלא איך אנו הולכים — עם כוונה, יושר, ואמת.\n\nדוד המלך כתב מזמור זה כדי ללמד: כל אות בתורה היא עולם שלם. גם מצוה אחת, כשנשמרת כהלכה, מקרבת את האדם לשלמות.',
  'Psalm 119 is the longest chapter in the Bible — 176 verses, organized in the Hebrew alphabet. Every eight verses begin with the same letter.\n\n"Blessed are those of blameless way who walk in the Torah of God." — Blessed is one whose way is blameless, meaning straight and complete. The way is not only what we do, but how we walk — with intention, honesty, and truth.\n\nKing David wrote this psalm to teach: every letter in the Torah is an entire world. Even one mitzvah, when kept properly, brings a person closer to perfection.',
  'תמימות הדרך פירושה ללכת לאורך ה'' בכל פרט ופרט של החיים.',
  'Blamelessness of the way means walking in God''s light in every detail of life.',
  null, null, null,
  (select id from public.categories where slug = 'tehillim'),
  (select id from public.rabbis where name_en = 'Rabbanit Yael Shalev'),
  current_date - interval '5 days',
  false, 5
),
-- 16. Halacha 2
(
  'הלכות תפילה — כוונה בתפילה',
  'Laws of Prayer — Intention in Prayer',
  'הרמב"ם פוסק: "תפילה בלא כוונה — אינה תפילה." ועם זאת, מתי יש לנו "כוונה שלמה"?\n\nהשולחן ערוך מלמד שעיקר הכוונה היא בברכה הראשונה של שמונה עשרה — "אבות". בה יש לכוון לפחות לכך שאדם עומד לפני ה''.\n\nעצה מעשית של האריז"ל: לפני התפילה, קח שלשים שניות לנשום עמוק ולחשוב: "אני עומד עכשיו לפני מלך מלכי המלכים." הכוונה הזו בלבד יכולה לשנות את כל חוויית התפילה.',
  'The Rambam rules: "Prayer without intention — is not prayer." And yet, when do we have "complete intention"?\n\nThe Shulchan Aruch teaches that the main intention is in the first blessing of the Amidah — "Avot." In it, one must intend at least that one is standing before God.\n\nA practical advice from the Arizal: before prayer, take thirty seconds to breathe deeply and think: "I am now standing before the King of Kings." This intention alone can transform the entire prayer experience.',
  'תפילה עם כוונה — ולו לרגע אחד — שווה יותר מאלף תפילות "בשפתיים לבד".',
  'Prayer with intention — even for one moment — is worth more than a thousand prayers "with lips alone".',
  null, null, null,
  (select id from public.categories where slug = 'halacha'),
  (select id from public.rabbis where name_en = 'Rabbi Yitzchak Zilberstein'),
  current_date - interval '4 days',
  false, 5
),
-- 17. Tzadikim 2
(
  'הרב קוק — אורות התשובה',
  'Rav Kook — Lights of Repentance',
  'הרב אברהם יצחק הכהן קוק, הרב הראשי הראשון של ארץ ישראל, ראה בתשובה לא עונש — אלא ריפוי ותיקון.\n\n"אורות התשובה" הוא ספרו הנודע. בו כותב: "התשובה של העולם היא נשמת העולם. כשם שהנשמה מחיה את הגוף, כך התשובה מחיה את הנשמה."\n\nהרב קוק ראה גם בחילוניות ביטוי — מעוות — לחיפוש אלוהי עמוק. הוא אמר: "אפילו כשיהודי בורח מה'', הוא בורח אל ה''." אהבתו לכל יהודי, ללא הבדל מגזר, היא מורשת חיה עד היום.',
  'Rabbi Avraham Yitzchak HaKohen Kook, the first Chief Rabbi of the Land of Israel, saw repentance not as punishment — but as healing and repair.\n\n"Orot HaTeshuvah" (Lights of Repentance) is his famous book. In it he writes: "The repentance of the world is the soul of the world. Just as the soul gives life to the body, so repentance gives life to the soul."\n\nRav Kook saw even in secularism an expression — twisted — of a deep divine search. He said: "Even when a Jew flees from God, he flees toward God." His love for every Jew, regardless of background, is a living legacy to this day.',
  'הרב קוק לימד שאין יהודי שאין בו ניצוץ אלוהי — גם אם הוא מכוסה באפר.',
  'Rav Kook taught that there is no Jew without a divine spark — even if it is covered in ash.',
  null, null, null,
  (select id from public.categories where slug = 'tzadikim'),
  (select id from public.rabbis where name_en = 'Rabbi David Lau'),
  current_date - interval '3 days',
  true, 5
),
-- 18. Shalom Bayit 2
(
  'דרכי שלום — "כבד את אביך ואת אמך"',
  'Ways of Peace — "Honor Your Father and Your Mother"',
  '"כבד את אביך ואת אמך" — מצוה חמישית בלוחות הברית, ומה שמגשר בין מצוות שבין אדם למקום לבין מצוות שבין אדם לחברו.\n\nהרב שמשון רפאל הירש מסביר: כיבוד הורים אינו רק הכרת טובה אישית. ההורים הם מתווכים — הם מסרו לנו גוף, נשמה, וחינוך. לכבד אותם — זה לכבד את השרשרת הגדולה של דורות.\n\nכיצד לכבד בפועל? א) לא לסתור את דבריהם בפרהסיה. ב) לדאוג לצרכיהם הגשמיים. ג) לשוחח ולשאול בשלומם. ד) לדבר עליהם בטוב.',
  '"Honor your father and your mother" — the fifth commandment, bridging between commandments between man and God and those between man and his fellow.\n\nRabbi Samson Raphael Hirsch explains: honoring parents is not merely personal gratitude. Parents are intermediaries — they transmitted to us body, soul, and education. To honor them is to honor the great chain of generations.\n\nHow to honor in practice? 1) Do not contradict them in public. 2) Attend to their physical needs. 3) Converse with them and ask about their wellbeing. 4) Speak well of them.',
  'כיבוד הורים הוא גשר בין עבר לעתיד — ובין אדם לאלוהיו.',
  'Honoring parents is a bridge between past and future — and between man and God.',
  null, null, null,
  (select id from public.categories where slug = 'shalom_bayit'),
  (select id from public.rabbis where name_en = 'Rabbanit Yael Shalev'),
  current_date - interval '2 days',
  false, 5
),
-- 19. Parnasa 2
(
  'צדקה — "עשר בשביל שתתעשר"',
  'Tzedaka — "Tithe So That You Shall Become Wealthy"',
  'אחד ממאמרי חז"ל הפרדוקסלים: "עשר בשביל שתתעשר" — תיתן עשירית מרוויחיך לצדקה, ובזכות זה תתעשר.\n\nהרמב"ם מסביר: הצדקה מהווה "חזקה" — ראיה שהאדם מאמין שפרנסתו מה''. מי שנותן מתוך בטחון מקבל בחזרה. אבל יש תנאי: הנתינה צריכה להיות מתוך שמחה.\n\nסוגי צדקה לפי הרמב"ם: הדרגה הגבוהה ביותר היא "מחזיק ביד" — עזרה שתאפשר לאחר להתפרנס בכבוד. נמוכה יותר היא הנתינה מבלי לדעת למי. וכולן עדיפות על לא לתת כלל.',
  'One of the paradoxical sayings of the Sages: "Tithe so that you shall become wealthy" — give a tenth of your earnings to charity, and through this you will become wealthy.\n\nThe Rambam explains: tzedaka serves as "chazaka" — proof that the person believes their livelihood comes from God. One who gives with trust receives back. But there is a condition: the giving must be done with joy.\n\nTypes of tzedaka according to the Rambam: The highest level is "supporting the hand" — help that will allow another to earn a livelihood with dignity. Lower is giving without knowing to whom. And all are better than not giving at all.',
  'נתינה מתוך שמחה היא השקעה הכי טובה שיש.',
  'Giving with joy is the best investment there is.',
  null, null, null,
  (select id from public.categories where slug = 'parnasa'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date - interval '1 day',
  false, 5
),
-- 20. Today's free lesson
(
  'שיעור היום — אהבת ה''',
  'Today''s Lesson — Love of God',
  'ואהבת את ה'' אלהיך בכל לבבך ובכל נפשך ובכל מאדך. מצות אהבת ה'' היא מצות עשה מן התורה.\n\nהרמב"ם מסביר שאהבת ה'' באה מהכרת גדולתו. כשאדם מתבונן בנפלאות הבריאה, בחכמת התורה, ובהשגחת ה'' על חייו — הלב פורץ ממילא לאהבה.\n\nהבעל שם טוב לימד שאהבת ה'' קשורה לשמחה. כשאדם שמח בה'', מכיר בטובותיו, ורואה אותו בכל פינה — האהבה בוערת בלב. התחל היום: מצא שלש דברים שה'' עשה לך הבוקר, ואמור תודה.',
  'And you shall love the Lord your God with all your heart, with all your soul, and with all your might. The commandment to love God is a positive commandment from the Torah.\n\nThe Rambam explains that love of God comes from recognizing His greatness. When a person contemplates the wonders of creation, the wisdom of Torah, and God''s providence — the heart naturally bursts forth with love.\n\nThe Baal Shem Tov taught that love of God is connected to joy. When a person rejoices in God and sees Him in every corner — love burns in the heart. Start today: find three things God did for you this morning, and say thank you.',
  'אהבת ה'' אינה רגש שבא לבד — היא נולדת מתוך הכרה מעמיקה בגדולתו.',
  'Love of God is not an emotion that comes on its own — it is born from deep recognition of His greatness.',
  null, null, null,
  (select id from public.categories where slug = 'emunah'),
  (select id from public.rabbis where name_en = 'Rabbi Yigal Cohen'),
  current_date,
  true, 5
);

-- =================== ACHIEVEMENTS ===================
insert into public.achievements (slug, name_he, name_en, description_he, description_en, icon, condition_type, condition_value)
values
  ('first_lesson',    'שיעור ראשון',    'First Lesson',    'סיימת את השיעור הראשון שלך!',                     'You completed your first lesson!',                    '🌱', 'first_lesson',  1),
  ('streak_7',        'שבוע שלם',       'Full Week',       'למדת שבעה ימים ברצף — כל הכבוד!',                 'You learned seven days in a row — well done!',        '🔥', 'streak',        7),
  ('streak_30',       'חודש מתמיד',     'Diligent Month',  'חודש שלם של לימוד יומי — אתה מתמיד אמיתי!',       'A full month of daily study — you are truly diligent!','⚡', 'streak',        30),
  ('streak_100',      'מאה ימים',       'One Hundred Days','מאה ימים ברצף — הגעת לרמה של מתמידי ישיבה!',     '100 days in a row — you''ve reached yeshiva level!',  '👑', 'streak',        100),
  ('matmid',          'מתמיד',          'Matmid',          'סיימת חמישים שיעורים — אתה מתמיד אמיתי!',         'You completed fifty lessons — a true matmid!',        '📖', 'total_lessons', 50),
  ('mazke_harabbim',  'מזכה הרבים',     'Mazke HaRabbim',  'שיתפת את הפלטפורמה עם חבר — מצוה גדולה!',        'You shared the platform with a friend — great mitzvah!','🌍', 'share',         1);

-- Note: Demo users and their completions/achievements would be seeded via Supabase Auth in a real environment.
-- The profiles table is populated via the handle_new_user() trigger when users sign up.
-- Below is a template for testing (replace UUIDs with actual auth user IDs):

/*
-- After creating test users via Supabase Auth, run:
insert into public.lesson_completions (user_id, lesson_id, completed_at)
select
  '<your-user-id>',
  id,
  now() - (row_number() over (order by lesson_date desc) || ' days')::interval
from public.lessons
limit 10;

insert into public.user_achievements (user_id, achievement_id)
select '<your-user-id>', id from public.achievements where slug in ('first_lesson', 'streak_7');
*/
