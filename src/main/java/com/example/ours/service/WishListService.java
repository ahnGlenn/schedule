package com.example.ours.service;

import com.example.ours.dto.wishList.WishListDto;
import com.example.ours.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class WishListService {

    @Autowired
    private WishListRepository wishListRepository;

    // search schedule
    public List<WishListDto> searchWishList() {
        return wishListRepository.findAll();
    }

    // save schedule
    public WishListDto saveWishList(WishListDto wishListDto) { return wishListRepository.save(wishListDto); }
}