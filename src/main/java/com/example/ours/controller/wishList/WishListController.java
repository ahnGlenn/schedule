package com.example.ours.controller.wishList;

import com.example.ours.dto.schedule.ScheduleDto;
import com.example.ours.dto.wishList.WishListDto;
import com.example.ours.service.ScheduleService;
import com.example.ours.service.WishListService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/wishList")
@RequiredArgsConstructor
public class WishListController {
    private static final Logger log = LoggerFactory.getLogger(WishListController.class);

    @Autowired
    private WishListService wishListService;

    /*
    *  메인페이지 시작시 모든 스케줄 리스트를 가져옴(캘린더 표출 용)
    */
    @GetMapping(value = "/list")
    public List<WishListDto> searchList(){

        log.info(">>>>>>>>>> Search WishList list >>>>>>>>>>");
        try {

            // search all schedule list
            List<WishListDto> wishList = wishListService.searchWishList();
            return wishList;

        }catch (Exception e){
            e.printStackTrace(); // 예외 출력
            return Collections.emptyList(); // 빈 리스트 반환
        }
    };

    @PostMapping(value = {"/save", "/update"})
    public String saveSchedule(HttpServletRequest request,
                               @RequestBody WishListDto wishListDto /* axios > post를 받기위해서(@RequestBody) */
    ){

        String result = "";

        try{
            String requestURI = request.getRequestURI();
            if (requestURI.endsWith("/save")) {
                log.info(">>>>>>>>>> Save WishList >>>>>>>>>>");
                wishListService.saveWishList(wishListDto);

            } else if (requestURI.endsWith("/update")) {
                log.info(">>>>>>>>>> Update WishList >>>>>>>>>>");
            }

            result = "1";
        }catch (Exception e){
            e.getStackTrace();
            result = "0";
        }

        return result;
    }

    @GetMapping("/delete")
    public String getCurrencyRate(){

        log.info(">>>>>>>>>> Delete WishList >>>>>>>>>>");



        return null;
    }
}

