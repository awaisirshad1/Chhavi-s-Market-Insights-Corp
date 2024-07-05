package org.Chhavi.CMIC_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter @Setter
    private String ticker;
    @Getter @Setter
    private Date date;
    @Getter @Setter
    private Double open;
    @Getter @Setter
    private Double high;
    @Getter @Setter
    private Double low;
    @Getter @Setter
    private Double close;
    @Getter @Setter
    private Double adjClose;
    @Getter @Setter
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
