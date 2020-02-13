package com.ustglobal.lms.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "lib")
public class LibrarianBean {
	@Id
	@Column
	@GeneratedValue
	private int lid;
	@Column
	private String lname;
	@Column
	private String lpassword;
	@Column
	private String lemail;
	
}
