import { Injectable } from '@angular/core';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
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

  blogs : any[] = []

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
        this.blogs.splice(index);
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
