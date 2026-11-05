# Opera Lirica

Enciclopedia pubblica delle opere liriche, organizzata per compositore, bilingue (IT/EN, con FR in arrivo). Un solo contesto: questo è l'unico `GLOSSARY.md` del repo.

## Language

**Opera**:
Un'opera lirica: il contenuto principale del sito, con titolo, anno, tagline, personaggi, atti, aria celebre e finale.
_Avoid_: Spettacolo (riservato al significato di rappresentazione dal vivo in un teatro, vedi sezione Scope futuro), opera lirica per intero (ridondante, "Opera" basta nel contesto di questo progetto).

**Compositore**:
L'autore di un'Opera. Ogni Opera appartiene a un solo Compositore; il sito raggruppa le Opere per Compositore.
_Avoid_: Autore, artista.

**Personaggio**:
Un ruolo all'interno di un'Opera, con nome, voce (tipologia vocale) e descrizione.
_Avoid_: Ruolo, parte.

**Atto**:
Una sezione narrativa dell'Opera, con titolo e testo. Un'Opera ha una sequenza ordinata di Atti.
_Avoid_: Scena (un Atto può contenere più scene, ma il modello attuale non le distingue), capitolo.

**Aria**:
Il brano musicale celebre associato a un'Opera, con nome e descrizione. Al massimo una per Opera nel modello attuale.
_Avoid_: Brano, canzone.

**Finale**:
Il testo che descrive la conclusione narrativa dell'Opera.
_Avoid_: Epilogo, conclusione.

**Locale**:
Una delle collection di contenuto (`en`, `it`, `fr`) definite in `content.config.ts`. Ogni Locale ha il proprio set completo di Opere tradotte.
_Avoid_: Lingua (Lingua è l'attributo umano; Locale è la collection tecnica di contenuto).

**Teatro**:
Un luogo fisico dove si rappresentano Opere dal vivo. Per la v1 limitato a teatri in Italia; associato a una città/zona scelta dall'utente tra quelle coperte dal catalogo, non a una posizione geografica continua (nessun calcolo di distanza).
_Avoid_: Sala, venue.

## Scope futuro (non ancora implementato)

Termini introdotti in sede di pianificazione per una fase successiva (programmazione spettacoli). Provvisori: da affinare quando questa fase verrà effettivamente progettata.

**Palinsesto**:
L'insieme degli Spettacoli futuri (non ancora andati in scena) programmati in un Teatro. Uno Spettacolo con data passata esce automaticamente dal Palinsesto pubblico.
_Avoid_: Calendario, programmazione (usabile come sinonimo descrittivo, ma "Palinsesto" è il termine canonico).

**Spettacolo**:
Una singola rappresentazione dal vivo di un'Opera, in un Teatro, in una data specifica. Fa sempre riferimento a un'Opera già catalogata (stesso slug): non esistono Spettacoli di opere non censite nel sito. Distinto da "Opera": l'Opera è il contenuto editoriale, lo Spettacolo è l'evento.
_Avoid_: Opera (per l'evento), show, performance.
