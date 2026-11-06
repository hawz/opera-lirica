# Scoperta settimanale di nuovi Spettacoli

Implementa l'automazione descritta in #27 (v1 pilota). Vedi `docs/adr/0001-teatro-spettacolo-contenuto-semi-statico.md` e `docs/adr/0002-scoperta-spettacoli-task-schedulato-claude.md` per il contesto architetturale.

## Cos'è

Un task schedulato Claude (`mcp__scheduled-tasks__*`), non codice in questo repo: la sua configurazione e il suo prompt vivono sulla macchina dell'operatore, in `/Users/bigal/.claude/scheduled-tasks/opera-lirica-scoperta-spettacoli/SKILL.md`, non sotto version control.

- **Cadenza**: ogni lunedì alle 10:30 circa (ora locale).
- **Scope**: 3 teatri pilota già catalogati — Teatro alla Scala (`scala`), Teatro dell'Opera di Roma (`opera-roma`), Arena di Verona (`arena-verona`).
- **Orizzonte di ricerca**: prossimi 6 mesi da ogni run.
- **Budget**: massimo 6 ricerche web per run (2 per teatro).
- **Output**: apre o aggiorna (mai duplica) una Pull Request su questo repo con label `automazione-palinsesto`, mai una pubblicazione diretta su `main`. Nessuna PR se non trova nulla di nuovo o cambiato.
- **Decisione crea/aggiorna/salta**: delegata al modulo puro e testato `app/utils/spettacoli-automazione.js` (ticket #36), non al ragionamento del task per quella parte deterministica.
- **Limite noto**: gira solo mentre l'app Claude desktop è aperta su questa macchina; se chiusa all'orario previsto, la run parte al prossimo avvio (ritardata, non persa).

## Fuori scope (v1)

- Creazione automatica di nuove Opere (#28, deliberatamente rimandato)
- Cancellazione automatica di Spettacoli
- Notifiche oltre alla PR stessa su GitHub
- Teatri oltre ai 3 pilota, o cadenza diversa da settimanale

## Gestione

- Modificare prompt/cadenza: editare il task dall'app Claude (sezione "Scheduled") o con `mcp__scheduled-tasks__update_scheduled_task`.
- Vedere le run passate: `mcp__scheduled-tasks__list_task_runs` con `taskId: "opera-lirica-scoperta-spettacoli"`.
- Avviare una run manuale: `mcp__scheduled-tasks__run_scheduled_task`.
