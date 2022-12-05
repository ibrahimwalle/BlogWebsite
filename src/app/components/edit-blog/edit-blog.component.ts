import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    authorTitle: '',
    blogIMG: ''
  })
  public blogs? : Blog[] = []
  constructor(
    private router : Router,
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
      this.blogs?.forEach(el =>{
        if (el._id == id){
          this.editForm.patchValue({
            body: el.body,
            title: el.title,
            category: el.category,
            author: el.author,
            authorTitle: el.authorTitle,
            // blogIMG: el.image_url? el.image_url : ''
          })
        }
      })
    }
  }

  handleEdit(){
    const updatedBlog : Blog = {
      _id: this.selectForm.value['blogID'],
      body: this.editForm.value['body'],
      title: this.editForm.value['title'],
      category: this.editForm.value['category'],
      author: this.editForm.value['author'],
      authorTitle: this.editForm.value['authorTitle'],
      imgUrl: this.editForm.value['blogIMG']? this.editForm.value['blogIMG'] : undefined
    }
    this.dataSerice.editBlog(updatedBlog).finally(() => 
      this.router.navigate(['/']).then(() =>
        window.location.reload()
      )
    )
  }

  async deleteBlog(){
    this.dataSerice.deleteBlog(this.selectForm.value['blogID']).finally(() => 
      this.router.navigate(['/']).then(() =>
        window.location.reload()
      )
    )
  }

}
