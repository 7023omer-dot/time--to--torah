// Snapshot of the live site's fully-rendered screen (Phase 1, static, pixel-faithful)
export const subscribeHtml = `<div id="page-subscribe" class="page active">
  <div style="background:var(--parchment);min-height:100vh;padding:3rem 0;">
    <div class="subscribe-page">
      <h1 class="section-title" style="margin-bottom:0.75rem;">בחר את <span>המנוי שלך</span></h1>
      <p style="text-align:center;color:#F0D878;margin-bottom:2.5rem;font-size:0.95rem;">כל מנוי מממן תורה ועזרה לנזקקים</p>

      <!-- CURRENCY SWITCHER -->
      <div class="currency-switcher">
        <button class="currency-btn" id="curr-ILS" onclick="switchCurrency('ILS', this)">₪ ILS</button>
        <button class="currency-btn active" id="curr-USD" onclick="switchCurrency('USD', this)">$ USD</button>
        <button class="currency-btn" id="curr-EUR" onclick="switchCurrency('EUR', this)">€ EUR</button>
        <button class="currency-btn" id="curr-GBP" onclick="switchCurrency('GBP', this)">£ GBP</button>
      </div>

      <!-- מה מקבלים בכל תוכנית -->
      <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:1.5rem 2rem;max-width:700px;margin:0 auto 2rem;text-align:right;">
        <div style="font-weight:700;font-size:1.05rem;color:#F0D878;margin-bottom:0.8rem;">✨ כל התוכניות כוללות את אותו תוכן מלא:</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem 2rem;font-size:0.9rem;color:#F0D878;">
          <span>✅ גישה לכל 10 הקטגוריות</span>
          <span>✅ כל הרבנים והשיעורים</span>
          <span>✅ שמירת רצף יומי</span>
          <span>✅ תגי הישג</span>
          <span>✅ בחירת יעד תרומה</span>
          <span>✅ שיעורים חדשים כל יום</span>
        </div>
        <div style="margin-top:0.8rem;font-size:0.85rem;color:#F0D878;">ההבדל היחיד — מי שמתחייב לזמן ארוך יותר, משלם פחות.</div>
      </div>

      <!-- PRICING CARDS -->
      <div class="pricing-grid" style="max-width:900px;margin:0 auto;">
        <div class="pricing-card popular">
          <div class="popular-badge">⭐ הכי פופולרי</div>
          <div class="plan-name">חודשי</div>
          <div class="plan-price" id="price-monthly">$4.99</div>
          <div class="plan-period" id="period-monthly">לחודש</div>
          <div style="font-size:0.82rem;color:#F0D878;margin:0.5rem 0 1rem;">ללא התחייבות — בטל בכל עת</div>
          <button class="btn-primary btn-sm" onclick="showDonationSelector('monthly')">הצטרף עכשיו</button>
        </div>

        <div class="pricing-card">
          <div class="savings-badge">חיסכון 21%</div>
          <div class="plan-name">חצי שנתי</div>
          <div class="plan-price" id="price-biannual">$23.99</div>
          <div class="plan-period" id="period-biannual">ל-6 חודשים</div>
          <div style="font-size:0.82rem;color:#F0D878;margin:0.5rem 0 1rem;">במקום ₪113.40 — חיסכון של ₪24.40</div>
          <button class="btn-primary btn-sm" onclick="showDonationSelector('biannual')">הצטרף עכשיו</button>
        </div>

        <div class="pricing-card">
          <div class="savings-badge" id="savings-badge">חיסכון 35%</div>
          <div class="plan-name">שנתי</div>
          <div class="plan-price" id="price-annual">$39</div>
          <div class="plan-period" id="period-annual">לשנה</div>
          <div style="font-size:0.82rem;color:#F0D878;margin:0.5rem 0 1rem;" id="savings-text">במקום $59.88 — חיסכון משמעותי</div>
          <button class="btn-primary btn-sm" onclick="showDonationSelector('annual')">הצטרף עכשיו</button>
        </div>
      </div>

      <!-- DONATION SELECTOR -->
      <div id="donationSelector" class="donation-selector" style="display:none;">
        <div class="donation-title">🤍 לאן תופנה תרומתך?</div>
        <div class="donation-options">
          <div class="donation-option" id="don-yeshiva" onclick="selectDonation('yeshiva')">
            <span class="donation-icon">🏛️</span>
            <div class="donation-name">ישיבה</div>
            <div class="donation-desc">תמיכה בלומדי תורה</div>
          </div>
          <div class="donation-option" id="don-families" onclick="selectDonation('families')">
            <span class="donation-icon">👨‍👩‍👧</span>
            <div class="donation-name">משפחות נזקקות</div>
            <div class="donation-desc">עזרה לנזקקים</div>
          </div>
          <div class="donation-option" id="don-split" onclick="selectDonation('split')">
            <span class="donation-icon">⚖️</span>
            <div class="donation-name">50/50</div>
            <div class="donation-desc">חלוקה שווה</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
