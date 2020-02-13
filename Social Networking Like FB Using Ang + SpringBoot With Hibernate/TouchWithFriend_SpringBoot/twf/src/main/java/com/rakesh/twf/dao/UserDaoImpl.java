package com.rakesh.twf.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.apache.catalina.User;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.rakesh.twf.dto.FriendBean;
import com.rakesh.twf.dto.ImageLikeBean;
import com.rakesh.twf.dto.MessageBean;
import com.rakesh.twf.dto.ProfileImageBean;
import com.rakesh.twf.dto.UserBean;

@Repository
public class UserDaoImpl implements UserDao {

	@PersistenceUnit
	private EntityManagerFactory factory;
	
	@Override
	public String userRegister(UserBean bean) {	
		String email = "from UserBean where email=:email";
		String mobile = "from UserBean where mobile=:mobile";
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			TypedQuery<UserBean> queryEmail = manager.createQuery(email, UserBean.class);
			queryEmail.setParameter("email", bean.getEmail());
			try {
				queryEmail.getSingleResult();
				return "email-exist";				
			} catch (Exception e) {
//				e.printStackTrace();
			}
			
			TypedQuery<UserBean> queryMobile = manager.createQuery(mobile, UserBean.class);
			queryMobile.setParameter("mobile", bean.getMobile());
			
			try {
				queryMobile.getSingleResult();
				return "mobile-exist";				
			} catch (Exception e) {
//				e.printStackTrace();
			}
			manager.persist(bean);
			transaction.commit();
			return "registered";
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return "failed";
		}
	}

	@Override
	public UserBean userLogin(String email, String password) {
		String emailJpql = "from UserBean where email=:email";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<UserBean> query = manager.createQuery(emailJpql, UserBean.class);
			query.setParameter("email", email);
			UserBean bean =  query.getSingleResult();
			if (bean.getPassword().equals(password)) {
				return bean;
			} else {
				UserBean wrongPassword = new UserBean();
				return wrongPassword;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<UserBean> getAllUsers(String email) {
		String jpql = "from UserBean where email!=:email";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<UserBean> query = manager.createQuery(jpql, UserBean.class);
			query.setParameter("email", email);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public int sendFriendRequest(int from_user, int to_user) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		UserBean fromUser = manager.find(UserBean.class, from_user);
		UserBean toUser = manager.find(UserBean.class, to_user);
		
		FriendBean bean = new FriendBean();
		bean.setFromUser(fromUser);
		bean.setToUser(toUser);
		bean.setStatus("add-friend");
		try {
			manager.persist(bean);
			transaction.commit();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		}
	}

	@Override
	public int acceptFriendrequest(int from_user, int to_user) {
		String jpql = "from FriendBean where from_user=:from_user and to_user=:to_user";
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();	
		try {
			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			query.setParameter("from_user", from_user);
			query.setParameter("to_user", to_user);
			FriendBean bean = query.getSingleResult();
			bean.setStatus("request-accepted");
			transaction.commit();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		}
	}

	@Override
	public int rejectFriendrequest(int from_user, int to_user) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		String jpql = "delete from FriendBean where from_user=:from_user and to_user=:to_user";
		try {
			Query query = manager.createQuery(jpql);
//			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			query.setParameter("from_user", from_user);
			query.setParameter("to_user", to_user);
			query.executeUpdate();
			transaction.commit();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		}
	}

	@Override
	public List<FriendBean> getAllFriendBean() {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from FriendBean";
		try {
			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<FriendBean> getAllSentFriendRequest(int from_user) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from FriendBean where from_user=:from_user";
		try {
			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			query.setParameter("from_user", from_user);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<FriendBean> getAllReceivedFriendRequest(int to_user) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from FriendBean where to_user=:to_user";
		try {
			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			query.setParameter("to_user", to_user);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<FriendBean> getAllAcceptedFriendRequest(int user_id) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from FriendBean where to_user=:user_id or from_user=:user_id";
		try {
			TypedQuery<FriendBean> query = manager.createQuery(jpql, FriendBean.class);
			query.setParameter("user_id", user_id);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveMessage(MessageBean bean) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy hh.mm aa");
	    String date = df.format(new Date()).toString(); 
		bean.setStatus("normal");
		bean.setSeenStatus("un-seen");
		bean.setSent_time(date);
		try {
			manager.persist(bean);
			transaction.commit();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		}
	}

	@Override
	public List<MessageBean> getUserMessage(int fid) {
		String jpql = "from MessageBean where fid=:fid and status='normal'";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<MessageBean> query = manager.createQuery(jpql, MessageBean.class);
			query.setParameter("fid", fid);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Object[] getUnseenMessages(int fid, int uid) {
		String countMessage = "from MessageBean where fid=:fid and uid=:uid and seenStatus='un-seen'";
		String lastMessage = "from MessageBean where fid=:fid order by mid desc";
		EntityManager manager = factory.createEntityManager();
		Object obj[] = new Object[4];
		try {
			TypedQuery<MessageBean> query = manager.createQuery(countMessage, MessageBean.class);
			query.setParameter("fid", fid);
			query.setParameter("uid", uid);
			int size = query.getResultList().size();
			try {
				TypedQuery<MessageBean> query2 = manager.createQuery(lastMessage, MessageBean.class);
				query2.setParameter("fid", fid);
				MessageBean bean = query2.getResultList().get(0);
				obj[0] = size;
				obj[1] = bean.getMessage();
				obj[2] = bean.getUid();
				obj[3] = bean.getSent_time();
				return obj;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int makeSeen(int fid, int uid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		String jpql = "update MessageBean set seenStatus='seen' where fid=:fid and uid=:uid and seenStatus='un-seen' ";
		try {
			Query query = manager.createQuery(jpql);
			query.setParameter("fid", fid);
			query.setParameter("uid", uid);
			int count = query.executeUpdate();
			transaction.commit();
			return count;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		}
	}

	@Override
	public int actionOnChat(int fid, int uid, String status) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		String backUpJpql = "update MessageBean set status='normal' where fid=:fid and uid=:uid";
		String deleteJpql = "update MessageBean set status='deleted' where fid=:fid and uid=:uid";
		String permanentDeleteJpql = "delete from MessageBean where fid=:fid and uid=:uid";
		transaction.begin();
		try {
			if (status.equals("delete")) {
				Query query = manager.createQuery(deleteJpql);
				query.setParameter("fid", fid);
				query.setParameter("uid", uid);
				int count = query.executeUpdate();
				transaction.commit();
				return count;
			} else if (status.equals("backUp")) {
				Query query = manager.createQuery(backUpJpql);
				query.setParameter("fid", fid);
				query.setParameter("uid", uid);
				int count = query.executeUpdate();
				transaction.commit();
				return count;
			} else if (status.equals("permanentDelete")) {
				Query query = manager.createQuery(permanentDeleteJpql);
				query.setParameter("fid", fid);
				query.setParameter("uid", uid);
				int count = query.executeUpdate();
				transaction.commit();
				return count;
			}
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
		}
		return 0;
	}

	@Override
	public String imageUpload(int uid, String uname, String imageStatus, String caption, MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy hh.mm aa");
	    String date = df.format(new Date()).toString();
	    
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		ProfileImageBean bean = new ProfileImageBean();
		try {
			bean.setUid(uid);
			bean.setUname(uname);
			bean.setImageName(fileName);
			bean.setImageType(file.getContentType());
			bean.setUploadTime(date);
			bean.setImageBytes(file.getBytes());
			bean.setImageLikes(0);
			bean.setImageComments(0);
			bean.setImageStatus(imageStatus);
			bean.setCaption(caption);
			manager.persist(bean);
			transaction.commit();
			return "upload";
			
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return "failed";
		}
	}

	@Override
	public ProfileImageBean getProfileImage(int uid) {
		String jpql = "from ProfileImageBean where uid=:uid and imageStatus='profile' order by iid desc";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<ProfileImageBean> query = manager.createQuery(jpql, ProfileImageBean.class);
			query.setParameter("uid", uid);
			ProfileImageBean bean = query.getResultList().get(0);
			if (bean != null) {
				return bean;
			} else {
				return null;
			}
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public String likeUnlikeOnProfileImage(int iid, int uid, String userName) {
		String check = "from ImageLikeBean where iid=:iid and uid=:uid";
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		
		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy hh.mm aa");
	    String likeTime = df.format(new Date()).toString();
	    
		try {
			TypedQuery<ImageLikeBean> query = manager.createQuery(check, ImageLikeBean.class);
			query.setParameter("iid", iid);
			query.setParameter("uid", uid);
			int size = query.getResultList().size();
			if (size != 0) {
				manager.remove(query.getSingleResult());
				ProfileImageBean imageBean = manager.find(ProfileImageBean.class, iid);
				imageBean.setImageLikes(imageBean.getImageLikes() - 1);
				transaction.commit();
				return "unlike";
			} else {
				ImageLikeBean bean = new ImageLikeBean();
				bean.setIid(iid);
				bean.setUid(uid);
				bean.setUserName(userName);
				bean.setLikeTime(likeTime);
				manager.persist(bean);
				ProfileImageBean imageBean = manager.find(ProfileImageBean.class, iid);
				imageBean.setImageLikes(imageBean.getImageLikes() + 1);
				transaction.commit();
				return "like";
			}
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return "failed";
		}
	}

	@Override
	public String checkLikeUnlikeOnProfileImage(int iid, int uid) {
		EntityManager manager = factory.createEntityManager();
		String check = "from ImageLikeBean where iid=:iid and uid=:uid";
		try {
			TypedQuery<ImageLikeBean> query = manager.createQuery(check, ImageLikeBean.class);
			query.setParameter("iid", iid);
			query.setParameter("uid", uid);
			int size = query.getResultList().size();
			if (size != 0) {
				return "likeAvailable";
			} else {
				return "likeNotAvailable";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}
	}

	@Override
	public List<ProfileImageBean> getAllUserPost(int uid, String imageStatus) {
		System.out.println("uid " + uid);
		String jpql = "from ProfileImageBean where uid=:uid and imageStatus=:imageStatus";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<ProfileImageBean> query = manager.createQuery(jpql, ProfileImageBean.class);
			query.setParameter("uid", uid);
			query.setParameter("imageStatus", imageStatus);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ProfileImageBean> getAllProfilePhotos(int uid, String imageStatus) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from ProfileImageBean where uid=:uid and imageStatus=:imageStatus";
		try {
			TypedQuery<ProfileImageBean> query = manager.createQuery(jpql, ProfileImageBean.class);
			query.setParameter("uid", uid);
			query.setParameter("imageStatus", imageStatus);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ProfileImageBean> getAllTimeLinePhotos(int uid, String imageStatus) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from ProfileImageBean where uid=:uid and imageStatus=:imageStatus";
		try {
			TypedQuery<ProfileImageBean> query = manager.createQuery(jpql, ProfileImageBean.class);
			query.setParameter("uid", uid);
			query.setParameter("imageStatus", imageStatus);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ProfileImageBean> getAllPhotos(int uid) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from ProfileImageBean where uid=:uid";
		try {
			TypedQuery<ProfileImageBean> query = manager.createQuery(jpql, ProfileImageBean.class);
			query.setParameter("uid", uid);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public UserBean isEmailExist(String email) {
		EntityManager manager = factory.createEntityManager();
		String isEmail = "from UserBean where email=:email";
		try {
			TypedQuery<UserBean> query = manager.createQuery(isEmail, UserBean.class);
			query.setParameter("email", email);
			return query.getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ImageLikeBean> getImageLikesUsers(int iid) {
		EntityManager manager = factory.createEntityManager();
		String jqpl = "from ImageLikeBean where iid=:iid";
		try {
			TypedQuery<ImageLikeBean> query = manager.createQuery(jqpl, ImageLikeBean.class);
			query.setParameter("iid", iid);
			return query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	

}
