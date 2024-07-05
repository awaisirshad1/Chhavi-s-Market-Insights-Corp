package org.Chhavi.CMIC_backend.config;

import lombok.extern.slf4j.Slf4j;
import org.Chhavi.CMIC_backend.model.Stock;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.StockRepository;
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

@Configuration
@Slf4j
public class StockStatisticsInitializer {

    @Bean
    CommandLineRunner initStockDatabase(StockRepository stockRepository){
//        ArrayList<String> tickers = new ArrayList<>( );
//        tickers.
        return args -> {

            log.info(System.getProperty("user.dir"));
            String[] tradeList = {"AAPL", "AMD", "AMZN", "GOOG","META","MSFT","NFLX","NVDA","TSLA","UBER"};

            for (String ticker : tradeList) {
                BufferedReader reader = new BufferedReader(new FileReader(System.getProperty("user.dir")+"/data/" +
                        ticker+".csv"));
                String line = reader.readLine();
                while ((line = reader.readLine()) != null) {
                    String[] t = line.split(",");
                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    Date stockDate = df.parse(t[0]);
                    Stock stock = new Stock(ticker, stockDate, Double.valueOf(t[1]), Double.valueOf(t[2]), Double.valueOf(t[3]), Double.valueOf(t[4]), Double.valueOf(t[5]), Double.valueOf(t[6]));
                    stockRepository.save(stock);
                }
            }
        };
    }
}
