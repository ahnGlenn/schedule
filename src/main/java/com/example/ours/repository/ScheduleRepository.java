package com.example.ours.repository;

import com.example.ours.dto.schedule.ScheduleDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleDto, Long> {

}