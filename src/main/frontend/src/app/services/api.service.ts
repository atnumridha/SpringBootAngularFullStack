import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../product';

// let username = 'info@gmail.com';
// let password = 'password';

// let headers_object = new HttpHeaders();
// headers_object.append('Content-Type', 'application/json');
// headers_object.append("Authorization", "Basic " + btoa("username:password"));
// headers_object.append('Access-Control-Allow-Origin', '*');
// headers_object.append('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// headers_object.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
// headers_object.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

// const httpOptions = {
//     headers: headers_object
// };

let username = 'info@gmail.com';
let password = 'password';
const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

const apiUrl = "http://localhost:9090/api/v1/products";

@Injectable({
    providedIn: 'root'
})
export class ApiService {



    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {

        return this.http.get<Product[]>(apiUrl, { headers })
            .pipe(
                tap(products => console.log('Fetch products')),
                catchError(this.handleError('getProducts', []))
            );
    }

    getProduct(id: number): Observable<Product> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Product>(url, { headers }).pipe(
            tap(_ => console.log(`fetched product id=${id}`)),
            catchError(this.handleError<Product>(`getProduct id=${id}`))
        );
    }

    addProduct(product): Observable<Product> {
        return this.http.post<Product>(apiUrl, product, { headers }).pipe(
            tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<Product>('addProduct'))
        );
    }

    updateProduct(id, product): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, product, { headers }).pipe(
            tap(_ => console.log(`updated product id=${id}`)),
            catchError(this.handleError<any>('updateProduct'))
        );
    }

    deleteProduct(id): Observable<Product> {
        const url = `${apiUrl}/${id}`;

        return this.http.delete<Product>(url, { headers }).pipe(
            tap(_ => console.log(`deleted product id=${id}`)),
            catchError(this.handleError<Product>('deleteProduct'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}