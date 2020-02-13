package com.rakesh.twf.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rakesh.twf.dao.UserDao;
import com.rakesh.twf.dto.FriendBean;
import com.rakesh.twf.dto.ImageLikeBean;
import com.rakesh.twf.dto.MessageBean;
import com.rakesh.twf.dto.ProfileImageBean;
import com.rakesh.twf.dto.UserBean;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserDao service;
	
	@PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public String userRegister(@RequestBody UserBean bean) {
		return service.userRegister(bean);
	}
	
	@PostMapping(path = "/login")
	public UserBean userLogin(@RequestBody UserBean bean) {
		String email = bean.getEmail();
		String password = bean.getPassword();
		return service.userLogin(email, password);
	}
	
	@GetMapping(path = "/get-all-users/{email}")
	public List<UserBean> getAllUsers(@PathVariable("email") String email) {
		return service.getAllUsers(email);
	}
	
	@GetMapping(path = "/send-friend-request/{from_user}/{to_user}")
	public int sendFriendRequest(@PathVariable("from_user") int from_user, 
			@PathVariable("to_user") int to_user) {
		return service.sendFriendRequest(from_user, to_user);
	}
	
	@GetMapping(path = "/accept-friend-request/{from_user}/{to_user}")
	public int acceptFriendrequest(@PathVariable("from_user") int from_user, 
			@PathVariable("to_user") int to_user) {
		return service.acceptFriendrequest(from_user, to_user);
	}
	
	@DeleteMapping(path = "/reject-friend-request/{from_user}/{to_user}")
	public int rejectFriendrequest(@PathVariable("from_user") int from_user, 
			@PathVariable("to_user") int to_user) {
		return service.rejectFriendrequest(from_user, to_user);
	}
	
	@GetMapping(path = "/get-all-friend")
	public List<FriendBean> getAllFriendBean() {
		return service.getAllFriendBean();
	}
	
	@GetMapping(path = "/get-all-sent-friend-request/{from_user}")
	public List<FriendBean> getAllSentFriendRequest(@PathVariable("from_user") int from_user) {
		return service.getAllSentFriendRequest(from_user);
	}
	
	@GetMapping(path = "/get-all-received-friend-request/{to_user}")
	public List<FriendBean> getAllReceivedFriendRequest(@PathVariable("to_user") int to_user) {
		return service.getAllReceivedFriendRequest(to_user);
	}
	
	@GetMapping(path = "/get-all-accepted-friend-request/{user_id}")
	public List<FriendBean> getAllAcceptedFriendRequest(@PathVariable("user_id") int user_id) {
		return service.getAllAcceptedFriendRequest(user_id);
	}
	
	@PostMapping(path = "/save-message")
	public int saveMessage(@RequestBody MessageBean bean) {
		return service.saveMessage(bean);
	}
	
	@GetMapping(path = "/get-user-message/{fid}")
	public List<MessageBean> getUserMessage(@PathVariable("fid") int fid) {
		return service.getUserMessage(fid);
	}
	
	@GetMapping(path = "/get-unseen-messages/{fid}/{uid}")
	public Object[] getUnseenMessages(@PathVariable("fid") int fid,
			@PathVariable("uid") int uid) {
		return service.getUnseenMessages(fid, uid);
	}
	
	@GetMapping(path = "/make-seen/{fid}/{uid}")
	public int makeSeen(@PathVariable("fid") int fid,
			@PathVariable("uid") int uid) {
		return service.makeSeen(fid, uid);
	}
	
	@GetMapping(path = "/action-on-chat/{fid}/{uid}/{status}")
	public int actionOnChat(@PathVariable("fid") int fid,
			@PathVariable("uid") int uid, @PathVariable("status") String status) {
		return service.actionOnChat(fid, uid, status);
	}
	
	@PostMapping(path = "/image-upload/{uid}/{uname}/{imageStatus}/{caption}")
	public String imageUpload(@PathVariable("uid") int uid, @PathVariable("uname") String uname,
			@PathVariable("imageStatus") String imageStatus,
			@PathVariable("caption") String caption, @RequestParam("myFile") MultipartFile file) {
		return service.imageUpload(uid, uname, imageStatus, caption, file);
	}
	
	@GetMapping(path = "/get-profile-image/{uid}")
	public ProfileImageBean getProfileImage(@PathVariable("uid") int uid) {
		return service.getProfileImage(uid);
	}
	
	@GetMapping(path = "/like-unlike-on-profile-image/{iid}/{uid}/{userName}")
	public String likeOnProfileImage(@PathVariable("iid") int iid,
			@PathVariable("uid")int uid, @PathVariable("userName") String userName) {
		return service.likeUnlikeOnProfileImage(iid, uid, userName);
	}

	@GetMapping(path = "/check-like-unlike-on-profile-image/{iid}/{uid}")
	public String checkLikeUnlikeOnProfileImage(@PathVariable("iid") int iid,
			@PathVariable("uid") int uid) {
		return service.checkLikeUnlikeOnProfileImage(iid, uid);
	}
	
	@GetMapping(path = "/get-all-user-post/{uid}/{imageStatus}")
	public List<ProfileImageBean> getAllUserPost(@PathVariable("uid") int uid,
			@PathVariable("imageStatus") String imageStatus) {
		return service.getAllUserPost(uid, imageStatus);
	}
	
	@GetMapping(path = "/get-all-photos/{uid}")
	public List<ProfileImageBean> getAllPhotos(@PathVariable("uid") int uid) {
		return service.getAllPhotos(uid);
	}

	@GetMapping(path = "/is-email-exist/{email}")
	public UserBean isEmailExist(@PathVariable("email") String email) {
		return service.isEmailExist(email);
	}
	
	@GetMapping(path = "/get-image-likes-users/{iid}")
	public List<ImageLikeBean> getImageLikesUsers(@PathVariable("iid") int iid) {
		return service.getImageLikesUsers(iid);
	}
}
