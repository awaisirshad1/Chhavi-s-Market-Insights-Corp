package org.Chhavi.CMIC_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stats")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class StatisticController {
    @Autowired
    TradeRepository tradeRepository;

    @GetMapping("/totalValue")
    public Map<String, Double> getTradeValues(){
        Map<String, Double> traderCashFlow = new HashMap<>();
        List<Trade> trades = tradeRepository.findAll();

        for (Trade t : trades){
            double tradeValue = t.getAmount() * t.getPrice();
            traderCashFlow.put(t.getTrader(),
                    traderCashFlow.getOrDefault(t.getTrader(), 0.0)+tradeValue);
        }

        return traderCashFlow;
    }

    @GetMapping("/tradingVolumePercentage")
    public Map<String, Double> getCompanyTradingVolumePercentages(){
        Map<String, Double> map = new HashMap<>();
        List<Trade> trades = tradeRepository.findAll();
        double total = 0;
        for (Trade t: trades){
            double tradeValue = t.getAmount() * t.getPrice();
            total += tradeValue;
            map.put(t.getTicker(), map.getOrDefault(t.getTicker(), 0.0)+tradeValue);
        }
        for(Map.Entry<String, Double> entry: map.entrySet()){
            map.put(entry.getKey(), entry.getValue()/total);
        }
        return map;
    }
}
