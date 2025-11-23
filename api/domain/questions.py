"""
Definizione delle domande per il questionario UCP
Domande formulate in linguaggio non tecnico per utenti non esperti
"""
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum


class QuestionType(Enum):
    """Tipi di domande"""
    USE_CASE = "use_case"
    ACTOR = "actor"
    TECHNICAL_FACTOR = "technical_factor"
    ENVIRONMENTAL_FACTOR = "environmental_factor"
    NUMERIC = "numeric"
    SELECT = "select"


@dataclass
class Question:
    """Domanda del questionario"""
    id: str
    type: QuestionType
    title: str
    description: str
    help_text: Optional[str] = None
    options: Optional[List[str]] = None
    min_value: Optional[int] = None
    max_value: Optional[int] = None
    required: bool = True


# Domande per classificare i casi d'uso
USE_CASE_QUESTIONS = [
    Question(
        id="uc_complexity",
        type=QuestionType.SELECT,
        title="Quanto è complesso questo caso d'uso?",
        description="Valuta la complessità del caso d'uso considerando: interfaccia utente, numero di passaggi, entità database coinvolte, classi necessarie",
        help_text="Semplice: interfaccia base, 3 o meno passaggi, 1 entità database, meno di 5 classi. Medio: interfaccia più articolata, 4-7 passaggi, 2+ entità database, 5-10 classi. Complesso: interfaccia complessa, più di 7 passaggi, 3+ entità database, più di 10 classi",
        options=["Semplice", "Medio", "Complesso"],
    ),
]

# Domande per classificare gli attori
ACTOR_QUESTIONS = [
    Question(
        id="actor_type",
        type=QuestionType.SELECT,
        title="Che tipo di attore è?",
        description="Un attore è chi o cosa interagisce con il sistema",
        help_text="Semplice: sistema esterno con API definita. Medio: sistema esterno che comunica via protocollo (es. TCP/IP). Complesso: persona che usa un'interfaccia",
        options=["Semplice (sistema con API)", "Medio (sistema via protocollo)", "Complesso (persona)"],
    ),
]

# Domande per i fattori tecnici (TCF)
TECHNICAL_FACTOR_QUESTIONS = [
    Question(
        id="t1_distributed",
        type=QuestionType.NUMERIC,
        title="Il sistema deve funzionare su più computer o server?",
        description="Il sistema è distribuito su più nodi, server, servizi esterni, database remoti o microservizi?",
        help_text="0 = No, tutto su un solo computer. 5 = Sì, sistema molto distribuito con molti componenti che comunicano tra loro",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t2_performance",
        type=QuestionType.NUMERIC,
        title="Quanto è importante la velocità e le prestazioni del sistema?",
        description="Il sistema deve rispondere molto velocemente o gestire grandi quantità di dati in poco tempo?",
        help_text="0 = Le prestazioni non sono critiche. 5 = Prestazioni molto importanti, tempi di risposta stringenti",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t3_user_efficiency",
        type=QuestionType.NUMERIC,
        title="Quanto è importante rendere il sistema facile e veloce da usare?",
        description="Quanto sforzo serve per rendere l'interfaccia intuitiva, ridurre i click, automatizzare operazioni?",
        help_text="0 = Interfaccia semplice, nessuna ottimizzazione particolare. 5 = Interfaccia molto curata, molti automatismi, UX ottimizzata",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t4_complex_processing",
        type=QuestionType.NUMERIC,
        title="Quanto sono complesse le regole di business e la logica interna?",
        description="Il sistema deve gestire regole complicate, algoritmi complessi, intelligenza artificiale?",
        help_text="0 = Logica semplice e lineare. 5 = Logica molto complessa, algoritmi avanzati, AI/ML",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t5_reusability",
        type=QuestionType.NUMERIC,
        title="Quanto è importante che il codice sia riutilizzabile e modulare?",
        description="Il codice deve essere organizzato in componenti riutilizzabili, ben testato, con logging?",
        help_text="0 = Codice semplice, nessuna particolare struttura. 5 = Codice molto modulare, test completo, logging esteso",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t6_easy_install",
        type=QuestionType.NUMERIC,
        title="Quanto è importante che l'installazione sia semplice e automatizzata?",
        description="Il sistema deve essere facile da installare, configurare e distribuire?",
        help_text="0 = Installazione manuale semplice. 5 = Installazione completamente automatizzata (CI/CD, store, provisioning)",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t7_usability",
        type=QuestionType.NUMERIC,
        title="Quanto sforzo serve per rendere il sistema facile da usare?",
        description="Quanto lavoro tecnico serve per creare un'interfaccia intuitiva, accessibile e ben progettata?",
        help_text="0 = Interfaccia base, poco sforzo. 5 = Interfaccia molto curata, molti test utente, design professionale",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t8_portability",
        type=QuestionType.NUMERIC,
        title="Su quante piattaforme o dispositivi deve funzionare il sistema?",
        description="Il sistema deve funzionare su più sistemi operativi, browser, dispositivi o ambienti cloud?",
        help_text="0 = Una sola piattaforma. 5 = Molte piattaforme diverse (Windows, Mac, Linux, mobile, web, cloud)",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t9_easy_change",
        type=QuestionType.NUMERIC,
        title="Quanto è importante che il sistema sia facile da modificare e aggiornare?",
        description="Il sistema deve essere progettato per essere facilmente modificabile, estendibile e correggibile?",
        help_text="0 = Modifiche semplici, nessuna particolare struttura. 5 = Sistema molto modulare, facile da estendere e mantenere",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t10_concurrent",
        type=QuestionType.NUMERIC,
        title="Quanti utenti devono poter usare il sistema contemporaneamente?",
        description="Il sistema deve gestire molte attività simultanee (download/upload, chat in tempo reale, notifiche, sincronizzazione)?",
        help_text="0 = Un utente alla volta o pochi. 5 = Molti utenti simultanei, attività concorrenti complesse",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t11_security",
        type=QuestionType.NUMERIC,
        title="Quanto è importante la sicurezza avanzata?",
        description="Il sistema richiede misure di sicurezza particolari oltre la protezione base dei dati?",
        help_text="0 = Sicurezza base. 5 = Sicurezza avanzata (autenticazione a due fattori, cifratura, compliance rigorose)",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t12_third_party",
        type=QuestionType.NUMERIC,
        title="Il sistema deve permettere accesso diretto a terze parti?",
        description="Il sistema deve esporre funzionalità o dati a soggetti esterni tramite API o SDK?",
        help_text="0 = Nessun accesso esterno. 5 = Molte API pubbliche, SDK per sviluppatori esterni",
        min_value=0,
        max_value=5,
    ),
    Question(
        id="t13_training",
        type=QuestionType.NUMERIC,
        title="Quanto sforzo serve per formare gli utenti?",
        description="Quanto lavoro serve per creare manuali, corsi, tutorial o supporto per aiutare gli utenti a imparare il sistema?",
        help_text="0 = Sistema intuitivo, nessuna formazione necessaria. 5 = Sistema complesso, formazione estesa richiesta",
        min_value=0,
        max_value=5,
    ),
]

