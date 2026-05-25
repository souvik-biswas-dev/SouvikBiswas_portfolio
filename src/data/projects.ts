export interface ProjectArchitecture {
    hld: string;
    lld: string;
    classDiagram: string;
    dataFlow: string;
    infrastructure: string;
    erDiagram: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    status: string;
    image: string;
    github: string | null;
    live: string | null;
    impact?: string[];
    challenges?: { title: string; description: string; solution: string }[];
    size?: 'small' | 'medium' | 'large';
    color: string;
    architecture?: ProjectArchitecture;
}

export const projects: Project[] = [
    {
        id: '01',
        title: 'School Portal',
        category: 'Multi-Tenant ERP',
        description: 'A multi-tenant school ERP serving 1,000+ students, with tenant isolation enforced at the ORM layer.',
        longDescription: 'School Portal is a multi-tenant school ERP I architected and shipped solo for a startup — now serving 1,000+ active students. Tenant isolation is enforced at the ORM layer via AsyncLocalStorage and a custom Mongoose plugin, paired with an AI attendance pipeline and Dockerized, idempotent billing.',
        tech: ['Next.js', 'React', 'MongoDB', 'Redis', 'Docker', 'Gemini'],
        status: 'Live',
        image: '/school-portal.png',
        github: null,
        live: 'https://schoolportal360.com',
        impact: ['1,000+ Active Students', 'Strict Tenant Isolation', 'AI Attendance OCR'],
        challenges: [
            {
                title: 'Tenant Data Isolation',
                description: 'A single database serving many schools risked cross-tenant data leaks.',
                solution: 'Enforced isolation at the ORM layer using AsyncLocalStorage to carry tenant context and a custom Mongoose plugin that auto-scopes every query.'
            },
            {
                title: 'Manual Attendance Entry',
                description: 'Teachers spent hours transcribing paper attendance registers by hand.',
                solution: 'Built an AI pipeline with Gemini 2.5 Pro OCR that reads photographed registers and validates roll numbers against the class roster.'
            },
            {
                title: 'Reliable Alerts & Billing',
                description: 'WhatsApp alerts and per-student billing had to be reliable and never double-charge.',
                solution: 'Used BullMQ/Redis background jobs for Meta WhatsApp notifications and Dockerized cron jobs for idempotent Razorpay billing.'
            }
        ],
        size: 'large',
        color: 'from-blue-500/20 to-cyan-500/20',
        architecture: {
            hld: `flowchart TB
    Client["Next.js App\nReact + SSR"]
    ALS["AsyncLocalStorage\nTenant Context"]
    ORM["Mongoose\n+ Tenant Plugin"]
    Queue["BullMQ / Redis\nJob Queue"]
    Gemini["Gemini 2.5 Pro\nOCR Pipeline"]
    WA["Meta WhatsApp\nCloud API"]
    Pay["Razorpay\nBilling Cron"]
    DB[("MongoDB\nMulti-Tenant")]

    Client -->|Request| ALS
    ALS --> ORM
    ORM --> DB
    Client -->|Enqueue| Queue
    Queue --> WA
    Queue --> Pay
    Client -->|Attendance Photo| Gemini
    Gemini --> ORM`,

            lld: `flowchart LR
    subgraph API["Next.js Route Handlers"]
        AUTH["/api/auth\nlogin | session"]
        ATT["/api/attendance\nupload | verify"]
        FEE["/api/fees\ncreate | status"]
    end
    subgraph Services
        TS["TenantService\nresolveTenant"]
        AS["AttendanceService\nrunOCR | reconcile"]
        BS["BillingService\ngenerateInvoice"]
    end
    subgraph Infra
        RED["Redis (BullMQ)"]
        MDB["MongoDB"]
    end

    AUTH --> TS
    ATT --> AS
    FEE --> BS
    TS --> MDB
    AS --> RED
    BS --> RED
    AS --> MDB
    BS --> MDB`,

            classDiagram: `classDiagram
    class Tenant {
        +ObjectId _id
        +String name
        +String slug
        +String plan
        +scopeQuery()
    }
    class Student {
        +ObjectId _id
        +ObjectId tenantId
        +String name
        +int rollNo
        +String classId
        +markAttendance()
        +getFees()
    }
    class AttendanceRecord {
        +ObjectId _id
        +ObjectId tenantId
        +String classId
        +Date date
        +Map presentRolls
        +reconcile(roster)
    }
    class Invoice {
        +ObjectId _id
        +ObjectId studentId
        +int amount
        +String status
        +String idempotencyKey
    }
    Tenant "1" --> "*" Student : owns
    Student "1" --> "*" Invoice : billed
    Student "1" --> "*" AttendanceRecord : appears_in`,

            dataFlow: `sequenceDiagram
    participant T as Teacher (Next.js)
    participant API as Route Handler
    participant G as Gemini OCR
    participant Q as BullMQ / Redis
    participant DB as MongoDB
    participant WA as WhatsApp API

    T->>API: Upload register photo
    API->>G: Extract roll-wise data
    G-->>API: Parsed rolls + status
    API->>DB: Reconcile vs class roster
    DB-->>API: Saved attendance
    API->>Q: Enqueue absent-student alerts
    Q->>WA: Send WhatsApp notification
    WA-->>Q: Delivery ack
    API-->>T: Attendance confirmed`,

            infrastructure: `flowchart TB
    subgraph Edge["Vercel / Edge"]
        Next["Next.js App"]
    end
    subgraph Server["Dockerized Services"]
        Worker["BullMQ Worker"]
        Cron["Billing Cron\n(idempotent)"]
        Redis[("Redis")]
    end
    subgraph Data["MongoDB Atlas"]
        Mongo[("Multi-Tenant DB")]
    end
    Gemini["Gemini API"]
    WA["WhatsApp Cloud API"]
    Pay["Razorpay"]

    Next --> Mongo
    Next --> Redis
    Worker --> Redis
    Worker --> WA
    Cron --> Pay
    Cron --> Mongo
    Next --> Gemini`,

            erDiagram: `erDiagram
    TENANT {
        objectid id PK
        string name
        string slug
        string plan
    }
    STUDENT {
        objectid id PK
        objectid tenant_id FK
        string name
        int roll_no
        string class_id
    }
    ATTENDANCE {
        objectid id PK
        objectid tenant_id FK
        string class_id
        date day
        json present_rolls
    }
    INVOICE {
        objectid id PK
        objectid student_id FK
        int amount
        string status
        string idempotency_key
    }
    TENANT ||--o{ STUDENT : owns
    STUDENT ||--o{ ATTENDANCE : appears_in
    STUDENT ||--o{ INVOICE : billed`
        }
    },
    {
        id: '02',
        title: 'FinVault',
        category: 'Financial System',
        description: 'A double-entry bookkeeping ledger with append-only, immutable entries and a tamper-evident audit trail.',
        longDescription: 'FinVault is a double-entry bookkeeping system with append-only, immutable transaction entries that guarantee a tamper-evident audit trail. Transfers use idempotency keys to prevent duplicates, balances are computed rather than stored to eliminate drift, and the REST API is hardened end-to-end.',
        tech: ['Node.js', 'Express 5', 'MongoDB', 'SvelteKit', 'TypeScript', 'Docker'],
        status: 'Live',
        image: '/fin-vault.png',
        github: 'https://github.com/souvik-biswas-dev/FinVault',
        live: null,
        impact: ['Immutable Audit Trail', 'Idempotent Transfers', 'Hardened REST API'],
        challenges: [
            {
                title: 'Duplicate Transfers',
                description: 'Network retries could submit the same transfer twice and corrupt balances.',
                solution: 'Implemented idempotency keys on every transfer so repeated requests resolve to a single committed entry.'
            },
            {
                title: 'Balance Drift',
                description: 'A stored balance field drifts out of sync with the transaction log over time.',
                solution: 'Computed balances on the fly from immutable, append-only entries — the ledger is the single source of truth.'
            },
            {
                title: 'API Hardening',
                description: 'A financial API is a high-value target for abuse and attacks.',
                solution: 'Layered JWT (HttpOnly, strict SameSite), bcrypt, Helmet, CORS, rate-limiting (20 req / 15 min), and graceful shutdown.'
            }
        ],
        size: 'medium',
        color: 'from-green-500/20 to-emerald-500/20',
        architecture: {
            hld: `flowchart TB
    UI["SvelteKit UI"]
    RL["Rate Limiter\n20 / 15min"]
    API["Express 5 API\nJWT + Helmet"]
    Svc["Ledger Service\nDouble-Entry"]
    DB[("MongoDB\nAppend-Only Entries")]

    UI -->|HTTPS| RL
    RL --> API
    API --> Svc
    Svc -->|Immutable Insert| DB
    Svc -->|Computed Balance| DB`,

            lld: `flowchart LR
    subgraph Routes
        AR["/auth\nregister | login"]
        TR["/transfer\nPOST"]
        BR["/accounts/:id/balance"]
    end
    subgraph Core
        IDK["IdempotencyGuard"]
        LE["LedgerEngine\npostDoubleEntry"]
        BAL["BalanceCalculator\nsum(entries)"]
    end
    AR --> LE
    TR --> IDK
    IDK --> LE
    BR --> BAL
    LE --> DB[("MongoDB")]
    BAL --> DB`,

            classDiagram: `classDiagram
    class Account {
        +ObjectId _id
        +ObjectId ownerId
        +String currency
        +computeBalance()
    }
    class Entry {
        +ObjectId _id
        +ObjectId accountId
        +ObjectId txId
        +int amount
        +String direction
        +Date createdAt
    }
    class Transaction {
        +ObjectId _id
        +String idempotencyKey
        +ObjectId from
        +ObjectId to
        +int amount
        +post()
    }
    Transaction "1" --> "2" Entry : creates
    Account "1" --> "*" Entry : has`,

            dataFlow: `sequenceDiagram
    participant C as Client
    participant API as Express API
    participant G as IdempotencyGuard
    participant L as LedgerEngine
    participant DB as MongoDB

    C->>API: POST /transfer (Idempotency-Key)
    API->>G: Check key
    alt Key already seen
        G-->>C: Return prior result
    else New key
        G->>L: postDoubleEntry(from, to, amt)
        L->>DB: Insert DEBIT + CREDIT (immutable)
        DB-->>L: Committed
        L-->>API: Transaction id
        API-->>C: 201 Created
    end`,

            infrastructure: `flowchart TB
    subgraph Docker["Docker Compose"]
        Web["SvelteKit\nStatic Frontend"]
        API["Express 5\nNode Container"]
    end
    Mongo[("MongoDB")]

    Web --> API
    API --> Mongo`,

            erDiagram: `erDiagram
    ACCOUNT {
        objectid id PK
        objectid owner_id FK
        string currency
    }
    TRANSACTION {
        objectid id PK
        string idempotency_key
        objectid from_account FK
        objectid to_account FK
        int amount
        datetime created_at
    }
    ENTRY {
        objectid id PK
        objectid account_id FK
        objectid tx_id FK
        int amount
        string direction
    }
    ACCOUNT ||--o{ ENTRY : has
    TRANSACTION ||--o{ ENTRY : creates`
        }
    },
    {
        id: '03',
        title: 'PrepSense-AI',
        category: 'AI Platform',
        description: 'An AI platform that parses a resume against a job description to generate a personalized interview-prep strategy.',
        longDescription: 'PrepSense-AI parses a user’s PDF resume against a target job description to generate a personalized interview-prep strategy. It uses the Gemini SDK with Zod-validated JSON to produce technical and behavioral questions plus a color-coded skill-gap analysis, and a Puppeteer pipeline that renders ATS-optimized resumes.',
        tech: ['React 19', 'Express 5', 'Gemini Flash', 'MongoDB', 'Puppeteer', 'Zod'],
        status: 'Live',
        image: '/prepsenseAI.png',
        github: 'https://github.com/souvik-biswas-dev/PrepSense-AI',
        live: null,
        impact: ['Resume vs JD Analysis', 'Skill-Gap Report', 'ATS PDF Generation'],
        challenges: [
            {
                title: 'Unreliable LLM Output',
                description: 'Raw LLM responses are free-form and break downstream parsing.',
                solution: 'Constrained Gemini with Zod schema validation to enforce strict, typed JSON for questions and skill-gap scores.'
            },
            {
                title: 'ATS-Friendly Resumes',
                description: 'Users needed clean, machine-readable resumes generated from the AI feedback.',
                solution: 'Built a server-side HTML-to-PDF pipeline with Puppeteer that renders ATS-optimized resumes on demand.'
            },
            {
                title: 'Messy Resume Input',
                description: 'Resumes arrive as PDFs with inconsistent layouts and formatting.',
                solution: 'Extracted text server-side and fed it with the job description into the model to ground the analysis in real content.'
            }
        ],
        size: 'medium',
        color: 'from-purple-500/20 to-pink-500/20',
        architecture: {
            hld: `flowchart TB
    UI["React 19 SPA"]
    API["Express 5 API"]
    PDF["PDF Parser"]
    AI["Gemini Flash\n+ Zod Schema"]
    PUP["Puppeteer\nHTML to PDF"]
    DB[("MongoDB")]

    UI -->|Resume + JD| API
    API --> PDF
    PDF --> AI
    AI -->|Validated JSON| API
    API --> DB
    API -->|Generate| PUP
    PUP -->|ATS PDF| UI`,

            lld: `flowchart LR
    subgraph Routes
        UP["/analyze\nresume + jd"]
        GEN["/resume/pdf"]
    end
    subgraph Services
        PS["ParserService\nextractText"]
        AIS["AIService\ncallGemini + zodParse"]
        RS["RenderService\nhtmlToPdf"]
    end
    UP --> PS
    PS --> AIS
    AIS --> DB[("MongoDB")]
    GEN --> RS`,

            classDiagram: `classDiagram
    class Resume {
        +ObjectId _id
        +String rawText
        +String[] skills
        +parse()
    }
    class Analysis {
        +ObjectId _id
        +ObjectId resumeId
        +int matchScore
        +Question[] questions
        +SkillGap[] gaps
    }
    class SkillGap {
        +String skill
        +String level
        +String color
    }
    Resume "1" --> "1" Analysis : produces
    Analysis "1" --> "*" SkillGap : contains`,

            dataFlow: `sequenceDiagram
    participant U as User
    participant API as Express
    participant P as PDF Parser
    participant G as Gemini Flash
    participant Z as Zod
    participant DB as MongoDB

    U->>API: Upload resume + JD
    API->>P: Extract resume text
    P-->>API: Plain text
    API->>G: Prompt(resume, jd)
    G-->>Z: Raw JSON
    Z-->>API: Validated questions + gaps
    API->>DB: Persist analysis
    API-->>U: Prep strategy + skill-gap report`,

            infrastructure: `flowchart TB
    subgraph Client
        React["React 19\nVite Build"]
    end
    subgraph Server["Node Container"]
        Express["Express 5 API"]
        Chrome["Headless Chromium\n(Puppeteer)"]
    end
    Gemini["Gemini API"]
    Mongo[("MongoDB")]

    React --> Express
    Express --> Gemini
    Express --> Mongo
    Express --> Chrome`,

            erDiagram: `erDiagram
    RESUME {
        objectid id PK
        string raw_text
        json skills
        datetime created_at
    }
    ANALYSIS {
        objectid id PK
        objectid resume_id FK
        int match_score
        json questions
    }
    SKILL_GAP {
        objectid id PK
        objectid analysis_id FK
        string skill
        string level
        string color
    }
    RESUME ||--|| ANALYSIS : produces
    ANALYSIS ||--o{ SKILL_GAP : contains`
        }
    },
    {
        id: '04',
        title: 'StreamSense',
        category: 'AI Streaming',
        description: 'A highly concurrent Go (Gin) REST API powering an AI-enhanced movie streaming platform.',
        longDescription: 'StreamSense is an AI-enhanced movie streaming platform backed by a highly concurrent Go (Gin) REST API and MongoDB. It uses stateless JWT access/refresh rotation in secure HttpOnly cookies, and a LangChainGo + OpenAI sentiment pipeline that maps admin reviews to ranking scores for genre-based recommendations.',
        tech: ['React (Vite)', 'Go (Gin)', 'MongoDB', 'LangChainGo', 'OpenAI'],
        status: 'Completed',
        image: '/steamsense.png',
        github: 'https://github.com/souvik-biswas-dev/StreamSense',
        live: null,
        impact: ['Concurrent Go API', 'JWT Token Rotation', 'AI Sentiment Ranking'],
        challenges: [
            {
                title: 'Stateless, Secure Auth',
                description: 'The API had to stay stateless while defending against XSS and CSRF.',
                solution: 'Designed JWT access/refresh token rotation stored in secure HttpOnly cookies to mitigate XSS and CSRF.'
            },
            {
                title: 'Recommendation Signal',
                description: 'Genre recommendations needed a quality signal beyond raw metadata.',
                solution: 'Integrated LangChainGo + OpenAI to run sentiment analysis on admin reviews and map them to ranking scores.'
            },
            {
                title: 'High Concurrency',
                description: 'Streaming traffic demands a high-throughput backend.',
                solution: 'Built the API in Go (Gin) to exploit goroutines for concurrent request handling over MongoDB.'
            }
        ],
        size: 'medium',
        color: 'from-orange-500/20 to-red-500/20',
        architecture: {
            hld: `flowchart TB
    UI["React (Vite) SPA"]
    AUTH["JWT Rotation\nHttpOnly Cookies"]
    GIN["Go (Gin) API\nGoroutines"]
    LC["LangChainGo\n+ OpenAI"]
    DB[("MongoDB")]

    UI -->|HTTPS| AUTH
    AUTH --> GIN
    GIN --> DB
    GIN -->|Admin Reviews| LC
    LC -->|Sentiment Score| GIN`,

            lld: `flowchart LR
    subgraph Handlers
        AH["AuthHandler\nlogin | refresh"]
        MH["MovieHandler\nlist | stream"]
        RH["ReviewHandler\ncreate | rank"]
    end
    subgraph Services
        TS["TokenService\nrotate"]
        SS["SentimentService\nanalyze"]
        RS["RankingService\nscore"]
    end
    AH --> TS
    RH --> SS
    SS --> RS
    MH --> DB[("MongoDB")]
    RS --> DB`,

            classDiagram: `classDiagram
    class User {
        +string ID
        +string Email
        +string RefreshHash
        +Rotate()
    }
    class Movie {
        +string ID
        +string Title
        +string Genre
        +float RankScore
    }
    class Review {
        +string ID
        +string MovieID
        +string Body
        +float Sentiment
        +Analyze()
    }
    User "1" --> "*" Review : writes
    Movie "1" --> "*" Review : receives`,

            dataFlow: `sequenceDiagram
    participant A as Admin
    participant G as Gin API
    participant L as LangChainGo
    participant O as OpenAI
    participant DB as MongoDB

    A->>G: POST /reviews
    G->>L: Analyze review text
    L->>O: Sentiment prompt
    O-->>L: Sentiment score
    L-->>G: Normalized score
    G->>DB: Update movie rankScore
    DB-->>G: OK
    G-->>A: Review stored + ranked`,

            infrastructure: `flowchart TB
    subgraph Client
        Vite["React (Vite)"]
    end
    subgraph Server["Go Service"]
        Gin["Gin REST API"]
    end
    OpenAI["OpenAI API"]
    Mongo[("MongoDB")]

    Vite --> Gin
    Gin --> Mongo
    Gin --> OpenAI`,

            erDiagram: `erDiagram
    USER {
        string id PK
        string email
        string refresh_hash
    }
    MOVIE {
        string id PK
        string title
        string genre
        float rank_score
    }
    REVIEW {
        string id PK
        string movie_id FK
        string user_id FK
        string body
        float sentiment
    }
    USER ||--o{ REVIEW : writes
    MOVIE ||--o{ REVIEW : receives`
        }
    },
];
