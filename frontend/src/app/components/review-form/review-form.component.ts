import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../interfaces/review';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  @Input() isCreateMode!: boolean;
  @Output() formEvent = new EventEmitter<string>();
  review: Review

  form = new FormGroup({
    score: new FormControl(0, [Validators.required, Validators.pattern(/^[1-5]$/)]),
    comment: new FormControl('')
  })

  constructor(private _reviewService: ReviewService){
    
  }

  ngOnInit(){
    if (!this.isCreateMode){
      this.getReview(localStorage.getItem('cid'), Number(localStorage.getItem('pid')))
    }
  }

  closeForm(status: boolean) {
    this.formEvent.emit(status ? 'successful' : 'canceled');
  }

  getReview(clientId: string, productId: number){
    this._reviewService.getReview(clientId, productId).subscribe({
      next: (res) => {
          this.review = res
          this.form.setValue({
            score: res.score,
            comment: res.comment === 'No comment' ? '' : res.comment
          })
      }
    })
  }

  saveData(){
    const review: Review = {
      score: Number(this.form.value.score),
      comment: this.form.value.comment === '' ? 'No comment' : this.form.value.comment,
      ProductId: Number(localStorage.getItem('pid')),
      ClientId: localStorage.getItem('cid')
    }

    if(this.isCreateMode){
      this._reviewService.createReview(review).subscribe({
        next: ()=>{
          Swal.fire({
            icon: "success",
            title: "Thanks for rating this product",
            text: `Review was created!!`,
            showConfirmButton: false,
            timer: 1500
          })
          this.closeForm(true)
        }, error: (e: HttpErrorResponse) => {
          if(e.error.forUser){
            Swal.fire({
              icon: "error",
              title: e.error.message,
              text: e.error.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error creating review",
              text: `Check the form fields and try later`,
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
      })
    } else {
      this._reviewService.updateReview(review.ClientId, review.ProductId, review).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Thanks for rating this product",
            text: `Review was updated!!`,
            showConfirmButton: false,
            timer: 1500
          })
          this.closeForm(true)
        }, error: (e: HttpErrorResponse) => {
          if(e.error.forUser){
            Swal.fire({
              icon: "error",
              title: e.error.message,
              text: e.error.text,
              showConfirmButton: false,
              timer: 2000
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error updating review",
              text: `Check the form fields and try later`,
              showConfirmButton: false,
              timer: 2000
            })
          }
        }
      })
    }
  }
}
