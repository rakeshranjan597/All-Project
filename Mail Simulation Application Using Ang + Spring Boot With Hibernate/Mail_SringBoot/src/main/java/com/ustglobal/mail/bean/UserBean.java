package com.ustglobal.mail.bean;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.fasterxml.jackson.annotation.JsonIgnore;

import net.bytebuddy.build.ToStringPlugin.Exclude;

@Entity
@Table(name = "user_info")
public class UserBean {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column
	private String user_name;
	@Column(unique = true)
	private String email;
	@Column
	private String password;
	@JsonIgnore
	@Exclude
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	private List<MailBean> mails;
	
	@JsonIgnore
	@Exclude
	@OneToMany(mappedBy = "userBean",cascade = CascadeType.ALL)
	private List<MailBean> mailBean;

	public List<MailBean> getMails() {
		return mails;
	}
	public void setMails(List<MailBean> mails) {
		this.mails = mails;
	}
	public List<MailBean> getMailBean() {
		return mailBean;
	}
	public void setMailBean(List<MailBean> mailBean) {
		this.mailBean = mailBean;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
