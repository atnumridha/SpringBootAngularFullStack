package com.anup.spring.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.anup.spring.model.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

}
