// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const lessonHtml = `<div id="page-lesson" class="page active">
  <div style="background:var(--parchment);padding:2rem 0;min-height:100vh;">
    <div class="lesson-page">
      <div class="back-btn" onclick="navigate('learn')">← חזרה ללימוד</div>

      <div id="categoryBadge" class="category-badge">🌟 אמונה וביטחון</div>
      <div id="chapterInfo" style="font-size:0.95rem;font-weight:700;color:#F0D878;margin-bottom:0.8rem;display:flex;align-items:center;gap:0.6rem;">
        <span>📖 פרק 1 מתוך 7</span>
        <div id="chapterProgress" style="flex:1;max-width:150px;height:4px;background:rgba(201,168,76,0.2);border-radius:2px;overflow:hidden;"><div style="height:100%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));width:14%;border-radius:2px;transition:width 0.3s;"></div></div>
      </div>
      <h1 id="lessonMainTitle" class="lesson-title" style="font-size:2rem;margin-top:0.75rem;">שער הביטחון — ביאור הרב יגאל כהן</h1>
      <div id="lessonSubtitle" style="font-size:1.1rem;color:#F0D878;margin-top:0.5rem;margin-bottom:1rem;">יסודות אמונה</div>

      <div class="rabbi-card">
        <div class="rabbi-avatar">יכ</div>
        <div class="rabbi-info">
          <div class="name">הרב יגאל כהן שליט״א</div>
          <div class="bio">מגדולי המחזקים בדורנו. מרצה ומחבר בנושאי אמונה, ביטחון ושמחת החיים. שיעוריו מגיעים למיליוני יהודים ברחבי העולם.</div>
        </div>
      </div>

      <div class="lesson-meta" style="margin:1rem 0;">
        <span>⏱️ 5 דקות</span>
        <span>📅 היום</span>
        <span>🏷️ אמונה וביטחון</span>
        <span>📖 פרשת בשלח</span>
      </div>

      <!-- LESSON CONTENT -->
      <div class="lesson-content">
        <p>
          ספר "חובות הלבבות" לרבנו בחיי אבן פקודה מחלק את עבודת ה׳ לשתי שכבות: חובות האיברים — המצוות שבמעשה, וחובות הלבבות — עבודת הנפש הפנימית. שער הביטחון הוא אחד השערים המרכזיים בספר, ועוסק במידה הנעלה ביותר: הסמיכה על ה׳ מתוך אמונה שלמה.
        </p>

        <div class="highlight">
          ״הביטחון הוא שקט הנפש והרגעת הלב, מתוך הכרה ברורה שהקב״ה הוא הדואג לכל צרכיו של האדם״ — רבנו בחיי, שער הביטחון
        </div>

        <p>
          הרב יגאל כהן שליט״א מבאר: אנשים רבים חושבים שביטחון פירושו לא לעשות דבר — לשבת ולחכות שהדברים יסתדרו מעצמם. אך זוהי טעות יסודית. הביטחון האמיתי הוא שאתה עושה את כל השתדלותך — מחפש עבודה, הולך לרופא, מתאמץ בלימודים — אך תוך כדי כך, לבך שקט. כי אתה יודע שהתוצאה אינה בידיך, אלא בידי מי שאמר והיה העולם.
        </p>

        <p>
          רבנו בחיי מונה חמישה יסודות לביטחון: האמונה שהקב״ה רואה הכל, שהוא חפץ בטובתנו, שביכולתו לעשות כל דבר, שחסדו אינו פוסק, ושאנו תחת השגחתו הפרטית בכל רגע. כשחמשת אלה מושרשים בלב — הדאגה נעלמת מאליה.
        </p>

        <div class="highlight">
          ״כשאדם בוטח בה׳ באמת — הוא החופשי היחיד בעולם. כי כל שאר בני האדם עבדים לחששותיהם.״ — הרב יגאל כהן שליט״א
        </div>

        <p>
          מעשה שהיה: תלמיד בא לרבו בפנים עצובות ואמר: ״רבי, אני דואג כל הזמן. מה יהיה עם הפרנסה? מה יהיה עם הבריאות? מה יהיה עם הילדים?״ ענה לו הרב: ״אמור לי — מי דאג לך אתמול?״ אמר התלמיד: ״הקב״ה.״ ״ומי דאג לך שנה שעברה?״ ״הקב״ה.״ ״ואם כן — מדוע אתה חושב שמחר הוא יפסיק?״
        </p>

        <p>
          זהו לב שער הביטחון: הבטחון אינו נבנה מהבטחות עתידיות, אלא מזיכרון העבר. כל פעם שאנו זוכרים את הפעמים שה׳ עזר לנו — מחזקים אנו את שריר הביטחון. לכן אמרו חז״ל ״וזכרת את ה׳ אלוקיך״ — הזיכרון הוא הכלי לבניית הביטחון.
        </p>

        <p>
          <strong>מעשה יומי:</strong> היום, בכל פעם שעולה מחשבת דאגה — עצור לרגע ואמור בלבך: ״מי שדאג לי עד היום, ידאג לי גם מחר.״ חזור על זה שלוש פעמים. זה לא נאיבי — זו עבודת הביטחון.
        </p>
      </div>

      <!-- AUDIO PLAYER -->
      <div class="audio-player-wrapper" style="display:none;">
        <div class="audio-label"></div>
        <audio controls="">
          <source src="" type="audio/mpeg">
        </audio>
      </div>

      <!-- TTS READER -->
      <div class="tts-box" id="ttsBox">
        <div class="tts-header">
          <span class="tts-title">🎙️ הקראה בקול</span>
          <span class="tts-subtitle">האזן לשיעור בדרך — בלי להסתכל במסך</span>
        </div>

        <div class="tts-controls">
          <button class="tts-btn tts-play" id="ttsPlayBtn" onclick="ttsToggle()">
            ▶ התחל הקראה
          </button>
          <button class="tts-btn tts-stop" id="ttsStopBtn" onclick="ttsStop()" style="display:none;">
            ⏹ עצור
          </button>
        </div>

        <div class="tts-progress-row" id="ttsProgress" style="display:none;">
          <div class="tts-progress-bar">
            <div class="tts-progress-fill" id="ttsProgressFill"></div>
          </div>
          <span class="tts-progress-label" id="ttsProgressLabel">מתחיל...</span>
        </div>

        <div class="tts-settings">
          <label class="tts-setting-label">🐢 מהירות קריאה</label>
          <input type="range" id="ttsSpeed" min="0.5" max="1.8" step="0.1" value="0.9" class="tts-speed-slider" oninput="updateTtsSpeed(this.value)">
          <span id="ttsSpeedVal" class="tts-speed-val">0.9×</span>
        </div>

        <div class="tts-lang-row">
          <label class="tts-setting-label">🌐 שפת ההקראה</label>
          <select id="ttsLang" class="tts-lang-select" onchange="ttsChangeLang(this.value)">
            <option value="he-IL">עברית 🇮🇱</option>
            <option value="en-US">English 🇺🇸</option>
            <option value="fr-FR">Français 🇫🇷</option>
            <option value="es-ES">Español 🇦🇷</option>
            <option value="ru-RU">Русский 🇷🇺</option>
          </select>
        </div>

        <div class="tts-tip">
          💡 טיפ: נעל את המסך ושים את הטלפון בכיס — ההקראה תמשיך ברקע
        </div>
      </div>

      <!-- FINISH BUTTON -->
      <div class="finish-btn-wrapper">
        <button class="btn-finish" id="finishBtn" onclick="finishLesson()">
          ✅ סיימתי ללמוד
        </button>
      </div>

      <!-- RELATED LESSONS -->
      <div class="related-lessons">
        <h3 class="section-heading">שיעורים קשורים</h3>
        <div class="related-grid">
          <div class="related-card" onclick="navigate('lesson')">
            <div class="category-badge" style="font-size:0.7rem;padding:3px 10px;margin-bottom:0.5rem;">🌟 אמונה וביטחון</div>
            <div class="related-title">כשהתפילה נראית ריקה — מה עושים?</div>
            <div class="related-meta">הרב אורי שמחה ⏱️ 5 דקות</div>
          </div>
          <div class="related-card" onclick="navigate('lesson')">
            <div class="category-badge" style="font-size:0.7rem;padding:3px 10px;margin-bottom:0.5rem;">🌟 אמונה וביטחון</div>
            <div class="related-title">השגחה פרטית — הקב״ה רואה כל אחד</div>
            <div class="related-meta">הרב דוד אביב ⏱️ 5 דקות</div>
          </div>
          <div class="related-card" onclick="navigate('lesson')">
            <div class="category-badge" style="font-size:0.7rem;padding:3px 10px;margin-bottom:0.5rem;">🌟 אמונה וביטחון</div>
            <div class="related-title">הכרת הטוב — מפתח לאמונה</div>
            <div class="related-meta">הרב יצחק בן דוד ⏱️ 5 דקות</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
