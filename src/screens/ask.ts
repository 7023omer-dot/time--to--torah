// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const askHtml = `<div id="page-ask" class="page active">
  <div style="background:var(--parchment);min-height:100vh;padding:2rem 0;">
    <div style="max-width:720px;margin:0 auto;padding:0 1.2rem;">

      <!-- כותרת -->
      <div style="text-align:center;margin-bottom:2rem;">
        <div style="font-size:2.8rem;margin-bottom:0.5rem;">🤖</div>
        <h1 style="font-family:'Frank Ruhl Libre',serif;font-size:2rem;color:#F0D878;margin-bottom:0.4rem;">שאל שאלה בתורה</h1>
        <p style="color:#F0D878;font-size:1rem;">שאל שאלה בהלכה, פרשה, חסידות או כל נושא יהודי — ותקבל הסברים ומקורות</p>
        <div style="background:#FEF5E7;border:1.5px solid #F4D03F;border-radius:var(--radius-sm);padding:0.8rem 1rem;margin-top:1rem;font-size:0.85rem;color:#333;">
          ⚠️ <strong>חשוב:</strong> זו לא תחליף לשאלת רב. לשאלות הלכה מעשית ("האם מותר לי...") צרך ליצור קשר עם רב מסמכות.
        </div>
      </div>

      <!-- API Key setup (חד פעמי) -->
      <div id="askApiSetup" style="display:none;background:var(--bg-card);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.5rem;border:1.5px solid rgba(201,168,76,0.35);box-shadow:var(--shadow-soft);">
        <div style="font-weight:700;margin-bottom:0.5rem;color:#F0D878;">🔑 הגדרת מפתח API</div>
        <p style="color:#F0D878;font-size:0.9rem;margin-bottom:1rem;">כדי להפעיל את ה-AI תצטרך מפתח API מ-Anthropic. ניתן להשיג בחינם בכתובת console.anthropic.com. המפתח נשמר רק אצלך במכשיר.</p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <input type="password" id="apiKeyInput" placeholder="sk-ant-..." style="flex:1;min-width:200px;padding:0.65rem 1rem;border:1.5px solid rgba(201,168,76,0.4);border-radius:var(--radius-sm);font-size:0.95rem;font-family:'Heebo',sans-serif;">
          <button onclick="saveApiKey()" style="background:var(--gold);color:#F0D878;border:none;border-radius:var(--radius-sm);padding:0.65rem 1.4rem;font-family:'Heebo',sans-serif;font-size:0.95rem;font-weight:700;cursor:pointer;">שמור</button>
        </div>
      </div>

      <!-- טופס שאלה -->
      <div style="background:var(--bg-card);border-radius:var(--radius);padding:1.5rem;margin-bottom:1.5rem;border:1.5px solid rgba(201,168,76,0.35);box-shadow:var(--shadow-soft);">

        <!-- נושא -->
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
          <button class="ask-topic-btn active" onclick="setAskTopic(this,'הלכה')">⚖️ הלכה</button>
          <button class="ask-topic-btn" onclick="setAskTopic(this,'פרשת השבוע')">📖 פרשה</button>
          <button class="ask-topic-btn" onclick="setAskTopic(this,'חסידות')">✨ חסידות</button>
          <button class="ask-topic-btn" onclick="setAskTopic(this,'תפילה')">🙏 תפילה</button>
          <button class="ask-topic-btn" onclick="setAskTopic(this,'מחשבה')">💭 מחשבה</button>
        </div>

        <textarea id="askQuestion" placeholder="כתוב כאן את שאלתך... למשל: ״האם מותר לשלוח הודעה בשבת בשעה מוגדרת מראש?״" style="width:100%;min-height:110px;padding:1rem;border:1.5px solid rgba(201,168,76,0.35);border-radius:var(--radius-sm);font-family:'Heebo',sans-serif;font-size:1rem;direction:rtl;resize:vertical;color:#F0D878;background:#1E0610;outline:none;" onkeydown="if(event.ctrlKey&amp;&amp;event.key==='Enter')askSend()"></textarea>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.75rem;flex-wrap:wrap;gap:0.5rem;">
          <span style="font-size:0.82rem;color:#F0D878;">Ctrl+Enter לשליחה</span>
          <button onclick="askSend()" id="askSendBtn" style="background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:#F0D878;border:none;border-radius:var(--radius-sm);padding:0.7rem 2rem;font-family:'Heebo',sans-serif;font-size:1rem;font-weight:700;cursor:pointer;transition:opacity 0.2s;">שלח שאלה ✨</button>
        </div>
      </div>

      <!-- תשובה -->
      <div id="askAnswerBox" style="display:none;background:var(--bg-card);border-radius:var(--radius);padding:1.5rem;border:1.5px solid rgba(201,168,76,0.5);box-shadow:var(--shadow-gold);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <div style="font-weight:700;color:#F0D878;font-size:1.05rem;">📜 תשובה</div>
          <button onclick="askClear()" style="background:none;border:1px solid rgba(201,168,76,0.4);border-radius:20px;padding:3px 12px;font-size:0.78rem;color:#F0D878;cursor:pointer;font-family:'Heebo',sans-serif;">שאלה חדשה</button>
        </div>
        <div id="askAnswerText" style="line-height:1.9;color:#F0D878;font-size:1rem;white-space:pre-wrap;direction:rtl;"></div>
        <div id="askSources" style="margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(201,168,76,0.2);font-size:0.85rem;color:#F0D878;"></div>
      </div>

      <!-- Loading -->
      <div id="askLoading" style="display:none;text-align:center;padding:2rem;">
        <div style="font-size:2rem;margin-bottom:0.5rem;animation:pulse 1.5s infinite;">📖</div>
        <div style="color:#F0D878;">מחפש במקורות...</div>
      </div>

      <!-- שאלות לדוגמה -->
      <div style="margin-top:2rem;">
        <div style="font-weight:700;color:#F0D878;margin-bottom:0.75rem;font-size:0.9rem;">💡 שאלות לדוגמה:</div>
        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          <button onclick="setAskExample(this)" class="ask-example-btn">האם מותר לאכול לפני תפילת שחרית?</button>
          <button onclick="setAskExample(this)" class="ask-example-btn">מה ההבדל בין בינוני לרשע בתניא?</button>
          <button onclick="setAskExample(this)" class="ask-example-btn">למה דוד המלך כתב תהילים?</button>
          <button onclick="setAskExample(this)" class="ask-example-btn">מה פירוש ״ואהבת לרעך כמוך״ לפי הבעל שם טוב?</button>
        </div>
      </div>

    </div>
  </div>
</div>`;
