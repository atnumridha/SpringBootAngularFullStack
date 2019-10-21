import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

    productForm: FormGroup;
    id: number = null;
    prodName: string = '';
    prodDesc: string = '';
    prodPrice: number = null;
    isLoadingResults = false;

    matcher = new MyErrorStateMatcher();

    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getProduct(this.route.snapshot.params['id']);
        this.productForm = this.formBuilder.group({
            'prodName': [null, Validators.required],
            'prodDesc': [null, Validators.required],
            'prodPrice': [null, Validators.required]
        });
    }

    getProduct(id) {
        this.api.getProduct(id).subscribe(data => {
            this.id = data.id;
            this.productForm.setValue({
                prodName: data.prodName,
                prodDesc: data.prodDesc,
                prodPrice: data.prodPrice
            });
        });
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;
        this.api.updateProduct(this.id, form)
            .subscribe(res => {
                let id = res['id'];
                this.isLoadingResults = false;
                this.router.navigate(['/product-details', id]);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            }
            );
    }

    productDetails() {
        this.router.navigate(['/product-details', this.id]);
    }

}
