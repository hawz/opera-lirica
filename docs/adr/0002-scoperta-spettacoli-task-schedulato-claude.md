# Scoperta periodica degli Spettacoli via task schedulato Claude, non job su Netlify/GitHub Actions

Per l'issue #27 (scoperta periodica di nuovi Spettacoli per tenere aggiornato il Palinsesto), il contenuto resta markdown semi-statico generato via PR e revisionato da un umano, esattamente come previsto dall'ADR 0001: cambia solo chi scrive la bozza (un agente invece di un umano), non il modello dei dati né la pipeline di pubblicazione. Nessun teatro italiano espone un feed o un'API pubblica, quindi la scoperta richiede ragionamento su fonti non strutturate (siti ufficiali, stampa) invece di interrogare una fonte stabile. Per questo la v1 pilota usa un task schedulato Claude, che non richiede nuova infrastruttura (nessuna chiave API da gestire, nessun costo separato da tracciare) e gestisce nativamente il ragionamento su fonti non strutturate.

## Considered Options

- **Netlify Scheduled Function + chiamata a un'API LLM**: richiederebbe infrastruttura nuova (secret, script da mantenere) ed è pensata per servire il sito, non per job batch schedulati — peggiore di GitHub Actions per questo caso.
- **GitHub Actions schedulato + chiamata a un'API LLM**: gira in infrastruttura cloud propria, indipendente da qualunque app aperta localmente, ma richiede comunque una chiave API come secret del repo, un budget separato e uno script da mantenere.
- **Task schedulato Claude (scelto)**: zero infrastruttura nuova, usa l'utilizzo/billing Claude già esistente, ragiona direttamente su contenuto non strutturato.

## Consequences

Il task gira solo mentre l'app Claude desktop è aperta su questa macchina: se è chiusa all'orario previsto, la run parte al prossimo avvio (ritardata, non persa). Accettato per la v1 pilota (3 teatri, cadenza settimanale); da rivedere verso GitHub Actions + API se l'automazione si dimostra utile e si vuole una versione sempre attiva, indipendente dall'app.
