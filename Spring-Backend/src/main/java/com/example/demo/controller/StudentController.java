package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@RestController
@RequestMapping("/api/v1/")
public class StudentController {
	
	@Autowired
	private StudentRepository studentRepository;
	
	@GetMapping
    public String test() {
        return "Only logged-in users can see this";
    }
	
	//get all students rest API
	@GetMapping("/students")
	public List<Student> getAllStudents(){
		return studentRepository.findAll();
	}
	
	//create student REST API
	@PostMapping("/students")
	public Student createStudent( @RequestBody Student student) {
		return studentRepository.save(student);
	}
	
	// get employee by id rest api
		@GetMapping("/students/{id}")
		public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
			Student student = studentRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
			return ResponseEntity.ok(student);
		}
		
		// update employee rest api
		
		@PutMapping("/students/{id}")
		public ResponseEntity<Student> updateEmployee(@PathVariable("id") Long id, @RequestBody Student studentDetails){
			Student student = studentRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Student not exist with id :" + id));
			
			student.setFirstName(studentDetails.getFirstName());
			student.setLastName(studentDetails.getLastName());
			student.setEmailId(studentDetails.getEmailId());
			
			Student updatedStudent = studentRepository.save(student);
			return ResponseEntity.ok(updatedStudent);
		}
		
		//delete student REST API
		@DeleteMapping("/students/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable("id") Long id){
			Student student = studentRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Student with given id not found"));
			
			studentRepository.delete(student);
			Map<String, Boolean> res = new HashMap<>();
			res.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(res);
		}
		
}
