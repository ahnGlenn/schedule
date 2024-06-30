package com.example.ours.repository;

import com.example.ours.dto.schedule.ScheduleDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleDto, Long> {

    /**
     * memo : 일정 리스트 조회
     * @return
     */
    @Query("SELECT sd FROM ScheduleDto sd WHERE sd.delYn != 'Y'")
    List<ScheduleDto> findScheduleDtoBy();


    /**
     * memo : 삭제가 아닌 삭제여부 Flag값 변경을 위함.
     * @param id
     * @param delYn
     * @return
     */
    @Modifying
    @Transactional
    @Query("UPDATE ScheduleDto SET delYn = :delYn WHERE id = :id AND userId = :userId")
    int updateDelYn(@Param("id") Long id, @Param("userId") String userId, @Param("delYn") String delYn);


}