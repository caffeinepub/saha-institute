# Specification

## Summary
**Goal:** Fix the current deployment failure and successfully deploy the Saha Institute app to the Internet Computer, ensuring the deployed frontend connects to the deployed backend canister without runtime errors.

**Planned changes:**
- Investigate and resolve build/deploy errors so a fresh build completes for both the Motoko backend and the frontend.
- Update code/configuration required for the platform deployment step (equivalent to `dfx deploy`) to complete successfully without manual intervention.
- Fix frontend-to-backend canister (actor) connectivity in the deployed environment so agent/actor initialization and canister ID resolution work correctly.
- Verify SPA routing works after deployment for key routes: `/`, `/courses`, `/centres`, `/reviews`, `/announcements`, `/mock-tests`, `/login`, `/admin`.

**User-visible outcome:** The app deploys successfully, loads in the browser without blocking console errors, key routes render as expected, and data-fetching pages can call the backend canister and show content or empty/loading states without failing.
