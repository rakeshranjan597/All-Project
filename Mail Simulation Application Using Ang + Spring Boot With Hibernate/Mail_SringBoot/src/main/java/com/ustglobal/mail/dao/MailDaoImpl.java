package com.ustglobal.mail.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.w3c.dom.ls.LSInput;

import com.ustglobal.mail.bean.MailBean;
import com.ustglobal.mail.bean.UserBean;

@Repository
public class MailDaoImpl implements MailDAO {

	@PersistenceUnit
	private EntityManagerFactory factory;
	@Override
	public boolean userRegister(UserBean bean) {
		EntityManager manager=factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			manager.persist(bean);
			transaction.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	
	@Override
	public UserBean login(String email, String password) {
		EntityManager manager=factory.createEntityManager();
		EntityTransaction transaction=manager.getTransaction();
		String jpql="from UserBean where email=:email and password=:password";
		try {
			TypedQuery<UserBean> query=manager.createQuery(jpql, UserBean.class);
			query.setParameter("email", email);
			query.setParameter("password", password);
			UserBean bean=query.getSingleResult();
			return bean;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<MailBean> getAllMail(int from_id) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		String jpql = "from MailBean where from_id=:from_id";
		try {
			TypedQuery<MailBean> query = manager.createQuery(jpql, MailBean.class);
			query.setParameter("from_id", from_id);
			List<MailBean> mails=query.getResultList();
			return mails;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public boolean sendMail(String subject, String msg, int to_id, int from_id) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		UserBean to = manager.find(UserBean.class, to_id);

		UserBean from = manager.find(UserBean.class, from_id);

		MailBean bean = new MailBean();
		bean.setUser(from);
		bean.setUserBean(to);
		bean.setStatus("sent");
		bean.setMessage(msg);
		bean.setSubject(subject);
		transaction.begin();
		try {
			manager.persist(bean);
			transaction.commit();
			return true;
		} catch( Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		}
	}

	@Override
	public boolean deleteMail(int mid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			MailBean mailBean=manager.find(MailBean.class, mid);
			mailBean.setStatus("deleted");
			transaction.commit();
			return true;
		} catch( Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		}
	}

	@Override
	public boolean draftMail(String subject, String msg, UserBean to, UserBean from) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		MailBean bean = new MailBean();
		bean.setUser(from);
		bean.setUserBean(to);
		bean.setStatus("drafted");
		bean.setMessage(msg);
		bean.setSubject(subject);
		transaction.begin();
		try {
			manager.persist(bean);
			transaction.commit();
			return true;
		} catch( Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		}
	}


	@Override
	public UserBean searchByEmail(String email) {
		EntityManager manager = factory.createEntityManager();
		String jpql="from UserBean where email=:email";
		try {
			TypedQuery<UserBean> query = manager.createQuery(jpql, UserBean.class);
			query.setParameter("email", email);
			UserBean bean = query.getSingleResult();
			return bean;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public boolean changePassword(String email, String password) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		String jpql="from UserBean where email=:email";
		transaction.begin();
		try {
			TypedQuery<UserBean> query=manager.createQuery(jpql,UserBean.class);
			query.setParameter("email", email);
			UserBean bean=query.getSingleResult();
			bean.setPassword(password);
			transaction.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
