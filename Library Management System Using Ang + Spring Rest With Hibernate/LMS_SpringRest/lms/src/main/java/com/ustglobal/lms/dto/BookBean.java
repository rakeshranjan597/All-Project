package com.ustglobal.lms.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.ToString.Exclude;

@Data
@Entity
@Table(name = "book")
public class BookBean {
	@Id
	@Column
//	@SequenceGenerator(name = "mysequence", initialValue = 5000)
//	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mysequence")
	@GeneratedValue
	private int bid;
	@Column
	private String bname;
	@Column
	private String bauthor;
	@Column
	private int bcost;
	@Column
	private int bquantity;
	
	@Exclude
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL, mappedBy = "bookBeans")
	private List<StudentBean> studentBeans;
}
