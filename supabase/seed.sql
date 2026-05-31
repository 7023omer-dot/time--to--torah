-- Seed data for Time to Torah / עת לתורה

-- Demo lessons (7 lessons, one per day for a week)
insert into public.lessons (title_he, title_en, content_he, content_en, youtube_id, parasha, category, lesson_date, is_free)
values
(
  'פרשת בראשית - בתחילת הדרך',
  'Parshat Bereishit - In the Beginning',
  'בראשית ברא אלהים את השמים ואת הארץ. מילים אלו, הפותחות את התורה כולה, מלמדות אותנו יסוד גדול: שהעולם כולו נברא במחשבה תחילה. הקב"ה ברא את העולם מאהבה, כדי להיטיב לנבראיו.

חז"ל שואלים: מדוע התורה מתחילה בבראשית ולא במצוה הראשונה? ורש"י מסביר שאם יאמרו אומות העולם לישראל "ליסטים אתם שכבשתם ארצות שבעה גויים", יאמרו להם: כל הארץ של הקב"ה היא, הוא בראה ונתנה לאשר ישר בעיניו.

לימוד לחיים: כשם שהקב"ה ברא את העולם מאהבה, כך עלינו לפעול מתוך אהבה בכל מה שאנו עושים.',
  'The opening words of the Torah, "In the beginning God created the heavens and the earth," teach us a fundamental principle: the entire world was created with forethought. God created the world out of love, to benefit His creations.

The Sages ask: why does the Torah begin with Creation rather than the first commandment? Rashi explains that if the nations of the world say to Israel, "You are thieves who conquered the lands of seven nations," they can respond: the entire earth belongs to God — He created it and gives it to whomever He sees fit.

Life lesson: Just as God created the world with love, so too should we act with love in everything we do.',
  'dQw4w9WgXcQ',
  'בראשית',
  'parasha',
  current_date - interval '6 days',
  true
),
(
  'הלכות שבת - כבוד השבת',
  'Laws of Shabbat - Honoring the Shabbat',
  'זכור את יום השבת לקדשו. מצות זכירת השבת כוללת שני יסודות: זכירה בפה ביום שישי לפני כניסת השבת, וזכירה בלב לאורך כל השבוע.

מרן השולחן ערוך פוסק שמצוה לכבד את השבת בבגדים נאים, בסעודות מכובדות, ובהכנת הבית לכבוד השבת. כבוד השבת מתחיל כבר ביום חמישי, כאשר אנו מתחילים להתכונן לקבלתה.

הרמב"ם מלמד שהמכבד את השבת מקבל שכר רב, שנאמר "אז תתענג על ה'" - ענג שבת הוא מן המעלות הגדולות שבתורה. כיצד נכבד את השבת בביתנו?',
  'Remember the Sabbath day to keep it holy. The commandment to remember the Shabbat includes two elements: verbal remembrance on Friday before Shabbat enters, and constant mindfulness throughout the week.

Maran the Shulchan Aruch rules that it is a mitzvah to honor Shabbat with nice clothing, dignified meals, and preparing the home in honor of Shabbat. This honor begins already on Thursday, as we start preparing to receive it.

The Rambam teaches that one who honors Shabbat receives great reward, as it is said "then you shall delight in God" — the delight of Shabbat is among the greatest virtues in the Torah. How do we honor Shabbat in our homes?',
  null,
  null,
  'halacha',
  current_date - interval '5 days',
  false
),
(
  'עיקרי האמונה - הבטחון בה''',
  'Principles of Faith - Trust in God',
  'בטחון בה'' הוא אחד מיסודות האמונה היהודית. הרבי מסלנים זצ"ל אמר: "בטחון אמיתי אינו רק לדעת שהקב"ה יכול לעזור, אלא לדעת בוודאות שהוא יעזור."

החובות הלבבות מגדיר את הבטחון כ"שקט הנפש מהדאגה לפרנסה ולצרכי הגוף". כשאדם בוטח בה'' הוא אינו מפסיק לפעול, אלא פועל מתוך שלווה ואמונה שהכל בידי שמים.

סיפור מהבעל שם טוב: פעם בא איש עני לפני הבעל שם טוב ואמר לו: "רבי, אין לי מה לאכול." אמר לו הבעל שם טוב: "בטח בה'' ." שאל האיש: "כיצד אבטח כשאין לי לחם?" ענה הבעל שם טוב: "הבטחון בא לפני הלחם - כשיש בטחון, הלחם בא."',
  'Trust in God is one of the foundations of Jewish faith. The Rebbe of Slonim zt"l said: "True trust is not only knowing that God can help, but knowing with certainty that He will help."

Chovot HaLevavot defines trust as "the tranquility of the soul from worry about livelihood and bodily needs." When a person trusts in God, they do not stop acting, but rather act from a place of serenity and faith that everything is in God''s hands.

A story from the Baal Shem Tov: Once a poor man came before the Besht and said: "Rabbi, I have nothing to eat." The Besht told him: "Trust in God." The man asked: "How can I trust when I have no bread?" The Besht replied: "Trust comes before bread — when there is trust, the bread comes."',
  null,
  null,
  'machshava',
  current_date - interval '4 days',
  false
),
(
  'מסכת ברכות - הלכות קריאת שמע',
  'Tractate Berachot - Laws of Kriat Shema',
  'מסכת ברכות, המסכת הראשונה בסדר זרעים, פותחת בשאלה: "מאימתי קורין את שמע בערבית?" שאלה זו מלמדת אותנו שהגמרא אינה עוסקת רק בדינים יבשים, אלא בקשר החי שבין האדם לקונו.

קריאת שמע היא הצהרת האמונה היסודית ביותר בתפילה היהודית: "שמע ישראל ה'' אלהינו ה'' אחד." בזה אנו מכריזים על יחידותו של הקב"ה בעולם ועל קבלת עולו עלינו.

הגמרא מלמדת (ברכות יג ע"א): "כשאתה קורא שמע, כוון לבך לשמים." הכוונה היא תנאי לקיום המצוה כראוי. ברגע של קריאת שמע, כל העולם עומד ומחכה.',
  'Tractate Berachot, the first tractate in Seder Zeraim, opens with the question: "From when do we recite the Shema in the evening?" This question teaches us that the Gemara is not just concerned with dry laws, but with the living relationship between a person and their Creator.

Kriat Shema is the most fundamental declaration of faith in Jewish prayer: "Hear O Israel, the Lord our God, the Lord is One." In this we declare God''s uniqueness in the world and accept His yoke upon ourselves.

The Gemara teaches (Berachot 13a): "When you recite the Shema, direct your heart to heaven." Intention is a prerequisite for fulfilling the commandment properly. At the moment of reciting the Shema, the entire world stands and waits.',
  null,
  null,
  'gemara',
  current_date - interval '3 days',
  false
),
(
  'מסילת ישרים - פרק הזהירות',
  'Mesillat Yesharim - The Chapter on Watchfulness',
  'רמח"ל כותב במסילת ישרים: "יסוד החסידות ושורש העבודה התמימה הוא שיתברר ויתאמת אצל האדם מה חובתו בעולמו."

הזהירות, לפי הרמח"ל, היא הבחינה הראשונה שאדם חייב לעמוד בה: לבחון כל מעשה ומעשה ולשאול - האם זה רצון ה'' ? זהירות אינה חומרה יתרה, אלא ערנות לכל פרט בעבודת ה''.

המוסר מלמד שהשגרה היא האויב הגדול של הזהירות. כשהכל "הולך כרגיל", נכנסת השכחה ועמה הרשלנות. לכן חייב האדם לחדש בכל יום את התשוקה ואת ההתלהבות בעבודת ה''.',
  'The Ramchal writes in Mesillat Yesharim: "The foundation of piety and the root of perfect service is to clarify and authenticate for oneself what one''s obligation is in one''s world."

Watchfulness, according to the Ramchal, is the first quality a person must attain: to examine every action and ask — is this the will of God? Watchfulness is not excessive strictness, but alertness to every detail in Divine service.

Mussar teaches that routine is the great enemy of watchfulness. When everything "goes as usual," forgetfulness sets in, and with it, negligence. Therefore, a person must renew each day the desire and enthusiasm in Divine service.',
  null,
  null,
  'mussar',
  current_date - interval '2 days',
  false
),
(
  'פרשת נח - מה למדנו מנח?',
  'Parshat Noach - What Can We Learn from Noah?',
  'נח היה איש צדיק תמים בדורותיו. חז"ל נחלקו האם שבח זה הוא שבח גמור, שנח היה צדיק אפילו בדור של רשעים, או שזהו שבח מועט - שבדור שפל זה נראה כצדיק.

אנו לומדים מנח שלש מעלות גדולות: ראשית, הצדק - נח שמר על ערכיו בסביבה מושחתת לחלוטין. שנית, האמונה - נח בנה תיבה למשך 120 שנה, גם כשלא ראה גשם. שלישית, הציות - נח קיים כל מה שה'' ציוה.

לאחר המבול, נח הקריב קרבנות ו"ויירח ה'' את ריח הניחוח". הקב"ה הובטח לא להביא מבול עוד. הקשת בענן היא אות ברית עולם, המזכירה לנו שאחרי כל סערה יש שמים.',
  'Noah was a righteous man, perfect in his generations. The Sages debated whether this is complete praise — that Noah was righteous even in a generation of evildoers — or whether it is limited praise, since in such a lowly generation he merely appeared righteous.

We learn from Noah three great virtues: First, righteousness — Noah maintained his values in a completely corrupt environment. Second, faith — Noah built an ark for 120 years, even when he saw no rain. Third, obedience — Noah fulfilled everything that God commanded.

After the flood, Noah offered sacrifices and "God smelled the pleasing aroma." God promised not to bring another flood. The rainbow is a sign of an eternal covenant, reminding us that after every storm there is sky.',
  null,
  'נח',
  'parasha',
  current_date - interval '1 day',
  false
),
(
  'שיעור היום - אהבת ה''',
  'Today''s Lesson - Love of God',
  'ואהבת את ה'' אלהיך בכל לבבך ובכל נפשך ובכל מאדך. מצות אהבת ה'' היא מצות עשה מן התורה, ורבים שואלים: כיצד ניתן לצוות על רגש? הלא האהבה באה מהלב!

הרמב"ם מסביר שאהבת ה'' באה מהכרת גדולתו. כשאדם מתבונן בנפלאות הבריאה, בחכמת התורה, ובהשגחת ה'' על חייו, הלב פורץ ממילא לאהבה. לכן הציווי הוא לעסוק בהכרת ה'', והאהבה תבוא מאליה.

הבעל שם טוב לימד שאהבת ה'' קשורה לשמחה. כשאדם שמח בה'', מכיר בטובותיו, ורואה אותו בכל פינה - האהבה בוערת בלב. התחל היום: מצא שלש דברים שה'' עשה לך הבוקר, ואמור תודה.',
  'And you shall love the Lord your God with all your heart, with all your soul, and with all your might. The commandment to love God is a positive commandment from the Torah, and many ask: how can one be commanded to feel an emotion? Surely love comes from the heart!

The Rambam explains that love of God comes from recognizing His greatness. When a person contemplates the wonders of creation, the wisdom of Torah, and God''s providence over their life, the heart naturally bursts forth with love. Therefore the commandment is to engage in recognizing God, and love will follow naturally.

The Baal Shem Tov taught that love of God is connected to joy. When a person rejoices in God, recognizes His kindnesses, and sees Him in every corner — love burns in the heart. Start today: find three things God did for you this morning, and say thank you.',
  null,
  null,
  'machshava',
  current_date,
  true
);

-- Demo users (in real environment these would be created via Supabase auth)
-- Note: In production, profiles are auto-created via the handle_new_user trigger
-- These are example profile records for testing purposes
-- Real user IDs would come from auth.users

-- Demo donation allocations (linked to existing subscriptions)
-- These would normally be created by the Stripe webhook
-- For seed purposes, we'll create them after subscriptions are set up

-- You can run the following after creating test users and subscriptions:
/*
insert into public.donation_allocations (user_id, subscription_id, stripe_invoice_id, amount_cents, currency, yeshiva_cents, poor_families_cents, payment_date)
values
  ('<user-id>', '<subscription-id>', 'in_demo_001', 1890, 'ILS', 945, 945, now() - interval '30 days'),
  ('<user-id>', '<subscription-id>', 'in_demo_002', 1890, 'ILS', 945, 945, now() - interval '60 days'),
  ('<user-id>', '<subscription-id>', 'in_demo_003', 1890, 'ILS', 945, 945, now() - interval '90 days'),
  ('<user-id>', '<subscription-id>', 'in_demo_004', 1890, 'ILS', 1890, 0, now() - interval '120 days'),
  ('<user-id>', '<subscription-id>', 'in_demo_005', 1890, 'ILS', 0, 1890, now() - interval '150 days');
*/
