package com.ustglobal.lms.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import com.ustglobal.lms.dto.BookBean;
import com.ustglobal.lms.dto.LibrarianBean;
import com.ustglobal.lms.dto.StudentBean;
import com.ustglobal.lms.dto.TransactionBean;

@Repository
public class StudentDAOImpl implements StudentDAO {

	@PersistenceUnit
	private EntityManagerFactory factory;

	@Override
	public int registerStudent(StudentBean bean) {
		bean.setLid(1001);
		
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			manager.persist(bean);
			transaction.commit();
			return bean.getSid();
		} catch(Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		} finally {
			manager.close();
		}
	}

	@Override
	public StudentBean loginStudent(int sid, String spassword) {
		String jpql = "from StudentBean where sid=:sid and spassword=:spassword";
		EntityManager manager = factory.createEntityManager();
		TypedQuery<StudentBean> query = manager.createQuery(jpql, StudentBean.class);
		query.setParameter("sid", sid);
		query.setParameter("spassword", spassword);
		try {
			StudentBean bean = query.getSingleResult();
			return bean;
		} catch (Exception e) {
			e.printStackTrace();			
			return null;
		}
	}

	@Override
	public boolean changePasswordStudent(int sid, String spassword) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		StudentBean bean = manager.find(StudentBean.class, sid);
		bean.setSpassword(spassword);
		transaction.commit();
//		manager.close();
		return true;
		
	}
	

	@Override
	public BookBean searchBookByName(String bname) {
		String jpql = "from BookBean where bname=:bname";
		EntityManager manager = factory.createEntityManager();
		TypedQuery<BookBean> query = manager.createQuery(jpql, BookBean.class);
		query.setParameter("bname", bname);
		try {
			BookBean bean = query.getSingleResult();
			return bean;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public BookBean searchBookById(int bid) {
		String jpql = "from BookBean where bid=:bid";
		EntityManager manager = factory.createEntityManager();
		TypedQuery<BookBean> query = manager.createQuery(jpql, BookBean.class);
		query.setParameter("bid", bid);
		try {
			BookBean bean = query.getSingleResult();
			return bean;
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public boolean deleteProfileStudent(int sid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			StudentBean bean = manager.find(StudentBean.class, sid);
			manager.remove(bean);
			transaction.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<BookBean> getAllBook() {
		String jpql = "from BookBean";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<BookBean> query = manager.createQuery(jpql, BookBean.class);
			List<BookBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public int requestBook(int sid, int bid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		StudentBean studentBeans = manager.find(StudentBean.class, sid);
		List<BookBean> bookbeans = studentBeans.getBookBeans();
		for(BookBean b: bookbeans) {
			if (b.getBid() == bid) {
				return 0;
			}
		}
		String jpql = "insert into student_book values(:sid, :bid)";
		TransactionBean tBean = new TransactionBean();
		tBean.setSid(sid);
		tBean.setBid(bid);
		
		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yy HH:mm:ss");
	    Date dateobj = new Date(); 
		tBean.setIssueTime(df.format(dateobj));
		tBean.setStatus(0);
		
		transaction.begin();
		try {
			Query query = manager.createNativeQuery(jpql);
			query.setParameter("sid", sid);
			query.setParameter("bid", bid);
			query.executeUpdate();
			BookBean bean = manager.find(BookBean.class, bid);
			int bquantity = bean.getBquantity();
			if(bquantity < 1 ) {
				return -1;
			}
//			bean.setBquantity(bquantity-1);
			manager.persist(tBean);
			transaction.commit();
			return 1;			
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return -1;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<BookBean> getAllRequestedBook(int sid) {
		EntityManager manager = factory.createEntityManager();
		try {
			StudentBean studentBeans = manager.find(StudentBean.class, sid);
			List<BookBean> bookbeans = studentBeans.getBookBeans();			
			return bookbeans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<TransactionBean> getAllRequestedBooks(int sid) {
		EntityManager manager = factory.createEntityManager();
		String jpql = "from TransactionBean where sid=:sid and returnTime=null";
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			query.setParameter("sid", sid);
//			query.setParameter("returnTime", "NULL");
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int returnBook(int tid, int sid, int bid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		String jpql = "delete from student_book where sid=:sid and bid=:bid";
		String jpql2 = "update transaction set returnTime=:returnTime, status=2 where tid=:tid";
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
	    Date dateobj = new Date(); 
		try {
			Query query2 = manager.createNativeQuery(jpql2);
			query2.setParameter("returnTime", df.format(dateobj));
			query2.setParameter("tid", tid);
			query2.executeUpdate();
			
			Query query = manager.createNativeQuery(jpql);
			query.setParameter("sid", sid);
			query.setParameter("bid", bid);
			query.executeUpdate();
			BookBean bean = manager.find(BookBean.class, bid);
			int bquantity = bean.getBquantity();
			bean.setBquantity(bquantity+1);
			transaction.commit();
			return 1;
		} catch( Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		} finally {
			manager.close();
		}
	}
	
}
