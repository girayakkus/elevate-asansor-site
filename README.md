# Elevate Asansör — Kurumsal Web Sitesi

Statik HTML/CSS/JS ile hazırlanmış, build adımı gerektirmeyen tek sayfalık kurumsal site.

## Dosyalar
- `index.html` — tüm sayfa yapısı (13 bölüm: Hero, Sayılarla Biz, Hizmetler, Referans Haritası, Projeler, Neden Biz, Modernizasyon Karşılaştırma, Süreç, Belgeler, Yorumlar, Blog, Teklif CTA, Footer)
- `styles.css` — beyaz/açık tema + mavi vurgu rengi, Barlow Condensed / Inter / JetBrains Mono tipografi
- `script.js` — sayaç animasyonu, referans harita pinleri + filtreler, öncesi/sonrası slider, mobil menü, form

## Vercel'e yayınlama
Build adımı yok, framework preset **"Other"** seçilebilir.

1. Bu klasörü bir Git deposuna (GitHub/GitLab) yükleyin.
2. [vercel.com](https://vercel.com) → **New Project** → deponuzu seçin.
3. Framework Preset: **Other**, Build Command: boş, Output Directory: `.` (kök dizin).
4. **Deploy** deyin — birkaç saniyede yayında.

Alternatif: Vercel CLI ile klasör içinden `vercel` komutunu çalıştırmanız yeterli.

## Değiştirmeniz gerekenler (canlıya almadan önce)
- **Gerçek proje fotoğrafları**: `styles.css` içindeki `.ph-1` … `.ph-7` sınıfları şu an placeholder gradyanlardır (marka dilinde "stok görselden kaçının" ilkesi gereği). Bunları kendi proje fotoğraflarınızla değiştirin: `background:url('images/proje1.jpg') center/cover;`
- **Telefon / WhatsApp / e-posta**: `index.html` içinde `0212 123 45 67`, `wa.me/905551234567`, `info@elevateasansor.com` alanlarını güncelleyin.
- **Referans harita pinleri**: `script.js` → `projects` dizisi. Şehir, proje tipi, kapasite, durak sayısı, yıl ve `x`/`y` (panel üzerinde % konum) bilgilerini kendi projelerinizle değiştirin. Gerçek coğrafi harita isterseniz Google Maps JavaScript API veya Mapbox GL entegre edilebilir (ayrı bir adım olarak önerilir).
- **Teklif formu**: `script.js` içindeki `quoteForm` submit handler şu an sadece bir onay mesajı gösteriyor. Formu bir backend'e (Formspree, Resend, kendi API'niz vb.) bağlamanız gerekiyor.
- **Belgeler bölümü**: `doc-link` href'lerini gerçek PDF dosyalarınızla değiştirin.

## Sonraki adımlar (planda belirtilen ama bu ilk sürümde yer almayan)
- Her hizmet için ayrı sayfa (`/hizmetler/montaj`, `/hizmetler/bakim` vb.) ve şehir bazlı SEO sayfaları
- Proje detay sayfaları (`/projeler/levent-rezidans` vb.)
- Blog altyapısı (şu an sadece kart görünümü statik)
- Canlı servis talebi (opsiyonel)

Bu ek sayfalar için proje büyüdükçe Next.js gibi bir framework'e geçmek isterseniz haber verin, mevcut tasarım dilini koruyarak taşırım.
# elevate-asansor-site
