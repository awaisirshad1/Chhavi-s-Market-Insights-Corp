import java.util.Date;

public class Trade {

    private String trader;
    private double amount;
    private double price;
    private Date time;
    private String ticker;

    public Trade(String trader, double amount, double price, Date time, String ticker) {
        this.trader = trader;
        this.amount = amount;
        this.price = price;
        this.time = time;
        this.ticker = ticker;
    }

    public String getTrader() {
        return trader;
    }

    public void setTrader(String trader) {
        this.trader = trader;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }
}