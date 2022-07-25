import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  public blogs:Blog[] = [];
  constructor(
    private router: Router,
    private dataSerice: DataService) { }

  async ngOnInit(): Promise<void> {
    this.blogs = await this.dataSerice.fetchBlogs();
  }

  handleClick(blogID:any){
   this.router.navigate(['/blog', blogID ]);
  }

  async deleteBlog(blogID:any){
    this.dataSerice.deleteBlog(blogID);
    this.blogs = await this.dataSerice.fetchBlogs();
  }

  populateBlogs(){
    this.dataSerice.populateBackupBlogs();
    this.blogs = this.dataSerice.fetchBlogs();
  }

}
