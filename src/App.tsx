import { useEffect, useMemo, useRef, useState } from "react"

// Personalize these values when the date, answer key, password, or MP3 are confirmed.
const BIRTHDAY_AT = "2026-10-31T00:01:00+05:30"
const SECRET_PASSWORD = "motu"
const SONGS = [
  { title: "The One That Reminds Me of You", src: "/audio/song-1.m4a" },
  { title: "The Song I Dedicate to You", src: "/audio/song-2.m4a" },
]
const QUIZ_ANSWER_KEY: number[] = [] // Add nine zero-based option indexes to enable scoring.

const memories = [
  ["/memories/01.jpg", "Teri smile meri favourite hai 🥹❤️", "Cute"],
  [
    "/memories/02.jpg",
    "Tu itni pyaari hai ki tujhe dekhne se akhein nahi thakti 🥹❤️",
    "Special",
  ],
  ["/memories/03.jpeg", "Certified nautanki 😂💗", "Funny"],
  ["/memories/04.jpg", "Itni cute banne ki zarurat thi? 😭❤️", "Cute"],
  ["/memories/05.jpg", "Meri pyari bahuriya", "Special"],
  ["/memories/06.jpg", "Teri expressions ka koi jawab nahi 😂❤️", "Funny"],
  ["/memories/07.jpg", "Bas tu aur teri nautanki 😭😂❤️", "Funny"],
  ["/memories/08.jpg", "Random moments, favourite memories 🫶🏻", "Special"],
  ["/memories/09.jpg", "Meri favourite pagal ladki 😂💗", "Cute"],
]

const quiz = [
  [
    "Mere liye tumhara favourite nickname kya hai?",
    ["Motu 🐼", "Pagli 😂", "Baigan 😌", "Billu Badmash 🥹"],
  ],
  [
    "Humari sabse favourite memory kaunsi hai?",
    [
      "Late-night talks 🌙",
      "Video calls 📱",
      "Saath mein hasi-mazaak 😂",
      "Koi special moment 💗",
    ],
  ],
  [
    "Jab main upset hota hoon, toh tum kya karti ho?",
    [
      "Mujhe samjhati ho 🫂",
      "Mera mazaak udaati ho 😂",
      "Mujhe space deti ho 🌙",
      "Situation pe depend karta hai 🥹",
    ],
  ],
  [
    "Hum dono mein zyada pagal kaun hai?",
    ["Motu 😂", "Laddu 🤡", "Dono equally 😭", "Yeh question hi galat hai 😂"],
  ],
  [
    "Agar hum ek din saath spend karein, toh kya karna pasand karenge?",
    [
      "Long drive 🚗",
      "Street food date 🍜",
      "Sunset aur long talks 🌅",
      "Bas saath rehna 🫶🏻",
    ],
  ],
  [
    "Mere liye tum kya ho?",
    [
      "Meri favourite person ❤️",
      "Meri pagal dost 🥹",
      "Meri comfort person 🫂",
      "In sab se bhi zyada 🥺",
    ],
  ],
  [
    "Random plan banane mein pehla step kaun leta hai? 😂",
    ["You", "Me 😭", "Both 💀", "Situation pe depend karta hai 😂"],
  ],
  [
    "Who is more likely to say “I’m fine” while clearly NOT being fine? 😭",
    ["You", "Me", "Both", "Don’t expose us like this 😭"],
  ],
  [
    "Who knows the other person better? 👀",
    ["You", "Me", "Both ❤️", "Abhi test baaki hai 😂"],
  ],
]

