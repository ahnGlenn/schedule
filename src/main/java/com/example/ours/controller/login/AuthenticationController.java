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


    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")/* axios > post를 받기위해서(@RequestBody) */
    public ResponseEntity<?> createToken(@RequestBody AuthenticationRequest request) {
        try{
            request.setPassword(passwordEncoder.encode(request.getPassword()));

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            String token = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new AuthenticationResponse(token));

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

//    @GetMapping("/login")
//    public String login(HttpServletResponse response){
//        String results = "";
//        try{
//            System.out.println("test!!!!");
////            jpaQueryFactory = new JPAQueryFactory(em);
////            QloginDto qloginDto = QloginDto.loginDto;
////
////            loginDto loginUser = jpaQueryFactory
////                    .select(qloginDto)
////                    .from(qloginDto)
////                    .where(qloginDto.email.eq(params.getEmail())
////                            .and(qloginDto.password.eq(params.getPassword())))
////                    .fetchOne();
//
////            if (loginUser != null) {
////                // 아이디와 패스워드가 일치하는 사용자가 존재하면 로그인 성공
////                // 여기에서 세션을 설정하거나 토큰을 발급하여 클라이언트에게 전달할 수 있음
////                // (세션 또는 토큰을 사용하여 로그인 상태를 유지하는 것은 보안적으로 권장됩니다)
////
////                results = ">>>>>>>>>>>>>>>>>>>>>>> LOGIN_SUCCESS";
////            } else {
////                results = ">>>>>>>>>>>>>>>>>>>>>>> LOGIN_FAILURE";
////            }
//            results = "LOGIN_SUCCESS";
//        }catch (Exception e){
//            e.getStackTrace();
//        }
//
//        return results;
//    }

}

