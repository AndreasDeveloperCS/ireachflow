import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMeta {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private meta: Meta) {}

  apply(seo: SeoMeta): void {
    const fullTitle = seo.title.includes('iReachFlow') ? seo.title : `${seo.title} | iReachFlow`;
    this.titleService.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
  }

  /** Injects (or replaces) a JSON-LD <script> tag with the given id for structured data / GEO. */
  setJsonLd(id: string, data: unknown): void {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  removeJsonLd(id: string): void {
    document.getElementById(id)?.remove();
  }
}
