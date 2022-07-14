import { Injectable } from '@angular/core';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  blogs : Blog[] = [
    {
      id: '123',
      category: 'Design',
      image_url: '../../../assets/imgs/blog.jpg',
      post_date: 'July 21, 2021', 
      title: 'From Sketch to Figma',
      body: 'lorem ipsum is a computer generated text that has absolutley no meaning what so ever',
      author: 'Luis Monteiro',
      author_title: 'Design Director',
      author_image: '../../assets/account.svg'
    },
    {
      id: '321',
      category: 'Design',
      image_url: '../../../assets/imgs/blog.jpg',
      post_date: 'June 19, 2022', 
      title: 'PhotoShop Essentials',
      body: 'lorem ipsum is a computer generated text that has absolutley no meaning what so ever',
      author: 'Luis Monteiro',
      author_title: 'Design Director',
      author_image: '../../assets/account.svg'
    }
  ]

  fetchBlogs() : Blog[]{
    return this.blogs;
  }

  saveBlog(blog:Blog){
    this.blogs.push(blog);
    localStorage.setItem('blog', blog.toLocaleString())
    alert("new Blog Saved!")
  }
}
