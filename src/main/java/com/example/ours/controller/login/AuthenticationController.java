package com.example.ours.controller.login;

import com.example.ours.dto.login.AuthenticationRequest;
import com.example.ours.dto.login.AuthenticationResponse;
import com.example.ours.util.JwtUtil;
import com.example.ours.util.MyUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MyUserDetailsService userDetailsService;

    @PostMapping("/login")/* axios > post를 받기위해서(@RequestBody) */
    public ResponseEntity<?> createToken(@RequestBody AuthenticationRequest request) {
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            // jwt token 생성
            String token = jwtUtil.generateToken(userDetails.getUsername());

            // 성공적인 응답을 반환
            return ResponseEntity.ok(new AuthenticationResponse(token));

        }catch (BadCredentialsException e) {
            // 자격 증명이 잘못된 경우 401 응답을 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }catch (Exception e){
            // 기타 예외가 발생한 경우 500 응답을 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

}