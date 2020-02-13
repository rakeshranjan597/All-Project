package com.ustglobal.lms.dao;

import java.util.List;

import com.ustglobal.lms.dto.BookBean;
import com.ustglobal.lms.dto.StudentBean;
import com.ustglobal.lms.dto.TransactionBean;

public interface StudentDAO {
	
	public int registerStudent(StudentBean bean);
	public StudentBean loginStudent(int sid, String spassword);
	public boolean changePasswordStudent(int sid, String spassword);
	public BookBean searchBookByName(String bname);
	public BookBean searchBookById(int bid);
	public boolean deleteProfileStudent(int sid);
	public List<BookBean> getAllBook();
	public int requestBook(int sid, int bid);
	public List<BookBean> getAllRequestedBook(int sid);
	public List<TransactionBean> getAllRequestedBooks(int sid);
	public int returnBook(int tid, int sid, int bid);
	
}
