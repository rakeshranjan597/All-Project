package com.ustglobal.assessmentboot.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString.Exclude;

@Data
@Entity
@Table(name = "products_info")
public class ProductsInfo {
	@Id
	@Column
	@GeneratedValue
	private int pid;
	@Column
	@NotNull(message = "Name can't be empty")
	private String name;
	@Column
	@NotNull(message = "category name can't be empty")
	private String category;
	@Column
	@NotNull(message = "company name can't be empty")
	private String company;
	@Column
	@NotNull(message = "Integers length can't be greater than 3")
	private int quantity;
	@Column
	@NotNull(message = "Integers length can't be greater thaan 4")
	private double price;
	
	@Exclude
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "productInfo")
	private List<OrderInfo> orderInfo;
	
}
