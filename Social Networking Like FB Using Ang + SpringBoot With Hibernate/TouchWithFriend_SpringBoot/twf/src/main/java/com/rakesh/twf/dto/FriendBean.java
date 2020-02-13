package com.rakesh.twf.dto;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "friends")
public class FriendBean {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int fid;
	
	@Column
	private String status;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "from_user", nullable = false)
	private UserBean fromUser;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "to_user", nullable = false)
	private UserBean toUser;

}
