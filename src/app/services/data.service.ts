import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient) { }
  
  backupBlogs : any[] = [
    {"id":"123",
    "category":"Design",
    "image_url":"../../../assets/imgs/blog.jpg",
    "post_date":"July 21, 2021",
    "title":"From Sketch to Figma",
    "body":"lorem ipsum is a computer generated text that has absolutley no meaning what so ever",
    "author":"Luis Monteiro",
    "author_title":"Design Director",
    "author_image":"../../assets/account.svg"},
    {"id":"321",
    "category":"Design",
    "image_url":"../../../assets/imgs/blog.jpg",
    "post_date":"June 19, 2022",
    "title":"PhotoShop Essentials",
    "body":"lorem ipsum is a computer generated text that has absolutley no meaning what so ever",
    "author":"Luis Monteiro",
    "author_title":"Design Director",
    "author_image":"../../assets/account.svg"}
  ]

  blog? : Blog;
  blogs : Blog[] = [];
  baseUri: string = `https://ibrapi.net/`
  
  async fetchBlogs() : Promise<Blog[] | undefined>{
    const uri = `${this.baseUri}blogs`;
    await lastValueFrom(this.http.get<any>(uri)).then(res => {
      this.blogs = res.data;
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
    return this.blogs;
  }

  async fetchBlog(id : string) : Promise<Blog | undefined>{
    const uri = `${this.baseUri}blogs/${id}`;
    await lastValueFrom(this.http.get<any>(uri)).then(res => {
      this.blog = res.data;
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
    return this.blog;
  }

  async saveBlog(blog:Blog){
    const uri = `${this.baseUri}blogs`;
    this.http.post(uri,blog).subscribe({
      next:(res)=>alert("Saved Blog :" + JSON.stringify(res)),
      error:(err)=>alert(err),
      complete:()=>console.log('Saved new Blog'),
    })
  }

  async deleteBlog(blogID:any){
    const uri = `${this.baseUri}blogs/${blogID}`;
    this.http.delete(uri).subscribe({
      next:(res)=>alert("Deleted Blog :" + blogID + JSON.stringify(res)),
      error:(err)=>alert(err),
      complete:()=>console.log('Deleted Blog', blogID),
    })
  }

  async editBlog(blog:Blog){
    const uri = `${this.baseUri}blogs/${blog._id}`;
    this.http.put(uri,blog).subscribe({
      next:(res)=>alert("Updated Blog :" + JSON.stringify(res)),
      error:(err)=>alert(err),
      complete:()=>console.log('Update Blog Done'),
    })
  }

  // Local Storage Funtions:
  
  saveBlogs(){
    localStorage.setItem('blogs', JSON.stringify(this.blogs))
    alert("Blogs Updated!")
  }

  populateBackupBlogs(){
    this.blogs = this.backupBlogs;
    this.saveBlogs();
  }
}
