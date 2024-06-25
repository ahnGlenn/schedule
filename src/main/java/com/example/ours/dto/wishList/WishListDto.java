package com.example.ours.dto.wishList;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "our_wishlist")  // 실제 데이터베이스 테이블 이름으로 명시
public class WishListDto {

    /*
      @GeneratedValue(strategy = GenerationType.IDENTITY) :
      데이터베이스의 AUTO_INCREMENT 설정과 연동되어, 새로운 엔티티가 저장될 때마다 자동으로 증가된 ID 값을 할당합니다.
    */
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "latitude", nullable = false)
    private String latitude;

    @Column(name = "longitude", nullable = false)
    private String longitude;

    private String phoneNumber;
    private String website;
    private float rating;
    private int totalRating;
    private String category;
    private String memo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @PrePersist/* 엔티티가 저장되기 전에 호출. 여기서는 생성일과 수정일을 모두 현재 시간으로 설정 */
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate/* 엔티티가 업데이트되기 전에 호출. 여기서는 수정일만 현재 시간으로 설정 */
    protected void onUpdate() {
        updatedAt = new Date();
    }

}
