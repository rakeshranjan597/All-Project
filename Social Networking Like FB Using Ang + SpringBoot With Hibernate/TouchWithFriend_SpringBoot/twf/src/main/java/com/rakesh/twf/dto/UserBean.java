package com.rakesh.twf.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import net.bytebuddy.build.ToStringPlugin.Exclude;

@Data
@Entity
@Table(name = "users")
public class UserBean {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int uid;
	
	@Column
	@NotNull
	@Size(min = 6)
	private String name;
	
	@Column(unique = true)
	@NotNull
	private String email;
		
	@Column
	@NotNull
	@Size(min = 8, max = 30)
	private String password;
	
	@NotNull
	@Column(unique = true)
	private Long mobile;
	
	@NotNull
	@Column
	@Size(min =1 , max = 1)
	private String gender;
	
	@Column
	@NotNull
	private String address;
	
	@Column
	@NotNull
	private String city;
	
	@Column
	@NotNull
	private String state;
	
	@Column
	@NotNull
	private String country;
	
	@Column
	@NotNull
	private int pinCode;
		
	@JsonIgnore
	@Exclude
	@OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
	private List<FriendBean> fromFriend;
	
	@JsonIgnore
	@Exclude
	@OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
	private List<FriendBean> toFriend;

}
