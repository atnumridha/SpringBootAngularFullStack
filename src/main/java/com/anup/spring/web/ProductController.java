package com.anup.spring.web;

import java.util.Date;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.anup.spring.custom.exception.ResourceNotFoundException;
import com.anup.spring.helper.LoginStatus;
import com.anup.spring.model.Product;
import com.anup.spring.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/products")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@PostConstruct
	public void init() {
		productRepository.save(new Product("Apple", "Apple 11", 60000, new Date()));
	}

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Iterable<Product>> getProduct() {
		return ResponseEntity.ok(productRepository.findAll());
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable("id") Integer id) {
		return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
	}

	@DeleteMapping(path = { "/{id}" })
	public ResponseEntity<Product> delete(@PathVariable("id") int id) {
		Product entity = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

		if (entity.getId() == null) {
			ResponseEntity.badRequest().build();
		}

		productRepository.deleteById(id);

		return ResponseEntity.ok(entity);
	}

	@PostMapping
	public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
		productRepository.save(product);
		return ResponseEntity.ok(product);
	}

	@PutMapping(path = { "/{id}" })
	public ResponseEntity<Product> update(@PathVariable("id") Integer id, @Valid @RequestBody Product product) {
		Product updatedProd = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

		if (updatedProd.getId() == null) {
			ResponseEntity.badRequest().build();
		} else {

			updatedProd.setProdName(product.getProdName());
			updatedProd.setProdDesc(product.getProdDesc());
			updatedProd.setProdPrice(product.getProdPrice());
			updatedProd.setUpdatedAt(product.getUpdatedAt());
			productRepository.save(updatedProd);
		}

		return ResponseEntity.ok(updatedProd);
	}

	@GetMapping(produces = "application/json")
	@RequestMapping({ "/validateLogin" })
	public LoginStatus validateLogin() {
		return new LoginStatus("User successfully authenticated");
	}

}
