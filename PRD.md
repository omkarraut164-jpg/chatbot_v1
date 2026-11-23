# Product Requirements Document (PRD)

## Robot Head Chatbot

**Document status:** Draft

**Version:** 1.0

**Last updated:** November 23, 2026

**Project type:** Interactive web experience

**Primary technology:** React 19, Vite, React Three Fiber, Three.js, and WebGL

---

## 1. Executive Summary

Robot Head Chatbot is a browser-based interactive experience that combines conversational AI with an expressive 3D humanoid avatar. The product is designed to make AI interactions feel more human by pairing text conversations with visible robot states, gaze and hover movement, procedural animation, and an immersive 3D inspection experience.

The current implementation is a polished frontend demonstration with a local, rule-based AI response service. It does not yet include an external LLM, backend, authentication, persistent chat history, analytics, or a content management system.

## 2. Product Vision

Create an approachable, visually engaging AI companion that feels less like a conventional chat box and more like a present, responsive digital entity.

### Vision statement

“AI should feel less like a tool and more like a presence.”

### Product principles

- **Humanized interaction:** Every inquiry should produce visible conversational feedback.
- **Real-time spatial presence:** The 3D avatar should respond to both chat and user motion.
- **Immediate usability:** Users should be able to begin chatting without setup or installation.
- **Responsive by design:** The experience should adapt to desktop, tablet, mobile, and touch devices.
- **Performance awareness:** 3D rendering should scale according to device quality and remain paused outside the viewport.
- **Clear capability boundaries:** The demo should communicate that responses are based on a local knowledge base rather than a live external AI service.

## 3. Target Users

### 3.1 Primary users

- Visitors exploring AI and humanoid interface concepts.
- Students learning conversational AI, React, Three.js, or WebGL.
- Product designers evaluating embodied AI interactions.
- Developers seeking a showcase or frontend starter for an interactive AI avatar.

### 3.2 Secondary users

- Employers or clients reviewing a portfolio project.
- Educators demonstrating human-computer interaction concepts.
- Marketing or research teams prototyping a conversational landing experience.

## 4. User Problems

1. Conventional chatbots lack visual presence and can feel impersonal.
2. Static 3D model demos do not visibly connect to conversational states.
3. Many AI demos require account setup or backend configuration.
4. Heavy WebGL experiences may perform poorly on mobile or low-capability devices.
5. Visitors need a clear way to explore a 3D product without becoming overwhelmed by technical controls.

## 5. Goals and Success Criteria

### Product goals

- Enable a user to send a chat message and receive a response immediately.
- Synchronize the 3D robot’s state with chat activity.
- Allow users to inspect the 3D model through orbit, zoom, reset, and fullscreen controls.
- Provide an elegant responsive experience across common viewport sizes.
- Demonstrate modern frontend and WebGL implementation quality.

### Success metrics

| Metric | Target | Measurement method |
|---|---:|---|
| User can send a message | 100% in supported browsers | Manual and automated UI testing |
| Chat response is displayed | Under 1 second in demo mode | Time from submission to rendered response |
| Chat message submission | No duplicate submission while processing | Interaction testing |
| 3D model loads | Under 3 seconds on broadband after cached dependencies | Browser performance testing |
| Responsive layout | No page overflow or blocked controls at supported breakpoints | Device and viewport testing |
| 3D frame rendering | 60 FPS on reference desktop hardware | Browser profiling |
| Offscreen 3D canvases | Rendering paused when not in view | Performance and code verification |

## 6. Scope

### 6.1 In scope for the current product

- Cinematic landing page.
- Responsive navigation and mobile menu.
- Interactive hero section with a 3D humanoid.
- Feature and product capability overview.
- About and vision sections.
- Text-based chatbot interface.
- Suggested conversation prompts.
- Local demo response knowledge base.
- Robot idle, thinking, and responding states.
- Shared state synchronization between chat and the 3D experience.
- Interactive 360-degree 3D inspection.
- Drag-to-orbit and zoom controls.
- Auto-rotation, reset view, and fullscreen controls.
- Adaptive rendering quality.
- Viewport-based 3D rendering culling.
- Draco-compressed humanoid model loading.
- Loading feedback for 3D assets.
- Footer and external outlet links.

