package com.example.ours.util;

import com.example.ours.dto.login.UserDto;
import com.example.ours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * spring security는 기본적으로 loadUserByUsername를 호출한다.
     * @param email the username identifying the user whose data is required.
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDto userDto = userRepository.findByEmail(email);
        if (userDto == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(userDto.getUsername(), userDto.getPassword(), new ArrayList<>());
    }

    /**
     * 커스텀 사용
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    public UserDetails loadUserByUserName2(String username) throws UsernameNotFoundException {
        UserDto userDto = userRepository.findByUsername(username);
        if (userDto == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(userDto.getUsername(), userDto.getPassword(), new ArrayList<>());
    }
}
