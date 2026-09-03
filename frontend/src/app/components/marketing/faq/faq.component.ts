import { Component, OnDestroy, OnInit } from '@angular/core';
import { FAQ_ITEMS } from 'src/app/content/faq.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnDestroy {
  faqs = FAQ_ITEMS;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions about iReachFlow: how it works, Gmail and Microsoft 365 support, deliverability, and GDPR-oriented workflows.',
    });
    this.seo.setJsonLd('faq-page', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('faq-page');
  }
}
