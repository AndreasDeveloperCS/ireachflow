// Seed content for the blog scaffold (brandbook §10 "Content Strategy").
// This is a small starting set, not the full editorial calendar — extend
// this array as new posts are written.
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedOn: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-send-personalized-holiday-emails',
    title: 'How to Send Personalized Holiday Emails',
    description: 'A practical guide to planning and automating holiday email campaigns that still feel personal.',
    category: 'Holiday marketing',
    publishedOn: '2026-09-01',
    body: [
      'Holiday emails fail when they read like they were sent to everyone at once. The fix isn’t writing more copy — it’s personalizing the copy you already have with the fields you already collect.',
      'Start with segmentation: group contacts by relationship (customer, lead, partner) before you group by anything else. A "thank you for another year" message means something different to a five-year customer than a lead who signed up last week.',
      'Then layer in merge fields — first name, company, last purchase or interaction date — and schedule the send ahead of time so it goes out in each recipient’s timezone rather than all at once.',
    ],
  },
  {
    slug: 'spf-vs-dkim-vs-dmarc',
    title: 'SPF vs DKIM vs DMARC',
    description: 'What each email authentication standard does, and why all three matter for deliverability.',
    category: 'Deliverability',
    publishedOn: '2026-08-18',
    body: [
      'SPF (Sender Policy Framework) tells receiving mail servers which servers are allowed to send email for your domain. DKIM (DomainKeys Identified Mail) adds a cryptographic signature so receivers can verify a message wasn’t altered in transit.',
      'DMARC (Domain-based Message Authentication, Reporting and Conformance) ties the two together: it tells receiving servers what to do when SPF or DKIM checks fail, and gives you visibility into who is sending mail as your domain.',
      'None of the three alone guarantees inbox placement, but missing all three is one of the fastest ways to end up in spam. iReachFlow’s Deliverability Center checks all three for every connected mailbox.',
    ],
  },
  {
    slug: 'how-ai-personalizes-email-campaigns',
    title: 'How AI Personalizes Email Campaigns',
    description: 'Where AI actually helps in email personalization — and where merge fields already do the job.',
    category: 'AI email marketing',
    publishedOn: '2026-08-05',
    body: [
      'A lot of what looks like "AI personalization" is really just merge fields: swapping in a first name or company. That part doesn’t need AI — it needs a clean contact list and good field mapping.',
      'Where AI adds real value is tone and phrasing: taking the same underlying message and adapting it to sound professional, friendly, or executive-level depending on the recipient, without writing five separate templates.',
      'AI translation extends the same idea across languages, letting one campaign reach a multilingual audience without a separate translation workflow for every send.',
    ],
  },
  {
    slug: 'email-automation-for-small-business-getting-started',
    title: 'Email Automation for Small Business: Getting Started',
    description: 'The minimum setup a small business needs before sending its first automated campaign.',
    category: 'Email automation',
    publishedOn: '2026-07-22',
    body: [
      'You don’t need a marketing team to start automating email. You need three things: a mailbox you’re allowed to send from, a clean contact list, and one message worth sending.',
      'Start small — one welcome sequence or one monthly update — before building out multi-step automations. It’s easier to see what’s working when there’s less to measure.',
      'Once the basics are running, sending limits and unsubscribe handling matter more than volume. A smaller list that trusts your emails outperforms a larger one that doesn’t.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