### 6.2 Explicitly out of scope for the current product

- Real LLM or external generative AI integration.
- Voice input or text-to-speech.
- User authentication and accounts.
- Persistent chat sessions.
- Server-side storage or database.
- Conversation moderation or safety controls.
- Multi-language support.
- Backend analytics or telemetry.
- Physical robot hardware control.
- Verified sub-100 ms network response claims; the current demo does not perform a real network inference.
- Production-grade social links; current links are generic placeholders.

## 7. Functional Requirements

### FR-1: Landing and navigation

- The application shall provide a hero, features, about, chat, experience, process, technology, vision, CTA, and footer area.
- Navigation links shall scroll smoothly to the corresponding section.
- The navbar shall indicate the active section during scrolling.
- The navbar shall become frosted and scrolled when the page moves beyond the initial position.
- On small screens, navigation shall switch to a mobile drawer that blocks background scrolling while open.

### FR-2: 3D humanoid display

- The system shall load the `humanoid-opt.glb` model using the local Draco decoder.
- The model shall display in the hero and inspection experiences.
- The model shall support idle, thinking, and responding visual states.
- Idle motion shall include subtle floating, breathing, and yaw movement.
- Thinking and responding states shall differ through increased or altered motion intensity.
- The model shall follow pointer position within bounded gaze and rotation limits.
- The model shall scale subtly when hovered on devices with pointer support.

### FR-3: Chat interface

- The chat interface shall display an initial robot greeting.
- A user shall be able to enter text and submit it using the send button or Enter key.
- The system shall reject empty submissions.
- The system shall prevent additional submissions while a response is being generated.
- A user shall be able to submit suggested quick prompts.
- The system shall display a thinking indicator during response generation.
- The system shall display the user and robot messages with timestamps.
- The message stream shall automatically scroll to the latest message within the chat container.
- The browser window shall not be forcibly scrolled when a new message appears.

### FR-4: Demo AI response service

- The response service shall normalize user input to lowercase and trim surrounding whitespace.
- The service shall match known keywords against a local demo knowledge base.
- The service shall return a relevant predefined answer for a recognized topic.
- The service shall return a randomized fallback answer for an unmatched topic.
- The service shall simulate processing latency of approximately 600 milliseconds.
- The service shall expose an asynchronous interface suitable for replacement by a backend API.

### FR-5: Robot state synchronization

- Sending a chat message shall set the robot state to `THINKING`.
- Receiving a response shall set the robot state to `RESPONDING`.
- The robot shall return to `IDLE` approximately 1.2 seconds after completion.
- Chat state shall propagate to shared 3D viewers without root-level page re-renders.
- Hovering over a cognitive process step shall set the corresponding robot state.
- Leaving a process step shall return the robot state to `IDLE`.

### FR-6: 3D experience controls

- Users shall be able to orbit the model using mouse or touch gestures.
- Users shall be able to zoom within a minimum and maximum camera distance.
- The user shall be able to enable or disable auto-rotation.
- The user shall be able to reset the 3D camera to its initial state.
- The user shall be able to enter and exit browser fullscreen mode.
- The interface shall display concise controls and touch guidance.
- Panning shall be disabled.

### FR-7: Responsive and adaptive rendering

- The layout shall adapt to desktop, tablet, and mobile viewports.
- Camera position and field of view shall adjust based on canvas aspect ratio.
- A low-quality rendering profile shall reduce pixel ratio and disable optional shadows when appropriate.
- A medium-quality profile shall reduce pixel ratio and shadow resolution on constrained devices.
- Rendering shall pause for canvases outside the viewport.
- 3D rendering shall resume when a canvas becomes visible.

### FR-8: Footer and calls to action

- Primary CTA elements shall navigate users to the chat section.
- Vision and 3D exploration CTAs shall navigate to the 3D inspection section.
- Footer navigation shall match the primary section navigation.
- Social links shall open in a separate tab and use secure external-link attributes.

## 8. Non-Functional Requirements

### Performance

- Reuse loaded geometry and model resources across 3D canvases where possible.
- Preserve ref-based animation values to avoid unnecessary re-render garbage collection.
- Use memoized components for non-stateful sections.
- Limit WebGL rendering outside the viewport.
- Display a loading indicator while the model is initializing.

