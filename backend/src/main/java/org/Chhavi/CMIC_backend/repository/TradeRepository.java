package org.Chhavi.CMIC_backend.repository;

import org.Chhavi.CMIC_backend.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TradeRepository extends JpaRepository<Trade, UUID> {

}
