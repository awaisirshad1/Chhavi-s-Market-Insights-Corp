package org.Chhavi.CMIC_backend.controller;

import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/trades")
@CrossOrigin(value = "true")
@Slf4j
public class StockDataController {

    @Autowired
    TradeRepository tradeRepository;

    @GetMapping
    public List<Trade> getAllTrades(){
        return tradeRepository.findAll();
    }


    @GetMapping(path="/{uuid}")
    public Trade getTradeById(@PathVariable(name="uuid") String param){
        Optional<Trade> result = null;
        log.info("uuid: "+param);
        UUID uuid = UUID.fromString(param);
        try{
            result = tradeRepository.findById(uuid);
            log.info(result.toString());
        }catch (Exception e){
            log.error(e.toString());
        }
        if(result.isEmpty()){
            return new Trade();
        }

        return result.get();
    }

}