### Accessibility

- Interactive controls shall expose accessible names or labels.
- Navigation controls shall be keyboard-operable.
- The mobile drawer shall behave as a modal dialog.
- Live chat updates shall use an appropriate live-region announcement pattern.
- Color, icons, and text shall provide meaningful status information rather than color alone.

### Responsiveness

- The application shall support narrow mobile screens, standard phones, tablets, laptops, and wide desktop displays.
- 3D controls shall support touch gestures.
- Text, navigation, and controls shall remain usable at viewport widths down to 320 pixels.

### Reliability

- Missing or failed chat results shall display a graceful synchronization error message.
- Missing 3D assets or WebGL initialization failures should not prevent the surrounding page content from rendering.
- Resize and fullscreen changes shall update 3D camera state without page reload.

### Compatibility

- Support current stable Chrome, Edge, Firefox, and Safari releases.
- Require a browser with WebGL 2.0 support for the 3D experience.
- Provide a functional text and navigation experience even when 3D hardware acceleration is unavailable.

### Security and privacy

- The current demo shall perform chat processing entirely in the browser.
- The application shall not collect or persist personal information in its current scope.
- If a backend or external AI provider is added, API keys shall remain server-side.
- Future chat requests and model responses shall require backend-side validation and moderation.

## 9. Architecture Overview

### Frontend

- React 19 component model.
- Vite development and build tooling.
- Framer Motion for interface animation support.
- Lucide React for icons.

### 3D stack

- Three.js.
- React Three Fiber.
- Drei for model loading, controls, shadows, and loading UI.
- Draco-compressed GLB model assets.

### State

- Component state for chat messages and UI interaction.
- A subscription-based robot state store for cross-component synchronization.
- No global root-level state needed for robot state updates.

### Data

- `src/data/demoResponses.js` contains demo keyword mappings and fallback responses.
- `src/services/aiService.js` provides the asynchronous chat service boundary.
- `src/services/robotStateStore.js` publishes robot states to subscribers.

## 10. Key User Journeys

### Journey 1: Learn about the product

1. The visitor lands on the hero section.
2. The visitor sees the 3D robot and product headline.
3. The visitor may scroll or use navigation to explore capabilities.
4. The visitor selects “Talk to Robot,” “Explore Experience,” or a matching footer/navigation link.

### Journey 2: Chat with the demo robot

1. The visitor navigates to the chat section.
2. The visitor chooses a prompt or types a question.
3. The robot enters the thinking state.
4. The system matches a local response or chooses a fallback.
5. The response appears and the robot enters the responding state.
6. The robot returns to idle after the response cycle.

### Journey 3: Inspect the 3D model

1. The visitor navigates to the experience section.
2. The visitor drags the model to rotate it.
3. The visitor zooms and resets the camera as needed.
4. The visitor enables auto-rotation or enters fullscreen.
5. The visitor exits fullscreen or disables auto-rotation.

### Journey 4: Explore the cognitive process

1. The visitor reaches the “How It Works” section.
2. The visitor hovers or focuses each process node.
3. The shared 3D robot updates to the matching state.
4. The visitor moves away and the robot returns to idle.

## 11. Content and UI Requirements

### Branding

- Product name: **Robot Head Chatbot**.
- Navigation label: **ROBOT HEAD / CHATBOT**.
- Primary visual language: dark, futuristic, spacious, and understated.
- Accent colors: cyan and blue, with subtle violet edge accents.

### Core copy areas

- Hero headline.
- Hero supporting description.
- Feature descriptions.
- Chat greeting and quick prompts.
- About and vision narratives.
- Process titles and descriptions.
- Technology and product CTAs.
- Footer information.

### UI states

- Idle.
- Thinking.
- Responding.
- Loading.
- Chat empty state.
- Chat input disabled while processing.
- Mobile navigation open and closed.
- Fullscreen enabled and disabled.
- Device quality low, medium, and high.

## 12. Technical Requirements and Constraints

