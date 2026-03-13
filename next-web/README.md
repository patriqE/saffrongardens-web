# Saffron Gardens Frontend (`next-web`)

Premium event management frontend for Saffron Gardens.

## Product Goal

Deliver a polished guest and planner-facing web experience that supports:

- Public discovery pages (home, services, gallery, contact)
- Public chat intake and live conversation updates
- Media-rich gallery browsing with scalable data sourcing
- Clean integration path for backend APIs without large UI rewrites

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- STOMP + SockJS (real-time chat updates)

## Local Setup

1. Create env file:

```bash
cp .env.example .env
# On Windows PowerShell
Copy-Item .env.example .env
```

1. Set environment variables:

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
- `NEXT_PUBLIC_GALLERY_SOURCE=api`
- `NEXT_PUBLIC_CHATBOT_ENABLED=true`

Optional chatbot settings for frontend defaults and future API binding:

- `NEXT_PUBLIC_CHATBOT_WELCOME_MESSAGE`
- `NEXT_PUBLIC_CHATBOT_QUICK_REPLIES` as CSV or JSON array
- `NEXT_PUBLIC_CHATBOT_BUSINESS_HOURS` as JSON object with `days`, `start`, `end`, `timeZone`
- `NEXT_PUBLIC_CHATBOT_AFTER_HOURS_MESSAGE`
- `NEXT_PUBLIC_CHATBOT_AUTO_ESCALATE`
- `NEXT_PUBLIC_CHATBOT_ESCALATION_KEYWORDS` as CSV or JSON array
- `NEXT_PUBLIC_CHATBOT_FALLBACK_MESSAGE`
- `NEXT_PUBLIC_CHATBOT_HANDOVER_DELAY_SECONDS`

1. Run the app:

```bash
npm install
npm run dev
```

1. Open `http://localhost:3000`.

## API Surface (Current)

Public chat proxy routes:

- `POST /api/public/chat/start`
- `POST /api/public/chat/[conversationId]/message`
- `GET /api/public/chat/[conversationId]/messages`
- `GET /api/public/chat/[conversationId]/unread-count`
- `GET /api/public/chat/planners`

Public gallery routes:

- `GET /api/public/gallery`
- `GET /api/public/gallery/[id]`

## Task Breakdown Completed So Far

This section tracks delivered work in the current frontend sprint.

### EPIC 1 - Foundation

- `Task 1.1 - IA and Routes (S)`
  - Defined core public routes for Home, About/Services, Gallery, Contact, and Chat
  - Established shared public shell/layout patterns
  - Acceptance met: route structure and public access baseline established

### EPIC 2 - Public Chat MVP

- `Task 2.1 - Start Chat (M)`
  - Built guest chat start flow (`email`, `name`) and conversation bootstrapping
  - Added backend proxy route for starting public chats
  - Acceptance met: guest can start a chat session

- `Task 2.2 - Messaging (M)`
  - Implemented send-message flow for active `conversationId`
  - Added message history retrieval path in UI and API proxy
  - Acceptance met: guest can send and view messages

- `Task 2.3 - Unread Counter (S)`
  - Added unread count fetch and display in chat header controls
  - Acceptance met: unread count is visible and refreshable

### EPIC 3 - Planner Selection + Assignment UX

- `Task 3.1 - Planner Search UI (S)`
  - Added planner search, result listing, and planner selection before chat start
  - Added planner search proxy route and preferred planner request wiring
  - Acceptance met: guests can search/select preferred planner

- `Task 3.2 - Status Mapping (S)`
  - Mapped backend assignment states to human-readable labels/messages:
    `PREFERRED_ASSIGNED`, `PREFERRED_PENDING`, `PREFERRED_NOT_FOUND`, `AUTO_ASSIGNED`, `OPEN`
  - Acceptance met: status feedback is user-friendly and consistent

### EPIC 4 - Realtime + Resilience

- `Task 4.1 - WebSocket Realtime (M)`
  - Connected to `/ws-chat` and subscribed to:
    `/topic/conversations/{conversationId}`
    `/topic/conversations/{conversationId}/unread`
  - Acceptance met: live updates flow through websocket subscriptions

- `Task 4.2 - Polling Fallback (M)`
  - Added periodic fallback fetch when realtime disconnects
  - Added dedupe by message ID to prevent duplicate history entries
  - Acceptance met: chat remains functional if websocket drops

- `Task 4.3 - Session Recovery (S)`
  - Persist and restore active `conversationId` and guest context after refresh
  - Added robust storage helpers with session recovery behavior
  - Added UI signal when a session is restored after reload
  - Acceptance met: chat survives reload in normal flow

### EPIC 5 - Gallery

- `Task 5.1 - Phase 1 Gallery (S)`
  - Replaced placeholder gallery with media grid (photos + videos)
  - Added category filters and incremental lazy loading
  - Uses static JSON data mapped to CDN media URLs
  - Acceptance met: smooth browsing experience for guests

- `Task 5.2 - API-ready Adapter (M)`
  - Added API endpoints for gallery collection and single-item retrieval
  - Introduced adapter layer to isolate UI from data source
  - UI now consumes adapter, enabling source swap with minimal rewrite
  - Added local fallback mode via `NEXT_PUBLIC_GALLERY_SOURCE=local`
  - Acceptance met: data source can switch with minimal UI rewrite

### EPIC 6 - Chatbot Settings

- `Task 6.1 - Feature Flag (S)`
  - Added `NEXT_PUBLIC_CHATBOT_ENABLED` to control chatbot-oriented discovery copy
  - Preserved the human chat flow at `/chat` and kept a persistent `Talk to Planner` override visible
  - Acceptance met: disabling chatbot does not break human chat

- `Task 6.2 - Settings Model (S)`
  - Added a normalized frontend settings model for `enabled`, `welcomeMessage`, `quickReplies`, `businessHours`, `afterHoursMessage`, `autoEscalateToPlanner`, `escalationKeywords`, `fallbackMessage`, and `handoverDelaySeconds`
  - Added helper functions to normalize future API payloads without changing chat page consumers
  - Bound the chat screen to the settings model so frontend defaults are ready to swap with API data later

### EPIC 7 - Security

- `Task 7.1 - Public API Boundary (S)`
  - Added a reusable public API boundary helper for guest-facing requests
  - Guarded public chat and gallery fetch paths to ensure they stay under `/api/public/**`
  - Acceptance met: no guest-facing route calls `/api/staff/**` or `/api/admin/**`

## Key Files

- `src/app/chat/page.jsx`
- `src/components/public/GalleryExperience.jsx`
- `src/lib/publicGalleryAdapter.js`
- `src/lib/publicGalleryStore.js`
- `src/app/api/public/gallery/route.js`
- `src/app/api/public/gallery/[id]/route.js`
- `src/data/gallery-media.json`

## Next Suggested Steps

1. Replace static gallery store internals with backend repository/service calls while preserving response shape.
2. Add gallery detail page using `GET /api/public/gallery/[id]`.
3. Add lightweight integration tests for gallery API routes and adapter behavior.
