import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/cairo'
import { sections, colors, officialLogo, references } from './brand'
import './styles.css'

const paths = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  route: 'M5 8v7a4 4 0 004 4h6a4 4 0 000-8h-2a3 3 0 010-6h4 M3 5a2 2 0 104 0 2 2 0 10-4 0 M17 5a2 2 0 104 0 2 2 0 10-4 0',
  target: 'M22 12a10 10 0 11-20 0 10 10 0 0120 0z M18 12a6 6 0 11-12 0 6 6 0 0112 0z M14 12a2 2 0 11-4 0 2 2 0 014 0z',
  book: 'M12 6C9 3 6 3 3 4v15c3-1 6-1 9 2 3-3 6-3 9-2V4c-3-1-6-1-9 2v15',
  image: 'M3 3h18v18H3z M3 17l5-5 4 4 4-6 5 7 M9 8h.01',
  palette: 'M12 3a9 9 0 100 18h1a2 2 0 001-4c-1-1 0-2 1-2h3a3 3 0 003-3 9 9 0 00-9-9z M7 10h.01 M11 7h.01 M16 8h.01 M7 15h.01',
  type: 'M3 7V4h18v3 M12 4v16 M8 20h8',
  pin: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1116 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z',
  copy: 'M8 8h12v12H8z M16 4H4v12',
  check: 'm4 12 5 5L20 6',
}

function Icon({ name, size = 19 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>
}

const number = index => String(index + 1).padStart(2, '0')
const asset = file => import.meta.env.BASE_URL + 'brand/' + encodeURIComponent(file)

function Navigation({ active }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  return <aside className="sidebar" onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      toggle.current.focus()
    }
  }}>
    <div className="sidebar-top">
      <a href="#overview" className="identity" onClick={() => setOpen(false)}>
        <span className="identity-icon"><Icon name="pin" size={23} /></span>
        <span><strong>فرزة</strong><small lang="en">FARZA</small></span>
      </a>
      <button ref={toggle} className="nav-toggle" aria-expanded={open} aria-controls="section-nav" onClick={() => setOpen(!open)}>{open ? 'إغلاق' : 'المحتويات'}</button>
    </div>
    <nav id="section-nav" aria-label="محتويات الدليل" className={open ? 'is-open' : ''}>
      <p className="nav-label">محتويات الدليل</p>
      {sections.map(([id, title, english, icon], index) =>
        <a className="nav-link" key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>
          <Icon name={icon} />
          <span>{title}<small lang="en">{english}</small></span>
          <b>{number(index)}</b>
        </a>
      )}
    </nav>
    <div className="sidebar-footer"><Icon name="pin" size={16} /> صنعاء، اليمن <span lang="en" dir="ltr">15.37° N</span></div>
  </aside>
}

function Heading({ index }) {
  const [, title, english] = sections[index]
  return <header id={index === 0 ? "overview-heading" : undefined} className="section-heading" tabIndex={index === 0 ? -1 : undefined}>
    <span className="section-number">{number(index)}</span>
    <div><p lang="en" className="eyebrow">{english}</p><h2>{title}</h2></div>
  </header>
}

function Section({ index, children }) {
  return <section className="chapter" id={sections[index][0]} tabIndex={-1}><Heading index={index} />{children}</section>
}

function Cards({ items }) {
  return <div className="grid gap-4 md:grid-cols-3">{items.map(([icon, title, description]) =>
    <article className="card" key={title}><span className="card-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{description}</p></article>
  )}</div>
}

function Hero() {
  return <header className="hero">
    <div className="hero-art" aria-hidden="true">
      <div className="arch arch-outer"><div className="arch arch-middle"><div className="arch arch-inner">
        <div className="window"><i/><i/><i/><i/></div><div className="window-base"/>
      </div></div></div>
      <span className="art-dot dot-one"/><span className="art-dot dot-two"/><span className="art-dot dot-three"/>
      <span className="art-caption" dir="ltr">SANA’A, YEMEN</span>
    </div>
    <div className="hero-content">
      <p className="hero-kicker"><span/> دليل الهوية البصرية <b lang="en">BRAND GUIDELINES</b></p>
      <h1>فرزة<span>.</span></h1>
      <p className="hero-english" lang="en">FARZA</p>
      <div className="hero-divider"/>
      <p className="tagline">اعرف من فين تركب</p>
      <p className="hero-description">دليل هوية تطبيق فرزة للتنقّل بالمواصلات العامة في صنعاء.</p>
    </div>
  </header>
}

function Palette() {
  const [copied, setCopied] = useState('')
  const [message, setMessage] = useState('')
  const timer = useRef(null)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  async function copy(hex) {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setMessage('تم نسخ ' + hex)
      timer.current = window.setTimeout(() => {
        setCopied('')
        setMessage('')
      }, 2200)
    } catch {
      setCopied('')
      setMessage('تعذّر النسخ تلقائيًا. يمكنك تحديد الرمز ونسخه يدويًا.')
    }
  }
  return <>
    <div className="palette-grid">{colors.map(({ hex, name, role, english, ink }) =>
      <article className="swatch" key={hex}>
        <div className="swatch-color" style={{ background: hex, color: ink }}>
          <span lang="en">{english}</span>
        </div>
        <div className="swatch-caption">
          <h3>{name}</h3><p>{role}</p>
          <div className="swatch-code" dir="ltr"><code>{hex}</code><button type="button" aria-label={'نسخ ' + hex} onClick={() => copy(hex)}><Icon name={copied === hex ? 'check' : 'copy'} size={17}/></button></div>
        </div>
      </article>
    )}</div>
    <p className="copy-status" role="status">{message}</p>
  </>
}

