package com.ustglobal.mail.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mysql.fabric.xmlrpc.base.Array;
import com.ustglobal.mail.bean.MailBean;
import com.ustglobal.mail.bean.MailResponse;
import com.ustglobal.mail.bean.UserBean;
import com.ustglobal.mail.service.MailService;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "true")
@RestController
public class MailController {

	@Autowired
	private MailService service;
	
	final private int success_code=201;
	final private int fail_code=401;
	@PutMapping(path = "/register",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse userRegister(@RequestBody UserBean bean) {
		MailResponse response=new MailResponse();
		if(service.userRegister(bean)){
			response.setStatus_code(success_code);
			response.setMessage("success");
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
	
	@PutMapping(path = "/login/{email}/{password}",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse login(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		MailResponse response=new MailResponse();
		UserBean bean=service.login(email, password);
		if(bean!=null){
			response.setStatus_code(success_code);
			response.setMessage("success");
			response.setUserBean(Arrays.asList(bean));
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
	
	@GetMapping(path = "get-all/{from_id}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse getAll(@PathVariable("from_id") int from_id) {
		MailResponse response=new MailResponse();
		List<MailBean> bean=service.getAllMail(from_id);
		if(bean!=null){
			response.setStatus_code(success_code);
			response.setMessage("success");
			response.setMailBean(bean);;
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
	
	@GetMapping(path = "search/{email}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse getByEmial(@PathVariable("email")String email) {
		MailResponse response=new MailResponse();
		UserBean bean=service.searchByEmail(email);
		if(bean!=null){
			response.setStatus_code(success_code);
			response.setMessage("success");
			response.setUserBean(Arrays.asList(bean));;
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
	
	@GetMapping(path = "/compose/{subject}/{msg}/{to_id}/{from_id}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse composeEmail(@PathVariable("subject") String subject,
			@PathVariable("msg") String msg,
			@PathVariable("to_id") int to_id,
			@PathVariable("from_id") int from_id) {
		MailResponse response=new MailResponse();
		
		if(service.sendMail(subject, msg, to_id, from_id)){
			response.setStatus_code(success_code);
			response.setMessage("success");
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}

	@DeleteMapping(path = "/delete/{mid}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse deleteEmail(@PathVariable("mid") int mid) {
		MailResponse response=new MailResponse();
		if(service.deleteMail(mid)){
			response.setStatus_code(success_code);
			response.setMessage("success");
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
	
	@GetMapping(path = "/changePassword/{email}/{password}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public MailResponse changePassword(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		MailResponse response=new MailResponse();
		if(service.changePassword(email, password)){
			response.setStatus_code(success_code);
			response.setMessage("success");
			return response;
		} else {
			response.setStatus_code(fail_code);
			response.setMessage("failed");
			return response;
		}
	}
}
