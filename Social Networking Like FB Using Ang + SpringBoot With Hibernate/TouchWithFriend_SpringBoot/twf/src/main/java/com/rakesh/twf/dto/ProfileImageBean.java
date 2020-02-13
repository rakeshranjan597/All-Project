package com.rakesh.twf.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "images")
public class ProfileImageBean {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int iid;

	@Column
	private int uid;
	
	@Column
	private String uname;

	@Column
	private String imageName;
	
	@Column
	private String imageType;
	
	@Column
	private String uploadTime;
	
	@Column
	private int imageLikes;

	@Column
	private int imageComments;
	
	@Column
	private String imageStatus;
	
	@Column
	private String caption;
	
	@Column
	@Lob
	private byte[] imageBytes;
	
}
