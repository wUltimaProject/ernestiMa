/**
 * Domande del questionario UCP
 * Formulate in linguaggio non tecnico con spiegazioni dettagliate
 */
import { Question, QuestionType } from "./types";

export const TECHNICAL_FACTOR_QUESTIONS: Question[] = [
  {
    id: "t1_distributed",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Il sistema deve funzionare su più computer o server?",
    description:
      "Il sistema è distribuito su più nodi, server, servizi esterni, database remoti o microservizi?",
    helpText: `📋 Cosa significa "sistema distribuito"?

Un sistema distribuito è quando il software funziona su più computer/server che comunicano tra loro, invece di essere tutto su un solo computer.

🔍 Esempi pratici per capire meglio:

📱 App Mobile:
• SÌ, è distribuito (valore 3-4) perché:
  - L'app gira sul telefono (client)
  - I dati e la logica sono su server remoti
  - App e server comunicano via internet
  - Spesso ci sono più servizi (autenticazione, database, notifiche push) su server diversi

🌐 Web App / CMS:
• SÌ, è distribuito (valore 3-5) perché:
  - Il browser (client) comunica con server web
  - I dati sono su database separato
  - Spesso ci sono servizi esterni (CDN, backup, email)
  - In caso di CMS complesso: più server, cache, load balancing

🌍 Sito Web Semplice:
• DIPENDE:
  - Sito statico (solo HTML/CSS) = NO (valore 0-1), tutto su un server
  - Sito con database = SÌ (valore 2-3), almeno client + server + database
  - Sito con servizi esterni = SÌ (valore 3-4), più componenti distribuiti

💡 Domanda pratica: Il tuo sistema ha parti che girano su computer diversi e devono "parlarsi"?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t2_performance",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante la velocità e le prestazioni del sistema?",
    description:
      "Il sistema deve rispondere molto velocemente o gestire grandi quantità di dati in poco tempo?",
    helpText: `📋 Cosa significa "prestazioni"?

Le prestazioni sono quanto velocemente il sistema risponde alle richieste degli utenti e quanto velocemente elabora i dati.

Esempi:
• 0 = Non importa se ci mette qualche secondo in più (es. sistema interno per pochi utenti)
• 2-3 = Deve essere abbastanza veloce (es. sito web normale, app aziendale)
• 4-5 = Deve essere MOLTO veloce (es. sistema di trading, app di pagamento, ricerca in tempo reale)

💡 Domanda pratica: Gli utenti si accorgerebbero se il sistema fosse lento? Quanto è importante la velocità?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t3_user_efficiency",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante rendere il sistema facile e veloce da usare?",
    description:
      "Quanto sforzo serve per rendere l'interfaccia intuitiva, ridurre i click, automatizzare operazioni?",
    helpText: `📋 Cosa significa "efficienza utente"?

Significa quanto lavoro serve per rendere il sistema comodo e veloce da usare per l'utente finale (meno click, automatismi, interfaccia intuitiva).

Esempi:
• 0 = Interfaccia base, l'utente può fare le operazioni ma senza particolari ottimizzazioni
• 2-3 = Interfaccia curata, qualche automatismo (es. autocompletamento, salvataggio automatico)
• 4-5 = Interfaccia molto ottimizzata, molti automatismi, riduzione massima dei click, UX professionale

💡 Domanda pratica: Quanto tempo e sforzo serve per rendere l'interfaccia davvero comoda e veloce da usare?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t4_complex_processing",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto sono complesse le regole di business e la logica interna?",
    description:
      "Il sistema deve gestire regole complicate, algoritmi complessi, intelligenza artificiale?",
    helpText: `📋 Cosa significa "logica interna complessa"?

Significa quanto sono complicate le regole e i calcoli che il sistema deve fare "dietro le quinte", non quello che vede l'utente.

Esempi:
• 0 = Logica semplice (es. salvare dati, mostrare liste, calcoli base)
• 2-3 = Logica media (es. calcoli finanziari, regole di business articolate, validazioni complesse)
• 4-5 = Logica molto complessa (es. algoritmi avanzati, intelligenza artificiale, analisi dati complesse, sistemi di raccomandazione)

💡 Domanda pratica: Il sistema deve fare calcoli o decisioni complicate, o è principalmente "salva e mostra"?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t5_reusability",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante che il codice sia riutilizzabile e modulare?",
    description:
      "Il codice deve essere organizzato in componenti riutilizzabili, ben testato, con logging?",
    helpText: `📋 Cosa significa "codice riutilizzabile"?

Significa organizzare il codice in "pezzi" che possono essere riutilizzati in altre parti del sistema o in progetti futuri, invece di riscrivere tutto ogni volta.

Esempi:
• 0 = Codice semplice, ogni parte è specifica per quella funzionalità
• 2-3 = Alcuni componenti riutilizzabili, codice organizzato in moduli
• 4-5 = Codice molto modulare, componenti riutilizzabili, test automatici, logging completo

💡 Domanda pratica: Il codice deve essere organizzato per essere riutilizzato o va bene che sia specifico per questo progetto?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t6_easy_install",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante che l'installazione sia semplice e automatizzata?",
    description:
      "Il sistema deve essere facile da installare, configurare e distribuire?",
    helpText: `📋 Cosa significa "installazione automatizzata"?

Significa quanto è facile installare e configurare il sistema su un nuovo computer/server, senza dover fare molti passaggi manuali.

Esempi:
• 0 = Installazione manuale semplice (es. copiare file, configurare a mano)
• 2-3 = Installazione semi-automatizzata (es. script di installazione, configurazione guidata)
• 4-5 = Installazione completamente automatizzata (es. un click, distribuzione automatica, CI/CD, app store)

💡 Domanda pratica: Quanto deve essere facile installare il sistema su un nuovo computer?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t7_usability",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto sforzo serve per rendere il sistema facile da usare?",
    description:
      "Quanto lavoro tecnico serve per creare un'interfaccia intuitiva, accessibile e ben progettata?",
    helpText: `📋 Cosa significa "usabilità"?

Significa quanto lavoro serve per rendere l'interfaccia intuitiva e facile da capire per gli utenti, anche senza istruzioni.

Esempi:
• 0 = Interfaccia base, funziona ma non particolarmente curata
• 2-3 = Interfaccia ben progettata, testata con alcuni utenti, abbastanza intuitiva
• 4-5 = Interfaccia molto curata, molti test con utenti, design professionale, accessibile a tutti

💡 Domanda pratica: Quanto tempo serve per rendere l'interfaccia davvero intuitiva e facile da usare?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t8_portability",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Su quante piattaforme o dispositivi deve funzionare il sistema?",
    description:
      "Il sistema deve funzionare su più sistemi operativi, browser, dispositivi o ambienti cloud?",
    helpText: `📋 Cosa significa "piattaforme"?

Significa su quanti tipi diversi di computer, sistemi operativi, browser o dispositivi deve funzionare il sistema.

Esempi:
• 0 = Una sola piattaforma (es. solo Windows, solo Chrome, solo desktop)
• 2-3 = Alcune piattaforme (es. Windows e Mac, Chrome e Firefox, desktop e mobile)
• 4-5 = Molte piattaforme (es. Windows, Mac, Linux, iOS, Android, tutti i browser, cloud)

💡 Domanda pratica: Il sistema deve funzionare su più tipi di computer/dispositivi o solo su uno?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t9_easy_change",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante che il sistema sia facile da modificare e aggiornare?",
    description:
      "Il sistema deve essere progettato per essere facilmente modificabile, estendibile e correggibile?",
    helpText: `📋 Cosa significa "facile da modificare"?

Significa quanto è importante che il sistema sia organizzato in modo da poter essere modificato, aggiornato o corretto facilmente in futuro.

Esempi:
• 0 = Modifiche semplici, sistema base senza particolare struttura
• 2-3 = Sistema organizzato, modifiche abbastanza facili, codice ben strutturato
• 4-5 = Sistema molto modulare, facile da estendere, ben documentato, facile da mantenere

💡 Domanda pratica: Quanto è importante che il sistema possa essere modificato facilmente in futuro?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t10_concurrent",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanti utenti devono poter usare il sistema contemporaneamente?",
    description:
      "Il sistema deve gestire molte attività simultanee (download/upload, chat in tempo reale, notifiche, sincronizzazione)?",
    helpText: `📋 Cosa significa "utenti simultanei"?

Significa quante persone devono poter usare il sistema nello stesso momento, facendo operazioni diverse contemporaneamente.

Esempi:
• 0 = Un utente alla volta o pochissimi utenti simultanei
• 2-3 = Alcuni utenti simultanei (es. sistema aziendale per 10-50 persone)
• 4-5 = Molti utenti simultanei (es. sito web pubblico, app con migliaia di utenti, chat in tempo reale)

💡 Domanda pratica: Quante persone devono poter usare il sistema nello stesso momento?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t11_security",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto è importante la sicurezza avanzata?",
    description:
      "Il sistema richiede misure di sicurezza particolari oltre la protezione base dei dati?",
    helpText: `📋 Cosa significa "sicurezza avanzata"?

Significa quanto è importante proteggere i dati e il sistema oltre alle protezioni base (password, connessione sicura).

Esempi:
• 0 = Sicurezza base (es. password, connessione sicura)
• 2-3 = Sicurezza media (es. autenticazione a due fattori, crittografia dati)
• 4-5 = Sicurezza avanzata (es. autenticazione multipla, crittografia avanzata, compliance rigorose, audit di sicurezza)

💡 Domanda pratica: I dati sono sensibili? Serve una protezione particolare oltre a password e connessione sicura?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t12_third_party",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Il sistema deve permettere accesso diretto a terze parti?",
    description:
      "Il sistema deve esporre funzionalità o dati a soggetti esterni tramite API o SDK?",
    helpText: `📋 Cosa significa "accesso a terze parti"?

Significa se altri sviluppatori o sistemi esterni devono poter accedere direttamente alle funzionalità o ai dati del tuo sistema tramite interfacce programmate (API).

Esempi:
• 0 = Nessun accesso esterno, solo utenti interni usano il sistema
• 2-3 = Alcuni accessi esterni (es. API per partner specifici, integrazione con alcuni sistemi)
• 4-5 = Molti accessi esterni (es. API pubbliche, SDK per sviluppatori, sistema aperto a integrazioni)

💡 Domanda pratica: Altri sviluppatori o sistemi esterni devono poter "parlare" direttamente con il tuo sistema?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
  {
    id: "t13_training",
    type: QuestionType.TECHNICAL_FACTOR,
    title: "Quanto sforzo serve per formare gli utenti?",
    description:
      "Quanto lavoro serve per creare manuali, corsi, tutorial o supporto per aiutare gli utenti a imparare il sistema?",
    helpText: `📋 Cosa significa "formazione utenti"?

Significa quanto lavoro serve per creare materiale (manuali, video, tutorial, corsi) che aiuti gli utenti a imparare a usare il sistema.

Esempi:
• 0 = Sistema intuitivo, gli utenti capiscono subito come usarlo senza istruzioni
• 2-3 = Serve qualche guida o tutorial base, sistema abbastanza intuitivo
• 4-5 = Serve formazione estesa (es. manuali completi, corsi, video tutorial, supporto dedicato)

💡 Domanda pratica: Gli utenti hanno bisogno di istruzioni per usare il sistema o è così intuitivo che capiscono subito?`,
    minValue: 0,
    maxValue: 5,
    required: true,
  },
];

export const ENVIRONMENTAL_FACTOR_QUESTIONS: Question[] = [
  {
    id: "e1_process_familiarity",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanto il team conosce il processo di sviluppo usato?",
    description:
      "Il team è abituato al metodo di lavoro adottato (Agile, Scrum, Waterfall, DevOps)?",
    helpText: `📋 Cosa significa "processo di sviluppo"?

È il metodo di lavoro che il team usa per sviluppare il software (come si organizzano, come pianificano, come lavorano insieme).

Esempi:
• 1 = Processo nuovo, il team non lo conosce bene o lo sta imparando
• 3 = Processo conosciuto, il team lo usa da qualche tempo
• 5 = Processo molto familiare, il team lo usa da tempo e lo conosce bene

💡 Domanda pratica: Il team è abituato a lavorare con questo metodo o è la prima volta?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e2_application_experience",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanta esperienza ha il team nel dominio applicativo?",
    description:
      "Il team conosce il settore, il business e il tipo di applicazione?",
    helpText: `📋 Cosa significa "dominio applicativo"?

È il settore o il tipo di business per cui stai sviluppando il sistema (es. e-commerce, sanità, finanza, educazione).

Esempi:
• 1 = Settore nuovo, il team non ha mai lavorato su questo tipo di applicazione
• 3 = Settore conosciuto, il team ha qualche esperienza
• 5 = Settore molto conosciuto, il team ha molta esperienza in questo tipo di applicazioni

💡 Domanda pratica: Il team ha già lavorato su progetti simili in questo settore?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e3_dev_experience",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanta esperienza tecnica ha il team?",
    description:
      "Il team conosce bene i linguaggi, framework e strumenti usati nel progetto?",
    helpText: `📋 Cosa significa "esperienza tecnica"?

È quanto il team conosce e sa usare le tecnologie (linguaggi di programmazione, strumenti, framework) scelte per questo progetto.

Esempi:
• 1 = Tecnologie nuove, il team le sta imparando
• 3 = Tecnologie conosciute, il team le ha usate qualche volta
• 5 = Tecnologie molto conosciute, il team le usa da tempo e le conosce bene

💡 Domanda pratica: Il team sa già usare bene le tecnologie scelte per questo progetto?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e4_lead_analyst",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanto è capace l'analista principale?",
    description:
      "L'analista principale è bravo a raccogliere e chiarire i requisiti? Il cliente è coinvolto?",
    helpText: `📋 Cosa significa "analista principale"?

È la persona che raccoglie e chiarisce i requisiti del progetto, che "traduce" quello che vuole il cliente in specifiche tecniche.

Esempi:
• 1 = Analista poco esperto, requisiti poco chiari, cliente poco coinvolto
• 3 = Analista con esperienza, requisiti abbastanza chiari, cliente coinvolto
• 5 = Analista molto capace, requisiti molto chiari e ben definiti, cliente molto coinvolto

💡 Domanda pratica: Chi raccoglie i requisiti è bravo e i requisiti sono chiari?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e5_motivation",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanto è motivato il team?",
    description:
      "Il team è coinvolto, proattivo e motivato sul progetto?",
    helpText: `📋 Cosa significa "motivazione del team"?

È quanto il team è entusiasta, coinvolto e proattivo sul progetto, quanto ci tiene a farlo bene.

Esempi:
• 1 = Poca motivazione, il team non è particolarmente interessato
• 3 = Motivazione media, il team lavora normalmente
• 5 = Alta motivazione, il team è molto coinvolto e proattivo

💡 Domanda pratica: Il team è entusiasta del progetto o lo fa solo perché deve?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e6_stable_requirements",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanto sono stabili e chiari i requisiti?",
    description:
      "I requisiti sono chiari e stabili, o cambiano spesso durante lo sviluppo?",
    helpText: `📋 Cosa significa "requisiti stabili"?

I requisiti sono quello che il sistema deve fare. "Stabili" significa che sono chiari e non cambiano spesso durante lo sviluppo.

Esempi:
• 1 = Requisiti molto instabili, cambiano spesso, poco chiari
• 3 = Requisiti abbastanza stabili, qualche cambiamento, abbastanza chiari
• 5 = Requisiti molto stabili e chiari, raramente cambiano

💡 Domanda pratica: I requisiti sono chiari fin dall'inizio o cambiano spesso durante lo sviluppo?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e7_part_time",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quante persone del team lavorano part-time sul progetto?",
    description:
      "Quanti membri del team non sono dedicati full-time al progetto?",
    helpText: `📋 Cosa significa "part-time sul progetto"?

Significa quante persone del team non sono dedicate completamente a questo progetto, ma lavorano anche su altri progetti o attività.

Esempi:
• 1 = Tutti dedicati full-time al progetto
• 3 = Alcuni lavorano part-time o su più progetti
• 5 = Molti lavorano part-time o non sono dedicati al progetto

💡 Domanda pratica: Quante persone del team sono dedicate completamente a questo progetto?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
  {
    id: "e8_difficult_language",
    type: QuestionType.ENVIRONMENTAL_FACTOR,
    title: "Quanto è difficile o poco familiare il linguaggio di programmazione?",
    description:
      "Il linguaggio usato è complesso o il team non lo conosce bene?",
    helpText: `📋 Cosa significa "linguaggio di programmazione"?

È il linguaggio usato per scrivere il codice del sistema (es. Java, Python, JavaScript, C++).

Esempi:
• 1 = Linguaggio semplice e molto conosciuto dal team
• 3 = Linguaggio di media difficoltà o abbastanza conosciuto
• 5 = Linguaggio complesso o poco conosciuto dal team

💡 Domanda pratica: Il linguaggio scelto è facile da usare e il team lo conosce bene?`,
    minValue: 1,
    maxValue: 5,
    required: true,
  },
];

// Pesi dei fattori tecnici (dal file Excel)
export const TECHNICAL_FACTOR_WEIGHTS: Record<string, number> = {
  t1_distributed: 2.0,
  t2_performance: 1.0,
  t3_user_efficiency: 1.0,
  t4_complex_processing: 1.0,
  t5_reusability: 1.0,
  t6_easy_install: 0.5,
  t7_usability: 0.5,
  t8_portability: 2.0,
  t9_easy_change: 1.0,
  t10_concurrent: 1.0,
  t11_security: 1.0,
  t12_third_party: 1.0,
  t13_training: 1.0,
};

// Pesi dei fattori ambientali (dal file Excel)
export const ENVIRONMENTAL_FACTOR_WEIGHTS: Record<string, number> = {
  e1_process_familiarity: 1.5,
  e2_application_experience: 0.5,
  e3_dev_experience: 1.0,
  e4_lead_analyst: 0.5,
  e5_motivation: 1.0,
  e6_stable_requirements: 2.0,
  e7_part_time: -1.0,
  e8_difficult_language: 2.0,
};
