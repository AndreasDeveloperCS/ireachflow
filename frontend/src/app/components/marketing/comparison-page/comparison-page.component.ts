import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComparisonContent, getComparison } from 'src/app/content/comparisons.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-comparison-page',
  templateUrl: './comparison-page.component.html',
  styleUrls: ['./comparison-page.component.scss'],
})
export class ComparisonPageComponent implements OnInit {
  comparison?: ComparisonContent;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('competitor') ?? '';
      this.comparison = getComparison(slug);
      if (this.comparison) {
        this.seo.apply({ title: this.comparison.title, description: this.comparison.description });
      }
    });
  }
}
