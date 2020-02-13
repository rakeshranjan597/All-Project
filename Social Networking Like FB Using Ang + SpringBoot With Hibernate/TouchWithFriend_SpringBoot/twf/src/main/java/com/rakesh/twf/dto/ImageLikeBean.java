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
@Table(name = "image_like")
public class ImageLikeBean {
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int ilid;

	@Column
	private int iid;
	
	@Column
	private int uid;
	
	@Column
	private String likeTime;
	
	@Column
	private String userName;
}
