package org.Chhavi.CMIC_backend.config;

import lombok.extern.slf4j.Slf4j;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Arrays;

@Configuration // Indicates that this class contains Spring configuration
@Slf4j
public class DummyInitializer_Trade {

    /*
     * Bean that initializes the database with sample users.
     */
    @Bean
    CommandLineRunner initDatabase(TradeRepository tradeRepository) {
        return args -> {
            // Create a list of sample users
            BufferedReader reader = new BufferedReader(new FileReader(System.getProperty("user.dir")+"/backend/src/main/java/org" +
                    "/Chhavi/CMIC_backend/config/stock_trading.csv"));
            log.info(System.getProperty("user.dir"));
            List<Trade> tradeList = new ArrayList<>();


            String line = reader.readLine();
            while ((line = reader.readLine()) != null) {
                String[] t = line.split(" ");
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
                Date stockDate = df.parse(t[3]);
                Trade trade = new Trade(t[0], Double.parseDouble(t[1]), Double.parseDouble(t[2]),
                        stockDate, t[4]);
                tradeList.add(trade);

            }

            // Save all users to the database
            tradeRepository.saveAll(tradeList);
        };
    }
}