- `package.json` scripts must support local development, production build, linting, and preview.
- The project shall remain a static client application unless a backend is introduced.
- External assets should be locally hosted where possible to support deterministic loading.
- The 3D model should remain Draco-compressed and local to the application.
- 3D render quality should account for touch, CPU concurrency, device memory, viewport size, and canvas visibility.
- The implementation shall preserve WebGL GPU context and avoid repeated geometry duplication.

## 13. Assumptions and Risks

| Risk or assumption | Impact | Mitigation |
|---|---|---|
| Users may mistake demo responses for a live AI model | Misleading product experience | Label the demo clearly and add backend or provider status in a production release |
| WebGL or Draco support may fail in some browsers | 3D section unavailable | Provide the rest of the page as a usable fallback experience |
| Large models and WebGL may reduce performance | Poor interaction on low-end devices | Adaptive quality, DPR limits, shadow reduction, and viewport culling |
| Generic social links are not project-owned profiles | Broken or irrelevant outbound experience | Replace with verified product/community URLs |
| A static response service cannot handle complex queries | Limited chat usefulness | Integrate a validated backend LLM and retrieval system |
| Broad claims such as sub-100 ms response or gaze tracking can be interpreted literally | Mismatch between copy and implementation | Replace unsupported claims or document exact browser and network measurements |

## 14. Acceptance Criteria

### Product shell

- The page renders without runtime errors in a supported browser.
- The navigation, hero, feature, about, chat, experience, process, technology, vision, CTA, and footer sections are present.
- All internal navigation CTAs scroll to their intended section.

### Chat

- Sending text produces a user message and disables submission while processing.
- A robot response appears after the simulated delay.
- Quick prompts generate the same response behavior as typed prompts.
- The robot state changes through thinking and responding states.
- The chat stream scrolls to the latest message without scrolling the page.

### 3D experience

- The humanoid loads and is visible in the hero and inspector.
- Orbit, zoom, reset, auto-rotate, and fullscreen behaviors work.
- Touch gestures operate on mobile devices.
- Device quality defaults adapt to viewport and hardware signals.
- Offscreen rendering does not continue at full frame rate.

### Build and quality

- `npm run build` completes successfully.
- `npm run lint` reports no new blocking issues.
- The application remains usable on desktop and mobile breakpoints.

## 15. Release Plan

### Phase 1 — Demo polish

- Finalize copy and capability labels.
- Verify 3D loading and interaction across supported browsers.
- Replace placeholder social links.
- Improve unsupported metric and capability claims.
- Add automated component and interaction tests.

### Phase 2 — Real AI integration

- Add backend API integration.
- Introduce provider abstraction and configuration.
- Implement server-side API key management.
- Add loading, timeout, cancellation, and error states.
- Preserve chat history in the active session.

### Phase 3 — Engagement and retention

- Add voice input and output.
- Add conversation export and reset controls.
- Add conversation analytics and moderation.
- Add model selection and configurable personality.
- Add account-backed conversation history.

### Phase 4 — Platform expansion

- Add localization.
- Add accessibility enhancements and reduced-motion support.
- Add reusable 3D model themes.
- Support multiple avatars and environment presets.
- Provide embeddable widget or SDK integration.

## 16. Open Questions

1. Should this become a portfolio showcase or a deployable commercial product?
2. Which AI provider or model will power production responses?
3. Is chat history expected to persist across sessions?
4. Which voice providers and browsers are required for future speech features?
5. Is public registration required, or should the chatbot remain anonymous?
6. Should the robot represent a real-world service brand or remain as an original mascot?
7. Which analytics and privacy standards should apply in production?
8. What is the minimum supported hardware and browser matrix?

## 17. Appendix: Implementation Reference

### Primary source areas

- `src/App.jsx` — page composition and section routing.
- `src/components/AIInterface.jsx` — chat interface and robot state updates.
- `src/components/Model3D.jsx` — 3D renderer, motion, quality, and camera behavior.
- `src/components/Showcase3D.jsx` — 3D inspection controls.
- `src/services/aiService.js` — demo response service boundary.
- `src/services/robotStateStore.js` — shared robot state store.
- `src/data/demoResponses.js` — demo knowledge base.
- `src/data/features.js` — feature, process, and technology content.
- `src/utils/quality.js` — adaptive rendering quality.

### Build commands

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```
