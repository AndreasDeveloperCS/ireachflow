import { Component, OnInit } from '@angular/core';
import { BLOG_POSTS } from 'src/app/content/blog-posts.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  posts = BLOG_POSTS;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'Blog',
      description: 'Guides on email automation, personalization, holiday marketing, deliverability, and AI email marketing from iReachFlow.',
    });
  }
}
