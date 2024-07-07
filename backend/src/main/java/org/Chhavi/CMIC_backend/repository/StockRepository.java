package org.Chhavi.CMIC_backend.repository;

import org.Chhavi.CMIC_backend.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
