export interface LandingPageSection {
  heading: string;
  body: string;
}

export interface LandingPageContent {
  slug: string;
  category: 'feature' | 'industry';
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  subheadline: string;
  sections: LandingPageSection[];
  faqs: { q: string; a: string }[];
}

const FEATURE_PAGES: LandingPageContent[] = [
  {
    slug: 'email-automation',
    category: 'feature',
    navLabel: 'Email Automation',
    title: 'Email Automation Software',
    description: 'Automate personalized email campaigns from your own mailbox — import contacts, personalize messages, and schedule sends with iReachFlow.',
    h1: 'Email automation that still sounds like you',
    subheadline: 'iReachFlow automates the repetitive parts of outreach — sending, scheduling, follow-ups — while every message keeps your voice and your contact’s context.',
    sections: [
      { heading: 'What is email automation?', body: 'Email automation is the use of software to send personalized emails to contacts based on triggers, schedules, or workflows, instead of composing and sending each message by hand.' },
      { heading: 'How iReachFlow automates campaigns', body: 'Connect an authorized mailbox, import your contacts, and use the visual automation builder to add waits, conditions, and follow-ups. iReachFlow queues and paces sending so it stays within safe, configurable limits.' },
      { heading: 'Built for relationships, not blasts', body: 'Automation only helps if messages still feel personal. Merge fields, segmentation, and tone controls keep every automated email relevant to the person receiving it.' },
    ],
    faqs: [
      { q: 'Does automation mean less personalization?', a: 'No — iReachFlow automates delivery and timing, not content. Personalization variables and conditional content still apply to every automated message.' },
      { q: 'Can I control how fast emails are sent?', a: 'Yes. Smart sending controls let you set per-minute/hour/day limits, business hours, and recipient timezone so sending stays within safe limits.' },
    ],
  },
  {
    slug: 'email-marketing',
    category: 'feature',
    navLabel: 'Email Marketing',
    title: 'Email Marketing Automation',
    description: 'Plan, personalize, and measure email marketing campaigns from one platform — built for teams who want scale without losing a personal tone.',
    h1: 'Email marketing automation for modern teams',
    subheadline: 'Move beyond one-size-fits-all newsletters. Segment your audience, personalize every send, and track delivery, opens, clicks, and replies in one place.',
    sections: [
      { heading: 'From list to campaign in minutes', body: 'Import contacts, map fields, and build segments. The template editor and reusable templates make it fast to launch a campaign without starting from a blank page.' },
      { heading: 'Personalization by segment', body: 'Show different content by country, industry, or any custom field — so one campaign can speak differently to different segments without manual duplication.' },
      { heading: 'Measure what matters', body: 'Track sent, delivered, bounced, opened, clicked, replied, and unsubscribed metrics by campaign, segment, and sender.' },
    ],
    faqs: [
      { q: 'Is this different from a traditional newsletter tool?', a: 'Yes — iReachFlow sends from your own authorized mailbox with per-recipient personalization and automation, rather than a single broadcast template.' },
      { q: 'Can I A/B test campaigns?', a: 'A/B testing is on the roadmap alongside predictive send-time optimization.' },
    ],
  },
  {
    slug: 'email-personalization',
    category: 'feature',
    navLabel: 'Email Personalization',
    title: 'Email Personalization Software',
    description: 'Personalize every email with merge fields, conditional content, and AI-assisted tone — without writing each message by hand.',
    h1: 'Personalization that scales past your contact list',
    subheadline: 'Merge fields, conditional content, and AI personalization make every email feel individually written, even across thousands of contacts.',
    sections: [
      { heading: 'Merge fields', body: 'Insert {{FirstName}}, {{LastName}}, {{Company}}, {{Position}}, {{City}}, {{Country}}, {{Industry}}, {{Event}}, {{SenderName}}, and your own custom fields directly into any message.' },
      { heading: 'Conditional content', body: 'Show or hide entire paragraphs based on a contact’s segment, country, or any field you’ve imported — one template, many relevant versions.' },
      { heading: 'AI-assisted tone and translation', body: 'The AI Email Writer adapts tone — professional, friendly, luxury, casual, executive, sales, or thank-you — and can translate campaigns for multilingual audiences.' },
    ],
    faqs: [
      { q: 'What personalization fields are available?', a: 'Standard fields like name, company, and location, plus any custom field you import from your contact list.' },
      { q: 'Does personalization require AI?', a: 'No — merge fields and conditional content work without AI. AI tone adaptation and translation are optional additions.' },
    ],
  },
  {
    slug: 'holiday-email-campaigns',
    category: 'feature',
    navLabel: 'Holiday Campaigns',
    title: 'Automated Holiday Email Campaigns',
    description: 'Schedule personalized holiday and occasion emails — Christmas, New Year, birthdays, and anniversaries — ahead of time with iReachFlow.',
    h1: 'Automated holiday emails, personalized per contact',
    subheadline: 'Set up occasion-based automations once, and let iReachFlow send timely, personalized holiday greetings to every contact automatically.',
    sections: [
      { heading: 'Occasion automations', body: 'Build recurring automations for Christmas, New Year, birthdays, anniversaries, milestones, and any custom date you track per contact.' },
      { heading: 'Still personal at scale', body: 'Each holiday email still uses merge fields and tone controls, so a Christmas greeting to a customer reads as personal, not templated.' },
      { heading: 'Schedule once, run every year', body: 'Recurring campaigns mean a holiday automation set up this year continues to run in future years without manual re-scheduling.' },
    ],
    faqs: [
      { q: 'Can I schedule a campaign in advance?', a: 'Yes — campaigns and recurring sequences can be scheduled ahead of time and will send automatically.' },
      { q: 'What occasions are supported?', a: 'Christmas, New Year, Easter, birthdays, business anniversaries, customer appreciation, and any custom date field.' },
    ],
  },
  {
    slug: 'christmas-email-campaigns',
    category: 'feature',
    navLabel: 'Christmas Campaigns',
    title: 'Christmas Email Campaigns',
    description: 'Send personalized Christmas greetings to customers, leads, and partners automatically, from your own mailbox.',
    h1: 'Christmas email campaigns that feel personal',
    subheadline: 'Reach your whole contact list with warm, on-brand Christmas messages — personalized by name, company, and relationship.',
    sections: [
      { heading: 'Plan ahead', body: 'Draft and schedule your Christmas campaign in advance, then let iReachFlow send it at the right time in each recipient’s timezone.' },
      { heading: 'Personalize the greeting', body: 'Use merge fields and tone settings to make a Christmas email to a long-term customer read differently than one to a new lead.' },
      { heading: 'Track engagement', body: 'See opens, clicks, and replies on your Christmas campaign the same way you would any other campaign.' },
    ],
    faqs: [
      { q: 'Can I reuse this template next year?', a: 'Yes — templates and recurring campaigns are designed to be reused and adjusted year over year.' },
    ],
  },
  {
    slug: 'customer-email-automation',
    category: 'feature',
    navLabel: 'Customer Automation',
    title: 'Customer Email Automation',
    description: 'Automate customer appreciation, onboarding, and follow-up emails without losing a personal tone.',
    h1: 'Customer communication that scales with you',
    subheadline: 'Automate the recurring parts of customer communication — appreciation, follow-ups, milestones — while keeping every message personal.',
    sections: [
      { heading: 'Appreciation and milestones', body: 'Automate customer appreciation emails and milestone messages tied to signup date, purchase date, or any custom field.' },
      { heading: 'Segment by relationship', body: 'Send different follow-up content to new customers versus long-term ones using segmentation and conditional content.' },
      { heading: 'Respect unsubscribes', body: 'Built-in unsubscribe management and suppression lists keep customer communication compliant and trustworthy.' },
    ],
    faqs: [
      { q: 'Can I automate onboarding emails?', a: 'Yes — the visual automation builder supports wait, condition, and follow-up steps suited to onboarding sequences.' },
    ],
  },
  {
    slug: 'sales-email-automation',
    category: 'feature',
    navLabel: 'Sales Automation',
    title: 'Sales Email Automation',
    description: 'Automate personalized outreach and follow-ups for sales teams, sent from real mailboxes with deliverability protection built in.',
    h1: 'Sales outreach that scales without sounding automated',
    subheadline: 'Send personalized outreach and timed follow-ups from your team’s real mailboxes, with sending limits that protect deliverability.',
    sections: [
      { heading: 'Personalized outreach at volume', body: 'Import a prospect list, personalize by company and role, and let automation handle scheduling and follow-ups so reps can focus on replies.' },
      { heading: 'Follow-up logic', body: 'Configure opened/not-opened conditions so a prospect who hasn’t engaged gets a different follow-up than one who clicked.' },
      { heading: 'Team visibility', body: 'Team roles like Campaign Manager and Analyst let sales leaders review activity and results without slowing reps down.' },
    ],
    faqs: [
      { q: 'Does this replace my CRM?', a: 'No — iReachFlow focuses on personalized email automation. CRM integrations with HubSpot, Salesforce, Pipedrive, and Zoho are on the roadmap.' },
    ],
  },
  {
    slug: 'gmail-email-automation',
    category: 'feature',
    navLabel: 'Gmail Automation',
    title: 'Gmail Email Marketing Automation',
    description: 'Connect your Gmail account and automate personalized campaigns sent directly from your own inbox.',
    h1: 'Email automation for Gmail',
    subheadline: 'Connect an authorized Gmail account and automate personalized campaigns without leaving your usual sending identity behind.',
    sections: [
      { heading: 'Connect Gmail securely', body: 'iReachFlow connects to Gmail through provider-supported authorization, so you don’t have to share your password.' },
      { heading: 'Send as yourself', body: 'Campaigns send from your real Gmail address, which helps recipients recognize and trust the sender.' },
      { heading: 'Stay within Gmail’s limits', body: 'Smart sending controls apply per-mailbox limits so Gmail-based campaigns stay within safe sending volumes.' },
    ],
    faqs: [
      { q: 'Do I need a Google Workspace account?', a: 'iReachFlow supports both personal and Google Workspace Gmail accounts through authorized connection.' },
    ],
  },
  {
    slug: 'microsoft-365-email-automation',
    category: 'feature',
    navLabel: 'Microsoft 365 Automation',
    title: 'Microsoft 365 Email Automation',
    description: 'Connect Microsoft 365 and automate personalized campaigns sent from your organization’s real mailboxes.',
    h1: 'Email automation for Microsoft 365',
    subheadline: 'Connect an authorized Microsoft 365 mailbox and run personalized, automated campaigns from your organization’s existing email identity.',
    sections: [
      { heading: 'Connect Microsoft 365 securely', body: 'Authorization uses provider-supported sign-in, so credentials stay with Microsoft, not with iReachFlow.' },
      { heading: 'Multi-mailbox support', body: 'Organizations with several Microsoft 365 mailboxes can manage sending limits and campaigns per mailbox from one dashboard.' },
      { heading: 'Deliverability monitoring', body: 'The Deliverability Center tracks SPF, DKIM, DMARC, and sender health for each connected Microsoft 365 mailbox.' },
    ],
    faqs: [
      { q: 'Can multiple team members send from different mailboxes?', a: 'Yes — multi-mailbox and organization support let teams manage several sending identities in one place.' },
    ],
  },
  {
    slug: 'email-automation-for-small-business',
    category: 'feature',
    navLabel: 'For Small Business',
    title: 'Email Automation for Small Business',
    description: 'A simple, affordable way for small businesses to automate personalized email campaigns without an enterprise learning curve.',
    h1: 'Email automation built for small teams',
    subheadline: 'Get started free, import your existing contacts, and send your first personalized automated campaign without a steep learning curve.',
    sections: [
      { heading: 'Start free, grow as you need', body: 'The Free and Starter plans give small businesses everything needed to launch personalized campaigns before committing to a paid plan.' },
      { heading: 'No dedicated admin required', body: 'A simple contact import, template editor, and scheduling flow mean a small team can run campaigns without a dedicated marketing operations role.' },
      { heading: 'Room to grow', body: 'As your list and team grow, upgrading unlocks more mailboxes, automation, and AI features without switching platforms.' },
    ],
    faqs: [
      { q: 'What does the Free plan include?', a: 'One mailbox, 100 contacts, 100 emails per month, and basic templates — enough to evaluate the platform before upgrading.' },
    ],
  },
];

