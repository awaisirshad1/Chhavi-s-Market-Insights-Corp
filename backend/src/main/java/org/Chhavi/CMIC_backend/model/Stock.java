package org.Chhavi.CMIC_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;

    private Date date;

    private Double open;

    private Double high;

    private Double low;

    private Double close;

    private Double adjClose;

    private Double volume;

    public Stock(String ticker, Date date, Double open, Double high, Double low, Double close, Double adjClose, Double volume){
        this.ticker = ticker;
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.adjClose = adjClose;
        this.volume = volume;
    }

    public Stock() {
    }
}
