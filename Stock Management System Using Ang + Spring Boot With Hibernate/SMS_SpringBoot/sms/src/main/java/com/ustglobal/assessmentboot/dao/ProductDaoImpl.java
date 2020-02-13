package com.ustglobal.assessmentboot.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.ustglobal.assessmentboot.dto.OrderInfo;
import com.ustglobal.assessmentboot.dto.ProductsInfo;

@Repository
public class ProductDaoImpl implements ProductDAO{

	@PersistenceUnit
	private EntityManagerFactory factory;
	
	@Override
	public List<ProductsInfo> getAllProducts() {
		String jpql = "from ProductsInfo";
		EntityManager manager = factory.createEntityManager();
		try {
			TypedQuery<ProductsInfo> query = manager.createQuery(jpql, ProductsInfo.class);
			List<ProductsInfo> beans = query.getResultList();
			return beans;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public ProductsInfo searchProductById(int pid) {
		EntityManager manager = factory.createEntityManager();
		return manager.find(ProductsInfo.class, pid);
	}

	@Override
	public boolean modifyProduct(ProductsInfo info) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			ProductsInfo newInfo = manager.find(ProductsInfo.class, info.getPid());
			newInfo.setName(info.getName());
			newInfo.setCategory(info.getCategory());
			newInfo.setCompany(info.getCompany());
			newInfo.setPrice(info.getPrice());
			newInfo.setQuantity(info.getQuantity());
			transaction.commit();
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		} finally {
			manager.close();
		}
	}

	@Override
	public boolean addProduct(ProductsInfo info) {
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		transaction.begin();
		try {
			manager.persist(info);
			transaction.commit();
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		}
	}

	@Override
	public boolean addToCart(ProductsInfo info) {
		String jpql = "insert into order_history_info values(:oid, :pid)";
		OrderInfo orderInfo = new OrderInfo();
		orderInfo.setTotal_price(info.getPrice());
		orderInfo.setTotal_price_with_gst(info.getPrice()*1.2);
		EntityManager manager = factory.createEntityManager();
		EntityTransaction transaction = manager.getTransaction();
		
		transaction.begin();
		try {
			manager.persist(orderInfo);
			Query query = manager.createNativeQuery(jpql);
			query.setParameter("oid", orderInfo.getOid());
			query.setParameter("pid", info.getPid());
			query.executeUpdate();
			
			ProductsInfo pInfo = manager.find(ProductsInfo.class, info.getPid());
			pInfo.setQuantity(pInfo.getQuantity()-1);
			transaction.commit();
			return true;
			
		} catch(Exception e) {
			e.printStackTrace();
			transaction.rollback();
			return false;
		}
	}

	@Override
	public List<OrderInfo> getFromCart() {
		String jpql = "from OrderInfo";
		EntityManager manager = factory.createEntityManager();
		TypedQuery<OrderInfo> query = manager.createQuery(jpql, OrderInfo.class);
		return query.getResultList();
	}
	
}
