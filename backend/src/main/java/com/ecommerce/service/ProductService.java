package com.ecommerce.service;

import com.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> searchProducts(String query, Pageable pageable);
    Page<Product> getProductsByCategory(Long categoryId, Pageable pageable);
    Product getProductById(Long id);
    Product createProduct(Product product);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
    List<Product> getProductsByIds(List<Long> ids);
} 