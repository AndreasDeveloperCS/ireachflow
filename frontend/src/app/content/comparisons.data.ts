export interface ComparisonRow {
  label: string;
  ireachflow: string;
  competitor: string;
}

export interface ComparisonContent {
  slug: string;
  competitorName: string;
  title: string;
  description: string;
  summary: string;
  rows: ComparisonRow[];
}

export const COMPARISONS: ComparisonContent[] = [
  {
    slug: 'mailchimp',
    competitorName: 'Mailchimp',
    title: 'iReachFlow vs Mailchimp',
    description: 'How iReachFlow compares to Mailchimp for personalized, mailbox-based email automation.',
    summary: 'Mailchimp is built around broadcast newsletters sent from shared marketing infrastructure. iReachFlow is built around personalized campaigns sent from your own authorized mailbox, so each message carries your normal sending identity.',
    rows: [
      { label: 'Sends from', ireachflow: 'Your own Gmail / Microsoft 365 mailbox', competitor: 'Shared marketing sending infrastructure' },
      { label: 'Personalization', ireachflow: 'Per-contact merge fields, conditional content, AI tone', competitor: 'Merge tags, mainly template-level personalization' },
      { label: 'Best fit', ireachflow: 'Personal, relationship-driven outreach', competitor: 'Large-list newsletters and broadcast marketing' },
    ],
  },
  {
    slug: 'brevo',
    competitorName: 'Brevo',
    title: 'iReachFlow vs Brevo',
    description: 'How iReachFlow compares to Brevo for personalized email automation and sending.',
    summary: 'Brevo (formerly Sendinblue) offers broad marketing automation including SMS and transactional email. iReachFlow focuses specifically on personalized email automation sent from a real, authorized mailbox.',
    rows: [
      { label: 'Sends from', ireachflow: 'Your own authorized mailbox', competitor: 'Brevo sending infrastructure / verified domains' },
      { label: 'Scope', ireachflow: 'Focused on personalized email automation', competitor: 'Broad suite: email, SMS, chat, CRM' },
      { label: 'Best fit', ireachflow: 'Teams wanting mailbox-native personal outreach', competitor: 'Teams wanting an all-in-one marketing suite' },
    ],
  },
  {
    slug: 'hubspot',
    competitorName: 'HubSpot',
    title: 'iReachFlow vs HubSpot',
    description: 'How iReachFlow compares to HubSpot for personalized email automation without a full CRM commitment.',
    summary: 'HubSpot bundles email automation into a broader CRM and marketing platform. iReachFlow is a focused, lighter-weight alternative for teams that want personalized email automation without adopting a full CRM.',
    rows: [
      { label: 'Setup complexity', ireachflow: 'Register, connect a mailbox, import contacts', competitor: 'Full CRM setup and configuration' },
      { label: 'Pricing model', ireachflow: 'Simple Free–Enterprise ladder by contacts/mailboxes', competitor: 'Tiered CRM + Marketing Hub pricing' },
      { label: 'Best fit', ireachflow: 'Teams that want email automation first', competitor: 'Teams already standardized on HubSpot CRM' },
    ],
  },
  {
    slug: 'mailmeteor',
    competitorName: 'Mailmeteor',
    title: 'iReachFlow vs Mailmeteor',
    description: 'How iReachFlow compares to Mailmeteor for personalized mail merge and email automation.',
    summary: 'Mailmeteor is a mail merge add-on built around Google Sheets and Gmail. iReachFlow offers a similar mailbox-native sending model, plus a standalone contact database, automation builder, and analytics.',
    rows: [
      { label: 'Contact source', ireachflow: 'Built-in contact database with segmentation', competitor: 'Google Sheets-driven mail merge' },
      { label: 'Automation', ireachflow: 'Visual automation builder with waits and conditions', competitor: 'Primarily one-time or scheduled sends' },
      { label: 'Best fit', ireachflow: 'Teams wanting a dedicated automation platform', competitor: 'Individuals already living in Google Sheets' },
    ],
  },
  {
    slug: 'yet-another-mail-merge',
    competitorName: 'Yet Another Mail Merge',
    title: 'iReachFlow vs Yet Another Mail Merge',
    description: 'How iReachFlow compares to Yet Another Mail Merge (YAMM) for personalized email sending.',
    summary: 'YAMM is a lightweight Gmail and Sheets mail merge tool. iReachFlow covers the same mailbox-native sending model with added segmentation, automation, and deliverability monitoring.',
    rows: [
      { label: 'Automation depth', ireachflow: 'Waits, conditions, follow-ups, recurring campaigns', competitor: 'Primarily single scheduled sends' },
      { label: 'Deliverability tools', ireachflow: 'Deliverability Center: SPF, DKIM, DMARC, sender health', competitor: 'Limited built-in deliverability monitoring' },
      { label: 'Best fit', ireachflow: 'Teams wanting ongoing automated relationship email', competitor: 'One-off Gmail mail merges' },
    ],
  },
  {
    slug: 'instantly',
    competitorName: 'Instantly',
    title: 'iReachFlow vs Instantly',
    description: 'How iReachFlow compares to Instantly for personalized outreach with a relationship-first approach.',
    summary: 'Instantly is built around high-volume cold outreach across many mailboxes. iReachFlow is built around personalized, relationship-first communication with configurable, conservative sending limits.',
    rows: [
      { label: 'Positioning', ireachflow: 'Personalized relationship automation', competitor: 'High-volume cold outreach and lead generation' },
      { label: 'Sending philosophy', ireachflow: 'Conservative, configurable limits protecting deliverability', competitor: 'Optimized for outreach volume across mailboxes' },
      { label: 'Best fit', ireachflow: 'Customer, partner, and lead relationships over time', competitor: 'High-volume top-of-funnel cold email' },
    ],
  },
  {
    slug: 'gmass',
    competitorName: 'GMass',
    title: 'iReachFlow vs GMass',
    description: 'How iReachFlow compares to GMass for Gmail-based personalized email campaigns.',
    summary: 'GMass is a Gmail extension for mail merge campaigns. iReachFlow supports both Gmail and Microsoft 365, with a standalone automation builder, analytics, and team roles beyond a single mailbox.',
    rows: [
      { label: 'Mailbox support', ireachflow: 'Gmail and Microsoft 365', competitor: 'Gmail (Chrome extension based)' },
      { label: 'Team features', ireachflow: 'Organizations, team roles, approvals', competitor: 'Primarily single-user oriented' },
      { label: 'Best fit', ireachflow: 'Teams and organizations across mailbox providers', competitor: 'Individual Gmail users wanting a quick mail merge' },
    ],
  },
];

export function getComparison(slug: string): ComparisonContent | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
