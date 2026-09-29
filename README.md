# Sellsuki clinic landing page — separate V2

This is a separate project and Site. The original wellness-salepage checkout and sellsuki-wellness-partner.beernat.chatgpt.site remain unchanged.

## Editorial structure
Retained opening hook; six clinic challenges with editorial imagery; four service cards; three illustrative solutions (local search, trust/CEO branding, LINE segmentation); delivery team photo spaces; CEO/COO/CFO/CTO avatar and idea areas; brand promise and mock lead form.

The six challenges are client-supplied scenarios, not independently measured 2026 market findings. Service examples and search/LINE diagrams are illustrative, not performance case studies. No rankings, real client outcomes, or search position guarantees are asserted. 10+ years is grounded in the client's brief.

## Photo and executive handoff
app/page.tsx contains labeled PhotoSlot placements for real team and clinic images. C-level areas use gray UserRound avatars as explicitly requested. All C-level ideas are proposed copy pending approval, not quotations or verified personal statements. Add approved portraits, names and final ideas before public release. The hero and challenge photos are AI-generated illustrations, not real Sellsuki clients or staff.

## Form handoff
app/lead-form.tsx is an explicit mock per client direction. It validates required name/clinic/phone and optional email, requires a consent checkbox, and shows a clearly labeled demo completion message. It makes no network calls, sends no messages, and stores no lead data. The DB binding is null and no database or migrations are deployed. Dependencies from the initial D1-capable starter are retained. Dev should connect the submission handler, final privacy wording/link, delivery destination and spam controls for production.

## Verification
Production build and TypeScript check; local route compilation and HTTP response. Browser interaction testing was not requested. The demo form is a presentation prototype, so no WebMCP submission tool is exposed.

## Challenge photo banners
The six challenge icons are replaced with six generated editorial photo banners. Desktop uses two columns and three rows; mobile uses one column. A dark text-side overlay keeps the retained Thai headings and descriptions readable. These images illustrate scenarios and are not evidence or photographs of actual Sellsuki clients.

## Playful service visuals
Four coordinated 3D-style illustrations replace the service-card icons: megaphone/customer discovery, chat follow-up, calendar appointment, and returning-customer care. Cyan and orange retain the brand palette. Hover lift and gentle image zoom respect reduced-motion preferences. Existing service wording and all other sections remain in place.
