package com.ustglobal.lms.dao;

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
public class LibrarianDAOImpl implements LibrarianDAO {

	@PersistenceUnit
	private EntityManagerFactory factory;
	
	@Override
	public boolean addBook(BookBean bean) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			manager.persist(bean);
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
	public boolean updateBook(BookBean bean) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			BookBean bookBean = manager.find(BookBean.class, bean.getBid());
			bookBean.setBname(bean.getBname());
			bookBean.setBauthor(bean.getBauthor());
			bookBean.setBcost(bean.getBcost());
			bookBean.setBquantity(bean.getBquantity());
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
	public LibrarianBean loginLibrarian(int lid, String lpassword) {
		String jpql = "from LibrarianBean where lid=:lid and lpassword=:lpassword";
		EntityManager manager = factory.createEntityManager();
		TypedQuery<LibrarianBean> query = manager.createQuery(jpql, LibrarianBean.class);
		query.setParameter("lid", lid);
		query.setParameter("lpassword", lpassword);
		try {
			LibrarianBean bean = query.getSingleResult();
			return bean;
		} catch (Exception e) {
			e.printStackTrace();			
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<TransactionBean> getAllReceivedRequestedBook() {
		String jpql = "from TransactionBean where status=0";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public int actionOnRequestedBook(int tid, int sValue, int bid) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			TransactionBean bean = manager.find(TransactionBean.class, tid);
			bean.setStatus(sValue);
			
			if (sValue == 1) {
				BookBean bookBean = manager.find(BookBean.class, bid);
				int bquantity = bookBean.getBquantity();
				if(bquantity < 1 ) {
					return 0;
				}
				bookBean.setBquantity(bquantity-1);				
			}
			transaction.commit();
			return sValue;
		} catch (Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return 0;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<TransactionBean> getAllApprovedRejectedBook() {
		String jpql = "from TransactionBean where status=-1 or status=1";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<TransactionBean> getAllStudentsApprovedBook() {
		String jpql = "from TransactionBean where status=1";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<TransactionBean> getAllBookReturnedDetails() {
		String jpql = "from TransactionBean where status=2";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

	@Override
	public List<StudentBean> getAllStudentsDetails() {
		String jpql = "from StudentBean";
		EntityManager manger = factory.createEntityManager();
		try {
			TypedQuery<StudentBean> query = manger.createQuery(jpql, StudentBean.class);
			List<StudentBean> bean = query.getResultList();
			return bean;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<TransactionBean> getAllBookTransactionDetails() {
		String jpql = "from TransactionBean";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<TransactionBean> query = manager.createQuery(jpql, TransactionBean.class);
			List<TransactionBean> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			manager.close();
		}
	}

//	@Override
//	public List<StudentBean> getAllReceivedRequestedBook(int lid) {
//		EntityManager manager = factory.createEntityManager();
//		String jpql = "from StudentBean where lid=:lid";
//		try {
//			TypedQuery<StudentBean> query = manager.createQuery(jpql, StudentBean.class);
//			query.setParameter("lid", lid);
//			List<StudentBean> beans = query.getResultList();
//			return beans;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}

}
