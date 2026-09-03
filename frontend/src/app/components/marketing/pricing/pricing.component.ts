import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

interface PricingPlan {
  name: string;
  price: string;
  audience: string;
  capabilities: string[];
  highlighted?: boolean;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '€0',
      audience: 'Evaluation',
      capabilities: ['1 mailbox', '100 contacts', '100 emails / month', 'Basic templates'],
    },
    {
      name: 'Starter',
      price: '€19–29/mo',
      audience: 'Individuals / SMB',
      capabilities: ['3 mailboxes', '2,500 contacts', 'Personalization', 'Scheduling', 'Analytics'],
    },
    {
      name: 'Business',
      price: '€59–99/mo',
      audience: 'Growing teams',
      capabilities: ['10 mailboxes', '25,000 contacts', 'Automation', 'AI features', 'Advanced analytics', 'Integrations'],
      highlighted: true,
    },
    {
      name: 'Pro',
      price: '€149–299/mo',
      audience: 'Advanced teams',
      capabilities: ['50 mailboxes', 'API & webhooks', 'Advanced compliance', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      audience: 'Large organizations',
      capabilities: ['SSO', 'Audit logs', 'SLA', 'Dedicated support', 'Custom infrastructure'],
    },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'Pricing',
      description: 'Simple, transparent pricing for iReachFlow — from a free plan for evaluation to custom enterprise plans.',
    });
  }
}
