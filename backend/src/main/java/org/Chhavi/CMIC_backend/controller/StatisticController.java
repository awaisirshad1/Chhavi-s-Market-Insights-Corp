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
@CrossOrigin(value = "true")
@Slf4j
public class StatisticController {
    @Autowired
    TradeRepository tradeRepository;

    @GetMapping("/percent-of-total")
    public Map<String, Double> percentOfTotalTrades(){
        Map<String, Double> map = new HashMap<>();
        List<Trade> trades = tradeRepository.findAll();
        double total = 0;
        for (Trade t: trades){
            total += t.getAmount();
            map.put(t.getTicker(), map.getOrDefault(t.getTicker(), 0.0)+t.getAmount());
        }
        for(Map.Entry<String, Double> entry: map.entrySet()){
            map.put(entry.getKey(), entry.getValue()/total);
        }
        return map;
    }
}
