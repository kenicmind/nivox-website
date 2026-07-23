# NIVOX Product Definition

## Product identity

**Name:** NIVOX  
**Tagline:** Shaping Tomorrow, Today.

## Mission

Build a world-class student innovation hub that gives students access to modern workspaces, high-speed internet, events, collaboration spaces, entrepreneurship opportunities, and technology resources.

## Primary audiences

1. Students seeking reliable workspaces, technology, learning resources, and community.
2. NIVOX hub operators managing reservations, attendance, settings, and communications.
3. Universities, sponsors, corporate partners, and ecosystem organizations.
4. Mentors, creators, entrepreneurs, and event facilitators.

## Current product surfaces

### Public experience

- Marketing homepage
- About, spaces, events, community, and membership pages
- Partner, sponsor, university, corporate partner, and prospectus pages
- FAQ, terms, privacy, and not-found pages
- Responsive navigation, footer, scroll progress, and connectivity feedback

### Authentication

- Email/password registration and sign-in
- Email verification request during registration and unverified sign-in
- Password reset request
- Protected student routes

### Student experience

- Profile dashboard and profile editing
- Workspace reservation flow
- Workspace, slot, and seat selection
- Reservation list, ticket list, and reservation details
- Notification center
- Resources, opportunities, achievements, analytics, and community presentations
- Student identity badge presentation

### Operations experience

- Reservation and student views
- Payment totals presentation
- Check-in lookup and reservation status updates
- System settings and audit-log presentation
- Broadcast and seat-audit interface concepts
- CSV export utility

## Feature maturity

### Implemented with Firebase data

- Account registration and login
- User profile creation, loading, and editing
- Reservation creation and retrieval
- Seat-availability lookup
- Ticket and reservation presentation
- Notifications retrieval and updates
- Admin collection reads and selected updates
- Settings and audit-log reads/writes

### Prototype or simulated behavior

- Paystack-branded payment flow; no real gateway verification exists
- Resource downloads
- Opportunity applications
- Mentoring and office-hours requests
- Newsletter and waitlist collection
- Partnership, university, corporate, and sponsorship submissions
- Social links
- Calendar action
- Admin seat visualization

These behaviors must not be described as production-complete until their real integrations exist.

## Core product principles

- Student-first and opportunity-focused
- Trustworthy, inclusive, and easy to understand
- Premium without becoming visually inaccessible
- Fast and resilient on mobile networks
- Transparent about prices, availability, policies, and feature status
- Secure by default for personal, reservation, payment, and administrative data

## Success measures

Initial recommended measures:

- Registration completion rate
- Verified-account activation rate
- Reservation conversion and completion rates
- Seat utilization by workspace and time slot
- Booking failure and cancellation rates
- Repeat monthly active students
- Event registration and attendance
- Resource engagement
- Partner inquiry conversion
- Page performance and error-free session rate

**Decision needed:** Confirm which metrics are business-critical and which analytics platform is approved.

## Product decisions required

1. **Membership model:** Is membership paid, free, tiered, institution-sponsored, or hybrid?
2. **Reservation pricing:** Is ₦300 fixed, workspace-specific, time-based, or controlled entirely by admin settings?
3. **Payments:** Confirm Paystack account, backend architecture, refund policy, and webhook ownership.
4. **Cancellation:** Confirm the advertised one-hour rule, refund eligibility, and no-show policy.
5. **Roles:** Define student, receptionist, operations admin, content admin, and super-admin permissions.
6. **Physical locations:** Confirm whether NIVOX initially operates one hub or multiple locations.
7. **Events:** Confirm registration, capacity, reminders, attendance, and certificate requirements.
8. **Resources:** Confirm file hosting, access tiers, licensing, and download tracking.
9. **Opportunities:** Confirm whether applications are internal, external links, or partner-managed.
10. **Notifications:** Confirm email, in-app, SMS, and push channels.
11. **Partnership leads:** Confirm destination CRM, email workflow, ownership, and response SLA.
12. **Student ID:** Confirm issuance rules, persistence, QR format, expiration, and wallet support.
13. **Data retention:** Confirm retention periods and account/data-deletion requirements.
14. **Accessibility target:** Recommended baseline is WCAG 2.2 AA; formal approval is needed.

## Product boundaries

- The client must not determine whether a payment is valid.
- The client must not grant itself administrative privileges.
- Marketing claims should distinguish available services from planned capabilities.
- Personal and operational data should only be exposed to users who need it.
