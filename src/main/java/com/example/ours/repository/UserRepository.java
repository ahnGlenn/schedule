package com.example.ours.repository;

import com.example.ours.dto.login.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDto, Long> {

    /**
     * memo :
     *  Optional을 사용하면 코드의 안정성과 가독성을 높일 수 있습니다.
     *  이를 통해 null 값을 다루는 방식을 개선하고,
     *  null 포인터 예외를 방지할 수 있습니다.
     * @param name
     * @return
     */
    // Optional<UserDto> findByUsername(String username);
    UserDto findByUsername(String name);
    UserDto findByEmail(String email);

}