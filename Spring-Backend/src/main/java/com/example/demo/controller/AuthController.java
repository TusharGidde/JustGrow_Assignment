package com.example.demo.controller;

import com.example.demo.repository.AdminRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AdminRepository adminRepository;

    private static final String SECRET =
            "myjwtsecretkeymyjwtsecretkey123456";

    public AuthController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {

        String name = request.get("name");
        String password = request.get("password");

        return adminRepository.findByName(name)
            .map(admin -> {

                if (!admin.getPassword().equals(password)) {
                    return ResponseEntity
                            .status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("error", "Invalid username or password"));
                }

                String token = Jwts.builder()
                    .setSubject(admin.getName())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 3600_000))
                    .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
                    .compact();

                return ResponseEntity.ok(Map.of("token", token));
            })
            .orElse(
                ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Admin not found"))
            );
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful");
    }
}
