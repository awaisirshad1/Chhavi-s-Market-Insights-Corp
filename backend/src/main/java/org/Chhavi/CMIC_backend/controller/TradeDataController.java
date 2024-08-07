package org.Chhavi.CMIC_backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.Chhavi.CMIC_backend.model.Trade;
import org.Chhavi.CMIC_backend.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trades")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class TradeDataController {

    @Autowired
    TradeRepository tradeRepository;

    @GetMapping
    public List<Trade> getAllTrades(){
        return tradeRepository.findAll();
    }


    @GetMapping(path="/{id}")
    public Trade getTradeById(@PathVariable(name="id") Long id){
        Optional<Trade> result = null;
        log.info("id: "+id);
//        Long id = Long (param);
        try{
            result = tradeRepository.findById(id);
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
