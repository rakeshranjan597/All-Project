package com.ustglobal.lms.service;

import java.util.List;

import com.ustglobal.lms.dto.BookBean;
import com.ustglobal.lms.dto.LibrarianBean;
import com.ustglobal.lms.dto.StudentBean;
import com.ustglobal.lms.dto.TransactionBean;

public interface LibrarianService {

	public boolean addBook(BookBean bean);
	public boolean updateBook(BookBean bean);
	public LibrarianBean loginLibrarian(int lid, String lpassword); 
	public List<TransactionBean> getAllReceivedRequestedBook();
	public int actionOnRequestedBook(int tid, int sValue, int bid);
	public List<TransactionBean> getAllApprovedRejectedBook();
	public List<TransactionBean> getAllStudentsApprovedBook();
	public List<TransactionBean> getAllBookReturnedDetails();
	public List<StudentBean> getAllStudentsDetails();
	public List<TransactionBean> getAllBookTransactionDetails();
	
}
