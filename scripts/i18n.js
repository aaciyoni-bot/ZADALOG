/* ZADALOG — bilingual dictionary + language engine ----------------------- */
window.I18N = (function () {
  'use strict';

  var HE = {
    skip: 'דילוג לתוכן',
    brandTag: 'מ. זדה שרותים לוגיסטיים',
    navServices: 'שירותים', navPlanner: 'מחשבון מכולה', navTrack: 'מעקב משלוח',
    navProcess: 'איך זה עובד', navNetwork: 'הרשת שלנו', navCta: 'קבלו הצעה',

    heroEyebrow: 'שילוח בינלאומי · פריקת מכולות · ישראל',
    heroT1: 'המכולה שלכם',
    heroT2: 'לא נעצרת בנמל.',
    heroSub: 'ZADALOG מנהלת את המסע המלא — מהמפעל בסין ועד המדף במחסן שלכם בישראל. הזמנת שטח, מכס ונמל; צוות פריקת מכולות מנוסה משלנו; וניהול אחסון לוגיסטי שוטף אחרי הפריקה. ספק אחד, אחריות אחת, בלי הפתעות.',
    heroCta1: 'בואו נתמחר משלוח', heroCta2: 'נסו את מחשבון המכולה',
    stat1: 'מכולות בשנה', stat2: 'נמלי מוצא', stat3: 'פריקה בתוך', stat4: 'שביעות רצון',
    tickerTitle: 'חדר מבצעים · חי', tickerFoot: 'נתוני הדגמה · מתעדכן כל 3 שניות', scroll: 'גללו',

    svcTitle: 'ארבע חוליות. שרשרת אחת.',
    svcSub: 'רוב המשלוחים נשברים בתפרים — בין הסוכן לעמיל, בין הנמל למחסן. אנחנו מחזיקים את כל התפרים בעצמנו.',
    svc1t: 'שילוח בינלאומי',
    svc1d: 'ים, אוויר ויבשה. FCL ו‑LCL, שטח מובטח בעונות שיא, קונסולידציה במוצא וניהול ספקים מולכם בעברית.',
    svc1a: 'FCL · LCL · Air', svc1b: 'קונסולידציה בסין ובאירופה', svc1c: 'ביטוח מטען',
    svc2t: 'פריקת מכולות',
    svc2d: 'הלב של החברה. צוות פריקה קבוע ומנוסה — לא כוח אדם מזדמן שמתחלף בכל משלוח. ציוד שינוע מתאים, ספירה ובקרת נזקים בזמן אמת, ודוח פריקה מצולם לפני שהנהג עוזב.',
    svc2a: 'צוות קבוע · פריקה ידנית ומכנית', svc2b: 'מיון, ספירה ופלטיזציה', svc2c: 'מכולה 40 רגל תוך 3–4 שעות',
    svc3t: 'עמילות מכס',
    svc3d: 'סיווג נכון מראש, טיפול בתקנים ובאישורי יבוא, ושחרור מהיר. פחות ימי אחסנה בנמל זה כסף שנשאר אצלכם.',
    svc3a: 'סיווג ותכנון מכס', svc3b: 'תקנים ואישורי יבוא', svc3c: 'שחרור מהיר מהנמל',
    svc4t: 'ניהול אחסון לוגיסטי',
    svc4d: 'לא רק מקום על הרצפה. ניהול מלאי לפי מיקום, מעקב כמויות, ליקוט ואריזה לפי הזמנה, והפצה לנקודות קצה בכל הארץ — כולל משלוח ללקוח הסופי שלכם.',
    svc4a: 'ניהול מלאי לפי מיקום', svc4b: 'ליקוט, אריזה וטיפול בהחזרות', svc4c: 'אחסנה גמישה + הפצה ארצית',

    unTitle: 'מכולה נפרקת. שרשרת נשמרת.',
    un1t: 'המכולה מגיעה', un1d: 'חותם נבדק ומצולם מול תעודת המשלוח, לפני שנוגעים בדלת.',
    un2t: 'הדלתות נפתחות', un2d: 'תיעוד מצב המטען כפי שהוא — הראיה שלכם מול הספק ומול הביטוח.',
    un3t: 'פריקה וספירה', un3d: 'אותו צוות מנוסה בכל פעם — יודע להרים נכון, לספור תוך כדי, ולזהות אריזה פגומה לפני שהיא מגיעה למדף.',
    un4t: 'פלטיזציה ומסירה', un4d: 'מיון לפלטות, עטיפה, כניסה לאחסון מנוהל אצלנו או העמסה אליכם — ודוח פריקה מצולם באותו יום.',
    unCta: 'לתאם פריקה',

    plTitle: 'כמה באמת נכנס למכולה?',
    plSub: 'הכלי שחסר לכל יבואן. הכניסו את המטען — ותראו בשנייה כמה יחידות נכנסות, כמה מכולות תצטרכו, ומה החסם האמיתי: נפח או משקל.',
    plCargo: 'סוג מטען', plLen: 'אורך (ס״מ)', plWid: 'רוחב (ס״מ)', plHei: 'גובה (ס״מ)',
    plWgt: 'משקל ליחידה (ק״ג)', plQty: 'כמות יחידות', plCont: 'סוג מכולה',
    plStack: 'ניתן לערום יחידות זו על זו',
    plNote: 'הערכה הנדסית לצורך תכנון בלבד. ערכי פלטות סטנדרטיים מבוססים על תכולות מקובלות בענף. תמיד נאמת מולכם לפני הזמנת שטח.',
    kpi1: 'נכנסות למכולה', kpi2: 'מכולות דרושות', kpi3: 'ניצולת נפח', kpi4: 'ניצולת משקל',
    barVol: 'נפח', barWgt: 'משקל',
    plQuoteBtn: 'שלחו לי תמחור לפי החישוב', plResetBtn: 'איפוס',
    vUnits: 'יחידות', vLayers: 'שכבות', vFloor: 'על רצפת המכולה',
    vVolBound: 'החסם הוא <b>נפח</b> — המכולה מתמלאת לפני שמגיעים למשקל המותר.',
    vWgtBound: 'החסם הוא <b>משקל</b> — תגיעו למשקל המותר כשעוד יש מקום פנוי במכולה.',
    vFitsAll: 'כל <b>{q}</b> היחידות נכנסות למכולה אחת.',
    vNeeds: 'תצטרכו <b>{n}</b> מכולות מסוג {c} לכל {q} היחידות.',
    vSuggest: 'הצעה: {c} מנצלת את המשלוח הזה טוב יותר.',
    vNoFit: 'היחידה בגודל הזה לא נכנסת למכולה שנבחרה. נסו מכולה גדולה יותר או מטען שטוח.',
    vTight: 'ניצולת נמוכה. שקלו מכולה קטנה יותר או איחוד עם משלוח נוסף (LCL).',

    trTitle: 'איפה המשלוח שלי?',
    trSub: 'מספר אחד. תמונה מלאה — נמל, אונייה, ETA, ומה קורה ברגע זה. נסו: <code>ZDL‑8842‑IL</code>',
    trBtn: 'מעקב',
    trHint: 'נתוני הדגמה. במערכת החיה מוזן מספר ה‑B/L או מספר ההזמנה שלכם.',
    trEta: 'הגעה משוערת', trFrom: 'מוצא', trTo: 'יעד',
    trEmpty: 'הזינו מספר משלוח כדי להתחיל.',
    trS1: 'הזמנה נפתחה', trS2: 'מטען נאסף', trS3: 'נטען לאונייה', trS4: 'בהפלגה',
    trS5: 'הגיע לנמל', trS6: 'שחרור ממכס', trS7: 'פריקה ומסירה',
    trVessel: 'אונייה', trCont: 'מספר מכולה', trType: 'סוג', trWeight: 'משקל', trUpdated: 'עודכן',
    trStatusMoving: 'בהפלגה', trStatusPort: 'בנמל', trStatusDone: 'נמסר', trStatusCustoms: 'במכס',

    prTitle: 'המסע, שלב אחר שלב',
    prSub: 'שבעה שלבים בין המפעל למחסן שלכם. על כל אחד מהם יושב אצלנו איש אחד עם שם וטלפון.',
    pr1t: 'אפיון ותמחור', pr1d: 'מבינים מה אתם מייבאים, מאיפה, ובאיזו תדירות — ובונים תמחור אמיתי, כולל העלויות שאף אחד לא מספר עליהן.',
    pr2t: 'איסוף במוצא', pr2d: 'הסוכן שלנו אוסף מהמפעל, בודק אריזה וסימון, ומאחד משלוחים לחיסכון בשטח.',
    pr3t: 'הזמנת שטח והפלגה', pr3d: 'שריון מקום מול חברות הספנות, מסמכי מטען, וביטוח — ואז ההפלגה מתחילה.',
    pr4t: 'מעקב בזמן אמת', pr4d: 'עדכון בכל נקודת ציון, כולל התרעה מוקדמת על עיכובים לפני שהם הופכים לבעיה.',
    pr5t: 'מכס ושחרור', pr5d: 'הכנת התיק מראש כדי שהמכולה לא תשב בנמל ותצבור ימי אחסנה.',
    pr6t: 'הובלה ופריקה', pr6d: 'מוביל, צוות פריקה וציוד — מתואמים לאותו חלון זמן. אתם מקבלים מכולה פרוקה, לא כאב ראש.',
    pr7t: 'דוח וסגירה', pr7d: 'דוח פריקה מצולם, התאמת ספירה מול רשימת אריזה, וסיכום עלויות שקוף.',

    ntTitle: 'הרשת שמאחורי המשלוח',
    ntSub: 'נמלי מוצא קבועים, זמני שיט אמיתיים, ותדירות הפלגות שאפשר לתכנן לפיה.',
    ntC1: 'נמל מוצא', ntC2: 'יעד', ntC3: 'זמן שיט', ntC4: 'תדירות', ntC5: 'שירות',
    ntNote: 'זמני שיט ממוצעים, כפופים לזמינות שטח ולתנאי נמל.',
    ntDays: 'ימים',
    freqWeekly: 'שבועית', freqBiweekly: 'דו‑שבועית', freqTwice: 'פעמיים בשבוע',

    whTitle: 'למה יבואנים נשארים אצלנו',
    wh1t: 'איש קשר אחד', wh1d: 'לא מוקד. בן אדם שמכיר את המשלוח שלכם בשם.',
    wh2t: 'תמחור בלי כוכביות', wh2d: 'כל העלויות על השולחן מראש — כולל אגרות, אחסנה והובלה יבשתית.',
    wh3t: 'פריקה ואחסון בבית', wh3d: 'לא מעבירים אתכם לקבלן. הצוות שפורק הוא הצוות שלנו, והמחסן שמנהל את הסחורה הוא המחסן שלנו.',
    wh4t: 'תיעוד שמגן עליכם', wh4d: 'כל פריקה מצולמת. כשיש ויכוח עם ספק — יש לכם ראיות.',

    ctTitle: 'נתחיל ממשלוח אחד',
    ctSub: 'ספרו לנו מה אתם מייבאים ומאיפה. תוך יום עסקים אחד תקבלו תמחור מלא, זמן שיט צפוי ותוכנית פריקה.',
    ctPhone: 'טלפון', ctMail: 'אימייל', ctAddr: 'משרד', ctAddrV: 'אשדוד, ישראל',
    ctHours: 'שעות', ctHoursV: 'א׳–ה׳ 08:00–18:00',
    fName: 'שם מלא', fCompany: 'חברה', fPhone: 'טלפון', fEmail: 'אימייל',
    fOrigin: 'נמל / מדינת מוצא', fType: 'סוג שירות',
    fOpt1: 'מכולה מלאה (FCL)', fOpt2: 'משלוח מאוחד (LCL)', fOpt3: 'שילוח אווירי',
    fOpt4: 'פריקת מכולה בלבד', fOpt5: 'ניהול מקצה לקצה',
    fMsg: 'פרטי המטען', fSubmit: 'שליחה — נחזור תוך יום עסקים',
    fAlt: 'ממהרים? כתבו לנו בוואטסאפ ונענה מיד.',
    fErr: 'נא למלא שם, טלפון ואימייל תקינים.',
    fOk: 'תודה! הפרטים נקלטו — נחזור אליכם תוך יום עסקים אחד.',
    fSending: 'שולח…',

    navAbout: 'עלינו',
    abTitle: '25 שנה בנמל. אותו מספר טלפון.',
    abP1: 'משה זדה נכנס לענף בשנת 2001, כשמסמכי מטען עוד נשלחו בפקס ומכולה הייתה מגיעה כשהיא מגיעה. מאז הוא עבר כמעט כל תפקיד שיש בשרשרת — רצפת מחסן, עמילות מכס, תפעול, ניהול — ולמד מקרוב איפה משלוח באמת נשבר.',
    abP2: 'התשובה כמעט תמיד זהה: לא באונייה. משלוחים נשברים בפערים — בין הסוכן בחו״ל לעמיל המכס, בין המכס למוביל, בין המוביל לצוות שאמור לפרוק. בכל פער כזה יושב מישהו שאומר ״זה לא אצלי״, והיבואן נשאר לבד עם הבעיה.',
    abP3: 'ZADALOG נבנתה בדיוק כדי לסגור את הפערים האלה. שתי החוליות שרוב המשלחים מוסרים לקבלן — פריקת המכולות וניהול האחסון — הן דווקא אלה שאנחנו מחזיקים בבית, עם צוות פריקה קבוע ומנוסה ומחסן מנוהל. ספק אחד לכל השרשרת, ומספר טלפון אחד שתמיד עונים בו.',
    abQuote: 'יבואן לא צריך עוד ספק. הוא צריך מישהו אחד שלוקח אחריות על כל הדרך.',
    abQuoteWho: 'משה זדה, מייסד ZADALOG',
    abName: 'משה זדה', abRole: 'מייסד ומנכ״ל',
    abF1: 'בענף מאז', abF2: 'שנות ותק', abF3: 'איש קשר לכל משלוח',
    abCta: 'לדבר איתנו',
    navJobs: 'דרושים',
    jbTitle: 'מחפשים אנשים שאפשר לסמוך עליהם',
    jbSub: 'בלוגיסטיקה אף מערכת לא מצילה משלוח — אנשים כן. אם אתם מדייקים בשעות, אומרים את האמת כשמשהו משתבש, ולא עוזבים עבודה באמצע — יש לנו מקום.',
    jbApply: 'הגשת מועמדות',
    jbWa: 'לפרטים — וואטסאפ בלבד',
    jbHot: 'מגייסים עכשיו',
    jbEmpty: 'אין כרגע משרות פתוחות. שלחו קורות חיים ל‑info@zadalog.com ונשמור אתכם אצלנו.',
    jbSpecT: 'לא מצאתם משרה מתאימה?',
    jbSpecD: 'שלחו קורות חיים בכל מקרה. אנחנו גדלים, והתפקידים נפתחים לפי אנשים לא פחות מלפי צורך.',
    jbSpecBtn: 'שליחת קורות חיים',
    footLine: 'מכולה נפרקת. שרשרת נשמרת.',
    footSvc: 'שירותים', footTools: 'כלים', footContact: 'יצירת קשר', footRights: 'כל הזכויות שמורות',

    mqr: ['שילוח ימי','שילוח אווירי','FCL','LCL','פריקת מכולות','צוות פריקה מנוסה','עמילות מכס','ניהול אחסון לוגיסטי','ניהול מלאי','הפצה ארצית','קונסולידציה','ביטוח מטען','שחרור מהיר']
  };

  var EN = {
    skip: 'Skip to content',
    brandTag: 'M. Zada Logistics Services',
    navServices: 'Services', navPlanner: 'Container planner', navTrack: 'Track',
    navProcess: 'How it works', navNetwork: 'Network', navCta: 'Get a quote',

    heroEyebrow: 'Freight forwarding · Container unloading · Israel',
    heroT1: 'Your container',
    heroT2: "doesn't stop at the port.",
    heroSub: 'ZADALOG runs the whole journey — from the factory floor in Asia to the shelf in your warehouse in Israel. Booking, customs and port; our own experienced container unloading crew; and managed logistics storage once the container is empty. One provider, one accountability, no surprises.',
    heroCta1: 'Price my shipment', heroCta2: 'Try the container planner',
    stat1: 'Containers a year', stat2: 'Origin ports', stat3: 'Unloaded within', stat4: 'Client retention',
    tickerTitle: 'Ops room · live', tickerFoot: 'Demo feed · updates every 3 seconds', scroll: 'Scroll',

    svcTitle: 'Four links. One chain.',
    svcSub: 'Most shipments break at the seams — between the agent and the broker, between the port and the warehouse. We hold every seam ourselves.',
    svc1t: 'Freight forwarding',
    svc1d: 'Sea, air and road. FCL and LCL, guaranteed space in peak season, origin consolidation and supplier handling on your behalf.',
    svc1a: 'FCL · LCL · Air', svc1b: 'Consolidation in China & Europe', svc1c: 'Cargo insurance',
    svc2t: 'Container unloading',
    svc2d: 'The heart of the company. A permanent, experienced unloading crew — not casual labour that changes with every shipment. The right handling gear, live counting and damage control, and a photo report before the driver leaves.',
    svc2a: 'Permanent crew · manual & mechanical', svc2b: 'Sorting, counting, palletising', svc2c: 'A 40ft container in 3–4 hours',
    svc3t: 'Customs brokerage',
    svc3d: 'Correct classification up front, standards and import permits handled, fast release. Fewer storage days at the port is money that stays with you.',
    svc3a: 'Classification & duty planning', svc3b: 'Standards & import permits', svc3c: 'Fast port release',
    svc4t: 'Managed logistics storage',
    svc4d: 'Not just floor space. Inventory managed by location, quantity tracking, pick and pack to order, and nationwide distribution — including delivery to your own end customer.',
    svc4a: 'Inventory managed by location', svc4b: 'Pick, pack and returns handling', svc4c: 'Flexible storage + nationwide delivery',

    unTitle: 'Container unloaded. Chain unbroken.',
    un1t: 'The container arrives', un1d: 'Seal checked and photographed against the bill of lading, before anyone touches the door.',
    un2t: 'The doors open', un2d: 'Cargo condition documented exactly as found — your evidence against the supplier and the insurer.',
    un3t: 'Unload and count', un3d: 'The same experienced crew every time — they lift properly, count as they go, and spot damaged packaging before it reaches your shelf.',
    un4t: 'Palletise and hand over', un4d: 'Sorted onto pallets, wrapped, then into our managed storage or straight onto your truck — with a photo report the same day.',
    unCta: 'Book an unloading',

    plTitle: 'How much actually fits?',
    plSub: 'The tool every importer is missing. Enter your cargo and see in a second how many units fit, how many containers you need, and what the real constraint is: volume or weight.',
    plCargo: 'Cargo type', plLen: 'Length (cm)', plWid: 'Width (cm)', plHei: 'Height (cm)',
    plWgt: 'Weight per unit (kg)', plQty: 'Units to ship', plCont: 'Container type',
    plStack: 'Units can be stacked on top of each other',
    plNote: 'Engineering estimate for planning only. Standard pallet figures follow accepted industry loading counts. We always verify with you before booking space.',
    kpi1: 'Fit per container', kpi2: 'Containers needed', kpi3: 'Volume used', kpi4: 'Weight used',
    barVol: 'Volume', barWgt: 'Weight',
    plQuoteBtn: 'Quote me based on this', plResetBtn: 'Reset',
    vUnits: 'units', vLayers: 'layers', vFloor: 'on the container floor',
    vVolBound: 'The constraint is <b>volume</b> — the container fills up before you reach the payload limit.',
    vWgtBound: 'The constraint is <b>weight</b> — you hit the payload limit while space is still free.',
    vFitsAll: 'All <b>{q}</b> units fit in a single container.',
    vNeeds: 'You will need <b>{n}</b> × {c} containers for all {q} units.',
    vSuggest: 'Suggestion: a {c} would use this shipment better.',
    vNoFit: 'A unit that size does not fit the selected container. Try a larger box or flat-rack cargo.',
    vTight: 'Low utilisation. Consider a smaller container or consolidating with another shipment (LCL).',

    trTitle: 'Where is my shipment?',
    trSub: 'One number. The whole picture — port, vessel, ETA, and what is happening right now. Try: <code>ZDL-8842-IL</code>',
    trBtn: 'Track',
    trHint: 'Demo data. In the live system you enter your B/L or booking number.',
    trEta: 'Estimated arrival', trFrom: 'Origin', trTo: 'Destination',
    trEmpty: 'Enter a tracking number to begin.',
    trS1: 'Booking opened', trS2: 'Cargo collected', trS3: 'Loaded on board', trS4: 'In transit',
    trS5: 'Arrived at port', trS6: 'Customs cleared', trS7: 'Unloaded & delivered',
    trVessel: 'Vessel', trCont: 'Container no.', trType: 'Type', trWeight: 'Weight', trUpdated: 'Updated',
    trStatusMoving: 'In transit', trStatusPort: 'At port', trStatusDone: 'Delivered', trStatusCustoms: 'In customs',

    prTitle: 'The journey, step by step',
    prSub: 'Seven stages between the factory and your warehouse. Each one has a named person behind it, with a phone number.',
    pr1t: 'Scoping & pricing', pr1d: 'We learn what you import, from where, and how often — then build real pricing, including the costs nobody mentions.',
    pr2t: 'Origin pickup', pr2d: 'Our agent collects from the factory, checks packing and marking, and consolidates to save space.',
    pr3t: 'Booking & sailing', pr3d: 'Space secured with the carriers, cargo documents and insurance — then the vessel sails.',
    pr4t: 'Live tracking', pr4d: 'An update at every milestone, including early warning on delays before they become problems.',
    pr5t: 'Customs & release', pr5d: 'The file is prepared in advance so the container never sits at the port racking up storage.',
    pr6t: 'Haulage & unloading', pr6d: 'Trucker, unloading crew and equipment — all booked into the same window. You get an empty container, not a headache.',
    pr7t: 'Report & close', pr7d: 'Photo unloading report, count reconciled against the packing list, and a transparent cost summary.',

    ntTitle: 'The network behind the shipment',
    ntSub: 'Fixed origin ports, honest transit times, and sailing frequencies you can actually plan around.',
    ntC1: 'Origin port', ntC2: 'Destination', ntC3: 'Transit', ntC4: 'Frequency', ntC5: 'Service',
    ntNote: 'Average transit times, subject to space availability and port conditions.',
    ntDays: 'days',
    freqWeekly: 'Weekly', freqBiweekly: 'Biweekly', freqTwice: 'Twice weekly',

    whTitle: 'Why importers stay',
    wh1t: 'One point of contact', wh1d: 'Not a call centre. A person who knows your shipment by name.',
    wh2t: 'Pricing without asterisks', wh2d: 'Every cost on the table up front — fees, storage and inland haulage included.',
    wh3t: 'Unloading and storage in-house', wh3d: 'We do not hand you to a subcontractor. The crew that unloads is our crew, and the warehouse holding your goods is our warehouse.',
    wh4t: 'Documentation that protects you', wh4d: 'Every unload is photographed. When a supplier argues, you have evidence.',

    ctTitle: 'Start with one shipment',
    ctSub: 'Tell us what you import and from where. Within one business day you get full pricing, expected transit and an unloading plan.',
    ctPhone: 'Phone', ctMail: 'Email', ctAddr: 'Office', ctAddrV: 'Ashdod, Israel',
    ctHours: 'Hours', ctHoursV: 'Sun–Thu 08:00–18:00',
    fName: 'Full name', fCompany: 'Company', fPhone: 'Phone', fEmail: 'Email',
    fOrigin: 'Origin port / country', fType: 'Service',
    fOpt1: 'Full container (FCL)', fOpt2: 'Consolidated (LCL)', fOpt3: 'Air freight',
    fOpt4: 'Container unloading only', fOpt5: 'End-to-end management',
    fMsg: 'Cargo details', fSubmit: 'Send — we reply within one business day',
    fAlt: 'In a hurry? Message us on WhatsApp for an immediate answer.',
    fErr: 'Please enter a name, a phone number and a valid email.',
    fOk: 'Thank you! We have your details and will come back within one business day.',
    fSending: 'Sending…',

    navAbout: 'About',
    abTitle: '25 years at the port. The same phone number.',
    abP1: 'Moshe Zada entered the industry in 2001, when cargo documents still went by fax and a container arrived when it arrived. Since then he has worked nearly every role in the chain — warehouse floor, customs brokerage, operations, management — and learned first hand where a shipment actually breaks.',
    abP2: 'The answer is almost always the same: not at sea. Shipments break in the gaps — between the overseas agent and the customs broker, between customs and the haulier, between the haulier and whoever is meant to unload. In every one of those gaps sits someone saying "not my part", and the importer is left alone with the problem.',
    abP3: 'ZADALOG was built to close those gaps. The two links most forwarders hand to a subcontractor — container unloading and storage management — are exactly the ones we keep in house, with a permanent experienced crew and a warehouse we run ourselves. One provider for the whole chain, and one phone number that is always answered.',
    abQuote: 'An importer does not need another supplier. They need one person who owns the whole route.',
    abQuoteWho: 'Moshe Zada, founder of ZADALOG',
    abName: 'Moshe Zada', abRole: 'Founder & CEO',
    abF1: 'In the industry since', abF2: 'Years of experience', abF3: 'Contact per shipment',
    abCta: 'Talk to us',
    navJobs: 'Careers',
    jbTitle: 'We are hiring people you can count on',
    jbSub: 'In logistics no system saves a shipment — people do. If you keep to the hour, say so when something goes wrong, and never walk off a job half done, there is a place for you here.',
    jbApply: 'Apply for this role',
    jbWa: 'Details — WhatsApp only',
    jbHot: 'Hiring now',
    jbEmpty: 'No open positions right now. Send your CV to info@zadalog.com and we will keep it on file.',
    jbSpecT: 'Nothing that fits?',
    jbSpecD: 'Send your CV anyway. We are growing, and roles open around good people as often as around need.',
    jbSpecBtn: 'Send your CV',
    footLine: 'Container unloaded. Chain unbroken.',
    footSvc: 'Services', footTools: 'Tools', footContact: 'Contact', footRights: 'All rights reserved',

    mqr: ['Ocean freight','Air freight','FCL','LCL','Container unloading','Experienced unloading crew','Customs brokerage','Managed logistics storage','Inventory management','Nationwide distribution','Consolidation','Cargo insurance']
  };

  var dict = { he: HE, en: EN };
  var current = 'he';
  var listeners = [];

  function t(key, vars) {
    var s = dict[current][key];
    if (s === undefined) s = dict.he[key];
    if (s === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split('{' + k + '}').join(vars[k]);
      });
    }
    return s;
  }

  function apply() {
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'he' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v.indexOf('<') > -1) el.innerHTML = v; else el.textContent = v;
    });

    document.querySelectorAll('.lang__opt').forEach(function (el) {
      el.classList.toggle('is-on', el.dataset.lang === current);
    });

    document.title = current === 'he'
      ? 'ZADALOG — שילוח בינלאומי ופריקת מכולות'
      : 'ZADALOG — Freight forwarding & container unloading';

    listeners.forEach(function (fn) { try { fn(current); } catch (e) {} });
  }

  function set(lang) {
    if (lang === current) return;
    current = lang;
    try { localStorage.setItem('zd-lang', lang); } catch (e) {}
    apply();
  }

  function init() {
    var saved = null;
    try { saved = localStorage.getItem('zd-lang'); } catch (e) {}
    if (!saved) saved = 'he';   /* Israeli home market first; EN is one click away */
    current = saved === 'en' ? 'en' : 'he';
    apply();
  }

  return {
    t: t, set: set, init: init,
    get lang() { return current; },
    onChange: function (fn) { listeners.push(fn); }
  };
})();
