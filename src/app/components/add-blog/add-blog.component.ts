import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    private dataService: DataService) { }

  
  addBlogForm = this.formBuilder.group({
    body: '',
    title: '',
    category: '',
    author: '',
    authorTitle: '',
    blogIMG: undefined
  });

  ngOnInit(): void {
  }

  handleSubmit(){
    const newBlog :Blog = {
      // _id: (Math.random()+10).toString(),
      body: this.addBlogForm.value['body'],
      title: this.addBlogForm.value['title'],
      category: this.addBlogForm.value['category'],
      author: this.addBlogForm.value['author'],
      authorTitle: this.addBlogForm.value['authorTitle'],
      // postdate: new Date().toLocaleDateString(),
      imgUrl: this.addBlogForm.value['blogIMG']? this.addBlogForm.value['blogIMG'] : undefined
    }
    this.dataService.saveBlog(newBlog).finally(() => 
      this.router.navigate(['/']).then(() =>
        window.location.reload()
      )
    ) 
  }

}
