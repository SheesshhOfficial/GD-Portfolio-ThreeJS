# Task P001 - Verified Portfolio Content Map

Status: READY
Owner: Antigravity
Reviewer: Codex

## Goal

Produce a compact, evidence-aware content plan for Ashish Ranjan's immersive game-development portfolio. This is planning and read-only investigation. Do not build the website or modify Unreal.

## Read first

1. `AGENTS.md`
2. `PROJECT.md`
3. `planning/CONTENT_EVIDENCE.md`
4. `planning/DESIGN_DIRECTION.md`
5. `planning/MEDIA_INVENTORY.md`
6. `prop-hunt-showcase-plan.txt`
7. `U:\resume\ResumeOrganizer\builds\Ashish_Ranjan_GameDev_Complete_Dossier.pdf`

Use the large inspection JSON files only when compact sources do not answer a question.

## Work

### 1. Content map

Create `planning/PORTFOLIO_CONTENT_MAP.md` with:

- Concise positioning and target audiences
- Recommended top-level navigation
- Featured Prop Hunt project structure
- Linked gameplay-system exhibits
- Technical-art and 3D-art categories
- About, resume, contact, and external links
- Evidence required for every exhibit

### 2. Focused evidence audit

Use batched, read-only Monolith queries only for high-value unresolved claims that affect the portfolio:

- Transformation collision/bounds handling
- Hunter hit validation and authority
- Voice and spatial audio
- IK/retargeting technical-art evidence
- Master materials or shaders

Cap the investigation. Do not prove every dossier sentence. Update `planning/CONTENT_EVIDENCE.md` with classifications; unresolved claims remain `UNVERIFIED`.

### 3. Media capture plan

Create `planning/MEDIA_CAPTURE_PLAN.md`. For every recommended exhibit include:

- Purpose
- Exact action to record
- Viewpoint(s)
- Minimum evidence
- Credit/authorship confirmation
- Priority: essential, useful, or optional

Prefer short focused clips plus one project overview.

### 4. Media inventory

Expand `planning/MEDIA_INVENTORY.md` with planned IDs and placeholders. Mark nothing public-ready unless the file exists and ownership is known.

## Files allowed to change

- `planning/PORTFOLIO_CONTENT_MAP.md`
- `planning/MEDIA_CAPTURE_PLAN.md`
- `planning/CONTENT_EVIDENCE.md`
- `planning/MEDIA_INVENTORY.md`
- `coordination/IMPLEMENTATION_REPORT.md`

## Do not change

- Unreal files or assets
- Dossier PDF
- Raw inspection JSON
- `AGENTS.md`, `PROJECT.md`, or `planning/DESIGN_DIRECTION.md`
- Website code or configuration

## Error handling

Continue all independent items after a Monolith failure. Record unresolved claims and failures. Do not repeatedly retry missing assets or turn inference into evidence.

## Acceptance checks

- Both new planning documents exist and work without chat history.
- Every exhibit states its evidence requirement.
- Public claims are classified.
- Media inventory distinguishes missing, available, credited, and public-ready.
- No Unreal or website implementation files changed.
- The implementation report uses the template and has a final status.

After reporting, stop. Do not design or implement the website.
