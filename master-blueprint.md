Ownership update · 6 November 2026: Shams owns C03–C07 asset contracts/collection and C13 independent asset verification. Amr retains vulnerability/advisory data and C02/C11/C12/C14 execution/recovery; Mahrous reviews matching/closure. Earlier ownership notes below are retained as dated history.

Ownership correction · 4 November 2026: Amr owns vulnerability/advisory data; Shams owns asset/inventory data. C02 lab and C11/C12/C14 patch execution remain Amr; C03 remains Mahrous; P02 remains Omar. Current task cards and responsibility map supersede historical owner references below.

# AegisLoop — Master Project Blueprint

## Current scope revision

Scope 2026-10-23.r2. The current supported profiles, on-prem stages, team handoff and meeting evidence are in [scope-baseline.md](scope-baseline.md) and [research/meeting-revision.md](research/meeting-revision.md). Historical scope and original research below are retained; where they conflict, the explicit scope revision and linked package acceptance criteria take precedence.

Research reviewed: 14 October 2026. Assembly: 15 October 2026.

خطة تنفيذ موصى بها؛ ليست منتجًا منفذًا أو نتائج تجارب. القرارات التجريبية لا تتحول إلى التزام قبل اجتياز بواباتها.

This document preserves the completed research and the technical master plan. It does not modify the original proposal. All work packages are planned implementation, not claimed completed product features.

## Navigation

- Executive scope and assumptions
- Team responsibilities
- Delivery gates and dependencies
- Decision log
- Work packages
- Risk register and architecture challenge
- Experiments and requirements
- Research chapters and source register

## Scope

### قبل يناير — هدف داخلي

Ubuntu release واحدة مدعومة يختارها الفريق بعد تجربة؛ جمع موثوق، مطابقة vendor-aware، تقييم أولوية، تفسير بمصادر، دورة patch كاملة وتنفيذ فعلي محدود في اللاب، تحقق، RBAC وSIEM. Windows inventory يدخل مبكرًا إذا اجتاز التجربة.

### الترم الثاني

توسيع Windows collection ثم patch adapter مؤهل؛ جهاز شبكة محدد أو محاكاة معلنة؛ offline evidence؛ تجارب AI ومقارنة baselines؛ hardening، استعادة، واختبار مستخدمين.

### المنتج لاحقًا

موصلات vendor إضافية وcloud accounts وmulti-tenant isolation وتشغيل موزع وscale أعلى. التصميم يحتفظ بواجهات الامتداد، ولا ننفذها كلها الآن.

### لا نبدأ به

تدريب LLM من الصفر، universal scanner، exploit execution آلي، تحديث firmware عام، Kubernetes، microservices كثيرة، breach monitoring، أو dashboard ضخم قبل أول رحلة حقيقية.

### تعريف التغطية

نعرض ثلاثة أشياء منفصلة: assets discovered / assets with sufficient evidence / assets assessed by supported rules. قابلية الاكتشاف لا تعني قابلية الفحص، وقابلية الفحص لا تعني دعم التحديث الآلي.

## Facts and assumptions

### مؤكد من كلام الفريق

خمسة أعضاء؛ مشروع طوال السنة؛ أربع مناقشات؛ إضافة Patch Management وتحديث CVE وRAG ومساعد متخصص.

### مؤكد من الـproposal المقروء

هدف تحديث CVEs خلال 24 ساعة، اكتشاف ≥90% داخل بيئة اختبار محددة، تقييم وضوح وقابلية تنفيذ التوصيات ≥90%، أربعة أدوار، وربط SIEM. لا نغيّر النص الأصلي.

### افتراض زمني

23 أكتوبر 2026 موعد داخلي مقترح لتجهيز عرض توزيع العمل؛ ليس موعدًا رسميًا من الكلية. مواعيد المناقشات الأربع تحتاج تأكيد.

### افتراض موارد

الـproposal يذكر ميزانية 1,500 جنيه و5 لابتوبات. مواصفات RAM/CPU/GPU والساعات الأسبوعية وإتاحة Windows lab غير معروفة. لا نعد بخدمة سحابية مدفوعة ضمن هذا الرقم.

### معلومة تحتاج تصحيحًا إداريًا

نستخدم Shams كما سمّاها الفريق؛ قائمة الأسماء الرسمية في الـPDF تحتوي Shahd. نؤكد الاسم الرسمي قبل تعبئة template، ولا نساوي بينهما تلقائيًا.

### حدود المسؤوليات

صفات Hams وShams وخبرة Omar بالمنصات وطاقـة Amr من وصف الفريق. اختيار Mahrous لقيادة المطابقة والسياسات توصية تحتاج تجربة مهارة؛ لا نفترض خبرة تقنية غير مثبتة.

### مقترح قابل للاختبار

الأولوية لنظام واحد متكامل ومحدود الدعم قبل توسيع أنواع الأجهزة. حجم المنتج طويل الأجل أكبر من نطاق الديمو الأول.

### حدود الادعاء

أفضل مشروع هدف يوجّه الجودة، وليس نتيجة مضمونة. البحث لا يثبت التفوق على Tenable؛ التجارب المقارنة وحدها تثبت تفوقًا في نطاق ومقياس معلنين.

## Team responsibilities

### Hams — AI & evaluation

**Why this owner:** تحب AI وباحثة جيدة بحسب وصف الفريق؛ مناسبة لتصميم التجارب وفهم جودة النتائج.

**Owns:** Taxonomy، dataset، baseline classifiers، retrieval، مقارنة LLM، grounding، تقييم الهلوسة والتكلفة.

**Skills to learn:** Python data pipelines؛ multilabel metrics؛ temporal splits؛ embeddings؛ tool schemas؛ reproducible experiments.

**Next-week deliverable:** تكتب 3 مهام AI منفصلة، label guide و30 مثالًا مزدوج المراجعة، وتعرض baseline صغيرًا مع split موثق.

**Support/reviewer:** Shams تراجع labels؛ Mahrous يراجع صحة cyber؛ Omar يربط API ويقيس latency.

**If blocked:** لو المصدر غير جاهز: corpus fixture ثابت ومعلن + query benchmark + اختبارات citations.

**Faculty proof:** تشغّل notebook من البداية وتفسر خطأين ولماذا baseline ضروري.

### Omar — Platform & integration

**Why this owner:** خبرة بناء منصات بحسب الفريق؛ نستخدمها لربط مكونات المشروع وتثبيت العقود مبكرًا. Framework skills تحتاج قياسًا.

**Owns:** Schema، OpenAPI، auth/RBAC، jobs/outbox، evidence storage، UI، deployment والنسخ الاحتياطي.

**Skills to learn:** FastAPI/PostgreSQL المقترحان إن لزم؛ job recovery؛ migrations؛ threat boundaries؛ integration tests.

**Next-week deliverable:** API skeleton + migration أولى + mock asset/finding UI + role matrix؛ يربط fixture واحدة بالواجهة.

**Support/reviewer:** يساعد Hams في inference API وقياس الموارد، لا يتحول بالكامل لتدريب النماذج. Amr يختبر runner contract.

**If blocked:** يبني contract tests وmock APIs وواجهة evidence review وdata import؛ لا ينتظر model النهائي.

**Faculty proof:** يشرح request من الواجهة للـDB ويمنع Guest من action محظور في اختبار API.

### Shams — Intelligence & research quality

**Why this owner:** بحثها يأخذ وقتًا لكنه يعود بنتائج قوية، ولديها اهتمام business وخلفية cyber؛ يناسب مصدر الحقيقة والتقييم المقارن.

**Owns:** Source adapters، provenance، quality checks، vendor patch catalog، label review، competitor matrix، مقابلات المستخدم.

**Skills to learn:** HTTP pagination/retry؛ JSON schema؛ CVE/OSV/CSAF؛ version semantics؛ source licensing؛ SQL.

**Next-week deliverable:** Source register، 3 raw records من مصدرين، canonical mapping، وحالة advisory ناقص/متعارض.

**Support/reviewer:** Hams تنظيف وlabels؛ Mahrous قواعد التأثر؛ Omar ingestion contract.

**If blocked:** تكمل fixtures، source terms، annotation guide، ومقابلات workflow بدل انتظار كل feeds.

**Faculty proof:** تتتبع finding إلى source revision وتشرح لماذا NVD وحده لا يكفي.

### Amr — Collection & remediation execution

**Why this owner:** عضو نشيط بحسب الفريق؛ نعطيه بناءً عمليًا واضح النتائج ومسؤولية تقنية كاملة. لا نبني توزيع العمل على تشخيص طبي.

**Owns:** Lab، discovery، authenticated inventory، adapters، runner، pilot patches، reboot handling، recovery exercises.

**Skills to learn:** Linux packages/SSH؛ Windows inventory/WinRM؛ safe scope؛ Ansible؛ process control؛ idempotency.

**Next-week deliverable:** Lab معزول موثق + inventory JSON لجهاز واحد + scope deny test + إثبات restore بسيط.

**Support/reviewer:** Mahrous يراجع شروط السياسة؛ Omar jobs/auth؛ Shams vendor prerequisites.

**If blocked:** يبني simulated adapters للأخطاء والانقطاع وfixtures أجهزة مختلفة، مع تمييز المحاكاة.

**Faculty proof:** يجمع OS/build/packages، يرفض target خارج scope، ويعيد اللاب لحالة معروفة.

### Mahrous — Applicability, risk & technical coordination

**Why this owner:** خلفية cyber ودور تنسيق الصورة الكاملة؛ المطابقة والسياسات تعطيه مساهمة هندسية قابلة للقياس بجانب إدارة المشروع.

**Owns:** Matching engine، confidence/unknown، prioritization، approval policies، reassessment، ground truth وتصميم الاختبارات.

**Skills to learn:** CPE/purl ونسخ distributions؛ CVSS/EPSS/KEV؛ rule engines؛ test design؛ threat modeling.

**Next-week deliverable:** 10 حالات affected/not_affected/unknown، risk-policy v0، dependency map وdemo script موحد.

**Support/reviewer:** Shams توثيق المصدر؛ Amr دليل الجهاز؛ Hams قياس uncertainty؛ Omar audit/API.

**If blocked:** يكتب decision tables وgold fixtures واختبارات backport/boundary قبل وصول collectors.

**Faculty proof:** يشرح حالة backport وحالة unknown ويثبت أن CVSS العالي وحده لا يحدد الأولوية.

## Delivery gates and critical dependencies

Scope/contracts → lab inventory + authoritative advisory mapping → applicability correctness → patch eligibility/recovery → approved pilot → post-check → reproducible integrated evaluation. هذا مسار اعتماديات مبدئي؛ المسار الحرج الزمني النهائي لا يُحسب قبل تقدير المهام والساعات المتاحة. AI evaluation قد يصبح مسارًا موازيًا حرجًا لو تأخرت labels أو hardware.

### G0 — كل واحد يعرف شغله ويثبت أول خطوة

15–23 أكتوبر 2026 · داخلي مقترح

**deliver:** صفحة مسؤوليات + skill spikes + scope matrix + API fixtures + architecture v0 + قائمة المخاطر الأولى.

**gate:** الفريق يعرض نفس الرحلة؛ كل عضو artifact صغير قابل للتشغيل أو المراجعة، reviewer معروف، وكل missing input له owner.

**parallel:** Hams labels/baseline؛ Shams sources؛ Amr lab؛ Mahrous matching fixtures؛ Omar contracts/skeleton.

**stop:** لا نحجز infrastructure مدفوعة ولا نبني full dashboard ولا ندرب LLM.

### G1 — أول رحلة end-to-end بدليل حقيقي

المناقشة الأولى · بعد midterm؛ التاريخ غير مؤكد

**deliver:** جهاز واحد → inventory → advisory → finding مع evidence → UI بأدوار → event. Baseline AI مستقل قابل للتكرار.

**gate:** الـfixture والـreal result مميزان؛ affected/unknown ظاهرتان؛ role-denial اختبار ناجح؛ source revision محفوظ.

**parallel:** AI يستمر على corpus ثابت، UI على mocks، collectors وfeeds يتقابلان عند canonical contracts.

**stop:** لا توسع vendors قبل نجاح دمج واحد. لا تربط AI بأوامر patch.

### G2 — قيمة عملية كاملة في نطاق صغير

المناقشة الثانية · final الترم الأول؛ هدف داخلي قبل يناير

**deliver:** Ubuntu path حقيقي، تحديث معرفة مجدول، إعادة تقييم، خطة patch وموافقة وتنفيذ pilot وتحقيق صحة الخدمة، توصية grounded، SIEM ingestion.

**gate:** مسار نجاح ومسار انقطاع واستعادة؛ fresh-data timestamps؛ recall/precision موثقان على lab؛ backup restored؛ لا critical authorization defect مفتوح.

**parallel:** تقييم AI/الواجهة بالتوازي مع patch lab بعد استقرار evidence والمطابقة.

**stop:** تجميد features قبل المناقشة بأسبوعين مقترحين؛ bug fixes وrehearsal فقط.

### G3 — توسيع محسوب وإثبات الفرضيات

المناقشة الثالثة · بعد midterm الترم الثاني؛ TBD

**deliver:** Windows adapter مؤهل أو fallback manual معلن؛ offline bundle؛ vendor/device إضافي واحد؛ مقارنة baseline/ablation؛ usability pilot.

**gate:** كل adapter جديد له support matrix وfixtures ودليل failure recovery؛ لا نخلط نتائج أنظمة غير مدعومة بالمقياس الأساسي.

**parallel:** Amr Windows؛ Shams vendor expansion/user interviews؛ Hams experiments؛ Omar hardening؛ Mahrous evaluation.

**stop:** لا نعد بدعم universal firmware/OT أو SaaS multi-tenancy.

### G4 — منتج قابل للتسليم وبحث قابل للدفاع

المناقشة النهائية · مايو/يونيو 2027 افتراض يحتاج تأكيد

**deliver:** نسخة مجمدة، نتائج مع حدود ثقة وأخطاء، تقرير/عرض، reproducible lab، source/license register، runbooks، handover، demo offline.

**gate:** Fresh install من التعليمات بواسطة عضو آخر؛ restore مجرّب؛ benchmark ثابت؛ كل ادعاء له evidence؛ موافقات مستخدمين/بيانات موثقة.

**parallel:** قصة العرض/الفيديو والبحث يمكن إكمالها مع hardening؛ dataset freeze يسبق final evaluation.

**stop:** إيقاف أي تجربة غير حاسمة قبل freeze؛ novelty غير المثبتة تعرض كفرضية لا نتيجة.

- G0 scope & contracts → Intelligence adapters + Inventory adapters + AI baseline + platform skeleton. تعمل بالتوازي باستخدام fixtures موحدة.
- Intelligence + Inventory → Applicability engine. يحتاج هوية المنتج والنسخة والشروط، لا يكفي CVE text.
- Applicability + asset context → Priority & remediation options. لا نرتب إصلاحًا كأنه مؤكد إذا التأثر unknown.
- Verified sources + retrieval benchmark → Grounded assistant. الـLLM يشرح؛ decision tools تجيب بيانات الجهاز والمطابقة.
- Patch applicability + recovery plan + policy → Approval & pilot execution. الموافقة مرتبطة بخطة ونسخ أدلة؛ drift يلغي صلاحيتها.
- Pilot + post-inventory + service health → Verified closure & SIEM. نجاح command لا يغلق finding؛ يلزم تحقق.
- Stable integrated slice → Broader coverage & controlled experiments. زيادة حجم البيانات قبل correctness تزيد الضوضاء.

## Cadence and estimation

- أسبوعيًا: integration demo قصير لنتيجة قابلة للتشغيل، risk review، وتحديث ADR واحد عند تغير القرار. كل عضو primary task واحدة ومعها review task لتقليل التشتت.
- كل أسبوعين: freeze صغير + تشغيل regression fixtures + source-health/metrics review + مقارنة planned/actual effort. بعد أول دورتين نعيد تقدير roadmap من throughput الفعلي.
- Definition of Ready: input contract + owner + reviewer + dependencies + acceptance. Definition of Done: artifact يعمل من clean setup، evidence محفوظ، review تم، docs محدثة، لا secret ولا known critical defect.
- تقدير مؤقت فقط: لو كل عضو10 ساعات/أسبوع يصبح الإجمالي50؛ بعد احتياطي30% يبقى35 ساعة للمهام المخططة. هذا مثال حسابي وليس معرفة بوقت الفريق؛ لا نوزع80 مهمة على التواريخ بلا تقدير فعلي.
- قاعدة التأخير: لو milestone معرض للخطر نقلل عدد adapters/features الاختيارية؛ لا نحذف auth/verification/recovery أو نخفف معيار الصحة بصمت.
- كل قرار ADR يسجل problem، alternatives، evidence date، recommendation، experiment gate، owner، supersedes. مراجعة licensing والمصادر عند كل milestone وقبل أي نشر تجاري.

## Decision log

### ADR01 — مصدر الحقيقة

**Status:** توصية مشروطة

**choice:** CVEListV5 + vendor assertions + NVD enrichment async

**why:** سرعة المعرفة لا تنتظر اكتمال NVD؛ نحفظ المصدر والمراجعات والتعارض.

**alternatives:** NVD-only أبسط لكنه غير كافٍ للتأثر؛ commercial API قد يوفر وقتًا مقابل كلفة وترخيص واعتماد على vendor.

**gate:** D01–D05: عينات new/modified/rejected/unfixed ثم replay بلا duplicates.

**risk:** Schema/rate/API/redistribution changes؛ لا مصدر يغطي كل ثغرة.

**fallback:** آخر snapshot مع stale flag؛ adapter بديل مستقل.

**owner:** Shams

Sources: DS01, DS02, DS20

### ADR02 — Vendor adapters

**Status:** توصية مشروطة

**choice:** Ubuntu OSV أولًا؛ MSRC وRed Hat CSAF/VEX لاحقًا

**why:** الـvendor يحدد branch وfixed package؛ Ubuntu يتيح fixed/unfixed records.

**alternatives:** OVAL مناسب cross-check؛ scraper هش؛ CPE-only لا يفسر backports أو Windows supersedence.

**gate:** اختر Ubuntu release واحدة مع binary→source mapping؛ Windows spike مستقل.

**risk:** Entitlement/EOL ونسخ packages وحقوق إعادة النشر؛ OSV upstream ليس alias.

**fallback:** Manual reviewed assertion؛ unknown عند نقص الشروط.

**owner:** Shams

Sources: DS03, DS04, DS05, DS10, DS11

### ADR03 — هوية الثغرة والـasset

**Status:** توصية مشروطة

**choice:** UUID داخلي + typed aliases/related/upstream + CPE/purl حسب النوع

**why:** يدعم non-CVE ويمنع دمج advisory متعدد CVEs كأنه ثغرة واحدة.

**alternatives:** CVE primary key يحذف non-CVE؛ purl-only لا يغطي كل appliance؛ SBOM inventory evidence لا يثبت reachability.

**gate:** D08–D10: collision/version/boundary fixtures؛ SBOM/VEX provenance.

**risk:** False merge أو VEX خاطئ يسقط finding حقيقي.

**fallback:** Keep distinct records وربط reviewed candidate.

**owner:** Mahrous

Sources: DS07, DS08, DS22, DS17, DS18, DS19

### ADR04 — قرار التأثر

**Status:** توصية مشروطة

**choice:** Deterministic vendor-aware engine بثلاث حالات

**why:** affected/not_affected/unknown مع مقارنة versions ودليل وشروط.

**alternatives:** LLM/fuzzy candidate generation أوسع لكنه غير موثوق كحكم؛ exploit validation ليس شرطًا عامًا.

**gate:** D09 + C08 + D15: gold fixtures مع backport/config missing وprecision/recall.

**risk:** الخطأ في ecosystem comparator أخطر من اختيار model ضعيف.

**fallback:** Unknown + targeted evidence request + analyst review.

**owner:** Mahrous

Sources: DS03, DS05, DS06

### ADR05 — تحديد الأولوية

**Status:** توصية مشروطة

**choice:** Policy bands تفسيرية: KEV + exposure + criticality + CVSS + dated EPSS

**why:** كل إشارة لها معنى؛ EPSS forecast وCVSS severity ليستا risk score محليًا.

**alternatives:** Weighted score baseline ممكن؛ learned ranking يحتاج labels؛ SSVC يساعد decision tree لكنه يحتاج سياق المؤسسة.

**gate:** D12: حالات متعارضة وmissing signals ومراجعة supervisor policy.

**risk:** KEV absence لا تعني no exploitation؛ non-CVE لا يملك EPSS؛ لا threshold عالمي.

**fallback:** Manual priority مع reasons وreview date.

**owner:** Mahrous

Sources: DS12, DS13, DS14, DS15, DS16

### ADR06 — Discovery & inventory

**Status:** توصية مشروطة

**choice:** Nmap مستقل محدود + native SSH Ubuntu؛ agent Windows بعد مقارنة

**why:** Discovery يكتشف endpoints؛ authenticated collection يثبت packages/builds.

**alternatives:** osquery أخف نسبيًا لكن يحتاج transport؛ Wazuh ممتاز إن موجود؛ Greenbone أثقل ومفيد validation اختياري.

**gate:** C01–C06: scope/identity/permissions/footprint على الأجهزة الفعلية.

**risk:** NPSL/Npcap redistribution؛ active probes fragile devices؛ privilege drift.

**fallback:** Signed export/manual inventory بإظهار freshness.

**owner:** Amr

Sources: CY-S01, CY-S02, CY-S05, CY-S07, CY-S08, CY-S09, CY-S11

### ADR07 — Patch execution

**Status:** توصية مشروطة

**choice:** نبني orchestration ونستخدم native managers عبر allowlisted Ansible adapter

**why:** القيمة في applicability، approvals، recovery والتحقق، لا إعادة بناء package manager.

**alternatives:** Native direct أبسط dependency لكن نملك parsing/reboots؛ commercial integrations لاحقًا عند availability.

**gate:** C11–C13: Ubuntu canary + interruption + restore؛ Windows C14 بعد gate مستقل.

**risk:** GPL/collection terms؛ check-mode لا يثبت compatibility؛ لا rollback عام.

**fallback:** Manual approved execution + fresh evidence، أو no mutation.

**owner:** Amr

Sources: CY-S03, CY-S04, CY-S06, CY-S14, G-S06

### ADR08 — Backend boundary

**Status:** توصية مشروطة

**choice:** Python modular monolith + منفذ privileged منفصل

**why:** يقلل integration cost ويحافظ على boundary للمهام الخطرة.

**alternatives:** Microservices تعقيد deployment/observability مبكر؛ فصل كل module ليس scalability مثبتة.

**gate:** P02/P08: typed contracts؛ API/LLM لا ينفذ shell؛ runner rejects invalid scope.

**risk:** Single host failure؛ module coupling؛ privilege escalation.

**fallback:** تخفيض profile وتشغيل manual lab؛ فصل service لاحقًا عند قياس bottleneck.

**owner:** Omar

Sources: SRC-P01, SRC-P19, SRC-P22, SRC-P23

### ADR09 — Backend framework

**Status:** توصية مشروطة

**choice:** FastAPI candidate؛ Django أقوى بديل

**why:** Python/OpenAPI contracts تسهل AI/data؛ القرار يحترم مهارة Omar الفعلية.

**alternatives:** Django يوفر auth/admin أكثر؛ NestJS مناسب TS قوي لكنه يزيد Python boundary.

**gate:** P01: endpoint+migration في يومي عمل مركزين كحد تجريبي؛ auth component review قبل اعتماد framework.

**risk:** FastAPI لا يوفر نظام مستخدمين كاملًا؛ السرعة النظرية لا تثبت workload.

**fallback:** Django أو stack يتقنه Omar مع نفس contracts.

**owner:** Omar

Sources: SRC-P01, SRC-P02, SRC-P03

### ADR10 — Frontend

**Status:** توصية مشروطة

**choice:** React + TypeScript + Vite SPA

**why:** Dashboard خاص يحتاج data/state أكثر من SEO؛ نفس origin مع API.

**alternatives:** Next.js قوي لو server rendering/SSO integrations أو خبرة Omar ترجحه؛ vanilla UI للـplanning site فقط وليس قرار backend المنتج.

**gate:** P05: keyboard/RTL/error/loading مع fixture ثم real endpoint.

**risk:** Routing/data cache dependencies إضافية؛ تحقق versions والصيانة عند spike.

**fallback:** واجهة محدودة بلا polish زائد أو stack مثبت للفريق.

**owner:** Omar

Sources: SRC-P04, SRC-P05, SRC-P06

### ADR11 — Database & retrieval

**Status:** توصية مشروطة

**choice:** PostgreSQL relational + JSONB؛ pgvector بعد benchmark

**why:** الـjoins والتاريخ والصلاحيات وsearch في نظام واحد؛ canonical ≠ vector.

**alternatives:** MySQL JSON صالح لو خبرة أقوى؛ Qdrant لاحقًا إن scale/filtering justify خدمة ثانية.

**gate:** P03/A07: duplicate/revision integrity، filtered recall، restore وquery plan.

**risk:** ANN recall/memory؛ indexing JSON عشوائي؛ RLS superuser bypass.

**fallback:** Lexical/exact search أولًا؛ isolate retrieval adapter.

**owner:** Omar

Sources: SRC-P07, SRC-P08, SRC-P09, SRC-P10, SRC-P11, G-S04

### ADR12 — Durable jobs

**Status:** توصية مشروطة

**choice:** Postgres job ledger/outbox؛ Celery + RabbitMQ أول تجربة broker

**why:** الدليل التجاري لحالة job لا يعتمد على memory أو worker callback.

**alternatives:** Redis/RQ أبسط إن جاهز لكن visibility/license matters؛ DB-only يقلل خدمات لكنه يحملنا leases/recovery.

**gate:** E04/P07: duplicate/crash/broker restart/reconcile + measured RAM.

**risk:** At-least-once ≠ exactly-once؛ repeated side effects؛ broker learning cost.

**fallback:** Bounded serial worker مع durable ledger وmanual reconcile؛ لا in-process BackgroundTasks كضمان.

**owner:** Omar

Sources: SRC-P12, SRC-P13, SRC-P14, SRC-P15, SRC-P16, SRC-P17, SRC-P18, SRC-P20, G-S05

### ADR13 — Authentication

**Status:** توصية مشروطة

**choice:** Server-side revocable cookie sessions + per-object permissions

**why:** نطاق نفس origin وأربعة أدوار؛ JWT وحده لا يحل authorization.

**alternatives:** Keycloak/OIDC أفضل لو SSO أو app-auth gate يفشل؛ يزيد operations. Short-lived scoped tokens للـrunner/API منفصلة.

**gate:** P04: CSRF/session rotation/logout/denial matrix؛ مراجعة component maintained قبل code.

**risk:** XSS/CSRF أو role bypass؛ لا custom crypto؛ secret storage ليس .env فقط.

**fallback:** Identity provider عند الحاجة؛ لا external pilot قبل gate.

**owner:** Omar

Sources: SRC-P21, SRC-P22, SRC-P24, SRC-P27, SRC-P28

### ADR14 — Infrastructure & evidence

**Status:** توصية مشروطة

**choice:** Compose Linux single host/profiles + private filesystem evidence adapter

**why:** يتناسب مع 5طلاب وميزانية محدودة؛ نقيس الأجهزة ولا نطلب cloud تلقائيًا.

**alternatives:** Kubernetes بعد حاجة تشغيل حقيقية؛ managed cloud بعد quote؛ S3 عندما multi-host يبرر؛ MinIO legacy archived.

**gate:** P14: clean setup/restore/resource profile؛ determine TLS/cert/deployment network قبل pilot.

**risk:** Single point failure؛ disk capacity؛ Desktop terms؛ backups في نفس disk غير كافية.

**fallback:** Minimal offline profile + replay معلن؛ فصل model/SIEM على جهاز آخر.

**owner:** Omar

Sources: SRC-P29, SRC-P30, SRC-P31, SRC-P32, SRC-P33

### ADR15 — ML classification

**Status:** توصية مشروطة

**choice:** TF-IDF word/char + OneVsRest baseline؛ multilabel category/impact

**why:** سريع ومفسر ويؤسس مقارنة علمية قبل model أعقد.

**alternatives:** Embedding+linear head أو encoder fine-tune إذا labels/hardware/gain يبرر؛ LLM weak labels reviewed فقط.

**gate:** A01–A05: dedup/group/time split؛ no label-derived leakage؛ macro/microF1.

**risk:** Imbalance/missing labels/pretrained contamination؛ severity inference ليست official CVSS.

**fallback:** Baseline موثق + abstention؛ قلل taxonomy غير القابلة للمراجعة.

**owner:** Hams

Sources: AI01, AI02, AI03, AI04, AI05

### ADR16 — RAG

**Status:** توصية مشروطة

**choice:** Exact IDs + lexical + multilingual dense حسب التجربة

**why:** استرجاع أدلة حديثة مع metadata/revision/scope، وليس حفظ CVEs في model weights.

**alternatives:** E5-small مقابل BGE-M3؛ MiniLM comparator؛ reranker فقط إذا ranking bottleneck؛ vector-only يضيع exact facts.

**gate:** A06–A08: Recall@k/nDCG/Arabic+Arabizi والـRAM؛ لا خلط version-table rows.

**risk:** Stale chunks؛ embeddings spaces تختلف؛ authorization filters قد تقلل ANN recall.

**fallback:** Exact+lexical cited cards؛ لا إسقاط scope filter لتحسين recall.

**owner:** Hams

Sources: AI06, AI07, AI08, AI09, AI10, AI11, AI12

### ADR17 — Customized LLM

**Status:** توصية مشروطة

**choice:** Domain tools+retrieval+schema أولًا؛ Qwen candidates vs Gemma في spike

**why:** التخصيص يبدأ بسلوك موثق وأدوات محدودة؛ لا نعيد التدريب لكل CVE.

**alternatives:** Qwen3.5-4B Apache2 مقابل Qwen3 Instruct أبسط؛ Gemma3 شروط مختلفة؛ cloud مشروط privacy/cost research.

**gate:** A09: نفس60سؤال reviewed، actual hardware/context/quantization/runtime؛ no winner قبل النتائج.

**risk:** RAM/context/tool output errors؛ modelcard benchmarks ليست domain proof؛ remote code/download risk.

**fallback:** Cited deterministic explanations؛ fine-tune لاحقًا فقط لعجز متكرر مثبت.

**owner:** Hams

Sources: AI13, AI14, AI15, AI16

### ADR18 — Assistant authority

**Status:** توصية مشروطة

**choice:** Read-only scoped tools + validated answer؛ draft منفصل عن approve/execute

**why:** المساعد يشرح current facts ويطلب missing evidence؛ لا يمتلك مفاتيح تنفيذ.

**alternatives:** Autonomous unrestricted agent يزيد attack surface؛ prompt-only guardrails غير كافية.

**gate:** A10–A12/P11: indirect injection/cross-role/fake citations/stale-plan suite.

**risk:** RAG لا يلغي prompt injection؛ JSON صحيح قد يكون كاذبًا.

**fallback:** Disable assistant واحتفظ workflow الأساسي.

**owner:** Hams + Omar

Sources: AI17, SRC-P22, SRC-P23

### ADR19 — SIEM & monitoring

**Status:** توصية مشروطة

**choice:** Outbox → JSON lines → Wazuh agent decoder/rules؛ counters أولًا

**why:** يثبت وصول الحدث وفهمه؛ source/queue/runner health جزء core.

**alternatives:** Generic management REST ليس event ingest؛ full observability stack يضاف حسب الحاجة؛ OTel option بعد tracing need.

**gate:** C15/P13: event_id موحد في DB وSIEM alert؛ duplicate/replay/rotation test.

**risk:** Loss/duplicates/log secrets؛ database audit ليست tamper-proof تلقائيًا.

**fallback:** Replayable export معلن؛ لا نسميه integrated حتى تظهر alert.

**owner:** Mahrous + Omar

Sources: CY-S15, CY-S16, SRC-P34, SRC-P35

### ADR20 — ما يميز المشروع

**Status:** توصية مشروطة

**choice:** اختبر change-aware decisions + targeted evidence + constrained remediation

**why:** قيمة يمكن قياسها في correctness/time/effort ضمن نطاق محدود.

**alternatives:** Chatbot/approvals/patch integrations وحدها ليست novelty؛ Tenable Hexa يوثقها بالفعل.

**gate:** A15/D15: same fixtures/source snapshot؛ ablations وnegative results؛ competitor access إن متاح.

**risk:** Academic usefulness بدون usability أو usability بدون contribution؛ ادعاء تفوق بلا benchmark.

**fallback:** Research contribution أضيق قابل للإثبات مع limitations صريحة.

**owner:** Hams + Shams

Sources: AI18, G-S01

## Executable work packages

# AegisLoop — 71 Execution Guides

**Team:** Vector Five. **Edition:** 23 October 2026.

These guides expand the retained Our Dream plan. Original IDs and primary owners are retained. Justified scope, dependency and acceptance changes appear in the revision log; new packages cover distinct meeting requirements. Paths below are proposed outputs for the product repository, not files claimed to exist already. This edition is a personal learning and plan reference; it has no team progress controls or task synchronization.

Critical Path flags mark the retained core delivery dependency chain and its prerequisites. They are not a duration-calculated CPM. Parallel candidates have no dependency path between them but require their own inputs and team capacity.

## D01 — Validate Core Vulnerability Sources & Build the First Ingestion Prototype

**Goal:** Prove that real CVE records can be fetched, preserved and normalized into a useful draft object.

**Why This Matters:** Research becomes an implementable contract; prevents claiming universal coverage.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** D02

**Parallel with:** C01, C02, C03, A01

**Critical path:** Yes

**First action:** Create vulnerability-intelligence/research/source-comparison.md and list the 10–20 sample CVE IDs with the reason each case is included.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Core Vulnerability Sources & Build the First Ingestion Prototype. **When:** At the input/fixture review and again before D01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Validate Core Vulnerability Sources & Build the First Ingestion Prototype. **When:** At the input/fixture review and again before D01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d01-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- What does CVE.org provide versus NVD enrichment?
- Which official API, feed or download path supports this sample and later bulk sync?
- What are the current authentication, quota, update and redistribution rules?
- Which source owns each field, and how do affected ranges, CPE and missing fixed versions affect matching?

Sources: DS01, DS02, DS03, DS05, DS07, DS20

### Inputs

- Proposal requirements
- One supported Linux release and Windows lab candidate

### Implementation Steps

1. Create vulnerability-intelligence/ and a README with the sample command, Python environment, input CVE list and output locations. Keep API credentials outside the repository.
2. Choose 10–20 published representative CVEs: complete and missing-score records, amended/rejected cases where available, several product types, affected ranges and missing fixed-version information. Save the selection rationale.
3. Read the retained CVE and NVD source documentation. Record the exact official retrieval mechanism, authentication, current quota evidence, update behavior and usage/attribution conditions in research/source-comparison.md. Mark unverifiable limits as unresolved.
4. Implement collectors/cve_org.py to fetch each selected official CVE record. Preserve the untouched response plus source URL, retrieved_at, status, source revision/schema and content hash in raw/.
5. Implement collectors/nvd.py to fetch the same CVE IDs from NVD. Preserve NVD responses separately; log missing enrichment or failed requests without replacing the CVE record or advancing a false success marker.
6. Compare identifiers, descriptions, dates, scores, affected products/ranges, CPE, references and remediation fields. Document which assertions are provider-specific, missing or conflicting.
7. Draft schema/vulnerability-schema-v0.1.json with internal/external IDs, separate provider assertions, raw revision references, affected-range semantics, source timestamps and explicit missing fields. This draft is input to D02, not the final shared schema.
8. Build normalizers/sample.py to combine references to both raw records into normalized sample objects without silently choosing a winner for conflicting fields. Do not derive fixed versions from guesswork.
9. Write normalized/samples.jsonl and raw/manifest.json. Validate every selected sample against the draft schema and preserve partial cases with clear errors or missing-field flags.
10. Repeat the process from saved raw files, then ask Mahrous/Omar to run the README and review the field comparison. Save successful and failed test results before handing the prototype to D02 and D03.

### Technical Approach

Existing Design Decision: Python collector prototype, official CVE records plus independent NVD enrichment, raw JSON and a draft schema. This is a local-file spike; D02 owns the validated shared schema, and D03 owns the production intake pipeline.

### Expected Deliverables

- `vulnerability-intelligence/research/source-comparison.md`
- `vulnerability-intelligence/collectors/cve_org.py`
- `vulnerability-intelligence/collectors/nvd.py`
- `vulnerability-intelligence/normalizers/sample.py`
- `vulnerability-intelligence/raw/manifest.json`
- `vulnerability-intelligence/normalized/samples.jsonl`
- `vulnerability-intelligence/schema/vulnerability-schema-v0.1.json`
- `vulnerability-intelligence/README.md`

### Testing

1. Fetch the same 10–20 CVEs from both sources and compare IDs, dates and field presence
2. Replay saved raw records through the normalizer and compare stable output
3. Make one source unavailable and verify an explicit partial result without invented enrichment

### Acceptance Criteria

- Both collectors successfully retrieve real data for the representative sample; unavailable or incomplete cases have explicit outcomes.
- 10–20 selected CVEs are exercised, with selection rationale and the same IDs compared across both sources.
- Original CVE and NVD responses, retrieval metadata and hashes are preserved separately.
- Source differences, authoritative/provider-specific fields, missing fields and unresolved quota/terms checks are documented.
- A draft internal JSON schema exists and normalized sample records validate against it.
- Replaying saved raw responses produces stable normalized records without discarding conflicts or inventing remediation.
- Another team member reproduces collection/normalization from the README and records the review.

### Risks / Failure Modes

- Source breadth consumes the semester.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

CVE + one Ubuntu release + KEV/EPSS first; additional vendors adapter-by-adapter.

### Next Dependent Work

D02

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D02 — Define and Validate the Canonical Vulnerability Schema

**Goal:** Turn D01 sample objects into a versioned contract without losing provider assertions or non-CVE identities.

**Why This Matters:** All downstream AI and matching must be able to reproduce which facts were used.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: D01 (initial plan; no completion reported).

**Depends on:** D01

**Unlocks:** D03, D05, D07, D08, D11, A06, P02, D17

**Parallel with:** C01, C02, C03, A01

**Critical path:** Yes

**First action:** Define source_document(id,source,url,hash,fetched_at,published_at,modified_at,schema_version,license_ref).

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Define and Validate the Canonical Vulnerability Schema. **When:** At the input/fixture review and again before D02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define and Validate the Canonical Vulnerability Schema. **When:** At the input/fixture review and again before D02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d02-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fields are required, nullable or provider-specific in the D01 samples?
- How will aliases, upstream and related links differ, and how will one advisory link multiple CVEs?
- How will raw revisions, conflicting scores, ranges and withdrawn records remain traceable?

Sources: DS08, DS18

### Inputs

- D01 fixture corpus
- Omar database/API contract

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define source_document(id,source,url,hash,fetched_at,published_at,modified_at,schema_version,license_ref).
3. Define advisory internal UUID; external identifiers and typed relationships aliases/upstream/related; never require CVE.
4. Keep raw bytes immutable; normalize assertions into product, status, range, scores and remediation tables with provenance.
5. Keep each source assertion separate; do not overwrite vendor applicability with a generic NVD statement.
6. Provide rejected-record quarantine, error reason and replay command; add unique source+external_id+revision constraint.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned JSON Schema and immutable source revisions; relational integration in P03 follows P02. Draft prototypes remain file-based until the persistence contract is agreed.

### Expected Deliverables

- `contracts/v1/advisory.schema.json`
- `contracts/v1/source-revision.schema.json`
- `fixtures/advisories/valid-and-invalid.jsonl`
- `docs/schema-field-map.md`
- `tests/contracts/test_advisory_schema.py`

### Testing

1. Validate a complete and a missing-score sample, preserving unknowns
2. Reject malformed timestamps and unresolved revision references
3. Round-trip conflicting provider assertions without silently overwriting either

### Acceptance Criteria

- Replaying the same record changes no canonical count.
- GHSA-only record can exist; many-CVE advisory does not merge vulnerabilities.
- Every normalized decision field resolves to a raw source revision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Alias conflation creates wrong findings and duplicate metrics.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Retain distinct records with explicit related links until equivalence is reviewed.

### Next Dependent Work

D03, D05, D07, D08, D11, A06, P02, D17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D03 — Build Bulk CVE Ingestion and Incremental Update Processing

**Goal:** Load a CVE baseline, then apply new, changed and rejected records without duplicates or lost updates.

**Why This Matters:** Freshness is a data pipeline, not retraining an LLM every two days.

**Owner:** Amr

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D04, D13, D16, P09

**Parallel with:** D08, D09, D15, C02

**Critical path:** Yes

**First action:** Bootstrap a selected recent fixture slice then a complete chosen baseline; pin source commit/hash.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Bulk CVE Ingestion and Incremental Update Processing. **When:** At the input/fixture review and again before D03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d03-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which official snapshot and revision mechanism will the selected CVE adapter use?
- How will the cursor advance only after durable processing?
- How will schema changes, source rejection and catch-up after downtime be represented?

Sources: DS01, DS20

### Inputs

- D02 schema
- CVE official snapshot/repository

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Bootstrap a selected recent fixture slice then a complete chosen baseline; pin source commit/hash.
3. Fetch changes on a proposed two-hour schedule; persist last successfully processed commit/checkpoint.
4. Parse records using dataVersion; preserve CNA and ADP assertions with source labels.
5. Handle PUBLISHED and REJECTED changes; invalidate derived findings/retrieval entries without deleting history.
6. Commit checkpoint only after validated records and change events persist; on missed history use bounded reconciliation.
7. Log first_seen, normalized_at and available_to_query_at.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official CVEListV5 baseline plus incremental changes, checksums, idempotent upserts and durable checkpoints. Choose exact download mechanics from D01 evidence; no scraping dependency.

### Expected Deliverables

- `backend/app/intelligence/cve_sync.py`
- `backend/app/intelligence/checkpoints.py`
- `fixtures/sync/change-sequence.jsonl`
- `tests/intelligence/test_cve_sync.py`
- `docs/runbooks/cve-sync.md`

### Testing

1. Import a fixed snapshot twice and assert unchanged logical counts
2. Replay publish, modify and reject revisions and inspect history
3. Crash before checkpoint commit, resume and prove no record was skipped

### Acceptance Criteria

- New/amended/rejected fixtures all propagate correctly.
- Crash during batch can resume with no duplicate records or skipped checkpoint.
- Upstream outage makes stale status visible.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Git history gaps or schema changes silently skip records.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Resume from verified snapshot and reconcile IDs; quarantine unknown versions.

### Next Dependent Work

D04, D13, D16, P09

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D04 — Add NVD Enrichment Without Blocking CVE Availability

**Goal:** Attach NVD assertions to existing records while keeping the CVE/vendor path usable during NVD failures.

**Why This Matters:** Adds valuable mappings/metrics without blocking new CVEs on enrichment availability.

**Owner:** Amr

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D03 (initial plan; no completion reported).

**Depends on:** D03

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D15, C02

**Critical path:** No

**First action:** Use API2/feed2, not retired legacy feeds; establish throttling using verified developer limits at implementation.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Add NVD Enrichment Without Blocking CVE Availability. **When:** At the input/fixture review and again before D04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d04-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fields and schema revisions are exposed by the current endpoint?
- How should missing enrichment, 429 responses and history references be handled?
- What current quota is directly documented for the actual API key and environment?

Sources: DS02, DS21, DS22

### Inputs

- D03 records
- NVD2 API/feed fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Use API2/feed2, not retired legacy feeds; establish throttling using verified developer limits at implementation.
3. Process modified-time windows with overlap, deduplication and pagination; retain window checkpoint.
4. Map available CPE/configuration, affected and SSVC separately, preserving originating sources.
5. Do not require NVD CVSS or CPE before showing a CVE; display enrichment state.
6. Handle 429/backoff, larger payloads and schema additions; when history gives a GitHub link fetch current record through allowlisted adapter.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Independent NVD adapter with conservative pacing, backoff and provenance. Current numeric NVD quotas remain RESEARCH REQUIRED until primary documentation is available; they are not hard-coded from memory.

### Expected Deliverables

- `backend/app/intelligence/adapters/nvd.py`
- `fixtures/nvd/missing-and-amended.json`
- `tests/intelligence/test_nvd_adapter.py`
- `docs/runbooks/nvd-enrichment.md`

### Testing

1. Ingest an unenriched record and keep it usable
2. Simulate rate limiting and verify bounded retry without checkpoint loss
3. Compare a changed provider assertion with its preserved previous revision

### Acceptance Criteria

- A CVE with no NVD enrichment is still visible and assessable using sufficient vendor evidence.
- Amended vector and affected-list fixtures create a new revision.
- A rate-limit fixture backs off without advancing the checkpoint.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Assuming all NVD records are enriched delays or loses detection.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Run CVE/vendor data; retain NVD as stale optional enrichment.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D05 — Build the Ubuntu Affected-and-Fixed Package Catalog

**Goal:** Parse authoritative Ubuntu records into release-aware package assertions that support real version comparison.

**Why This Matters:** One accurate OS implementation is stronger than shallow matching across every OS.

**Owner:** Amr

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D06, D08, D09, D14, D15

**Parallel with:** C02, C04, C05, C06

**Critical path:** Yes

**First action:** Choose one supported Ubuntu release available in the lab; retain release/channel/architecture.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. **When:** At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d05-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build the Ubuntu Affected-and-Fixed Package Catalog. **When:** At the input/fixture review and again before D05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d05-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How do Ubuntu CVE, USN and LSN records differ?
- How do binary packages map to source packages and full distro revisions?
- Which release, repository and entitlement fields constrain fixed-version availability?

Sources: DS03, DS04, DS06, DS08

### Inputs

- D02 contracts
- Ubuntu OSV + USN fixtures
- Shams package inventory sample

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Choose one supported Ubuntu release available in the lab; retain release/channel/architecture.
3. Ingest official OSV CVE records and fix notices; distinguish CVE, USN and LSN record meanings.
4. Map binary package inventory to source package identity using authoritative metadata, not string guessing.
5. Preserve Debian-style epoch/upstream/revision versions; label available fix versus currently obtainable fix/entitlement.
6. Cross-check selected installed packages using Ubuntu OVAL/OpenSCAP output where supported.
7. Build fixtures: vulnerable, fixed backport, no fix, wrong release and incomplete inventory.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official Ubuntu OSV JSON first, selected OVAL cross-check. Preserve distro/architecture/source-package identity; selected release and data-usage terms need execution-time validation.

### Expected Deliverables

- `backend/app/intelligence/adapters/ubuntu_osv.py`
- `fixtures/ubuntu/fixed-unfixed-backport.jsonl`
- `docs/ubuntu-field-mapping.md`
- `tests/intelligence/test_ubuntu_catalog.py`

### Testing

1. Parse fixed and unfixed records for one chosen release
2. Keep Ubuntu upstream links distinct from aliases
3. Compare an affected package and a vendor-backported fixed revision

### Acceptance Criteria

- A backported fix is not incorrectly flagged from upstream version alone.
- Wrong distro release never receives another release’s patch.
- Unfixed public CVE remains visible even when absent from fix-only notices.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Source-versus-binary mapping creates false negatives.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Return needs_evidence with requested package metadata; do not assert safe.

### Next Dependent Work

D06, D08, D09, D14, D15

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D06 — Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters

**Goal:** Extend the existing contract to one Windows build and one Red Hat product stream only after their data can be interpreted correctly.

**Why This Matters:** Additional operating systems require vendor-specific applicability and patch logic.

**Owner:** Amr

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D05 (initial plan; no completion reported).

**Depends on:** D05

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D10, D12

**Critical path:** No

**First action:** Spike MSRC documented API on a real monthly security update document; record current working endpoint/schema.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. **When:** At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d06-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Microsoft and Red Hat Data & Add Scoped Vendor Adapters. **When:** At the input/fixture review and again before D06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How do MSRC product trees, build identities and superseding updates relate?
- Which Red Hat CSAF/VEX product and repository identifiers apply to the selected fixture?
- Which licensing, entitlement and advisory revision rules apply to each adapter?

Sources: DS05, DS06, DS10, DS11, DS18

### Inputs

- D05 proven adapter interface
- Windows/RHEL representative inventory

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Spike MSRC documented API on a real monthly security update document; record current working endpoint/schema.
3. Resolve Windows product/edition/build/architecture and relevant KB supersedence through trusted Microsoft metadata.
4. For Red Hat prefer CSAF/VEX fixed/unfixed product assertions; evaluate repository/product streams and RPM NEVRA.
5. Separate public advisory access from entitlement needed to download/install a patch.
6. Add each family only after affected/fixed/unfixed/unknown fixtures pass.
7. Publish unsupported-family list and parser maintenance owner.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Microsoft advisory data plus endpoint servicing evidence; Red Hat CSAF/VEX. New OVAL-only RHEL investment is not the chosen default; full Windows execution stays in C14.

### Expected Deliverables

- `backend/app/intelligence/adapters/msrc.py`
- `backend/app/intelligence/adapters/redhat.py`
- `fixtures/vendors/windows-rhel.jsonl`
- `docs/adr/vendor-expansion.md`
- `tests/intelligence/test_vendor_profiles.py`

### Testing

1. Use one known affected and fixed fixture per supported product profile
2. Preserve supersedence and scoped VEX without naive suppression
3. Disable one adapter and keep the first Ubuntu path operational

### Acceptance Criteria

- Missing KB alone is not treated as vulnerability if a superseding update applies.
- Red Hat backports respect product stream and architecture.
- No claim of universal Windows or Linux support.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Windows servicing and product identity consume more effort than anticipated.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Ship Windows inventory + human-reviewed recommendations first; keep Linux verified patch path.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D07 — Ingest Package Advisories That May Have No CVE

**Goal:** Track scoped OSS package advisories with their native IDs and map them to selected package ecosystems.

**Why This Matters:** A CVE-only database misses advisories identified in other ecosystems.

**Owner:** Amr

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D02 (initial plan; no completion reported).

**Depends on:** D02

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D10, D12

**Critical path:** No

**First action:** Support ecosystem+package+version/purl; query OSV batch API or cache selected ecosystems.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Ingest Package Advisories That May Have No CVE. **When:** At the input/fixture review and again before D07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d07-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Ingest Package Advisories That May Have No CVE. **When:** At the input/fixture review and again before D07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d07-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which selected ecosystems and purl forms are in scope?
- How do OSV aliases differ from related and upstream fields?
- What metadata leaves the environment when querying a public service, and which upstream attribution applies?

Sources: DS07, DS08, DS09, DS17

### Inputs

- D02 advisory identity model
- Package lockfile/SBOM fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Support ecosystem+package+version/purl; query OSV batch API or cache selected ecosystems.
3. Preserve GHSA/OSV identifiers when CVE absent.
4. Use aliases only for equivalent vulnerability identity; retain upstream and related as distinct edges.
5. Process withdrawn advisories and changed ranges.
6. Retain original source attribution; do not infer aggregate data licensing from OSV software license.
7. Select Python/npm for demonstration only after checking actual project scope.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: OSV query/cache for chosen ecosystems and native advisory IDs. A public API is not universal vulnerability coverage or blanket permission to redistribute all upstream content.

### Expected Deliverables

- `backend/app/intelligence/adapters/osv.py`
- `fixtures/osv/non-cve-and-aliases.jsonl`
- `docs/oss-advisory-coverage.md`
- `tests/intelligence/test_non_cve.py`

### Testing

1. Import a GHSA/native advisory without CVE and retain it
2. Keep same package names in different ecosystems distinct
3. Verify absent EPSS is shown as unavailable rather than zero

### Acceptance Criteria

- Two aliases produce one vulnerability identity without collapsing multi-vulnerability notices.
- Withdrawal removes active recommendation but preserves audit.
- Unsupported version semantics lead to unknown, not lexical comparison.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- OSV has no documented current quota but bulk queries can still fail or change policy.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Cache bounded datasets, exponential backoff and offline snapshot; do not rely on unlimited service.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D08 — Normalize Asset Product Identities & Generate Matching Candidates

**Goal:** Convert observed products into scoped candidate identities before determining applicability.

**Why This Matters:** Inventory evidence must resolve to the correct product before checking vulnerability.

**Owner:** Mahrous

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, D05, C03 (initial plan; no completion reported).

**Depends on:** D02, D05, C03

**Unlocks:** D09

**Parallel with:** D03, D04, D11, C02

**Critical path:** Yes

**First action:** Define asset identity distinct from IP address; track observation time and method.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Normalize Asset Product Identities & Generate Matching Candidates. **When:** At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d08-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Asset Product Identities & Generate Matching Candidates. **When:** At the input/fixture review and again before D08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d08-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which inventory fields identify vendor, distro, package ecosystem, product branch and architecture?
- When is CPE useful and when is purl or vendor identity more accurate?
- How will ambiguous names and conflicting asset identities remain unresolved?

Sources: DS17, DS22, DS06

### Inputs

- Shams signed/identified inventory envelope
- D02/D05 fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define asset identity distinct from IP address; track observation time and method.
3. Normalize OS release/build, vendor, edition, architecture, package ecosystem, package version and service exposure.
4. Preserve raw observations and confidence; join binary/source packages explicitly.
5. Generate deterministic vendor/purl/CPE candidates with exact identifiers first.
6. If several plausible products remain, request the missing distinguishing evidence; fuzzy search may propose candidates only.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: Internal asset IDs plus typed vendor/CPE/purl identities. Fuzzy matches can propose candidates; they cannot establish an affected verdict.

### Expected Deliverables

- `backend/app/assessment/identity.py`
- `fixtures/identity/product-collisions.jsonl`
- `contracts/v1/product-identity.schema.json`
- `tests/assessment/test_identity.py`

### Testing

1. Separate identical names from different ecosystems
2. Keep incomplete firmware/model identity unresolved
3. Verify changing an IP alone does not silently merge two enrolled assets

### Acceptance Criteria

- IP reuse does not merge two assets.
- Same package name across ecosystems remains separate.
- Unknown version yields candidate/needs_evidence rather than confirmed vulnerable.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Banner strings are stale, masked or vendor-customized.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Authenticated package/firmware inventory or manual evidence with expiry.

### Next Dependent Work

D09

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D09 — Implement Vendor-Aware Applicability Rules & Decision Traces

**Goal:** Produce affected, not_affected or unknown from a specific observation and advisory revision.

**Why This Matters:** The LLM must explain a finding, not invent whether the asset is affected.

**Owner:** Mahrous

**Support:** Amr

**Conditional capability gates:** FortiOS applicability is enabled only after D17 qualifies the exact vendor profile; D17 is not a prerequisite for Ubuntu applicability.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D08, D05, C05 (initial plan; no completion reported).

**Depends on:** D08, D05, C05

**Unlocks:** D10, D12, D13, D14, D15, C08

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Select authoritative vendor/product assertion matching the exact inventory context.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement Vendor-Aware Applicability Rules & Decision Traces. **When:** At the input/fixture review and again before D09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d09-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which native version comparator matches each supported ecosystem?
- How are epoch, release, backports, range boundaries and configuration prerequisites evaluated?
- What minimum missing evidence would resolve an unknown verdict?

Sources: DS03, DS06, DS08, DS18, DS22

### Inputs

- D08 candidate identities
- D05 package assertions

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select authoritative vendor/product assertion matching the exact inventory context.
3. Implement per-ecosystem comparisons: Debian first, RPM/Windows only on added adapters.
4. Evaluate range boundaries, configuration conditions and CPE logical constraints where present.
5. Represent affected, not_affected, fixed, needs_evidence and conflict with reason codes and evidence revisions.
6. Write decision trace: observation → product → rule → comparison → result.
7. Keep “affected by known CVE” distinct from successfully exploitable in the deployed configuration.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Deterministic vendor-aware rules, source revisions and explicit reason codes. Reuse this engine in C08; neither embeddings nor the LLM decides version applicability.

### Expected Deliverables

- `backend/app/assessment/applicability.py`
- `backend/app/assessment/version_rules.py`
- `fixtures/matching/gold-cases.jsonl`
- `tests/assessment/test_applicability.py`
- `docs/matching-reason-codes.md`

### Testing

1. Evaluate vulnerable, fixed, backported and boundary fixtures
2. Remove a required field and expect unknown with a precise gap
3. Compare output to independently reviewed labels and report precision, recall and unknown rate

### Acceptance Criteria

- Inclusive/exclusive boundaries and epoch/revision cases pass.
- Vendor fixed-backport evidence can resolve a generic upstream match.
- Unsupported rule/configuration cannot produce a definitive negative verdict.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Naive semver or lexical order misclassifies OS packages.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use trusted ecosystem comparators after license review; explicit unknown for unimplemented rules.

### Next Dependent Work

D10, D12, D13, D14, D15, C08

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D10 — Validate SBOM and VEX Evidence Before Using It in Assessments

**Goal:** Accept scoped component inventories and product statements without allowing stale or unrelated VEX to hide findings.

**Why This Matters:** Imported inventories and vendor non-affected statements need controlled trust.

**Owner:** Mahrous

**Support:** Amr, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: D09 (initial plan; no completion reported).

**Depends on:** D09

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D06, D07

**Critical path:** No

**First action:** Import a bounded supported SBOM schema; preserve document hash, publisher and timestamp.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. **When:** At the input/fixture review and again before D10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d10-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Validate SBOM and VEX Evidence Before Using It in Assessments. **When:** At the input/fixture review and again before D10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d10-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which supported SBOM/VEX formats are actually available from the test product?
- How are publisher trust, product scope, version and justification validated?
- How will stale inventory or an under-investigation status affect the verdict?

Sources: DS18, DS19, DS17

### Inputs

- D09 decision states
- Selected CycloneDX/SBOM and CSAF/VEX fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Import a bounded supported SBOM schema; preserve document hash, publisher and timestamp.
3. Map component identifiers to observations without assuming SBOM proves current runtime installation.
4. Accept VEX only from configured trusted issuers for exact product/version and relevant context.
5. Retain affected/not_affected/fixed/under_investigation assertions, justification and expiry/review policy.
6. Surface conflicts and invalidated assertions after product/knowledge changes.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Selected CycloneDX/CSAF/VEX input profiles behind a validated adapter. Do not implement every standard at once; exact supported versions remain Needs Validation.

### Expected Deliverables

- `backend/app/assessment/sbom_vex.py`
- `fixtures/sbom-vex/trust-and-scope.json`
- `docs/sbom-vex-policy.md`
- `tests/assessment/test_vex_scope.py`

### Testing

1. Import a matching product statement and preserve its justification
2. Reject suppression from wrong product or stale scope
3. Keep under-investigation and incomplete evidence unresolved

### Acceptance Criteria

- Stale SBOM does not overwrite newer inventory.
- A VEX for another product cannot suppress a finding.
- Every suppression has a source, reason and review path.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Untrusted VEX suppresses a genuine finding.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Manual analyst review before suppression; retain vulnerability candidate.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D11 — Import Dated KEV and EPSS Signals & Preserve Missing Values

**Goal:** Attach observed-exploitation and forecast signals with their dates and different meanings.

**Why This Matters:** Threat likelihood and evidence of exploitation change independently of CVE descriptions.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D02, P03 (initial plan; no completion reported).

**Depends on:** D02, P03

**Unlocks:** D12

**Parallel with:** D08, D09, D15, C02

**Critical path:** Yes

**First action:** Fetch official KEV JSON and daily EPSS bulk data; keep source checksum/date/model version if supplied.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Import Dated KEV and EPSS Signals & Preserve Missing Values. **When:** At the input/fixture review and again before D11 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d11-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which KEV fields and update timestamps should be retained?
- How do EPSS probability, percentile, forecast date and missing CVEs differ?
- When should bulk download replace per-record API requests?

Sources: DS12, DS13, DS14, DS15

### Inputs

- D02 vulnerability IDs
- FIRST/CISA feed fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Fetch official KEV JSON and daily EPSS bulk data; keep source checksum/date/model version if supplied.
3. Store probability and percentile separately; retain missing as missing.
4. Record KEV additions/removals and changed metadata as revisions.
5. Link enrichment by exact CVE; non-CVE advisory without a valid CVE link has unavailable EPSS.
6. Add freshness checks and notifications for stale threat feeds.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Official KEV data plus daily bulk EPSS where appropriate; separate signals, bounded API access and dated provenance. FIRST quotas and API behavior follow the retained source register.

### Expected Deliverables

- `backend/app/intelligence/threat_signals.py`
- `fixtures/threat/dated-signals.jsonl`
- `tests/intelligence/test_threat_signals.py`
- `docs/threat-signal-fields.md`

### Testing

1. Load two dated EPSS snapshots and retain history
2. Preserve KEV evidence even when EPSS is low
3. Handle non-CVE advisories without manufacturing EPSS zero

### Acceptance Criteria

- 0.01 EPSS is not confused with first percentile.
- Absent EPSS never becomes zero.
- Known exploitation remains visible with low EPSS.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- EPSS forecast is mislabeled asset-specific probability.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Display raw dated signals and local context separately.

### Next Dependent Work

D12

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D12 — Implement Explainable Priority Bands Using Asset Context

**Goal:** Define the transparent security prioritization policy and reference baseline supporting Hams’s AI-powered prioritization capability.

**Why This Matters:** A defensible action queue needs asset context and explicit policy, not an arbitrary AI score.

**Owner:** Mahrous

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D09, D11 (initial plan; no completion reported).

**Depends on:** D09, D11

**Unlocks:** D13, P10, A17

**Parallel with:** D03, D04, D14, C04

**Critical path:** Yes

**First action:** Define policy bands using confirmed exploitation, reachable attack surface, impact and asset criticality.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d12-amr.md — Co-author threat/risk factors, review vendor/KEV/EPSS semantics and independently grade cases.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d12-hams.md — Define experiment-compatible input/output and relevance formats; compare candidate ranking against this frozen baseline.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Define the ranked unit explicitly and make organization-aware prioritization reproducible.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which exposure and business criticality values can the lab actually provide?
- How should confirmed exploitation override a low forecast without hiding severity?
- Which policy bands, deadlines and missing-signal behavior will supervisors accept?
- Should top ten mean unique CVEs, asset findings or compatible grouped remediation actions?
- Which organization context is known, and what happens when criticality or exposure is missing?
- Which actions may be grouped without crossing incompatible product trains, policy, windows or recovery constraints?
- Which signals are hard policy constraints versus ranking preferences?
- How should conflicting experts, missing context and no-fix actions be evaluated without forcing unsafe repairs?

Sources: DS12, DS15, DS16

### Inputs

- D09 findings
- D11 threat evidence
- Asset importance/exposure/owner

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define policy bands using confirmed exploitation, reachable attack surface, impact and asset criticality.
3. Preserve official CVSS version/vector/provider; display heuristic local priority separately.
4. Start with explainable rules and analyst-adjustable thresholds; avoid multiplying EPSS by CVSS as if calibrated risk.
5. Treat evidence gaps as collection tasks, with urgent triage when plausible consequence is high.
6. Require reason/expiry/owner for accepted risk and compensating controls.
7. Evaluate ranking against CVSS-only and KEV-first baselines on same labeled cases.
8. Implement explained ordered policy bands using confirmed applicability, exploitation evidence, exposure, criticality, time and fixability. Keep CVSS and EPSS meanings distinct; missing context is explicit.
9. Rank grouped remediation actions as the primary work queue; retain drill-down to each asset finding and unique CVE view. Use a stable grouping key with product/profile, permitted target fix, policy and compatible execution constraints.
10. Do not group unknown applicability into confirmed repair jobs. Keep no-patch, blocked window and unsupported-target actions visible in separate queues; use deterministic tie-breaking and evidence revisions.
11. Produce structured reason codes and a ranking trace; weights, if experimented with, are local policy values and not calibrated compromise probabilities.
12. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.
13. With Amr define field semantics and missing-value policy for CVSS/vector, dated EPSS, KEV, applicability confidence, asset criticality, exposure, business impact and operational constraints. Publish hard eligibility/approval constraints separately from ordering preferences.
14. Freeze security-reviewed relevance grades and pairwise preferences before comparing candidate outputs; retain legitimate expert disagreements. Hand the baseline function, reason codes and policy version to Hams in A17.

### Technical Approach

Existing Design Decision: Rule-based bands retaining CVSS, KEV, EPSS and local context separately. Policy weights and deadlines are project decisions requiring review; no arbitrary score is marketed as calibrated risk.

### Expected Deliverables

- `backend/app/assessment/prioritization.py`
- `config/priority-policy-v1.yaml`
- `fixtures/priority/decision-table.jsonl`
- `tests/assessment/test_priority_policy.py`
- `docs/priority-policy.md`
- `policy/ranking/action-grouping-spec.md`
- `fixtures/priority/grouped-actions.json`
- `policy/prioritization-baseline.yaml`
- `reports/prioritization/security-reference-rubric.md`

### Testing

1. Compare high-severity internal and exploited exposed cases
2. Remove a signal and verify missingness remains visible
3. Change policy version and reproduce the changed band and explanation
4. Exercise duplicate CVEs, shared fixes, incompatible trains, backports, no patch, missing context and policy conflicts; compare to independently reviewed expected ordering.
5. Missing context is never silently zero risk; same inputs/version produce stable order.
6. Review high-CVSS/low-exposure versus lower-CVSS/known-exploited scenarios.

### Acceptance Criteria

- Each priority has a human-readable policy trace.
- KEV cannot be demoted solely by low EPSS.
- Missing asset context is disclosed; policy version is saved with each decision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Top ten is defined as up to ten eligible grouped actions with transparent evidence, constraints and asset/CVE drill-down; fewer than ten is allowed.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Policy constraint violation count; deterministic repeatability; reviewed relevance agreement

### Risks / Failure Modes

- Unvalidated weights look scientific but mislead.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Rule bands and raw signals; tune with supervisor-reviewed scenarios.

### Next Dependent Work

D13, P10, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05, ADR24

## D13 — Trigger Targeted Reassessment and Invalidate Stale Answers

**Goal:** Reevaluate only relevant assets when material source or inventory facts change and invalidate derived caches.

**Why This Matters:** The differentiated loop is knowledge changes causing only relevant assets to be reassessed.

**Owner:** Mahrous

**Support:** Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D03, D09, D12, P07 (initial plan; no completion reported).

**Depends on:** D03, D09, D12, P07

**Unlocks:** D16, A14

**Parallel with:** D04, D14, C04, C06

**Critical path:** No

**First action:** Emit stable change IDs only after source revision commit.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Trigger Targeted Reassessment and Invalidate Stale Answers. **When:** At the input/fixture review and again before D13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d13-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Trigger Targeted Reassessment and Invalidate Stale Answers. **When:** At the input/fixture review and again before D13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d13-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Recurrence records support root-cause review without claiming unobserved causes.

- Which changed fields affect applicability, priority, patch options or only display text?
- How are products mapped to affected assets without missing candidates?
- Which event and cache keys guarantee repeatable, scope-safe invalidation?

Sources: DS02, DS08

### Inputs

- D03/D04 changes
- D09 reverse product-to-asset index
- NVD enrichment is optional; missing enrichment must not block CVE/vendor reassessment.

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Emit stable change IDs only after source revision commit.
3. Diff applicability, patch, threat and description changes separately.
4. Find impacted product/asset sets; enqueue idempotent assessment jobs keyed by asset snapshot + knowledge revision + engine version.
5. Invalidate outdated generated advice and retrieval chunks; retain before/after explanations.
6. Handle rejected/withdrawn records, changed affected ranges and reopened findings.
7. Measure reassessment lag and compare targeted work with full reprocessing baseline.
8. Preserve finding lifecycle and episode links: repeated observation without closure, reopened after verified closure, stale evidence, new advisory revision and confirmed configuration drift are different events.
9. Store root-cause hypotheses apart from reviewer-confirmed cause and attached corrective control; do not infer a human-error ratio from recurrence frequency.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned change events, idempotent consumers and current-result views. NVD enrichment is optional and must not block CVE/vendor reassessment; A14 adds AI-specific operations on this path.

### Expected Deliverables

- `backend/app/assessment/reassessment.py`
- `contracts/v1/knowledge-changed.schema.json`
- `fixtures/reassessment/revision-events.jsonl`
- `tests/assessment/test_reassessment.py`
- `docs/reassessment-flow.md`

### Testing

1. Change an affected range and verify impacted assets are reevaluated
2. Replay the same event without duplicate business effects
3. Withdraw a source assertion and ensure stale answers are excluded
4. Repeat an unchanged scan, reopen after verified fix and modify only source metadata; verify three distinct histories without duplicate active findings.

### Acceptance Criteria

- Repeated event creates no duplicate active finding.
- Changed range reopens an affected asset and retires stale advice.
- Description-only edit does not trigger unnecessary patch execution.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Event storms exhaust resources after bulk upstream changes.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Coalesce by product/revision, bounded queues and prioritized reconciliation.

### Next Dependent Work

D16, A14

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05, ADR24

## D14 — Build a Versioned Catalog of Vendor Fixes and Mitigations

**Goal:** Link findings to documented patch, upgrade or mitigation candidates with real prerequisites.

**Why This Matters:** Finding a fixed version is different from safely installing it on this machine.

**Owner:** Amr

**Support:** Mahrous, Shams, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D05, D09 (initial plan; no completion reported).

**Depends on:** D05, D09

**Unlocks:** C09, A11, A17

**Parallel with:** D12, D13, D15, C04

**Critical path:** Yes

**First action:** Map advisory→product→fixed supported versions/KBs→prerequisites; preserve source revision.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Validate applicability, residual risk and policy constraints. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-mahrous.md — Validate applicability, residual risk and policy constraints.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-shams.md — Check real/lab asset evidence and practical preflight inputs; no FortiOS mutation implied.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Define retrieval-ready evidence spans and expected grounded guidance fields for A11. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/d14-hams.md — Define retrieval-ready evidence spans and expected grounded guidance fields for A11.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Keep a single remediation catalog; vendor qualification does not create a second patch engine.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Where does each vendor publish fixed versions and alternative mitigations?
- Which support, entitlement, reboot and compatibility fields are known or missing?
- How do one-patch/many-CVE and supersedence relationships work?
- Which guidance is explicitly vendor-supported, and which requires model/configuration/entitlement evidence?

Sources: DS03, DS05, DS10, DS18, MR08

### Inputs

- D05/D06 vendor fixes
- Amr patch runner contracts

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Map advisory→product→fixed supported versions/KBs→prerequisites; preserve source revision.
3. Record repository availability, entitlement, restart requirement and supported upgrade path when verifiable.
4. Store mitigation separately from patch; include residual risk and validation requirement.
5. Generate reviewed candidate choices: supported fix, safe upgrade path, temporary mitigation or unsupported/EOL replacement.
6. Require Amr preflight to confirm actual installability; never let the LLM generate an authoritative download URL.
7. For the FortiOS profile, link D17 fixed-branch assertions to separately reviewed upgrade-path/release-note constraints, hardware support, maintenance and backup prerequisites. An advisory minimum fix is not permission to jump to the latest firmware.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous + Shams + Hams review the handoff before declaring completion.
9. Build a small reviewed FortiOS advisory fixture pack using preserved vendor records and separately sourced upgrade-path/release-note evidence. Record model/train, affected/fixed assertions, intermediate steps, compatibility, mitigation, backups and verification; unknown information remains unknown.

### Technical Approach

Existing Design Decision: Vendor-authoritative remediation assertions; C09 validates their execution readiness. Newest release is not automatically the compatible target, and missing fixed versions must not be invented.

### Expected Deliverables

- `backend/app/remediation/catalog.py`
- `contracts/v1/remediation-candidate.schema.json`
- `fixtures/remediation/vendor-candidates.jsonl`
- `tests/remediation/test_catalog.py`
- `docs/remediation-source-map.md`
- `datasets/remediation/vendor-guidance-cases.jsonl`

### Testing

1. Link one patch to several CVEs without merging vulnerabilities
2. Keep no-fix and mitigation-only cases explicit
3. Apply an advisory correction and preserve old catalog revision
4. Reviewer checks every fixed version/path assertion against the preserved vendor revision; include missing and contradictory evidence.

### Acceptance Criteria

- Latest version is not automatically recommended over supported compatible fix.
- No fix yields mitigation/manual escalation, not invented patch.
- Missing prerequisites block execution approval.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Appliance remedies remain reviewed recommendations/import evidence; this release has no automatic FortiOS execution adapter.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Supported factual-field coverage; wrong-version/path count

### Risks / Failure Modes

- A real fix is unavailable to this entitlement or platform.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Explain blocked status, select vendor-supported mitigation or manual change.

### Next Dependent Work

C09, A11, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D15 — Create Independent Matching Ground Truth & Measure Errors

**Goal:** Build a frozen, reviewed benchmark that can expose false matches and missed supported vulnerabilities.

**Why This Matters:** Proposal 90% detection needs a defensible denominator and false-positive reporting.

**Owner:** Mahrous

**Support:** Amr, Shams, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: D05, D09 (initial plan; no completion reported).

**Depends on:** D05, D09

**Unlocks:** C16, A17

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Build labeled cases independently from engine output: vulnerable, fixed backport, wrong architecture, unfixed, ambiguous, withdrawn and stale inventory.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Create Independent Matching Ground Truth & Measure Errors. **When:** At the input/fixture review and again before D15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d15-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Separate real evidence, reviewed labels and generated scenario context.

- Who labels each case independently of the matching code?
- Which positive, negative, backport, ambiguous and missing-field cases represent the declared scope?
- How will unknowns, failed scans and coverage denominators be reported?

Sources: DS06, DS08, DS16

### Inputs

- D05 known affected/fixed cases
- D09 matcher
- Authorized lab snapshots

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Build labeled cases independently from engine output: vulnerable, fixed backport, wrong architecture, unfixed, ambiguous, withdrawn and stale inventory.
3. Have Amr review source evidence and Amr verify installed versions; adjudicate disagreements.
4. Freeze held-out cases/revisions; keep near-duplicate advisories and package families from leaking across evaluation splits.
5. Report supported-scope recall, precision, false-positive rate, unknown rate and per-family counts.
6. Retain misses/unsupported cases in results; do not remove failures after seeing outputs.
7. Compare naive version matching, vendor-aware rules and full reassessment system; publish artifacts needed to reproduce.
8. Build independent gold cases from actual preserved vendor revisions and authorized lab observations; mark synthetic context cases and report them separately.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Frozen source/observation revisions and independent labels, not another scanner treated as ground truth. The proposal detection target applies only to declared known vulnerabilities in the controlled lab.

### Expected Deliverables

- `evaluation/matching/gold.jsonl`
- `evaluation/matching/annotation-guide.md`
- `experiments/evaluate_matching.py`
- `evaluation/matching/results.json`
- `reports/matching-benchmark.md`

### Testing

1. Have two reviewers label a held-out subset and resolve disagreements
2. Run the frozen benchmark against the engine and report per-family errors
3. Reproduce metrics from saved predictions without changing labels

### Acceptance Criteria

- ≥90% known-vulnerability lab detection remains a target, not claimed result.
- Ground truth reviewer differs from engine author where possible.
- All reported metrics state dataset size, scope and date.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Known ground truth is not generated by the same LLM or rule implementation being evaluated.

### Risks / Failure Modes

- Easy-only dataset inflates results and academic value collapses.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Add explicit hard negative/unknown challenge sets; report confidence intervals and limitations.

### Next Dependent Work

C16, A17

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## D16 — Measure CVE Freshness & Rehearse Source Outage Recovery

**Goal:** Prove where time is spent from public record publication to usable knowledge and reassessment.

**Why This Matters:** 24-hour proposal goal must be measurable despite upstream delays and incomplete records.

**Owner:** Amr

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: D03, D13 (initial plan; no completion reported).

**Depends on:** D03, D13

**Unlocks:** Final handoff

**Parallel with:** D15, C04, C06, C08

**Critical path:** No

**First action:** Track source published, first_seen, normalized, searchable and applicable-assets-reassessed timestamps separately.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Measure CVE Freshness & Rehearse Source Outage Recovery. **When:** At the input/fixture review and again before D16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d16-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Measure CVE Freshness & Rehearse Source Outage Recovery. **When:** At the input/fixture review and again before D16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d16-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Connected freshness targets and disconnected snapshot age are different acceptance claims.

- Which timestamps measure publication, first observed, normalized, indexed and reassessed?
- What observation window and missing-publication-date policy make the 24h metric honest?
- How will polling delays and source outages trigger warning and catch-up?

Sources: DS01, DS02, DS13

### Inputs

- D03–D04 ingestion timestamps
- D13 reassessment telemetry

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Track source published, first_seen, normalized, searchable and applicable-assets-reassessed timestamps separately.
3. Keep proposal within24h objective; report percent within24h plus p50/p95/max and missed items, without silently changing the commitment.
4. Run synthetic new/updated/rejected source fixtures through pipeline; separately sample real upstream records with dates.
5. Rehearse 48h outage, expired key, malformed record, disk-full/quarantine growth and bulk upstream revision.
6. Alert stale source, bound retries, replay checkpoints and reconcile without duplicate findings.
7. State why AI may know a CVE exists while asset applicability remains unknown pending vendor facts.
8. Report connected source publication-to-seen and seen-to-usable separately. In disconnected mode show snapshot as-of/import age; do not promise 24-hour upstream freshness while no updates can enter.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Keep the proposal 24-hour target; polling and recovery scheduling are configurable. Unknown public disclosure times and incomplete upstream data remain visible limitations.

### Expected Deliverables

- `backend/app/intelligence/freshness_metrics.py`
- `experiments/source_outage.py`
- `reports/freshness-results.csv`
- `docs/runbooks/source-outage.md`
- `tests/intelligence/test_freshness.py`

### Testing

1. Pause a source, verify staleness and then replay the backlog
2. Calculate publication-to-seen and seen-to-usable separately
3. Report all 24h misses and causes rather than hiding them in an average

### Acceptance Criteria

- Source outage never displays fresh status.
- No claim every new CVE becomes reliably detectable within24h.
- Catch-up preserves revisions and marks delayed records.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Publication timestamps are revised/backdated, distorting freshness metrics.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Report both source-publication and observed-first-seen lag with source availability notes.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR01, ADR02, ADR03, ADR04, ADR05

## C01 — Define Allowed Lab Targets & Enforce Scan Safety Rules

**Goal:** Create an enforceable scope profile before any connector can contact a target.

**Why This Matters:** Prevents unsafe and unauthorized collection before any scanner runs.

**Owner:** Mahrous

**Support:** Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** C02, C03, C04, P08

**Parallel with:** D01, D02, A01, A02

**Critical path:** Yes

**First action:** Define owned lab ip ranges and exclusions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Define Allowed Lab Targets & Enforce Scan Safety Rules. **When:** At the input/fixture review and again before C01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c01-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Narrow by supported profile and capability rather than claiming a generic IT/OT scanner.

- Which exact networks and devices does the team control?
- Which device classes must default to passive or manual evidence?
- How will DNS changes, IP reuse, timeouts and emergency stop be handled?

Sources: CY-S01, CY-S12, MR05

### Inputs

- device list and available laptop specs

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define owned lab ip ranges and exclusions
3. Tag asset classes
4. Write read-only versus mutation permissions
5. Create stop/timeout policy
6. Define evidence retention and secrets boundaries
7. Declare industrial-support IT as the proposed customer segment, with Ubuntu lab execution and a conditional FortiOS evidence profile. Customer fit and actual company access remain unverified.
8. Publish separate discovery, inventory, assessment, recommendation and execution capabilities. Exclude direct OT probing/firmware mutation, security-code analysis and universal network-device coverage from the current release.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Allowlisted scopes, resolved-address revalidation, device-specific profiles and bounded operations. This defines lab authorization, not permission to scan an external organization.

### Expected Deliverables

- `config/lab-scope.yaml`
- `docs/lab-capability-matrix.md`
- `runner/scope_guard.py`
- `tests/runner/test_scope_guard.py`

### Testing

1. Submit an out-of-range IP and expect rejection before a connection
2. Resolve an allowed hostname to a forbidden address and reject it
3. Apply an unknown/OT profile and verify no generic active probe runs

### Acceptance Criteria

- Out-of-scope target and excluded device classes are rejected before any connector call
- Unknown class defaults to no active probe
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every profile has explicit capability gates, allowed collection paths and unsupported actions.

### Risks / Failure Modes

- IP reuse or hostname resolution changes
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

revalidate resolved address against scope immediately before connection

### Next Dependent Work

C02, C03, C04, P08

### Related Decisions

ADR06, ADR07, ADR21

## C02 — Build a Reproducible Lab & Verify Baseline Restoration

**Goal:** Prepare known test systems and evidence so scans and updates can be repeated safely.

**Why This Matters:** Makes demonstrations repeatable and provides trustworthy expected outcomes.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: C01 (initial plan; no completion reported).

**Depends on:** C01

**Unlocks:** C04, C05, C11

**Parallel with:** D01, D02, C03, A01

**Critical path:** Yes

**First action:** Choose the available lab host and create one isolated target VM/network from the recorded scope and image manifest.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build a Reproducible Lab & Verify Baseline Restoration. **When:** At the input/fixture review and again before C02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which available hardware supports the chosen VM and network layout?
- Are the OS images, packages and Windows licenses available for the intended tests?
- How will baseline snapshots, vendor labels and restore checks be recorded?

Sources: CY-S06, CY-S13

### Inputs

- hardware inventory and authorized OS images

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create isolated vm/network
3. Record image/version/digest
4. Seed a small known affected and fixed package set plus unknown/backport fixtures
5. Snapshot baseline
6. Document restore
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Isolated VM/network with pinned images and known package fixtures. Exact hypervisor and target release remain Needs Validation against available hardware; serialized VMs are an allowed fallback.

### Expected Deliverables

- `lab/manifest.yaml`
- `lab/fixtures/expected-results.json`
- `lab/setup.md`
- `lab/restore-checklist.md`
- `reports/lab-rebuild-proof.md`

### Testing

1. Rebuild one target using the manifest on a second machine if available
2. Compare installed versions to the recorded baseline
3. Restore after a test change and rerun the basic service checks

### Acceptance Criteria

- Another teammate rebuilds one fixture
- Every seeded expected result has vendor evidence
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- insufficient RAM/old packages unavailable
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

serialized VMs and versioned recorded evidence, clearly distinguish replay from live scans

### Next Dependent Work

C04, C05, C11

### Related Decisions

ADR06, ADR07

## C03 — Define Asset Observation Fields & Validate Stable Identity

**Goal:** Agree what collectors must report so downstream matching can trust and reproduce an observation.

**Why This Matters:** Allows all collectors to feed one reliable assessment model.

**Owner:** Shams

**Support:** Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: C01 (initial plan; no completion reported).

**Depends on:** C01

**Unlocks:** D08, C04, C05, C06, C07, C08, C15, P02, D17

**Parallel with:** D01, D02, C02, A01

**Critical path:** Yes

**First action:** Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review whether the observation fields and identity rules are sufficient for D08/D09 matching and explicit unknown states; Omar reviews ingestion compatibility. Shams owns the contract and its fixture/tests. **When:** At the contract/input review and again before package acceptance after the listed prerequisites are available. **Deliver:** `reviews/c03-mahrous.md — Matching/closure review and disposition`. **Review:** Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define Asset Observation Fields & Validate Stable Identity. **When:** At the input/fixture review and again before C03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c03-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

Ownership update (6 November): 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own the asset-observation contract, stable-identity rules, example payloads and validation tests used by all asset adapters. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.

### Scope Revision


- Which fields identify an enrolled host beyond IP?
- Which OS/build/package/firmware fields are mandatory for each supported profile?
- How will collection errors, raw hashes and old import timestamps be retained?

Sources: CY-S08, CY-S11

### Inputs

- three example asset exports

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define stable asset id, source-specific identity, timestamps, trust level, os release, architecture, package namespace/version, firmware model/train
3. Keep raw evidence reference and collection errors
4. Validate three fixture payloads against the versioned schema and document required versus optional fields
5. Define changed-ip and duplicate handling
6. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous + Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Versioned JSON observation schema coordinated with P02; enrollment identity and evidence references are explicit. This is the domain specification, not a second platform schema engine.

### Expected Deliverables

- `contracts/v1/inventory-snapshot.schema.json`
- `fixtures/inventory/profile-examples.jsonl`
- `docs/asset-identity-rules.md`
- `tests/contracts/test_inventory_snapshot.py`

### Testing

1. Validate complete and partial observations for each selected profile
2. Keep two identities at one reused IP separate
3. Reimport old evidence and preserve its original collected_at

### Acceptance Criteria

- Incomplete data remains unknown
- Same ip on two identities is not silently merged
- All observations preserve provenance
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- host identity spoofing
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reconcile against enrolled key/approved identity and flag conflict

### Next Dependent Work

D08, C04, C05, C06, C07, C08, C15, P02, D17

### Related Decisions

ADR06, ADR07

## C04 — Implement Bounded Network Discovery & Parse Structured Results

**Goal:** Discover approved lab endpoints and service hints without treating banners as installed-package proof.

**Why This Matters:** Finds reachable lab assets and services without pretending banners prove vulnerability.

**Owner:** Shams

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C01, C02, C03 (initial plan; no completion reported).

**Depends on:** C01, C02, C03

**Unlocks:** C16

**Parallel with:** D01, D02, D03, D04

**Critical path:** Yes

**First action:** Wrap separately installed scanner using fixed argument arrays

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Bounded Network Discovery & Parse Structured Results. **When:** At the input/fixture review and again before C04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c04-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which conservative Nmap profile fits each approved device class?
- Which probes and ports must be excluded, including fragile printer services?
- Which installation and redistribution constraints apply to Nmap/Npcap?

Sources: CY-S01, CY-S02

### Inputs

- allowlisted lab range/profile

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Wrap separately installed scanner using fixed argument arrays
3. Enforce time/concurrency limits
4. Collect structured output
5. Normalize host/service hints
6. Support cancellation
7. Preserve raw result
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Separately installed Nmap with fixed argument arrays, exclusions, time and concurrency limits. No blanket aggressive script profile; product redistribution is a separate licensing gate.

### Expected Deliverables

- `runner/adapters/discovery.py`
- `config/discovery-profiles.yaml`
- `fixtures/discovery/structured-results.xml`
- `tests/runner/test_discovery.py`
- `docs/runbooks/discovery.md`

### Testing

1. Run against only the allowlisted lab and record contacted targets
2. Cancel or time out a run and retain partial/failed status
3. Parse a saved result without claiming banner data proves remediation

### Acceptance Criteria

- Zero out-of-scope connections in lab controls
- Timeout produces partial/failed status
- No blanket aggressive scripts/allports profile
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- banner ambiguity and fragile devices
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

discovery-only or approved inventory import

### Next Dependent Work

C16

### Related Decisions

ADR06, ADR07

## C05 — Collect Ubuntu OS and Package Evidence Through Authenticated SSH

**Goal:** Produce a trustworthy Ubuntu observation containing full package revisions and collection errors.

**Why This Matters:** Supplies precise distro/package evidence needed for applicability.

**Owner:** Shams

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C02, C03 (initial plan; no completion reported).

**Depends on:** C02, C03

**Unlocks:** D09, C08, C11, C16

**Parallel with:** D01, D02, D03, D04

**Critical path:** Yes

**First action:** Verify the Ubuntu lab host's SSH key against its approved identity before attempting authenticated collection.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Verify applicability-relevant fields and authorized scope. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/c05-mahrous.md — Verify applicability-relevant fields and authorized scope.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Hams**: Specify ranking experiment fields and distinguish observed facts from scenario assumptions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/c05-hams.md — Specify ranking experiment fields and distinguish observed facts from scenario assumptions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which native output exposes distro release, architecture and binary/source package identity?
- What minimum read permissions are needed?
- How will host-key verification, command failures and redaction be enforced?
- Which measured asset fields can populate A02 without introducing invented business context?

Sources: CY-S03, CY-S05

### Inputs

- pinned lab Ubuntu and read-only credentials

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Verify host key
3. Collect os release/arch/full installed package revisions and selected services
4. Capture errors
5. Avoid user files and broad environment dumps
6. Normalize
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.
8. Provide Shams’s existing authorized inventory snapshots to the A02 prioritization bundle, including observation age, exposure evidence and explicit unavailable fields; business criticality must come from reviewed context, not port guesses.

### Technical Approach

Existing Design Decision: Authenticated SSH with host-key verification and structured native inventory. Choose parser/dependency versions in the lab spike; avoid broad shell/environment dumps.

### Expected Deliverables

- `runner/adapters/ubuntu_inventory.py`
- `fixtures/inventory/ubuntu-native-export.json`
- `tests/runner/test_ubuntu_inventory.py`
- `docs/runbooks/ubuntu-collection.md`
- `datasets/prioritization/asset-evidence-manifest.json`

### Testing

1. Compare collected package versions with a native ground-truth export
2. Use invalid credentials and expect an explicit failed observation
3. Inspect logs and exported fixtures for credentials and unnecessary user data
4. Cross-check observation IDs against A02 scenarios.

### Acceptance Criteria

- Installed packages match native ground-truth export
- Expired credentials are an error not empty inventory
- Secrets absent from logs
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Asset-field coverage and observation-age distribution

### Risks / Failure Modes

- permission gaps or command parsing drift
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

signed native JSON/export import

### Next Dependent Work

D09, C08, C11, C16

### Related Decisions

ADR06, ADR07

## C06 — Compare Windows Inventory Options & Implement One Adapter

**Goal:** Select one validated Windows inventory path that provides the fields needed by the matching contract.

**Why This Matters:** Selects one Windows inventory path using measured coverage and resource cost.

**Owner:** Shams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G1

**Start condition:** Blocked by: C03 (initial plan; no completion reported).

**Depends on:** C03

**Unlocks:** C14

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Compare Windows Inventory Options & Implement One Adapter. **When:** At the input/fixture review and again before C06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c06-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Does osquery or existing Wazuh Syscollector expose the required build, package and update fields?
- What permissions, enrollment and transport work does each option require?
- What are the measured CPU/RAM and collection-time costs on the same target?

Sources: CY-S08, CY-S09, CY-S10, CY-S11

### Inputs

- identical Windows fixture

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Compare osquery export and wazuh syscollector for os build, packages, update fields, footprint and permissions
3. Measure collection time
4. Choose one
5. Implement field mapping and missing-field flags
6. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: compare osquery and Wazuh, prefer existing deployment where justified, then implement one primary adapter. A recorded export is not live Windows validation.

### Expected Deliverables

- `experiments/windows_inventory_comparison.py`
- `reports/windows-inventory-choice.md`
- `runner/adapters/windows_inventory.py`
- `fixtures/inventory/windows-export.json`
- `tests/runner/test_windows_inventory.py`

### Testing

1. Collect the same target with the candidate methods where available
2. Document missing fields and footprint rather than guessing equivalence
3. Map the selected export into the shared observation schema

### Acceptance Criteria

- Documented coverage/missing fields and measured resource cost
- No agent choice based only on popularity
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- image licensing or hardware unavailable
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

schema-tested recorded Windows export while labeling live Windows validation pending

### Next Dependent Work

C14

### Related Decisions

ADR06, ADR07

## C07 — Import Offline and Appliance Evidence With Freshness Labels

**Goal:** Accept a supported vendor export or manual snapshot while clearly showing what cannot be observed live.

**Why This Matters:** Supports assets that cannot safely or directly be scanned.

**Owner:** Shams

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional FortiOS profile

**Gate:** G3

**Start condition:** Blocked by: C03 (initial plan; no completion reported).

**Depends on:** C03

**Unlocks:** Final handoff

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** List the exact appliance model, firmware train, hardware revision and original collection timestamp required by the import fixture.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Import Offline and Appliance Evidence With Freshness Labels. **When:** At the input/fixture review and again before C07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c07-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Imports and supported identity evidence address scan restrictions without pretending universal device support.

- Which exact model, firmware train and hardware revision identify the test appliance?
- How can timestamp, operator and integrity hash be preserved?
- Which import fields are needed to resolve a match and which remain unknown?

Sources: CY-S02, CY-S12, MR05

### Inputs

- one vendor export and offline JSON fixture

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Define model/firmware fields
3. Import hash/timestamp/operator
4. Validate schema and size
5. Map only supported product identity
6. Surface stale data and requests for missing evidence
7. Implement a reviewed FortiOS import profile with exact model, train/build, collection time and configuration evidence requirements; no public-internet exposure is needed for a local import.
8. For isolated or fragile devices, show unsupported/manual-evidence/unknown capability honestly. Reachability, credentials, protocol support, vendor terms and OT safety can each prevent active collection.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Validated JSON/vendor-export adapter with bounded uploads and explicit manual/import labels. General OT active scanning and universal firmware updating remain out of scope.

### Expected Deliverables

- `backend/app/inventory/imports.py`
- `fixtures/imports/offline-appliance.json`
- `contracts/v1/evidence-import.schema.json`
- `tests/inventory/test_imports.py`
- `docs/offline-evidence-guide.md`

### Testing

1. Import an old snapshot and verify it remains stale
2. Reject malformed or oversized input
3. Import incomplete firmware identity and show unknown rather than a clean result

### Acceptance Criteria

- Unknown firmware remains unresolved
- Expired evidence never becomes fresh through re-import
- Imported labels remain distinct from scanned labels
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- vendor-specific formats
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reviewed structured manual entry

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR06, ADR07, ADR21

## C08 — Integrate the Applicability Engine & Review Its Evidence Traces

**Goal:** Connect D09 results to real observations and confirm that every verdict can be inspected.

**Why This Matters:** Separates affected, unaffected and unknown using attributable evidence.

**Owner:** Mahrous

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: C03, C05, D09 (initial plan; no completion reported).

**Depends on:** C03, C05, D09

**Unlocks:** C09, C10, C13, C15, C16, P06

**Parallel with:** D03, D04, D11, C04

**Critical path:** Yes

**First action:** Consume the D09 engine through the shared assessment contract; do not build a second matching engine.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Integrate the Applicability Engine & Review Its Evidence Traces. **When:** At the input/fixture review and again before C08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c08-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Does the D09 contract carry source revision, observation ID, reason codes and missing evidence?
- Which collection errors must prevent a confident verdict?
- How will a reviewer distinguish unsupported, unknown and not_affected?

Sources: CY-S02, CY-S13

### Inputs

- vendor affected/fixed ranges and normalized observations

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Consume the D09 engine through the shared assessment contract; do not build a second matching engine.
3. Evaluate exact distro/package semantics
4. Distinguish affected/not affected/unknown
5. Attach source revision and evidence
6. Test backported versions and missing configurations
7. Request minimal missing evidence
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse D09 as the only matching engine. C08 owns integration and evidence review, while P06 displays the result; no parallel matching implementation is needed.

### Expected Deliverables

- `backend/app/assessment/service.py`
- `fixtures/integration/assessment-traces.jsonl`
- `tests/integration/test_assessment_handoff.py`
- `reports/assessment-trace-review.md`

### Testing

1. Trace one vulnerable and one backported asset from raw inputs to verdict
2. Remove required evidence and verify the same engine returns unknown
3. Check displayed/source-linked verdicts against the D09 output

### Acceptance Criteria

- Seeded supported-family recall and precision reported separately
- Unknowns counted and not hidden
- No vulnerability proof from llm narrative
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- aliases and source conflicts
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

unknown plus analyst review, never guessed match

### Next Dependent Work

C09, C10, C13, C15, C16, P06

### Related Decisions

ADR06, ADR07

## C09 — Validate Patch Catalog Candidates Against Execution Prerequisites

**Goal:** Convert D14 catalog entries into runner-ready eligibility checks without duplicating the catalog.

**Why This Matters:** Turns vendor remediation information into compatible candidate fixes.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, D14 (initial plan; no completion reported).

**Depends on:** C08, D14

**Unlocks:** C10, C11

**Parallel with:** D12, D13, D15, C04

**Critical path:** Yes

**First action:** Reuse D14 catalog records; add runner-facing applicability and availability checks, not a second catalog.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Patch Catalog Candidates Against Execution Prerequisites. **When:** At the input/fixture review and again before C09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c09-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Is the documented fix actually available from the target's configured repository?
- Which entitlement, support, reboot and compatibility prerequisites must be checked?
- How should superseded, withdrawn or unavailable fixes be handled?

Sources: CY-S04, CY-S06, CY-S13

### Inputs

- vendor advisories/repositories

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Reuse D14 catalog records; add runner-facing applicability and availability checks, not a second catalog.
3. Record fix ids, affected product range, fixed version, support state, advisory links, prerequisites, restart notes and supersedence where supplied
4. Separate mitigation from patch
5. Review one affected-to-fixed package path with Mahrous and record unsupported or ambiguous cases
6. Version each revision
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse the versioned D14 catalog; add applicability, availability and execution precondition checks. A download URL or AI recommendation is not approval.

### Expected Deliverables

- `backend/app/remediation/eligibility.py`
- `fixtures/remediation/eligibility-cases.jsonl`
- `tests/remediation/test_eligibility.py`
- `reports/patch-candidate-review.md`

### Testing

1. Evaluate an installable fix and record repository evidence
2. Reject a wrong-release or unavailable candidate
3. Keep mitigation-only and no-fix findings out of automatic package execution

### Acceptance Criteria

- Every candidate points to vendor evidence and applicable platform
- Newest is not automatically best
- No fixed version means no invented patch
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- advisory incomplete/withdrawn
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

pending/manual mitigation with explicit review date

### Next Dependent Work

C10, C11

### Related Decisions

ADR06, ADR07

## C10 — Build Version-Bound Patch Plans & Enforce Approval Policy

**Goal:** Create reviewable target manifests that cannot bypass scope, approval expiry or drift checks.

**Why This Matters:** Binds changes to approved targets, scope and time.

**Owner:** Mahrous

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, C09, P04 (initial plan; no completion reported).

**Depends on:** C08, C09, P04

**Unlocks:** C11, C14, A11, P12

**Parallel with:** D03, D04, D11, D16

**Critical path:** Yes

**First action:** Calculate candidate set under support/compatibility/window constraints

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Version-Bound Patch Plans & Enforce Approval Policy. **When:** At the input/fixture review and again before C10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c10-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Scope constraints are enforced in policy, not just displayed on the website.

- Who may propose, approve and dispatch in the four-role policy?
- Which plan, inventory and policy changes invalidate approval?
- What canary, maintenance-window and stop rules suit the lab?

Sources: CY-S06

### Inputs

- applicable findings and candidate fixes

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Calculate candidate set under support/compatibility/window constraints
3. Build target manifest
4. Require scoped approver
5. Expire on drift
6. Define canary and stop thresholds
7. Evaluate deployment/profile capability flags and current policy before approval; a recommendation-only FortiOS action cannot become executable through assistant wording or a UI toggle.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Immutable version/hash-bound plans with explicit scope and permission checks, coordinated with P12. Human approval is checked again immediately before mutation.

### Expected Deliverables

- `backend/app/remediation/policy.py`
- `contracts/v1/patch-plan.schema.json`
- `config/campaign-policy.yaml`
- `tests/remediation/test_approval_policy.py`
- `docs/approval-state-machine.md`

### Testing

1. Deny approval and execution for Auditor/Guest
2. Change the target snapshot or plan hash after approval and reject dispatch
3. Expire a window and verify a new review is required

### Acceptance Criteria

- Auditor/guest cannot approve/execute
- Changed asset/version invalidates approval
- No approval bypass through assistant tools
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Only the separately qualified Ubuntu lab execution profile is dispatchable in the current release.

### Risks / Failure Modes

- overbroad administrator privileges
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

explicit small-scope manual approval and no automatic campaign scheduling

### Next Dependent Work

C11, C14, A11, P12

### Related Decisions

ADR06, ADR07

## C11 — Implement an Approved Ubuntu Patch Pilot Runner

**Goal:** Install one exact approved package plan on a disposable target and retain every execution outcome.

**Why This Matters:** Executes a controlled real patch through a reusable OS engine.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C02, C05, C09, C10, P08, P12 (initial plan; no completion reported).

**Depends on:** C02, C05, C09, C10, P08, P12

**Unlocks:** C12, C13

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Compare the approved target identity, observation freshness and maintenance window before starting any package mutation.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement an Approved Ubuntu Patch Pilot Runner. **When:** At the input/fixture review and again before C11 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c11-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which native package or Ansible operation can enforce exact versions and trusted repositories?
- How are disk space, locks, backup and target identity checked?
- What state is recorded when the connection is lost after mutation may have begun?

Sources: CY-S03, CY-S14

### Inputs

- immutable approved manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Verify identity/freshness/window
3. Acquire asset lease
4. Preflight disk/locks/backup/repository
5. Run allowlisted explicit package plan
6. Persist step outcomes
7. Reconcile on reconnect
8. Never interpolate arbitrary shell
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Isolated allowlisted runner using native package mechanisms, with Ansible as the first adapter candidate. No arbitrary shell from the user or assistant; exact runner choice is validated in the lab.

### Expected Deliverables

- `runner/adapters/ubuntu_patch.py`
- `runner/playbooks/ubuntu-approved-plan.yml`
- `fixtures/patch/ubuntu-plan.json`
- `tests/runner/test_patch_preflight.py`
- `reports/ubuntu-pilot.md`

### Testing

1. Execute one approved canary update and compare intended/actual versions
2. Resubmit the same job and prove no blind repeated mutation
3. Lose the execution connection and enter outcome_unknown until reconciliation

### Acceptance Criteria

- One intended update on canary
- Duplicate job does not cause duplicate mutation
- Timeout yields unknown outcome until reconciliation
- Unsigned/unapproved artifacts rejected
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- package drift after approval
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

stop and replan

### Next Dependent Work

C12, C13

### Related Decisions

ADR06, ADR07

## C12 — Handle Reboots, Reconnects and Partial Patch Failures

**Goal:** Keep long-running campaigns truthful and resumable across reboots and transport failures.

**Why This Matters:** Prevents connection failures and restarts from becoming false success.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C11 (initial plan; no completion reported).

**Depends on:** C11

**Unlocks:** C13, C14

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Record how the selected adapter detects reboot requirements and define a fixture for a target that disconnects during restart.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Handle Reboots, Reconnects and Partial Patch Failures. **When:** At the input/fixture review and again before C12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c12-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How is reboot need detected for each supported adapter?
- How are pre/post boot identity and authenticated reconnect distinguished?
- Which failure halts later canary batches and which step can safely resume?

Sources: CY-S03, CY-S04

### Inputs

- controlled failure fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Detect restart need
3. Respect window
4. Record pre/post boot identity
5. Wait for authenticated reconnect
6. Run health checks
7. Retain per-asset/per-step outcome
8. Halt next batch on trigger
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Durable attempt records, bounded reconnect and explicit reboot_pending/outcome_unknown states. Transport retry is not permission to repeat a non-idempotent update.

### Expected Deliverables

- `runner/recovery.py`
- `contracts/v1/execution-state.schema.json`
- `fixtures/patch/failure-sequences.jsonl`
- `tests/runner/test_reboot_recovery.py`
- `reports/failure-rehearsal.md`

### Testing

1. Restart the runner while the target is rebooting and preserve durable state
2. Fail one asset in a batch and report a partial campaign
3. Reconnect after ambiguous completion and inspect state before any retry

### Acceptance Criteria

- Runner interruption, target disconnection and one failed asset never become whole-campaign success
- Operator can resume a safe remaining step
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- repeated execution after transport loss
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reconcile-only state with manual recovery

### Next Dependent Work

C13, C14

### Related Decisions

ADR06, ADR07

## C13 — Verify Remediation Independently & Rehearse Recovery

**Goal:** Build independent post-remediation asset verification using fresh inventory and service health. Amr owns patch/recovery execution; Mahrous reviews matching, closure and recurrence decisions.

**Why This Matters:** Proves remediation and service health rather than trusting exit codes.

**Owner:** Shams

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C08, C11, C12 (initial plan; no completion reported).

**Depends on:** C08, C11, C12

**Unlocks:** C14, C16, P15

**Parallel with:** D04, D16, C04, C06

**Critical path:** Yes

**First action:** Collect fresh evidence independent of executor's success flag

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Execute the authorized patch/recovery rehearsal through C11/C12/C14, supply runner/recovery evidence, and review environmental assumptions. Shams independently recollects and verifies asset state; she does not duplicate the execution runner. **When:** At the input/fixture review and again before C13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c13-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review matching/reassessment, closure and recurrence decisions against independent fresh asset evidence. Shams owns the verification component; Amr runs authorized patch/recovery operations through C11/C12/C14. **When:** At the contract/input review and again before package acceptance after the listed prerequisites are available. **Deliver:** `reviews/c13-mahrous.md — Matching/closure review and disposition`. **Review:** Shams records findings and disposition; unresolved safety, identity or contract blockers prevent acceptance.

Ownership update (6 November): 6 November 2026: primary ownership transferred from Mahrous to Shams at Mahrous’s request to consolidate asset responsibility. Own independent post-remediation asset evidence, verification code and tests. Amr retains execution and recovery operations; Mahrous reviews applicability and closure decisions. Earlier work retains actual authorship; existing dependencies, deliverables, acceptance and completion state are retained.

### Scope Revision

- Verified closure is the boundary needed for credible recurrence and root-cause review.

- Which installed versus running version checks matter for the chosen update?
- What independent health check detects a broken service despite exit code zero?
- Which restore, downgrade or forward-fix path is actually supported?

Sources: CY-S03, CY-S06

### Inputs

- post-execution observation and health checks

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Collect fresh evidence independent of executor's success flag
3. Reevaluate finding
4. Compare running and installed state where needed
5. Perform service checks
6. Close only on sufficient evidence
7. Verify fresh asset and service evidence before and after the chosen recovery fixture; Amr executes authorized rollback/restore through C12/C14 and Shams records the verification outcome
8. Record verified closure with independent inventory and service health. If the finding later recurs, preserve the closed episode and open a linked episode for investigation rather than editing history.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Independent collection and deterministic reassessment plus adapter-specific service checks. No universal rollback claim; recovery must be rehearsed for the selected lab target.

### Expected Deliverables

- `backend/app/remediation/verification.py`
- `lab/recovery-matrix.md`
- `fixtures/patch/postcheck-results.jsonl`
- `tests/remediation/test_verification.py`
- `reports/recovery-drill.md`

### Testing

1. Return package exit zero with a failed health check and keep the finding open
2. Restore an old vulnerable version and expect the finding to reopen
3. Run a clean post-observation and verify its source/evidence links

### Acceptance Criteria

- Successful package exit plus failing health remains unresolved
- No universal rollback promise
- Restored old vulnerable version reopens finding
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- snapshot loses data or package downgrade unsupported
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

tested restore/rebuild or documented forward-fix

### Next Dependent Work

C14, C16, P15

### Related Decisions

ADR06, ADR07

## C14 — Validate Windows Updates and Reboot Recovery Before Adding Execution

**Goal:** Implement a Windows patch adapter only after update-source, privilege and reconnect behavior are proven.

**Why This Matters:** Adds Windows execution only after distinct platform constraints are demonstrated.

**Owner:** Amr

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Deferred extension

**Gate:** G3

**Start condition:** Blocked by: C06, C10, C12, C13 (initial plan; no completion reported).

**Depends on:** C06, C10, C12, C13

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Validate winrm encryption/identity and admin boundary

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Windows Updates and Reboot Recovery Before Adding Execution. **When:** At the input/fixture review and again before C14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c14-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which configured update service supplies applicable updates on the licensed test build?
- How do exact update IDs/KBs, supersedence and multiple reboots affect the plan?
- What WinRM authentication/encryption and administrator boundary is required?

Sources: CY-S04, CY-S05

### Inputs

- approved Windows test update manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Validate winrm encryption/identity and admin boundary
3. Enumerate configured update source
4. Search available updates
5. Select exact approved ids/kbs
6. Install with bounded reboot policy
7. Capture hresults and per-update state
8. Fresh inventory and health
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: native Windows servicing through the selected supported adapter, including ansible.windows.win_updates candidate. Jobs may run for hours; C06 inventory alone does not prove patch capability.

### Expected Deliverables

- `experiments/windows_patch_spike.py`
- `runner/adapters/windows_patch.py`
- `fixtures/patch/windows-plan.json`
- `tests/runner/test_windows_patch_states.py`
- `reports/windows-patch-capability.md`

### Testing

1. Perform one authorized update and authenticated reboot/reconnect cycle
2. Capture per-update failure codes and an unavailable update case
3. Reject an unsupported SCCM path and a stale approval

### Acceptance Criteria

- Real successful patch/reboot and failure/reconnect scenario
- Unsupported sccm route is rejected
- Long-running job remains visible
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- hours-long updates, policy/catalog mismatch
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

reviewed manual native-update execution with evidence import

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR06, ADR07

## C15 — Send Lifecycle Events to Wazuh & Verify Decoding and Correlation

**Goal:** Prove a real project event reaches Wazuh, is decoded and triggers the intended rule.

**Why This Matters:** Meets the proposal with real external SIEM evidence.

**Owner:** Mahrous

**Support:** Amr, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: C03, C08, P13 (initial plan; no completion reported).

**Depends on:** C03, C08, P13

**Unlocks:** C16

**Parallel with:** D04, D14, D16, C04

**Critical path:** Yes

**First action:** Emit one json object per line to restricted rotating log

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Send Lifecycle Events to Wazuh & Verify Decoding and Correlation. **When:** At the input/fixture review and again before C15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c15-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Send Lifecycle Events to Wazuh & Verify Decoding and Correlation. **When:** At the input/fixture review and again before C15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c15-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which Wazuh agent/localfile and JSON decoder configuration is deployed in the lab?
- Which event fields support asset/finding/campaign correlation?
- What happens on log rotation, replay and duplicate delivery?

Sources: CY-S15, CY-S16

### Inputs

- normalized assessment/patch events

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Emit one json object per line to restricted rotating log
3. Configure wazuh agent localfile collection
4. Verify json decoding
5. Add custom rules
6. Test decoder/rule with wazuh-logtest
7. Correlate by asset id, finding id and campaign id
8. Verify external dashboard alert
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr implements collector; Omar supports event API and outbox review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: P13 outbox delivers JSON lines to the supported Wazuh collection route. The management REST API is not assumed to be a generic event ingestion endpoint.

### Expected Deliverables

- `integrations/wazuh/localfile-example.conf`
- `integrations/wazuh/local_rules.xml`
- `fixtures/siem/events.jsonl`
- `reports/wazuh-ingestion-proof.md`
- `tests/integrations/test_siem_payload.py`

### Testing

1. Run the fixture through wazuh-logtest and inspect decoded fields
2. Emit a real event and find its event_id in the external alert
3. Replay/rotate inputs and ensure project business counters are not inflated

### Acceptance Criteria

- Event contains source id, timestamp, evidence reference, cve/advisory id and lifecycle state
- Replay preserves event id and cannot inflate project counters
- No credentials in exported payload
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- duplicate delivery and rotation loss
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

durable replay cursor and documented at-least-once semantics, no claim of generic REST ingestion

### Next Dependent Work

C16

### Related Decisions

ADR06, ADR07

## C16 — Publish Supported-Coverage Results & Reproduce the End-to-End Demo

**Goal:** Deliver measured detection, verified remediation and failure evidence for the declared lab scope.

**Why This Matters:** Turns project claims into reproducible academic evidence.

**Owner:** Mahrous

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: C04, C05, C08, C13, C15, D15 (initial plan; no completion reported).

**Depends on:** C04, C05, C08, C13, C15, D15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D16

**Critical path:** Yes

**First action:** Freeze the evaluated code, source revisions, supported-profile list and ground-truth fixture manifest before calculating results.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Publish Supported-Coverage Results & Reproduce the End-to-End Demo. **When:** At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/c16-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before C16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/c16-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which fixtures and supported profiles form the fixed denominator?
- How are false positives, false negatives, unknowns and scan failures counted separately?
- What minimum live and offline replay demo proves the story honestly?

Sources: CY-S06, CY-S07

### Inputs

- declared support matrix and known lab ground truth

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Freeze test version
3. Measure recall/precision/unknown rate by asset family
4. Count scan failures separately
5. Time update/assessment and recovery
6. Compare optional independent scanner results without treating them as truth
7. Publish unsupported cases and runbooks
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Controlled-lab metrics and reproducible evidence; optional scanner comparisons are secondary, not ground truth. Repeat the relevant subset at each discussion and freeze final results at G4.

### Expected Deliverables

- `experiments/evaluate_lab.py`
- `reports/coverage-benchmark.md`
- `reports/demo-evidence-manifest.json`
- `docs/runbooks/final-demo.md`
- `reports/known-limitations.md`

### Testing

1. Run a frozen held-out fixture set and publish all metric counts
2. Demonstrate one verified fix and one failure/recovery path
3. Have another member reproduce the recorded evaluation from its manifest

### Acceptance Criteria

- Proposal ≥90% detection goal reported only on declared known lab vulnerabilities, with denominator and failure cases
- Actual siem event and one verified remediation demonstrated
- No product-wide claims from tiny lab
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- cherry-picked demo
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

holdout fixtures reviewed by teammate and seeded failure demonstration

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR06, ADR07

## A01 — Define AI Tasks, Label Rules and Reviewed Examples

**Goal:** Turn category, impact, severity and assistant behavior into separately measurable tasks.

**Why This Matters:** Convert the proposal into measurable ML tasks without treating inference as authoritative security truth.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** A02

**Parallel with:** D01, D02, C01, C02

**Critical path:** No

**First action:** Write category and impact inclusion/exclusion rules with multi-label examples.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Define AI Tasks, Label Rules and Reviewed Examples. **When:** At the input/fixture review and again before A01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a01-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Hams starts with scope/taxonomy and UX01; no unbounded training or generic OT classification.

- Which category and impact labels can overlap?
- What does an unmentioned impact mean versus a reviewed negative label?
- How must source-backed severity differ from predicted missing severity?
- Which category labels help triage the narrow profiles and are supported by reliable source evidence?
- Which organizational fields are structured tool inputs rather than text inferred from a CVE?

Sources: AI01, AI05

### Inputs

- Proposal dimensions
- 30 representative advisory records

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Write category and impact inclusion/exclusion rules with multi-label examples.
3. Separate official severity from inferred missing severity and preserve provider/version.
4. Define unknown, contradictory and insufficient-text cases.
5. Define assistant intents, prohibited actions and sample expected answers.
6. Have Amr and Mahrous independently label ten cases, adjudicate disagreements.
7. Align labels and user questions with UX01 and the scope baseline; keep source category, model-inferred category, applicability and priority as separate fields.
8. Freeze a small taxonomy for the supported profiles before model experiments; record rare or uncertain labels and avoid invented labels from generated text.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Multilabel category/impact taxonomy with explicit unknowns; official CVSS remains primary. Labels are project definitions, not an official universal CVE taxonomy.

### Expected Deliverables

- `docs/ai/taxonomy.md`
- `contracts/v1/ai-task.schema.json`
- `datasets/labels/pilot-reviewed.jsonl`
- `docs/ai/assistant-intents.md`

### Testing

1. Have two reviewers label the same ten examples and resolve disagreements
2. Check positive, negative and unknown examples for every retained label
3. Verify no prediction can overwrite official severity

### Acceptance Criteria

- Each label has positive/negative/unknown examples.
- No AI output overwrites source-backed severity.
- Ten adjudicated examples and reviewers recorded.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The task taxonomy does not imply that a classifier detects installed vulnerabilities or chooses patch approval.

### Risks / Failure Modes

- Ambiguous taxonomy causes inconsistent labels.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Reduce labels to defensible classes and retain unknown.

### Next Dependent Work

A02

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A02 — Create Versioned Training and Evidence Datasets With Provenance

**Goal:** Freeze provenance-controlled AI datasets; coordinate Amr’s preparation of the prioritization input bundle without duplicating source collectors.

**Why This Matters:** Reproducible experiments require exact source revisions.

**Owner:** Hams

**Support:** Shams, Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: A01 (initial plan; no completion reported).

**Depends on:** A01

**Unlocks:** A03, A06

**Parallel with:** D01, D02, C01, C02

**Critical path:** No

**First action:** Select a pilot snapshot with source IDs, dates, hashes and revision keys.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-shams.md — Coordinate and assemble vulnerability, asset and contextual inputs; validate joins, timestamps, missingness and data readiness, reusing existing collectors.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Amr**: Supply authoritative advisory/source revisions and review provenance/rights; Amr owns D01–D07, D11, D14, D16–D18 and C09. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-amr.md — Supply authoritative source revisions and review provenance/rights; no transfer of D01–D05 source ownership.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-mahrous.md — Supply applicability outcomes and reviewed business/policy scenario constraints from D09/D12.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Validate P02 identifiers, tenant scope and serialization for the experimental input bundle. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a02-omar.md — Validate P02 identifiers, tenant scope and serialization for the experimental input bundle.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Prefer real public records plus real lab observations; synthetic policies are controlled fixtures.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which source revisions and fields are allowed in each AI task?
- How are vulnerability aliases and text revisions grouped?
- What attribution, sensitive-data exclusion and feedback-review rules apply?
- Which CVE/vendor records are real public evidence, which labels are reviewed, and which assets/policies are generated fixtures?
- Are dataset license, source revision and sensitive-field removal recorded per source?
- Which ranking/context fields are available, absent, stale or synthetic?
- Can the same immutable scenario bundle reproduce rule, AI and hybrid comparisons?

Sources: AI02, AI03

### Inputs

- Canonical advisory API fixture
- A01 taxonomy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select a pilot snapshot with source IDs, dates, hashes and revision keys.
3. Record allowed uses and data provenance.
4. Create raw immutable and normalized tables/files with manifest.
5. Mark rejected, disputed, missing and alias records explicitly.
6. Keep human labels separate from weak machine labels.
7. Build a data manifest with origin classes public_source, real_lab_observation, reviewed_label and synthetic_fixture. Public CVE/vendor records are not real customer inventory.
8. Use real authorized lab snapshots for behavior tests; generated assets/policies only fill controlled scenario gaps and carry visible synthetic labels. Do not treat Claude-generated CVEs or unreviewed Kaggle rows as authoritative.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Amr + Mahrous + Omar review the handoff before declaring completion.
10. Amr assembles prioritization experiment tables from D01–D05/D11 feeds, C05 observations and D12 policy/context definitions once those artifacts exist; initial A02 manifest design can start earlier. Reuse source owners’ collectors, do not create parallel feeds.
11. Join record/advisory revision, observed asset revision, dated threat signals, consented or labelled synthetic organization context, maintenance window and eligible remediation action IDs. Retain missing-field masks and conflicts. Hams freezes leakage-safe datasets via A03.

### Technical Approach

Existing Design Decision: Versioned JSONL and dataset manifests from preserved evidence, with human-reviewed labels. User feedback and LLM-generated labels are not automatic ground truth.

### Expected Deliverables

- `datasets/manifests/corpus-v1.json`
- `datasets/raw/advisories.jsonl`
- `datasets/labels/review-queue.jsonl`
- `scripts/ai/build_dataset.py`
- `docs/ai/dataset-card.md`
- `ai/data/origin-and-rights-manifest.csv`
- `datasets/prioritization/input-manifest.json`
- `datasets/prioritization/scenarios.jsonl`
- `datasets/prioritization/readiness-report.md`

### Testing

1. Rebuild the same dataset from a pinned manifest
2. Trace each example to a source revision and label provenance
3. Reject records with missing required provenance without silently dropping them
4. Audit a sample from each origin class and verify generated fixtures cannot silently enter the real-data evaluation denominator.
5. Validate joins and hashes; reject cross-organization leakage and duplicate/revision leakage.

### Acceptance Criteria

- Every row links to retrievable source revision.
- Rebuilding from the manifest reproduces row counts/hashes.
- No sensitive inventory is added to public training exports.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Every sample has provenance, rights status and split membership; synthetic-only results are separately reported.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Field coverage and missing/stale/synthetic fractions per origin; reproducible row counts

### Risks / Failure Modes

- Dataset revisions silently change reported scores.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze a small licensed/reviewed snapshot and expand later.

### Next Dependent Work

A03, A06

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A03 — Clean Advisory Text & Freeze Leakage-Safe Dataset Splits

**Goal:** Prepare train/validation/test partitions without leaking future facts, aliases or labels.

**Why This Matters:** Near-duplicate advisories can make a weak model look excellent.

**Owner:** Hams

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A02 (initial plan; no completion reported).

**Depends on:** A02

**Unlocks:** A04, A17

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Normalize HTML/Unicode while retaining negation, versions and IDs.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Clean Advisory Text & Freeze Leakage-Safe Dataset Splits. **When:** At the input/fixture review and again before A03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Extend leakage controls to revised vendor records and organization-context scenarios.

- Which HTML/Unicode normalization preserves negation, IDs and version strings?
- How are exact and near-duplicate advisories grouped before temporal splitting?
- Which severity-derived tokens or future revisions would leak the target?

Sources: AI02, AI03

### Inputs

- A02 raw data
- Alias mapping

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Normalize HTML/Unicode while retaining negation, versions and IDs.
3. Identify exact and near duplicates and group aliases/revisions.
4. Choose temporal cutoff and validation window; keep groups together.
5. Reserve unseen-family diagnostic split separately.
6. Fit preprocessing only on training data and audit for labels embedded in features.
7. Write assertions for zero alias/revision overlap and future leakage.
8. Group CVE/advisory duplicates and revisions before splitting; separate organization scenarios and historical cutoffs to prevent source or policy leakage. Keep ranking judgments and user-study scenarios out of training.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Group-aware chronological split with a locked final holdout; explicit severity leakage controls. TimeSeriesSplit alone does not solve advisory alias leakage.

### Expected Deliverables

- `scripts/ai/prepare_splits.py`
- `datasets/splits/train.jsonl`
- `datasets/splits/validation.jsonl`
- `datasets/splits/test.jsonl`
- `reports/ai/leakage-audit.md`

### Testing

1. Check that aliases/revisions do not cross the frozen partitions
2. Verify vectorizers are fitted on training data only
3. Use a future amendment and confirm it cannot alter the historical test input
4. Check duplicate IDs, near-duplicates and revised advisories across splits; fail the dataset release if leakage is unresolved.

### Acceptance Criteria

- No vulnerability group spans train/test.
- Cutoff and source revision timestamps are recorded.
- Severity description experiment excludes explicit target score/vector fields.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Pretrained-model knowledge of older CVEs remains possible.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Report contamination limit and add new post-freeze cases.

### Next Dependent Work

A04, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A04 — Train CPU Classification Baselines & Report Per-Label Errors

**Goal:** Establish an inexpensive reproducible baseline before considering heavier models.

**Why This Matters:** Establish an inexpensive defensible academic baseline before expensive models.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A03 (initial plan; no completion reported).

**Depends on:** A03

**Unlocks:** A05, A13, A17

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Implement majority and keyword baselines.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Train CPU Classification Baselines & Report Per-Label Errors. **When:** At the input/fixture review and again before A04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a04-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which keyword and TF-IDF baselines answer the defined tasks?
- How should class imbalance and missing labels affect training and thresholds?
- Which macro/micro/per-label metrics and abstention coverage will be reported?

Sources: AI01, AI04

### Inputs

- A03 splits
- A01 taxonomy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement majority and keyword baselines.
3. Train word/character TF-IDF with OneVsRest logistic regression; compare linear SVM.
4. Tune thresholds on validation only.
5. Log macro/micro/per-label precision recall F1 and label support.
6. Inspect false positives/negatives with Amr.
7. Export pipeline with pinned versions and model card.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Word/character TF-IDF with OneVsRest logistic regression or linear SVM candidates. Choose thresholds on validation only; no fixed final F1 promise before label audit.

### Expected Deliverables

- `experiments/ai/train_baselines.py`
- `models/baselines/manifest.json`
- `reports/ai/classification-metrics.json`
- `reports/ai/classification-errors.md`
- `tests/ai/test_inference_contract.py`

### Testing

1. Compare keyword and TF-IDF OneVsRest baselines on the same splits
2. Report per-label precision/recall/F1 with class counts
3. Reload the pinned model and reproduce saved predictions

### Acceptance Criteria

- Identical seed/snapshot reproduces metrics.
- Rare classes and unknown coverage are visible.
- Held-out test remains locked until model choices freeze.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Small labels or imbalance makes overall accuracy misleading.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use simpler model and collect targeted labels before deep learning.

### Next Dependent Work

A05, A13, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A05 — Review Label Disagreements & Test a Stronger Classifier Only if Justified

**Goal:** Determine whether better labels or a more capable encoder meaningfully improves the baseline.

**Why This Matters:** Increase quality where measured errors justify effort.

**Owner:** Hams

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G3

**Start condition:** Blocked by: A04 (initial plan; no completion reported).

**Depends on:** A04

**Unlocks:** Final handoff

**Parallel with:** D01, D02, D03, D04

**Critical path:** No

**First action:** Sample disagreement and rare-label cases for dual review.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. **When:** At the input/fixture review and again before A05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a05-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Review Label Disagreements & Test a Stronger Classifier Only if Justified. **When:** At the input/fixture review and again before A05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a05-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Keep a measurable CPU baseline; stronger classifiers remain conditional.
- 24 October: exclude fine-tuning from current execution; retain a long-term evidence-led capability review in OQ01.

- Which error categories are label problems rather than model failures?
- Do frozen embeddings plus a linear head improve the same held-out task?
- Does a SecBERT or frozen encoder candidate improve the declared task over TF-IDF under the same split and hardware budget?
- What baseline failures, if any, should be documented for the future OQ01 review without starting fine-tuning now?

Sources: AI01, AI03, AI10, MR10

### Inputs

- A04 error clusters
- Unlabelled source records

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Sample disagreement and rare-label cases for dual review.
3. Log agreement and adjudication without revealing test answers to training.
4. Compare frozen multilingual embeddings plus a linear classifier.
5. Keep pretrained encoders frozen in the current release. Record any future fine-tuning case under OQ01; do not train adapted weights in this package.
6. Run equal splits and measure latency/model size as well as F1.
7. Treat SecBERT/BERT as optional encoder/classification candidates; validate exact weights, license and downstream head before use. They are not replacements for a generative assistant.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision: compare reviewed labels and frozen embeddings plus a linear classifier against the CPU baseline. No fine-tuning in the current release. Future pretrained-weight adaptation requires the separate evidence, rights, resource and lifecycle review in OQ01.

### Expected Deliverables

- `datasets/labels/adjudication-log.jsonl`
- `experiments/ai/compare_classifiers.py`
- `reports/ai/model-comparison.md`
- `models/candidate/model-card.md`

### Testing

1. Adjudicate a reviewed error subset before retraining
2. Compare candidates using identical splits and metrics
3. Measure runtime/RAM and report negative results as well as gains

### Acceptance Criteria

- Model selected using validation, not the final test.
- Improvement and added operational cost are documented.
- Human label provenance survives each revision.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Current candidate comparisons keep pretrained weights frozen; any future fine-tuning proposal remains separate from current execution.

### Risks / Failure Modes

- Deep model overfits sparse labels.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Ship CPU baseline; supervised learning remains substantial even without fine-tuning.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A06 — Build Revision-Aware Retrieval Chunks With Source Metadata

**Goal:** Create searchable evidence units that preserve version tables, scope and revision history.

**Why This Matters:** Answers need source sections and fresh revisions, not anonymous text fragments.

**Owner:** Hams

**Support:** Amr, Omar, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A02, D02 (initial plan; no completion reported).

**Depends on:** A02, D02

**Unlocks:** A07, A14, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Parse descriptions, applicability and remediation into separate section types.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Build Revision-Aware Retrieval Chunks With Source Metadata. **When:** At the input/fixture review and again before A06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- RAG uses governed documents; current facts and verdicts come from authorized typed tools.

- Which advisory sections should be kept together to avoid mixing product rows?
- What chunk size fits the candidate embedding token limit?
- How are withdrawal, source scope, document hashes and stale chunks represented?
- Which facts belong in structured database/tool responses and which explanatory documents belong in the retrieval corpus?
- How are organization-specific policy documents scoped, versioned, revoked and retrieved without cross-organization leakage?

Sources: AI08, AI12

### Inputs

- Advisory/patch metadata contracts
- A02 source manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Parse descriptions, applicability and remediation into separate section types.
3. Chunk by semantic section/product row with token limits.
4. Attach source URL/date/hash/revision/platform and access scope.
5. Reject empty/unsafe markup and quarantine malformed extraction.
6. Implement replacement/tombstone of chunks after source changes.
7. Keep authoritative CVE/vendor assertions, inventory, applicability, priority and approval state in structured storage. Index selected source text and policies as derived retrieval evidence with typed links back to those records.
8. Separate public knowledge from organization-scoped policies and runbooks; attach organization/object ACL, source revision, validity dates and trust labels to chunks.
9. Prepare local embedding/tokenizer artifacts and a rebuildable index export for the on-prem profile; record model/hash and disable external embedding calls in local-only mode.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Structured chunks and metadata in the existing PostgreSQL design; embeddings are derived. Corpus fixtures allow development before the full live intake is ready.

### Expected Deliverables

- `backend/app/ai_gateway/corpus.py`
- `contracts/v1/retrieval-chunk.schema.json`
- `datasets/retrieval/chunks.jsonl`
- `tests/ai/test_chunk_provenance.py`
- `docs/ai/chunking-rules.md`
- `ai/retrieval/corpus-routing.md`

### Testing

1. Trace every chunk to its exact source section and revision
2. Keep distinct distro/version table rows from being mixed
3. Mark a superseded revision stale and exclude it from current retrieval
4. Revoke a policy and revise an advisory; verify old chunks cannot answer as current evidence.

### Acceptance Criteria

- Chunks preserve product and version-table context.
- Every chunk can open exact source/revision.
- Changed/rejected source fixtures retire obsolete chunks.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- RAG is not used as the source of truth for installed-version matching or live approval status.

### Risks / Failure Modes

- Chunk boundaries mix fixed versions across products.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use source-specific structured templates before generic chunking.

### Next Dependent Work

A07, A14, P17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A07 — Benchmark Exact, Lexical and Multilingual Hybrid Retrieval

**Goal:** Choose retrieval based on judged source relevance and real hardware cost.

**Why This Matters:** Measure whether semantic retrieval improves the project’s real queries.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A06 (initial plan; no completion reported).

**Depends on:** A06

**Unlocks:** A08, A09, P11

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Implement exact CVE/alias lookup before search.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Benchmark Exact, Lexical and Multilingual Hybrid Retrieval. **When:** At the input/fixture review and again before A07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a07-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Evaluate organization context and evidence visibility, not only semantic similarity.

- Does lexical-only search already answer exact IDs and product questions?
- Do E5-small or BGE-M3 improve Arabic, English and Arabizi queries?
- How do authorization filters affect recall, latency and candidate counts?

Sources: AI06, AI07, AI08, AI09

### Inputs

- A06 chunks
- 60 judged pilot queries

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement exact CVE/alias lookup before search.
3. Build PostgreSQL lexical baseline preserving technical tokens.
4. Benchmark E5-small with correct prefixes and BGE-M3 on same queries.
5. Fuse lexical/dense rankings with documented settings.
6. Measure Recall@5/10, MRR, language slices, RAM and query latency.
7. Use exact vector scan initially; add approximate index only after profiling.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Exact IDs plus PostgreSQL text search, with pgvector dense retrieval only if measured useful. E5-small and BGE-M3 are candidates; use documented prefixes and model revisions.

### Expected Deliverables

- `experiments/ai/evaluate_retrieval.py`
- `datasets/retrieval/query-bank.jsonl`
- `reports/ai/retrieval-results.csv`
- `docs/adr/retrieval-choice.md`
- `tests/ai/test_scope_filters.py`

### Testing

1. Run exact/lexical/dense/hybrid variants on the same reviewed queries
2. Measure Recall@5/10 and ranking metrics with scope filters applied
3. Record RAM and latency on the actual available machine
4. Benchmark exact IDs, product/train questions, policy questions and cross-organization forbidden queries separately; report recall@k, citation support, unauthorized exposure count and latency.

### Acceptance Criteria

- English/Arabic/Arabizi evaluated separately.
- Known exact IDs remain retrievable.
- Access filters apply to every retrieval path.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The chosen retrieval configuration passes the frozen relevance/ACL rubric; negative findings and missing evidence are retained.

### Risks / Failure Modes

- Embedding similarity misses precise identifiers or confuses version strings.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Return exact/lexical results and citation cards when dense search fails.

### Next Dependent Work

A08, A09, P11

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A08 — Test Reranking Against Measured Retrieval Errors

**Goal:** Add a reranker only if evidence shows initial candidate ordering is the bottleneck.

**Why This Matters:** Prevent a costly component without measured benefit.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G3

**Start condition:** Blocked by: A07 (initial plan; no completion reported).

**Depends on:** A07

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D06

**Critical path:** No

**First action:** Identify cases with relevant passage in top 20 but not top 5.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Test Reranking Against Measured Retrieval Errors. **When:** At the input/fixture review and again before A08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a08-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Are missed answers caused by candidate absence or poor ranking?
- Which small cross-encoder can run within the measured resource budget?
- Does reranking help after product/version/scope filters, and at what latency cost?

Sources: AI11

### Inputs

- A07 ranked candidates and errors

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Identify cases with relevant passage in top 20 but not top 5.
3. Choose a documented compatible cross-encoder checkpoint and review its license.
4. Rerank bounded candidates and log latency.
5. Compare unchanged judged questions and permission filters.
6. Adopt only if quality gain meets agreed latency/resource budget.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Experimental Decision, optional G3 enhancement. Do not add a new inference dependency unless its measured gain exceeds the added cost.

### Expected Deliverables

- `experiments/ai/compare_rerankers.py`
- `reports/ai/reranking-ablation.csv`
- `docs/adr/reranking-gate.md`
- `tests/ai/test_reranker_fallback.py`

### Testing

1. Compare with/without reranking on the same candidate sets
2. Measure answer-support gain and p95 latency
3. Make the reranker unavailable and preserve the baseline retrieval path

### Acceptance Criteria

- No checkpoint adopted without license/revision record.
- Ablation reports quality and added latency.
- No reranker is needed to complete first-term core.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Extra inference causes timeouts with little gain.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep hybrid ranking without reranker.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A09 — Benchmark Candidate LLMs on Project Questions and Available Hardware

**Goal:** Select a serving candidate only after domain correctness and actual resource use are measured.

**Why This Matters:** Select the generator from evidence on actual laptops.

**Owner:** Hams

**Support:** Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: A07 (initial plan; no completion reported).

**Depends on:** A07

**Unlocks:** A10, P11, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Inventory CPU/RAM/GPU/free disk and supported runtimes.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Benchmark Candidate LLMs on Project Questions and Available Hardware. **When:** At the input/fixture review and again before A09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a09-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Local inference feasibility becomes an early on-prem enabling experiment; hosted tuning is separate from retrieval freshness.

- Can the exact model revision, runtime and quantization support the required chat/tool schema?
- How do Qwen candidates compare with Gemma under their respective terms?
- What context size, response limit, RAM, latency and privacy/cost constraints are acceptable?
- What local model/context/concurrency fits the actual measured machine, and what capability is lost under CPU-only operation?
- What downloads, cloud features and telemetry remain after local runtime startup?

Sources: AI13, AI14, AI15, AI16, MR01, MR11

### Inputs

- Hardware inventory
- A07 evidence retrieval
- Reviewed question fixtures

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Inventory CPU/RAM/GPU/free disk and supported runtimes.
3. Compare Qwen3.5-4B and Qwen3-4B-Instruct-2507; consider Gemma3-4B after its terms review.
4. Pin model/runtime/quantization; use bounded context and response length.
5. Measure memory, cold start, latency, Arabic clarity and cited factual accuracy.
6. Record dependency/license constraints and choose a champion only if it clears gates.
7. Compare retained local candidates on the same frozen domain questions and record exact model/quantization/runtime versions, RAM/VRAM, context, throughput and critical errors.
8. Test Ollama as a local serving candidate with cloud features disabled where configured; verify outbound behavior instead of equating localhost with fully offline.
9. Keep any hosted comparator opt-in with approved redacted inputs and rights/retention review. API does not mean cloud-only, and some hosted models support tuning; no fine-tuning is required to ingest new CVEs.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Omar review the handoff before declaring completion.

### Technical Approach

Needs Validation: Needs Validation: researched Qwen3.5-4B/Qwen3 Instruct/Gemma3 shortlist. Local serving and exact runtime remain experimental; hosted services need a separate budget/privacy gate.

### Expected Deliverables

- `experiments/ai/benchmark_llms.py`
- `datasets/assistant/pilot-questions.jsonl`
- `reports/ai/llm-benchmark.csv`
- `docs/adr/llm-serving-choice.md`
- `models/serving-manifest.json`

### Testing

1. Run the same 60 reviewed pilot questions across candidates and a template baseline
2. Record quantization/runtime/model revisions and peak resources
3. Include unsupported-answer and abstention cases, not just fluent answers
4. Disconnect public egress after provisioning and run the frozen local inference and embedding questions.

### Acceptance Criteria

- Same prompts/evidence used across candidates.
- No claim based solely on publisher benchmark.
- Deterministic fallback functions with model unavailable.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The qualified local profile states measured minimum resources and includes a no-generation degraded path; hardware availability is not assumed.

### Risks / Failure Modes

- Unknown hardware cannot sustain even a small model.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Evidence cards and templates; hosted comparator only after current pricing/privacy review and budget decision.

### Next Dependent Work

A10, P11, P17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR22, ADR23

## A10 — Integrate the Assistant With Typed Read-Only Tools and Citations

**Goal:** Connect Hams's retrieval/answer behavior to Omar's single P11 authorization gateway.

**Why This Matters:** Make the assistant useful without granting authority to text generation.

**Owner:** Omar

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A09, P11 (initial plan; no completion reported).

**Depends on:** A09, P11

**Unlocks:** A11, A12, A13, A14

**Parallel with:** D04, D13, D14, D15

**Critical path:** No

**First action:** Implement jointly with P11 as one gateway component: Hams owns prompt/retrieval behavior; Omar owns authorization and API integration.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Integrate the Assistant With Typed Read-Only Tools and Citations. **When:** At the input/fixture review and again before A10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a10-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Integrate the Assistant With Typed Read-Only Tools and Citations. **When:** At the input/fixture review and again before A10 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a10-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Bounded agentic workflow is an execution contract, not a mandatory framework change.

- Which allowed intents map to get_asset_summary, explain_applicability and advisory retrieval?
- Which output fields carry citations, uncertainty and evidence revisions?
- What tool-call and token/time limits prevent uncontrolled execution?

Sources: AI17, AI12, MR09

### Inputs

- API schemas
- A09 model adapter
- Role/scope rules

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Implement jointly with P11 as one gateway component: Hams owns prompt/retrieval behavior; Omar owns authorization and API integration.
3. Implement typed tools for asset/finding/source/applicability/remediation comparison.
4. Authorize every object access server-side before retrieval and tool execution.
5. Provide evidence revisions and freshness to the model.
6. Validate output schema, identifiers and cited source IDs.
7. Limit tool steps/time/tokens and log redacted trace metadata.
8. Return abstention/evidence fallback when required facts are absent.
9. Use a bounded typed workflow: authorize and resolve question scope; read current structured facts; retrieve allowed documents; draft; validate citations/claims; return answer or abstention.
10. Keep deterministic applicability, ranking and approval outside the LLM. Apply tool allowlists, step/time limits and audit evidence; do not permit model-generated shell or direct execution.
11. Start with explicit application state and the retained durable job boundary. Add LangGraph only if a measured resumable workflow need justifies its persistence, dependency and security cost.
12. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams, Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: One shared A10/P11 gateway: Hams owns behavior/retrieval, Omar owns API and authorization. Read-only tools; drafting is separate from approval or execution.

### Expected Deliverables

- `backend/app/ai_gateway/assistant.py`
- `contracts/v1/assistant-answer.schema.json`
- `fixtures/assistant/tool-dialogues.jsonl`
- `tests/integration/test_assistant_tools.py`
- `docs/ai/tool-catalog.md`

### Testing

1. Ask about an authorized asset and trace facts to tool results
2. Ask about an unauthorized asset and verify denial before retrieval
3. Make the model unavailable and return a cited structured fallback

### Acceptance Criteria

- Guest cannot retrieve analyst-only data through chat.
- No arbitrary SQL/shell/browser tool exists.
- Timeout returns a useful evidence response.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- The assistant exposes its cited evidence, uncertainty and context version and cannot mutate approval or runner state.

### Risks / Failure Modes

- Schema-valid text can still contain false claims.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Render verified structured facts and flag unsupported prose for review.

### Next Dependent Work

A11, A12, A13, A14

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR23

## A11 — Generate Targeted Evidence Requests & Compare Constrained Fix Options

**Goal:** Research and evaluate RAG-first vendor-backed remediation recommendations, evidence requests and constrained fix alternatives.

**Why This Matters:** Create a testable distinctive user workflow.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A10, D14, C10 (initial plan; no completion reported).

**Depends on:** A10, D14, C10

**Unlocks:** A12

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Map uncertain matches to exact missing inventory fields.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Provide D14 source-backed fixes/mitigations and validate every factual guidance claim. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-amr.md — Provide D14 source-backed fixes/mitigations and validate every factual guidance claim.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability, compatibility/policy limits, verification and security usefulness. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-mahrous.md — Validate applicability, compatibility/policy limits, verification and security usefulness.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-shams.md — Prepare representative lab/vendor inputs and check prerequisite/verification practicality without executing unapproved actions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a11-omar.md — Implement typed recommendation envelopes, citations, refusal states and approved-plan handoff using P11/P12.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Assistant value is cited decisions and targeted missing evidence; recurrence is not automatic blame.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which missing fields would change a specific unknown verdict?
- Which documented patch, upgrade or mitigation options satisfy the selected maintenance constraints?
- How will unsupported prerequisites and residual risk be stated?
- Does RAG improve supported actionability over deterministic cards?
- How reliably can source spans support each instruction, mitigation and verification claim?

Sources: AI05, AI17

### Inputs

- Applicability reasons
- Patch catalog
- Maintenance/compatibility policy

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Map uncertain matches to exact missing inventory fields.
3. Generate targeted safe evidence requests from approved templates.
4. Get compatible remediation candidates from deterministic policy code.
5. Explain fix/mitigation/defer/replace options with cited constraints.
6. Bind displayed plan to asset and advisory revision.
7. Expose why approval or reverification is required after drift.
8. Explain the D12 grouped action ranking and request precisely missing organization fields; the assistant never invents exposure, criticality, fixed versions or maintenance permission.
9. For recurrence, present repeated observation, reopening after verified closure and possible root-cause hypotheses separately. Only attach confirmed cause after reviewer evidence; suggest a durable control change as a draft.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams + Omar review the handoff before declaring completion.
11. Compare reviewed structured/template guidance with RAG plus constrained generation on the same D14/C09 cases. Retrieve only authorized evidence and eligible candidate IDs.
12. Return fixed version, supported upgrade path, prerequisites, vendor-backed instructions, mitigation alternatives, verification and references, each bound to evidence spans/revisions. Mark unavailable fields rather than completing them from model memory.
13. Versions, download links, commands and compatibility claims must match reviewed source/catalog entries; reject unsupported generated values and show abstention. A command absent from approved evidence/templates is not executable guidance.
14. Use real FortiOS advisory texts with clearly labelled organization scenarios; include wrong model, unsupported branch, indirect upgrade, stale advisory, missing commands and malicious document text. C10/P12 remains the only approval path; Ubuntu is the current controlled execution profile.

### Technical Approach

Existing Design Decision: Use deterministic assessment gaps and D14/C10 facts through bounded tools. The LLM phrases supported options; it does not invent a patch plan or decide applicability.

### Expected Deliverables

- `backend/app/ai_gateway/evidence_requests.py`
- `fixtures/assistant/missing-evidence.jsonl`
- `fixtures/assistant/remediation-comparisons.jsonl`
- `reports/ai/evidence-request-evaluation.md`
- `experiments/remediation/compare_guidance.py`
- `reports/remediation/grounding-and-usefulness.md`
- `datasets/remediation/claim-evidence-ledger.jsonl`

### Testing

1. Remove a required package/build field and verify the exact gap is requested
2. Compare no-patch, reboot-restricted and EOL cases with reviewed answers
3. Ensure invented fixed versions or approvals fail validation
4. Ask about a repeated finding without a recorded cause; verify the answer labels the cause unknown and cannot assert a people-related percentage.
5. Inject fictitious fixed versions, unsupported commands and contradictory upgrade paths; validators reject or abstain.
6. Two security reviewers grade factual support and practical usability separately; time matched analyst tasks.

### Acceptance Criteria

- No recommended version is invented.
- Missing-data advice identifies the next useful measurement.
- Patch execution remains outside LLM authority.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Recommendations preserve vendor constraints and identify missing prerequisites; a plausible narrative is not recorded as a confirmed cause.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Unsupported claims/total claims; exact fixed-version and path correctness; citation support rate; abstention coverage; unsafe instruction count; analyst task time and usefulness rubric

### Risks / Failure Modes

- LLM omits prerequisite/reboot or implies mitigation fixes vulnerability.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use typed option cards with required caveat fields.

### Next Dependent Work

A12

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR24

## A12 — Test Prompt Injection, Permissions and Unsupported Assistant Actions

**Goal:** Prove the assistant cannot cross the underlying data or action boundary in the declared test suite.

**Why This Matters:** Security guarantees must come from enforceable code, not prompt promises.

**Owner:** Mahrous

**Support:** Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A10, A11, P04 (initial plan; no completion reported).

**Depends on:** A10, A11, P04

**Unlocks:** A13, P15

**Parallel with:** D04, D16, C04, C06

**Critical path:** No

**First action:** Create malicious advisory-text and multilingual instruction fixtures.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Test Prompt Injection, Permissions and Unsupported Assistant Actions. **When:** At the input/fixture review and again before A12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a12-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Test Prompt Injection, Permissions and Unsupported Assistant Actions. **When:** At the input/fixture review and again before A12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a12-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Trust boundaries include retrieved policies and deployment-mode restrictions.

- Which malicious instructions can enter through advisory text or tool outputs?
- Can Arabic/English requests obtain another role's asset data?
- How are fake citations, arbitrary commands and stale approvals detected?

Sources: AI17

### Inputs

- A10 assistant
- A11 remediation flows

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create malicious advisory-text and multilingual instruction fixtures.
3. Test cross-role/object access and cache isolation.
4. Test invented CVEs/citations, stale metadata and unsupported commands.
5. Verify output escaping/link restrictions and secret redaction.
6. Log violations and patch the enforcing layer, then rerun the suite.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams, Omar review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Authorization and allowlisted tools are enforced by code; prompts and RAG are not security boundaries. No credentials enter the model context.

### Expected Deliverables

- `evaluation/assistant/adversarial-cases.jsonl`
- `tests/security/test_assistant_boundaries.py`
- `reports/ai/adversarial-results.md`
- `docs/ai/accepted-residual-risks.md`

### Testing

1. Inject instructions into a retrieved advisory and verify they remain data
2. Attempt cross-role asset reads and arbitrary execution
3. Use a schema-valid false citation and verify factual-support checks detect it
4. Inject instructions through vendor text, synthetic policy and tool output; verify ACLs, cited evidence and read-only authority remain enforced.
5. Simulate local model outage; verify the system uses disclosed deterministic output and never silently sends private evidence to a cloud fallback.

### Acceptance Criteria

- Zero unauthorized actions/data disclosures in defined test suite.
- Failure blocks privileged workflows.
- Report residual prompt-injection risk honestly.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Prompt defenses may fail despite good average results.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable agentic features and retain read-only evidence cards.

### Next Dependent Work

A13, P15

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A13 — Freeze Human Evaluation Questions, Rubrics and Final Holdout

**Goal:** Create an independent protocol for judging correctness, citations, clarity and useful abstention.

**Why This Matters:** Prove utility and correctness separately.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A04, A10, A12 (initial plan; no completion reported).

**Depends on:** A04, A10, A12

**Unlocks:** A15, A17

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Freeze question/evidence versions and scoring rubric.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Independently review security relevance and vendor-guidance factual correctness. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-amr.md — Independently review security relevance and vendor-guidance factual correctness.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Co-define policy/safety rubric and adjudicate disagreements with documented reasons. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-mahrous.md — Co-define policy/safety rubric and adjudicate disagreements with documented reasons.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-shams.md — Freeze reproducible scenario inputs and identify unavailable/labelled synthetic evidence.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Instrument comparable latency, runtime failures and user-task timings without logging sensitive content. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a13-omar.md — Instrument comparable latency, runtime failures and user-task timings without logging sensitive content.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Keep proposal targets while reporting actual supported-profile results and limitations.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which question categories cover the declared user tasks and failure cases?
- How will two reviewers judge support and resolve disagreement?
- How will actionability be measured separately from technical correctness?
- What constitutes useful ranking gain without worsening security constraints?
- How many independent representative scenarios can reviewers support, and what uncertainty must be disclosed?

Sources: AI02, AI03, AI17

### Inputs

- Locked classifier test
- 60 then 120–200 reviewed query target
- A12 cases

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Freeze question/evidence versions and scoring rubric.
3. Have two reviewers score support, correctness, uncertainty and actionable clarity.
4. Adjudicate disagreements and record agreement.
5. Report classification F1 and coverage, retrieval metrics, critical errors and user task time separately.
6. Test the proposal’s 90% actionable target without treating it as factual accuracy.
7. Publish failures and confidence intervals where suitable.
8. Freeze separate rubrics for factual support, actionability, uncertainty, ranking explanation and UX task completion; use reviewers independent of label authors where possible.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams + Omar review the handoff before declaring completion.
10. Freeze a ranking relevance/pairwise rubric with Amr and Mahrous; keep rubric authorship, independent scoring and adjudication visible.
11. Predeclare safety gates, success margins, latency/cost budget and paired analyst-time protocol before looking at holdout results. Version AI prompts/runtime/seeds or sampling settings; repeat runs to measure ranking drift and reviewer agreement.

### Technical Approach

Existing Design Decision: Human-reviewed source-grounded questions, with LLM judging only as optional assistance. Pilot sample sizes are planning targets, not evidence of statistical sufficiency.

### Expected Deliverables

- `evaluation/assistant/protocol.md`
- `evaluation/assistant/questions-frozen.jsonl`
- `evaluation/assistant/rubric.csv`
- `reports/ai/reviewer-agreement.md`
- `experiments/ai/score_human_results.py`
- `evaluation/prioritization/protocol.md`
- `evaluation/remediation/claim-rubric.md`

### Testing

1. Double-score a pilot subset and inspect disagreement
2. Keep final test questions locked after model decisions
3. Recalculate actionability, support and critical-error counts from raw reviewer scores
4. Check case-family/time separation and blind method labels during review where practical.

### Acceptance Criteria

- No LLM-only ground truth.
- Denominators and class/language slices shown.
- Sample-size and convenience-user limitations explicit.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Scores identify denominators, reviewer agreement and critical errors; no universal 90% claim is inferred from a small lab.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: nDCG@10 and precision@10 with graded reference rubric; pairwise agreement; top-k overlap across repeats; constraint violations; timed paired differences and uncertainty

### Risks / Failure Modes

- Friendly wording hides wrong remediation.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Require source-supported factual review before usability scoring.

### Next Dependent Work

A15, A17

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A14 — Invalidate AI Caches on Evidence Changes & Track Model Operations

**Goal:** Keep assistant answers tied to current authorized evidence and reproducible model settings.

**Why This Matters:** The assistant must stay correct when records and access permissions change.

**Owner:** Omar

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: A06, A10, D13 (initial plan; no completion reported).

**Depends on:** A06, A10, D13

**Unlocks:** A15

**Parallel with:** D04, D14, D15, D16

**Critical path:** No

**First action:** Reuse D13 events and P09 health endpoints; add AI-specific cache/model metadata, not another scheduler.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. **When:** At the input/fixture review and again before A14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a14-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Invalidate AI Caches on Evidence Changes & Track Model Operations. **When:** At the input/fixture review and again before A14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a14-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Local deployment extends existing operations boundaries instead of adding another AI control plane.

- Which evidence, prompt, model and user-scope fields belong in cache keys?
- Which D13 events invalidate impacted chunks or answers?
- What redacted telemetry can reveal stale answers, cost and latency?

Sources: AI07, AI08, AI17

### Inputs

- Revision events
- A10 tools
- Chosen model manifest

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Reuse D13 events and P09 health endpoints; add AI-specific cache/model metadata, not another scheduler.
3. Include user scope and source/asset versions in cache keys.
4. Invalidate affected chunks/answers on revision/rejection.
5. Track ingestion-to-retrieval lag and stale-source warnings.
6. Log model/prompt/retriever revisions, latency and abstentions.
7. Require reviewed labels before feedback enters retraining.
8. Exercise model unavailable and index rebuild recovery.
9. Version cache keys with organization/object permissions, source/policy revisions, model, prompt and embedding versions. Disable outbound cloud fallbacks and traces under the local-only capability profile.
10. Reuse D13 invalidation and P09 health; do not build a second scheduler. Record offline feed age and rejected update reasons.
11. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Reuse D13 change events and P09 health, adding AI-specific cache/model metadata. No duplicate scheduler and no automatic self-training from votes.

### Expected Deliverables

- `backend/app/ai_gateway/cache_policy.py`
- `backend/app/ai_gateway/telemetry.py`
- `tests/ai/test_cache_invalidation.py`
- `docs/runbooks/ai-operations.md`
- `reports/ai/staleness-rehearsal.md`

### Testing

1. Change an advisory revision and prevent reuse of its old answer
2. Ask the same question under two scopes and prevent cache leakage
3. Restart model serving and preserve the deterministic application path

### Acceptance Criteria

- Obsolete evidence is not served as current.
- Role change cannot reuse privileged cached answer.
- Freshness goal measured independently of generation.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Re-embedding migration mixes incompatible vector spaces.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Version indexes and switch only after validation; lexical fallback.

### Next Dependent Work

A15

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## A15 — Run Contribution Ablations & Compare Competitor Capabilities Fairly

**Goal:** Consolidate A17 ranking evidence and remediation experiments into a fair, reproducible contribution assessment.

**Why This Matters:** Support a defensible graduation research claim.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G3

**Start condition:** Blocked by: A13, A14, A17 (initial plan; no completion reported).

**Depends on:** A13, A14, A17

**Unlocks:** A16

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Compare lexical/dense/hybrid and optional reranking fairly.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source fidelity and security interpretation of gains. Reproduce datasets and origin-stratified results. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-amr.md — Review source fidelity and security interpretation of gains.; reviews/a15-amr.md — Reproduce datasets and origin-stratified results.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Challenge policy violations and unsupported novelty/security claims. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-mahrous.md — Challenge policy violations and unsupported novelty/security claims.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Verify integrated latency and fallback reflect benchmark conditions. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a15-omar.md — Verify integrated latency and fallback reflect benchmark conditions.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Novelty becomes a testable decision-workflow hypothesis, not a generic chatbot claim.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Do change-aware explanations reduce time-to-correct-decision versus the frozen baseline?
- Do targeted gap requests outperform generic missing-data messages?
- Which competitor claims are documented versus untested or inaccessible?
- Which measured gain survives context removal, failure cases and resource limits?

Sources: AI12, AI18

### Inputs

- A13 dataset
- Current official competitor matrix

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Compare lexical/dense/hybrid and optional reranking fairly.
3. Compare revision-aware vs static retrieval on changed advisories.
4. Compare targeted vs generic evidence requests on task resolution time.
5. Compare constrained option cards with unconstrained baseline offline only.
6. Document Tenable current agent/approval features and avoid unsupported absence claims.
7. Write contribution, limitations and reproducibility section.
8. Compare CVSS-only ordering, explained policy ordering and grouped-action ordering on the same reviewed scenarios. Report precision@10 or nDCG@10 only with a justified relevance rubric, alongside unsafe recommendations, duplicate workload and analyst task time.
9. Run ablations without organization context, targeted missing evidence and recurrence history. Do not claim superiority to Tenable from an unlicensed/incomparable product trial.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Omar review the handoff before declaring completion.
11. Reuse A17 results rather than building a second AI ranker. Combine A11 grounding results and A13 protocol; compare policy-only, AI and hybrid under identical scenarios.

### Technical Approach

Existing Design Decision: Evaluate narrow hypotheses: revision-aware decisions, targeted evidence requests and constrained remediation. Tenable already documents agents/approvals/workflows; no blanket superiority claim.

### Expected Deliverables

- `experiments/ai/contribution_ablations.py`
- `reports/ai/ablation-results.csv`
- `research/competitor-capability-matrix.md`
- `reports/ai/contribution-analysis.md`
- `reports/ai/cross-functional-contribution-decision.md`

### Testing

1. Run controlled variants on the same inventory and knowledge snapshot
2. Report correctness, effort/time and resource tradeoffs
3. Review each competitor claim against its dated source or mark it unverified
4. Reproduce A17/A11 reported methods from frozen manifests.

### Acceptance Criteria

- Same inputs and evaluation conditions across arms.
- Novelty described as hypothesis until tested.
- No commercial superiority claim without equivalent authorized evaluation.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Top-ten results use the same units, corpus, policy and judgments across baselines; unmeasured gains are labelled hypotheses.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: A17 ranking measures plus A11 hallucination/grounding and paired task-time results

### Risks / Failure Modes

- Adding more features is mistaken for scientific novelty.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Focus one measurable evidence-to-decision hypothesis.

### Next Dependent Work

A16

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20, ADR24

## A16 — Package Reproducible AI Experiments and a Faculty Demo

**Goal:** Make the final AI results reproducible from pinned data, code and model artifacts.

**Why This Matters:** A project with a reproducible method survives beyond the presentation.

**Owner:** Hams

**Support:** Amr, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: A15 (initial plan; no completion reported).

**Depends on:** A15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Bundle pinned environment, manifests and non-sensitive fixtures.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Explain the provenance and data lineage of the preserved asset/research inputs during the faculty demo or labelled replay, as already named in the A16 fallback. Coordinate with Hams; Amr retains source-authority and rights review. **When:** At final reproduction/demo rehearsal after A15 results and the A16 handover artifacts are available. **Deliver:** `reviews/a16-shams.md — Data-lineage walkthrough and observed/synthetic/missing-evidence review`. **Review:** Hams records the review disposition. Trace one demo example to its source/observation revision, identify synthetic or missing data, and distinguish a labelled replay from a live result.

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Package Reproducible AI Experiments and a Faculty Demo. **When:** At the input/fixture review and again before A16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a16-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Package Reproducible AI Experiments and a Faculty Demo. **When:** At the input/fixture review and again before A16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/a16-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which licenses and hashes must accompany the selected model and dataset?
- Can a teammate reproduce the metrics without private credentials?
- Which limitations and failed experiments must appear in the final report?

Sources: AI03, AI17

### Inputs

- A15 results
- A14 runbook
- Model/data manifests

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Bundle pinned environment, manifests and non-sensitive fixtures.
3. Document retraining/reindexing steps and license notices.
4. Record known failure cases and supported languages/tasks.
5. Prepare live and clearly labelled offline replay demos.
6. Hand off maintenance owner, regression checks and update checklist.
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Omar + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: Versioned experiment manifests, source attribution, deterministic seeds where applicable and honest limits. No unvalidated candidate is presented as the final chosen model.

### Expected Deliverables

- `docs/runbooks/ai-reproduce.md`
- `reports/ai/final-model-card.md`
- `experiments/ai/reproduce_results.py`
- `reports/ai/artifact-manifest.json`
- `docs/ai/faculty-demo.md`

### Testing

1. Run the reproduction instructions from a clean environment
2. Compare regenerated metrics with the frozen report
3. Demonstrate model-unavailable and missing-evidence behavior alongside a successful answer

### Acceptance Criteria

- Fresh setup reproduces baseline metrics within documented tolerance.
- Offline replay never presented as live intelligence.
- Another teammate can explain and run the pipeline.
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Only one member understands model internals.
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Omar runs integration rehearsal and Shams explains data lineage.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR15, ADR16, ADR17, ADR18, ADR20

## P01 — Validate Team Skills and Hardware & Prove the Backend Candidate

**Goal:** Choose the framework through a small working endpoint and migration rather than assumed familiarity.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** P02

**Parallel with:** D01, D02, C01, C02

**Critical path:** Yes

**First action:** List Omar’s proven frameworks and identify gaps

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Team Skills and Hardware & Prove the Backend Candidate. **When:** At the input/fixture review and again before P01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Deployment location and inference provider are independent; actual capacity/cost remains a validation gate.
- Hosting feasibility and operational ownership are explicit early P01 outputs; provider, capacity and cost are still Needs Validation.

- Which backend/frontend frameworks can Omar actually build and maintain today?
- What CPU/RAM/disk/virtualization and weekly capacity are available?
- Can the leading framework produce a validated endpoint and migration within the time-boxed spike?
- Which team-owned machine supports the local core and AI profile, and which services must be separated or reduced?
- Can a team-owned host start the proposed local inference/embedding runtime without assuming a GPU, before the full A09 evaluation?
- Which measured team host, single cloud VM or managed platform can run the required API, durable worker, storage and model profile within the actual budget?
- Who administers the demo host, domain/private DNS, certificates, backups and monthly spending limit?

Sources: SRC-P01, SRC-P02, SRC-P03

### Inputs

- Existing proposal
- Actual laptop specifications

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. List Omar’s proven frameworks and identify gaps
3. Record RAM, CPU, disk, virtualization and available hours
4. Build one validated endpoint and database migration in the leading framework
5. Compare effort with the strongest team-known alternative and record an ADR
6. Measure available CPU, RAM, disk, GPU/VRAM and runner network reachability; compare local/customer-hosted and cloud-hosted costs using actual capacity and budget evidence.
7. Choose first deployment hardware only after measurement; on-prem may be a team-owned lab host and does not imply buying enterprise infrastructure now.
8. With Hams, run an early local-runtime startup/memory smoke check before committing deployment resources; A09 later owns the fair domain-quality comparison after retrieval fixtures are ready.
9. Write a hosting comparison and placement/cost sheet for the measured lab host, one realistic VM and a managed platform candidate. Record persistent storage, worker/queue support, local-model needs, runner reachability, egress, rights and operator effort; select no paid service or new infrastructure without the relevant project authorization.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: FastAPI conditional default with Django/NestJS alternatives already researched. Needs Validation against skills and authentication integration; preserve contracts if the framework changes.

### Expected Deliverables

- `research/platform-skills-and-hardware.md`
- `experiments/platform/backend_spike.py`
- `docs/adr/backend-framework.md`
- `reports/platform/spike-results.md`
- `research/hosting-options-and-capacity.md`
- `deploy/hosting-ownership-and-costs.csv`

### Testing

1. Have a teammate run the endpoint and migration
2. Measure actual setup time and peak resources
3. Compare the leading candidate with the strongest team-known fallback

### Acceptance Criteria

- Endpoint reproducible by another teammate
- Framework chosen on measured fit
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Framework learning consumes integration time
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep contracts and switch to proven framework

### Next Dependent Work

P02

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P02 — Publish Shared API Contracts and Validate Producer/Consumer Fixtures

**Goal:** Give collectors, intelligence, matching and AI one agreed data boundary before deep integration.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Shams, Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Blocked by: P01, C03, D02 (initial plan; no completion reported).

**Depends on:** P01, C03, D02

**Unlocks:** P03, P05, UX02

**Parallel with:** C02, A01, A02, UX01

**Critical path:** Yes

**First action:** Agree stable asset identity and source revision identifiers

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply AdvisoryRevision and source-revision fixtures from D01/D02; review source authority, vendor semantics, rights, missing and conflicting assertions. Retain separate runner/patch-execution contract review for C11/C12/C14. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply AssetObservation/inventory fixtures from the authorized collector; validate stable identity, OS/package fields, collected_at, stale/failed collection and missing evidence. Coordinate C03 definitions with Mahrous. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Publish Shared API Contracts and Validate Producer/Consumer Fixtures. **When:** At the input/fixture review and again before P02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p02-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- One shared scope/context/handoff baseline prevents divergent AI and applicability work.

- Do C03 and D02 samples agree on IDs, timestamps, revisions and unknown states?
- Which error codes distinguish denied, stale, unsupported and unknown outcome?
- Which changes require a new contract version?
- Which OrganizationContext fields are verified facts, policy inputs or synthetic fixture assumptions?
- Which DeploymentCapabilities fields describe model location, data location, runner reachability and update mode independently?

Sources: SRC-P01

### Inputs

- Amr: D01/D02 advisory and source-revision samples
- Shams: asset/inventory observation samples and C03 asset field definitions; Mahrous reviews downstream matching requirements
- Amr retains runner/patch-execution fixture review; Hams reviews AI/UX, Mahrous assessment/policy, Omar owns P02

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Agree stable asset identity and source revision identifiers
3. Specify AssetObservation, AdvisoryRevision, Assessment, Job and PatchPlan schemas
4. Define unknown, unsupported, stale and rejected outcomes
5. Publish valid/invalid fixtures and API errors
6. Have each owner produce and consume one fixture
7. Publish the scope-versioned OrganizationContext, RankedRemediationAction, Assessment and AssistantAnswer contracts with fixture IDs and capability flags. Organization context includes owner, criticality, exposure, maintenance, policy revision and history references.
8. Freeze one handoff manifest used by Mahrous and Hams before any ClickUp ticket import; record changed fields and migrations rather than promising permanent zero migrations.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams + Mahrous + Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: OpenAPI/JSON Schema with versioned fixtures. C03/D02 provide domain definitions; P02 integrates them rather than inventing competing schemas.

### Expected Deliverables

- `contracts/v1/openapi.yaml`
- `contracts/v1/job.schema.json`
- `contracts/v1/errors.schema.json`
- `fixtures/contracts/producer-consumer.jsonl`
- `tests/contracts/test_boundaries.py`
- `contracts/handoff-manifest.json`
- `contracts/organization-context.schema.json`
- `contracts/ranked-remediation-action.schema.json`
- `contracts/deployment-capabilities.schema.json`

### Testing

1. Validate each team's sample against the same contract
2. Reject an incompatible enum or missing revision
3. Have producers and consumers exchange fixtures without private assumptions
4. Run identical fixtures through API, rules, retrieval and prototype boundaries; reject incompatible scope/schema versions.

### Acceptance Criteria

- Every owner accepts one fixture
- Breaking changes have version policy
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- AI and platform reference the same scope version, schema version and fixture manifest; unresolved profile fields have named owners.

### Risks / Failure Modes

- Teams silently use different meanings for version/status
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze minimal fields and evolve compatibly

### Next Dependent Work

P03, P05, UX02

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P03 — Implement the Relational Schema, Migrations and Revision Links

**Goal:** Persist assets, advisories and workflow state with recoverable migrations and enforced relationships.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P02 (initial plan; no completion reported).

**Depends on:** P02

**Unlocks:** D03, D05, D11, P04, P06, P07, P09

**Parallel with:** C02, C04, C05, C06

**Critical path:** Yes

**First action:** Draw relations among assets, observations, advisories, assessments and revisions

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Implement the Relational Schema, Migrations and Revision Links. **When:** At the input/fixture review and again before P03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement the Relational Schema, Migrations and Revision Links. **When:** At the input/fixture review and again before P03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p03-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which entities need relational keys versus flexible JSONB?
- What uniqueness rules prevent duplicate source revisions and logical jobs?
- Which indexes support actual queries without premature vector or JSON indexing?

Sources: SRC-P07, SRC-P11, SRC-P25, SRC-P26

### Inputs

- Contracts and example evidence

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Draw relations among assets, observations, advisories, assessments and revisions
3. Add unique keys and immutable source-revision references
4. Add job attempts, approval hashes, audit and outbox tables
5. Create reviewed migrations and repeatable seed
6. Verify duplicate ingest and restore referential integrity
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: PostgreSQL relational core plus JSONB; SQLAlchemy/Alembic if FastAPI wins. ORM choice follows P01; retrieval is a separate derived concern.

### Expected Deliverables

- `backend/app/db/models.py`
- `migrations/versions/initial_schema.py`
- `docs/schema-erd.md`
- `tests/db/test_integrity.py`
- `scripts/db/seed_demo.py`

### Testing

1. Migrate an empty database and load the agreed fixtures
2. Reimport a revision and verify idempotent identity
3. Reject broken references and verify rollback leaves consistent data

### Acceptance Criteria

- No duplicate logical source revision
- Assessment traces exact input revisions
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- JSON blobs obscure identity and transitions
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Normalize critical fields and keep raw payload as evidence

### Next Dependent Work

D03, D05, D11, P04, P06, P07, P09

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P04 — Implement Login, Revocation and Object-Level Role Permissions

**Goal:** Enforce the four-role model on every API object and mutation.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03 (initial plan; no completion reported).

**Depends on:** P03

**Unlocks:** C10, A12, P06, P08, P11, P14

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Select maintained session/auth component or OIDC provider

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Login, Revocation and Object-Level Role Permissions. **When:** At the input/fixture review and again before P04 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p04-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which maintained auth/session component fits the chosen framework?
- How do session expiry, rotation, CSRF and logout work in the same-origin UI?
- Which separate permission grants patch approval or runner access?

Sources: SRC-P21, SRC-P22, SRC-P24

### Inputs

- Four-role permission matrix

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Select maintained session/auth component or OIDC provider
3. Implement secure cookie session lifecycle and CSRF protections
4. Apply object scopes to every read, export and mutation
5. Separate patch approval/execution permissions from role labels
6. Run positive and negative role matrix tests
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous review the handoff before declaring completion.

### Technical Approach

Needs Validation: Revocable cookie sessions with server-side scope checks, plus separate scoped runner credentials. Exact component Needs Validation; Keycloak/OIDC remains the researched fallback.

### Expected Deliverables

- `backend/app/identity/auth.py`
- `backend/app/identity/permissions.py`
- `config/role-action-matrix.yaml`
- `tests/security/test_authorization.py`
- `docs/authentication-design.md`

### Testing

1. Deny direct API access to an unauthorized asset despite UI visibility
2. Revoke a session and verify future requests fail
3. Test CSRF, privilege escalation and Auditor/Guest patch denial

### Acceptance Criteria

- Guest cannot retrieve private evidence
- Revoked sessions fail
- Analyst cannot self-promote
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- UI hides buttons but API still permits action
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable external pilot until server checks pass; use OIDC if auth gate fails

### Next Dependent Work

C10, A12, P06, P08, P11, P14

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P05 — Build the Dashboard Shell With Real API States and Accessible Navigation

**Goal:** Create a minimal usable asset workflow that handles loading, errors, stale and unknown evidence.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P02, UX02 (initial plan; no completion reported).

**Depends on:** P02, UX02

**Unlocks:** P06, P09, UX03

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Build asset list, detail and job status routes

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. **When:** At the input/fixture review and again before P05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p05-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Lead the UX design review against UX02; explain interactions and verify implemented uncertainty, evidence and approval states. Focus: Build the Dashboard Shell With Real API States and Accessible Navigation. **When:** At the input/fixture review and again before P05 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p05-hams.md — Design-fidelity review and prioritized usability corrections`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Hams leads UI/UX; Omar remains frontend implementation owner.

- Which screens are required for the first real slice?
- How should empty, unsupported and stale data differ visually?
- Can the selected frontend support keyboard navigation and required language layout?

Sources: SRC-P04, SRC-P05, SRC-P06

### Inputs

- OpenAPI fixtures and analyst flows
- UX02 reviewed design handoff (the fixture shell can be explored earlier)

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Build asset list, detail and job status routes
3. Implement loading, empty, failure, stale and unknown states
4. Use keyboard focus and responsive RTL layouts
5. Bind mock client to versioned contract
6. Replace one fixture path with real API
7. Implement UX02 reviewed flows and state specifications under Omar ownership; Hams reviews design fidelity and usability. Build the P02 shell/fixture harness while UX02 is being prepared, but do not sign off product flows before the design handoff.
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Hams review the handoff before declaring completion.

### Technical Approach

Needs Validation: React/TypeScript/Vite candidate for the product dashboard, subject to P01. This planning website stays buildless; do not confuse its UI implementation with the product stack.

### Expected Deliverables

- `frontend/src/routes/assets.tsx`
- `frontend/src/components/EvidenceState.tsx`
- `frontend/src/api/client.ts`
- `frontend/src/fixtures/assets.json`
- `reports/ui-shell-review.md`

### Testing

1. Navigate the flow with keyboard only
2. Exercise loading, error, empty, stale and unknown fixtures
3. Replace the fixture endpoint with the agreed real endpoint without changing the data contract

### Acceptance Criteria

- Unknown not displayed as safe
- Keyboard navigable
- Real API swap uses same contract
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Polished disconnected screens consume time
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep only list/detail/job slice

### Next Dependent Work

P06, P09, UX03

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P06 — Connect One Real Asset From Ingestion to a Traceable Finding Screen

**Goal:** Prove one complete real evidence path before expanding screens or coverage.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Shams, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03, P05, C08, P04 (initial plan; no completion reported).

**Depends on:** P03, P05, C08, P04

**Unlocks:** P10

**Parallel with:** D03, D04, D11, D15

**Critical path:** Yes

**First action:** Receive collector output through validation endpoint

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. **When:** At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p06-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Connect One Real Asset From Ingestion to a Traceable Finding Screen. **When:** At the input/fixture review and again before P06 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p06-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which authorized observation and advisory are suitable for the first slice?
- How is the same assessment ID traced across API, DB and UI?
- Where must fixture and live results be labelled differently?

Sources: SRC-P01, SRC-P07

### Inputs

- One authorized real observation
- One validated advisory

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Receive collector output through validation endpoint
3. Persist observation and exact advisory revision
4. Invoke assessment interface with stable IDs
5. Render conclusion, uncertainty and evidence links
6. Record reproducible demo and clearly label any fixture
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Shams + Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Shared contracts and D09/C08 engine through the existing API. A mock-only interface is preparation, not proof of the real integration gate.

### Expected Deliverables

- `tests/integration/test_vertical_slice.py`
- `reports/first-slice/trace.json`
- `docs/runbooks/first-slice.md`
- `reports/first-slice/demo-notes.md`

### Testing

1. Ingest a real observation and display its matching decision
2. Open its exact raw-source and observation references
3. Repeat with missing evidence and show unknown without pretending it is live success

### Acceptance Criteria

- Displayed result traces exact evidence
- No mock represented as live
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Matching interface arrives late
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Use explicit temporary deterministic fixture assessment and show limitation

### Next Dependent Work

P10

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P07 — Build the Durable Job Ledger & Test Dispatch Recovery

**Goal:** Keep business job state safe across worker crashes, duplicate requests and lost callbacks.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03 (initial plan; no completion reported).

**Depends on:** P03

**Unlocks:** D13, P08, P09, P13, P14

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Create job/attempt state machine with lease and heartbeat

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Build the Durable Job Ledger & Test Dispatch Recovery. **When:** At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p07-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P07 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p07-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Can Celery/RabbitMQ fit the actual laptop and learning budget?
- Which idempotency, lease, heartbeat and attempt fields are required?
- When must uncertain mutation stop for reconciliation instead of retry?

Sources: SRC-P12, SRC-P13, SRC-P14, SRC-P15, SRC-P16, SRC-P17, SRC-P18, SRC-P20

### Inputs

- Scan and source job contracts

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create job/attempt state machine with lease and heartbeat
3. Add transactional outbox and dispatch only job IDs
4. Benchmark Celery/RabbitMQ against simpler durable serial worker
5. Implement deduplication, timeout and reconciliation states
6. Inject worker/broker crash and lost callback
7. Select transport only after resource and recovery gate
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Shams review the handoff before declaring completion.

### Technical Approach

Needs Validation: PostgreSQL ledger/outbox with conditional Celery/RabbitMQ broker spike. A bounded serial durable worker is the fallback; in-process request background tasks are not the reliability mechanism.

### Expected Deliverables

- `backend/app/jobs/ledger.py`
- `backend/app/jobs/outbox.py`
- `experiments/platform/job_recovery.py`
- `tests/jobs/test_crash_recovery.py`
- `docs/adr/job-transport.md`

### Testing

1. Kill a worker after claim and recover the logical job
2. Submit duplicate requests and preserve one job identity
3. Lose a mutation callback and verify reconcile rather than blind retry

### Acceptance Criteria

- No lost business job after restart
- Duplicate requests do not repeat mutation
- Unknown side effect reconciled
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Retry executes patch twice or broker exhausts laptop
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Durable PostgreSQL ledger plus bounded serial worker; no in-process request background task

### Next Dependent Work

D13, P08, P09, P13, P14

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P08 — Authenticate Runners and Enforce Typed, Scoped Execution Envelopes

**Goal:** Separate privileged collection/update authority from browser, API and model processes.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P04, P07, C01 (initial plan; no completion reported).

**Depends on:** P04, P07, C01

**Unlocks:** C11, P12, P15

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Register runner identity and scoped credential

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Authenticate Runners and Enforce Typed, Scoped Execution Envelopes. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P08 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p08-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- How is runner enrollment authenticated and revoked?
- Which target, operation, expiry and plan fields are revalidated on both sides?
- Where do target secrets remain and how are references/redacted results handled?

Sources: SRC-P22, SRC-P23, SRC-P28

### Inputs

- Approved lab scope
- Typed collector/patch operations

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Register runner identity and scoped credential
3. Use authenticated job channel with typed allowlisted operations
4. Recheck target scope, asset fingerprint, approval hash and expiry
5. Validate bounded results and secret references
6. Reject arbitrary shell strings and out-of-scope targets
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Authenticated typed job channel, allowlisted adapters and secret references. No Docker socket or arbitrary shell authority in the web API; exact enrollment transport is validated before use.

### Expected Deliverables

- `backend/app/jobs/runner_gateway.py`
- `runner/envelope_validator.py`
- `contracts/v1/runner-job.schema.json`
- `tests/security/test_runner_boundary.py`
- `docs/runner-trust-boundary.md`

### Testing

1. Reject expired runner identity and unknown adapter operations
2. Reject a target outside scope on API and runner sides
3. Verify arbitrary user/model command strings cannot reach shell execution

### Acceptance Criteria

- API cannot invoke arbitrary shell
- Expired runner credentials fail
- Scope enforced on API and runner
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Compromised API becomes privileged remote shell
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable mutation; retain read-only collector gateway

### Next Dependent Work

C11, P12, P15

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P09 — Expose Source Health, Freshness and Changed-Knowledge Views

**Goal:** Make stale or incomplete intelligence visible to operators and downstream UI.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: P03, P05, P07, D03 (initial plan; no completion reported).

**Depends on:** P03, P05, P07, D03

**Unlocks:** P10

**Parallel with:** D04, D05, D08, D09

**Critical path:** Yes

**First action:** Expose last successful fetch and source publication/revision times

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Expose Source Health, Freshness and Changed-Knowledge Views. **When:** At the input/fixture review and again before P09 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p09-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which source-health fields distinguish last attempt from last success?
- How are enrichment missingness and source outages displayed?
- Which endpoints need pagination and which roles may see operational detail?

Sources: SRC-P07, SRC-P34, SRC-P35

### Inputs

- Ingestion freshness/revision metadata

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Expose last successful fetch and source publication/revision times
3. Show missing fields, rejected records and source failures
4. Link changed advisory to affected assessment jobs
5. Add pagination and filters
6. Exercise source outage without advancing freshness marker
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: P03/P07 state plus D03 ingestion metadata; no second ingestion scheduler. D13 and A14 consume the same current source revision facts.

### Expected Deliverables

- `backend/app/intelligence/health_api.py`
- `frontend/src/routes/source-health.tsx`
- `tests/integration/test_source_health.py`
- `docs/source-health-fields.md`

### Testing

1. Fail a fetch and verify last_success does not advance
2. Display missing enrichment without hiding the CVE
3. Test role-scoped and paginated source-health responses

### Acceptance Criteria

- Failed fetch cannot appear fresh
- Source revisions inspectable
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Dashboard looks healthy while feeds stalled
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Show stale badge and cached-data timestamp

### Next Dependent Work

P10

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P10 — Build Finding Triage With Priority Reasons and Evidence History

**Goal:** Let an analyst review what changed, why it matters and what evidence supports it.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Hams, Mahrous, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P06, P09, D12 (initial plan; no completion reported).

**Depends on:** P06, P09, D12

**Unlocks:** P11, P12, P13, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** Yes

**First action:** Render finding evidence and policy inputs

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Provide reproducible input/failure fixtures for integration. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p10-shams.md — Provide reproducible input/failure fixtures for integration.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- The platform displays decisions and safe next actions; it does not recompute ranking in the frontend.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- Which assessment and priority fields are authoritative versus predicted?
- How are current/old observations and source revisions compared?
- Which finding transitions and exports require permission checks?
- How are unqualified candidate output, baseline fallback and vendor-grounded instruction provenance represented to users?

Sources: SRC-P22, SRC-P07

### Inputs

- Assessment and risk reason schema

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Render finding evidence and policy inputs
3. Validate workflow status transitions server-side
4. Show assessment revision comparison
5. Implement scoped exports
6. Expose unsupported and unknown counts separately
7. Render D12 RankedRemediationAction objects as the primary queue with expandable findings, evidence age, category, reason codes, missing context and blocked/no-patch state. Preserve filters for CVE and individual asset findings.
8. Show recurrence episodes and confirmed-versus-hypothesized causes with source links; keep optional L&D or game mechanics outside this release.
9. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous + Shams review the handoff before declaring completion.
10. Coordinate the A17 ranking-result and A11 guidance contracts before implementation. Include method/policy/model version, candidate set, evidence timestamps, reason/evidence links, missing context, validation status and fallback reason.
11. Display rule baseline versus qualified AI/hybrid proposal explicitly; baseline remains available on timeout, invalid output or unqualified model. Analyst reviews recommendations and makes operational decisions rather than manually recreating the research. No model override of applicability/RBAC/approval.

### Technical Approach

Existing Design Decision: Consume D09/D12 outputs and history through server-side authorization. The UI does not recalculate version applicability or turn unknown into a clean result.

### Expected Deliverables

- `backend/app/assessment/findings_api.py`
- `frontend/src/routes/findings.tsx`
- `frontend/src/components/EvidenceTimeline.tsx`
- `tests/integration/test_triage.py`
- `reports/triage-review.md`
- `contracts/p10-ai-handoff.md`

### Testing

1. Display affected, not_affected, unknown and unsupported separately
2. Change a policy/source revision and show the reason for the new priority
3. Deny scoped exports for unauthorized users
4. Contract tests reject invented candidate IDs, unsupported versions/commands, cross-tenant facts and stale approvals; test no-model operation.

### Acceptance Criteria

- Priority change explained
- Export scopes equal UI/API scopes
- Unknown distinct from not affected
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### Risks / Failure Modes

- Severity presented as proven exploitation probability
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep raw score, risk policy and confidence separate

### Next Dependent Work

P11, P12, P13, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR24

## P11 — Expose One Permission-Scoped AI Gateway With Safe Fallbacks

**Goal:** Provide the authenticated API/UI boundary used by the shared A10 assistant.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Hams, Mahrous, Shams

**Conditional capability gates:** An external inference/embedding provider may be enabled only after D18 clears the declared data use and deployment policy.; Local-only mode must reject external inference, embeddings and trace destinations.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P04, P10, A07, A09 (initial plan; no completion reported).

**Depends on:** P04, P10, A07, A09

**Unlocks:** A10, P15, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** No

**First action:** Expose allowlisted read tools using caller scopes

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Hams**: Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-hams.md — Supply A17/A11 schemas, qualified method report and uncertainty/evaluation requirements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Validate applicability/policy and approval boundaries in the displayed flow. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-mahrous.md — Validate applicability/policy and approval boundaries in the displayed flow.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Provide reproducible input/failure fixtures for integration. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/p11-shams.md — Provide reproducible input/failure fixtures for integration.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- Internal APIs remain part of on-prem; external inference is optional and explicitly governed.
- 29 October: explicit cross-functional AI prioritization/remediation handoff; existing domain ownership retained.

- How is current user scope applied before retrieval and every tool call?
- What timeout, usage and model-adapter limits are enforced?
- What answer contract carries source spans, revisions and uncertainty?
- How are unqualified candidate output, baseline fallback and vendor-grounded instruction provenance represented to users?

Sources: SRC-P22, SRC-P28, MR01, MR09

### Inputs

- Answer and retrieval/tool schemas

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Expose allowlisted read tools using caller scopes
3. Validate model outputs and preserve citations/revision IDs
4. Add timeout, token/cost and data-minimization policies
5. Render missing evidence and refusal cases
6. Test prompt injection and unauthorized asset retrieval
7. Provide structured-template fallback
8. Add an inference/embedding adapter boundary with configurable internal base URLs, explicit capability flags and timeout/error contracts. Local-only mode must reject external providers even if a request suggests them.
9. Route current organization facts through authorized structured tools and source/policy text through retrieval. Do not duplicate the A10 gateway or invent a second approval path.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Hams + Mahrous + Shams review the handoff before declaring completion.
11. Coordinate the A17 ranking-result and A11 guidance contracts before implementation. Include method/policy/model version, candidate set, evidence timestamps, reason/evidence links, missing context, validation status and fallback reason.
12. Display rule baseline versus qualified AI/hybrid proposal explicitly; baseline remains available on timeout, invalid output or unqualified model. Analyst reviews recommendations and makes operational decisions rather than manually recreating the research. No model override of applicability/RBAC/approval.

### Technical Approach

Existing Design Decision: Single gateway shared with A10; Omar owns API/auth integration and Hams owns retrieval/answer behavior. Exact LLM choice follows A09 rather than being embedded in UI code.

### Expected Deliverables

- `backend/app/ai_gateway/api.py`
- `frontend/src/routes/assistant.tsx`
- `tests/integration/test_ai_gateway.py`
- `docs/ai-gateway-contract.md`
- `contracts/p11-ai-handoff.md`

### Testing

1. Deny unauthorized evidence before it reaches the model
2. Timeout the model and return a grounded structured alternative
3. Verify citations point to authorized source revisions
4. Contract tests reject invented candidate IDs, unsupported versions/commands, cross-tenant facts and stale approvals; test no-model operation.

### Acceptance Criteria

- No unauthorized context retrieval
- Answers show provenance or uncertainty
- Model outage does not stop basic workflow
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Record input revisions, methods, denominators and negative results; no superiority claim before comparative evidence.
- Evaluation metric: Contract rejection rate; fallback correctness; end-to-end task time and source-link completeness

### Risks / Failure Modes

- Assistant bypasses API scopes or sends secrets upstream
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disable risky tool and use grounded structured template

### Next Dependent Work

A10, P15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22, ADR23

## P12 — Implement Patch Campaign States, Approval Binding and Progress Views

**Goal:** Represent the C10 policy and runner results as one auditable campaign workflow.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P08, P10, C10 (initial plan; no completion reported).

**Depends on:** P08, P10, C10

**Unlocks:** C11, P15, P16

**Parallel with:** D04, D13, D15, D16

**Critical path:** Yes

**First action:** Persist versioned plan and precheck results

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Implement Patch Campaign States, Approval Binding and Progress Views. **When:** At the input/fixture review and again before P12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p12-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Implement Patch Campaign States, Approval Binding and Progress Views. **When:** At the input/fixture review and again before P12 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p12-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which transitions are allowed before/after approval and mutation?
- How do hash changes, expiry, reboot pending and partial failure affect the UI?
- What pause/cancel actions are safe after execution has begun?

Sources: SRC-P14, SRC-P15, SRC-P22, SRC-P23

### Inputs

- Patch plan policy
- Runner adapter contract

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Persist versioned plan and precheck results
3. Bind approvals to plan hash and observation version
4. Schedule revalidated canary execution and pause conditions
5. Track attempts, reboot pending and unknown states
6. Require post-install evidence before closing finding
7. Present documented recovery options without universal rollback claim
8. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr; Mahrous review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: C10 policy and P08 runner boundary, version-bound plans and durable attempts. Reuse native patch adapters; do not implement a second approval engine in the frontend.

### Expected Deliverables

- `backend/app/remediation/campaigns_api.py`
- `frontend/src/routes/campaigns.tsx`
- `tests/integration/test_campaign_states.py`
- `docs/campaign-state-machine.md`

### Testing

1. Change approved target evidence and invalidate dispatch
2. Render partial failure and outcome_unknown without whole-campaign success
3. Verify cancel does not claim to undo an already applied patch

### Acceptance Criteria

- Changed plan/target invalidates approval
- Install exit code alone cannot close finding
- Unknown is visible and reconciled
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Stale approval authorizes changed target
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Pause mutation and require renewed assessment/approval

### Next Dependent Work

C11, P15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P13 — Deliver Versioned SIEM Events Through a Retryable Outbox

**Goal:** Persist lifecycle events with business changes and deliver them to the C15 integration route.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P07, P10 (initial plan; no completion reported).

**Depends on:** P07, P10

**Unlocks:** C15, P16

**Parallel with:** D04, D13, D14, D15

**Critical path:** Yes

**First action:** Create versioned event envelope and stable event ID

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Supply or replay the authorized collection/execution fixtures and identify real lab constraints. Focus: Deliver Versioned SIEM Events Through a Retryable Outbox. **When:** At the input/fixture review and again before P13 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p13-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which event schema and correlation IDs does the consumer need?
- How are delivery attempts, replay cursors and duplicate IDs retained?
- How does transport success differ from decoding/correlation proof?

Sources: SRC-P14, SRC-P34

### Inputs

- Supported SIEM input
- Event schema

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Create versioned event envelope and stable event ID
3. Write outbox with domain state transaction
4. Send through supported transport with retry/dedup
5. Validate decoder and correlation fields in actual SIEM
6. Record delivery and parsing status separately
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Transactional PostgreSQL outbox and supported JSON-lines Wazuh route. At-least-once delivery is explicit; duplicate delivery must not create duplicate business findings.

### Expected Deliverables

- `backend/app/integrations/siem_outbox.py`
- `contracts/v1/lifecycle-event.schema.json`
- `fixtures/siem/outbox-events.jsonl`
- `tests/integrations/test_outbox_replay.py`
- `docs/siem-delivery.md`

### Testing

1. Crash between business update and dispatch and retain the event
2. Replay one event with the same stable event_id
3. Trace a delivered event into the C15 decoded alert

### Acceptance Criteria

- Same event ID visible parsed in SIEM
- Retry does not create duplicate business finding
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- HTTP success mistaken for SIEM correlation
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Disclose local export fallback until integration verified

### Next Dependent Work

C15, P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P14 — Plan Hosting, Deploy the Minimal Stack & Prove Recovery

**Goal:** Turn the measured hosting choice into a reproducible connected deployment with private service boundaries, HTTPS, durable storage and tested recovery.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr

**Conditional capability gates:** Connected on-prem qualification does not imply disconnected operation; P17 must pass before that capability is advertised.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P04, P07 (initial plan; no completion reported).

**Depends on:** P04, P07

**Unlocks:** P16, P17

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Start deployment/hosting-plan.md from the measured P01 host/cost comparison and draw the component placement and approved access boundaries.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Reproduce Omar’s connected deployment from the runbook, validate the approved runner-to-lab path and denied network paths, and independently restore database/evidence on a clean host. **When:** At the input/fixture review and again before P14 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p14-amr.md — Clean install/restore results and approved/denied connectivity evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- On-prem is a staged required product capability, with enabling design now and separate qualification milestones.
- Expanded Omar’s hosting execution guide: placement/cost, DNS/TLS, private ports, persistent storage, release recovery, operations and explicit tests.

- Which services can share a host and which need separate profiles?
- Which TLS, private-port and secret configuration fits the intended lab or pilot?
- Can DB, evidence and configuration be restored consistently within measured targets?
- What hostname, public or private DNS and certificate issuer are appropriate for the qualified demo or customer-hosted profile?
- Where will TLS terminate, which proxy headers are trusted and how is certificate renewal tested?
- Which exact inbound, service-to-service and outbound connections are required; which services must have no public listener?
- How are database/evidence/model volumes, off-host backup, secrets and migration recovery handled?
- Who deploys, monitors, updates, restores and pays for each enabled environment?

Sources: SRC-P27, SRC-P28, SRC-P29, SRC-P30, SRC-P31, SRC-P32, SRC-P33, MR01, MR02, MR03, MR04, HT01, HT02

### Inputs

- Hardware measurements
- Private deployment requirements

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Use P01 measurements to write deployment/hosting-plan.md: selected location, host/OS/runtime, administrator, permitted users, capacity evidence, estimated recurring cost and limits. Keep exact provider, size and proxy choice Needs Validation until the comparison passes.
3. Document each component placement and connection: UI/TLS entry, API, worker/job ledger, PostgreSQL, evidence volumes, model/embedding endpoint and isolated runner. Separate the public HTTPS entry, private services and authorized target network; do not publish database, broker, model or runner listeners as internet endpoints.
4. Create a staging configuration with fixture data and a restricted demo/pilot configuration. Pin release/image versions and provide a configuration template with placeholder values only; provision runtime secrets separately.
5. Configure the selected hostname/DNS and TLS termination route after the environment gate. Compare the already-supported proxy approaches and pick one through a small test; public certificate automation and private/on-prem certificate trust have different validation and renewal requirements. Trust forwarded headers only from the configured proxy boundary.
6. Test inbound and outbound connectivity from approved and denied locations; document host firewall/container port mappings, allowed source updates and runner-to-target reachability. A cloud application does not automatically reach private customer devices.
7. Attach persistence and coordinated backup/restore jobs for database, evidence and required configuration/key recovery; keep protected backups on separate authorized storage and record measured recovery objectives. A recreated container or same-disk snapshot is not a complete recovery plan.
8. Write a release procedure: verify build/tests, take a recoverable backup, apply a compatible migration, deploy pinned artifacts, run smoke/health checks and stop or recover on failure. Do not assume that rolling an image back reverses a destructive database migration.
9. Define startup/readiness checks, restart behavior, disk/backup/certificate-age warnings, sanitized logs and responsible contacts. Have Amr reproduce a clean deployment and restore; document failed steps before the P14 handoff.
10. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Linux Compose profiles and private filesystem evidence adapter initially. Exact versions/TLS setup need validation; proposed RPO/RTO are test targets, not guarantees. No new legacy MinIO dependency. Hosting detail: retain the measured Linux/Compose deployment. Host/provider, domain, TLS proxy/issuer, sizes and availability targets are Needs Validation; this plan does not provision or purchase infrastructure.

### Expected Deliverables

- `deploy/compose.yaml`
- `deploy/profiles.md`
- `scripts/ops/backup.py`
- `scripts/ops/restore.py`
- `docs/runbooks/deploy-and-restore.md`
- `reports/restore-drill.md`
- `deployment/hosting-plan.md`
- `deployment/network-and-port-matrix.csv`
- `deploy/.env.example`
- `deployment/tls-and-dns-runbook.md`
- `deployment/release-and-recovery-runbook.md`
- `reports/hosting-qualification.md`

### Testing

1. Have a second member start the minimal profile from instructions
2. Restore DB and linked evidence to a clean environment
3. Inspect exposed ports, image secrets and measured RAM/disk usage
4. Boot the connected on-prem profile, rotate secrets, restart services and restore linked database/evidence on a second qualified lab host.
5. From an allowed client, test HTTPS login, API/RBAC and one queued read workflow; check the same requests fail for unauthorized users.
6. From a denied network/client, verify private database, broker/model and runner services cannot be reached; inspect the actual mappings rather than trusting the diagram.
7. Recreate a service and prove persistent data/evidence survive; restore the coordinated backup on a clean qualified host.
8. Rehearse certificate renewal/trust failure and a failed release or incompatible migration; record detection and recovery, without promising zero downtime.

### Acceptance Criteria

- Fresh teammate starts demo
- Restored evidence references resolve
- No secrets in source/bundle
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.
- Connected on-prem install is reproducible and limitations are stated; this does not imply an enterprise production or fully disconnected qualification.
- The hosting plan names the environment, component locations, administrator, resource measurements, access rules and actual cost assumptions.
- Only the reviewed entry points are reachable; private service, role/object and runner boundaries pass negative checks.
- HTTPS/certificate trust and the documented renewal path work for the chosen environment.
- A second member reproduces deployment, a supported update/failure recovery and consistent restore; measured recovery results are recorded.

### Risks / Failure Modes

- Same-disk snapshot mistaken for recovery
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.
- A VM hosts the application but cannot reach private target devices; exposing a runner to solve reachability would cross the trust boundary.
- Container recreation loses unmounted evidence/model data, or image rollback is mistaken for database rollback.
- A free/demo host, persistent disk, model runtime or certificate dependency has an unmeasured operating cost or availability limit.

### Fallback

Copy encrypted backup to separate authorized storage and test restore

### Next Dependent Work

P16, P17

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19, ADR22

## P15 — Run Cross-Module Security and Failure-Mode Release Tests

**Goal:** Check the integrated trust boundaries and recovery behavior before any external pilot.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Mahrous, Hams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: P08, P11, P12, A12, C13 (initial plan; no completion reported).

**Depends on:** P08, P11, P12, A12, C13

**Unlocks:** P16

**Parallel with:** D04, D13, D15, D16

**Critical path:** No

**First action:** Exercise object-level denied reads and mutations

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Run Cross-Module Security and Failure-Mode Release Tests. **When:** At the input/fixture review and again before P15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p15-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Run Cross-Module Security and Failure-Mode Release Tests. **When:** At the input/fixture review and again before P15 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p15-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Release tests enforce the narrowed scope and deployment promises.

- Which versioned ASVS controls apply to the actual product scope?
- Can injection, stale approvals or cross-role access cross module boundaries?
- What failure cases block release and who accepts residual risks?

Sources: SRC-P21, SRC-P22, SRC-P23, SRC-P34

### Inputs

- Threat model
- Role matrix
- Failure scenarios

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Exercise object-level denied reads and mutations
3. Test malicious structured inputs and command strings
4. Inject duplicated jobs, stale approvals and lost callbacks
5. Test stale retrieval revisions and hostile source text
6. Record issue severity, owner and remediation evidence
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Mahrous; Hams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Use existing module tests plus cross-boundary scenarios and selected ASVS/SSDF guidance. This is release evidence, not a claim of security certification or a complete penetration test.

### Expected Deliverables

- `tests/security/test_release_gates.py`
- `tests/integration/test_fault_scenarios.py`
- `reports/security/release-review.md`
- `docs/security/residual-risk-register.md`

### Testing

1. Run direct API role/object denial tests
2. Inject corrupt source text, duplicate jobs and stale plan hashes
3. Verify model failure and runner interruption do not bypass authorization or closure checks
4. Check local-only mode denies cloud inference/embedding/telemetry and approval rejects unsupported execution profiles.

### Acceptance Criteria

- No known critical auth or unsafe execution issue at gate
- Residual risks explicit
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Happy-path demo hides unsafe edge cases
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Keep risky capability disabled until gate passes

### Next Dependent Work

P16

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## P16 — Measure Platform Performance & Package an Accessible Handover

**Goal:** Deliver a measured final release with reproducible setup, support limits and ownership handoff.

**Why This Matters:** Omar has user-confirmed platform experience; specialist reviewers validate domain behavior and share integration knowledge.

**Owner:** Omar

**Support:** Amr, Mahrous, Hams, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G4

**Start condition:** Blocked by: P10, P11, P12, P13, P14, P15 (initial plan; no completion reported).

**Depends on:** P10, P11, P12, P13, P14, P15

**Unlocks:** Final handoff

**Parallel with:** D04, D06, D07, D10

**Critical path:** No

**First action:** Benchmark real asset/CVE counts and concurrent jobs

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Measure Platform Performance & Package an Accessible Handover. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p16-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Measure Platform Performance & Package an Accessible Handover. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P16 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p16-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision


- Which declared asset/CVE/query volumes represent the final benchmark?
- Which actual query/index or resource bottleneck needs improvement?
- Can a new teammate operate the UI and restore a release using only the docs?

Sources: SRC-P09, SRC-P29, SRC-P33, SRC-P35

### Inputs

- Declared dataset and hardware
- Expected user scenarios

### Implementation Steps

1. Create the listed output files or equivalent paths in the agreed product repository; record the package ID and prerequisite fixture revisions in the README or implementation notes.
2. Benchmark real asset/CVE counts and concurrent jobs
3. Tune measured bottlenecks and indexes
4. Check accessible RTL flows and error recovery
5. Inventory dependency versions/licenses and update responsibilities
6. Publish limitations/operator guide and reproduce on teammate machine
7. Run the package testing checklist below, save the observed results with input/revision IDs, and have Amr + Mahrous + Hams + Shams review the handoff before declaring completion.

### Technical Approach

Existing Design Decision: Measure pagination, indexes and concurrency before adding infrastructure. Preserve pinned dependencies, source/model licenses and clean restore; no enterprise-scale claim from the student lab.

### Expected Deliverables

- `experiments/platform/load_profile.py`
- `reports/platform/performance.csv`
- `reports/platform/accessibility-review.md`
- `docs/runbooks/operator-handover.md`
- `reports/release-manifest.json`

### Testing

1. Benchmark declared volumes on named hardware and record p95/resource use
2. Check keyboard navigation and error/empty states
3. Have a fresh teammate reproduce the demo and locate supported/unsupported behavior

### Acceptance Criteria

- Hardware and dataset reported
- Fresh teammate reproduces workflow
- No unsupported scale claims
- Every listed deliverable exists or has an explicitly documented equivalent path.
- The testing checklist has recorded results and any unresolved failures are disclosed.
- A supporting reviewer can reproduce the documented process from the named inputs without private setup assumptions.

### Risks / Failure Modes

- Unbounded scope prevents reliable final demo
- Using a different source, observation, model or contract revision without recording it can make the handoff or reported result irreproducible.

### Fallback

Freeze validated coverage and document expansion backlog

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR08, ADR09, ADR10, ADR11, ADR12, ADR13, ADR14, ADR19

## UX01 — Research Analyst Decisions and Define the Narrow User Journey

**Goal:** Define who uses the first release, the decisions they must make and the evidence each screen must expose.

**Why This Matters:** Omar needs reviewed user journeys before implementing complex triage and assistant flows; AI experiments need the same question set.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** UX02

**Parallel with:** D01, D02, C01, C02

**Critical path:** Yes

**First action:** Read scope-baseline.md and write three jobs: choose the next fix, inspect evidence, and verify closure.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Research Analyst Decisions and Define the Narrow User Journey. **When:** At the input/fixture review and again before UX01 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux01-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. **When:** At the journey/usability review. **Deliver:** `reviews/ux01-shams.md — Workflow and usability review`. **Review:** Record review findings and their disposition.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Who is the first user: analyst, approver or administrator, and what must each decide?
- Can the user distinguish a CVE, an asset finding and a grouped remediation action?
- What does the user need to see before accepting uncertainty, deferring a fix or requesting approval?
- Which industrial-IT assumptions can be tested with available reviewers, and which customer assumptions remain unverified?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: current team requirements

### Implementation Steps

1. Read scope-baseline.md and write three jobs: choose the next fix, inspect evidence, and verify closure.
2. List user roles and permitted actions with Mahrous; do not infer permissions from screen visibility.
3. Use the shared Ubuntu and FortiOS cases to storyboard the happy path, unknown evidence, no fix and maintenance-blocked paths.
4. Ask available team or external reviewers to explain their decisions; record who participated and distinguish team review from customer research.
5. Define navigation, terminology, evidence timestamps and the minimum information for each decision.
6. Review the flow with Omar and Shams; hand off a versioned journey and open questions to UX02 and A01.

### Technical Approach

Needs Validation: Low-fidelity user flows and task scenarios; design tool remains the team choice. Hams leads research/design; Omar implements.

### Expected Deliverables

- `design/research/user-jobs.md`
- `design/flows/analyst-journey-v1.md`
- `design/research/review-notes.md`
- `design/README.md`

### Testing

1. Have a reviewer identify the ranked unit and justify one next action using only the journey.
2. Walk through unknown, stale and blocked cases without inventing missing facts.
3. Check each proposed action against P04 role/object rules.

### Acceptance Criteria

- Three user jobs and all four exception paths are documented.
- Research participants and limitations are stated honestly.
- Hams signs the UX handoff; Omar reviews implementation feasibility.
- The same scope version and fixture IDs are used by AI and platform work.

### Risks / Failure Modes

- UI research competes with Hams model experiments.
- Team feedback is mistaken for evidence of customer demand.

### Fallback

Use annotated low-fidelity flows and team reviews; do not wait for polished mockups or invent user interviews.

### Next Dependent Work

UX02

### Related Decisions

ADR21

## UX02 — Prototype Top-10 Triage, Evidence Review and Assistant States

**Goal:** Deliver an implementable prototype for the narrow decision workflow, including uncertainty and safe approval boundaries.

**Why This Matters:** A attractive dashboard cannot substitute for clear decision states or a stable frontend handoff.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G1

**Start condition:** Blocked by: UX01, P02 (initial plan; no completion reported).

**Depends on:** UX01, P02

**Unlocks:** P05, UX03

**Parallel with:** D03, D04, D05, D08

**Critical path:** Yes

**First action:** Load UX01 journeys and P02 example responses; map each field to a screen or deliberate omission.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Prototype Top-10 Triage, Evidence Review and Assistant States. **When:** At the input/fixture review and again before UX02 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux02-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which summary fields make the top ten actions understandable without hiding affected assets?
- How should unknown applicability, stale evidence and missing context appear?
- What is the distinction between an AI draft, a policy decision and a human approval?
- Which keyboard, contrast, loading and error states must the implementation support?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: UX01, P02

### Implementation Steps

1. Load UX01 journeys and P02 example responses; map each field to a screen or deliberate omission.
2. Sketch the action queue, asset/evidence panel, cited assistant answer and approval review.
3. Create state variants for empty, loading, stale, forbidden, unknown, failed and no-patch results.
4. Show grouped actions with expandable per-asset findings; never sum duplicate CVEs as independent fixes.
5. Annotate interactions, responsive behavior, focus order, copy and API fields.
6. Review with Omar for implementability and Mahrous for policy accuracy; save the signed version and change list for P05.

### Technical Approach

Needs Validation: Contract-driven prototype, progressive disclosure and evidence-first wording. Hams owns design; P05 remains Omar-owned implementation.

### Expected Deliverables

- `design/prototypes/triage-flow.html`
- `design/specs/component-states.md`
- `design/specs/api-field-map.md`
- `design/reviews/ux02-handoff.md`

### Testing

1. Use real-shaped shared fixtures to walk every state.
2. Have a reviewer distinguish draft versus approved versus verified without verbal explanation.
3. Inspect keyboard order and narrow-screen layouts in the prototype.

### Acceptance Criteria

- Prototype covers the queue, evidence, assistant and approval journey.
- Every API-backed field maps to the shared contract.
- All listed uncertainty/error states have a design.
- Omar accepts the implementation handoff and outstanding questions are recorded.

### Risks / Failure Modes

- Prototype assumes API fields that do not exist.
- Design polish delays the first real slice.

### Fallback

Deliver wireframes and a state table first; defer decorative work and build the reviewed essential flow.

### Next Dependent Work

P05, UX03

### Related Decisions

ADR21

## UX03 — Test Analyst Task Completion and Hand Off UX Corrections

**Goal:** Check whether users can make the intended decisions in the implemented flow and deliver a ranked correction list.

**Why This Matters:** Usability and recommendation quality must be measured separately from whether the frontend renders.

**Owner:** Hams

**Support:** Amr, Mahrous, Omar, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G2

**Start condition:** Blocked by: UX02, P05 (initial plan; no completion reported).

**Depends on:** UX02, P05

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D08

**Critical path:** No

**First action:** Freeze the UI build, scope version and fixture set.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-amr.md — Source/provenance corrections and reviewed fixture IDs`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review implementation feasibility, map screens to actual API fields and accept the design handoff; implementation remains Omar-owned P05. Focus: Test Analyst Task Completion and Hand Off UX Corrections. **When:** At the input/fixture review and again before UX03 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/ux03-omar.md — Signed frontend handoff and field/state compatibility notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Review analyst workflow, user-research findings and usability questions with Hams; this responsibility is independent of advisory ingestion. **When:** At the journey/usability review. **Deliver:** `reviews/ux03-shams.md — Workflow and usability review`. **Review:** Record review findings and their disposition.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which tasks can reviewers complete correctly without coaching?
- Where do users mistake unknown for safe or an AI draft for approval?
- What task-time and error measurements are feasible with the actual reviewers?

Sources: MR05

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: UX02, P05

### Implementation Steps

1. Freeze the UI build, scope version and fixture set.
2. Write tasks with expected evidence and safe outcomes before observing reviewers.
3. Run consented sessions with available reviewers; label team versus external participants.
4. Record completion, time, wrong conclusions, assistance and qualitative comments.
5. Prioritize safety-confusing defects first, then navigation and speed issues.
6. Give Omar reproducible issues and verify fixes; attach limitations to the evaluation report.

### Technical Approach

Needs Validation: Task-based usability study; no invented participant count or target success percentage. Hams leads; Omar implements corrections.

### Expected Deliverables

- `design/usability/protocol.md`
- `design/usability/results.csv`
- `design/usability/corrections.md`
- `design/usability/report.md`

### Testing

1. Replay tasks using fixed fixtures and the same success rubric.
2. Recheck dangerous misunderstandings after corrections.
3. Ensure screenshots and notes contain no private production inventory.

### Acceptance Criteria

- All planned tasks have recorded outcomes and denominators.
- No unresolved design defect presents unknown as safe or a draft as approval.
- Omar receives reproducible issues and reviewable expected behavior.
- Small-sample and participant limitations are reported.

### Risks / Failure Modes

- Small samples are overclaimed as market validation.
- UX fixes are mixed into model quality scores.

### Fallback

Use a structured team walkthrough and clearly label it as an internal usability review.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21

## D17 — Normalize Fortinet Advisory Revisions for One FortiOS Profile

**Goal:** Prove vendor-aware affected-version and remediation evidence for one declared FortiOS profile using public advisory records and reviewed inventory imports.

**Why This Matters:** Network-appliance recommendations require model/train/configuration and vendor upgrade semantics; generic CVE text is insufficient.

**Owner:** Amr

**Support:** Shams, Mahrous, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional FortiOS profile

**Gate:** G1

**Start condition:** Blocked by: D02, C03 (initial plan; no completion reported).

**Depends on:** D02, C03

**Unlocks:** Final handoff

**Parallel with:** D08, D09, D15, C02

**Critical path:** No

**First action:** Select one FortiOS profile with model/train/build fields; record that hardware or licensed VM access is not assumed.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Shams**: Supply or replay the authorized asset collection fixtures and identify real lab constraints. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-shams.md — Reproducible observation evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Normalize Fortinet Advisory Revisions for One FortiOS Profile. **When:** At the input/fixture review and again before D17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d17-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Can the public PSIRT/RSS and per-advisory CSAF mechanism be fetched reproducibly under current terms?
- Which fields identify product, train, affected ranges, fixed release, revision history and configuration prerequisites?
- Does the selected advisory cover more than one product or CVE, and how are those relationships retained?
- What hardware, support entitlement and upgrade-path information is missing from public records?

Sources: MR06, MR07, MR08

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: D02, C03

### Implementation Steps

1. Select one FortiOS profile with model/train/build fields; record that hardware or licensed VM access is not assumed.
2. Choose 10 reviewed advisory records where available, including revisions, not-affected branches, missing fixes and conditional exposure.
3. Fetch allowed public records serially with bounded retry; preserve raw records, URLs, timestamps and hashes; log inaccessible endpoints.
4. Compare HTML/structured fields and retain one-to-many advisory/product/CVE links without flattening branch tables.
5. Normalize vendor assertions into D02; use a reviewed manual table when structured retrieval cannot be qualified.
6. Pair Shams import fixtures with Mahrous boundary cases; unresolved version or configuration semantics remain unknown.
7. Record fixed-version evidence separately from the full upgrade path, release notes, support and recovery constraints.
8. Hand the qualified fixture/profile report to D09/D14/P10; forbid direct appliance firmware execution in this release.

### Technical Approach

Needs Validation: Vendor assertions and typed revision links; public RSS is discovery, not proof that all revisions are captured. This profile is conditional and does not block the Ubuntu core.

### Expected Deliverables

- `vulnerability-intelligence/fortinet/source-review.md`
- `vulnerability-intelligence/fortinet/collector.py`
- `fixtures/fortinet/advisory-manifest.json`
- `fixtures/fortinet/normalized.jsonl`
- `vulnerability-intelligence/fortinet/profile-qualification.md`

### Testing

1. Replay raw records and compare normalized assertions.
2. Test branch boundary, unrelated product, configuration missing and advisory revision cases.
3. Verify a fixed release is never presented as a tested direct upgrade jump.

### Acceptance Criteria

- One profile and all required identity/configuration fields are declared.
- Every normalized assertion links to a preserved reviewed source revision.
- 10 available records or a documented smaller feasibility sample cover the declared edge cases.
- Unavailable terms, access or version rules fail the profile gate rather than being bypassed.
- No firmware image redistribution or automated appliance mutation is included.

### Risks / Failure Modes

- Public advisory retrieval changes or is blocked.
- An apparently newer train is incompatible with the actual hardware.

### Fallback

Use source-attributed reviewed advisory/import fixtures; keep unsupported cases unknown and publish the profile limitation.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21

## D18 — Qualify Tool Trust, Data Rights and Deployment Constraints

**Goal:** Create a usable trust and rights gate for every enabled source, runtime, model and distribution artifact.

**Why This Matters:** Technical access is not permission to redistribute data, ship a model or send private organization evidence to an external provider.

**Owner:** Amr

**Support:** Mahrous, Hams, Omar

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Current core

**Gate:** G0

**Start condition:** Can start now (initial plan; no completion reported).

**Depends on:** None

**Unlocks:** P17

**Parallel with:** C01, C02, C03, A01

**Critical path:** No

**First action:** Reuse D01 source register and existing licensing analysis; open a separate tool/model/data-rights register.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Omar**: Review schemas, integration fields, API/error behavior and artifact consumption; reproduce the package handoff. Focus: Qualify Tool Trust, Data Rights and Deployment Constraints. **When:** At the input/fixture review and again before D18 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/d18-omar.md — Contract compatibility notes and a consumer-side fixture check`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.

- Which exact artifact/version/license and owner apply to each enabled dependency?
- Are internal use, commercial service use, redistribution, derived output and attribution treated differently?
- Which tools send prompts, telemetry or inventory outside the deployment boundary?
- What retention, support entitlement, update and end-of-life rules must the selected customer profile satisfy?
- Can data be sold or shared under the actual source rights and customer agreement?

Sources: MR01, MR07, MR09, MR10, MR11

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: current team requirements

### Implementation Steps

1. Reuse D01 source register and existing licensing analysis; open a separate tool/model/data-rights register.
2. Inventory only enabled dependencies and exact candidate revisions; distinguish source code, weights and source content.
3. Attach official terms/license URLs, review date, attribution obligations and unresolved questions to each row.
4. Trace inventory, prompts, logs, embeddings and telemetry across the proposed trust boundary.
5. Classify each row allowed-for-this-use, restricted, unverified or excluded; an unverified commercial right is a release gate.
6. Write a business-model hypothesis around software/workflow value, not assumed resale of public feeds or customer data.
7. Review with Omar and Hams; give each affected package a required configuration or replacement action.
8. Define recurring review after dependency/terms changes and before a customer deployment.

### Technical Approach

Needs Validation: Evidence-based trust/rights register with release-specific scope; legal or procurement confirmation remains required where the terms are unclear.

### Expected Deliverables

- `governance/tool-trust-register.csv`
- `governance/data-rights-matrix.csv`
- `governance/data-flow-boundaries.md`
- `business/value-and-distribution-hypotheses.md`
- `governance/README.md`

### Testing

1. Trace one record and one assistant question through logs, indexes and external endpoints.
2. Check every enabled distribution artifact has a rights disposition and evidence link.
3. Remove an unqualified external tool and verify the disclosed local/core workflow still has a path.

### Acceptance Criteria

- Each enabled source/tool/model has version, owner, rights, evidence, review date and renewal trigger.
- Commercial redistribution and customer-data sharing are never assumed from public availability.
- Unresolved restrictions identify an owner and block the relevant release capability.
- Amr hands concrete config/license actions to Omar/Hams and the business assumptions are labelled.

### Risks / Failure Modes

- Software license is mistaken for rights to all ingested content.
- A cloud trace integration leaks sensitive evidence.

### Fallback

Exclude the unqualified dependency or restrict the capability to an explicitly permitted internal demo; do not call it commercially cleared.

### Next Dependent Work

P17

### Related Decisions

ADR21

## P17 — Validate Disconnected Installation and Versioned Update Bundles

**Goal:** Install and operate the qualified on-prem profile without runtime internet access and prove a controlled update/restore procedure.

**Why This Matters:** On-prem is a required product direction. Disconnected operation needs images, models, evidence, identity and updates beyond a local LLM.

**Owner:** Omar

**Support:** Amr, Mahrous, Hams, Shams

**Conditional capability gates:** None beyond the listed prerequisites

**Scope version:** 2026-10-23.r2

**Delivery layer:** Product milestone

**Gate:** G3

**Start condition:** Blocked by: P14, A06, A09, D18 (initial plan; no completion reported).

**Depends on:** P14, A06, A09, D18

**Unlocks:** Final handoff

**Parallel with:** D03, D04, D05, D06

**Critical path:** No

**First action:** Freeze a profile from P14/A09 including capacity, capability flags, local identity, secrets and allowed connections.

### Research / Questions to Answer

RESEARCH REQUIRED — validate the listed execution questions; reuse completed evidence.

Use retained evidence and the meeting-revision chapter. Customer access, hardware and measured results are not assumed.

### Support Contributions and Handoff

- **Amr**: Review source authority, vendor semantics and rights for the package fixtures; identify missing or conflicting assertions. Focus: Validate Disconnected Installation and Versioned Update Bundles. Supply or replay the authorized execution fixtures and identify real lab constraints. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-amr.md — Source/provenance corrections and reviewed fixture IDs; reviews/p17-amr.md — Reproducible observation/runner evidence and failing edge cases`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Mahrous**: Review applicability, policy and safety boundaries in the expected outcomes; challenge unknown and denied cases. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-mahrous.md — Reviewed decision outcomes and blocking policy questions`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Hams**: Review the AI evidence/evaluation contract and clarity of user-visible states; identify unsupported claims. Focus: Validate Disconnected Installation and Versioned Update Bundles. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-hams.md — Reviewed question/answer or UX-state examples and evaluation notes`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.
- **Shams**: Supply authorized asset observations and collection failure/replay fixtures; preserve identity, timestamps and evidence provenance. **When:** At the input/fixture review and again before P17 acceptance; coordinate after its prerequisites are available. **Deliver:** `reviews/p17-shams.md — Reproducible asset observation evidence`. **Review:** Primary owner records disposition of review findings; unresolved safety or contract blockers prevent DONE.

### Scope Revision

- Added to make a distinct meeting requirement executable without reallocating existing primary ownership.
- The disconnected hosting test explicitly covers private DNS, certificate trust and identity dependencies.

- Which exact CPU/GPU architecture, RAM, disk and container runtime pass the measured profile?
- Which images, model/tokenizer files, embedding artifacts, packages and source snapshots must be carried offline?
- What remains usable when intelligence or patch repositories cannot be refreshed?
- How will the target verify bundle authenticity, schema compatibility, rollback eligibility and imported source age?
- Can local/private DNS, certificate trust/renewal and identity work without runtime public internet access?

Sources: MR01, MR02, MR03, MR04

### Inputs

- Scope baseline 2026-10-23.r2
- Retained source register and package inputs from: P14, A06, A09, D18

### Implementation Steps

1. Freeze a profile from P14/A09 including capacity, capability flags, local identity, secrets and allowed connections.
2. Build a connected staging bundle with pinned image digests, model revisions, configuration templates, source snapshots, migrations and license notices.
3. Use image save/load for container images; separately export models, database/evidence backup and optional approved package repository content.
4. Create a manifest with artifact hashes, versions, source timestamps and compatibility rules; establish an offline-verifiable signed manifest or authenticated trusted-transfer procedure before claiming authenticity.
5. Validate the bundle and import into a clean lab host with public egress blocked; install without a first-run network download.
6. Run login, inventory import, deterministic assessment, ranked queue and local retrieval/assistant checks; declare any disabled capability explicitly.
7. Reject tampered, incompatible and unauthorized bundles; apply an allowed update transactionally with backup and tested recovery.
8. Measure install time, footprint and restore results; hand over operator instructions and enterprise qualification gaps.

### Technical Approach

Needs Validation: Extend retained Compose deployment and local PostgreSQL/evidence paths; no Kubernetes requirement. Offline qualification is a planned product milestone, not a claim that the current planning website runs the product.

### Expected Deliverables

- `deployment/offline/bundle-manifest.schema.json`
- `deployment/offline/export-bundle.sh`
- `deployment/offline/import-bundle.sh`
- `deployment/offline/runbook.md`
- `deployment/offline/qualification-report.md`

### Testing

1. Install on a clean qualified host with internet egress blocked and inspect denied connection logs.
2. Exercise missing model/image, wrong architecture, stale source, tampered bundle and incompatible migration cases.
3. Restore database and evidence together, then prove citations and assessment revisions still resolve.
4. Run the same reviewed assistant questions locally; a disabled assistant is a disclosed degraded profile, not a full-AI offline pass.
5. Repeat the enabled workflow using the documented private hostname/certificate and local identity with public egress blocked; no hidden public DNS or certificate enrollment step is allowed at runtime.

### Acceptance Criteria

- Clean install uses only approved bundle artifacts with no hidden download.
- All enabled core capabilities pass with public egress blocked.
- Bundle authenticity/integrity and compatibility checks reject the negative cases.
- Source freshness and patch-content availability are honestly displayed.
- An operator reproduces installation, update and recovery from the runbook.

### Risks / Failure Modes

- Runtime startup pulls a tokenizer, font, image, identity or telemetry dependency.
- An image archive is mistaken for a complete application backup.
- Offline feed refresh cannot meet connected freshness targets.

### Fallback

Ship a qualified connected on-prem milestone first and label disconnected qualification pending; model failure degrades to cited deterministic cards, not a cloud call without permission.

### Next Dependent Work

Final reviewed release/evidence handoff.

### Related Decisions

ADR21, ADR22

## A17 — Compare Rule-Based, AI-Assisted and Hybrid Prioritization on Reviewed Organization Scenarios

**Goal:** Determine where AI adds measurable prioritization value over a transparent baseline without changing applicability, safety or approval authority.

**Why This Matters:** The existing A15 compares final contributions but does not implement a separately owned AI-ranking experiment. Hams owns the overall AI-powered prioritization capability; domain packages supply evidence and integration.

**Owner:** Hams

**Support:** Amr, Mahrous, Shams, Omar

**Conditional capability gates:** No candidate becomes an operational ranker before reviewed safety and comparative evidence gates.

**Scope version:** 2026-10-23.r2

**Delivery layer:** Conditional experiment

**Gate:** G2

**Start condition:** Blocked by: D12, A03, A04, D15, D14, A13 (initial plan; no completion reported).

**Depends on:** D12, A03, A04, D15, D14, A13

**Unlocks:** A15

**Parallel with:** None listed

**Critical path:** No

**First action:** Freeze the A13 ranking protocol and receive the complete A02/D12/D14/D15 input bundle; missing bundles block experiment runs, not initial literature review.

### Research / Questions to Answer

RESEARCH REQUIRED — execution-specific checks; reuse the linked completed research.

The existing research and decisions below are the starting evidence. Answer these package-specific questions in the implementation notes; confirm only unresolved environment, endpoint, version or license details.

### Support Contributions and Handoff

- **Amr**: Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-amr.md — Research security factors with Mahrous, provide source-backed relevance cases and independently review ranking reasons.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Mahrous**: Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-mahrous.md — Own D12 policy/hard constraints and applicability validation; adjudicate security ranking disagreements.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Shams**: Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-shams.md — Assemble and validate the A02 experiment input bundle from existing feeds, asset evidence and reviewed context; disclose missing/stale/synthetic fields.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.
- **Omar**: Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback. **When:** Before experiment freeze and at result/contract review; coordinate the named prerequisite artifacts. **Deliver:** `reviews/a17-omar.md — Review ranking-result API contract, instrument cost/latency and integrate only qualified output with safe baseline fallback.`. **Review:** Hams or the package primary owner records review disposition and unresolved gaps; reviewer can reproduce their contribution.

### Scope Revision

- 29 October: new bounded AI-ranking experiment; Hams confirmed capability primary owner; reuses existing source/policy/evaluation/platform work.

- Compare transparent rules, frozen-feature/classical ranking candidates, bounded LLM ranking and rules-first hybrid: required labels, compute, latency, stability and failure modes. No winner is preselected.
- Can organization context change useful order while hard eligibility and policy constraints remain unchanged?
- Do we have enough reviewed outcomes for learned ranking? If not, compare constrained inference-only candidates and disclose label limits.
- How do missing EPSS/KEV/context, large candidate volumes, ties, duplicates and maintenance conflicts affect results?

Sources: DS12, DS14, DS15, DS16, MR06, MR08

### Inputs

- A02 Amr-prepared provenance/context bundle frozen by A03
- D12 versioned baseline, security factors and relevance rubric
- D15 independent applicability cases; D14 eligible remediation actions
- A04 baseline classification outputs only where their uncertainty is recorded

### Implementation Steps

1. Freeze the A13 ranking protocol and receive the complete A02/D12/D14/D15 input bundle; missing bundles block experiment runs, not initial literature review.
2. Research and document strongest realistic rule/AI/hybrid alternatives, label needs, cost/privacy and deployment limits before choosing the candidate.
3. Implement the shared offline harness and deterministic comparison adapters; validate input/output schema with Omar.
4. Run one low-resource AI candidate and a constrained hybrid; keep hard policy gates outside model control.
5. Evaluate per A13 with independent security review; run context/stability/failure ablations and paired time trials.
6. Publish the recommendation, negative results and reproducibility README; hand qualified outputs or baseline-retention decision to Omar.

### Technical Approach

Existing Design Decision: RESEARCH REQUIRED: reuse D12 rules and A02/A03 data. First build a Python offline comparison harness; choose one low-resource AI candidate after evidence review, then test rules-first hybrid constrained ordering. No fine-tuning in current execution. LLM text is not an authoritative risk probability.

### Expected Deliverables

- `research/prioritization/approach-comparison.md`
- `experiments/prioritization/run_comparison.py`
- `experiments/prioritization/configs/`
- `reports/prioritization/rule-ai-hybrid-benchmark.md`
- `reports/prioritization/recommended-approach.md`
- `contracts/prioritization/ranking-result.schema.json`
- `experiments/prioritization/README.md`

### Testing

1. Use identical candidate action sets, evidence revisions, allowed context and held-out cases for all methods.
2. Compare CVSS-only, KEV-first and D12 baseline to AI and hybrid; report cases where each loses.
3. Repeat stochastic candidates and change one context variable at a time; test missing inputs, injection, malformed output, excessive candidate volume and forbidden policy overrides.
4. Run blinded paired analyst tasks; separate correctness, review time and explanation usefulness.

### Acceptance Criteria

- All three approach families are compared on the declared supported cases; unavailable learned methods have evidence-based exclusion reasons.
- Every input/output and expert judgement has a recorded revision and provenance; holdout is not used for selection.
- Zero observed forbidden eligibility/permission overrides in the declared test suite; this is a test result, not a universal safety guarantee.
- Report quality/stability/time/latency/cost metrics, failures and uncertainty against predeclared A13 gates.
- Recommend AI, hybrid or baseline based on measured evidence; retaining baseline is a valid successful experiment.
- All four supporting reviewers have explicit disposition records.

### Risks / Failure Modes

- Sparse or synthetic labels can make gains misleading; expert rankings can disagree.
- LLM position bias, candidate truncation, randomness and confident unsupported reasoning.
- Added AI latency or reviewer effort can erase ranking benefit.

### Fallback

Keep D12 production order and cited explanations; show AI experiment as unqualified/offline. Do not delay core inventory, approval or verification.

### Next Dependent Work

A15

### Related Decisions

ADR05, ADR15, ADR23, ADR24


## Risk register

Probability and impact are qualitative planning assessments, not measured frequencies.

### R01 — دقة هوية المنتج أو backports

**probability:** مرتفع

**impact:** حرج

**signal:** package epoch/release مفقود؛ banner يختلف عن inventory

**prevention:** Native version comparators + vendor fixtures قبل bulk ingest

**mitigation:** حالة unknown وطلب الحقل الناقص؛ يمنع auto patch

**fallback:** Manual vendor review مع evidence

**owner:** Mahrous

### R02 — تأخر/تغير feed أو schema

**probability:** مرتفع

**impact:** مرتفع

**signal:** last_success يتجاوز دورتين؛ quarantine يزيد؛ record count يتغير فجأة

**prevention:** Raw revisions + schema tolerant validation + overlap cursor + contract fixtures

**mitigation:** توقف تقدم watermark عند الفشل؛ retries bounded وalert

**fallback:** آخر snapshot موثوق معلن stale؛ مصدر بديل لا يطمس provenance

**owner:** Shams

### R03 — النسبة 90% تصبح مضللة

**probability:** متوسط

**impact:** حرج

**signal:** استبعاد unknown من denominator؛ اختيار حالات سهلة فقط

**prevention:** Freeze ground truth حسب supported profiles مع positives/negatives/unknown

**mitigation:** نشر precision وrecall وcoverage منفصلة + مراجعة أخطاء

**fallback:** خفض scope المعلن بدل تغيير denominator بعد النتائج

**owner:** Mahrous

### R04 — جمع credentials أو logging حساس

**probability:** متوسط

**impact:** حرج

**signal:** سر في log/fixture؛ حساب admin عام لكل targets

**prevention:** Least privilege؛ secret references؛ redaction؛ عدم رفع dumps حساسة

**mitigation:** Rotate سر مكشوف، إيقاف runner، مراجعة audit

**fallback:** Manual collection مؤقتًا

**owner:** Omar + Amr

### R05 — Active scan يؤذي جهازًا حساسًا

**probability:** متوسط

**impact:** حرج

**signal:** device role غير معروف؛ printer/OT في allowlist العام

**prevention:** No default active scan on unknown OT؛ نطاق مصرح + exclusions + rate caps

**mitigation:** Kill switch + إيقاف profile وتوثيق incident

**fallback:** Passive/manual/vendor inventory

**owner:** Amr

### R06 — إعادة patch بسبب retry بعد انقطاع

**probability:** متوسط

**impact:** حرج

**signal:** job timed out لكن target state غير معلوم

**prevention:** Idempotency key + lease + durable job ledger + reconcile قبل retry

**mitigation:** حالة outcome_unknown؛ جمع الحالة الفعلية أولًا

**fallback:** تدخل بشري وإيقاف campaign

**owner:** Omar + Amr

### R07 — نجاح تثبيت مع فشل الخدمة

**probability:** مرتفع

**impact:** حرج

**signal:** Exit code0 لكن healthcheck أو active kernel مختلف

**prevention:** Pre/post healthchecks + reboot policy + canary + stop criteria

**mitigation:** إيقاف الدفعات، جمع logs، recovery مجرّب

**fallback:** Snapshot restore في اللاب أو vendor recovery؛ لا promise rollback عام

**owner:** Amr

### R08 — نسخة إصلاح غير متاحة/غير مرخصة

**probability:** متوسط

**impact:** مرتفع

**signal:** repo لا يقدم version؛ subscription ناقص؛ EOL

**prevention:** Availability check من repo المعتمد وvendor support قبل approval

**mitigation:** اختيار supported upgrade/mitigation مع residual risk

**fallback:** Exception بمالك وتاريخ انتهاء أو replacement

**owner:** Shams

### R09 — تغير target بعد الموافقة

**probability:** مرتفع

**impact:** حرج

**signal:** inventory hash أو policy/version تغير

**prevention:** Approval binds plan hash + evidence revision + expiry

**mitigation:** Invalidate approval وأعد preflight

**fallback:** إعادة مراجعة بشرية

**owner:** Mahrous

### R10 — هلوسة أو source لا يدعم الإجابة

**probability:** مرتفع

**impact:** حرج

**signal:** Citations موجودة لكنها لا تثبت version/patch

**prevention:** Structured tool facts + source spans + abstention + hostile retrieval suite

**mitigation:** Block unsupported recommendation وshow missing evidence

**fallback:** Template report من structured facts

**owner:** Hams

### R11 — تسرب بيانات أو prompt injection

**probability:** متوسط

**impact:** حرج

**signal:** retrieved text يطلب secrets/tools؛ نتائج asset خارج scope

**prevention:** Authorization قبل retrieval/tools؛ untrusted docs؛ no shell tool؛ tenant scope explicit

**mitigation:** Reject malicious instruction + review traces بدون secrets

**fallback:** Disable assistant؛ core workflow يظل يعمل

**owner:** Omar + Hams

### R12 — تسرب train/test أو labels ضعيفة

**probability:** مرتفع

**impact:** مرتفع

**signal:** near-duplicates عبر splits؛ severity label من نفس CVSS المدخل

**prevention:** Temporal/group split، drop label-derived features، double review subset

**mitigation:** إعادة benchmark وتصحيح claims

**fallback:** Reliable baseline فقط مع error analysis

**owner:** Hams + Shams

### R13 — الأجهزة لا تتحمل اللاب والـLLM

**probability:** مرتفع

**impact:** مرتفع

**signal:** OOM؛ paging؛ API بطيء أثناء inference

**prevention:** Hardware inventory وconcurrency1 resource spike في G0

**mitigation:** تشغيل services عند الحاجة وتقليل context/model/corpus

**fallback:** Hosted model بعد approval/cost/privacy gate أو template-only؛ لا شراء تلقائي

**owner:** Omar + Hams

### R14 — تكلفة API أو تراخيص غير محسوبة

**probability:** متوسط

**impact:** مرتفع

**signal:** token/request usage أعلى من budget؛ redistribution unclear

**prevention:** License/API matrix بتاريخ + hard spending cap + no default paid dependency

**mitigation:** وقف calls والتحويل caching/local؛ مراجعة terms قبل release

**fallback:** Demo offline وBYO independently installed tools

**owner:** Shams + Omar

### R15 — Omar يصبح نقطة اختناق

**probability:** مرتفع

**impact:** مرتفع

**signal:** PRs/integration تنتظر عضوًا واحدًا >3 أيام

**prevention:** Contracts مبكرًا؛ reviewer backup؛ pair on migrations/jobs

**mitigation:** تقسيم integration scripts لـAmr وHams وShams مع ownership واضح

**fallback:** تجميد UI polish وإكمال flow واحد

**owner:** Mahrous

### R16 — تداخل الامتحانات والتوسع

**probability:** مرتفع

**impact:** مرتفع

**signal:** carry-over sprintين؛ ساعات أقل من الافتراض

**prevention:** Capacity أسبوعي + احتياطي25–35% مقترح + WIP1 لكل فرد

**mitigation:** Cut optional adapters قبل core reliability

**fallback:** تسليم scope أصغر موثق وإعادة تفاوض dates

**owner:** Mahrous

### R17 — SIEM يستقبل بدون correlation أو يكرر

**probability:** متوسط

**impact:** متوسط

**signal:** لا alert بالـevent_id؛ retries تنشئ أحداث مكررة

**prevention:** نسق versioned + outbox + JSON decoder/rule fixtures

**mitigation:** Reconcile delivery وتوثيق duplicate behavior

**fallback:** ملف export replayable؛ لا ندعي integration قبل ingestion proof

**owner:** Omar + Mahrous

### R18 — Offline asset يظهر آمنًا بالخطأ

**probability:** مرتفع

**impact:** مرتفع

**signal:** last_seen قديم؛ scan unavailable

**prevention:** Freshness status على كل evidence وعدم تحويل unreachable إلى clean

**mitigation:** Request signed/manual snapshot وإظهار حدود الثقة

**fallback:** Unknown + owner review؛ لا close تلقائي

**owner:** Amr

### R19 — فقدان DB أو evidence

**probability:** متوسط

**impact:** حرج

**signal:** backup موجود لكن restore غير مجرب

**prevention:** Daily backup design مع encryption؛ restore drill مبكر

**mitigation:** Stop mutations واستعادة consistent DB+evidence snapshot

**fallback:** آخر backup validated مع إعلان data-loss window

**owner:** Omar

### R20 — DB/vector/jobs يتنافسون على RAM

**probability:** متوسط

**impact:** مرتفع

**signal:** queue age يرتفع وp95 latency يتدهور أثناء embeddings

**prevention:** حجم عينة وload profile واضح؛ index after correctness؛ batch limits

**mitigation:** Schedule embedding منفصل، pagination/index tuning

**fallback:** تعطيل vector والعودة lexical؛ worker concurrency1

**owner:** Omar

### R21 — تفوق تسويقي بلا بحث

**probability:** مرتفع

**impact:** مرتفع

**signal:** المقارنة screenshots أو feature claims بلا تجربة

**prevention:** Baseline/ablation وقياس time-to-correct-decision؛ competitor claims مصادر dated

**mitigation:** إعادة صياغة contribution إلى hypothesis قابلة للقياس

**fallback:** تقرير limits/negative results قوي بدل ادعاء غير مسنود

**owner:** Hams + Shams

### R22 — تبدل repository أو model license

**probability:** متوسط

**impact:** مرتفع

**signal:** archived dependency؛ breaking release؛ modelcardتغير

**prevention:** Pin versions/checksums + source/license inventory + review كل milestone

**mitigation:** Isolate adapter وتبديل dependency بعد regression

**fallback:** Known working pinned snapshot بما تسمح terms

**owner:** Omar

## Architecture challenge

### اعتراض مهندس Cyber

CPE أو similarity قد يعطي false positives؛ banner لا يثبت patch level.

التصحيح: vendor-native comparator، observed evidence، tri-state verdict، scope matrix ومراجعة عند التعارض.

### اعتراض باحث AI

أنتم تعيدون وصف CVE وربما تسرّبون labels إلى النموذج.

التصحيح: tasks منفصلة، temporal/group split، baseline، ablation، تقييم evidence request وchange-aware reasoning؛ لا novelty لوجود chatbot فقط.

### اعتراض Software architect

Queue+vector+SIEM+LLM+VMs أكثر من طاقة اللابتوبات؛ custom queues خطرة.

التصحيح: modular monolith وrunner منفصل، broker مشروط بتجربة، serial durable fallback، lexical fallback، SIEM لاب مستقل عند الحاجة.

### اعتراض المشرف

المشروع واسع والنِسب غير معرفة؛ من أنجز ماذا؟

التصحيح: requirements traceability، supported-profile denominator، four gates، artifacts وreviewers، log للمساهمات والتجارب الفاشلة.

### اعتراض مستخدم حقيقي

القائمة طويلة لكن لا أعرف ماذا أصلح، أو patch يكسر الخدمة.

التصحيح: explainable priority، constraints، maintenance window، canary، service checks، exception expiry وخطة recovery.

### ما قد نكون نسيناه

تغيّر مصدر بعد الإغلاق، reboot pending، stale approvals، EOL، source withdrawal، non-CVE advisories.

التصحيح: history/reassessment، explicit states، patch/asset/knowledge revisions، reopening findings؛ لا delete صامت ولا safe افتراضي.

## Experiments and unresolved gates

### E01 — تأكيد الموارد والساعات

الجميع / G0

CPU/RAM/disk/OS/GPU + ساعات أثناء الدراسة والامتحانات + إنترنت؛ run core DB/API وVM ثم model منفصل.

**Decision gate:** لا final model أو broker أو hosting commitment قبل القياس.

### E02 — مقارنة جمع الأدلة

Amr / G0–G1

نفس Ubuntu target: SSH native مقابل osquery أو Wazuh inventory عند إتاحته؛ fields، privilege، duration، errors.

**Decision gate:** اختر الأقل عبئًا الذي يوفر كل fields؛ ناقص field = unknown وليس guessing.

### E03 — المطابقة والحالات الحدية

Mahrous + Shams / G1

50 حالة مبدئية مقترحة: ranges/boundaries/backport/epoch/missing/conflict/rejected/non-CVE؛ double review.

**Decision gate:** لا known false-positive يؤدي لـpatch؛ راجع الدقة والـcoverage قبل التوسيع. العدد starter لا benchmark نهائي.

### E04 — الـqueue والتعافي

Omar + Amr / G1

Restart worker/broker وقت job، أعد نفس message، افصل target؛ سجل DB ledger ونتيجة reconcile.

**Decision gate:** لا إعادة action غير مأمونة؛ اختيار broker مشروط بالموارد والتعقيد.

### E05 — Retrieval لا الانطباع

Hams / G1–G2

Exact+lexical vs hybrid E5 vs larger embedding على queries عربية/إنجليزية ومصادر متشابهة/قديمة.

**Decision gate:** اختر Pareto جودة/latency/RAM؛ vector لا يقرر affected.

### E06 — اختيار LLM فعلي

Hams + Omar / G1–G2

نموذجان صغيران على نفس prompts/tools/context plus template baseline؛ correctness، abstention، p95، RAM، cost.

**Decision gate:** لا winner مسبق؛ لو hardware لا يكفي نحتفظ core deterministic ونغيّر serving فقط.

### E07 — Patch + recovery

Amr + Mahrous / G2

Package محدد على clone؛ signature، pin/version، disk/repo/network، reboot، healthchecks، failure injection واستعادة.

**Decision gate:** لا rollout أوسع قبل نجاح pilot واستعادة؛ rollback غير مضمون لكل جهاز.

### E08 — جدوى الابتكار

Hams + Shams / G3

Change-aware reassessment مقابل full batch؛ targeted evidence request مقابل generic ask؛ constrained plan مقابل severity-only list.

**Decision gate:** نقيس correctness/time/effort مع نفس knowledge snapshot؛ نقبل رفض الفرضية.

### E09 — Security & usability

Omar + Mahrous + Shams / G2–G4

Role/action negative tests، stale approval، malicious docs، unauthorized asset؛ 5–8 users pilot مقترح بموافقة وبدون بيانات شخصية غير لازمة.

**Decision gate:** Zero unresolved critical defects في demo scope؛ sample صغير exploratory وليس population proof.

## Requirements traceability

### REQ01 — CVE freshness ≤24h في proposal

**Owner:** Shams + Omar

نحفظ published_at/source_modified_at/fetched_at/normalized_at/indexed_at/reassessed_at. نقيس publication→seen وseen→usable منفصلين؛ misses وعددها وسببها معلنان.

**Acceptance/limits:** Daily report over representative observation window؛ لا نعد بمعرفة CVE غير منشورة أو حقول لم ينشرها vendor. 2–3 أيام لا تستبدل وعد24h بلا اتفاق.

### REQ02 — كشف ≥90% في controlled lab

**Owner:** Mahrous + Amr

TP/(TP+FN) على vulnerabilities المزروعة المعروفة ضمن support scope؛ precision وunknown وcoverage منفصلة.

**Acceptance/limits:** Ground truth frozen قبل القياس؛ authenticated vs unauthenticated profiles منفصلة.

### REQ03 — توصيات واضحة وقابلة للتنفيذ ≥90%

**Owner:** Hams + Shams

Rubric بشري clarity/actionability بجانب correctness/source support/safety؛ المحكم لا يعرف model عندما يمكن.

**Acceptance/limits:** Publish عدد التوصيات والمحكمين والاتفاق والأخطاء؛ لا نساوي clear مع correct.

### REQ04 — AI classification

**Owner:** Hams

Category + impact multilabel حسب label guide؛ severity official محفوظة، prediction عند النقص موسومة inference.

**Acceptance/limits:** Macro/microF1، per-label recall، confusion/error analysis؛ threshold يتفق بعد baseline.

### REQ05 — SIEM integration

**Owner:** Omar + Mahrous

حدث structured يصل Wazuh ويظهر decoded ويطابق rule مرتبط بالـasset/CVE/status.

**Acceptance/limits:** Event ID وتتبع outbox→file/agent→alert؛ export فقط ليس integration.

### REQ06 — Access control

**Owner:** Omar

Admin/Analyst/Auditor/Guest حسب role/action matrix؛ checks server-side لكل object/action.

**Acceptance/limits:** Negative tests على API؛ approval privilege مستقل محدد؛ Guest لا يرى asset حساس.

### ADD01 — Patch lifecycle

**Owner:** Amr + Mahrous + Shams

Catalog→eligibility→plan→pilot→approval→execution→reboot→verification→closure/exception.

**Acceptance/limits:** مسار فعلي مدعوم وحالة failure/recovery؛ audit كاملة. إضافة للخطة لا تعديل proposal.

### ADD02 — RAG + customized assistant

**Owner:** Hams + Omar

Knowledge متجدد في DB/index؛ LLM يستخدم retrieval وread-only tools scoped.

**Acceptance/limits:** Citations للدليل + missing evidence + no arbitrary execution. لا retrain لكل CVE.

### ADD03 — Product differentiation

**Owner:** الفريق

تغيير مصدر يغيّر القرار؛ طلب دليل محدد؛ خطة إصلاح تحترم قيود التشغيل.

**Acceptance/limits:** Baselines/ablations + limitations؛ ليست ادعاء novelty عالمي.

## Research chapters

---

# Intelligence, applicability and prioritization — research handoff

Research date: 14 October 2026. All selections below are recommendations for this five-person graduation team, not implemented or supervisor-approved decisions. Sources and web refs are in `data_sources.json`; 16 executable packages in `data_tasks.json`.

## Conclusions that change the architecture

1. **Do not wait for NVD enrichment.** NIST's April 2026 policy prioritizes selected CVEs; other records can remain unenriched. June 2026 added CVE `affected` and CISA-ADP SSVC fields. August changed affected data in history to a GitHub reference while current CVE endpoint retains full affected JSON. Therefore ingest the official CVE list, enrich asynchronously, preserve schema versions, and use vendor evidence for real applicability. [DS01, DS02]
2. **A useful Ubuntu adapter can start with official OSV JSON**, not scraped web pages. Ubuntu distinguishes vulnerability records (including unfixed issues) from USN/LSN fix announcements. Binary/source package mapping, distro release, Pro entitlement and Debian versions remain essential. OVAL is a useful independent cross-check, not a substitute for unfixed intelligence. [DS03, DS04]
3. **Do not build a new RHEL adapter around OVAL alone.** Red Hat's current page recommends CSAF/VEX information including fixed/unfixed products; OVAL/DSv2 is in maintenance mode. Red Hat public security data is CC-BY4, requiring attribution/link on redistribution. [DS05]
4. **Neither RAG nor an LLM establishes installed-version applicability.** Recommended design: canonical assertions + deterministic version/product rules + evidence states; retrieval supplies explanations and references. Model-generated product matches remain candidates for review until resolved.
5. **No arbitrary CVSS×EPSS “AI risk score.”** Preserve CVSS severity and dated EPSS forecast separately. EPSS is not local asset risk; confirmed exploitation takes precedence over low forecast. There is no universal EPSS action threshold. Local policy bands should state exposure, consequence and capacity assumptions. [DS12, DS16]

## Decisions and realistic alternatives

| Decision | Recommended project choice | Strong alternatives and when they fit | Hidden cost / early check |
|---|---|---|---|
| Vulnerability backbone | Official CVEListV5 + asynchronous NVD + vendor adapters | NVD-only is simpler but loses timely vendor detail/unenriched records; a commercial unified API may save normalization work if future funding/redistribution terms justify it | Implement revisions before bulk history; use record schema field, not publication date, to choose parser |
| Ubuntu evidence | Official Ubuntu OSV CVE+fix records, selected OVAL cross-check | OVAL execution is good for supported assessment; raw tracker scraping is brittle; OSV aggregate API is convenient but a vendor-direct snapshot gives provenance and offline reproducibility | Confirm binary→source mapping; do not use experimental API as an irreplaceable dependency |
| RHEL | CSAF/VEX vendor data after first Ubuntu slice works | OSV aggregate convenient for RPM advisory queries; OVAL useful existing ecosystem but maintenance status argues against new OVAL-only architecture | Product/repository stream, NEVRA and entitlement have to match |
| Windows | MSRC advisory data + Windows servicing applicability collected from an authorized endpoint | Generic CPE alone is cheaper but cannot reliably handle builds, installed/superseding cumulative updates or feature state | Time-box two-day spike on one Windows build; if blocked provide inventory/manual recommendations until term2 |
| OSS dependencies | OSV query/cache for explicitly selected ecosystems; preserve GHSA and other IDs | GHSA repository gives curated OSV records, attribution and Git history; neither replaces firmware/OS-specific advisories | API/package data sent externally can reveal software inventory; locally cache appropriate public data for sensitive deployments |
| Identity | Internal UUID + external IDs + typed links; purl for packages, CPE/vendor identity for platforms | CVE primary key excludes non-CVE findings; all text names cause collisions; purl-only cannot identify every appliance | `aliases` is equivalence; `related` and `upstream` must not merge identities |
| Applicability | Vendor-aware rules on fresh authenticated inventory; explain evidence + uncertainty | Fuzzy matching increases candidate recall but raises false positives; LLM matching useful proposal only; exploit validation is unnecessary and unsafe as universal proof | False negatives from wrong distro, branch, build, epoch, config; unsupported semantics become unknown |
| Product statements | Trusted scoped VEX assertions plus inventory | Blind VEX suppression is simple but unsafe; ignore VEX and false positives persist | Require publisher/product/version/context matching and reconsider after changes |
| Prioritization | Explainable rule bands with separate CVSS, KEV, EPSS, exposure, criticality, fixability | SSVC decision-tree concepts can guide policy; learned ranker needs reliable local labels; weighted score might be a benchmark but not calibrated risk | Missing signals stay missing; deadlines are internal policy, not copied legal mandates |
| Freshness | Proposed two-hour checks, daily bulk EPSS, continuous changed-record queue; preserve proposal24h goal | Nightly refresh simpler but little recovery margin; 2–3days relaxes original24h goal; retraining everyCVE wastes effort | “Known to assistant” and “reliably assessed on asset” are distinct milestones |
| Storage | Canonical structured records + immutable raw revisions + derived search index | Vector-only loses exact joins/ranges and audit; keeping every upstream byte forever grows storage | Content-addressed compression, bounded retention policy, backup/replay; data must be reconstructible |

The strongest approach is hybrid: official identifier backbone + vendor applicability + threat evidence + local business context. None is a substitute for the others. Start with one supported Ubuntu lab release and prove depth; design adapter interfaces for Windows/RHEL/appliances without pretending those adapters already work.

## Contracts to agree with Omar and Amr in the first week

`InventorySnapshot`: asset_id, observation_id, collected_at, collector_version, method, os/vendor/product/release/build/edition/architecture, packages [{ecosystem,name,binary_name,source_name,version,arch,repository}], services, firmware, evidence_refs, unknown_fields. IP is an observation, not sole identity. Snapshot freshness is explicit.

`AdvisoryAssertion`: internal_advisory_id, external_id, relationship_type, source_document_revision, product identity, range semantics, affected/fixed/unaffected/under-investigation status, authoritative_score_vectors, remediation references, publication/update times. A multi-CVE patch advisory links to multiple vulnerabilities; it is not one equivalence cluster.

`AssessmentResult`: asset_snapshot_id, advisory_revision, engine_version, state, reason_codes, matched_product, rule_id, comparisons, evidence_refs, gaps_to_collect, evaluated_at. Keep an append-only history plus current materialized result. `unknown` cannot silently become `not_affected`.

`KnowledgeChanged`: stable event_id, source_id, previous_revision,new_revision, changed_fields, affected_product_keys, emitted_at. Consumers are idempotent. Changes to raw text are different from changes to affected versions, patch, or exploitation evidence.

`RemediationCandidate`: vendor-authoritative fix/migration/mitigation, target scope, prerequisites, support/entitlement constraints, source revision, validation requirements. Runner preflight checks actual installability. Neither AI text nor an HTTP download success is patch approval.

## Source restrictions and maintenance risks

- CVE redistribution permits reuse with required MITRE copyright/license notices. Preserve them in exports and notices. [DS20]
- Red Hat and GitHub Advisory data are CC-BY4; provide attribution and original links. OSV's program license does not automatically grant rights for all upstream records. [DS05, DS09]
- FIRST API currently documents 1000 requests/minute. Prefer one daily bulk EPSS file for broad coverage, dated storage and low operational load. Handle429 and temporary blocks. [DS13, DS14]
- OSV currently says no API rate limits, but HTTP1.1 responses cap32MiB; use bounded batching/HTTP2 and caching. This is documentation, not an availability or perpetual-free promise. [DS07]
- MSRC client documents no API-key requirement. API version and payload relationships still need a live integration spike. Microsoft client-code license does not itself establish rights to rehost every downloaded document. [DS10, DS11]
- NVD developer page body was unavailable in this research tool. The frequently quoted5/30s and50/30s figures were found only in secondary client material during this pass; **do not mark them freshly verified**. Source register must confirm current direct documentation before configuring production limits. Conservative pacing plus429 handling is valid meanwhile. [DS21]
- For Ubuntu data redistribution and commercial redistribution, record the specific feed terms during D01; an open public endpoint is not enough to infer an unrestricted license. Student local analysis does not require claiming commercial licensing has been cleared.
- CVE upstream refresh interval is approximately seven minutes, not a contractual guarantee of every advisory's prompt publication. Publication may be delayed, incomplete or amended. [DS01]
- No CVE/advisory source can reveal every undisclosed vulnerability. No result means no known supported match, never proof of security.

## Hard cases the team should demonstrate

1. New CVE arrives without score/CPE/fix → show record and evidence gaps; do not invent a verdict.
2. Upstream version appears old but distro backport installed → vendor package comparison resolves fixed, with evidence.
3. Same package name in two ecosystems → distinct identity.
4. Windows patch KB absent but superseding cumulative update installed → no naive false-positive.
5. One vendor advisory fixes five CVEs → one patch candidate, five linked vulnerability identities.
6. GHSA without CVE → still tracked; EPSS unavailable rather than zero.
7. Advisory is withdrawn or CVE rejected → stale retrieval output invalidated and historical finding retained with revised status.
8. Vendor and generic assertions conflict → expose conflict and exact product applicability instead of silent last-write-wins.
9. Offline device imported manually → last-observed timestamp; unknown current state; local collector does not require public Internet exposure.
10.48h source outage followed by bulk changes → visible stale health, replay/catch-up and bounded reassessment queue.
11.Untrusted advisory text contains instructions to the assistant → treat as data; no privileged tool execution.
12.VEX from wrong product or stale SBOM → cannot suppress a finding.

## Academic and product evidence

Proposed research question: Does vendor-aware, change-triggered reassessment reduce false positives and time-to-correct-decision compared with naive version matching and periodic full reassessment, without reducing supported-scope recall?

Use frozen source revisions and independent labels; compare equal cases, not different inventories. Report precision, recall, unknown rate, per-family results, processing cost, new-record freshness and changed-record reassessment lag. Keep hard negatives and missing-evidence cases. The proposal90% detection goal refers to known vulnerabilities intentionally in a controlled supported test environment, not90% of the world's devices/CVEs. Distinguish classification metrics from vulnerability detection metrics.

A fresh CVE must be stored, searchable and linked to affected existing assets when sufficient evidence exists. The original24h requirement should remain visible; percentage meeting24h and p95/max are measurement clarifications, not permission to quietly replace the original target. Alert on misses. A2–3day window may be a measured fallback under failure, not silently the new promise.

Near-term demonstration by23Oct2026 (provisional internal date): Shams explains a sampled CVE+Ubuntu source contract, license/status differences, and normalized fixture; Mahrous explains affected/fixed/unknown decision traces on vulnerable versus backported package; both show dependency handoff to Amr inventory and Omar API. This is achievable evidence of ownership, not a demand to finish16 workpackages in a week.


---

# Cybersecurity collection and patch implementation plan
Research date: 2026-10-14. These are researched recommendations and implementation gates, not implemented capabilities. Hardware, exact lab OS versions, licences and authorization for any external environment remain unconfirmed. Sources are in cyber_sources.json. IDs C01–C16 below are local work-package IDs; cross-workstream dependencies are descriptive contracts until integrated into the master DAG.

## Decision: combine bounded discovery and authenticated evidence
Recommended first vertical slice: independent Nmap installation in an isolated Linux lab runner for bounded discovery, plus an allowlisted SSH collector for Ubuntu package/OS evidence. Treat banners as hints. For Windows, compare an osquery export versus Wazuh Syscollector in a small spike; choose one primary inventory adapter, not two simultaneous agent rollouts. If Wazuh is already deployed, reuse Syscollector to avoid another agent; otherwise osquery offers a smaller SQL inventory dependency but the team owns secure transport/enrollment. Normalize all adapters to the same observation schema. No scanner is universal. [CY-S01, CY-S02, CY-S08–CY-S11]

Alternatives:
- Nmap: mature network discovery/service observations; no local installed-package proof; active probes can affect fragile devices. NPSL is not a normal permissive licence; commercial embedding/redistribution needs separate review. Npcap has its own redistribution restrictions. Independent installation in the student lab avoids packaging it into the product but does not settle all future commercial integration questions. [CY-S01]
- Native SSH/WinRM inventory: small scope and controllable fields; strongest fit for the first demonstrator. Cost is platform-specific parsers, identity, privilege management and coverage maintenance. Prefer structured native outputs rather than shell text matching. WinRM has separate Python dependencies and authentication/encryption configuration. [CY-S05]
- osquery: cross-platform SQL querying and Apache-2.0 OR GPL-2.0-only choice; useful inventory, not a universal vulnerability scanner or patch manager. Validate table availability per OS, privileges and packaging; a query interface alone does not provide a secure fleet transport. [CY-S09, CY-S10]
- Wazuh Syscollector: already covers hardware, OS, packages, ports/processes and Windows updates, with a platform compatibility matrix. Strong reuse if SIEM already exists, but deploying manager/indexer/dashboard simply to obtain inventory adds operations and resource burden. Only request fields needed by this project. [CY-S08, CY-S11]
- Greenbone Community: mature vulnerability test coverage and useful independent comparison, but several services, feed synchronization and additional operations. Official container guidance gives minimum 2 cores/4 GB/20 GB and recommended 4 cores/8 GB/60 GB, and says that guide is not intended for production. Make optional lab comparison after measuring available capacity; do not make first-term core depend on it. Inspect component and feed licences separately before distribution. [CY-S07]

## Coverage is a matrix, not an all-devices promise
| Asset class | First evidence path | Limitation / honest output | Execution scope |
|---|---|---|---|
| Ubuntu lab VM, pinned supported release | SSH read-only OS/packages + repository metadata | Package inventory cannot prove all runtime configurations; preserve distro release and full package revision | First automated patch adapter |
| Windows lab VM | Authenticated native or chosen agent inventory; update applicability search | Build, edition, architecture and update history matter; installed KB lists alone are incomplete vulnerability proof | Second adapter after reboot/connection spike |
| Other Linux distributions / macOS | Vendor-native or agent export | Every family needs separate version semantics and advisory mapping | Inventory/import first; no implied patch support |
| Routers, switches, firewalls | Vendor API or read-only SNMPv3/SSH where supported | Need exact model, firmware train, hardware revision and licensed downloads; MIB/API differs | Vendor-specific manual plan unless tested adapter |
| Printers and cameras | Vendor inventory, approved limited probes | Fragile services and hidden firmware. Nmap skips version probes on TCP 9100 because some printers print probe data | Manual/vendor workflow |
| OT, PLC, medical, legacy fragile devices | Owner/vendor-approved passive inventory or offline export | Safety, availability and proprietary protocols constrain scanning; passive visibility can be incomplete | Excluded from generic active scan/patch execution |
| Internal devices without internet | Local runner in reachable segment, agent or import | Internet exposure is unnecessary; route/firewall/auth access still required | Offline repositories or approved update path required |
| Air-gapped/offline assets | Signed/hashed export with collection timestamp and operator | Import is historical evidence, not a live scan; no automatic freshness claim | Offline reviewed package transfer; integrity/compatibility controls |
| Non-IP / powered-off devices | Manual register/vendor export | No network scanner can observe a powered-off or non-IP endpoint | Unknown/unobserved, never automatically safe |
| Cloud managed services | Provider API/configuration evidence | Tenant may not control underlying OS patching; network scan is incomplete | Provider responsibility and supported customer changes |
| Containers/images | Image/package/SBOM evidence tied to digest | Host scanning does not enumerate all images and dependencies | Rebuild/redeploy image, not mutate ephemeral container |

These are proposed support boundaries derived from collection mechanisms and OT safety guidance; add a product family only when a real fixture and evidence/acceptance test exist. [CY-S02, CY-S05, CY-S08, CY-S11, CY-S12]

## Decision: build patch orchestration, reuse OS package engines
Use an isolated runner with allowlisted Ansible modules/playbooks calling native package/update mechanisms. Build campaign policy, approvals, exact target manifests, evidence history, durable execution state, failure recovery and verification ourselves. Never let an LLM construct and run arbitrary shell commands. Direct native execution is a fallback if Ansible setup costs outweigh reuse in the spike; it shifts timeout/error/reboot parsing to the team. Building our own package manager provides no academic advantage and adds risk. Commercial endpoint-management integrations can follow after the basic contract works.

Ubuntu first is a scope recommendation because its package/version workflow gives one demonstrable end-to-end family, not a claim that every Ubuntu case is simple. Choose release and test package only after checking supported repositories, advisories and lab resources. Ansible apt supports explicit versions and check mode, but Python dependencies, locks, package holds, dependency changes and service restarts matter. Do not use force or unauthenticated packages; do not silently replace an approved version with latest. [CY-S03, CY-S13]

Windows second: win_updates automates Windows Update, is in a separate collection, uses the configured update service, requires administrator access and can take hours. Automatic reboot can involve multiple cycles; update availability is constrained by configured services and policy. It does not support SCCM. Treat Windows as a separate execution adapter with its own capability declaration. [CY-S04]

Patch lifecycle: applicable finding → candidate fixes/mitigations → compatibility and provenance → dry-run/preflight → immutable approval → canary → deployment batches → reboot/restart → fresh inventory and health verification → closure or recovery → audit/SIEM. NIST treats enterprise patching as planned preventive maintenance, including prioritization and verification, not a download button. [CY-S06]

Operational rules are our proposed design, not guarantees from Ansible: approvals bind asset identity, expected inventory hash, package/update IDs, target versions, window and reboot policy. Expire approvals on material drift. One mutation lease per asset. Retry reads freely with bounds; after lost execution connection mark outcome unknown and reconcile actual state before repeating. Package-manager success is not closure. Check-mode predicts supported changes; it is not proof of compatibility or a reversible transaction. Snapshot/backup is not a universal rollback: firmware, database migrations and unavailable old packages may prevent reversal. Recovery options must be stated per adapter and rehearsed on the lab fixture. [CY-S03, CY-S04, CY-S14]

## Executable work packages
Suggested effort ranges are planning estimates in focused person-hours, not measured productivity. Owners build; reviewer checks the boundary and evidence. Parallel work starts after the shared contracts exist.

### C01 — Scope and lab safety contract
Owner Mahrous; reviewer Amr. Phase foundation; 4–6h. Depends: agreed project scope.
Input: device list and available laptop specs. Steps: define owned lab IP ranges and exclusions; tag asset classes; write read-only versus mutation permissions; create stop/timeout policy; define evidence retention and secrets boundaries. Output: lab-scope.yaml + capability matrix. Acceptance: out-of-scope target and excluded device classes are rejected before any connector call; unknown class defaults to no active probe. Risk: IP reuse or hostname resolution changes; fallback: revalidate resolved address against scope immediately before connection. Sources CY-S01, CY-S12.

### C02 — Reproducible lab and ground truth
Owner Amr; reviewer Mahrous. Phase foundation; 8–12h. Depends C01.
Input: hardware inventory and authorized OS images. Steps: create isolated VM/network; record image/version/digest; seed a small known affected and fixed package set plus unknown/backport fixtures; snapshot baseline; document restore. Output: lab manifest and expected labels. Acceptance: another teammate rebuilds one fixture; every seeded expected result has vendor evidence. Risk: insufficient RAM/old packages unavailable; fallback: serialized VMs and versioned recorded evidence, clearly distinguish replay from live scans. Sources CY-S06, CY-S13.

### C03 — Observation and identity contract
Owner Mahrous; reviewer Omar and Amr. Phase foundation; 6–10h. Depends C01; platform contract.
Input: three example asset exports. Steps: define stable asset ID, source-specific identity, timestamps, trust level, OS release, architecture, package namespace/version, firmware model/train; keep raw evidence reference and collection errors; define changed-IP and duplicate handling. Output: observation-v1 JSON schema + fixtures. Acceptance: incomplete data remains unknown; same IP on two identities is not silently merged; all observations preserve provenance. Risk: host identity spoofing; fallback: reconcile against enrolled key/approved identity and flag conflict. Sources CY-S08, CY-S11.

### C04 — Bounded discovery adapter
Owner Amr; reviewer Mahrous. Phase first slice; 8–12h. Depends C01–C03.
Input: allowlisted lab range/profile. Steps: wrap separately installed scanner using fixed argument arrays; enforce time/concurrency limits; collect structured output; normalize host/service hints; support cancellation; preserve raw result. Output: discovery adapter and fixture parser. Acceptance: zero out-of-scope connections in lab controls; timeout produces partial/failed status; no blanket aggressive scripts/allports profile. Risk: banner ambiguity and fragile devices; fallback: discovery-only or approved inventory import. Sources CY-S01, CY-S02.

### C05 — Ubuntu authenticated inventory
Owner Amr; reviewer Mahrous. Phase first slice; 10–16h. Depends C02–C03.
Input: pinned lab Ubuntu and read-only credentials. Steps: verify host key; collect OS release/arch/full installed package revisions and selected services; capture errors; avoid user files and broad environment dumps; normalize. Output: SSH inventory adapter. Acceptance: installed packages match native ground-truth export; expired credentials are an error not empty inventory; secrets absent from logs. Risk: permission gaps or command parsing drift; fallback: signed native JSON/export import. Sources CY-S03, CY-S05.

### C06 — Windows inventory selection spike
Owner Amr; reviewer Omar. Phase first-term research/second slice; 8–12h. Depends C03, available licensed VM.
Input: identical Windows fixture. Steps: compare osquery export and Wazuh Syscollector for OS build, packages, update fields, footprint and permissions; measure collection time; choose one; implement field mapping and missing-field flags. Output: decision record + selected adapter. Acceptance: documented coverage/missing fields and measured resource cost; no agent choice based only on popularity. Risk: image licensing or hardware unavailable; fallback: schema-tested recorded Windows export while labeling live Windows validation pending. Sources CY-S08–CY-S11.

### C07 — Appliance and offline intake
Owner Amr; reviewer Shams. Phase extension; 8–12h. Depends C03.
Input: one vendor export and offline JSON fixture. Steps: define model/firmware fields; import hash/timestamp/operator; validate schema and size; map only supported product identity; surface stale data and requests for missing evidence. Output: import adapter + capability card. Acceptance: unknown firmware remains unresolved; expired evidence never becomes fresh through re-import; imported labels remain distinct from scanned labels. Risk: vendor-specific formats; fallback: reviewed structured manual entry. Sources CY-S02, CY-S12.

### C08 — Applicability and evidence review boundary
Owner Mahrous; reviewer Shams. Phase first slice; 12–20h. Depends C03, C05, intelligence/matching workstream.
Input: vendor affected/fixed ranges and normalized observations. Steps: evaluate exact distro/package semantics; distinguish affected/not affected/unknown; attach source revision and evidence; test backported versions and missing configurations; request minimal missing evidence. Output: assessment-v1 with reason codes and fixtures. Acceptance: seeded supported-family recall and precision reported separately; unknowns counted and not hidden; no vulnerability proof from LLM narrative. Risk: aliases and source conflicts; fallback: unknown plus analyst review, never guessed match. Sources CY-S02, CY-S13; use master intelligence-source register for version matching.

### C09 — Patch intelligence catalog
Owner Shams; reviewer Mahrous. Phase first slice; 10–16h. Depends intelligence ingest and C08.
Input: vendor advisories/repositories. Steps: record fix IDs, affected product range, fixed version, support state, advisory links, prerequisites, restart notes and supersedence where supplied; separate mitigation from patch; version each revision. Output: patch-candidate schema and curated Ubuntu fixtures, Windows follow-up. Acceptance: every candidate points to vendor evidence and applicable platform; newest is not automatically best; no fixed version means no invented patch. Risk: advisory incomplete/withdrawn; fallback: pending/manual mitigation with explicit review date. Sources CY-S06, CY-S13, CY-S04.

### C10 — Campaign policy and immutable approval
Owner Mahrous; reviewer Omar. Phase patch planning; 10–16h. Depends C08–C09 and platform RBAC.
Input: applicable findings and candidate fixes. Steps: calculate candidate set under support/compatibility/window constraints; build target manifest; require scoped approver; expire on drift; define canary and stop thresholds. Output: campaign state machine + policy tests. Acceptance: Auditor/Guest cannot approve/execute; changed asset/version invalidates approval; no approval bypass through assistant tools. Risk: overbroad administrator privileges; fallback: explicit small-scope manual approval and no automatic campaign scheduling. Sources CY-S06; policy design is project recommendation.

### C11 — Ubuntu patch runner
Owner Amr; reviewer Mahrous. Phase first real patch; 14–22h. Depends C02, C05, C09–C10 and durable platform jobs.
Input: immutable approved manifest. Steps: verify identity/freshness/window; acquire asset lease; preflight disk/locks/backup/repository; run allowlisted explicit package plan; persist step outcomes; reconcile on reconnect; never interpolate arbitrary shell. Output: isolated runner adapter and audit events. Acceptance: one intended update on canary; duplicate job does not cause duplicate mutation; timeout yields unknown outcome until reconciliation; unsigned/unapproved artifacts rejected. Risk: package drift after approval; fallback: stop and replan. Sources CY-S03, CY-S14.

### C12 — Reboot and partial-failure handling
Owner Amr; reviewer Mahrous. Phase patch reliability; 10–16h. Depends C11.
Input: controlled failure fixtures. Steps: detect restart need; respect window; record pre/post boot identity; wait for authenticated reconnect; run health checks; retain per-asset/per-step outcome; halt next batch on trigger. Output: resumable state transitions and failure report. Acceptance: runner interruption, target disconnection and one failed asset never become whole-campaign success; operator can resume a safe remaining step. Risk: repeated execution after transport loss; fallback: reconcile-only state with manual recovery. Sources CY-S03, CY-S04.

### C13 — Independent verification and recovery
Owner Mahrous; reviewer Amr. Phase closure; 10–16h. Depends C08, C11–C12.
Input: post-execution observation and health checks. Steps: collect fresh evidence independent of executor's success flag; reevaluate finding; compare running and installed state where needed; perform service checks; close only on sufficient evidence; rehearse rollback/restore for the chosen fixture. Output: verification report and recovery matrix. Acceptance: successful package exit plus failing health remains unresolved; no universal rollback promise; restored old vulnerable version reopens finding. Risk: snapshot loses data or package downgrade unsupported; fallback: tested restore/rebuild or documented forward-fix. Sources CY-S06, CY-S03.

### C14 — Windows patch execution spike and adapter
Owner Amr; reviewer Mahrous. Phase second-term expansion; 14–24h. Depends C06, C10, C12–C13.
Input: approved Windows test update manifest. Steps: validate WinRM encryption/identity and admin boundary; enumerate configured update source; search available updates; select exact approved IDs/KBs; install with bounded reboot policy; capture HRESULTs and per-update state; fresh inventory and health. Output: Windows capability profile and runner adapter. Acceptance: real successful patch/reboot and failure/reconnect scenario; unsupported SCCM route is rejected; long-running job remains visible. Risk: hours-long updates, policy/catalog mismatch; fallback: reviewed manual native-update execution with evidence import. Sources CY-S04, CY-S05.

### C15 — Wazuh evidence integration
Owner Mahrous; implementer Amr with Omar API support. Phase first-term integration; 8–14h. Depends assessment schema and durable event outbox.
Input: normalized assessment/patch events. Steps: emit one JSON object per line to restricted rotating log; configure Wazuh agent localfile collection; verify JSON decoding; add custom rules; test decoder/rule with wazuh-logtest; correlate by asset ID, finding ID and campaign ID; verify external dashboard alert. Output: SIEM mapping + actual ingestion proof. Acceptance: event contains source ID, timestamp, evidence reference, CVE/advisory ID and lifecycle state; replay preserves event ID and cannot inflate project counters; no credentials in exported payload. Risk: duplicate delivery and rotation loss; fallback: durable replay cursor and documented at-least-once semantics, no claim of generic REST ingestion. Sources CY-S15, CY-S16.

### C16 — Coverage, benchmark and handover gate
Owner Mahrous; reviewer Shams; Amr maintains fixtures. Phase every discussion; 8–14h per major release. Depends relevant collection/assessment/patch tasks.
Input: declared support matrix and known lab ground truth. Steps: freeze test version; measure recall/precision/unknown rate by asset family; count scan failures separately; time update/assessment and recovery; compare optional independent scanner results without treating them as truth; publish unsupported cases and runbooks. Output: reproducible evidence bundle and discussion demo. Acceptance: proposal ≥90% detection goal reported only on declared known lab vulnerabilities, with denominator and failure cases; actual SIEM event and one verified remediation demonstrated; no product-wide claims from tiny lab. Risk: cherry-picked demo; fallback: holdout fixtures reviewed by teammate and seeded failure demonstration. Sources CY-S06, CY-S07; thresholds are proposal goals, not verified performance.

## Early caution gates
1. Before framework expansion: measure laptop RAM/disk and one VM + runner. Do not deploy full Wazuh, Greenbone, LLM and all VMs on every laptop.
2. Before automated mutation: prove scope rejection, stable identity, credential isolation, immutable approval and recovery on disposable lab asset.
3. Before promising Windows: perform update-source and reboot spike; inventory success does not establish patch capability.
4. Before public product packaging: review Nmap/Npcap, Ansible collections, Greenbone components/feeds, Windows images and any vendor advisory redistribution terms. Open-source labels alone do not resolve distribution obligations.
5. Before closing findings: independently re-collect and verify health. No fresh evidence means pending verification.
6. Before adding OT: require device-owner/vendor procedure and explicit support validation; OT remains passive/manual in this academic plan.


---

# AI research and delivery plan — 14 October 2026

Status: researched recommendation, not an implemented system or a hardware-validated choice. Historical total project budget is 1,500 EGP; five existing laptops are known, GPU/RAM/weekly capacity are unknown. Costs or latency must not be invented. The proposal remains unchanged.

## Boundary that makes this project credible

Use four cooperating layers: canonical vulnerability/advisory records; deterministic product/version/applicability and policy engines; retrieval of explanatory evidence; bounded language-model explanation/tool interface. A vector hit is evidence retrieval, not proof that an asset is vulnerable. CVE identifiers, package versions, fixed-version comparisons, approval permissions, patch execution and closure state belong to validated code and current inventory, not model memory. A complete AI component still includes the proposal's supervised category/impact/severity experiments, plus retrieval, reasoning presentation, evaluation and operations.

The proposal already targets new records within 24 hours. Preserve that requirement; define source publication, first observed, ingestion, normalization, assessment and retrieval-ready timestamps. Measure lateness rather than quietly substituting a 2–3-day promise. Source polling, revision handling, deterministic reassessment and index invalidation provide freshness; recurring LLM retraining does not. No feed can expose an unpublished CVE. When metadata is incomplete, display known record + missing evidence, not a fabricated affected version. Detailed ingestion is Shams's workstream.

## Decision comparisons

### Supervised classification

Verified: scikit-learn supports multilabel One-vs-Rest and pipelines; its guidance warns that fitting transformations before splitting leaks test data. Sources AI01–AI04. Recommendation: distinguish source-backed labels from model predictions. Category Network/Web/Database/OS/IoT and impact RCE/privilege escalation/disclosure/DoS are potentially overlapping; use multilabel outputs, an unknown state, written inclusion rules and adjudication. This taxonomy is a project design decision, not an official CVE taxonomy. A record with no impact mention is unlabelled, not automatically a negative example.

Baseline 1: majority/keyword rules (transparent lower bar). Baseline 2: word + character TF-IDF with OneVsRest logistic regression or linear SVM; inexpensive, reproducible and inspectable, but wording shift and context can hurt. Candidate 3: frozen multilingual embedding + linear head; tests semantic generalization without training a large model, but may lose exact product distinctions. Candidate 4: a small pretrained text encoder fine-tune only if reviewed labels, GPU/runtime and validation improvement justify it. Prompt-only LLM labels are a weak-label proposal for human review, never hidden ground truth. Do not train an LLM from scratch or claim a customized foundation model merely because its prompt changed.

Severity: source CVSS value/vector/version/provider remains primary; FIRST defines severity using structured metrics (AI05). Keep discrepant provider values with provenance. A separate experimental classifier can estimate missing severity, visibly marked predicted and abstaining when uncertain; do not overwrite official severity or use inferred severity alone to authorize patching. Exclude labels, CVSS numbers, vector strings and explicit severity words from inputs when testing whether description predicts severity; also report an operational task using legitimately available features separately. Evaluate macro/micro/per-label precision, recall, F1, confusion and coverage at the selected abstention threshold. No scientifically justified F1 threshold exists before baseline/label audit; agree the threshold with supervisors after pilot.

### Splitting, cleaning and leakage

Recommendation informed by AI02/AI03: freeze raw snapshot and record revisions, normalize Unicode/HTML without deleting negation, version strings or identifiers, deduplicate exact and near-duplicate advisory text, group aliases/revisions of the same vulnerability before partitioning. Reserve a final chronological holdout of later published records and separately assess unseen product families. Group and temporal constraints must both be honored; choosing TimeSeriesSplit alone does not ensure alias separation. Fit vocabulary/scalers/features on training only. Keep validation for hyperparameters and thresholds, final test locked until decisions freeze. Revisions added after the cutoff must not supply future facts to historical tests. Synthetic examples are labelled as synthetic and used for edge cases, not to inflate real-world accuracy. Pretrained models may have seen old public CVEs; report this contamination limitation and add newly observed post-freeze cases.

### Retrieval storage and search

Verified: PostgreSQL provides full-text search; pgvector supports exact and approximate vectors, with recall/speed/memory tradeoffs and filtering pitfalls (AI06/AI07). Recommendation for the team's relational stack: structured exact CVE/alias/product queries first; English full-text retrieval plus multilingual dense retrieval; merge ranked results with a documented fusion method; optional reranker only after measured improvement. This is a proposed design, not evidence that hybrid always wins. Keep canonical data, source revisions and chunks in PostgreSQL; pgvector stores derived embeddings. Use exact vector search for the initial corpus and measure before adding HNSW. Approximate filtered queries can under-return results; evaluate with scope filters, never remove authorization filters to obtain more hits. A dedicated vector service may fit later high-scale workloads but adds a second security/backup/synchronization boundary now. An in-memory vector index is useful for experiments, poor as the sole durable production record. PostgreSQL English stemming does not provide high-quality Arabic stemming by itself; evaluate Arabic through multilingual embeddings and a simple lexical configuration preserving identifiers.

Embedding candidates: multilingual-e5-small is MIT, supports multilingual queries and truncates beyond 512 tokens; use its documented query/passage prefixes (AI08). BGE-M3 is MIT and offers multilingual longer-context/dense/sparse/multivector options, with greater operational complexity (AI09). Sentence Transformers documents multilingual MiniLM as another economical comparator (AI10). Start E5-small vs lexical-only and BGE-M3 on the same reviewed query set, recording CPU RAM/time, English/Arabic/Arabizi performance and exact identifiers. Do not assume formal-Arabic benchmarks prove Egyptian Arabizi quality. Choose only after local measurements. Chunk by advisory section and version table boundaries, preserve headings/platform/provider/date/URL/hash/revision and source scope; enforce token limits. Never mix fixed-version rows from different product releases. An embedding-model change requires re-embedding with versioned dimensions, not mixing vector spaces. Cross-encoders can rerank candidate pairs but add inference cost (AI11); postpone unless the error analysis shows ranking is the bottleneck.

### Customized assistant and model choice

RAG's research combines parametric models with retrieved memory; it is not a guarantee of factual correctness (AI12). Customize first with a domain schema, curated evidence, approved read tools, task prompts, output validation and bilingual evaluation. Fine-tuning is an optional later experiment for persistent behavior/format failures, not a mechanism for adding every daily CVE.

Realistic local shortlist researched now: Qwen3.5-4B (Apache 2.0; model card has thinking enabled by default and warns about runtime/context memory), Qwen3-4B-Instruct-2507 (Apache 2.0, non-thinking) and Gemma3-4B-IT (Gemma terms and gated acceptance). Sources AI13–AI15. Qwen3.5 is a newer candidate with improved publisher benchmark results, not proven superior on this domain. Its multimodal ability is unnecessary for this text-first product, and latest/nightly runtime instructions must be converted into a pinned, tested dependency set. Qwen3 Instruct is a useful simpler compatibility comparator. Gemma provides another model family but its distinct terms must be reviewed. Do not quote publisher general benchmarks as vulnerability-answer accuracy. Recommendation: no permanent LLM selection until one bounded spike runs the same 60 reviewed questions on available hardware with 4–8K working context, bounded response tokens, non-thinking/direct mode where supported, and a documented quantization. The small context limit is a project experiment; it deliberately does not claim the model's full advertised long-context capability. Record exact model revision, runtime, quantization, RAM peak, latency, correctness and refusal/abstention. llama.cpp supports quantized local inference and hardware backends (AI16); verify the exact selected model/build supports the needed chat template and structured outputs before adoption. Quantized performance is not identical to the original model.

Paid hosted models are an optional comparator behind an adapter, not a budget assumption: they can reduce local hardware burden but introduce recurring spend, privacy/retention, provider availability and rate-limit dependencies. Choose a provider only after current model-specific price/data-policy research and explicit budget allocation; this memo does not select a paid provider. Fallback: deterministic, cited evidence cards and templated explanations remain fully functional without any LLM. A local small model failing quality gates is not a reason to lower correctness standards.

Assistant tools initially: get_asset_summary, list_findings, explain_applicability, retrieve_advisory, compare_approved_remediations, show_source_health. Inputs are typed and checked against the authenticated user's scope server-side. Use a fixed route/tool budget and allowlist, not unrestricted autonomous browsing/SQL/shell. Current facts are fetched on each sensitive question; embeddings are not copied inventories. Drafting a patch plan is separate from authorizing/executing it. Patch approval binds asset state, package plan and evidence revisions; any material change requires review. Explain evidence and uncertainty without exposing internal reasoning traces.

### Security and operations

OWASP states RAG/fine-tuning do not eliminate prompt injection and recommends least privilege, validation and human control for privileged actions (AI17). Treat advisory text/tool output as untrusted data. Authorization precedes retrieval and each tool call; the LLM never receives credentials. Store source URLs/hashes, sanitize generated HTML/Markdown, restrict link protocols, cap tokens/tool calls/time, and avoid private inventory in external prompts by default. Test indirect instructions embedded in advisory text, Arabic instructions, cross-role data requests, fake citations, unsupported patch commands and poisoned version tables. A schema-valid output may still be false: validate identifiers and action state against backend records and evaluate cited passages for support. Do not describe prompt text or a guardrail model as a security boundary.

Operational metadata: model/prompt/retriever/corpus revisions, redacted trace ID, source freshness, tool decisions, latency, abstention and cost counters. Cache keys include user scope and evidence versions; invalidate impacted answers after source revisions. Do not cache a previous user's privileged answer for another user. Feedback is reviewed before becoming labels; no automatic self-training loop on user votes. Keep a reproducible manifest and model license record; download from verified publisher repositories, pin revisions, prefer non-executable weights, and avoid enabling remote code without reviewing its necessity.

## Academic contribution and honest differentiation

Tenable's current official Hexa page describes multi-step agents, scheduled autonomy, human approval/audit and custom workflows via MCP (AI18). Therefore “we add AI/chat/patch approval” is not a defensible novelty claim. Our project can evaluate a narrower contribution: (1) revision-aware explanations showing why an asset's assessment changed, (2) targeted requests for the missing inventory evidence that would resolve an uncertain match, (3) remediation alternatives constrained by maintenance windows/support/compatibility, with verified closure. These are research hypotheses, not established features absent from every competitor. Evaluate against transparent project baselines; compare to a commercial product only if legally available access and equivalent configuration/data permit it. Do not promise to beat Tenable at scale or coverage.

Use a frozen query bank with known supporting source revisions: exact CVE lookup, package backport, unsupported/EOL product, disputed providers, missing inventory, new/rejected advisory, no patch, reboot and maintenance constraints, Arabic/English/Arabizi, permission denial. Pilot 60 questions; expand to 120–200 reviewed questions when capacity allows. Numbers are planning targets, not statistically established sample sufficiency. Two reviewers score correctness, citation support, actionable steps, uncertainty and harmful recommendations; adjudicate disagreements and report agreement. Separate source-grounded fact accuracy from user-rated clarity. Proposal's ≥90% clear/actionable target remains; add critical-error count and factual support rates, do not claim 90% usability means 90% security correctness. Aim for zero unsupported privileged actions in the test suite; it is a release gate, not proof of universal safety.

Ablations: lexical vs dense vs hybrid; hybrid with/without reranker; model without retrieval vs retrieval (safe offline test only); static corpus vs revision-aware retrieval; generic missing-data message vs targeted next evidence. Measure retrieval Recall@5/10 and MRR/nDCG on judged candidates; answer support/citation validity, abstention utility, task completion time and latency. Avoid using an LLM judge as the sole ground truth. Report dataset sizes, class frequencies, failures, confidence intervals where appropriate, hardware and frozen commits. Small convenience user studies support exploratory findings, not broad superiority claims.

## Early gates

By next-week internal role review: Hams delivers taxonomy v0, 30–50 double-reviewed pilot labels, one CPU baseline script, ten grounded question fixtures and hardware inventory/spike plan. Shams reviews source provenance and labels; Mahrous reviews security semantics; Omar provides typed fixture API and assistant response contract. These outputs demonstrate suitability and expose training needs. They do not require waiting for a finished platform.

First-term minimum: reproducible classification baseline, exact/lexical retrieval plus a measured dense candidate, current-source explanation cards, one bounded assistant path if it meets quality gate. Second term: expanded labels/query bank, stronger model/reranker/fine-tuning only if justified, risk-aware remediation comparisons, adversarial and human evaluation, research ablations. Core inventory/matching/patching must remain usable while AI is unavailable. Ownership and executable packages are in ai_tasks.json; references are in ai_sources.json.


---

# Platform research and executable plan

Researched 14 October 2026. Recommendations below are project-specific engineering judgments grounded in the linked official sources; they are not vendor promises or implemented features. Omar's framework proficiency, laptops, weekly hours, university calendar and paid budget remain unverified. The proposal's 1,500 EGP is historical total project budget, not evidence that recurring cloud/GPU spending is affordable.

## Decision register

### P-D01 — Start the platform now, with one working vertical slice
Recommendation: Omar owns contracts, persistence, authorization and a minimal asset→evidence→assessment screen immediately. Allocate provisionally 75% platform foundation/integration and 25% helping Hams expose and consume AI contracts during the first fortnight; adjust after the skills spike. This is a planning estimate, not a researched universal ratio. Do not wait for a finished classifier or complete scanner: fixture payloads implement the same versioned contracts as real adapters. A mocked UI alone does not prove integration; by the first discussion one real asset observation must cross API→database→assessment→UI. Why Omar: user-confirmed platform experience; not a claim he already knows FastAPI or React. Hams owns experiments, Omar owns production integration. Reviewers are Mahrous for authorization/assessment, Amr for collectors and Shams for source provenance.

### P-D02 — Modular Python backend, separate workers and privileged runner
Recommend FastAPI as a conditional default: OpenAPI/JSON Schema and Python type-based validation fit the AI/data integration boundary [SRC-P01]. Compare Django: built-in accounts, groups, permissions, cookie sessions and admin reduce authentication/admin implementation, but object permissions and login throttling still need deliberate work [SRC-P02]. Django + a documented API layer is the strongest fallback if Omar is materially more effective with it. NestJS supplies structured TypeScript modules/guards and suits a strong TS team [SRC-P03]; here it adds a Python service boundary for ML and most collectors. Do not claim FastAPI is automatically more secure or faster for this workload. Gate: Omar implements one validated asset endpoint, migration, authentication seam and test in at most two focused working days. If framework learning dominates, use the proven team option and retain the contracts.

One codebase with modules inventory, intelligence, assessment, campaigns, identity, AI gateway and integration is a recommendation to control five-person coordination cost. Workers may be separate processes using the same domain package; this is not an initial microservices program. Split privileged scan/patch execution from the internet-facing API and LLM regardless. Microservices become justified by measured independent scaling or a required trust/deployment boundary, not by drawing more boxes. Neither API nor assistant receives arbitrary shell execution. [SRC-P01,SRC-P19,SRC-P22,SRC-P23]

### P-D03 — React + TypeScript + Vite for the authenticated dashboard
React's own documentation permits a build-tool route but highlights that routing/data-fetching choices remain your responsibility [SRC-P04]. Vite supports the build pipeline [SRC-P05]. Recommend this bounded SPA because the main experience is private dashboards and job progress with an existing Python API; same-origin deployment reduces cross-origin configuration. Next.js can render statically or on a server [SRC-P06], and is preferable if public SEO content/server rendering becomes central or Omar already knows it well. Its server capabilities are extra operating surface if unused; static-export features have limitations. Do not call Next.js inherently insecure. Gate: keyboard-accessible asset table, detail route and pending/error/empty states using the real API contract. Choose maintained router/data-fetching packages only after a small current dependency review; do not freeze a library list from familiarity alone.

### P-D04 — PostgreSQL relational core + JSONB evidence; conditional pgvector
Normalize entities and foreign keys; retain vendor/raw records separately with source/revision/hash. JSONB supports flexible indexed fields but is not a reason to put the entire product in one JSON column [SRC-P07]. MySQL has a capable native JSON type [SRC-P08]; reject the false claim it cannot store this data. PostgreSQL is recommended because the relational asset/advisory/finding workflow, row policies and optional pgvector can live in one database. MySQL is a valid alternative if team operations are much stronger there, with retrieval isolated behind an adapter.

pgvector provides exact and approximate search alongside ordinary SQL [SRC-P09]. Begin retrieval evaluation with exact identifiers, metadata filters and lexical search; add embeddings only when Hams shows benefit. Approximate indexes can reduce recall, and filters interact with ANN retrieval; measure recall after authorization/vendor/version filters. Qdrant is a specialized vector alternative with filtering and a separate service [SRC-P10]; choose it only after measured corpus/index/concurrency requirements exceed the simpler design. It adds synchronization, backups and security configuration. RAG remains a derived index, not the authoritative CVE/applicability database. Keep embedding model/version/dimension in records; reindex on model changes.

Use SQLAlchemy transaction-scoped sessions and Alembic reviewed migrations if FastAPI is selected [SRC-P25,SRC-P26]. Django ORM/migrations would replace these if Django wins; do not run both ORMs without a specific need. A schema change needs upgrade verification and a recovery plan; down migrations cannot recreate deleted data. App roles must not connect as superuser or table owner if relying on PostgreSQL row policies [SRC-P11]. First version can be single-organization with explicit scope checks; do not market it as tenant-isolated SaaS until cross-tenant tests pass.

### P-D05 — Durable job ledger/outbox + Celery broker; benchmark RabbitMQ first
FastAPI background tasks execute in-process and its docs suggest larger tools for heavy work [SRC-P12]. They are unsuitable as the sole durability mechanism for scan, ingest or patch workflows. Recommend a PostgreSQL job/attempt ledger and transactional outbox as business truth. Celery + RabbitMQ is the first broker candidate; Celery supports RabbitMQ and Redis as stable transports, with SQL databases available for durable result storage [SRC-P13]. Use small messages containing job IDs, not asset credentials or full evidence.

RabbitMQ acknowledgements and publisher confirms address different delivery legs; they do not create exactly-once side effects [SRC-P14]. Celery retry/late acknowledgement also requires idempotent design [SRC-P15]. Redis is simpler if already needed but Celery documents visibility timeout redelivery and scheduling caveats [SRC-P16]; Redis 8+ license choices are AGPLv3/RSALv2/SSPLv1, not a blanket BSD claim [SRC-P17]. RQ is attractive for simpler Python jobs [SRC-P18], but application approval/attempt/evidence logic is still required. A PostgreSQL-only queue avoids a broker and SKIP LOCKED supports queue-like consumers [SRC-P20], but makes the team responsible for leases, recovery, fairness, retries and operations. It is a deliberate small-demo fallback, not a trivial reliable queue.

Gate: kill worker after claiming a task, restart broker, lose callback, submit duplicate request and test two workers. No lost business job; no repeated patch effect. Non-idempotent execution with uncertain completion becomes UNKNOWN/RECONCILE, never blindly retry. Enqueue short dispatch work; record long maintenance windows in PostgreSQL and recheck approvals at dispatch. If RabbitMQ resource/learning cost fails the actual laptop spike, use simpler durable dispatch with the same ledger; document the limitation. Do not add Kafka or Kubernetes to solve a workload not measured yet.

### P-D06 — Browser session + server-side permissions; OIDC seam
Recommend opaque, revocable server-side session identifiers in Secure/HttpOnly/SameSite cookies for the same-origin dashboard, with CSRF protections for mutations, rotation and expiry. Use established authentication/session components, not custom cryptography [SRC-P21]. JWT is a token format, not an authorization model; long-lived browser localStorage tokens complicate theft/revocation. For external API clients/collectors, separate scoped short-lived credentials and rotation, not a reused human admin session.

Keycloak/OIDC offers centralized identity and standard flows [SRC-P24], appropriate when campus SSO, federation or multiple apps are required. It adds a server/database/configuration burden for five laptops; keep OIDC-compatible identity boundaries and adopt when justified. If application-auth implementation cannot meet reviewed security gates, Keycloak becomes preferable despite cost. No automatic assumption that rolling our own accounts is safer. Four confirmed roles: Administrator configures users/scopes; Analyst runs permitted scans and proposes remediation; Auditor reads allowed reports; Guest sees explicitly limited sanitized views. Patch approval/execution is a separately assigned permission and can require distinct proposer/approver. Deny by default, authorize every request and object; retrieval/tool calls inherit the same scope [SRC-P22].

### P-D07 — Separate execution authority and secrets
Runner pulls approved, typed jobs over an authenticated channel; use target IDs validated against authorized lab scopes, allowlisted adapter operations, bounded timeouts and resource limits. Do not interpolate a user's command or LLM output into a shell. Revalidate asset identity, target fingerprint, approved plan hash, expiration and current state immediately before mutation; changed evidence invalidates approval. [SRC-P23]

Credentials remain on the runner/secret store boundary wherever possible. API stores references, never returns cleartext secrets. Docker Compose secrets mount per-service files [SRC-P27]; this is not an encrypted vault or automatic rotation. Restrict host file permissions, keep secrets outside git/images, rotate/revoke after demos, and record access without values. Product-scale external secret manager is a later evaluated integration, not a claim that .env is sufficient [SRC-P28]. No Docker socket mount into the web API. Human approval is necessary but insufficient if the underlying target or plan changed.

### P-D08 — Compose on a Linux host; measured capacity and explicit backup
Docker documents single-server Compose deployment [SRC-P29]. Recommend a Linux lab host/VM with Compose profiles so DB/API/worker can run separately from expensive model/SIEM services. Do not require every student laptop to run the whole stack. Windows/macOS development is possible, but privileged network collection and VM networking need an early lab test. Docker Desktop education use is currently free under stated conditions; product/company use has separate conditions [SRC-P30]. Kubernetes offers cluster production management with additional control-plane, availability and security responsibilities [SRC-P31]; no known project requirement justifies that overhead now.

Do not invent RAM or cloud-price guarantees. Inventory actual RAM/CPU/storage/virtualization; measure cold start, typical job, peak ingestion and index build. Budget core demo around existing equipment and cached fixtures; cloud/paid LLM only after a current quote and spend cap. Keep a minimal offline demo profile plus a recorded fallback, clearly distinguish stale snapshot from live intelligence.

Initial raw evidence storage: private filesystem adapter on the single host, opaque content identifiers, metadata/hash/retention in PostgreSQL, size limits, no executable uploads and authenticated downloads. It is not scalable shared object storage. An S3 adapter is the future boundary if multiple hosts justify it. Do not select legacy MinIO by habit: its official repository says archived 25 Apr 2026 and no longer maintained [SRC-P32]. Its successor/commercial products are separate decisions, not automatically equivalent free replacements.

Back up DB, raw evidence, configuration and recovery keys as a consistent set. PostgreSQL documents SQL dumps, filesystem-level backup and continuous archiving [SRC-P33]; choose dump+evidence manifest for small demo, evaluate PITR for product deployment. Proposed demo targets RPO 24h and RTO 2h are assumptions to test, not existing guarantees. Restore onto a clean host before each discussion; snapshots on the same disk are not sufficient disaster recovery.

### P-D09 — Evidence-first operations and SIEM handoff
Structured events include event_id, correlation/job/attempt IDs, schema_version, actor, asset, advisory, evidence reference, severity/risk reasons, observed_at and status. Transactional outbox records state change and outbound event atomically; dispatcher retries with deduplication. Delivery acknowledgement is distinct from SIEM parsing/correlation success. Wazuh transport/decoder details belong in the collection integration memo; do not assume the Wazuh management API is a generic event ingestion API.

Application audit records and operational logs have different audiences and retention. Exclude passwords, raw tokens and unnecessary sensitive inventory from logs [SRC-P34]. Start with counters: ingestion lag, last success, failed source count, queue age, unknown findings, runner heartbeat, patch unknown/failure counts, assistant citation coverage, API latency and disk. OpenTelemetry provides Python instrumentation and traces [SRC-P35]; add collector/backend when troubleshooting distributed calls warrants it. A huge monitoring stack is optional, but fault visibility is core. Protect audit integrity; a database administrator can still alter ordinary audit tables, so do not claim immutable evidence without additional controls.

## Concrete work packages — Omar accountable, team integration explicit

Effort ranges are focused person-hours, provisional and exclude meetings/exams. No package is finished merely because its UI exists. Dependencies refer to P01–P16 below, not source IDs.

| ID / phase / effort | Input → executable steps → output | Reviewer / dependency | Acceptance / risk / fallback |
|---|---|---|---|
| P01 Scope and skills spike / now / 4–8h | User flows and role proposal → inventory Omar's actual skills and hardware; implement one candidate API and DB migration; compare learning friction → stack ADR and measured environment sheet | Mahrous / none | Reproducible endpoint and written reason for choice; fallback Django or proven stack with same contracts |
| P02 Contracts / now / 6–10h | Sample source/collector outputs from Shams/Amr → define AssetObservation, AdvisoryRevision, Assessment, Job, PatchPlan and error JSON schemas; agree enums and timestamps; publish fixtures → OpenAPI v0 and versioned fixtures | All / P01 | Every owner can produce and consume a fixture; no ambiguous safe/unknown state; incompatible change requires version |
| P03 Schema / now / 8–16h | P02 → design ERD and unique keys; add source revisions, asset snapshots, findings, job attempts, approvals, audit/outbox; run migration and seed → schema v1 | Mahrous + Shams / P02 | Duplicate source record is idempotent; finding links exact input revisions; migrations repeat from empty DB; avoid all-in-one JSON |
| P04 Identity and permissions / early / 10–18h | Role matrix → select session component; implement login/logout/revocation, CSRF and object scope; exercise four-role matrix → auth module and negative tests | Mahrous / P03 | Guest cannot export private evidence; Analyst cannot grant self admin; revoked session fails; fallback identity provider if gate fails |
| P05 UI foundation / early parallel / 8–14h | P02 fixtures → implement responsive asset list/detail, loading/error/unknown/stale states, keyboard focus and RTL; replace fixture API gradually → minimal dashboard | Shams / P02 | Screen distinguishes missing evidence from no finding; actual API replaces mock without redesign; avoid polishing dozens of empty pages |
| P06 First real slice / before discussion 1 / 8–16h | One real authorized asset observation + one advisory → API ingest, persist, call Mahrous matching interface, show source/evidence/decision → runnable slice and recording | Amr + Mahrous / P03,P05 | Trace one displayed decision to source revision and observation; fixture label cannot masquerade as live result |
| P07 Durable jobs spike / early / 10–18h | Scan/source task contract → ledger/outbox, broker worker, lease/heartbeat, cancellation/timeouts, dedup keys; inject crash → selected job transport ADR | Amr / P03 | Duplicate request yields one logical job; restart loses no business state; uncertain side effect is reconciled not blindly repeated |
| P08 Adapter boundary / first term / 8–16h | Collector APIs + scopes → register signed/authenticated runner identity; typed allowlist job envelope; validate results and secret references → runner gateway | Amr + Mahrous / P04,P07 | Out-of-scope target rejected on API and runner; API cannot invoke arbitrary shell; expired runner credential fails |
| P09 Knowledge/source health / first term / 8–14h | Shams ingestion metadata → endpoints for freshness/revisions/failures; show source missing fields and changed assessments; paginate/filter → knowledge status interface | Shams / P03,P05,P07 | Interrupted ingestion shows stale timestamp and retry status; no artificial freshness update when fetch fails |
| P10 Findings and prioritization / first term / 8–16h | Mahrous assessment/risk output → asset/advisory drilldown, status transition checks, evidence timeline and revision comparison → triage workbench | Mahrous / P06,P09 | Analyst sees why prioritization changed; unknown and not-affected remain distinct; exports enforce same scopes |
| P11 AI gateway / first-term baseline then deepen / 10–20h | Hams retrieval/answer schema → permission-scoped read tools, citations, timeout/cost limits and model adapter; handle refusal/missing evidence → assistant UI and gateway | Hams + Mahrous / P04,P10 | Unauthorized asset cannot be retrieved; every factual response exposes provenance or uncertainty; fallback structured template if model unavailable |
| P12 Patch campaigns / first-term design, term2 expand / 12–24h | Mahrous plan policy + Amr runner → versioned plan, prechecks, proposer/approver, expiry, scheduling, canary batches, pause and verification UI → campaign state machine | Amr + Mahrous / P08,P10 | Changed target/plan invalidates approval; success requires postchecks; reboot-pending/unknown explicit; rollback not falsely promised |
| P13 SIEM outbox / first term / 8–14h | Event schema and supported Wazuh input → outbox dispatcher, retry/dedup, decoder fixture, observed integration → searchable correlated event | Amr / P07,P10 | Real event appears parsed in SIEM with same ID; duplicate dispatch doesn't become duplicate business finding; fallback local signed export is disclosed, not claimed integration |
| P14 Deployment/restore / first term / 10–18h | Known laptop specs → Compose minimal/full profiles, healthchecks, private ports, secrets mounts, TLS boundary and backup manifest; restore clean → runbook and release bundle | Amr / P04,P07 | Teammate starts documented demo; restore recovers linked evidence; disk/resource limits visible; no secrets in bundle |
| P15 Security and fault evaluation / continuous then gates / 12–20h | Threat model + all modules → object authorization tests, input/command injection tests, denied runner actions, duplicate jobs, corrupt source and stale embedding tests → evidence report | Mahrous + Hams / P08,P11,P12 | No critical known authorization/unsafe execution issue at demo gate; all accepted residual risks documented; not a claim of comprehensive penetration certification |
| P16 Performance, accessibility and handover / term2 / 10–20h | Measured usage scenarios → benchmark declared asset/CVE counts, pagination/indexing; test keyboard/RTL; publish limitations, dependency/license inventory and operator docs → final release + reproducible benchmark | Shams + all / P10–P15 | Fresh teammate reproduces demo and benchmark; results state hardware/dataset; no invented enterprise-scale promise |

## Next-week Omar brief
By provisional 23 October: P01 complete, P02 schema examples agreed, P03 first migration, P05 one screen scaffold. Show faculty: a real API request and persisted record, role matrix, the dependency diagram, and which AI input/output is agreed with Hams. Do not promise all P03/P04 production hardening by this date. Platform work does not consume all AI capacity; early integration support is essential work.

## Architecture challenge / early stop conditions

1. If the laptop cannot run DB/API/worker alongside model/SIEM, split profiles across available machines before UI expansion. No unapproved cloud assumption.
2. If two modules disagree on identity/version semantics, stop feature work to repair P02; UI strings cannot repair corrupted matching semantics.
3. If role tests fail, no external pilot. “Private network” is not authorization.
4. If runner retry can repeat a patch, mutation remains disabled until attempt reconciliation is demonstrated.
5. If patch approval survives changed asset state, fix plan-hash/observation binding before automation.
6. If Hams model is unavailable, structured grounded recommendations and classifier baseline keep the slice useful; do not block all platform progress.
7. If schema and evidence backups restore independently but references break, the backup process fails acceptance.
8. If a single Omar-owned integration blocks everybody, pair one cyber member on contracts and one AI member on client integration; each critical component has a reviewer and handover note.
9. If feature velocity hides source staleness or unsupported devices, expose unknown/stale/unsupported as first-class statuses.
10. If a new dependency is unmaintained, licensing unclear, or cannot be pinned reproducibly, do not quietly add it for a demo. Record a replacement or postpone that capability.

Sources use SRC-Pxx identifiers. Work packages use Pxx identifiers.


---

# عقود التكامل وتصميم التنفيذ المشترك

Status: DESIGN DECISION / proposed v0. These are project contracts to implement and review in P02, not claims that the product already exists. Related decisions: ADR04, ADR08, ADR11, ADR12, ADR13, ADR18, ADR19. Public-source research informs mechanisms; payload names and enum choices below are our design.

## 1. One product, explicit boundaries

Browser → authenticated API → domain modules → PostgreSQL. A background worker consumes durable job IDs. A separately authenticated runner inside an authorized network executes allowlisted collection/patch operations. An inference process receives only authorized evidence and typed read-tool results. SIEM receives sanitized lifecycle events through the supported ingest route. The public planning website is only documentation; it is not a suitable host for privileged network scanning or the full product runtime.

Do not expose PostgreSQL, broker management ports, model server, or runner command endpoint to the public Internet. The exact reverse proxy/TLS/certificate implementation remains a deployment spike, because lab-only versus external pilot is not confirmed. No external pilot before that spike and authorization tests pass. Domain logic does not trust the browser or assistant. Authentication identifies the actor; authorization checks object, action and scope each time.

## 2. Repository and modules

Proposed product repository layout: backend/app/{inventory,intelligence,assessment,remediation,identity,ai_gateway,integrations}; runner/adapters/{ubuntu,windows}; frontend; contracts/v1; fixtures/{sources,inventory,matching,patch,assistant}; experiments; migrations; deploy; docs/{adr,runbooks,evaluation}. This layout is a recommendation, not an existing repository. Keep dependencies pinned with lockfiles. Choose exact supported stable versions after compatibility spike; do not pin an untested latest/nightly release from a website snippet.

Each module owns its model/service interface. API route handlers validate/authenticate then invoke domain logic. Shared contracts are versioned. Breaking schema change requires new version and migration. Fixture producers and consumers run contract tests before integration. Every PR states changed contract, expected behavior and relevant evidence; a reviewer from the consuming module checks it.

## 3. Canonical entities and initial constraints

| Entity | Required data / relationship | Integrity and query rule |
|---|---|---|
| Asset | UUID, organization/scope, owner, criticality, identity evidence, support profile | IP address is an observation; never the only stable identifier |
| Observation | asset, collected_at, method, collector version, raw evidence hash, OS/build/arch/package identities, errors, unknown fields | Immutable snapshot; freshness separate from import time |
| Source / source_revision | source URL, source ID, schema, external revision, fetched_at, source_modified_at, hash, terms link | Unique source+external ID+content hash; old revisions retained per policy |
| Vulnerability | internal UUID plus external IDs | Relationship types aliases/upstream/related are different; non-CVE is valid |
| Advisory assertion | source revision, product/range semantics, affected status, fixed/mitigation references | Multiple providers can disagree; retain both and conflict state |
| Assessment | asset snapshot, advisory revision, engine version, verdict, reason/evidence/gaps | Unique evaluation key; history append-only; current view derived |
| Priority | assessment, policy version, dated CVSS/KEV/EPSS, exposure and business reasons | Missing is not zero; internal priority separate from official severity |
| Patch plan | version, target manifest/hash, source fixes, expected observations, window, prechecks, recovery, reboot policy | One approved plan version; material change invalidates approval |
| Approval | plan hash, approver, scoped permission, time, expiry | API checks actor/action; runner independently checks executable plan validity |
| Job / attempt | logical job ID, idempotency key, operation, state, lease, heartbeat, attempts, result refs | Unique idempotency key; one mutation lease per asset; uncertain outcome reconciled |
| Outbox / audit | event ID, schema, actor, correlation, state change, evidence refs, delivery state | Outbox in transaction with business change; dedup at consumer; no secrets |
| Retrieval chunk | source revision, section/table identity, text hash, scope, embedding model/dimension | Derived and replaceable; stale chunk excluded from current answers |

Start indexes on exact external IDs, asset scope/last_seen, source modified/revision, assessment asset+state, and pending job dispatch. Add text/vector/JSON indexes only for measured queries. Use pagination and bounded exports. Preserve data on migration failure; a down migration cannot recreate dropped evidence.

## 4. API seams (proposed)

| Endpoint / operation | Actor and contract | Result |
|---|---|---|
| POST /v1/observations | Authorized collector/importer; InventorySnapshot | accepted observation ID or field-level validation error |
| GET /v1/assets/{id}/assessments | Scoped user | verdict, reason, evidence refs, freshness, unknown gaps |
| POST /v1/scan-jobs | Analyst within authorized scope; profile ID, target IDs, Idempotency-Key | 202 job ID; never accepts arbitrary command arguments |
| GET /v1/jobs/{id} | Scoped user | logical state + attempt timeline; partial failure visible |
| POST /v1/patch-plans | Remediation proposer; finding IDs + constraints | draft plan with unresolved prerequisites |
| POST /v1/patch-plans/{id}/approvals | Separate approval permission | version/hash-bound approval, expiry and actor |
| POST /v1/campaigns/{id}/dispatch | Authorized dispatcher after fresh policy check | queued execution; no direct browser→runner access |
| POST /v1/assistant/questions | Scoped user; question + selected asset IDs | answer, cited source spans, evidence version, uncertainty, suggested next evidence |
| GET /v1/source-health | Permitted analyst/admin; sanitized subset for others | last success, age, missing fields, failures and next retry |

Use consistent error envelope: code, message, correlation_id, retriable, field_errors. A timeout is distinct from denied, unsupported, source_stale and outcome_unknown. Return safe errors; internal stack traces never become user-facing evidence.

## 5. Worked payload — illustrative, not a real CVE or scan

```json
{
  "schema_version": "assessment.v1",
  "asset_id": "lab-example-01",
  "observation_id": "obs-example-07",
  "advisory_revision": "advisory-example-r2",
  "engine_version": "matching-example-v0",
  "verdict": "unknown",
  "reason_codes": ["MISSING_SOURCE_PACKAGE_VERSION"],
  "evidence_refs": ["evidence-example-03"],
  "gaps_to_collect": ["distribution_release", "source_package_version"],
  "evaluated_at": "2026-10-14T18:00:00Z"
}
```

C01/C03 and D02 define producer fields; P02 publishes schema; C05 and D05 produce independent evidence; D09 consumes both; C08 verifies the handoff; P06 displays the trace. Those are linked tasks, not duplicate matching implementations. C09 validates D14's catalog at the runner boundary rather than building another catalog. A10 and P11 share one assistant gateway implementation.

## 6. State machines and failure semantics

Assessment verdict: affected / not_affected / unknown / unsupported. Evidence freshness: current / stale / unavailable. Finding lifecycle: open / planned / execution_pending / verification_pending / resolved / risk_accepted / reopened. These are separate dimensions: a stale assessment is not “not affected”; a risk-accepted finding is not fixed.

Execution: queued → preflight → running → reboot_pending → verifying → succeeded. Any stage can become failed, canceled-before-mutation, or outcome_unknown. A canceled request does not magically undo a package change. outcome_unknown → reconcile → verified result or manual intervention. Campaign success requires every targeted asset's explicit result; partial outcomes remain partial.

Approval binds plan, target identity, evidence revision, time window and policy revision. Immediately before dispatch, compare current snapshot/target fingerprint. Expired or materially changed plan returns to draft/review. No tool or API path may jump from an assistant draft to execution.

## 7. Authorization matrix to agree before coding

| Action | Administrator | Analyst | Auditor | Guest |
|---|---|---|---|---|
| Manage users / scopes | Yes | No | No | No |
| Run authorized read-only scans | Permission + scope | Permission + scope | No | No |
| Review evidence / triage | Scoped | Scoped | Allowed read-only reports | Sanitized allowed subset |
| Propose remediation | If assigned | If assigned | No | No |
| Approve / execute patch | Explicit additional permission; no implicit LLM delegation | Only if separately assigned by policy | No | No |
| Export sensitive inventory | Explicit scope/permission | Explicit scope/permission | Restricted report export | No |
| Ask assistant | Same underlying data/action permissions | Same underlying data/action permissions | Read-only permitted reports | Sanitized information only |

Two-person approval is a proposed default for mutation in the demonstrator; a documented single-operator lab exception must remain visibly distinct from production policy. Tests should include cross-asset access, revoked session, direct API access despite hidden UI, guessed object IDs and stale plan hash.

## 8. Observability, retention and release gates

Track ingestion lag, enrichment missingness, reassessment age, queue age, failed attempts, runner heartbeat, disk/RAM, unknown assessments, patch recovery, retrieval support and response latency. Each source has an owner and alert rule. Proposed first threshold: warn after two missed intended source polls; the 24h proposal requirement is separately measured and any miss reported.

Retention is a policy gate: no fixed legal retention claim is made. For lab planning, keep a compact immutable evaluation snapshot and all evidence needed to reproduce final reported results; limit noisy raw scans/LLM traces and remove secrets immediately. Record what was deleted, when and why. Before an external pilot decide inventory retention, user consent, access, export and deletion. Back up DB + evidence + keys/configuration as a consistent set; demonstrate restore. Proposed RPO24h/RTO2h must be measured, not assumed.

Release gate at each discussion: tagged commit; package/model/source version manifest; no secrets; known limitations; supported profile matrix; owner and independent reviewer; reproducible benchmark; backup restore; source outage and runner interruption demo. Security review uses selected versioned OWASP ASVS controls and NIST SSDF practices as guides, not a certification claim.

## 9. Future template readiness

Maintain requirements.csv mapping proposal IDs and later additions to tasks, owner, metric and proof artifact. Keep an assumptions log, ADRs, risk register, source licenses and research protocol. For the faculty template, fill the approved formal roster only after the Shams/Shahd discrepancy is resolved. Keep original proposal untouched; a new requirement is marked addition, and a changed target requires supervisor agreement.

Primary references: [OWASP ASVS](https://owasp.org/projects/asvs), [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final), [SEI architecture risk](https://www.sei.cmu.edu/library/managing-architectural-risk-during-agile-development/). Specific framework/queue/security mechanism references are in the platform source register; contracts above are our proposed implementation design.


## Source register

97 reference entries / 94 distinct URLs. Repeated entries preserve workstream-specific references. A public URL does not imply unrestricted redistribution. Source/API terms that could not be directly verified remain implementation gates.

- **DS01** — [CVE List V5 official repository](https://github.com/CVEProject/cvelistV5). Official public CVE records, mixed schema versions and multiple CNA/ADP containers; approximately seven-minute upstream refresh is not an SLA.
- **DS02** — [NIST NVD operational changes 2026](https://www.nist.gov/itl/nvd). Selective enrichment from April; affected/SSVC added June; history payload change August; retain current records and revisions.
- **DS03** — [Ubuntu OSV data](https://documentation.ubuntu.com/security/security-updates/osv/). CVE/unfixed records plus USN/LSN fixes; source package identity and release/channel matter.
- **DS04** — [Ubuntu OVAL data](https://documentation.ubuntu.com/security/security-updates/oval/). Official machine-readable Ubuntu OVAL, useful independent cross-check.
- **DS05** — [Red Hat Security Data](https://access.redhat.com/security/data). CSAF/VEX fixed/unfixed assertions; OVAL maintenance mode; security data CC-BY4.
- **DS06** — [Red Hat backporting](https://access.redhat.com/security/updates/backporting). Upstream-looking version strings do not establish a vendor package is unfixed.
- **DS07** — [OSV API](https://google.github.io/osv.dev/api/). Package/version and batch queries; currently no rate limit; 32MiB HTTP1.1 response limit.
- **DS08** — [OSV schema](https://ossf.github.io/osv-schema/). Version ranges, withdrawn state, aliases and upstream are distinct relationships.
- **DS09** — [GitHub Advisory Database](https://github.com/github/advisory-database). OSV records including GHSA identifiers; CC-BY4; ecosystem scope; database_specific is unstable unless documented.
- **DS10** — [Microsoft security update API](https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API). Microsoft-supported CVRF API client and schema resources; operational endpoint must be spike-tested.
- **DS11** — [MSRC client API-key documentation](https://github.com/microsoft/MSRC-Microsoft-Security-Updates-API/blob/main/src/MsrcSecurityUpdates/Public/Get-MsrcCvrfDocument.ps1). API key no longer required for the documented CVRF client.
- **DS12** — [FIRST EPSS FAQ](https://www.first.org/epss/faq). EPSS is population-level exploitation forecast, not asset risk; no universal threshold; confirmed exploitation supersedes forecast.
- **DS13** — [FIRST API limits](https://api.first.org/). Public endpoints 1000/min;429 backoff;bulk batching preferred.
- **DS14** — [EPSS data download](https://www.first.org/epss/data.html). Daily score files and API; retain score date/model version and attribution.
- **DS15** — [CISA KEV official mirror](https://github.com/cisagov/kev-data). Machine-readable known exploited vulnerability data.
- **DS16** — [CVSS v4 specification](https://www.first.org/cvss/v4.0/specification-document). Severity metric groups and vectors; preserve version/source rather than blending versions.
- **DS17** — [Package URL specification](https://github.com/package-url/purl-spec). Structured package identity including ecosystem qualifiers; not a vulnerability verdict.
- **DS18** — [CSAF2 standard](https://docs.oasis-open.org/csaf/csaf/v2.0/os/csaf-v2.0-os.html). Products, impact status, remediation and VEX profile.
- **DS19** — [CycloneDX VEX](https://cyclonedx.org/capabilities/vex/). Product-specific exploitability assertions augment component inventories.
- **DS20** — [CVE terms](https://www.cve.org/legal/termsofuse). CVE copying/derivatives allowed subject to copyright/license notice reproduction.
- **DS21** — [NVD developer guidance](https://nvd.nist.gov/developers/start-here). Opened but body unavailable to research tool: rate limits and exact terms require implementation-time direct verification; no unsupported quota guarantee.
- **DS22** — [NVD CPE product APIs](https://nvd.nist.gov/developers/products). CPE dictionary and match APIs; CPE candidates need product/context resolution.
- **CY-S01** — [Nmap legal notices](https://nmap.org/book/man-legal.html). NPSL and Npcap redistribution restrictions; scan disruption and authorization concerns.
- **CY-S02** — [Nmap service/version detection](https://nmap.org/book/man-version-detection.html). Service evidence limitations and default exclusion of printer TCP 9100 version probes.
- **CY-S03** — [Ansible apt module](https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/apt_module.html). Explicit versions, check mode, package locks, authentication and downgrade caveats.
- **CY-S04** — [Ansible Windows updates](https://docs.ansible.com/projects/ansible/latest/collections/ansible/windows/win_updates_module.html). Separate collection, admin requirement, update services, reboot handling, long duration and SCCM exclusion.
- **CY-S05** — [Ansible Windows Remote Management](https://docs.ansible.com/projects/ansible/latest/os_guide/windows_winrm.html). WinRM authentication, encryption, certificates and Python dependencies.
- **CY-S06** — [NIST SP 800-40 Rev 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final). Enterprise patch planning and preventive maintenance framework.
- **CY-S07** — [Greenbone Community Containers](https://greenbone.github.io/docs/latest/22.4/container/index.html). Multi-service deployment, hardware requirements and nonproduction scope of this guide.
- **CY-S08** — [Wazuh system inventory](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/index.html). Syscollector inventory fields and collection architecture.
- **CY-S09** — [osquery documentation](https://osquery.readthedocs.io/en/stable/). Operating-system instrumentation and SQL interface.
- **CY-S10** — [osquery licence](https://github.com/osquery/osquery/blob/master/LICENSE). Apache-2.0 OR GPL-2.0-only licence choice.
- **CY-S11** — [Wazuh inventory compatibility matrix](https://documentation.wazuh.com/current/user-manual/capabilities/system-inventory/compatibility-matrix.html). Platform-specific inventory capability validation.
- **CY-S12** — [NIST SP 800-82 Rev 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final). OT security with operational and safety constraints; final publication.
- **CY-S13** — [Ubuntu Security Notices](https://ubuntu.com/security/notices). Vendor security updates and package/release-specific remediation source.
- **CY-S14** — [Ansible check and diff mode](https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_checkmode.html). Simulation depends on module support; does not establish successful deployment.
- **CY-S15** — [Wazuh log-file collection](https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/monitoring-log-files.html). Agent localfile ingestion configuration.
- **CY-S16** — [Wazuh JSON decoder](https://documentation.wazuh.com/current/user-manual/ruleset/decoders/json-decoder.html). JSON event decoding and integration route.
- **AI01** — [Multilabel OneVsRestClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.multiclass.OneVsRestClassifier.html). 
- **AI02** — [Cross-validation groups and time](https://scikit-learn.org/stable/modules/cross_validation.html). 
- **AI03** — [Common pitfalls and leakage](https://scikit-learn.org/stable/common_pitfalls.html). 
- **AI04** — [TF-IDF vectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html). 
- **AI05** — [FIRST CVSS 4.0 specification](https://www.first.org/cvss/v4.0/specification-document). 
- **AI06** — [PostgreSQL full text search](https://www.postgresql.org/docs/current/textsearch.html). 
- **AI07** — [pgvector exact approximate and filtering](https://github.com/pgvector/pgvector). 
- **AI08** — [Multilingual E5 small publisher card](https://huggingface.co/intfloat/multilingual-e5-small/blob/main/README.md). 
- **AI09** — [BGE-M3 publisher card](https://huggingface.co/BAAI/bge-m3). 
- **AI10** — [Sentence Transformers pretrained models](https://sbert.net/docs/sentence_transformer/pretrained_models.html). 
- **AI11** — [Cross encoder usage](https://sbert.net/docs/cross_encoder/usage/usage.html). 
- **AI12** — [Retrieval-Augmented Generation research paper](https://arxiv.org/abs/2005.11401). 
- **AI13** — [Qwen3.5-4B publisher model card](https://huggingface.co/Qwen/Qwen3.5-4B). 
- **AI14** — [Qwen3-4B-Instruct-2507 publisher card](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507). 
- **AI15** — [Gemma3-4B-IT publisher card](https://huggingface.co/google/gemma-3-4b-it). 
- **AI16** — [llama.cpp official repository](https://github.com/ggml-org/llama.cpp). 
- **AI17** — [OWASP prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/). 
- **AI18** — [Tenable Hexa current product description](https://www.tenable.com/products/tenable-one/capabilities/hexa-ai). 
- **SRC-P01** — [FastAPI features](https://fastapi.tiangolo.com/features/). 
- **SRC-P02** — [Django authentication](https://docs.djangoproject.com/en/5.2/topics/auth/). 
- **SRC-P03** — [NestJS documentation](https://docs.nestjs.com/). 
- **SRC-P04** — [React from scratch](https://react.dev/learn/build-a-react-app-from-scratch). 
- **SRC-P05** — [Vite getting started](https://vite.dev/guide/). 
- **SRC-P06** — [Next static exports](https://nextjs.org/docs/app/guides/static-exports). 
- **SRC-P07** — [PostgreSQL JSONB](https://www.postgresql.org/docs/16/datatype-json.html). 
- **SRC-P08** — [MySQL JSON](https://dev.mysql.com/doc/refman/8.4/en/json.html). 
- **SRC-P09** — [pgvector](https://github.com/pgvector/pgvector). 
- **SRC-P10** — [Qdrant](https://github.com/qdrant/qdrant). 
- **SRC-P11** — [PostgreSQL row security](https://www.postgresql.org/docs/17/ddl-rowsecurity.html). 
- **SRC-P12** — [FastAPI background tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/). 
- **SRC-P13** — [Celery brokers](https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/index.html). 
- **SRC-P14** — [RabbitMQ acknowledgements](https://www.rabbitmq.com/docs/confirms). 
- **SRC-P15** — [Celery tasks and idempotency](https://docs.celeryq.dev/en/stable/userguide/tasks.html). 
- **SRC-P16** — [Celery Redis caveats](https://docs.celeryq.dev/en/stable/getting-started/backends-and-brokers/redis.html). 
- **SRC-P17** — [Redis licenses](https://redis.io/legal/licenses/). 
- **SRC-P18** — [RQ documentation](https://python-rq.org/docs/). 
- **SRC-P19** — [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). 
- **SRC-P20** — [PostgreSQL SKIP LOCKED](https://www.postgresql.org/docs/current/sql-select.html). 
- **SRC-P21** — [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html). 
- **SRC-P22** — [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). 
- **SRC-P23** — [OWASP command injection defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html). 
- **SRC-P24** — [Keycloak OIDC](https://www.keycloak.org/securing-apps/oidc-layers). 
- **SRC-P25** — [SQLAlchemy sessions](https://docs.sqlalchemy.org/en/20/orm/session_basics.html). 
- **SRC-P26** — [Alembic migrations](https://alembic.sqlalchemy.org/en/latest/tutorial.html). 
- **SRC-P27** — [Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/). 
- **SRC-P28** — [OWASP secrets management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html). 
- **SRC-P29** — [Compose production](https://docs.docker.com/compose/how-tos/production/). 
- **SRC-P30** — [Docker Desktop license](https://docs.docker.com/subscription-billing/desktop-license/). 
- **SRC-P31** — [Kubernetes production](https://kubernetes.io/docs/setup/production-environment/). 
- **SRC-P32** — [MinIO archive](https://github.com/minio/minio). 
- **SRC-P33** — [PostgreSQL backup](https://www.postgresql.org/docs/current/backup.html). 
- **SRC-P34** — [OWASP logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html). 
- **SRC-P35** — [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/). 
- **G-S01** — [SEI: Managing Architectural Risk During Agile Development](https://www.sei.cmu.edu/library/managing-architectural-risk-during-agile-development/). Risk-driven architecture review; our dates and allocations are planning judgments.
- **G-S02** — [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final). Secure development integrated into lifecycle; not certification.
- **G-S03** — [OWASP ASVS](https://owasp.org/projects/asvs). Versioned verification requirements; choose relevant controls and record test evidence.
- **G-S04** — [PostgreSQL license](https://www.postgresql.org/about/licence/). Permissive PostgreSQL License with notices.
- **G-S05** — [RabbitMQ core license](https://github.com/rabbitmq/rabbitmq-server/blob/main/LICENSE). Core server/plugins MPL2; inspect bundled dependencies separately.
- **G-S06** — [Ansible official repository](https://github.com/ansible/ansible). GPLv3-or-later; collection and redistribution obligations checked per selected version.