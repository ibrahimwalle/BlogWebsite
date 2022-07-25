import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogs: Blog[] = [];
  blog!: Blog;
  id!: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      console.log(this.id);
    });
    this.blogs = await this.dataService.fetchBlogs()
    this.blogs.forEach(el =>{
      if (el.id == this.id){
        this.blog = el
      }
    })
  }

}
