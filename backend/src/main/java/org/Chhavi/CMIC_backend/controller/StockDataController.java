package org.Chhavi.CMIC_backend.controller;

import jakarta.websocket.server.PathParam;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/trades")
@CrossOrigin(value = "true")
public class StockDataController {

    @Autowired
    TradeRepository tradeRepository;

    @GetMapping
    public List<Trade> getAllTrades(){
        return tradeRepository.findAll();
    }


//    @GetMapping("/{id}")
//    public Trade getTradeById(@PathParam("id") Long id){
//
//    }

}
