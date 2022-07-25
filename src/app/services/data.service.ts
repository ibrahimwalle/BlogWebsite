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

  blogs : any[] = [];
  
  // async fetchBlogs() : Promise<Blog[]>{
  //   const uri = 'http://localhost:4000/getBlogs';
  //   await lastValueFrom(this.http.get<any[]>(uri)).then(newBlogs=>{
  //     console.log(newBlogs);
  //     this.blogs = newBlogs;
  //   }).catch(err=>{
  //     alert(err);
  //   })
  //   console.log(this.blogs);
  //   return this.blogs;
  // }

  // saveBlog(blog:Blog){
  //   const uri = 'http://localhost:4000/createBlog';
  //   this.http.post(uri,blog).subscribe({
  //     next:(res)=>alert("Saved Blog :"+res),
  //     error:(err)=>alert(err),
  //     complete:()=>console.log('Saved new Blog'),
  //   })
  // }

  // _saveBlog(blog:Blog): Observable<any> {
  //   const uri = 'http://localhost:4000/createBlog';
  //   return this.http.post(uri,blog);
  // }

  // deleteBlog(blogID:any){
  //   const uri = 'http://localhost:4000/deleteBlog';
  //   this.http.delete(uri,{params:{'id':blogID}}).subscribe({
  //     next:(res)=>alert("Deleted Blog :"+blogID+res),
  //     error:(err)=>alert(err),
  //     complete:()=>console.log('Deleted Blog', blogID),
  //   })
  // }

  // editBlog(blog:Blog){
  //   const uri = 'http://localhost:4000/editBlog';
  //   this.http.patch(uri,blog).subscribe({
  //     next:(res)=>alert("Updated Blog :"+res),
  //     error:(err)=>alert(err),
  //     complete:()=>console.log('Update Blog Done'),
  //   })
  // }

  // Local Storage Funtions:
  fetchBlogs() : Blog[]{
    let newBlogs = localStorage.getItem('blogs');
    this.blogs = newBlogs ? JSON.parse(newBlogs) : null
    return this.blogs;
  }

  saveBlog(blog:Blog){
    this.blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(this.blogs))
    alert("new Blog Saved!")
  }
  
  saveBlogs(){
    localStorage.setItem('blogs', JSON.stringify(this.blogs))
    alert("Blogs Updated!")
  }

  editBlog(blog:Blog){
    this.blogs.forEach(el =>{
      if (el.id == blog.id){
        el.body = blog.body,
        el.title = blog.title,
        el.category = blog.category,
        el.author = blog.author,
        el.author_title = blog.author_title,
        el.image_url = blog.image_url? blog.image_url : el.image_url;
        this.saveBlogs();
        alert('Blog Updated!');
      }
    })
  }

  deleteBlog(blogID:any){
    this.blogs.forEach(el =>{
      if (el.id == blogID){
        let index = this.blogs.indexOf(el);
        this.blogs.splice(index,1);
        this.saveBlogs();
        alert('Blog deleted!')
      }
    })
  }

  populateBackupBlogs(){
    this.blogs = this.backupBlogs;
    this.saveBlogs();
  }
}
