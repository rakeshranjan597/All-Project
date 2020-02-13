package com.ustglobal.mail.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "mail_info")
public class MailBean {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int mid;
	@Column
	private String subject;
	@Column
	private String message;
	@Column
	private String status;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "from_id", nullable = false)
	private UserBean user;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "to_id", nullable = false)


	private UserBean userBean;
	public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public UserBean getUser() {
		return user;
	}
	public void setUser(UserBean user) {
		this.user = user;
	}
	public UserBean getUserBean() {
		return userBean;
	}
	public void setUserBean(UserBean userBean) {
		this.userBean = userBean;
	}
}
