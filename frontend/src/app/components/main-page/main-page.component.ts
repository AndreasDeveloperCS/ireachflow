import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  howItWorks = [
    { step: 1, title: 'Connect your mailbox', body: 'Connect an authorized Gmail or Microsoft 365 mailbox — or your own SMTP.' },
    { step: 2, title: 'Import contacts', body: 'Bring in your list from CSV or Excel and map the fields you care about.' },
    { step: 3, title: 'Personalize the message', body: 'Write once, using merge fields so every recipient sees their own details.' },
    { step: 4, title: 'Set audience & rules', body: 'Segment your audience and define timing, business hours, and sending limits.' },
    { step: 5, title: 'Launch', body: 'Send now, schedule ahead, or trigger it as part of a recurring automation.' },
    { step: 6, title: 'Analyze', body: 'Track delivery, opens, clicks, and replies by campaign and segment.' },
  ];

  pillars = [
    { icon: 'auto_awesome', title: 'Personalize', body: 'Merge fields and conditional content make every message specific to the person reading it.' },
    { icon: 'bolt', title: 'Automate', body: 'A visual workflow builder handles waits, conditions, follow-ups, and recurring sends.' },
    { icon: 'send', title: 'Deliver', body: 'Smart sending limits and a deliverability center protect your sender reputation.' },
    { icon: 'insights', title: 'Measure', body: 'See delivery, opens, clicks, and replies broken down by campaign and segment.' },
  ];

  mergeFields = ['{{FirstName}}', '{{Company}}', '{{Position}}', '{{City}}', '{{Industry}}', '{{Event}}'];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'iReachFlow — Personalized Email Marketing Automation',
      description: 'Automate personalized email campaigns from your own mailbox. Import contacts, personalize messages, schedule campaigns and measure results with powerful email automation.',
    });
  }
}
