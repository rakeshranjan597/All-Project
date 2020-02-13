package com.ustglobal.assessmentboot.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ustglobal.assessmentboot.dto.OrderInfo;
import com.ustglobal.assessmentboot.dto.ProductsInfo;
import com.ustglobal.assessmentboot.service.ProductService;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	@GetMapping(path = "/get-all-products")
	public List<ProductsInfo> getAllProducts() {
		return service.getAllProducts();
	}
	
	@PutMapping(path = "/modify-product")
	public boolean modifyProduct(@Valid @RequestBody ProductsInfo info) {
		return service.modifyProduct(info);
	}
	
	@PostMapping(path = "/add-products")
	public boolean addProduct(@Valid @RequestBody ProductsInfo info) {
		return service.addProduct(info);
	}
	
	@GetMapping(path = "/get-product-by-id/{pid}")
	public ProductsInfo searchProductById(@Valid @PathVariable("pid") int pid) {
		return service.searchProductById(pid);
	}
	
	@PostMapping(path = "/add-to-cart")
	public boolean addToCart(@Valid @RequestBody ProductsInfo info) {
		return service.addToCart(info);
	}
	
	@GetMapping(path = "/get-from-cart")
	public List<OrderInfo> getFromCart() {
		return service.getFromCart();
	}
	
	
}
