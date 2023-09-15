package com.iliamalafeev.mybookstore.mybookstore_backend.repositories;

import com.iliamalafeev.mybookstore.mybookstore_backend.entities.HistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRecordRepository extends JpaRepository<HistoryRecord, Long> {
}
