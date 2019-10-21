import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

    productForm: FormGroup;
    prodName: string = '';
    prodDesc: string = '';
    prodPrice: number = null;
    updatedAt: Date = null;
    isLoadingResults = false;

    matcher = new MyErrorStateMatcher();

    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            'prodName': [null, Validators.required],
            'prodDesc': [null, Validators.required],
            'prodPrice': [null, Validators.required],
        });
    }

    onFormSubmit(form: NgForm) {
        this.isLoadingResults = true;
        this.api.addProduct(form)
            .subscribe(res => {
                let id = res['id'];
                this.isLoadingResults = false;
                this.router.navigate(['/product-details', id]);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