# Domande per i fattori ambientali (ECF)
ENVIRONMENTAL_FACTOR_QUESTIONS = [
    Question(
        id="e1_process_familiarity",
        type=QuestionType.NUMERIC,
        title="Quanto il team conosce il processo di sviluppo usato?",
        description="Il team è abituato al metodo di lavoro adottato (Agile, Scrum, Waterfall, DevOps)?",
        help_text="1 = Poco familiare, processo nuovo. 5 = Molto familiare, processo consolidato",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e2_application_experience",
        type=QuestionType.NUMERIC,
        title="Quanta esperienza ha il team nel dominio applicativo?",
        description="Il team conosce il settore, il business e il tipo di applicazione?",
        help_text="1 = Poca esperienza, dominio nuovo. 5 = Molta esperienza, dominio ben conosciuto",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e3_dev_experience",
        type=QuestionType.NUMERIC,
        title="Quanta esperienza tecnica ha il team?",
        description="Il team conosce bene i linguaggi, framework e strumenti usati nel progetto?",
        help_text="1 = Poca esperienza, tecnologie nuove. 5 = Molta esperienza, tecnologie ben conosciute",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e4_lead_analyst",
        type=QuestionType.NUMERIC,
        title="Quanto è capace l'analista principale?",
        description="L'analista principale è bravo a raccogliere e chiarire i requisiti? Il cliente è coinvolto?",
        help_text="1 = Poca capacità, requisiti poco chiari. 5 = Alta capacità, requisiti ben definiti",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e5_motivation",
        type=QuestionType.NUMERIC,
        title="Quanto è motivato il team?",
        description="Il team è coinvolto, proattivo e motivato sul progetto?",
        help_text="1 = Poca motivazione. 5 = Alta motivazione, team molto coinvolto",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e6_stable_requirements",
        type=QuestionType.NUMERIC,
        title="Quanto sono stabili e chiari i requisiti?",
        description="I requisiti sono chiari e stabili, o cambiano spesso durante lo sviluppo?",
        help_text="1 = Requisiti molto instabili, cambiano spesso. 5 = Requisiti molto stabili e chiari",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e7_part_time",
        type=QuestionType.NUMERIC,
        title="Quante persone del team lavorano part-time sul progetto?",
        description="Quanti membri del team non sono dedicati full-time al progetto?",
        help_text="1 = Tutti full-time. 5 = Molti part-time o non dedicati",
        min_value=1,
        max_value=5,
    ),
    Question(
        id="e8_difficult_language",
        type=QuestionType.NUMERIC,
        title="Quanto è difficile o poco familiare il linguaggio di programmazione?",
        description="Il linguaggio usato è complesso o il team non lo conosce bene?",
        help_text="1 = Linguaggio semplice e ben conosciuto. 5 = Linguaggio complesso o poco familiare",
        min_value=1,
        max_value=5,
    ),
]


def get_all_questions() -> List[Question]:
    """Restituisce tutte le domande del questionario"""
    questions = []
    
    # Domande per casi d'uso (dinamiche, una per ogni caso d'uso)
    # Domande per attori (dinamiche, una per ogni attore)
    # Domande per fattori tecnici
    questions.extend(TECHNICAL_FACTOR_QUESTIONS)
    # Domande per fattori ambientali
    questions.extend(ENVIRONMENTAL_FACTOR_QUESTIONS)
    
    return questions

