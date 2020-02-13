package com.ustglobal.assessmentboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ustglobal.assessmentboot.dao.ProductDAO;
import com.ustglobal.assessmentboot.dto.OrderInfo;
import com.ustglobal.assessmentboot.dto.ProductsInfo;

@Service
public class ProductserviceImpl implements ProductService{

	@Autowired
	private ProductDAO dao;
	
	@Override
	public List<ProductsInfo> getAllProducts() {
		return dao.getAllProducts();
	}

	@Override
	public ProductsInfo searchProductById(int pid) {
		return dao.searchProductById(pid);
	}

	@Override
	public boolean modifyProduct(ProductsInfo info) {
		return dao.modifyProduct(info);
	}

	@Override
	public boolean addProduct(ProductsInfo info) {
		return dao.addProduct(info);
	}

	@Override
	public boolean addToCart(ProductsInfo info) {
		return dao.addToCart(info);
	}

	@Override
	public List<OrderInfo> getFromCart() {
		return dao.getFromCart();
	}

}
