package com.ustglobal.lms.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "student")
public class StudentBean {
	@Id
	@Column
	@GeneratedValue
	private int sid;
	@Column
	private String sname;
	@Column
	private String spassword;
	@Column
	private String sgender;
	@Column(unique = true)
	private String semail;
	@Column(unique = true)
	private int sregisterNo;
	@Column
	private String sbranch;
	@Column
	private int lid;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "student_book", joinColumns = @JoinColumn(name="sid"), inverseJoinColumns = @JoinColumn(name="bid"))
	private List<BookBean> bookBeans;
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name = "lid", nullable = false)
//	private LibrarianBean librarianBean;
	
}
