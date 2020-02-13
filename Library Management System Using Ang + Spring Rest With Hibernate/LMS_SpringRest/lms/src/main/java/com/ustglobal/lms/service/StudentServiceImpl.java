package com.ustglobal.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ustglobal.lms.dao.StudentDAO;
import com.ustglobal.lms.dto.BookBean;
import com.ustglobal.lms.dto.StudentBean;
import com.ustglobal.lms.dto.TransactionBean;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentDAO dao;
	
	@Override
	public int registerStudent(StudentBean bean) {
		return dao.registerStudent(bean);
	}

	@Override
	public StudentBean loginStudent(int sid, String spassword) {
		return dao.loginStudent(sid, spassword);
	}

	@Override
	public boolean changePasswordStudent(int sid, String spassword) {
		return dao.changePasswordStudent(sid, spassword);
	}

	@Override
	public BookBean searchBookByName(String bname) {
		return dao.searchBookByName(bname);
	}

	@Override
	public BookBean searchBookById(int bid) {
		return dao.searchBookById(bid);
	}

	@Override
	public boolean deleteProfileStudent(int sid) {
		return dao.deleteProfileStudent(sid);
	}

	@Override
	public List<BookBean> getAllBook() {
		return dao.getAllBook();
	}

	@Override
	public int requestBook(int sid, int bid) {
		return dao.requestBook(sid, bid);
	}

	@Override
	public List<BookBean> getAllRequestedBook(int sid) {
		return dao.getAllRequestedBook(sid);
	}

	@Override
	public int returnBook(int tid, int sid, int bid) {
		return dao.returnBook(tid, sid, bid);
	}

	@Override
	public List<TransactionBean> getAllRequestedBooks(int sid) {
		return dao.getAllRequestedBooks(sid);
	}

}