function Moodboard() {
  return references.length ? <div className="mood-grid">{references.map(({ file, title, alt }) =>
    <figure key={file}><img loading="lazy" src={asset(file)} alt={alt}/><figcaption>{title}</figcaption></figure>
  )}</div> : <div className="mood-grid">
    {['القمرية الصنعانية', 'عمارة صنعاء', 'المواصلات المحلية'].map(title =>
      <figure key={title}><div className="asset-placeholder"><Icon name="image" size={27}/><span>الصورة المرجعية غير متاحة</span></div><figcaption>{title}</figcaption></figure>
    )}
  </div>
}

function App() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const chapters = sections.map(([id]) => document.getElementById(id))
    function sync() {
      const nearEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5
      const current = nearEnd ? chapters.at(-1) : chapters.findLast(chapter => chapter.getBoundingClientRect().top <= 155)
      setActive(current?.id ?? 'overview')
    }
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])
  return <>
    <a className="skip" href="#overview-heading">تخطَّ إلى المحتوى</a>
    <Navigation active={active} />
    <main>
      <div className="topline"><span>فرزة / دليل الهوية</span><span lang="en" dir="ltr">FARZA BRAND SYSTEM</span></div>
      <section id="overview" tabIndex={-1}>
        <Hero />
        <div className="chapter">
          <Heading index={0} />
          <p className="lead">فرزة تطبيق يساعدك تتنقّل في صنعاء بالباصات ووسائل النقل الصغيرة. تعرف منه الخط المناسب، ومن فين تركب، وأين تنزل أو تبدّل الباص.</p>
          <Cards items={[
            ['route', 'خطوط واضحة', 'تعرّف على مسار الرحلة قبل أن تبدأ.'],
            ['pin', 'نقاط ركوب ونزول', 'اعرف أين تبدأ رحلتك وأين تنتهي.'],
            ['target', 'تبديل أسهل', 'حدّد نقطة الانتقال بين خطّين عند الحاجة.'],
          ]}/>
        </div>
      </section>
      <Section index={1}>
        <p className="lead">معلومات عملية تساعد الطلاب والموظفين ومستخدمي المواصلات العامة على التخطيط لمشاويرهم اليومية في صنعاء.</p>
        <Cards items={[
          ['route', 'قبل الرحلة', 'اختيار خط يوصل إلى الوجهة أو يقرّب منها.'],
          ['pin', 'عند الركوب', 'تحديد نقطة الركوب المناسبة على الخط.'],
          ['target', 'أثناء الرحلة', 'معرفة أين تنزل، وأين تركب الباص التالي إذا احتجت تبدّل.'],
        ]}/>
      </Section>
      <Section index={2}>
        <p className="lead">هوية حديثة وقريبة من الناس، تستمد لغتها من تفاصيل التنقّل في صنعاء.</p>
        <Cards items={[
          ['grid', 'حديثة وعملية', 'ترتيب واضح للمعلومات يسهّل قراءتها أثناء المشوار.'],
          ['book', 'قريبة ومحلية', 'نستخدم تعبيرات مألوفة من حديث الناس عن المواصلات، مثل «من فين تركب».'],
          ['check', 'جديرة بالثقة', 'نصف أدوار المحطات ونقاط التبديل بلغة محددة.'],
        ]}/>
      </Section>
      <Section index={3}>
        <div className="story-panel"><p>«اعرف من فين تركب»</p><div>في صنعاء، يبدأ المشوار كثيرًا بسؤال بسيط: من فين أركب؟ من هذا السؤال جاءت فكرة فرزة، لتجعل معرفة الخط ونقاط الركوب والنزول والتبديل أسهل في الرحلات اليومية.</div></div>
      </Section>
      <Section index={4}>
        <p className="lead">تجمع لوحة الإلهام بين أقواس القمريات، ودرجات العمارة الصنعانية الدافئة، وتفاصيل المشاوير اليومية.</p>
        <Moodboard />
      </Section>
      <Section index={5}><Palette /></Section>
      <Section index={6}>
        <div className="type-card">
          <div className="type-title"><h3>Cairo</h3><span>العربية والإنجليزية</span></div>
          {[['Regular', 400], ['Medium', 500], ['SemiBold', 600], ['Bold', 700]].map(([label, weight]) =>
            <div className="type-row" key={weight} style={{ fontWeight: weight }}><span>اعرف من فين تركب</span><span lang="en" dir="ltr">{label} {weight}</span></div>
          )}
        </div>
      </Section>
      <Section index={7}>
        <div className="logo-display">{officialLogo ? <img src={asset(officialLogo)} alt="الشعار الرسمي لفرزة"/> :
          <div className="asset-placeholder"><Icon name="image" size={27}/><span>ملف الشعار الرسمي غير متاح</span></div>}</div>
        <div className="logo-details grid gap-4 sm:grid-cols-2">
          {[
            ['الدبوس فوق ف', 'يشير إلى تحديد الموقع ونقطة الركوب على الخريطة.'],
            ['ة المستوحاة من القمرية', 'تستحضر شكل النوافذ المقوّسة في عمارة صنعاء.'],
            ['الحروف الهندسية', 'تعطي الاسم إيقاعًا بصريًا واضحًا وتدعم قراءته.'],
            ['ألوان الهوية', 'الأخضر الداكن هو اللون الأساسي، ويضيف العنبري نقطة إبراز دافئة.'],
          ].map(([title, description]) => <article className="card" key={title}><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </Section>
      <footer className="footer"><span>فرزة · دليل الهوية البصرية</span><span>صنعاء، اليمن</span></footer>
    </main>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
