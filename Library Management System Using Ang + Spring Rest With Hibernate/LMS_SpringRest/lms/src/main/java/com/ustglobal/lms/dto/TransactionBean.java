package com.ustglobal.lms.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "transaction")
public class TransactionBean {
	@Id
	@Column
	@GeneratedValue
	private int tid;
	@Column
	private int sid;
	@Column
	private int bid;
	@Column
	private int status;
	@Column
	private String issueTime;
	@Column
	private String returnTime;
	
}
