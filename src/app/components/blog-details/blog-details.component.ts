import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogs: Blog[] | undefined= [];
  blog$!: Observable<Blog | undefined>;
  id!: any

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    this.fetcher()
  }

  async fetcher() {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      console.log(this.id);
    });

    this.blog$ = from(this.dataService.fetchBlog(this.id));
    this.blogs = await this.dataService.fetchBlogs();
    this.blogs = this.blogs?.filter(blog => blog._id != this.id);

  }

  async handleClick(blogID:any){
    await this.router.navigate(['/blog', blogID ]);
    await this.fetcher();
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
 

}
