// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const homeHtml = `<div id="page-home" class="page active">

  <!-- HERO -->
  <section class="hero">
    <div class="animated-questions" id="animatedQuestions">
      <p class="question-text">נָשָׂאתָ וְנָתַתָּ בֶּאֱמוּנָה?</p>
      <div class="question-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <p class="question-sub">שלוש השאלות שישאלו אותך ביום הדין — תלמוד בבלי, שבת ל״א</p>
    </div>
    <span class="hero-tag">✨ 5 minutes of Torah a day changes everything</span>
    <h1>Time to Torah</h1><p class="hero-subtitle-he">Time to Torah</p>

    <div class="hero-mission">

      <p class="mission-text">
        יש רגע בחיים שבו אדם מרגיש — משהו חסר לי. לא טלפון חדש. לא עוד שעה עבודה.
        משהו עמוק יותר. שקט. שורש. משמעות.
      </p>

      <p class="mission-text" style="color: #F0D878; font-size: 1.15rem; line-height: 2; text-align: center; margin: 1.5rem 0;">
        <strong>שלוש שאלות שהסנהדרין שואל:</strong><br>
        <span style="font-family: 'Noto Serif Hebrew', serif;">נשאת ונתת באמונה?</span> •
        <span style="font-family: 'Noto Serif Hebrew', serif;">קבעת עיתים לתורה?</span> •
        <span style="font-family: 'Noto Serif Hebrew', serif;">ציפית לישועה?</span>
      </p>

      <p class="mission-text">
        זה הרגע שבשבילו נולד עת לתורה.
      </p>

      <p class="mission-text">
        אנחנו מאמינים שכל יהודי — חרדי, דתי, מסורתי, חילוני, צעיר, מבוגר, בישראל או בתפוצות —
        נושא בתוכו ניצוץ של תורה שמחכה להידלק.
        לא צריך רקע. לא צריך ידע מוקדם. לא צריך כיפה.
        רק חמש דקות. רק רצון.
      </p>

      <div class="mission-quote">
        ״כָּל יִשְׂרָאֵל עֲרֵבִים זֶה לָזֶה״
        <span class="mission-quote-src">— סנהדרין כ״ז</span>
      </div>

      <p class="mission-text">
        כשיהודי לומד תורה בתל אביב, ויהודי לומד בניו יורק, ושלישי בפריז ורביעי בבואנוס איירס —
        הם לא לומדים לבד. הם לומדים יחד.
        כל דקת תורה מחברת אותנו — מעל גבולות, מעל מחלוקות, מעל פערים.
        <br><br>
        כל שיעור שאתה מסיים הוא חלק מסינפוניה גדולה של עם שלם שחוזר אל שורשיו.
        ואתה — כן, אתה — חלק ממנה.
      </p>

      <div class="mission-highlight">
        <span class="mission-highlight-icon">🤝</span>
        <div>
          <strong>כל מנוי הופך אותך לשותף בשני דברים בו זמנית:</strong><br>
          לימוד תורה יומי לעצמך — וקיום מצוות צדקה לאחרים.<br>
          <span style="color:#F0D878;font-weight:700;">20% מכל תשלום נתרמים ישירות</span> — לישיבות לומדי תורה או למשפחות נזקקות, לפי בחירתך.
          <br><small style="color:#F0D878;">אתה לא רק לומד. אתה גם נותן.</small>
        </div>
      </div>

      <p class="mission-text" style="font-weight:700;color:#F0D878;font-size:1.1rem;text-align:center;">
        זו לא אפליקציה. זו תנועה של אחדות, תורה וצדקה.<br>והיא מתחילה בך — היום.
      </p>

      <p class="mission-text" style="font-size:1.05rem;font-weight:700;text-align:center;color:#F0D878;border-top:1px solid rgba(201,168,76,0.3);padding-top:1.2rem;margin-top:0.5rem;">
        🌍 המטרה שלנו: להגיע לכל אחד מ-15 מיליון יהודי העולם — כולם, בלי יוצא מן הכלל.
      </p>
      <div style="background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:10px;padding:0.9rem 1.2rem;margin-top:1rem;font-size:0.92rem;color:#F0D878;text-align:center;">
        💛 <strong>5 דקות הוא המינימום — לא התקרה.</strong><br>
        <span style="color:#F0D878;">מי שרוצה ללמוד יותר — ברוך הבא באהבה גדולה. התורה היא ים אין סוף.</span>
      </div>
      <p></p>

    </div>

    <div class="hero-cta">
      <button class="btn-primary" onclick="navigate('subscribe')">Join the Family</button>
      <button class="btn-outline" onclick="navigate('learn')">See a Sample Lesson</button>
    </div>
  </section>

  <!-- STATS BAR -->
  <div class="stats-bar">
    <div class="stats-inner">
      <div class="stat-item">
        <span class="stat-number">12,450</span>
        <span class="stat-label">🕐 דקות תורה החודש</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" id="liveLearners">847</span>
        <span class="stat-label">👥 לומדים פעילים עכשיו</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" id="liveDonated">₪8,920</span>
        <span class="stat-label">💰 תרומות החודש</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" id="liveLessons">2,490</span>
        <span class="stat-label">📚 שיעורים הושלמו</span>
      </div>
    </div>
  </div>

  <!-- CATEGORIES -->
  <section class="section categories-section">
    <div class="section-narrow">
      <h2 class="section-title">בחר את <span>הנושא שלך</span></h2>
      <div class="categories-grid">
        <div class="category-card" onclick="loadLesson('emunah')">
          <span class="category-icon">🌟</span>
          <div class="category-name">אמונה וביטחון</div>
          <div class="category-desc">חיזוק האמונה וביטחון בה׳ בכל מצב</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('parasha')">
          <span class="category-icon">📖</span>
          <div class="category-name">פרשת השבוע</div>
          <div class="category-desc">תובנות עמוקות מפרשת השבוע</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('mussar')">
          <span class="category-icon">📜</span>
          <div class="category-name">מוסר</div>
          <div class="category-desc">שיפור המידות וטוהר הנפש</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('mishna')">
          <span class="category-icon">📚</span>
          <div class="category-name">משנה יומית</div>
          <div class="category-desc">לימוד משנה ממוקד ומובן</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('gemara')">
          <span class="category-icon">📖</span>
          <div class="category-name">גמרא ב-5 דקות</div>
          <div class="category-desc">עמוד גמרא בגישה נגישה</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('tehillim')">
          <span class="category-icon">🙏</span>
          <div class="category-name">תהילים</div>
          <div class="category-desc">כוחם של מזמורי תהילים</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('halacha')">
          <span class="category-icon">🕯️</span>
          <div class="category-name">הלכה יומית</div>
          <div class="category-desc">הלכה למעשה בשפה ברורה</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('tzadikim')">
          <span class="category-icon">👑</span>
          <div class="category-name">סיפורי צדיקים</div>
          <div class="category-desc">סיפורים מעוררי השראה</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('shalom_bayit')">
          <span class="category-icon">🏠</span>
          <div class="category-name">שלום בית</div>
          <div class="category-desc">חיזוק הבית היהודי</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('parnasa')">
          <span class="category-icon">💰</span>
          <div class="category-name">פרנסה ותורה</div>
          <div class="category-desc">הצלחה כלכלית לפי התורה</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card" onclick="loadLesson('chassidut')">
          <span class="category-icon">✨</span>
          <div class="category-name">חסידות</div>
          <div class="category-desc">תורת הבעל שם טוב והחסידות</div>
          <span class="badge-time">5 דק׳</span>
        </div>
        <div class="category-card category-special" onclick="loadTikkunKlali()">
          <span class="category-icon">📿</span>
          <div class="category-name">תיקון הכללי</div>
          <div class="category-desc">י׳ מזמורי תהילים — רבי נחמן מברסלב</div>
          <span class="badge-time">10 דק׳</span>
        </div>
        <div class="category-card category-special" onclick="loadTikkunChatzot()">
          <span class="category-icon">🌙</span>
          <div class="category-name">תיקון חצות</div>
          <div class="category-desc">תפילת חצות הלילה על חורבן הבית</div>
          <span class="badge-time">10 דק׳</span>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- HOW IT WORKS -->
  <section class="section how-section">
    <div class="section-narrow">
      <h2 class="section-title">כיצד <span>זה עובד?</span></h2>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <span class="step-icon">📝</span>
          <div class="step-title">הירשם בחינם</div>
          <div class="step-sub">30 שניות בלבד, ללא כרטיס אשראי</div>
        </div>
        <div class="step-card">
          <div class="step-number">2</div>
          <span class="step-icon">📖</span>
          <div class="step-title">בחר נושא</div>
          <div class="step-sub">10 קטגוריות לבחירה לפי הטעם שלך</div>
        </div>
        <div class="step-card">
          <div class="step-number">3</div>
          <span class="step-icon">✅</span>
          <div class="step-title">למד 5 דקות</div>
          <div class="step-sub">שמור על הרצף שלך ותצמח בכל יום</div>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- PRICING PREVIEW -->
  <section class="section pricing-section">
    <div class="section-narrow">
      <h2 class="section-title">מחירים <span>פשוטים וברורים</span></h2>
      <p style="text-align:center;color:#F0D878;margin-bottom:1.5rem;">כל התוכניות כוללות גישה מלאה — ככל שמתחייבים לזמן ארוך יותר, המחיר יורד.</p>
      <div class="pricing-grid">
        <div class="pricing-card popular">
          <div class="popular-badge">⭐ הכי פופולרי</div>
          <div class="plan-name">חודשי</div>
          <div class="plan-price">₪18.90</div>
          <div class="plan-period">לחודש</div>
          <button class="btn-primary btn-sm" onclick="navigate('subscribe')">הצטרף עכשיו</button>
        </div>
        <div class="pricing-card">
          <div class="savings-badge">חיסכון 21%</div>
          <div class="plan-name">חצי שנתי</div>
          <div class="plan-price">₪89</div>
          <div class="plan-period">ל-6 חודשים</div>
          <button class="btn-primary btn-sm" onclick="navigate('subscribe')">הצטרף עכשיו</button>
        </div>
        <div class="pricing-card">
          <div class="savings-badge">חיסכון 35%</div>
          <div class="plan-name">שנתי</div>
          <div class="plan-price">₪148</div>
          <div class="plan-period">לשנה</div>
          <button class="btn-primary btn-sm" onclick="navigate('subscribe')">הצטרף עכשיו</button>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- TESTIMONIALS -->
  <section class="section testimonials-section">
    <div class="section-narrow">
      <h2 class="section-title">מה אומרים <span>הלומדים?</span></h2>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <p class="testimonial-text">"שינה את הבוקר שלי לגמרי. כל יום מתחיל עכשיו עם 5 דקות תורה מעוררות השראה. אני לא יכול להתחיל את היום בלי זה."</p>
          <div class="testimonial-author">דוד כהן</div>
          <div class="testimonial-location">תל אביב · רצף: 89 ימים</div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-text">"סוף סוף למידה שמתאימה לחיים עמוסים. עם שלושה ילדים ועבודה מלאה, 5 דקות זה בדיוק מה שאני צריכה."</p>
          <div class="testimonial-author">מרים לוי</div>
          <div class="testimonial-location">ירושלים · 234 שיעורים</div>
        </div>
        <div class="testimonial-card">
          <p class="testimonial-text">"הרצף שלי כבר 47 ימים! מעולם לא חשבתי שאוכל לשמור על לימוד יומי קבוע. עת לתורה עשתה את זה פשוט ומהנה."</p>
          <div class="testimonial-author">יוסף אברהם</div>
          <div class="testimonial-location">ניו יורק · 🔥 47 ימים</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">
      <span class="menorah">🕎</span>
      <span class="brand">Time to Torah</span>
    </div>
    <ul class="footer-links">
      <li><a onclick="navigate('home')">בית</a></li>
      <li><a onclick="navigate('learn')">לימוד</a></li>
      <li><a onclick="navigate('subscribe')">מנוי</a></li>
      <li><a onclick="navigate('profile')">פרופיל</a></li>
      <li><a>אודות</a></li>
      <li><a>צור קשר</a></li>
      <li><a>תנאי שימוש</a></li>
    </ul>
    <div class="footer-charity">🤍 20% מכל תשלום נתרמים לצדקה ולתמיכה בתורה</div>
    <div class="footer-copy">© 2024 Time to Torah — עת לתורה. כל הזכויות שמורות.</div>
  </footer>
</div>`;
