package com.ustglobal.mail.bean;

import java.util.List;

public class MailResponse {

	private int status_code;
	
	private String message;
	
	private List<UserBean> userBean;
	
	private List<MailBean> mailBean;

	public int getStatus_code() {
		return status_code;
	}

	public void setStatus_code(int status_code) {
		this.status_code = status_code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public List<UserBean> getUserBean() {
		return userBean;
	}

	public void setUserBean(List<UserBean> userBean) {
		this.userBean = userBean;
	}

	public List<MailBean> getMailBean() {
		return mailBean;
	}

	public void setMailBean(List<MailBean> mailBean) {
		this.mailBean = mailBean;
	}
}
