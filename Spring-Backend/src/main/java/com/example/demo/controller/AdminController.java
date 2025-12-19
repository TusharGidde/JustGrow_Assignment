package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;

@RestController
@RequestMapping("/api/v1/")
public class AdminController {
	
	@Autowired
	private AdminRepository adminRepository;
	
	@PostMapping("/admin")
	public Admin createAdmin(@RequestBody Admin admin) {
		return adminRepository.save(admin);
	}
	
}
