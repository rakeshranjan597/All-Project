package com.rakesh.twf.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "messages")
public class MessageBean {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int mid;
	
	@Column
	private int fid;
	
	@Column
	private int uid;
	
	@Column
	private String status;
	
	@Column
	private String sent_time;
	
	@Column
	private String message;
	
	@Column
	private String seenStatus;
	
}
