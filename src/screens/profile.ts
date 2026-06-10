// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const profileHtml = `<div id="page-profile" class="page active">
  <div style="background:var(--parchment);min-height:100vh;padding:2rem 0;">
    <div class="profile-page">

      <!-- HEADER -->
      <div class="profile-header">
        <div class="avatar-circle">א</div>
        <div>
          <div class="profile-name">אורח</div>
          <div class="profile-email">לא הוזן מייל</div>
        </div>
        <div class="profile-streak" style="text-align:left;">
          <span class="streak-pill">🔥 <span id="profileStreak">0</span> ימי רצף</span>
        </div>
      </div>

      <!-- STATS ROW -->
      <div class="stats-row">
        <div class="stat-card">
          <span class="icon">🔥</span>
          <span class="value" id="profileStreakCard">0</span>
          <span class="label">ימי רצף</span>
        </div>
        <div class="stat-card">
          <span class="icon">📚</span>
          <span class="value">0</span>
          <span class="label">שיעורים הושלמו</span>
        </div>
        <div class="stat-card">
          <span class="icon">⏱️</span>
          <span class="value">0</span>
          <span class="label">דקות נלמדו</span>
        </div>
        <div class="stat-card">
          <span class="icon">💰</span>
          <span class="value">₪0.00</span>
          <span class="label">נתרם</span>
        </div>
      </div>

      <!-- ACHIEVEMENTS -->
      <div class="achievements-section">
        <div class="section-heading">🏅 הישגים</div>
        <div class="achievements-grid">
          <div class="achievement-item earned">
            <span class="ach-icon">🥇</span>
            <div class="ach-name">התחלה ראשונה</div>
            <div class="ach-hint" style="color:#F0D878;">✅ הושג</div>
          </div>
          <div class="achievement-item locked">
            <span class="ach-icon">🔥</span>
            <div class="ach-name">7 ימי רצף</div>
            <div class="ach-hint" style="color:#F0D878;">✅ הושג</div>
          </div>
          <div class="achievement-item locked">
            <span class="ach-icon">⭐</span>
            <div class="ach-name">30 ימי רצף</div>
            <div class="ach-hint" style="color:#F0D878;">✅ הושג</div>
          </div>
          <div class="achievement-item locked">
            <span class="ach-icon">👑</span>
            <div class="ach-name">100 ימי רצף</div>
            <div class="ach-hint">100 ימים נוספים</div>
          </div>
          <div class="achievement-item earned">
            <span class="ach-icon">📚</span>
            <div class="ach-name">מתמיד</div>
            <div class="ach-hint" style="color:#F0D878;">✅ הושג</div>
          </div>
          <div class="achievement-item locked" id="ach-mazke">
            <span class="ach-icon">🌟</span>
            <div class="ach-name">מזכה הרבים</div>
            <div class="ach-hint">שתף שיעור עם חבר</div>
            <div class="share-btns">
              <button class="share-btn whatsapp" onclick="shareWhatsApp()">💬 וואטסאפ</button>
              <button class="share-btn other" onclick="shareOther()">🔗 שתף</button>
            </div>
          </div>
        </div>
      </div>

      <!-- PER-CATEGORY PROGRESS -->
      <div class="achievements-section">
        <div class="section-heading">📊 התקדמות לפי קטגוריה</div>
        <div id="catProgressGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.7rem;"><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">🌟 אמונה וביטחון</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📖 פרשת השבוע</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📜 מוסר</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📚 משנה יומית</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📖 גמרא ב-5 דקות</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">🙏 תהילים</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">🕯️ הלכה יומית</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">👑 סיפורי צדיקים</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">🏠 שלום בית</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">💰 פרנסה ותורה</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">✨ חסידות</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📕 תניא</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">📿 תיקון הכללי</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div><div style="background:rgba(45,10,20,0.6);border:1px solid rgba(201,168,76,0.25);border-radius:10px;padding:0.8rem;">
          <div style="font-size:0.85rem;font-weight:700;color:#F0D878;margin-bottom:0.4rem;">🌙 תיקון חצות</div>
          <div style="font-size:0.78rem;color:#F0D878;margin-bottom:0.4rem;">0/7 שיעורים</div>
          <div style="height:5px;background:rgba(201,168,76,0.2);border-radius:3px;overflow:hidden;"><div style="height:100%;width:0%;background:linear-gradient(90deg,var(--gold-dark),var(--gold));border-radius:3px;"></div></div>
        </div></div>
      </div>

      <!-- SUBSCRIPTION -->
      <div class="subscription-section">
        <div class="section-heading">💎 המנוי שלי</div>
        <div class="sub-card-inner">
          <div>
            <div class="sub-plan-badge">חודשי</div>
            <div class="sub-details">מתחדש ב-15 לינואר 2025</div>
            <div class="sub-details">יעד תרומה: 50/50 &nbsp; <span class="change-link" onclick="navigate('subscribe')">שינוי</span></div>
          </div>
          <div>
            <button class="btn-outline btn-sm" onclick="navigate('subscribe')">שדרג לשנתי</button>
          </div>
        </div>
      </div>

      <!-- REMINDER SETTINGS -->
      <div class="reminder-section">
        <div class="section-heading">🔔 תזכורת יומית</div>
        <p class="reminder-desc">קבל תזכורת כל יום בשעה שתבחר — כדי לא לשכוח את 5 הדקות שלך</p>

        <div class="reminder-card" id="reminderCard">
          <div class="reminder-toggle-row">
            <span class="reminder-label">הפעל תזכורת יומית</span>
            <label class="toggle-switch">
              <input type="checkbox" id="reminderToggle" onchange="toggleReminder(this.checked)">
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div id="reminderOptions" style="display:none;margin-top:1.2rem;">
            <div class="reminder-time-row">
              <label class="reminder-label-sm">⏰ שעת התזכורת</label>
              <input type="time" id="reminderTime" value="07:00" class="time-picker">
              <div class="halacha-note">
                <span class="halacha-icon">📜</span>
                <div>
                  <div class="halacha-text">״קָבַעְתָּ עִתִּים לַתּוֹרָה?״</div>
                  <div class="halacha-source">תלמוד בבלי, שבת ל״א ע״א</div>
                  <div class="halacha-explain">השאלה הראשונה שישאלו כל אדם ביום הדין — האם קבע עת קבועה ללימוד תורה. דווקא הקביעות, אותה שעה שחוזרת כל יום, היא שיוצרת שינוי אמיתי בנפש.</div>
                </div>
              </div>
            </div>

            <div class="reminder-channel-row">
              <label class="reminder-label-sm">📨 אופן התזכורת</label>
              <div class="channel-options">
                <label class="channel-option" id="chanEmail">
                  <input type="radio" name="channel" value="email" checked="" onchange="selectChannel('email')">
                  <span class="channel-icon">✉️</span>
                  <span>מייל</span>
                </label>
                <label class="channel-option" id="chanPush">
                  <input type="radio" name="channel" value="push" onchange="selectChannel('push')">
                  <span class="channel-icon">📱</span>
                  <span>פאלפון</span>
                </label>
                <label class="channel-option" id="chanBoth">
                  <input type="radio" name="channel" value="both" onchange="selectChannel('both')">
                  <span class="channel-icon">🔔</span>
                  <span>שניהם</span>
                </label>
              </div>
            </div>

            <div id="emailInputRow" class="reminder-email-row">
              <input type="email" id="reminderEmail" placeholder="הכנס כתובת מייל" class="reminder-email-input" value="david@example.com">
            </div>

            <button class="btn-primary btn-sm" style="width:100%;margin-top:1rem;" onclick="saveReminder()">
              💾 שמור תזכורת
            </button>
          </div>

          <div id="reminderSaved" style="display:none;text-align:center;padding:1rem 0;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">✅</div>
            <div style="font-weight:700;color:#F0D878;">התזכורת נשמרה!</div>
            <div id="reminderSavedText" style="font-size:0.88rem;color:#F0D878;margin-top:0.3rem;"></div>
            <button class="btn-outline btn-sm" style="margin-top:0.8rem;" onclick="editReminder()">✏️ עריכה</button>
          </div>
        </div>
      </div>

      <!-- FAVORITE CATEGORIES -->
      <div class="favorites-section">
        <div class="section-heading">❤️ הקטגוריות המועדפות</div>
        <div class="progress-bar-wrapper">
          <div class="progress-label"><span>🌟 אמונה וביטחון</span><span class="count">34 שיעורים</span></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 100%;"></div></div>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-label"><span>🕯️ הלכה יומית</span><span class="count">28 שיעורים</span></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 82%;"></div></div>
        </div>
        <div class="progress-bar-wrapper">
          <div class="progress-label"><span>📖 פרשת השבוע</span><span class="count">27 שיעורים</span></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width: 79%;"></div></div>
        </div>
      </div>

    </div>
  </div>
</div>`;
