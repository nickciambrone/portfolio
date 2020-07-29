import pymysql
# Open connection to the database
db = pymysql.connect("localhost","root","password","stockMarket")
# Start a cursor object using cursor() method
cursor = db.cursor()
# find the tickers and all closing prices of all stocks exchanged in 2019
q1 = cursor.execute("SELECT DISTINCT bs.ticker, p.close "
                    "FROM buyNsell bs, price p "
                    "WHERE bs.ticker = p.ticker && bs.date BETWEEN '2018-12-31' AND '2020-01-01';")
print("Q1",cursor.fetchall())
# Find all tickers (i.e. for all dates) whose closing price is both higher than ‘IBM’ on
# ‘3/20/2019’ and no higher than ‘GOOG’ on ‘3/20/2019’.
q2 = cursor.execute("SELECT DISTINCT pb.ticker "
                    "FROM  price p, price pa, price pb "
                    "WHERE ((p.ticker =  'GOOG' && p.date = '2019-3-20') && "
                    "(pa.ticker = 'IBM' && pa.date = '2019-3-20') && "
                    "(pb.ticker != 'IBM' && pb.ticker != 'GOOG' && pb.date = '2019-3-20') && "
                    "(pb.close <= p.close && pb.close > pa.close));")
print("Q2",cursor.fetchall())
# Find the tickers of all stocks that closed at the highest price on ‘3/20/2019’.
# (we are asking for “all stocks” since there may be more than one with the same “highest price”)
q3 = cursor.execute("SELECT DISTINCT p.ticker "
                    "FROM price p "
                    "WHERE p.ticker NOT IN ( "
                    "SELECT DISTINCT pa.ticker "
                    "FROM price p, price pa "
                    "WHERE p.date = '2019-3-20' && pa.date = '2019-3-20' && pa.close<p.close);")
print("Q3",cursor.fetchall())
# Find the tickers of all stocks in ‘NYSE’ whose closing price on ‘3/20/2019’ was either
# strictly below $20 or strictly above $100
q4 = cursor.execute("SELECT DISTINCT p.ticker "
                    "FROM price p "
                    "WHERE p.date = '2019-3-20' && (p.close<20 OR p.close>100) && p.ticker IN ("
                    "SELECT DISTINCT s.ticker "
                    "FROM stock s "
                    "WHERE (s.exchange = 'NYSE')"
                    ");")
print("Q4",cursor.fetchall())
# Find all tickers in ‘NYSE’ of the stocks whose closing price showed the highest increase
# between ‘3/20/2019’ and ‘3/21/2019’ in ‘NYSE’ and whose closing price was (in ‘NYSE’)
# strictly above $100 for the entire 2019
q5 = cursor.execute("SELECT DISTINCT s.ticker "
                    "FROM stock s "
                    "WHERE s.ticker NOT IN ("
                        "SELECT DISTINCT r.ticker "
                        "FROM price p, price q, price r, price s "
                        "WHERE p.date = '2019-3-20' && q.date = '2019-3-21' && "
                        "p.ticker = q.ticker && r.date = '2019-3-20' && s.date = '2019-3-21' &&  r.ticker = s.ticker  "
                        "&&  p.ticker != r.ticker && q.close-p.close>s.close-r.close)"
                        " && s.ticker NOT IN ("
                            "SELECT DISTINCT p.ticker "
                            "FROM price p "
                            "WHERE p.date BETWEEN '2018-12-31' AND '2020-01-01' && p.close<=100) && s.ticker IN ("
                                "SELECT DISTINCT s.ticker "
                                "FROM stock s "
                                "WHERE s.exchange = 'NYSE')")
print("Q5",cursor.fetchall())
# Find the dates where the total price of ‘AAPL’ the firm
# sold was higher than what the firm bought in ‘NASDAQ’.
q6 = cursor.execute("SELECT DISTINCT buy.date FROM "
                    "(SELECT b.date, SUM(b.value * b.num_of_shares) AS total "
                    "FROM buyNsell b, stock s "
                    "WHERE s.ticker = b.ticker AND s.exchange = 'NASDAQ' AND b.buy_or_sell = 'BUY' "
                    "GROUP BY b.date) AS buy, "
                    "(SELECT b.date, SUM(b.value * b.num_of_shares) AS total "
                    "FROM buyNsell b "
                    "WHERE b.buy_or_sell = 'SELL' AND b.ticker = 'AAPL' "
                    "GROUP BY b.date) AS sell "
                    "WHERE buy.date = sell.date AND sell.total > buy.total;")
# disconnect from server
db.close()