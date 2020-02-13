package com.ustglobal.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ustglobal.lms.dto.BookBean;
import com.ustglobal.lms.dto.LibrarianBean;
import com.ustglobal.lms.dto.StudentBean;
import com.ustglobal.lms.dto.StudentResponse;
import com.ustglobal.lms.dto.TransactionBean;
import com.ustglobal.lms.service.LibrarianService;
import com.ustglobal.lms.service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {

	@Autowired
	private StudentService service;
	
	@Autowired
	private LibrarianService libService;
	
	@PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public int registerStudent(@RequestBody StudentBean bean) {
		return service.registerStudent(bean);
	}
	
	
	@PostMapping(path = "/login")
	public StudentBean loginStudent(@RequestBody StudentBean bean) {
		int sid = bean.getSid();
		String spassword = bean.getSpassword();
		return service.loginStudent(sid, spassword);
	}
	
	
	@GetMapping(path = "/get-book-by-name", produces = MediaType.APPLICATION_JSON_VALUE)
//	@GetMapping("/get-book-by-name")	
	public BookBean searchBookByName(@RequestParam("bname") String bname) {
		return  service.searchBookByName(bname);
	}
	
	
	@PostMapping(path = "/search-book-by-id", produces = MediaType.APPLICATION_JSON_VALUE)
	public BookBean searchBookById(@RequestBody BookBean bean) {
		int bid = bean.getBid();
		return service.searchBookById(bid);
	}
	
	
	@GetMapping(path = "/get-all-book", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BookBean> getAllBook() {
		return service.getAllBook();
	}

	
	@DeleteMapping(path = "/delete-student/{sid}", produces=MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteProfileStudent(@PathVariable("sid") int sid) {
		if(service.deleteProfileStudent(sid)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	@GetMapping(path = "/request-book/{sid}/{bid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public int requestBook(@PathVariable("sid") int sid, @PathVariable("bid") int bid) {
		return service.requestBook(sid, bid);
	}

	@GetMapping(path = "/get-all-requested-book/{sid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BookBean> getAllRequestedBook(@PathVariable int sid){
//		List<BookBean> bookBeans = service.getAllRequestedBook(sid);
//		if(!bookBeans.isEmpty()) {
//			return bookBeans;
//		} else {
//			return null;
//		}
		return service.getAllRequestedBook(sid);
	}
	
	
	@GetMapping(path = "/get-all-requested-books/{sid}")
	public List<TransactionBean> getAllRequestedBooks(@PathVariable("sid") int sid){
		return service.getAllRequestedBooks(sid);
	}
	
	
	@PostMapping(path = "/add-book")
	public boolean addBook(@RequestBody BookBean bean) {
		return libService.addBook(bean);
	}
	
	
	@GetMapping(path = "/return-book/{tid}/{sid}/{bid}", produces = MediaType.APPLICATION_JSON_VALUE)
	public int returnBook(@PathVariable("tid") int tid, @PathVariable("sid") int sid,
			@PathVariable("bid") int bid) {
		return service.returnBook(tid, sid, bid);
	}
	
	@PostMapping(path = "/lib-login")
	public LibrarianBean loginLibrarian(@RequestBody LibrarianBean bean) {
		int lid = bean.getLid();
		String lpassword = bean.getLpassword();
		return libService.loginLibrarian(lid, lpassword);
	}
	
	@GetMapping(path = "/get-all-received-requested-book")
	public List<TransactionBean> getAllReceivedRequestedBook() {
		return libService.getAllReceivedRequestedBook();
	}
	
	@GetMapping(path = "/action-on-requested-book/{tid}/{sValue}/{bid}")
	public int actionOnRequestedBook(@PathVariable("tid") int tid, @PathVariable("sValue") int sValue,
			@PathVariable("bid") int bid) {
		return libService.actionOnRequestedBook(tid, sValue, bid);
	}
	
	@GetMapping(path = "/get-all-approved-rejected-book")
	public List<TransactionBean> getAllApprovedRejectedBook(){
		return libService.getAllApprovedRejectedBook();
	}
	
	@GetMapping(path = "/get-book-by-id/{bid}")
	public BookBean getBookById(@PathVariable("bid") int bid) {
		return service.searchBookById(bid);
	}
	
	@PutMapping(path = "/update-book")
	public boolean updateBook(@RequestBody BookBean bean) {
		return libService.updateBook(bean);
	}
	
	@GetMapping(path = "get-all-students-approved-book")
	public List<TransactionBean> getAllStudentsApprovedBook() {
		return libService.getAllStudentsApprovedBook();
	}
	
	@GetMapping(path = "/get-all-book-returned-details")
	public List<TransactionBean> getAllBookReturnedDetails() {
		return libService.getAllBookReturnedDetails();
	}
	
	@GetMapping(path = "/get-all-students-details")
	public List<StudentBean> getAllStudentsDetails() {
		return libService.getAllStudentsDetails();
	}
	
	@GetMapping(path = "/get-all-book-transaction-details")
	public List<TransactionBean> getAllBookTransactionDetails() {
		return libService.getAllBookTransactionDetails();
	}
}
