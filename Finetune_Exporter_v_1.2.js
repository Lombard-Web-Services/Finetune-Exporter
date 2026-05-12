// ==UserScript==
// @name         Finetune Exporter - Exporteur Universel
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Exporte conversations de ChatGPT, Gemini, DeepSeek, Grok, Claude, Copilot, Cohere, Mistral, Kimi, DeepInfra, DeepAI, Meta AI, Qwen, Perplexity, LinkedIn. Formats: JSON, JSONL, ShareGPT, Alpaca, Markdown, TXT, CSV, HTML.
// @author       Thibaut LOMBARD (@lombardweb) Helped with TRAE Generated content and DeepSeek, Orchestration on MOULT-AI Enterprise
// @match        https://chatgpt.com/*
// @match        https://gemini.google.com/*
// @match        https://gemini.google.com/app/*
// @match        https://chat.deepseek.com/*
// @match        https://x.com/i/grok*
// @match        https://grok.com/*
// @match        https://claude.ai/*
// @match        https://copilot.microsoft.com/*
// @match        https://dashboard.cohere.com/*
// @match        https://chat.mistral.ai/*
// @match        https://www.perplexity.ai/*
// @match        https://kimi.com/*
// @match        https://www.kimi.com/*
// @match        https://kimi.ai/*
// @match        https://www.kimi.ai/*
// @match        https://kimi.moonshot.cn/*
// @match        https://deepinfra.com/*
// @match        https://deepai.org/*
// @match        https://www.meta.ai/*
// @match        https://chat.qwen.ai/*
// @match        https://www.linkedin.com/messaging/*
// @match        https://openrouter.ai/chat*
// @run-at       document-idle
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @homepageURL  https://github.com/Lombard-Web-Services/Finetune-Exporter
// @supportURL   https://github.com/Lombard-Web-Services/Finetune-Exporter/issues
// @downloadURL  https://raw.githubusercontent.com/Lombard-Web-Services/Finetune-Exporter/refs/heads/main/Finetune_Exporter_v_1.2.js
// @updateURL    https://raw.githubusercontent.com/Lombard-Web-Services/Finetune-Exporter/refs/heads/main/Finetune_Exporter_v_1.2.js
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 1. TRADUCTION (22 LANGUES) ====================
    const LANGUAGE_LIST = [
        { code: 'en', name: 'English (UK)', flag: '🇬🇧', nativeName: 'English' },
        { code: 'us', name: 'American English', flag: '🇺🇸', nativeName: 'English' },
        { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
        { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
        { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
        { code: 'ma', name: 'الدارجة', flag: '🇲🇦', nativeName: 'الدارجة' },
        { code: 'am', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ' },
        { code: 'he', name: 'עברית', flag: '🇮🇱', nativeName: 'עברית' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
        { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
        { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
        { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
        { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', nativeName: 'Ελληνικά' },
        { code: 'sv', name: 'Svenska', flag: '🇸🇪', nativeName: 'Svenska' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', nativeName: 'हिन्दी' },
        { code: 'fa', name: 'فارسی', flag: '🇮🇷', nativeName: 'فارسی' },
        { code: 'uk', name: 'Українська', flag: '🇺🇦', nativeName: 'Українська' },
        { code: 'th', name: 'ไทย', flag: '🇹🇭', nativeName: 'ไทย' }
    ];

    const translations = {
        'en': { 'export': 'Export', 'exporting': 'Exporting...', 'exportSuccess': 'Export successful!', 'exportFailed': 'Export failed', 'history': 'Export History', 'close': 'Close', 'clear': 'Clear', 'downloadJSON': 'Download JSON', 'noHistory': 'No exports yet', 'id': 'ID', 'title': 'Title', 'source': 'Source', 'date': 'Date/Time', 'format': 'Format', 'filename': 'Filename', 'language': 'Language' },
        'us': { 'export': 'Export', 'exporting': 'Exporting...', 'exportSuccess': 'Export successful!', 'exportFailed': 'Export failed', 'history': 'Export History', 'close': 'Close', 'clear': 'Clear', 'downloadJSON': 'Download JSON', 'noHistory': 'No exports yet', 'id': 'ID', 'title': 'Title', 'source': 'Source', 'date': 'Date/Time', 'format': 'Format', 'filename': 'Filename', 'language': 'Language' },
        'fr': { 'export': 'Exporter', 'exporting': 'Export en cours...', 'exportSuccess': 'Export réussi !', 'exportFailed': 'Échec de l\'export', 'history': 'Historique', 'close': 'Fermer', 'clear': 'Effacer', 'downloadJSON': 'Télécharger JSON', 'noHistory': 'Aucun export', 'id': 'ID', 'title': 'Titre', 'source': 'Source', 'date': 'Date', 'format': 'Format', 'filename': 'Fichier', 'language': 'Langue' },
        'es': { 'export': 'Exportar', 'exporting': 'Exportando...', 'exportSuccess': '¡Exportación exitosa!', 'exportFailed': 'Error de exportación', 'history': 'Historial', 'close': 'Cerrar', 'clear': 'Limpiar', 'downloadJSON': 'Descargar JSON', 'noHistory': 'Sin exportaciones', 'id': 'ID', 'title': 'Título', 'source': 'Fuente', 'date': 'Fecha', 'format': 'Formato', 'filename': 'Archivo', 'language': 'Idioma' },
        'de': { 'export': 'Exportieren', 'exporting': 'Exportiere...', 'exportSuccess': 'Export erfolgreich!', 'exportFailed': 'Export fehlgeschlagen', 'history': 'Verlauf', 'close': 'Schließen', 'clear': 'Löschen', 'downloadJSON': 'JSON herunterladen', 'noHistory': 'Keine Exporte', 'id': 'ID', 'title': 'Titel', 'source': 'Quelle', 'date': 'Datum', 'format': 'Format', 'filename': 'Dateiname', 'language': 'Sprache' },
        'zh': { 'export': '导出', 'exporting': '导出中...', 'exportSuccess': '导出成功！', 'exportFailed': '导出失败', 'history': '历史记录', 'close': '关闭', 'clear': '清空', 'downloadJSON': '下载JSON', 'noHistory': '暂无导出记录', 'id': 'ID', 'title': '标题', 'source': '来源', 'date': '日期', 'format': '格式', 'filename': '文件名', 'language': '语言' },
        'ar': { 'export': 'تصدير', 'exporting': 'جاري التصدير...', 'exportSuccess': 'تم التصدير بنجاح!', 'exportFailed': 'فشل التصدير', 'history': 'السجل', 'close': 'إغلاق', 'clear': 'مسح', 'downloadJSON': 'تحميل JSON', 'noHistory': 'لا توجد صادرات', 'id': 'المعرف', 'title': 'العنوان', 'source': 'المصدر', 'date': 'التاريخ', 'format': 'التنسيق', 'filename': 'اسم الملف', 'language': 'اللغة' },
        'ma': { 'export': 'صدّار', 'exporting': 'كاين التصدير...', 'exportSuccess': 'التبيان تم بنجاح!', 'exportFailed': 'التبيان فشل', 'history': 'تاريخ التبيانات', 'close': 'سد', 'clear': 'نظف', 'downloadJSON': 'حمل JSON', 'noHistory': 'ما كاين حتى تبيان', 'id': 'المعرف', 'title': 'العنوان', 'source': 'المصدر', 'date': 'التاريخ', 'format': 'التنسيق', 'filename': 'سمية الملف', 'language': 'اللوغة' },
        'am': { 'export': 'ⴰⵡⵙⵉ', 'exporting': 'ⴰⵡⵙⵉ ⴷⴰⵔ...', 'exportSuccess': 'ⴰⵡⵙⵉ ⵉⵇⵇⵉⵎ ⵉⵍⴽⵎ!', 'exportFailed': 'ⴰⵡⵙⵉ ⵉⵏⵓⴼⴰⵄ', 'history': 'ⴰⵎⵣⵔⵓⵢ', 'close': 'ⵔⵖⴰⵍ', 'clear': 'ⵙⴼⵔⵓ', 'downloadJSON': 'ⴰⵡⵙⵉ JSON', 'noHistory': 'ⵓⵔ ⵉⵍⵍⵉ ⵓⵡⵙⵉ', 'id': 'ⴰⵏⵣⵡⵉ', 'title': 'ⴰⵣⵡⵍ', 'source': 'ⴰⵙⴰⴳⵎ', 'date': 'ⴰⵙⴰⴽⵓⴷ', 'format': 'ⴰⵏⴰⵡ', 'filename': 'ⵉⵙⵎ ⵏ ⵓⴼⴰⵢⵍⵓ', 'language': 'ⵜⵓⵜⵍⴰⵢⵜ' },
        'he': { 'export': 'ייצוא', 'exporting': 'מייצא...', 'exportSuccess': 'הייצוא בוצע בהצלחה!', 'exportFailed': 'הייצוא נכשל', 'history': 'היסטוריה', 'close': 'סגור', 'clear': 'נקה', 'downloadJSON': 'הורד JSON', 'noHistory': 'אין ייצוא', 'id': 'מזהה', 'title': 'כותרת', 'source': 'מקור', 'date': 'תאריך', 'format': 'פורמט', 'filename': 'שם קובץ', 'language': 'שפה' },
        'ru': { 'export': 'Экспорт', 'exporting': 'Экспорт...', 'exportSuccess': 'Экспорт успешен!', 'exportFailed': 'Ошибка экспорта', 'history': 'История', 'close': 'Закрыть', 'clear': 'Очистить', 'downloadJSON': 'Скачать JSON', 'noHistory': 'Нет экспортов', 'id': 'ID', 'title': 'Название', 'source': 'Источник', 'date': 'Дата', 'format': 'Формат', 'filename': 'Имя файла', 'language': 'Язык' },
        'ja': { 'export': 'エクスポート', 'exporting': 'エクスポート中...', 'exportSuccess': 'エクスポート成功！', 'exportFailed': 'エクスポート失敗', 'history': '履歴', 'close': '閉じる', 'clear': 'クリア', 'downloadJSON': 'JSONダウンロード', 'noHistory': '履歴なし', 'id': 'ID', 'title': 'タイトル', 'source': 'ソース', 'date': '日時', 'format': '形式', 'filename': 'ファイル名', 'language': '言語' },
        'ko': { 'export': '내보내기', 'exporting': '내보내는 중...', 'exportSuccess': '내보내기 성공!', 'exportFailed': '내보내기 실패', 'history': '기록', 'close': '닫기', 'clear': '지우기', 'downloadJSON': 'JSON 다운로드', 'noHistory': '내보내기 기록 없음', 'id': 'ID', 'title': '제목', 'source': '소스', 'date': '날짜', 'format': '형식', 'filename': '파일명', 'language': '언어' },
        'pt': { 'export': 'Exportar', 'exporting': 'Exportando...', 'exportSuccess': 'Exportação bem-sucedida!', 'exportFailed': 'Falha na exportação', 'history': 'Histórico', 'close': 'Fechar', 'clear': 'Limpar', 'downloadJSON': 'Baixar JSON', 'noHistory': 'Nenhuma exportação', 'id': 'ID', 'title': 'Título', 'source': 'Fonte', 'date': 'Data', 'format': 'Formato', 'filename': 'Arquivo', 'language': 'Idioma' },
        'it': { 'export': 'Esporta', 'exporting': 'Esportazione in corso...', 'exportSuccess': 'Esportazione riuscita!', 'exportFailed': 'Esportazione fallita', 'history': 'Cronologia', 'close': 'Chiudi', 'clear': 'Cancella', 'downloadJSON': 'Scarica JSON', 'noHistory': 'Nessuna esportazione', 'id': 'ID', 'title': 'Titolo', 'source': 'Fonte', 'date': 'Data', 'format': 'Formato', 'filename': 'File', 'language': 'Lingua' },
        'el': { 'export': 'Εξαγωγή', 'exporting': 'Εξαγωγή...', 'exportSuccess': 'Επιτυχής εξαγωγή!', 'exportFailed': 'Αποτυχία εξαγωγής', 'history': 'Ιστορικό', 'close': 'Κλείσιμο', 'clear': 'Εκκαθάριση', 'downloadJSON': 'Λήψη JSON', 'noHistory': 'Δεν υπάρχουν εξαγωγές', 'id': 'ID', 'title': 'Τίτλος', 'source': 'Πηγή', 'date': 'Ημερομηνία', 'format': 'Μορφή', 'filename': 'Όνομα αρχείου', 'language': 'Γλώσσα' },
        'sv': { 'export': 'Exportera', 'exporting': 'Exporterar...', 'exportSuccess': 'Export lyckades!', 'exportFailed': 'Export misslyckades', 'history': 'Historik', 'close': 'Stäng', 'clear': 'Rensa', 'downloadJSON': 'Ladda ner JSON', 'noHistory': 'Inga exporter', 'id': 'ID', 'title': 'Titel', 'source': 'Källa', 'date': 'Datum', 'format': 'Format', 'filename': 'Filnamn', 'language': 'Språk' },
        'tr': { 'export': 'Dışa Aktar', 'exporting': 'Dışa aktarılıyor...', 'exportSuccess': 'Dışa aktarma başarılı!', 'exportFailed': 'Dışa aktarma başarısız', 'history': 'Geçmiş', 'close': 'Kapat', 'clear': 'Temizle', 'downloadJSON': 'JSON indir', 'noHistory': 'Henüz dışa aktarma yok', 'id': 'ID', 'title': 'Başlık', 'source': 'Kaynak', 'date': 'Tarih', 'format': 'Biçim', 'filename': 'Dosya adı', 'language': 'Dil' },
        'hi': { 'export': 'निर्यात', 'exporting': 'निर्यात हो रहा है...', 'exportSuccess': 'निर्यात सफल!', 'exportFailed': 'निर्यात विफल', 'history': 'इतिहास', 'close': 'बंद करें', 'clear': 'साफ़ करें', 'downloadJSON': 'JSON डाउनलोड करें', 'noHistory': 'कोई निर्यात नहीं', 'id': 'आईडी', 'title': 'शीर्षक', 'source': 'स्रोत', 'date': 'तारीख', 'format': 'प्रारूप', 'filename': 'फ़ाइल नाम', 'language': 'भाषा' },
        'fa': { 'export': 'خروجی', 'exporting': 'در حال خروجی‌گیری...', 'exportSuccess': 'خروجی با موفقیت انجام شد!', 'exportFailed': 'خروجی ناموفق بود', 'history': 'تاریخچه', 'close': 'بستن', 'clear': 'پاک کردن', 'downloadJSON': 'دانلود JSON', 'noHistory': 'هنوز خروجی وجود ندارد', 'id': 'شناسه', 'title': 'عنوان', 'source': 'منبع', 'date': 'تاریخ', 'format': 'فرمت', 'filename': 'نام فایل', 'language': 'زبان' },
        'uk': { 'export': 'Експорт', 'exporting': 'Експорт...', 'exportSuccess': 'Експорт успішний!', 'exportFailed': 'Помилка експорту', 'history': 'Історія', 'close': 'Закрити', 'clear': 'Очистити', 'downloadJSON': 'Завантажити JSON', 'noHistory': 'Ще немає експортів', 'id': 'ID', 'title': 'Назва', 'source': 'Джерело', 'date': 'Дата', 'format': 'Формат', 'filename': 'Ім\'я файлу', 'language': 'Мова' },
        'th': { 'export': 'ส่งออก', 'exporting': 'กำลังส่งออก...', 'exportSuccess': 'ส่งออกสำเร็จ!', 'exportFailed': 'ส่งออกล้มเหลว', 'history': 'ประวัติ', 'close': 'ปิด', 'clear': 'ล้าง', 'downloadJSON': 'ดาวน์โหลด JSON', 'noHistory': 'ไม่มีประวัติการส่งออก', 'id': 'รหัส', 'title': 'ชื่อเรื่อง', 'source': 'แหล่งที่มา', 'date': 'วันที่', 'format': 'รูปแบบ', 'filename': 'ชื่อไฟล์', 'language': 'ภาษา' }
    };

    // Récupérer la langue sauvegardée ou utiliser celle du navigateur
    const getStoredLanguage = () => {
        const stored = GM_getValue('selected_language', null);
        if (stored && LANGUAGE_LIST.some(l => l.code === stored)) return stored;
        const browserLang = (navigator.language || 'en').split('-')[0];
        if (LANGUAGE_LIST.some(l => l.code === browserLang)) return browserLang;
        return 'en';
    };

    let currentLang = getStoredLanguage();
    const t = (key) => translations[currentLang]?.[key] || translations['en'][key] || key;

    // Fonction pour changer la langue
    const setLanguage = (langCode) => {
        if (LANGUAGE_LIST.some(l => l.code === langCode)) {
            currentLang = langCode;
            GM_setValue('selected_language', langCode);
            // Mettre à jour l'interface
            const button = document.querySelector('.ai-export-drag-box');
            if (button) {
                const span = button.querySelector('span');
                if (span) span.textContent = t('export');
            }
            // Re-créer le menu si nécessaire
            const floatingBtn = window.__floatingButton;
            if (floatingBtn && floatingBtn.menu) {
                floatingBtn.recreateMenu();
            }
        }
    };

    // ==================== 2. UTILITAIRES DOM ====================
    const dom = {
        createElement: (tag, options = {}) => {
            const el = document.createElement(tag);
            if (options.html) el.innerHTML = options.html;
            if (options.text) el.textContent = options.text;
            if (options.className) el.className = options.className;
            if (options.style) Object.assign(el.style, options.style);
            return el;
        },
        download: (content, filename, mime = 'text/plain') => {
            const blob = new Blob([content], { type: `${mime};charset=utf-8` });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
        },
        sanitizeTitle: (title) => {
            if (!title || title === 'Conversation' || title === 'ChatGPT_Chat' || title === 'New chat' || title === '未命名会话') return 'conversation';
            let cleaned = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            cleaned = cleaned.replace(/[\\/:*?"<>|.,;!@#$%^&()+=~`\s]+/g, '_');
            cleaned = cleaned.replace(/_+$/, '').substring(0, 60);
            return cleaned || 'conversation';
        },
        waitForElement: (selector, timeout = 15000) => {
            return new Promise((resolve) => {
                const startTime = Date.now();
                const checkInterval = setInterval(() => {
                    const el = document.querySelector(selector);
                    if (el) {
                        clearInterval(checkInterval);
                        resolve(el);
                    } else if (Date.now() - startTime > timeout) {
                        clearInterval(checkInterval);
                        resolve(null);
                    }
                }, 500);
            });
        },
        log: (msg, data = null) => {
            if (data) console.log(`[Exporteur] ${msg}`, data);
            else console.log(`[Exporteur] ${msg}`);
        }
    };

    // ==================== 3. HTML -> MARKDOWN ====================
    const markdown = {
        convert: (htmlContent) => {
            if (!htmlContent) return '';
            const normalize = (s) => (s || '')
                .replace(/&amp;/g, '&')
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            if (typeof htmlContent === 'string') {
                const stripped = htmlContent.replace(/<[^>]*>/g, '');
                return normalize(stripped);
            }

            if (htmlContent.nodeType === Node.TEXT_NODE) return normalize(htmlContent.textContent || '');

            try {
                const root = (htmlContent.nodeType ? htmlContent : null);
                if (!root) return '';
                const clone = root.cloneNode(true);

                clone.querySelectorAll?.(
                    'script, style, .katex-html, mjx-container, [data-radix-scroll-area-viewport], [data-thumb], [class*="button"], [class*="action"], button, .icon-button, .simple-button'
                ).forEach(el => el.remove());

                clone.querySelectorAll?.('a').forEach(link => {
                    const href = link.getAttribute('href') || '';
                    const txt = (link.textContent || '').trim();
                    link.replaceWith(document.createTextNode(href ? `[${txt}](${href})` : txt));
                });
                clone.querySelectorAll?.('img').forEach(img => {
                    const src = img.getAttribute('src') || '';
                    const alt = img.getAttribute('alt') || '';
                    img.replaceWith(document.createTextNode(src ? `![${alt}](${src})` : alt));
                });
                clone.querySelectorAll?.('strong, b').forEach(b => b.replaceWith(document.createTextNode(`**${b.textContent || ''}**`)));
                clone.querySelectorAll?.('em, i').forEach(i => i.replaceWith(document.createTextNode(`*${i.textContent || ''}*`)));
                clone.querySelectorAll?.('code, pre code').forEach(code => code.replaceWith(document.createTextNode(`\`${code.textContent || ''}\``)));
                clone.querySelectorAll?.('br').forEach(br => br.replaceWith(document.createTextNode('\n')));
                clone.querySelectorAll?.('p').forEach(p => p.replaceWith(document.createTextNode(`\n${p.textContent || ''}\n`)));
                clone.querySelectorAll?.('h1, h2, h3, h4, h5, h6').forEach(h => {
                    const level = h.tagName[1];
                    h.replaceWith(document.createTextNode(`\n${'#'.repeat(parseInt(level))} ${h.textContent || ''}\n`));
                });

                return normalize(clone.textContent || '');
            } catch {
                return normalize(htmlContent.textContent || '');
            }
        }
    };

    // ==================== 4. DÉTECTION PLATEFORME ====================
    function detectPlatform() {
        const url = window.location.href;
        let host = '';
        try { host = new URL(url).hostname; } catch { host = window.location.hostname; }

        if (host === 'chatgpt.com') return 'chatgpt';
        if (host === 'gemini.google.com') return 'gemini';
        if (host === 'chat.deepseek.com') return 'deepseek';
        if (host === 'grok.com') return 'grok';
        if (host === 'x.com' && url.includes('/i/grok')) return 'grok_x';
        if (host === 'claude.ai') return 'claude';
        if (host === 'copilot.microsoft.com') return 'copilot';
        if (host === 'dashboard.cohere.com') return 'cohere';
        if (host === 'chat.mistral.ai') return 'mistral';
        if (host.endsWith('perplexity.ai')) return 'perplexity';
        if (host === 'kimi.com' || host === 'www.kimi.com' || host === 'kimi.ai' || host === 'www.kimi.ai' || host.endsWith('moonshot.cn')) return 'kimi';
        if (host === 'deepinfra.com' || host === 'www.deepinfra.com') return 'deepinfra';
        if (host === 'deepai.org' || host === 'www.deepai.org') return 'deepai';
        if (host.endsWith('meta.ai')) return 'meta';
        if (host === 'chat.qwen.ai') return 'qwen';
        if (host === 'www.linkedin.com' && url.includes('/messaging/')) return 'linkedin';
        if (host === 'openrouter.ai' && url.includes('/chat')) return 'openrouter';
        return null;
    }

    // ==================== 5. GESTIONNAIRES DE PLATEFORMES ====================
    const platformHandlers = {
        chatgpt: {
            getMessages: () => {
                const msgs = document.querySelectorAll('[data-message-author-role="user"], [data-message-author-role="assistant"]');
                const pairs = [];
                for (let i = 0; i < msgs.length; i += 2) {
                    if (msgs[i] && msgs[i + 1]) pairs.push({ user: msgs[i], assistant: msgs[i + 1] });
                }
                return pairs;
            },
            getTitle: () => document.querySelector('nav a[aria-current="page"] span.truncate')?.textContent || document.title.replace('ChatGPT', '').trim() || 'ChatGPT_Chat'
        },
        gemini: {
            getMessages: () => {
                const users = document.querySelectorAll('user-query-content, .user-query');
                const assistants = document.querySelectorAll('model-response, .model-response');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => document.querySelector('.conversation-title, .title')?.textContent || 'Gemini_Chat'
        },
        deepseek: {
            getMessages: () => {
                let pairs = [];
                const msgs = document.querySelectorAll('[data-role="user"], [data-role="assistant"], .ds-message');
                for (let i = 0; i < msgs.length; i += 2) {
                    if (msgs[i] && msgs[i + 1]) pairs.push({ user: msgs[i], assistant: msgs[i + 1] });
                }
                if (pairs.length === 0) {
                    const users = document.querySelectorAll('.user-message, [class*="user"]');
                    const assistants = document.querySelectorAll('.assistant-message, [class*="assistant"]');
                    for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                        if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                    }
                }
                return pairs;
            },
            getTitle: () => document.title?.replace('DeepSeek', '').trim() || 'DeepSeek_Chat'
        },
        grok: {
            lazyLoad: true,
            getScrollContainer: () => {
                // Pour Grok.com
                const candidates = [
                    document.querySelector('[data-radix-scroll-area-viewport]'),
                    document.querySelector('.overflow-y-auto'),
                    document.querySelector('main'),
                    document.querySelector('[role="main"]'),
                    document.querySelector('.flex-1.overflow-auto'),
                    document.querySelector('[class*="scroll"]'),
                    document.scrollingElement,
                    document.documentElement
                ];
                for (const c of candidates) {
                    if (c && (c.scrollHeight > c.clientHeight + 50)) return c;
                }
                return document.scrollingElement || document.documentElement;
            },
            getMessages: () => {
                const pairs = [];
                // Pour grok.com
                const userMessages = document.querySelectorAll('[data-testid="user-message"] .whitespace-pre-wrap, [data-testid="user-message"] .break-words');
                const assistantMessages = document.querySelectorAll('[data-testid="assistant-message"] .whitespace-pre-wrap, [data-testid="assistant-message"] .markdown');
                for (let i = 0; i < Math.min(userMessages.length, assistantMessages.length); i++) {
                    if (userMessages[i] && assistantMessages[i]) pairs.push({ user: userMessages[i], assistant: assistantMessages[i] });
                }
                if (pairs.length === 0) {
                    const allMessages = document.querySelectorAll('.message-bubble');
                    for (let i = 0; i < allMessages.length - 1; i += 2) {
                        if (allMessages[i] && allMessages[i + 1]) pairs.push({ user: allMessages[i], assistant: allMessages[i + 1] });
                    }
                }
                return pairs;
            },
            getTitle: () => {
                const titleSelectors = ['title', 'h1', '[data-testid="conversation-title"]', '.conversation-title', '[class*="title"]'];
                for (const sel of titleSelectors) {
                    const el = document.querySelector(sel);
                    if (el && el.textContent && !el.textContent.includes('Grok')) {
                        return el.textContent.trim();
                    }
                }
                return document.title?.replace('Grok', '').replace('xAI', '').trim() || 'Grok_Chat';
            }
        },
        grok_x: {
            lazyLoad: true,
            getScrollContainer: () => {
                // Pour X.com (Twitter) - le conteneur principal est data-testid="primaryColumn"
                const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
                if (primaryColumn && (primaryColumn.scrollHeight > primaryColumn.clientHeight + 50)) {
                    return primaryColumn;
                }
                const candidates = [
                    document.querySelector('[role="main"]'),
                    document.querySelector('[data-testid="primaryColumn"]'),
                    document.querySelector('[data-testid="scroll-container"]'),
                    document.querySelector('.css-175oi2r.r-1oszu61.r-1niwhzg.r-18u37iz.r-16y2uox.r-2llsf.r-13qz1uu.r-1wtj0ep'),
                    document.scrollingElement,
                    document.documentElement
                ];
                for (const c of candidates) {
                    if (c && (c.scrollHeight > c.clientHeight + 50)) return c;
                }
                return document.scrollingElement || document.documentElement;
            },
            ensureMessagesLoaded: async () => {
                // Fonction spéciale pour X.com qui charge les messages au scroll
                const container = platformHandlers.grok_x.getScrollContainer();
                if (!container) return false;

                const getScrollTop = () => container.scrollTop;
                const setScrollTop = (v) => { container.scrollTop = v; };
                const getScrollHeight = () => container.scrollHeight;

                const getPairsCount = () => {
                    const users = document.querySelectorAll('[data-testid="tweetText"], [data-testid="user-message"]');
                    const assistants = document.querySelectorAll('[data-testid="grok-answer"], [data-testid="assistant-message"]');
                    return Math.min(users.length, assistants.length);
                };

                let lastCount = getPairsCount();
                let stableCount = 0;
                const maxIterations = 20;
                let iterations = 0;

                dom.log(`📊 X.com: ${lastCount} messages trouvés initialement`);

                // Scroller vers le haut progressivement
                while (iterations < maxIterations && stableCount < 3) {
                    const currentScroll = getScrollTop();
                    if (currentScroll <= 10) break;

                    // Scroll vers le haut par paliers
                    const newScroll = Math.max(0, currentScroll - 600);
                    setScrollTop(newScroll);
                    await dom.sleep(500);

                    const newCount = getPairsCount();
                    if (newCount > lastCount) {
                        dom.log(`✅ X.com: Nouvelles paires chargées! ${lastCount} -> ${newCount}`);
                        lastCount = newCount;
                        stableCount = 0;
                    } else {
                        stableCount++;
                    }
                    iterations++;
                }

                // Re-scroller vers le bas pour revenir à la position originale
                setScrollTop(0);
                await dom.sleep(300);

                const finalCount = getPairsCount();
                dom.log(`✅ X.com: Chargement terminé avec ${finalCount} paires`);
                return true;
            },
            getMessages: async () => {
                await dom.waitForElement('[data-testid="tweetText"], [data-testid="grok-answer"], [data-testid="assistant-message"]', 12000);
                
                // Attendre un peu que la page soit stable
                await dom.sleep(500);
                
                const pairs = [];
                const assistantMessages = document.querySelectorAll(
                    '[data-testid="grok-answer"], [data-testid="assistant-message"], [data-testid*="grok"], [data-testid*="assistant"]'
                );
                const userMessages = document.querySelectorAll(
                    '[data-testid="tweetText"], [data-testid="user-message"], [data-testid*="user"]'
                );

                const n = Math.min(userMessages.length, assistantMessages.length);
                for (let i = 0; i < n; i++) {
                    if (userMessages[i] && assistantMessages[i]) {
                        pairs.push({ user: userMessages[i], assistant: assistantMessages[i] });
                    }
                }

                // Fallback: chercher les messages dans les divs de conversation
                if (pairs.length === 0) {
                    const conversationItems = document.querySelectorAll('[data-testid="conversationItem"], [role="article"]');
                    let lastUser = null;
                    for (const item of conversationItems) {
                        const isUser = item.querySelector('[data-testid="tweetText"]') !== null;
                        const content = item.querySelector('[data-testid="tweetText"], [data-testid="assistant-message"], .markdown');
                        if (content && isUser) {
                            lastUser = content;
                        } else if (content && lastUser) {
                            pairs.push({ user: lastUser, assistant: content });
                            lastUser = null;
                        }
                    }
                }
                
                dom.log(`📊 X.com: ${pairs.length} paires de messages trouvées`);
                return pairs;
            },
            getTitle: () => {
                const conversationId = window.location.search.match(/conversation=(\d+)/)?.[1] || window.location.pathname.split('/').pop();
                return conversationId || 'X_Grok_Chat';
            }
        },
        claude: {
            getMessages: () => {
                const users = document.querySelectorAll('[data-testid="user-message"], .user-message');
                const assistants = document.querySelectorAll('[data-testid="assistant-message"], .font-claude-response, .assistant-message');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => document.title?.replace('Claude', '').trim() || 'Claude_Chat'
        },
        copilot: {
            getMessages: () => {
                const users = document.querySelectorAll('[data-content="user-message"], .user-message');
                const assistants = document.querySelectorAll('[data-testid="ai-message"] .whitespace-pre-wrap');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => {
                const headerTitle = document.querySelector('header h1, header h2, [data-testid*="chat-title"], [class*="chat-title"], [class*="conversation-title"]')?.textContent?.trim();
                if (headerTitle) return headerTitle;
                const id = window.location.pathname.match(/\/chats\/([^/?#]+)/)?.[1];
                if (id) {
                    const links = Array.from(document.querySelectorAll('#sidebar-container a[href], nav a[href], aside a[href]'));
                    const match = links.find(a => (a.getAttribute('href') || '').includes(id));
                    const text = match?.textContent?.trim();
                    if (text) return text;
                }
                const candidates = Array.from(document.querySelectorAll('#sidebar-container p button, #sidebar-container button, nav p button, nav button, aside p button, aside button'));
                const cleanedText = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
                let best = { score: -1, text: '' };
                candidates.forEach((btn) => {
                    const text = cleanedText(btn);
                    if (!text) return;
                    let score = 0;
                    const ariaCurrent = btn.getAttribute('aria-current');
                    const ariaSelected = btn.getAttribute('aria-selected');
                    const dataState = btn.getAttribute('data-state');
                    if (ariaCurrent === 'page' || ariaCurrent === 'true') score += 10;
                    if (ariaSelected === 'true') score += 9;
                    if (dataState === 'active' || dataState === 'open' || dataState === 'on') score += 7;
                    if (btn.closest('[aria-current="page"], [aria-selected="true"], [data-state="active"]')) score += 6;
                    const cls = (btn.className || '').toString();
                    if (/active|selected|current/i.test(cls)) score += 4;
                    if (/new chat|nouveau|compose|search|rechercher/i.test(text)) score -= 6;
                    if (text.length >= 8) score += 1;
                    if (score > best.score) best = { score, text };
                });
                if (best.text) return best.text;
                return document.title?.replace('Copilot', '').trim() || 'Copilot_Chat';
            }
        },
        cohere: {
            getMessages: async () => {
                const pairs = [];
                await dom.waitForElement('[data-component="MessageRow"], [class*="MessageRow"]', 12000);
                const rows = document.querySelectorAll('[data-component="MessageRow"], [class*="MessageRow"]');
                let lastUser = null;
                rows.forEach((row, idx) => {
                    const contentEl = row.querySelector('.whitespace-pre-wrap, [class*="whitespace-pre-wrap"], pre, .prose, [data-testid*="message"]') || row;
                    const text = contentEl?.textContent?.trim();
                    if (!text) return;
                    const isUser = !!row.querySelector('.bg-white, [class*="user"], [data-testid*="user"]') || (!!row.querySelector('textarea, input') && !row.querySelector('.bg-gray-50'));
                    const isAssistant = !!row.querySelector('.bg-gray-50, [class*="assistant"], [class*="model"], [data-testid*="assistant"]');
                    const role = isUser ? 'user' : (isAssistant ? 'assistant' : (idx % 2 === 0 ? 'user' : 'assistant'));
                    if (role === 'user') {
                        lastUser = contentEl;
                    } else {
                        pairs.push({ user: lastUser || dom.createElement('div', { text: '' }), assistant: contentEl });
                        lastUser = null;
                    }
                });
                return pairs;
            },
            getTitle: () => document.querySelector('.MuiTypography-h6')?.textContent || 'Cohere_Playground'
        },
        mistral: {
            getMessages: () => {
                const users = document.querySelectorAll('[data-message-author-role="user"], .user-message');
                const assistants = document.querySelectorAll('[data-message-author-role="assistant"], .assistant-message');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => document.title?.replace('Mistral', '').trim() || 'Mistral_Chat'
        },
        perplexity: {
            getMessages: async () => {
                await dom.waitForElement('[data-testid="assistant-message"], [data-testid="user-message"], .prose', 12000);
                const pairs = [];
                let users = document.querySelectorAll('[data-testid="user-message"]');
                let assistants = document.querySelectorAll('[data-testid="assistant-message"]');
                if (users.length === 0) users = document.querySelectorAll('[data-testid*="user"], [class*="user-message"], [class*="query"], .query-content');
                if (assistants.length === 0) assistants = document.querySelectorAll('[data-testid*="assistant"], [class*="assistant-message"], [class*="answer"], .prose');
                const n = Math.min(users.length, assistants.length);
                for (let i = 0; i < n; i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => document.querySelector('h1, [data-testid="thread-title"], [data-testid="thread-header"] span, [data-testid="thread-header"]')?.textContent?.trim() || document.title?.replace('Perplexity', '').trim() || 'Perplexity_Chat'
        },
        kimi: {
            getMessages: async () => {
                dom.log('🔍 Kimi: Recherche des messages...');
                await Promise.race([
                    dom.waitForElement('[data-lexical-editor="true"]', 12000),
                    dom.waitForElement('.chat-input-editor', 12000),
                    dom.waitForElement('.markdown', 12000),
                    dom.waitForElement('[class*="message"]', 12000)
                ]);
                const pairs = [];
                const userSelectors = ['.chat-message-user', '.user-message', '[data-role="user"]', '.chat-content-item-user', '.message-user', '[class*="user-message"]', '.user-content'];
                const assistantSelectors = ['.chat-message-assistant', '.assistant-message', '[data-role="assistant"]', '.chat-content-item-assistant', '.markdown-container', '.prose', '[class*="assistant-message"]', '.markdown'];
                let users = [];
                let assistants = [];
                for (const sel of userSelectors) {
                    users = document.querySelectorAll(sel);
                    if (users.length > 0) {
                        dom.log(`✅ Kimi: Sélecteur user trouvé: ${sel} (${users.length} éléments)`);
                        break;
                    }
                }
                for (const sel of assistantSelectors) {
                    assistants = document.querySelectorAll(sel);
                    if (assistants.length > 0) {
                        dom.log(`✅ Kimi: Sélecteur assistant trouvé: ${sel} (${assistants.length} éléments)`);
                        break;
                    }
                }
                if (users.length === 0 || assistants.length === 0) {
                    dom.log('⚠️ Kimi: Utilisation du fallback large');
                    users = document.querySelectorAll('[class*="user"], [class*="User"]');
                    assistants = document.querySelectorAll('[class*="assistant"], [class*="Assistant"], .markdown');
                    dom.log(`📊 Kimi fallback: ${users.length} users, ${assistants.length} assistants`);
                }
                if (users.length === 0 && assistants.length === 0) {
                    const allMessages = document.querySelectorAll('[class*="message"]');
                    for (let i = 0; i < allMessages.length - 1; i += 2) {
                        if (allMessages[i] && allMessages[i + 1]) {
                            pairs.push({ user: allMessages[i], assistant: allMessages[i + 1] });
                        }
                    }
                    dom.log(`📊 Kimi fallback messages: ${pairs.length} paires`);
                    return pairs;
                }
                const minLength = Math.min(users.length, assistants.length);
                for (let i = 0; i < minLength; i++) {
                    if (users[i] && assistants[i]) {
                        pairs.push({ user: users[i], assistant: assistants[i] });
                    }
                }
                dom.log(`✅ Kimi: ${pairs.length} paires de messages trouvées`);
                return pairs;
            },
            getTitle: () => {
                const title = document.querySelector('h1, .chat-header h2, .conversation-title, .chat-header-content h2, title')?.textContent?.trim();
                return title || 'Kimi_Chat';
            }
        },
        deepinfra: {
            getMessages: () => {
                const users = document.querySelectorAll('[data-component="MessageRow"] .bg-white .whitespace-pre-wrap, .user-message .message-content');
                const assistants = document.querySelectorAll('[data-component="MessageRow"] .bg-gray-50 .whitespace-pre-wrap, .assistant-message .message-content');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => document.querySelector('.MuiTypography-h6')?.textContent || 'DeepInfra_Chat'
        },
        deepai: {
            getMessages: async () => {
                await dom.waitForElement('.outputBox, .markdownContainer, [class*="output"], [class*="markdown"]', 12000);
                const pairs = [];
                const outputs = document.querySelectorAll('.outputBox .markdownContainer, .outputBox [class*="markdown"], .markdownContainer, [class*="output"] [class*="markdown"]');
                const inputs = document.querySelectorAll('.chatbox-wrapper .chatbox, .chatbox-wrapper textarea, [class*="input"] textarea, [class*="prompt"], [class*="user"]');
                for (let i = 0; i < Math.min(inputs.length, outputs.length); i++) {
                    if (inputs[i] && outputs[i]) pairs.push({ user: inputs[i], assistant: outputs[i] });
                }
                return pairs;
            },
            getTitle: () => {
                const title = document.querySelector('h1, h2, [class*="title"], [class*="header"] h2')?.textContent?.trim();
                if (title) return title;
                const hash = (window.location.hash || '').replace('#', '').trim();
                if (hash) return hash;
                return document.title?.replace('DeepAI', '').trim() || 'DeepAI_Chat';
            }
        },
        meta: {
            getMessages: async () => {
                await dom.waitForElement('[data-message-item="true"], [data-message-type="user"], [data-message-type="assistant"]', 12000);
                const items = Array.from(document.querySelectorAll('[data-message-item="true"]'));
                const pairs = [];
                let lastUser = null;
                const fallbackUsers = document.querySelectorAll('[data-message-type="user"]');
                const fallbackAssistants = document.querySelectorAll('[data-message-type="assistant"], .prose, [class*="assistant"]');
                if (items.length === 0 && fallbackUsers.length && fallbackAssistants.length) {
                    const n = Math.min(fallbackUsers.length, fallbackAssistants.length);
                    for (let i = 0; i < n; i++) pairs.push({ user: fallbackUsers[i], assistant: fallbackAssistants[i] });
                    return pairs;
                }
                items.forEach((el) => {
                    const idAttr = el.getAttribute('data-message-id') || '';
                    const isUser = idAttr.includes('_user') || !!el.querySelector('[data-message-type="user"]');
                    const isAssistant = idAttr.includes('_assistant') || !!el.querySelector('[data-message-type="assistant"]');
                    const contentEl = el.querySelector('[data-message-type="user"], [data-message-type="assistant"], .prose, .markdown, [data-testid*="message"]') || el;
                    const text = contentEl?.textContent?.trim();
                    if (!text) return;
                    if (isUser || (!isAssistant && !isUser)) {
                        lastUser = contentEl;
                    } else {
                        pairs.push({ user: lastUser || dom.createElement('div', { text: '' }), assistant: contentEl });
                        lastUser = null;
                    }
                });
                return pairs;
            },
            getTitle: () => document.querySelector('thead th:first-child, .conversation-title, h2')?.textContent?.trim() || 'Meta_Chat'
        },
        qwen: {
            getMessages: () => {
                const users = document.querySelectorAll('.chat-user-message, .user-message-content');
                const assistants = document.querySelectorAll('.response-message-content, .qwen-markdown');
                const pairs = [];
                for (let i = 0; i < Math.min(users.length, assistants.length); i++) {
                    if (users[i] && assistants[i]) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => {
                const headerTitle = document.querySelector('header h1, header h2, .chat-header-content h2, .conversation-title, [class*="conversation-title"], [class*="ConversationTitle"], [class*="chat-title"]')?.textContent?.trim();
                if (headerTitle) return headerTitle;
                const activeTitle = document.querySelector('.chat-item-drag-active .chat-item-drag-link-content-tip-text, .chat-item-drag-active [class*="tip-text"]')?.textContent?.trim();
                if (activeTitle) return activeTitle;
                const id = window.location.pathname.match(/\/c\/([^/?#]+)/)?.[1];
                if (id) return id;
                return document.title?.replace('Qwen', '').trim() || 'Qwen_Chat';
            }
        },
        linkedin: {
            getMessages: async () => {
                await dom.waitForElement('.msg-s-event-listitem, .msg-s-message-list__event, [data-event-urn]', 12000);
                const pairs = [];
                const items = document.querySelectorAll('.msg-s-event-listitem, .msg-s-message-list__event, [data-event-urn]');
                let lastSelf = null;
                for (const el of items) {
                    const body = el.querySelector('.msg-s-event-listitem__body, .msg-s-message-list__event-content, .msg-s-message-group__text, [class*="message-body"]') || el;
                    const text = body?.textContent?.trim();
                    if (!text) continue;
                    const isOther = el.classList.contains('msg-s-event-listitem--other') || el.classList.contains('msg-s-message-list__event--other') || !!el.querySelector('.msg-s-event-listitem--other, .msg-s-message-list__event--other');
                    const isSelf = el.classList.contains('msg-s-event-listitem--self') || el.classList.contains('msg-s-message-list__event--self') || !!el.querySelector('.msg-s-event-listitem--self, .msg-s-message-list__event--self');
                    if (isSelf || (!isOther && !isSelf)) {
                        lastSelf = body;
                    } else {
                        pairs.push({ user: lastSelf || dom.createElement('div', { text: '' }), assistant: body });
                        lastSelf = null;
                    }
                }
                return pairs;
            },
            getTitle: () => {
                const active = document.querySelector('.msg-conversations-container__convo-item-link--active h3.msg-conversation-listitem__participant-names, .msg-conversation-listitem--active h3.msg-conversation-listitem__participant-names')?.textContent?.trim();
                if (active) return active;
                const title = document.querySelector('.msg-thread__link-to-profile, .msg-thread__details h2, header h2, title')?.textContent?.trim();
                return title || 'LinkedIn_Chat';
            }
        },
        openrouter: {
            lazyLoad: true,
            getScrollContainer: () => {
                const containers = [
                    document.querySelector('[data-testid="message-list-scroll"]'),
                    document.querySelector('[data-testid="scroll-container"]'),
                    document.querySelector('.chat-messages'),
                    document.querySelector('[role="log"]'),
                    document.scrollingElement,
                    document.documentElement
                ];
                for (const c of containers) {
                    if (c && (c.scrollHeight > c.clientHeight + 50)) return c;
                }
                return document.scrollingElement || document.documentElement;
            },
            getMessages: async () => {
                await dom.waitForElement('[data-message-id]', 12000);
                const wrappers = Array.from(document.querySelectorAll('[data-message-id]'));
                const pairs = [];
                let lastUser = null;

                wrappers.forEach(w => {
                    const user = w.querySelector('[data-testid="user-message"]');
                    const assistant = w.querySelector('[data-testid="assistant-message"]');
                    if (user) lastUser = user;
                    if (assistant) {
                        pairs.push({ user: lastUser || dom.createElement('div', { text: '' }), assistant });
                        lastUser = null;
                    }
                });

                if (pairs.length === 0) {
                    const users = document.querySelectorAll('[data-testid="user-message"]');
                    const assistants = document.querySelectorAll('[data-testid="assistant-message"]');
                    const n = Math.min(users.length, assistants.length);
                    for (let i = 0; i < n; i++) pairs.push({ user: users[i], assistant: assistants[i] });
                }
                return pairs;
            },
            getTitle: () => {
                const model = document.querySelector('[data-testid="model-select"]')?.textContent?.trim();
                return model || document.title?.trim() || 'OpenRouter_Chat';
            }
        }
    };

    // ==================== 6. EXPORTEUR ====================
    const exporter = {
        HISTORY_KEY: 'ai_exporter_history_v1',
        MAX_HISTORY: 500,

        generateId: () => {
            try {
                const bytes = new Uint8Array(9);
                crypto.getRandomValues(bytes);
                return Array.from(bytes, b => (b % 36).toString(36)).join('');
            } catch {
                return Math.random().toString(36).slice(2, 12);
            }
        },
        nowISO: () => new Date().toISOString(),

        getHistory: () => {
            try {
                const v = GM_getValue(exporter.HISTORY_KEY, null);
                if (Array.isArray(v)) return v;
                if (typeof v === 'string') return JSON.parse(v);
            } catch {}
            try {
                const raw = localStorage.getItem(exporter.HISTORY_KEY);
                if (raw) return JSON.parse(raw);
            } catch {}
            return [];
        },
        setHistory: (items) => {
            try { GM_setValue(exporter.HISTORY_KEY, items); } catch {}
            try { localStorage.setItem(exporter.HISTORY_KEY, JSON.stringify(items)); } catch {}
        },
        addHistoryItem: (item) => {
            const items = exporter.getHistory();
            items.unshift(item);
            if (items.length > exporter.MAX_HISTORY) items.length = exporter.MAX_HISTORY;
            exporter.setHistory(items);
            if (document.querySelector('.ai-export-history-overlay')) exporter.renderHistoryModal();
        },
        exportHistoryAsJSON: () => {
            const items = exporter.getHistory();
            dom.download(JSON.stringify(items, null, 2), 'ai_exporter_historique_exports.json', 'application/json');
        },
        clearHistory: () => {
            exporter.setHistory([]);
            if (document.querySelector('.ai-export-history-overlay')) exporter.renderHistoryModal();
        },
        openHistoryModal: () => {
            if (!document.querySelector('.ai-export-history-overlay')) {
                const overlay = dom.createElement('div', { className: 'ai-export-history-overlay' });
                const modal = dom.createElement('div', { className: 'ai-export-history-modal' });
                const header = dom.createElement('div', { className: 'ai-export-history-header' });
                const title = dom.createElement('div', { className: 'ai-export-history-title', text: t('history') });
                const actions = dom.createElement('div', { className: 'ai-export-history-actions' });
                const btnDownload = dom.createElement('button', { className: 'ai-export-history-btn', text: t('downloadJSON') });
                btnDownload.setAttribute('data-action', 'download');
                const btnClear = dom.createElement('button', { className: 'ai-export-history-btn', text: t('clear') });
                btnClear.setAttribute('data-action', 'clear');
                const btnClose = dom.createElement('button', { className: 'ai-export-history-btn', text: t('close') });
                btnClose.setAttribute('data-action', 'close');
                actions.appendChild(btnDownload);
                actions.appendChild(btnClear);
                actions.appendChild(btnClose);
                header.appendChild(title);
                header.appendChild(actions);

                const body = dom.createElement('div', { className: 'ai-export-history-body' });
                const table = dom.createElement('table', { className: 'ai-export-history-table' });
                const thead = document.createElement('thead');
                const trh = document.createElement('tr');
                ['#', t('id'), t('title'), t('source'), t('date'), t('format'), t('filename')].forEach(txt => {
                    const th = document.createElement('th');
                    th.textContent = txt;
                    trh.appendChild(th);
                });
                thead.appendChild(trh);
                const tbody = document.createElement('tbody');
                table.appendChild(thead);
                table.appendChild(tbody);
                body.appendChild(table);

                modal.appendChild(header);
                modal.appendChild(body);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) overlay.remove();
                });
                modal.addEventListener('click', (e) => {
                    const btn = e.target.closest('button[data-action]');
                    if (!btn) return;
                    const action = btn.getAttribute('data-action');
                    if (action === 'close') overlay.remove();
                    if (action === 'download') exporter.exportHistoryAsJSON();
                    if (action === 'clear') exporter.clearHistory();
                });
            }
            exporter.renderHistoryModal();
        },
        renderHistoryModal: () => {
            const tbody = document.querySelector('.ai-export-history-table tbody');
            if (!tbody) return;
            const items = exporter.getHistory();
            tbody.innerHTML = '';
            if (items.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 7;
                td.style.textAlign = 'center';
                td.style.padding = '40px';
                td.style.color = 'rgba(255,255,255,0.5)';
                td.textContent = t('noHistory');
                tr.appendChild(td);
                tbody.appendChild(tr);
            } else {
                items.forEach((it, idx) => {
                    const safe = (v) => (v === undefined || v === null || v === '' ? '—' : String(v));
                    const tr = document.createElement('tr');

                    const tdIndex = document.createElement('td');
                    tdIndex.className = 'ai-export-history-muted';
                    tdIndex.textContent = String(idx + 1);

                    const tdId = document.createElement('td');
                    const code = document.createElement('code');
                    code.textContent = safe(it.id);
                    tdId.appendChild(code);

                    const tdTitle = document.createElement('td');
                    tdTitle.className = 'ai-export-history-ellipsis';
                    tdTitle.title = safe(it.titre);
                    tdTitle.textContent = safe(it.titre);

                    const tdSource = document.createElement('td');
                    tdSource.textContent = safe(it.source);

                    const tdDate = document.createElement('td');
                    const span = document.createElement('span');
                    span.className = 'ai-export-history-muted';
                    span.textContent = safe(it.exportedAt);
                    tdDate.appendChild(span);

                    const tdFormat = document.createElement('td');
                    tdFormat.textContent = safe(it.format);

                    const tdFile = document.createElement('td');
                    tdFile.className = 'ai-export-history-ellipsis';
                    tdFile.title = safe(it.filename);
                    tdFile.textContent = safe(it.filename);

                    tr.appendChild(tdIndex);
                    tr.appendChild(tdId);
                    tr.appendChild(tdTitle);
                    tr.appendChild(tdSource);
                    tr.appendChild(tdDate);
                    tr.appendChild(tdFormat);
                    tr.appendChild(tdFile);
                    tbody.appendChild(tr);
                });
            }
        },

        sleep: (ms) => new Promise(r => setTimeout(r, ms)),
        findScrollableContainer: (handler, platform) => {
            // Cas spécifique pour X.com
            if (platform === 'grok_x') {
                const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
                if (primaryColumn) return primaryColumn;
            }

            try {
                const c = handler?.getScrollContainer?.();
                if (c) return c;
            } catch {}

            const candidates = [
                document.querySelector('[data-radix-scroll-area-viewport]'),
                document.querySelector('.overflow-y-auto'),
                document.querySelector('main'),
                document.querySelector('[role="main"]'),
                document.querySelector('[data-testid="primaryColumn"]'),
                document.querySelector('.chat-messages'),
                document.scrollingElement,
                document.documentElement,
                document.body
            ];
            let best = candidates.find(c => c && (c.scrollHeight > c.clientHeight + 50));
            if (best) return best;

            const els = Array.from(document.querySelectorAll('main, [role="main"], [data-scroll-container="true"], [data-testid*="scroll"], [class*="scroll"], [class*="message-list"], [class*="chat"]'));
            let bestScore = 0;
            for (const el of els) {
                const sh = el.scrollHeight || 0;
                const ch = el.clientHeight || 0;
                if (sh <= ch + 50) continue;
                const style = window.getComputedStyle(el);
                const oy = style.overflowY;
                const scrollable = (oy === 'auto' || oy === 'scroll');
                if (!scrollable) continue;
                const score = sh - ch;
                if (score > bestScore) {
                    bestScore = score;
                    best = el;
                }
            }
            return best || document.scrollingElement || document.documentElement;
        },

        ensureConversationFullyLoaded: async (handler, platformName) => {
            // Cas spécifique pour X.com (grok_x)
            if (platformName === 'grok_x') {
                return await platformHandlers.grok_x.ensureMessagesLoaded();
            }

            if (!handler || handler.lazyLoad !== true) return;

            dom.log(`🔍 Chargement des anciens messages pour ${platformName}...`);

            const container = exporter.findScrollableContainer(handler, platformName);
            if (!container) {
                dom.log(`⚠️ Aucun conteneur scrollable trouvé pour ${platformName}`);
                return;
            }

            const isWindowScroll = (container === document.scrollingElement || container === document.documentElement || container === document.body);
            const getScrollTop = () => isWindowScroll ? (window.scrollY || 0) : (container.scrollTop || 0);
            const setScrollTop = (v) => {
                if (isWindowScroll) window.scrollTo(0, v);
                else container.scrollTop = v;
            };
            const getClientHeight = () => isWindowScroll ? window.innerHeight : (container.clientHeight || window.innerHeight);

            const startTop = getScrollTop();
            const startTime = Date.now();
            const maxMs = 10000;
            const step = Math.max(250, Math.floor(getClientHeight() * 0.85));

            const getPairsCount = async () => {
                let pairs = handler.getMessages();
                if (pairs && typeof pairs.then === 'function') pairs = await pairs;
                return Array.isArray(pairs) ? pairs.length : 0;
            };

            let lastCount = await getPairsCount();
            let stableCount = 0;
            let iterations = 0;
            const maxIterations = 15;

            dom.log(`📊 ${platformName}: ${lastCount} messages trouvés initialement`);

            while (iterations < maxIterations && Date.now() - startTime < maxMs && stableCount < 3) {
                const curTop = getScrollTop();
                const newTop = Math.max(0, curTop - step);
                setScrollTop(newTop);
                await exporter.sleep(450);

                const newCount = await getPairsCount();
                dom.log(`📊 ${platformName}: ${newCount} messages (avant: ${lastCount})`);

                if (newCount > lastCount) {
                    dom.log(`✅ ${platformName}: Nouvelles paires chargées! ${lastCount} -> ${newCount}`);
                    lastCount = newCount;
                    stableCount = 0;
                } else {
                    stableCount++;
                }

                if (getScrollTop() <= 5) {
                    dom.log(`🏁 ${platformName}: Atteint le début de la conversation`);
                    break;
                }
                iterations++;
            }

            setScrollTop(startTop);
            await exporter.sleep(100);

            const finalCount = await getPairsCount();
            dom.log(`✅ ${platformName}: Export terminé avec ${finalCount} paires de messages`);
        },

        getConversation: async () => {
            const platformName = detectPlatform();
            if (!platformName) throw new Error('❌ Plateforme non reconnue. Rafraîchissez la page.');
            const handler = platformHandlers[platformName];
            if (!handler) throw new Error('❌ Gestionnaire non trouvé pour cette plateforme.');

            dom.log(`🚀 Début de l'export pour ${platformName}`);

            await Promise.race([
                exporter.ensureConversationFullyLoaded(handler, platformName),
                exporter.sleep(15000)
            ]);

            let pairs = handler.getMessages();
            if (typeof pairs.then === 'function') pairs = await pairs;
            if (!pairs || pairs.length === 0) throw new Error('❌ Aucun message trouvé. Vérifiez la conversation.');

            dom.log(`📝 ${pairs.length} paires de messages trouvées`);

            const conversation = pairs.map(pair => ({
                question: markdown.convert(pair.user),
                reponse: markdown.convert(pair.assistant)
            }));
            const titreBrut = handler.getTitle ? String(handler.getTitle() || '').trim() : '';
            const titre = dom.sanitizeTitle(titreBrut);
            return { conversation, titre, titreBrut: titreBrut || 'sans titre', nomSite: platformName };
        },
        formatFilename: (site, format, title, exportId) => {
            let ext = format.toLowerCase();
            if (format === 'ShareGPT' || format === 'Alpaca') ext = 'json';
            if (format === 'Markdown') ext = 'md';
            if (format === 'JSONL') ext = 'jsonl';
            return `${site}_${format}_${title}_${exportId}.${ext}`;
        },
        exportJSON: (conv, meta, filename) => {
            const payload = {
                id: meta.id,
                titre: meta.titre,
                source: meta.source,
                exportedAt: meta.exportedAt,
                conversation: conv
            };
            dom.download(JSON.stringify(payload, null, 2), filename, 'application/json');
        },
        exportJSONL: (conv, meta, filename) => {
            const lines = conv.map(turn => JSON.stringify({
                conversation_id: meta.id,
                titre: meta.titre,
                source: meta.source,
                exported_at: meta.exportedAt,
                messages: [{ role: "user", content: turn.question }, { role: "assistant", content: turn.reponse }]
            }));
            dom.download(lines.join('\n'), filename, 'application/x-ndjson');
        },
        exportShareGPT: (conv, meta, filename) => {
            const shareGPT = conv.map(turn => [
                { conversation_id: meta.id, from: "human", value: turn.question },
                { conversation_id: meta.id, from: "gpt", value: turn.reponse }
            ]).flat();
            dom.download(JSON.stringify(shareGPT, null, 2), filename, 'application/json');
        },
        exportAlpaca: (conv, meta, filename) => {
            const alpaca = conv.map(turn => ({
                conversation_id: meta.id,
                titre: meta.titre,
                source: meta.source,
                exported_at: meta.exportedAt,
                instruction: turn.question,
                input: "",
                output: turn.reponse
            }));
            dom.download(JSON.stringify(alpaca, null, 2), filename, 'application/json');
        },
        exportMarkdown: (conv, meta, filename) => {
            let md = `# ${meta.titre || 'sans titre'}\n\n`;
            md += `- ID: ${meta.id}\n- Source: ${meta.source}\n- Exporté le: ${meta.exportedAt}\n\n---\n\n`;
            conv.forEach((turn, i) => { md += `## Question ${i+1}\n${turn.question}\n\n## Réponse ${i+1}\n${turn.reponse}\n\n---\n\n`; });
            dom.download(md, filename, 'text/markdown');
        },
        exportTXT: (conv, meta, filename) => {
            let txt = `Conversation: ${meta.titre || 'sans titre'}\nID: ${meta.id}\nSource: ${meta.source}\nExporté le: ${meta.exportedAt}\n${'='.repeat(50)}\n\n`;
            conv.forEach((turn, i) => { txt += `Q${i+1}: ${turn.question}\nA${i+1}: ${turn.reponse}\n${'-'.repeat(30)}\n`; });
            dom.download(txt, filename, 'text/plain');
        },
        exportCSV: (conv, meta, filename) => {
            let csv = "conversation_id,titre,source,exported_at,question,answer\n";
            const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
            conv.forEach(turn => {
                csv += `${esc(meta.id)},${esc(meta.titre)},${esc(meta.source)},${esc(meta.exportedAt)},${esc(turn.question)},${esc(turn.reponse)}\n`;
            });
            dom.download(csv, filename, 'text/csv');
        },
        exportHTML: (conv, meta, filename) => {
            const title = meta.titre || 'sans titre';
            let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:auto;padding:20px}.meta{font-size:12px;color:#666;margin-bottom:10px}.q{background:#e9e9e9;padding:15px;border-radius:10px;margin:20px 0}.a{padding:15px;border-left:3px solid #4CAF50}hr{margin:20px 0}</style></head><body><h1>${title}</h1><div class="meta"><div><strong>ID:</strong> ${meta.id}</div><div><strong>Source:</strong> ${meta.source}</div><div><strong>Exporté le:</strong> ${meta.exportedAt}</div></div>`;
            conv.forEach(turn => { html += `<div class="q"><strong>Q:</strong> ${turn.question}</div><div class="a"><strong>A:</strong> ${turn.reponse}</div><hr>`; });
            html += `</body></html>`;
            dom.download(html, filename, 'text/html');
        }
    };

    // ==================== 7. SVG BOUTON ====================
    const createExportSVGElement = () => {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.marginRight = '8px';
        const p1 = document.createElementNS(svgNS, 'path');
        p1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
        const p2 = document.createElementNS(svgNS, 'polyline');
        p2.setAttribute('points', '7 10 12 15 17 10');
        const p3 = document.createElementNS(svgNS, 'line');
        p3.setAttribute('x1', '12');
        p3.setAttribute('y1', '15');
        p3.setAttribute('x2', '12');
        p3.setAttribute('y2', '3');
        svg.appendChild(p1);
        svg.appendChild(p2);
        svg.appendChild(p3);
        return svg;
    };

    // ==================== 8. INTERFACE FLOTTANTE ====================
    GM_addStyle(`
        .ai-export-drag-box {
            position: fixed;
            z-index: 2147483647;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            backdrop-filter: blur(12px);
            color: white;
            border-radius: 30px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            padding: 8px 18px;
            cursor: move;
            user-select: none;
            border: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            touch-action: none;
        }
        .ai-export-drag-box:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(0,0,0,0.25);
            cursor: pointer;
        }
        .ai-export-drag-box.dragging {
            transform: none !important;
            transition: none !important;
            cursor: move !important;
        }
        .ai-export-spinner {
            margin-left: 6px;
            font-size: 12px;
            opacity: 0.9;
            animation: spin 1s linear infinite;
        }
        .ai-export-menu-panel {
            position: absolute;
            min-width: 200px;
            display: none;
            flex-direction: column;
            background:
              radial-gradient(1200px circle at 10% 0%, rgba(102,126,234,0.22) 0%, transparent 45%),
              radial-gradient(900px circle at 90% 15%, rgba(118,75,162,0.20) 0%, transparent 46%),
              linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%),
              rgba(18, 18, 22, 0.82);
            backdrop-filter: blur(22px) saturate(120%);
            -webkit-backdrop-filter: blur(22px) saturate(120%);
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.16);
            z-index: 2147483647;
            box-shadow: 0 16px 45px rgba(0,0,0,0.45);
            overflow: hidden;
            max-height: 500px;
            overflow-y: auto;
        }
        .ai-export-menu-panel::-webkit-scrollbar {
            width: 6px;
        }
        .ai-export-menu-panel::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
        }
        .ai-export-menu-panel::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
        }
        .pos-bottom-right { bottom: calc(100% + 10px); right: 0; }
        .pos-bottom-left { bottom: calc(100% + 10px); left: 0; }
        .pos-top-right { top: calc(100% + 10px); right: 0; }
        .pos-top-left { top: calc(100% + 10px); left: 0; }
        .ai-export-menu-item {
            padding: 10px 16px;
            background: transparent;
            border: none;
            text-align: left;
            cursor: pointer;
            color: #e0e0e0;
            font-size: 13px;
            font-weight: 500;
            width: 100%;
            transition: all 0.15s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
        }
        .ai-export-menu-item:hover {
            background: rgba(255,255,255,0.10);
            color: #ffffff;
        }
        .ai-export-menu-item:active {
            transform: scale(0.99);
        }
        .ai-export-menu-divider {
            height: 1px;
            background: rgba(255,255,255,0.1);
            margin: 6px 0;
        }
        .ai-export-menu-title {
            padding: 8px 16px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: rgba(255,255,255,0.5);
            background: rgba(0,0,0,0.18);
        }
        .ai-export-language-item.active {
            background: rgba(255,255,255,0.10);
        }
        .ai-export-submenu {
            display: none;
            flex-direction: column;
            margin: 6px 10px 10px;
            padding: 6px;
            border-radius: 12px;
            background:
              linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%),
              rgba(0,0,0,0.10);
            border: 1px solid rgba(255,255,255,0.10);
            max-height: 240px;
            overflow: auto;
        }
        .ai-export-submenu.open { display: flex; }
        .ai-export-submenu::-webkit-scrollbar { width: 6px; }
        .ai-export-submenu::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .ai-export-submenu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 3px; }
        .ai-export-menu-item .ai-export-caret {
            margin-left: auto;
            opacity: 0.7;
            transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .ai-export-menu-item[data-expanded="true"] .ai-export-caret {
            transform: rotate(180deg);
            opacity: 1;
        }
        .ai-export-history-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .ai-export-history-modal {
            width: min(1000px, 95vw);
            max-height: min(80vh, 700px);
            background: linear-gradient(135deg, rgba(102,126,234,0.95) 0%, rgba(118,75,162,0.95) 100%);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            color: white;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .ai-export-history-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            background: rgba(0,0,0,0.1);
        }
        .ai-export-history-title {
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 0.3px;
        }
        .ai-export-history-actions { display: flex; gap: 10px; }
        .ai-export-history-btn {
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            border-radius: 8px;
            padding: 6px 12px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .ai-export-history-btn:hover {
            background: rgba(255,255,255,0.25);
            transform: translateY(-1px);
        }
        .ai-export-history-body {
            overflow: auto;
            padding: 16px;
            max-height: calc(80vh - 80px);
        }
        .ai-export-history-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        .ai-export-history-table th, .ai-export-history-table td {
            padding: 12px 12px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .ai-export-history-table th {
            color: rgba(255,255,255,0.9);
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: sticky;
            top: 0;
            background: rgba(102,126,234,0.95);
            backdrop-filter: blur(10px);
        }
        .ai-export-history-table td {
            color: rgba(255,255,255,0.85);
        }
        .ai-export-history-table tr:hover td {
            background: rgba(255,255,255,0.05);
        }
        .ai-export-history-muted {
            color: rgba(255,255,255,0.6);
            font-family: monospace;
            font-size: 11px;
        }
        .ai-export-history-ellipsis {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ai-export-history-table code {
            background: rgba(0,0,0,0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 11px;
        }
        .ai-export-toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 500;
            z-index: 2147483647;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .ai-export-toast.error {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .ai-export-language-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 16px;
        }
        .ai-export-language-item .flag {
            font-size: 18px;
        }
        .ai-export-language-item .name {
            flex: 1;
        }
        .ai-export-language-item .check {
            opacity: 0;
            transition: opacity 0.2s;
        }
        .ai-export-language-item.active .check {
            opacity: 1;
        }
        .ai-export-language-item.active {
            background: rgba(102,126,234,0.3);
            color: white;
        }
    `);

    function showToast(message, isError = false) {
        const toast = dom.createElement('div', {
            className: `ai-export-toast ${isError ? 'error' : ''}`,
            text: message
        });
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    class FloatingButton {
        constructor() {
            this.isExporting = false;
            this.isDragging = false;
            this.dragStartX = 0;
            this.dragStartY = 0;
            this.boxStartLeft = 0;
            this.boxStartTop = 0;
            this._rafMove = 0;
            this._pendingPos = null;
            this._dragMoved = false;

            this.box = dom.createElement('div', { className: 'ai-export-drag-box' });
            this.iconEl = createExportSVGElement();
            this.labelEl = document.createElement('span');
            this.labelEl.textContent = t('export');
            this.spinnerEl = document.createElement('span');
            this.spinnerEl.className = 'ai-export-spinner';
            this.spinnerEl.style.display = 'none';
            this.spinnerEl.innerHTML = '⏳';
            this.box.appendChild(this.iconEl);
            this.box.appendChild(this.labelEl);
            this.box.appendChild(this.spinnerEl);

            this.menu = dom.createElement('div', { className: 'ai-export-menu-panel' });
            this.createMenu();
            this.box.appendChild(this.menu);
            document.body.appendChild(this.box);

            this.loadPosition();
            this.setupEvents();

            window.__floatingButton = this;
        }

        setExporting(isExporting) {
            this.isExporting = !!isExporting;
            if (this.isExporting) {
                this.spinnerEl.style.display = 'inline-flex';
                this.labelEl.textContent = t('export');
                this.box.style.opacity = '0.95';
            } else {
                this.spinnerEl.style.display = 'none';
                this.labelEl.textContent = t('export');
                this.box.style.opacity = '';
            }
        }

        recreateMenu() {
            while (this.menu.firstChild) {
                this.menu.removeChild(this.menu.firstChild);
            }
            this.createMenu();
            this.menu.style.display = 'none';
        }

        createMenu() {
            const formatsTitle = dom.createElement('div', { className: 'ai-export-menu-title', text: '📄 ' + (currentLang === 'fr' ? 'Formats' : 'Formats') });
            this.menu.appendChild(formatsTitle);

            const formats = ['JSON', 'JSONL', 'ShareGPT', 'Alpaca', 'Markdown', 'TXT', 'CSV', 'HTML'];
            formats.forEach(format => {
                const btn = dom.createElement('button', { className: 'ai-export-menu-item' });
                let icon = '';
                if (format === 'JSON') icon = '{}';
                else if (format === 'Markdown') icon = '📝';
                else if (format === 'TXT') icon = '📄';
                else if (format === 'CSV') icon = '📊';
                else if (format === 'HTML') icon = '🌐';
                else icon = '📋';
                btn.innerHTML = `<span>${icon}</span><span>${format}</span>`;

                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    if (this.isExporting) {
                        showToast(t('exporting'), false);
                        return;
                    }

                    this.setExporting(true);

                    try {
                        const data = await exporter.getConversation();
                        const exportId = exporter.generateId();
                        const exportedAt = exporter.nowISO();
                        const meta = {
                            id: exportId,
                            titre: data.titreBrut || 'sans titre',
                            source: data.nomSite,
                            exportedAt
                        };
                        const filename = exporter.formatFilename(data.nomSite, format, data.titre, exportId);

                        await exporter[`export${format}`](data.conversation, meta, filename);
                        exporter.addHistoryItem({ id: exportId, titre: meta.titre, source: meta.source, exportedAt, format, filename });

                        showToast(`✓ ${t('exportSuccess')} (${format})`);
                        this.menu.style.display = 'none';
                    } catch (err) {
                        showToast(`✗ ${t('exportFailed')}: ${err.message}`, true);
                        console.error(err);
                    } finally {
                        this.setExporting(false);
                    }
                });
                this.menu.appendChild(btn);
            });

            const divider1 = dom.createElement('div', { className: 'ai-export-menu-divider' });
            this.menu.appendChild(divider1);

            const langTitle = dom.createElement('div', { className: 'ai-export-menu-title', text: '🌐 ' + t('language') });
            this.menu.appendChild(langTitle);

            const langToggle = dom.createElement('button', { className: 'ai-export-menu-item' });
            langToggle.setAttribute('data-expanded', 'false');
            langToggle.innerHTML = `<span>🌐</span><span>${t('language')}</span><span class="ai-export-caret">▾</span>`;
            this.menu.appendChild(langToggle);

            const langSubmenu = dom.createElement('div', { className: 'ai-export-submenu' });
            this.menu.appendChild(langSubmenu);

            const closeLangSubmenu = () => {
                langSubmenu.classList.remove('open');
                langToggle.setAttribute('data-expanded', 'false');
            };
            const toggleLangSubmenu = () => {
                const isOpen = langSubmenu.classList.contains('open');
                if (isOpen) closeLangSubmenu();
                else {
                    langSubmenu.classList.add('open');
                    langToggle.setAttribute('data-expanded', 'true');
                }
            };
            langToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLangSubmenu();
            });

            LANGUAGE_LIST.forEach(lang => {
                const langBtn = dom.createElement('button', { className: `ai-export-menu-item ai-export-language-item ${currentLang === lang.code ? 'active' : ''}` });
                langBtn.innerHTML = `<span class="flag">${lang.flag}</span><span class="name">${lang.nativeName}</span><span class="check">✓</span>`;
                langBtn.style.justifyContent = 'space-between';

                langBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setLanguage(lang.code);
                    langSubmenu.querySelectorAll('.ai-export-language-item').forEach(item => item.classList.remove('active'));
                    langBtn.classList.add('active');
                    const span = this.box.querySelector('span');
                    if (span) span.textContent = t('export');
                    showToast(`Language changed to ${lang.name}`);
                    closeLangSubmenu();
                    this.menu.style.display = 'none';
                });
                langSubmenu.appendChild(langBtn);
            });

            const divider2 = dom.createElement('div', { className: 'ai-export-menu-divider' });
            this.menu.appendChild(divider2);

            const historyBtn = dom.createElement('button', { className: 'ai-export-menu-item' });
            historyBtn.innerHTML = `<span>📚</span><span>${t('history')}</span>`;
            historyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                try {
                    exporter.openHistoryModal();
                } catch (err) {
                    showToast(`✗ ${err.message}`, true);
                }
                this.menu.style.display = 'none';
            });
            this.menu.appendChild(historyBtn);
        }

        loadPosition() {
            const x = GM_getValue('xBox', window.innerWidth - 120);
            const y = GM_getValue('yBox', window.innerHeight - 60);
            this.box.style.left = Math.min(Math.max(x, 10), window.innerWidth - 110) + 'px';
            this.box.style.top = Math.min(Math.max(y, 10), window.innerHeight - 50) + 'px';
        }

        setupEvents() {
            const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
            const scheduleMove = (left, top) => {
                this._pendingPos = { left, top };
                if (this._rafMove) return;
                this._rafMove = requestAnimationFrame(() => {
                    this._rafMove = 0;
                    if (!this._pendingPos) return;
                    this.box.style.left = `${this._pendingPos.left}px`;
                    this.box.style.top = `${this._pendingPos.top}px`;
                    this._pendingPos = null;
                });
            };

            const openOrCloseMenu = () => {
                if (this.menu.style.display === 'flex') {
                    this.menu.style.display = 'none';
                    return;
                }
                const rect = this.box.getBoundingClientRect();
                const isBottom = rect.top > window.innerHeight / 2;
                const isRight = rect.left > window.innerWidth / 2;
                this.menu.className = 'ai-export-menu-panel';
                if (isBottom && isRight) this.menu.classList.add('pos-bottom-right');
                else if (isBottom && !isRight) this.menu.classList.add('pos-bottom-left');
                else if (!isBottom && isRight) this.menu.classList.add('pos-top-right');
                else this.menu.classList.add('pos-top-left');
                this.menu.style.display = 'flex';
            };

            this.box.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.ai-export-menu-panel')) return;
                this.isDragging = true;
                this.box.classList.add('dragging');
                this._dragMoved = false;
                this.dragStartX = e.clientX;
                this.dragStartY = e.clientY;
                this.boxStartLeft = parseInt(this.box.style.left || '0', 10);
                this.boxStartTop = parseInt(this.box.style.top || '0', 10);
                try { this.box.setPointerCapture(e.pointerId); } catch {}
                e.preventDefault();
            });

            this.box.addEventListener('pointermove', (e) => {
                if (!this.isDragging) return;
                const dx = e.clientX - this.dragStartX;
                const dy = e.clientY - this.dragStartY;
                if (!this._dragMoved && (Math.abs(dx) + Math.abs(dy)) > 3) this._dragMoved = true;
                const rect = this.box.getBoundingClientRect();
                const w = rect.width || 110;
                const h = rect.height || 50;
                const newLeft = clamp(this.boxStartLeft + dx, 10, window.innerWidth - w - 10);
                const newTop = clamp(this.boxStartTop + dy, 10, window.innerHeight - h - 10);
                scheduleMove(newLeft, newTop);
            });

            const endDrag = (e) => {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.box.classList.remove('dragging');
                try { this.box.releasePointerCapture(e.pointerId); } catch {}
                GM_setValue('xBox', parseInt(this.box.style.left || '0', 10));
                GM_setValue('yBox', parseInt(this.box.style.top || '0', 10));
                if (!this._dragMoved) openOrCloseMenu();
            };
            this.box.addEventListener('pointerup', endDrag);
            this.box.addEventListener('pointercancel', endDrag);

            document.addEventListener('click', (e) => {
                if (!this.box.contains(e.target)) {
                    this.menu.style.display = 'none';
                }
            });
        }
    }

    // ==================== 9. INITIALISATION ====================
    function initialize() {
        const platform = detectPlatform();
        const ensureButton = () => {
            if (!document.querySelector('.ai-export-drag-box')) {
                new FloatingButton();
            } else {
                const existingMenu = document.querySelector('.ai-export-menu-panel');
                if (existingMenu) existingMenu.style.display = 'none';
            }
        };

        let lastUrl = location.href;
        const urlObserver = new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                dom.log(`Changement d'URL détecté: ${lastUrl} -> ${url}`);
                lastUrl = url;
                const menu = document.querySelector('.ai-export-menu-panel');
                if (menu) menu.style.display = 'none';
                setTimeout(() => {
                    if (!document.querySelector('.ai-export-drag-box')) {
                        new FloatingButton();
                    }
                }, 1500);
            }
        });
        urlObserver.observe(document, { subtree: true, childList: true });

        if (platform === 'kimi') {
            dom.log('Kimi détecté - attente de 4 secondes...');
            setTimeout(ensureButton, 4000);
        } else if (platform === 'gemini' || platform === 'meta') {
            setTimeout(ensureButton, 2500);
        } else {
            setTimeout(ensureButton, 1500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