const fullLetter = `Happiesttt birthday to youuu, pagal ladkiii 🎂💗✨

Bhagwan ji tujhe woh saari khushiyan de jo tu deserve karti hai… aur honestly, jitni tu deserve karti hai na, shayad utni khushiyan words mein explain bhi nahi ki ja sakti 🥹❤️

Today is your special day… but somehow, it feels special to me too… because this is the day when someone as precious as you came into this world. 🫶🏻

I don't know exactly how to put everything I feel for you into words… because whenever it comes to you, mere paas words hote hue bhi words kam pad jaate hain. 🥺

You are not just someone I talk to, not just someone I call my best friend… you are one of those people whom I have genuinely started considering a part of my life. A part which I don't want to lose, no matter how life changes or what situations come ahead. ❤️‍🩹

And maybe I don't say it properly every time… maybe I even fail to show it sometimes… but I care about you way more than I usually know how to express. 🥹

Teri happiness genuinely matters to me.

Tera smile genuinely matters to me.

Tera mood, tera stress, teri छोटी-छोटी बातें… sab matter karti hain. 🫂

Kabhi kabhi meri life already itni messy hoti hai ki mujhe khud samajh nahi aata kya kar raha hoon… but somehow, your presence makes things feel a little lighter. 😭❤️

And that's one of the things I love the most about having you in my life.

You have this weird ability to make me forget things for a while… to make me laugh when I don't feel like laughing… and to make even the most random moments feel like something I'll remember later. 🥹💗

We've had our stupid conversations, random fights, countless laughs, weird moments, misunderstandings, and so many memories… but if someone asked me whether I'd want to erase any of it…

No. Not even the imperfect parts.

Because all of them are a part of our story. 🫶🏻

And there's something I want you to know today…

You don't have to be perfect for me to value you.

You don't have to always be happy.

You don't have to always be strong.

You don't have to have everything figured out.

On your bad days, your difficult days, your confused days, your “I don't want to talk to anyone” days… you'll still matter to me. ❤️‍🩹

I don't know what the future is going to look like. I don't know where life will take either of us, how much things will change, or how different we'll become with time…

But I genuinely hope that somehow, somewhere, in some form, you always remain a part of my life. 🥺❤️

Because honestly…

I don't want a version of my life where I never met you.

And maybe that's why your birthday feels different to me.

It's not just about celebrating another year of your life…

It's about being grateful that you exist. 🌷

Grateful that I met you.

Grateful for every conversation.

Grateful for every laugh.

Grateful for every memory.

Grateful for every time you were there when I needed someone.

And grateful for all the little things you've done that you probably don't even realize meant so much to me. 🫂❤️

I know I can be annoying sometimes 😭😂

I know I overthink.

I know sometimes I care a little too much.

And maybe sometimes I don't know when to stop expressing what I feel…

but that's only because you mean that much to me. 🥹

You are genuinely one of the very few people for whom I can say:

“I want to see you happy, even when there's nothing in it for me.”

Your happiness makes me happy.

Your smile makes me smile.

And when you're hurting, somehow it affects me too. 🥺

So on your birthday, I don't just wish you a good year…

I wish you peace.

I wish you happiness.

I wish you people who genuinely understand you.

I wish you dreams that come true.

I wish you moments that make you stop and think, “life is actually beautiful.”

And I wish that you never forget how incredibly special you are. 🌸✨

And if someday you forget…

I'll remind you. 🫶🏻

Thank you… for being you.

Thank you for coming into my life.

Thank you for staying.

Thank you for trusting me.

Thank you for all the care, concern, love and little efforts you've given me.

Maybe “thank you” is a very small word compared to everything I actually feel…

but still… thank you. Thank you. Thank you. ❤️‍🩹

And one last thing…

I don't know whether I have ever been able to make you understand just how much you mean to me.

But if I haven't…

then remember this:

You're not just a beautiful chapter of my life.

You're one of those people whose presence has changed the story itself. 🥺❤️

So yeah…

Happiest birthday to my favourite human, my best friend, my pagal, my comfort person, and someone who holds a place in my heart that honestly nobody else can replace. 🫂💗

Stay the same crazy, beautiful, annoying, caring and wonderful person you are. 😂❤️

Keep smiling.

Keep shining.

And please… never doubt how loved and precious you are. 🥹🫶🏻

Happy Birthday once again, Motu 🎂💗✨

And haan…

aaj ka din tera hai… but I'm secretly celebrating too, because this is the day the world got YOU. 🥺❤️

Love you more than I probably know how to explain. 🫶🏻❤️`

