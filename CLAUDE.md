## Agent skills

### Issue tracker

Le issue vivono su GitHub Issues (`hawz/opera-lirica`), gestite via CLI `gh`. Vedi `docs/agents/issue-tracker.md`.

### Triage labels

Etichette canoniche di default (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). Vedi `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` alla radice del repo. Vedi `docs/agents/domain.md`.

## Tooling locale

- **Test**: `npm run test` (Vitest)
- **Lint**: `npm run lint` (ESLint via il modulo `@nuxt/eslint`, copre `.vue`/`.js`/`.ts`)

CI configurata (`.github/workflows/ci.yml`): entrambi i comandi girano automaticamente su ogni PR e su ogni push a `main`.
