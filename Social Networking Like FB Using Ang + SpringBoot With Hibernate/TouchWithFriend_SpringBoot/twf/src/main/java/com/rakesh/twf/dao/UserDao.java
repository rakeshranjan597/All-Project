package com.rakesh.twf.dao;

import java.sql.Blob;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.rakesh.twf.dto.FriendBean;
import com.rakesh.twf.dto.ImageLikeBean;
import com.rakesh.twf.dto.MessageBean;
import com.rakesh.twf.dto.ProfileImageBean;
import com.rakesh.twf.dto.UserBean;

public interface UserDao {
	public String userRegister(UserBean bean);
	public UserBean userLogin(String email, String password);
	public List<UserBean> getAllUsers(String email);
	public int sendFriendRequest(int from_user, int to_user);
	public int acceptFriendrequest(int from_user, int to_user);
	public int rejectFriendrequest(int from_user, int to_user);
	public List<FriendBean> getAllFriendBean();
	public List<FriendBean> getAllSentFriendRequest(int from_user);
	public List<FriendBean> getAllReceivedFriendRequest(int to_user);
	public List<FriendBean> getAllAcceptedFriendRequest(int user_id);
	public int saveMessage(MessageBean bean);
	public List<MessageBean> getUserMessage(int fid);
	public Object[] getUnseenMessages(int fid, int uid);
	public int makeSeen(int fid, int uid);
	public int actionOnChat(int fid, int uid, String status);
	public String imageUpload(int uid, String uname, String imageStatus, String caption, MultipartFile file);
	public ProfileImageBean getProfileImage(int uid);
	public String likeUnlikeOnProfileImage(int iid, int uid, String userName);
	public String checkLikeUnlikeOnProfileImage(int iid, int uid);
	public List<ProfileImageBean> getAllUserPost(int uid, String imageStatus);
	public List<ProfileImageBean> getAllProfilePhotos(int uid, String imageStatus);
	public List<ProfileImageBean> getAllTimeLinePhotos(int uid, String imageStatus);
	public List<ProfileImageBean> getAllPhotos(int uid);
	public UserBean isEmailExist(String email);
	public List<ImageLikeBean> getImageLikesUsers(int iid);
}