const INDUSTRY_PAGES: LandingPageContent[] = [
  {
    slug: 'real-estate',
    category: 'industry',
    navLabel: 'Real Estate',
    title: 'Email Automation for Real Estate',
    description: 'Automate personalized listing updates, follow-ups, and client communication for real estate teams.',
    h1: 'Email automation for real estate professionals',
    subheadline: 'Keep buyers, sellers, and past clients informed with personalized, automated updates — without manual follow-up for every listing.',
    sections: [
      { heading: 'Listing and market updates', body: 'Segment contacts by neighborhood, price range, or buyer/seller status, and automate relevant listing and market updates.' },
      { heading: 'Follow-up sequences', body: 'Automate follow-ups after showings or inquiries so no lead goes cold while your team is focused on closings.' },
      { heading: 'Stay personal past close', body: 'Anniversary and check-in automations keep past clients warm for referrals and repeat business.' },
    ],
    faqs: [
      { q: 'Can I segment contacts by property interest?', a: 'Yes — any custom field, including property type or neighborhood, can be used for segmentation and conditional content.' },
    ],
  },
  {
    slug: 'recruitment',
    category: 'industry',
    navLabel: 'Recruitment',
    title: 'Email Automation for Recruitment',
    description: 'Automate candidate outreach and follow-up communication for recruitment and staffing teams.',
    h1: 'Email automation for recruitment teams',
    subheadline: 'Reach candidate pipelines with personalized outreach, and automate status updates without losing a human tone.',
    sections: [
      { heading: 'Candidate outreach', body: 'Personalize outreach by role, skill, and location, and automate follow-ups for candidates who haven’t responded.' },
      { heading: 'Status updates at scale', body: 'Automate application status and interview scheduling updates for high-volume roles while keeping messaging personal.' },
      { heading: 'Team coordination', body: 'Team roles let recruiters, managers, and analysts share templates and review campaign performance together.' },
    ],
    faqs: [
      { q: 'Can I import candidates from a spreadsheet?', a: 'Yes — contacts import from CSV/Excel, with field mapping to your existing candidate data structure.' },
    ],
  },
  {
    slug: 'consulting',
    category: 'industry',
    navLabel: 'Consulting',
    title: 'Email Automation for Consulting Firms',
    description: 'Automate personalized client updates and thought-leadership distribution for consulting firms.',
    h1: 'Email automation for consulting firms',
    subheadline: 'Keep clients and prospects informed with personalized updates, without pulling consultants away from billable work.',
    sections: [
      { heading: 'Client communication', body: 'Automate recurring status updates and check-ins segmented by client, engagement type, or industry.' },
      { heading: 'Thought leadership distribution', body: 'Share insights and content with segmented lists, personalized by industry or role.' },
      { heading: 'Measurable engagement', body: 'Track opens, clicks, and replies to understand which content resonates with which client segment.' },
    ],
    faqs: [
      { q: 'Can different consultants send from their own mailbox?', a: 'Yes — multi-mailbox support lets each consultant send from their own authorized address.' },
    ],
  },
  {
    slug: 'insurance',
    category: 'industry',
    navLabel: 'Insurance',
    title: 'Email Automation for Insurance',
    description: 'Automate renewal reminders, policy updates, and personalized client communication for insurance agencies.',
    h1: 'Email automation for insurance agencies',
    subheadline: 'Automate renewal reminders and policy communication while keeping every message specific to the client’s policy and history.',
    sections: [
      { heading: 'Renewal reminders', body: 'Automate reminders tied to policy renewal dates, personalized with policy type and coverage details.' },
      { heading: 'Compliant communication', body: 'Consent tracking and suppression lists help keep client communication compliant with retention and consent requirements.' },
      { heading: 'Cross-sell responsibly', body: 'Segment by policy type to share relevant coverage options without generic, unsolicited pitches.' },
    ],
    faqs: [
      { q: 'Does iReachFlow support consent tracking?', a: 'Yes — compliance workflows track consent status, date, and source per contact.' },
    ],
  },
  {
    slug: 'finance',
    category: 'industry',
    navLabel: 'Finance',
    title: 'Email Automation for Finance',
    description: 'Automate personalized client updates and communication for financial services and advisory firms.',
    h1: 'Email automation for financial services',
    subheadline: 'Send personalized market updates, reminders, and client communication automatically, with compliance controls built in.',
    sections: [
      { heading: 'Personalized client updates', body: 'Segment clients by portfolio type or life stage to automate relevant updates rather than one generic newsletter.' },
      { heading: 'Auditability', body: 'Activity logs and compliance workflows support retention and audit requirements common in financial services.' },
      { heading: 'Secure by default', body: 'Encrypted secrets, permissions, and authorized mailbox connections protect client communication.' },
    ],
    faqs: [
      { q: 'Is client data encrypted?', a: 'Secrets and credentials are encrypted, and access is controlled through team roles and permissions.' },
    ],
  },
  {
    slug: 'hospitality',
    category: 'industry',
    navLabel: 'Hospitality',
    title: 'Email Automation for Hospitality',
    description: 'Automate personalized guest communication, offers, and follow-ups for hospitality businesses.',
    h1: 'Email automation for hospitality businesses',
    subheadline: 'Automate booking confirmations, offers, and guest follow-ups personalized by stay history and preferences.',
    sections: [
      { heading: 'Guest journey automation', body: 'Automate pre-stay, during-stay, and post-stay communication segmented by booking type or guest history.' },
      { heading: 'Seasonal and holiday offers', body: 'Occasion automations make it easy to send timely seasonal offers personalized by guest segment.' },
      { heading: 'Feedback and reviews', body: 'Automate post-stay follow-ups requesting feedback, personalized by property or room type.' },
    ],
    faqs: [
      { q: 'Can I personalize by past stays?', a: 'Yes — any field you import, including stay history, can drive personalization and segmentation.' },
    ],
  },
  {
    slug: 'ecommerce',
    category: 'industry',
    navLabel: 'Ecommerce',
    title: 'Email Automation for Ecommerce',
    description: 'Automate personalized order updates, win-back campaigns, and customer appreciation emails for ecommerce brands.',
    h1: 'Email automation for ecommerce brands',
    subheadline: 'Automate order-related and lifecycle emails personalized by purchase history, without a full marketing automation suite.',
    sections: [
      { heading: 'Lifecycle campaigns', body: 'Automate welcome, win-back, and appreciation emails segmented by purchase history and recency.' },
      { heading: 'Personalized by purchase', body: 'Merge fields and conditional content let one campaign reference each customer’s own order details.' },
      { heading: 'Track what converts', body: 'Campaign analytics by segment show which lifecycle emails drive opens, clicks, and replies.' },
    ],
    faqs: [
      { q: 'Can I trigger emails from purchase data?', a: 'Campaigns can be segmented and scheduled around purchase-related fields you import; direct storefront triggers are on the integrations roadmap.' },
    ],
  },
  {
    slug: 'agencies',
    category: 'industry',
    navLabel: 'Agencies',
    title: 'Email Automation for Agencies',
    description: 'Manage personalized email automation for multiple clients from one platform, with organization and role-based access.',
    h1: 'Email automation for agencies',
    subheadline: 'Run personalized campaigns across multiple clients and mailboxes, with roles and approvals that keep client work organized.',
    sections: [
      { heading: 'Multi-client organization', body: 'Multi-mailbox and organization support keep each client’s contacts, templates, and campaigns separate.' },
      { heading: 'Team roles and approvals', body: 'Assign Campaign Manager, Analyst, or Viewer roles per team member, with approvals before sensitive campaigns go out.' },
      { heading: 'Client-ready reporting', body: 'Campaign analytics by client and campaign make it straightforward to report results back to stakeholders.' },
    ],
    faqs: [
      { q: 'Can I manage multiple clients in one account?', a: 'Organization and multi-mailbox support are designed for exactly this — separating client work while sharing one platform.' },
    ],
  },
];

export const LANDING_PAGES: LandingPageContent[] = [...FEATURE_PAGES, ...INDUSTRY_PAGES];

export function getLandingPage(slug: string): LandingPageContent | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
