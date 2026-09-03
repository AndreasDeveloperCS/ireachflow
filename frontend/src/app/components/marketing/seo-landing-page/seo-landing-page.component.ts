import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getLandingPage, LandingPageContent } from 'src/app/content/landing-pages.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-seo-landing-page',
  templateUrl: './seo-landing-page.component.html',
  styleUrls: ['./seo-landing-page.component.scss'],
})
export class SeoLandingPageComponent implements OnInit, OnDestroy {
  page?: LandingPageContent;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const slug = data['slug'] as string;
      this.page = getLandingPage(slug);
      if (this.page) {
        this.seo.apply({ title: this.page.title, description: this.page.description });
        this.seo.setJsonLd('landing-page-faq', {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: this.page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd('landing-page-faq');
  }
}
