// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const learnHtml = `<div id="page-learn" class="page active">
  <div class="learn-hero">
    <div class="featured-lesson-card">
      <div class="category-badge">✨ חסידות</div>
      <h2 class="lesson-title">הבעל שם טוב — ניצוץ אלוקי בכל נפש</h2>
      <div class="rabbi-credit">הרבי מלובביץ׳ זצ"ל</div>
      <div class="lesson-meta">
        <span>⏱️ 5 דקות</span>
        <span>📅 שיעור היום</span>
        <span>🏷️ פרשת בשלח</span>
      </div>
      <p class="lesson-summary">ביאור הרב יגאל כהן שליט״א על שער הביטחון של רבנו בחיי — כיצד להפסיק לדאוג ולחיות בשלווה אמיתית</p>
      <button class="btn-primary" onclick="navigate('lesson')">▶ התחל ללמוד</button>
    </div>

    <div class="streak-display" style="max-width:800px;margin:1.5rem auto 0;">
      <span class="streak-pill">🔥 <span id="learnStreak">7</span> ימי רצף</span>
      <span style="font-size:0.85rem;color:#F0D878;margin-right:0.5rem;">המשך כך! עוד יום אחד לרצף שבועי</span>
    </div>
  </div>

  <section class="section categories-section">
    <div class="section-narrow">
      <h2 class="section-title">כל <span>הקטגוריות</span></h2>

      <!-- SEARCH + FILTER -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:1.5rem;">
        <input id="catSearch" type="text" placeholder="🔍 חפש קטגוריה..." oninput="filterCats()" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(201,168,76,0.4);font-family:'Heebo',sans-serif;font-size:0.9rem;background:var(--bg-card);direction:rtl;min-width:200px;outline:none;box-shadow:var(--shadow-soft);">
        <button onclick="filterCats('done')" id="filterDone" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(201,168,76,0.4);background:var(--bg-card);font-family:'Heebo',sans-serif;font-size:0.85rem;cursor:pointer;">✅ נלמד</button>
        <button onclick="filterCats('all')" id="filterAll" style="padding:8px 16px;border-radius:20px;border:none;background:var(--gold);color:#F0D878;font-family:'Heebo',sans-serif;font-size:0.85rem;cursor:pointer;">הכל</button>
      </div>

      <div class="categories-grid" id="learnCatGrid"><div class="category-card" onclick="loadLesson('emunah')" style="position:relative;">
        
        <span class="category-icon">🌟</span>
        <div class="category-name">אמונה וביטחון</div>
        <div class="category-desc">חיזוק האמונה וביטחון בה׳</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('parasha')" style="position:relative;">
        
        <span class="category-icon">📖</span>
        <div class="category-name">פרשת השבוע</div>
        <div class="category-desc">תובנות עמוקות מפרשת השבוע</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('mussar')" style="position:relative;">
        
        <span class="category-icon">📜</span>
        <div class="category-name">מוסר</div>
        <div class="category-desc">שיפור המידות וטוהר הנפש</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('mishna')" style="position:relative;">
        
        <span class="category-icon">📚</span>
        <div class="category-name">משנה יומית</div>
        <div class="category-desc">לימוד משנה ממוקד ומובן</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('gemara')" style="position:relative;">
        
        <span class="category-icon">📖</span>
        <div class="category-name">גמרא ב-5 דקות</div>
        <div class="category-desc">עמוד גמרא בגישה נגישה</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('tehillim')" style="position:relative;">
        
        <span class="category-icon">🙏</span>
        <div class="category-name">תהילים</div>
        <div class="category-desc">ספר תהילים המלא — מחולק לשבוע</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('halacha')" style="position:relative;">
        
        <span class="category-icon">🕯️</span>
        <div class="category-name">הלכה יומית</div>
        <div class="category-desc">הלכה למעשה בשפה ברורה</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('tzadikim')" style="position:relative;">
        
        <span class="category-icon">👑</span>
        <div class="category-name">סיפורי צדיקים</div>
        <div class="category-desc">סיפורים מעוררי השראה</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('shalom_bayit')" style="position:relative;">
        
        <span class="category-icon">🏠</span>
        <div class="category-name">שלום בית</div>
        <div class="category-desc">חיזוק הבית היהודי</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('parnasa')" style="position:relative;">
        
        <span class="category-icon">💰</span>
        <div class="category-name">פרנסה ותורה</div>
        <div class="category-desc">הצלחה כלכלית לפי התורה</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('chassidut')" style="position:relative;">
        
        <span class="category-icon">✨</span>
        <div class="category-name">חסידות</div>
        <div class="category-desc">תורת הבעל שם טוב והחסידות</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card" onclick="loadLesson('taniah')" style="position:relative;">
        
        <span class="category-icon">📕</span>
        <div class="category-name">תניא</div>
        <div class="category-desc">שני נשמות — אדם בעומקו</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card category-special" onclick="loadTikkunKlali()" style="position:relative;">
        
        <span class="category-icon">📿</span>
        <div class="category-name">תיקון הכללי</div>
        <div class="category-desc">י׳ מזמורים — רבי נחמן מברסלב</div>
        <span class="badge-time">7 פרקים</span>
      </div><div class="category-card category-special" onclick="loadTikkunChatzot()" style="position:relative;">
        
        <span class="category-icon">🌙</span>
        <div class="category-name">תיקון חצות</div>
        <div class="category-desc">תפילת חצות הלילה על חורבן הבית</div>
        <span class="badge-time">7 פרקים</span>
      </div></div>
    </div>
  </section>

  <div class="stats-bar">
    <div class="stats-inner">
      <div class="stat-item"><span class="stat-number">12,450</span><span class="stat-label">🕐 דקות תורה החודש</span></div>
      <div class="stat-item"><span class="stat-number">847</span><span class="stat-label">👥 לומדים פעילים היום</span></div>
      <div class="stat-item"><span class="stat-number">₪8,920</span><span class="stat-label">💰 תרומות החודש</span></div>
      <div class="stat-item"><span class="stat-number">2,490</span><span class="stat-label">📚 שיעורים הושלמו</span></div>
    </div>
  </div>
</div>`;
