import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    imgUrl: ''
  })

  img: any;
  fileName = '';
  popupContainer:string = "popupContainerClose";
  newBlog? : Blog | undefined;
  public blogs? : Blog[] = []

  constructor(
    private router : Router,
    private dataSerice: DataService,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

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
            imgUrl: el.imgUrl
          })
        }
      })
    }
  }

  handleEdit(){
    console.log(this.img);
    
    const updatedBlog : Blog = {
      _id: this.selectForm.value['blogID'],
      body: this.editForm.value['body'],
      title: this.editForm.value['title'],
      category: this.editForm.value['category'],
      author: this.editForm.value['author'],
      authorTitle: this.editForm.value['authorTitle'],
      imgUrl: this.editForm.value['imgUrl']? this.editForm.value['imgUrl'] : undefined
    }
    this.dataSerice.editBlog(updatedBlog, this.img)
      .then(blog => {
        if(blog){ 
          this.newBlog = blog,
          console.log(blog);
        }else
          alert("Please make sure the details are filled out correctly!")
      })
  }

  async deleteBlog(){
    if(!this.selectForm.value['blogID']){
      return
    }

    this.dataSerice.deleteBlog(this.selectForm.value['blogID']).then(()=>{
      this.dataSerice.deleteOldImage(this.editForm.value['imgUrl'])
    })
    // .finally(() => 
    //   this.router.navigate(['/']).then(() =>
    //     window.location.reload()
    //   )
    // )
  }

  closePopup(){
    this.popupContainer = "popupContainerClose";
  }
  openPopup(){
    this.popupContainer = "popupContainerOpen";
  }

  onFileSelected(event : any){
    const image: File = event.target.files[0];
    const allowedTypes: String[] = ["image/gif", "image/avif", "image/jpeg", "image/png", "image/webp"];
    if(image && allowedTypes.includes(image.type)){
      this.img = image;
      this.fileName = this.img.name
      this.closePopup()
    }
  }

}
