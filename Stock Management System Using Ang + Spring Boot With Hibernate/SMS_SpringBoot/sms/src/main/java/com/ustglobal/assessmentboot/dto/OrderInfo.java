package com.ustglobal.assessmentboot.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
@Table(name = "order_info")
public class OrderInfo {
	@Id
	@Column
	@GeneratedValue
	private int oid;
	@Column
	@NotNull(message = "should not be empty")
	private double total_price;
	@Column
	@NotNull(message = "should not be empty")
	private double total_price_with_gst;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "order_history_info", joinColumns = @JoinColumn(name="oid"), inverseJoinColumns = @JoinColumn(name="pid"))
	private List<ProductsInfo> productInfo;
	
	
}
