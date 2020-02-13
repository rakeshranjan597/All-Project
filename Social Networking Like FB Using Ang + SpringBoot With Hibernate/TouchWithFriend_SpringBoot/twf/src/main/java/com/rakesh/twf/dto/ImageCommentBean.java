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
@Table(name = "image_comment")
public class ImageCommentBean {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int icid;

	@Column
	private int iid;
	
	@Column
	private int uid;
	
	@Column
	private String commentTime;
	
	@Column
	private String userName;
}
