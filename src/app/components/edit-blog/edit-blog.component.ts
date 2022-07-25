import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Blog } from 'src/app/interfaces/blog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  selectForm = this.formBuilder.group({
    blogID:''
  })
  editForm = this.formBuilder.group({
    body: '',
    title: '',
    category: '',
    author: '',
    author_title: '',
    blogIMG: ''
  })
  public blogs:Blog[] = []
  constructor(
    private dataSerice: DataService,
    private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.blogs = await this.dataSerice.fetchBlogs();
  }

  handleSelect(){
    let id = this.selectForm.value['blogID'];
    if(id == 'no'){
      this.editForm.reset();
    }else{
      this.blogs.forEach(el =>{
        if (el.id == id){
          this.editForm.patchValue({
            body: el.body,
            title: el.title,
            category: el.category,
            author: el.author,
            author_title: el.author_title,
            // blogIMG: el.image_url? el.image_url : ''
          })
        }
      })
    }
  }

  handleEdit(){
    const updatedBlog :Blog = {
      id: this.selectForm.value['blogID'],
      body: this.editForm.value['body'],
      title: this.editForm.value['title'],
      category: this.editForm.value['category'],
      author: this.editForm.value['author'],
      author_title: this.editForm.value['author_title'],
      image_url: this.editForm.value['blogIMG'] 
    }
    this.dataSerice.editBlog(updatedBlog);
  }


}
