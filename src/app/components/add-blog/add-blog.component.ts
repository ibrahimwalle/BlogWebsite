import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  
  addBlogForm = this.formBuilder.group({
    body: '',
    title: '',
    category: '',
    author: '',
    author_title: '',
    blogIMG: ''
  });

  ngOnInit(): void {
  }

  handleSubmit(){
    const newBlog :Blog = {
      id: (Math.random()+10).toString(),
      body: this.addBlogForm.value['body'],
      title: this.addBlogForm.value['title'],
      category: this.addBlogForm.value['category'],
      author: this.addBlogForm.value['author'],
      author_title: this.addBlogForm.value['author_title'],
      post_date: new Date().toLocaleDateString(),
      image_url: this.addBlogForm.value['blogIMG'] 
    }
    this.dataService.saveBlog(newBlog); 
  }

}
