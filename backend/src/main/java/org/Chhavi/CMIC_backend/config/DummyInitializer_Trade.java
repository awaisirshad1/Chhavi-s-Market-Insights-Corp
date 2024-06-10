package org.Chhavi.CMIC_backend.config;

import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.List;

@Configuration // Indicates that this class contains Spring configuration
public class DummyInitializer_Trade {

    /*
     * Bean that initializes the database with sample users.
     */
    @Bean
    CommandLineRunner initDatabase(TradeRepository tradeRepository) {
        return args -> {
            // Create a list of sample users
            var trades = List.of(
                    new Trade("Awais",25, 100, new Date(), "AMZN"),
                    new Trade("Calvyn", 200, 100, new Date(), "NVDA")
            );
            // Save all users to the database
            tradeRepository.saveAll(trades);
        };
    }
}

