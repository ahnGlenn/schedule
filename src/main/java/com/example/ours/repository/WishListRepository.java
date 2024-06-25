package com.example.ours.repository;

import com.example.ours.dto.wishList.WishListDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishListDto, Long> {

}