function PageShell({
  page,
  children,
  tone = "night",
  hideNav = false,
  onNext,
  onBack,
}: {
  page: number
  children: React.ReactNode
  tone?: string
  hideNav?: boolean
  onNext: () => void
  onBack: () => void
}) {
  return (
    <main className={`page page-${tone}`}>
      <div className="stars" aria-hidden="true" />
      <div className="page-count">{page} / 14</div>
      <div className="page-scroll">
        <div className="content">{children}</div>
      </div>
      {!hideNav && (
        <nav className="bottom-nav" aria-label="Page navigation">
          <button
            className="nav-secondary"
            onClick={onBack}
            disabled={page === 1}
          >
            ← Back
          </button>
          <button className="nav-primary" onClick={onNext}>
            {page === 14 ? "Replay ↻" : "Continue →"}
          </button>
        </nav>
      )}
    </main>
  )
}

function Title({
  children,
  eyebrow,
}: {
  children: React.ReactNode
  eyebrow?: string
}) {
  return (
    <header className="title-block">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{children}</h1>
      <span className="flourish">✦ · ♡ · ✦</span>
    </header>
  )
}

export default function App() {
  const [page, setPage] = useState(1)
  const [giftOpen, setGiftOpen] = useState(false)
  const [filter, setFilter] = useState("All")
  const [viewer, setViewer] = useState<number | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | undefined)[]>(Array(9))
  const [quizDone, setQuizDone] = useState(false)
  const [password, setPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
    reached: false,
  })
  const [playingSong, setPlayingSong] = useState<number | null>(null)
  const songRefs = useRef<(HTMLAudioElement | null)[]>([])
  const giftRevealRef = useRef<HTMLAudioElement | null>(null)
  const previousPageRef = useRef(page)

  const openGift = () => {
    setGiftOpen(true)
    if (!giftRevealRef.current) {
      giftRevealRef.current = new Audio(
        `${import.meta.env.BASE_URL}audio/gift-reveal.m4a`,
      )
      giftRevealRef.current.preload = "auto"
    }
    void giftRevealRef.current.play()
  }

  const go = (n: number) => {
    setPage(Math.max(1, Math.min(14, n)))
    window.scrollTo(0, 0)
  }
  const next = () => (page === 14 ? go(1) : go(page + 1))
  const back = () => go(page - 1)

  useEffect(() => {
    if (!BIRTHDAY_AT) return
    const tick = () => {
      const distance = new Date(BIRTHDAY_AT).getTime() - Date.now()
      if (distance <= 0)
        return setCountdown({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          reached: true,
        })
      const pad = (n: number) => String(n).padStart(2, "0")
      setCountdown({
        days: pad(Math.floor(distance / 86400000)),
        hours: pad(Math.floor(distance / 3600000) % 24),
        minutes: pad(Math.floor(distance / 60000) % 60),
        seconds: pad(Math.floor(distance / 1000) % 60),
        reached: false,
      })
    }
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (page === 4 && countdown.reached) setPage(5)
  }, [countdown.reached, page])

  useEffect(() => {
    if (previousPageRef.current === 5 && page !== 5) {
      giftRevealRef.current?.pause()
      if (giftRevealRef.current) giftRevealRef.current.currentTime = 0
    }
    previousPageRef.current = page
  }, [page])

  useEffect(
    () => () => {
      giftRevealRef.current?.pause()
    },
    [],
  )

  const filteredMemories = useMemo(
    () =>
      memories
        .map((m, i) => ({ m, i }))
        .filter(({ m }) => filter === "All" || m[2] === filter),
    [filter],
  )
  const updateAnswer = (choice: number) => {
    const nextAnswers = [...answers]
    nextAnswers[quizIndex] = choice
    setAnswers(nextAnswers)
  }
  const score =
    QUIZ_ANSWER_KEY.length === quiz.length
      ? answers.reduce(
          (total, answer, i) => total + (answer === QUIZ_ANSWER_KEY[i] ? 1 : 0),
          0,
        )
      : null

  let body: React.ReactNode
  if (page === 1)
    body = (
      <PageShell page={1} tone="night" hideNav onNext={next} onBack={back}>
        <div className="moon">☾</div>
        <Title eyebrow="For My Motu, From Mani">
          I made something very special for you… ♡
        </Title>
        <div className="glass-card centered">
          <p>
            Pata nahi tujhe ye pasand aayega ya nahi 😭<br />
            but maine kaafi time laga ke banaya hai…
            <br />
            so please thoda patience rakhna aur pura dekhna. 🥹❤️
          </p>
        </div>
        <p className="whisper">Don’t open unless you’re ready… 👀❤️</p>
        <button className="hero-button" onClick={next}>
          Tap to Begin →
        </button>
      </PageShell>
    )
  else if (page === 2)
    body = (
      <PageShell page={2} tone="burgundy" hideNav onNext={next} onBack={back}>
        <Title>Surpriseeeee!!! 🥹🎁❤️</Title>
        <p className="subtitle">
          A little something for my most special person…
        </p>
        <button
          className={`gift ${giftOpen ? "open" : ""}`}
          onClick={openGift}
          aria-label="Open gift"
        >
          <span className="gift-lid">✦</span>
          <span className="gift-box">♡</span>
        </button>
        <div className="paper-card compact">
          <p>Actually ye sirf ek birthday gift nahi hai…</p>
          <p>
            I wanted to make something jisme thoda sa mera effort ho, thodi si
            hamari memories ho, aur bahut saari feelings jo shayad main normally
            bol nahi pata. 🥺
          </p>
          <p>So yeahhh…</p>
          <p>
            <strong>this is for you. ❤️</strong>
          </p>
        </div>
        {!giftOpen ? (
          <button className="hero-button" onClick={openGift}>
            🎁 Open Your Gift
          </button>
        ) : (
          <button className="hero-button" onClick={next}>
            See your surprise →
          </button>
        )}
      </PageShell>
    )
  else if (page === 3)
    body = (
      <PageShell page={3} tone="sunset" onNext={next} onBack={back}>
        <Title eyebrow="Today, we celebrate you">
          Happiest Birthdayyy Motu ❤️🎂
        </Title>
        <div className="paper-card">
          <p>Finallyyyy it’s your dayyy! 😭❤️</p>
          <p>
            Sabse pehle toh Bhagwan ji se bas yahi wish hai ki tujhe woh saari
            khushiyan mile jo tu deserve karti hai… actually usse bhi zyada.
            🥹🫶🏻
          </p>
          <p>
            I hope tu hamesha aise hi smile karti rahe, khush rahe, aur life
            mein jo bhi chahe woh tujhe mile.
          </p>
          <p>
            And haan… aaj ka din sirf tera hai, so no tension, no overthinking,
            bas enjoy kar. 😂❤️
          </p>
          <p>
            <strong>Because today we celebrate YOU. 🫶🏻</strong>
          </p>
        </div>
      </PageShell>
    )
  else if (page === 4)
    body = (
      <PageShell page={4} tone="garden" onNext={next} onBack={back}>
        <Title>Bas thoda sa aur… 👀❤️</Title>
        <div className="paper-card compact">
          <p>Tera birthday aane wala haiii… 🥹</p>
          <p>
            Aur pata nahi kyun, but I’m actually more excited than I should be.
            😂
          </p>
          <p>Maybe because it’s not just another date for me…</p>
          <p>it’s the day my favourite idiot came into this world. 😭❤️</p>
          <p>So let’s count every second…</p>
        </div>
        <div className="countdown">
          {Object.entries(countdown)
            .slice(0, 4)
            .map(([label, value]) => (
              <div className="time-card" key={label}>
                <b>{String(value)}</b>
                <span>{label}</span>
              </div>
            ))}
        </div>
        {!BIRTHDAY_AT && (
          <p className="config-note">
            Birthday date is ready to be added in <code>BIRTHDAY_AT</code>.
          </p>
        )}
        <p className="whisper">
          Good things take time… aur tu toh waise bhi thodi special hai. 🥹❤️
        </p>
        <button className="hero-button countdown-skip" onClick={next}>
          Skip Countdown →
        </button>
      </PageShell>
    )
  else if (page === 5)
    body = (
      <PageShell page={5} tone="celebrate" onNext={next} onBack={back}>
        <div className="confetti" aria-hidden="true">
          ✦　♡　✧　♡　✦
        </div>
        <div className="cake" aria-hidden="true">
          🕯️
          <br />🎂
        </div>
        <Title>IT’S YOUR DAYYYYY!!! 🎂😭❤️</Title>
        <div className="glass-card">
          <p>Finallyyyyy!!! 😭😂</p>
          <p>Happy Birthday once againnnn! ❤️</p>
          <p>
            Ab officially ek aur year bada/badi ho gayi tu… but maturity ka kuch
            pata nahi. 💀😂
          </p>
          <p>Jokes apart…</p>
          <p>I genuinely hope this year is beautiful for you.</p>
          <p>
            Jo cheezein tu chahti hai woh tujhe mile, jo cheezein tujhe hurt
            karti hain woh dheere dheere door ho jaayein, and you get a lotttt
            of reasons to smile.
          </p>
          <p>You deserve a really really happy life. 🥹❤️</p>
        </div>
        <p className="whisper">
          Now make a wish… and don’t forget to save one wish for us. 👀🫶🏻
        </p>
      </PageShell>
    )
  else if (page === 6)
    body = (
      <PageShell page={6} tone="scrapbook" onNext={next} onBack={back}>
        <Title>Our Story ♡</Title>
        <p className="subtitle dark">
          Pata nahi ye story exactly kab start hui… but I’m glad it did. 🥹
        </p>
        <div className="timeline">
          {[
            [
              "01",
              "First Conversation",
              "Where it all started…",
              "Honestly, uss time mujhe bilkul idea nahi tha ki ek normal si conversation itni saari memories tak pahuch jayegi. 😂\n\nBut I’m really glad ki woh conversation hui thi. ❤️",
            ],
            [
              "02",
              "First Meet",
              "First Meet",
              "Nervousness thi, awkwardness thi… 😂\nbut somewhere it just felt nice.\n\nAnd today jab peeche mudke dekhta hoon na…\n\nI’m just happy that I met you. 🥹",
            ],
            [
              "03",
              "Crazy Moments",
              "Our stupidest moments 😂",
              "Hamare paas normal memories kam hain I think. 😭😂\n\nRandom baatein, random plans, random fights, random hasi…\n\nBut somehow ye random cheezein hi meri favourite memories ban gayi. ❤️",
            ],
            [
              "04",
              "Through Ups & Downs",
              "Not everything was perfect…",
              "Obviously sab kuch hamesha perfect nahi raha.\n\nKabhi misunderstandings hui, kabhi mood kharab hua, kabhi baatein complicated hui…\n\nBut despite everything…\n\nyou still remained important to me.\n\nAnd I think that’s what matters. 🫂❤️",
            ],
            [
              "05",
              "And Here We Are",
              "Still here…",
              "Itne time ke baad bhi humare paas memories khatam nahi hui…\n\nAur honestly, I hope ye story yahin end nahi hoti.\n\nAbhi toh aur memories banani baaki hain. 🥹❤️",
            ],
          ].map(([num, title, caption, text]) => (
            <article className="timeline-item" key={num}>
              <span>{num}</span>
              <div>
                <small>{title}</small>
                <h2>{caption}</h2>
                {text.split("\n\n").map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageShell>
    )
  else if (page === 7)
    body = (
      <PageShell page={7} tone="gallery" onNext={next} onBack={back}>
        <Title>Our Memories ♡</Title>
        <p className="subtitle">
          Chhoti chhoti memories… but mere liye bahut special. 🥹❤️
        </p>
        <div className="filters">
          {["All", "Cute", "Funny", "Special"].map((f) => (
            <button
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
              key={f}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="memory-grid">
          {filteredMemories.map(({ m, i }) => (
            <button
              className="polaroid"
              key={m[0]}
              onClick={() => setViewer(i)}
            >
              <img src={m[0]} alt={`Memory ${i + 1}`} />
              <span>{m[1]}</span>
            </button>
          ))}
        </div>
        {viewer !== null && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={() => setViewer(null)}
          >
            <button
              className="close"
              onClick={() => setViewer(null)}
              aria-label="Close photo"
            >
              ×
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <img src={memories[viewer][0]} alt={`Memory ${viewer + 1}`} />
              <p>{memories[viewer][1]}</p>
            </div>
          </div>
        )}
      </PageShell>
    )
  else if (page === 8)
    body = (
      <PageShell page={8} tone="blush" onNext={next} onBack={back}>
        <Title>Why are you so special? 🥹❤️</Title>
        <div className="intro-card">
          Ye question actually easy nahi hai…
          <br />
          <br />
          because agar main reasons likhne baith gaya na, toh shayad ye website
          kabhi khatam hi nahi hogi. 😭😂
        </div>
        <div className="reason-list">
          {[
            [
              "Because you care",
              "Tu jitna care karti hai na, sometimes you don’t even realise how much it means to me.",
            ],
            [
              "Because you listen",
              "Main kitna bhi bakwas karu… somehow tu sun leti hai. 😭😂\n\nAnd honestly, that matters.",
            ],
            [
              "Because you understand",
              "Har baar mujhe explain karne ki zarurat nahi padti.\n\nKabhi kabhi tu bina bole bhi samajh jaati hai.",
            ],
            [
              "Because you’re crazy",
              "Normal rehna shayad tere syllabus mein hai hi nahi. 💀😂\n\nBut honestly… isi craziness ki wajah se tu tu hai.",
            ],
            [
              "Because you make things lighter",
              "Jab life thodi messy hoti hai na…\n\nsomehow tera hona things ko thoda easier bana deta hai.",
            ],
            [
              "Because you remember little things",
              "Chhoti chhoti cheezein yaad rakhna…\n\nmaybe tujhe normal lagta hoga, but mujhe woh bahut special lagta hai.",
            ],
            [
              "Because you’re genuinely YOU",
              "Tujhe kisi aur jaisa banne ki zarurat nahi hai.\n\nMujhe tu waise hi pasand hai jaise tu hai.",
            ],
            [
              "♡",
              "And honestly…\n\nIt’s not one particular thing that makes you special.\n\nIt’s everything about you…\n\nall the little things together. ❤️",
            ],
          ].map(([h, t], i) => (
            <article key={h} style={{ animationDelay: `${i * 0.08}s` }}>
              <span>0{i + 1}</span>
              <h2>{h}</h2>
              {t.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
          ))}
        </div>
      </PageShell>
    )
  else if (page === 9)
    body = (
      <PageShell page={9} tone="paper" onNext={next} onBack={back}>
        <Title>Things I probably don’t say enough… 🥺</Title>
        <div className="letter-grid">
          {[
            "Tu mere liye genuinely bahut important hai.\n\nShayad jitna main bolta hoon usse bhi zyada.",
            "I really care about you.\n\nKabhi kabhi shayad thoda zyada hi. 😭❤️",
            "Your happiness matters to me.\n\nTu khush hoti hai toh mujhe bhi genuinely achha lagta hai.",
            "I notice your little efforts.\n\nEven when I don’t say anything… I notice them. 🥹",
            "I’m grateful for you.\n\nFor every conversation, every laugh, every stupid moment.",
            "I don’t want to lose you.\n\nLife chahe kitni bhi change ho… I really hope hum kabhi completely strangers na bane. ❤️‍🩹",
            "You have a place in my life that isn’t easy to replace.",
            "And haan…\n\nIf I don’t say all this often, it doesn’t mean I don’t feel it.\n\nI just don’t always know how to say it. 🥹",
          ].map((t, i) => (
            <article key={i}>
              <b>0{i + 1}</b>
              {t.split("\n\n").map((p) => (
                <p key={p}>{p}</p>
              ))}
            </article>
          ))}
        </div>
      </PageShell>
    )
  else if (page === 10)
    body = (
      <PageShell page={10} tone="quiz" hideNav onNext={next} onBack={back}>
        <Title>Chal dekhte hain… tu mujhe kitna jaanti hai 👀😂</Title>
        <p className="subtitle dark">
          Best friend bolna easy hai… prove karna thoda difficult hai. 😭
        </p>
        {!quizDone ? (
          <div className="quiz-card">
            <div className="quiz-meta">
              <span>
                Question {quizIndex + 1} of {quiz.length}
              </span>
              <span>{Math.round(((quizIndex + 1) / quiz.length) * 100)}%</span>
            </div>
            <div className="progress">
              <i
                style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }}
              />
            </div>
            <h2>{quiz[quizIndex][0]}</h2>
            <div className="options">
              {quiz[quizIndex][1].map((option, i) => (
                <button
                  className={answers[quizIndex] === i ? "selected" : ""}
                  onClick={() => updateAnswer(i)}
                  key={option}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                </button>
              ))}
            </div>
            <div className="quiz-nav">
              <button
                disabled={quizIndex === 0}
                onClick={() => setQuizIndex((i) => i - 1)}
              >
                ← Back
              </button>
              <button
                disabled={answers[quizIndex] === undefined}
                onClick={() =>
                  quizIndex === quiz.length - 1
                    ? setQuizDone(true)
                    : setQuizIndex((i) => i + 1)
                }
              >
                {quizIndex === quiz.length - 1 ? "See result" : "Next →"}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-card result">
            <div className="result-heart">♡</div>
            <h2>Okayyyyy… maybe you really are my best friend. 😂❤️</h2>
            <p>Ya phir tumne cheating ki hai. 👀💀</p>
            {score === null ? (
              <p className="config-note">
                No fake score here — Mani can add the answer key later.
              </p>
            ) : (
              <strong>
                {score} / {quiz.length}
              </strong>
            )}
            <button className="hero-button" onClick={next}>
              Next →
            </button>
          </div>
        )}
      </PageShell>
    )
  else if (page === 11)
    body = (
      <PageShell page={11} tone="secret" onNext={next} onBack={back}>
        <div className="key">⌕</div>
        <Title>Our Secret Room ♡</Title>
        <p className="subtitle">
          Ek chhota sa corner… jahan maine apne future ke kuch thoughts rakhe
          hain. 🥹
        </p>
        {!unlocked ? (
          <div className="lock-card">
            <div className="lock">♡</div>
            <label htmlFor="secret">The thing I only say quietly… 🥹❤️</label>
            <input
              id="secret"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError(false)
              }}
              placeholder="Enter our secret"
            />
            <button
              onClick={() => {
                if (password.toLowerCase() === SECRET_PASSWORD.toLowerCase())
                  setUnlocked(true)
                else setPasswordError(true)
              }}
            >
              Unlock the room
            </button>
            {passwordError && (
              <p className="error">Not quite… try the name Mani calls you. ♡</p>
            )}
            <small>A playful surprise only — not real security.</small>
          </div>
        ) : (
          <div className="dream-card">
            <h2>A Little Dream of Ours 🌷</h2>
            <p>Pata hai, kabhi kabhi main future ke baare mein sochta hoon…</p>
            <p>
              Koi fancy life nahi chahiye. Bas ek peaceful si life, jahan chhoti
              chhoti cheezein special lagti rahein.
            </p>
            <p>
              Subah ki chai, random baatein, bina plan ki drives, kahin ghoomne
              nikal jaana, ek dusre ki bakwas sunna, aur phir unhi baaton pe
              hasna. 😂❤️
            </p>
            <p>
              Kabhi life busy ho jaaye, kabhi hum apne-apne kaam mein ulajh
              jaayein… but phir bhi ek aisa connection rahe jahan baat karna
              difficult na lage.
            </p>
            <p>
              Maybe years later hum is website ko dekhein aur hassein ki Mani ne
              itni mehnat karke kya kya bana diya tha. 😭😂
            </p>
            <p>
              I don’t know exactly what the future holds, and I’m not writing
              this as an expectation or a promise you have to make.
            </p>
            <p>
              Bas itna hai ki tu meri life ka ek important part hai, and
              somewhere in my dreams, I hope there are still many beautiful
              memories left for us to make. 🥹❤️
            </p>
          </div>
        )}
      </PageShell>
    )
  else if (page === 12)
    body = (
      <PageShell page={12} tone="music" onNext={next} onBack={back}>
        <Title>Our Songs ♡</Title>
        <p className="subtitle">
          Because some songs just remind me of you… 🥹❤️
        </p>
        <div className={`vinyl ${playingSong !== null ? "spinning" : ""}`}>
          <span>♡</span>
        </div>
        <div className="music-card">
          <p>Pata nahi kyun…</p>
          <p>
            kuch songs aise hote hain jinhe sunte hi kisi ek insaan ki yaad aa
            jaati hai.
          </p>
          <p>Aur mere liye, ye song unhi mein se ek hai. 🥹❤️</p>
          <p>
            Jab bhi ye sunta hoon na, pata nahi kyun teri yaad aa jaati hai.
          </p>
          <div className="song-list">
            {SONGS.map((song, index) => (
              <section className="song-player" key={song.title}>
                <div>
                  <span>0{index + 1}</span>
                  <b>{song.title}</b>
                </div>
                <audio
                  ref={(element) => {
                    songRefs.current[index] = element
                  }}
                  src={song.src || undefined}
                  controls
                  preload="metadata"
                  onPlay={() => {
                    songRefs.current.forEach((audio, audioIndex) => {
                      if (audioIndex !== index) audio?.pause()
                    })
                    setPlayingSong(index)
                  }}
                  onPause={() =>
                    setPlayingSong((current) =>
                      current === index ? null : current,
                    )
                  }
                  onEnded={() =>
                    setPlayingSong((current) =>
                      current === index ? null : current,
                    )
                  }
                  aria-label={`${song.title} audio player`}
                />
                {!song.src && (
                  <p className="song-placeholder">
                    MP3 placeholder — ready for Mani’s file.
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </PageShell>
    )
  else if (page === 13)
    body = (
      <PageShell page={13} tone="letter" onNext={next} onBack={back}>
        <Title>A Letter For You 💌</Title>
        <article className="full-letter">
          {fullLetter.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="letter-sign">For Motu, always ♡ — Mani</div>
          <div className="butterfly">୨୧</div>
        </article>
      </PageShell>
    )
  else
    body = (
      <PageShell page={14} tone="finale" onNext={next} onBack={back}>
        <div className="final-heart">♡</div>
        <Title>Bas ek last baat… 🥹❤️</Title>
        <div className="glass-card finale-copy">
          <p>Pata hai…</p>
          <p>Main duniya se kuch bhi maang sakta hoon…</p>
          <p>but agar ek cheez choose karni ho na,</p>
          <p>toh main bas ye chahta hoon ki tu hamesha khush rahe.</p>
          <p>Chahe life humein kahin bhi le jaaye…</p>
          <p>bas tu smile karti rehna.</p>
          <p>
            Because your smile will always be one of my favourite things. 🥹❤️
          </p>
          <p>And haan…</p>
          <p>thank you for being a part of my life.</p>
          <p>Always. 🫶🏻</p>
        </div>
        <div className="final-message">
          <h2>Happy Birthday, Motu ❤️🎂</h2>
          <p>Now go smile…</p>
          <p>
            because this whole thing was made just to see that smile. 🥹🫶🏻
          </p>
        </div>
        <p className="end-text">
          ♡ End… or maybe just the beginning of another memory.
        </p>
        <p className="author-mark">Made with love by Mani</p>
      </PageShell>
    )

  return <div className="app">{body}</div>
}
