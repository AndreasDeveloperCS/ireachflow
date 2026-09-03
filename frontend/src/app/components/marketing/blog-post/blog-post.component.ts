import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost, getBlogPost } from 'src/app/content/blog-posts.data';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  post?: BlogPost;

  constructor(private route: ActivatedRoute, private seo: SeoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      this.post = getBlogPost(slug);
      if (this.post) {
        this.seo.apply({ title: this.post.title, description: this.post.description });
      }
    });
  }
}
