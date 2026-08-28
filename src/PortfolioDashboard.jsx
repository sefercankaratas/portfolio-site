import React, { useState, useMemo, useEffect } from 'react';

const RAW_DATA = {"OCAK":{"report_date":"31.01.2026","sheet_name":"OCAK","display_name":"Ocak","summary":[{"category":"📈 Hisse Senetleri","value_try":242539.92,"pct":0.23700579729294632,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":348772.79,"pct":0.34081471276165726,"platform":"İş B./Midas","comment":"44 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":404516.33,"pct":0.3952863318733946,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":4683.06,"pct":0.004576204894727042,"platform":"Midas","comment":"0.00136 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22838.05755,"pct":0.02231695317727466,"platform":"Midas","comment":"$636.22","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1023350.1575500001,"stocks":[{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":3.0,"avg_cost":1464.0,"pnl":1065.0,"market_value_try":5457.0,"price":1819.0,"sector":"Havacılık","platform":"Midas","pct":0.0053324856206252895},{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1039.91,"market_value_try":5096.0,"price":637.0,"sector":"Perakende","platform":"Midas","pct":0.004979722690618742},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":842.0,"avg_cost":41.18,"pnl":3635.46,"market_value_try":38311.0,"price":45.5,"sector":"Cam/Sanayi","platform":"Midas","pct":0.037436843799115896},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1886.8,"market_value_try":14709.96,"price":28.18,"sector":"Metal","platform":"Midas","pct":0.014374317423487847},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3580.35,"market_value_try":15809.7,"price":104.7,"sector":"Enerji","platform":"Midas","pct":0.015448964250760425},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":188.8,"market_value_try":1982.4,"price":165.20000000000002,"sector":"Teknoloji","platform":"Midas","pct":0.00193716684887806},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":708.22,"market_value_try":3411.0,"price":113.7,"sector":"Otomotiv","platform":"Midas","pct":0.0033331699563776546},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":1520.0,"market_value_try":14220.0,"price":592.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.01389553702131054},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":139.69,"market_value_try":2637.04,"price":11.08,"sector":"Kimya","platform":"Midas","pct":0.0025768696868267754},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":727.0,"avg_cost":40.75,"pnl":5311.2,"market_value_try":34939.62,"price":48.06,"sector":"Finans","platform":"Midas","pct":0.034142389818602126},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-471.9,"market_value_try":5347.76,"price":8.24,"sector":"Tüketim El.","platform":"Midas","pct":0.005225738189949624},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1667.72,"market_value_try":6670.92,"price":48.34,"sector":"Perakende","platform":"Midas","pct":0.006518707160773622},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":6430.67,"market_value_try":29620.8,"price":244.79999999999998,"sector":"Enerji","platform":"Midas","pct":0.028944931294010916},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1376.6,"market_value_try":7518.0,"price":268.5,"sector":"Gıda","platform":"Midas","pct":0.00734645902434688},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":7786.24,"market_value_try":29510.8,"price":28.24,"sector":"GYO","platform":"Midas","pct":0.028837441204535238},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1285.65,"market_value_try":5520.0,"price":18.4,"sector":"Lojistik","platform":"Midas","pct":0.005394048126415906},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2243.29,"market_value_try":7436.6,"price":97.85000000000001,"sector":"İnşaat","platform":"Midas","pct":0.007266916358134878},{"code":"GWIND","name":"Galata Wind Enerji","qty":542.0,"avg_cost":23.81,"pnl":1433.94,"market_value_try":14341.32,"price":26.46,"sector":"Enerji","platform":"Midas","pct":0.014014088818175898}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.75,"market_value_try":0.78,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.6,"market_value_try":16.07,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":8.9,"market_value_try":3.11,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.253364,"market_value_try":441.86,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.7509,"market_value_try":2908.23,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.520564,"market_value_try":40329.91,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.362994,"market_value_try":623.62,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.837205,"market_value_try":1462.59,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":42.801473,"market_value_try":1540.85,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109303,"market_value_try":3956.54,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.78284,"market_value_try":33635.5,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.66356,"market_value_try":1299.95,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.503996,"market_value_try":800.84,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.453591,"market_value_try":867.71,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.339385,"market_value_try":12659.06,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.048913,"market_value_try":770.53,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.35428,"market_value_try":2898.15,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":11.859715,"market_value_try":296.49,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":20.364492,"market_value_try":30567.1,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":22.47312,"market_value_try":67868.82,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.286104,"market_value_try":997.75,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.786615,"market_value_try":23458.51,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.904758,"market_value_try":5754.66,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.007838,"market_value_try":1662.18,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.120744,"market_value_try":1058.88,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.330335,"market_value_try":1394.36,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.980347,"market_value_try":870.26,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.928804,"market_value_try":3874.03,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":11.05174,"market_value_try":70996.37,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.433541,"market_value_try":2385.24,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.572499,"market_value_try":4580.59,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.242956,"market_value_try":956.07,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.507965,"market_value_try":313.95,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.428073,"market_value_try":1775.65,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.731223,"market_value_try":622.71,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.772969,"market_value_try":1993.76,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.223967,"market_value_try":976.32,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.196915,"market_value_try":2598.95,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.281124,"market_value_try":11540.36,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.613126,"market_value_try":1495.36,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.704933,"market_value_try":1430.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.988368,"market_value_try":1045.88,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.6162142857142854,"market_value_try":1098.81,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.713364055299539,"market_value_try":2944.0,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":302419.51,"profit_try":108418.31,"profit_pct":0.5588538112135388},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":102096.82,"profit_try":36602.02,"profit_pct":0.5588538326706852}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":404516.33,"profit_try":145020.33000000002,"profit_pct":0.5588538166291581},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.00136,"avg_cost":3426584.6,"current_price":3443426.47,"currency":"TRY","total_value_try":4683.06,"profit_pct":0.004915060491497922},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":636.2209,"currency":"USD","total_value_try":22838.05755,"profit_pct":0.005968749679381197}],"usd_try_rate":"43,155"},"ŞUBAT":{"report_date":"28.02.2026","sheet_name":"ŞUBAT","display_name":"Şubat","summary":[{"category":"📈 Hisse Senetleri","value_try":248757.71,"pct":0.2378835984391547,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":311339.82,"pct":0.29773001495711915,"platform":"İş B./Midas","comment":"45 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":443219.79,"pct":0.4238450279376123,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":19502.38,"pct":0.018649859465774153,"platform":"Midas","comment":"0.0066223 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":22892.20125,"pct":0.021891499200339618,"platform":"Midas","comment":"$631.04","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1045711.9012500001,"stocks":[{"code":"MGROS","name":"Migros Ticaret","qty":8.0,"avg_cost":507.01,"pnl":1107.91,"market_value_try":5164.0,"price":645.5,"sector":"Perakende","platform":"Midas","pct":0.0049382626264721395},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":4225.36,"market_value_try":17048.52,"price":32.660000000000004,"sector":"Metal","platform":"Midas","pct":0.016303266683319675},{"code":"ENJSA","name":"Enerjisa Enerji","qty":151.0,"avg_cost":80.99,"pnl":3988.05,"market_value_try":16217.4,"price":107.39999999999999,"sector":"Enerji","platform":"Midas","pct":0.015508477985776389},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-132.8,"market_value_try":1660.8,"price":138.4,"sector":"Teknoloji","platform":"Midas","pct":0.0015882003427662528},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":90.09,"pnl":774.22,"market_value_try":3477.0,"price":115.9,"sector":"Otomotiv","platform":"Midas","pct":0.0033250075817667754},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-436.0,"market_value_try":12264.0,"price":511.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.011727895594704553},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":238.0,"avg_cost":10.49,"pnl":-74.51,"market_value_try":2422.84,"price":10.180000000000001,"sector":"Kimya","platform":"Midas","pct":0.002316928780387637},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-595.21,"market_value_try":5224.45,"price":8.049999999999999,"sector":"Tüketim El.","platform":"Midas","pct":0.00499607013533547},{"code":"MAVI","name":"Mavi Giyim","qty":138.0,"avg_cost":36.26,"pnl":1262.0,"market_value_try":6265.2,"price":45.4,"sector":"Perakende","platform":"Midas","pct":0.005991325136981651},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":121.0,"avg_cost":191.65,"pnl":3248.37,"market_value_try":26438.5,"price":218.5,"sector":"Enerji","platform":"Midas","pct":0.02528277622966376},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":28.0,"avg_cost":219.34,"pnl":1145.6,"market_value_try":7287.0,"price":260.25,"sector":"Gıda","platform":"Midas","pct":0.006968458512606987},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1045.0,"avg_cost":20.79,"pnl":12091.64,"market_value_try":33816.2,"price":32.36,"sector":"GYO","platform":"Midas","pct":0.03233796991272408},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":300.0,"avg_cost":14.11,"pnl":1762.65,"market_value_try":5997.0,"price":19.99,"sector":"Lojistik","platform":"Midas","pct":0.0057348491423225055},{"code":"ENKAI","name":"Enka İnşaat","qty":76.0,"avg_cost":68.33,"pnl":2535.89,"market_value_try":7729.2,"price":101.7,"sector":"İnşaat","platform":"Midas","pct":0.007391328329304504},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":852.0,"avg_cost":41.22,"pnl":3099.78,"market_value_try":38220.72,"price":44.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03654995219458874},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":737.0,"avg_cost":40.85,"pnl":5385.9,"market_value_try":35493.92,"price":48.16,"sector":"Finans","platform":"Midas","pct":0.033942350620254066},{"code":"GWIND","name":"Galata Wind Enerji","qty":592.0,"avg_cost":23.97,"pnl":1128.78,"market_value_try":15320.96,"price":25.88,"sector":"Enerji","platform":"Midas","pct":0.014651224664925366},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":5.0,"avg_cost":1581.8,"pnl":801.0,"market_value_try":8710.0,"price":1742.0,"sector":"Havacılık","platform":"Midas","pct":0.008329253965254132}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":19.29,"market_value_try":15.81,"platform":"İş Bankası"},{"code":"EMPAE","name":"Eski","qty":20.0,"unit_price":26.62,"market_value_try":532.4,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.0,"market_value_try":3.15,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.23998,"market_value_try":418.52,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.702852,"market_value_try":2722.14,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.55089,"market_value_try":41134.25,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":62.797823,"market_value_try":627.97,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.797108,"market_value_try":1392.54,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":43.068422,"market_value_try":1550.46,"platform":"İş Bankası"},{"code":"AES","name":"AK PORTFÖY PETROL Y","qty":36198.0,"unit_price":0.109062,"market_value_try":3947.82,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.766966,"market_value_try":32953.46,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":86.911041,"market_value_try":1303.66,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.514781,"market_value_try":817.98,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.467315,"market_value_try":893.97,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.347019,"market_value_try":12943.8,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":71.303401,"market_value_try":784.33,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.26815,"market_value_try":2887.9,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":11.620747,"market_value_try":290.51,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":18.982548,"market_value_try":28492.8,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":16.447097,"market_value_try":49670.23,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":10.235278,"market_value_try":992.82,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.564561,"market_value_try":22926.25,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.889487,"market_value_try":5745.79,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":11.18709,"market_value_try":1689.25,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.867715,"market_value_try":1015.11,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.352894,"market_value_try":1401.63,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.976564,"market_value_try":869.15,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.009102,"market_value_try":3937.15,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":8.289025,"market_value_try":53248.69,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.656503,"market_value_try":2505.19,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.583667,"market_value_try":4589.77,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":7.169568,"market_value_try":946.38,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.458925,"market_value_try":311.15,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.269817,"market_value_try":1712.19,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.77606,"market_value_try":632.94,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.857156,"market_value_try":2054.29,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.219328,"market_value_try":974.28,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.221339,"market_value_try":2627.84,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.308035,"market_value_try":11782.77,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.621643,"market_value_try":1503.26,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.618598,"market_value_try":1358.0,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.852533,"market_value_try":974.43,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3876904761904765,"market_value_try":1002.83,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.9071244239631335,"market_value_try":3154.23,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":43.75,"cost_try":194001.2,"current_value_try":331354.51,"profit_try":137353.31,"profit_pct":0.7080023731811967},{"type":"Bilezik","qty":2,"total_gram":14.770000000000003,"cost_try":65494.8,"current_value_try":111865.28,"profit_try":46370.48,"profit_pct":0.7080024673714554}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":443219.79,"profit_try":183723.78999999998,"profit_pct":0.7080023969540955},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0066223,"avg_cost":2990297.82,"current_price":2944955.68,"currency":"TRY","total_value_try":19502.38,"profit_pct":-0.015163084976352688},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83180224,"avg_cost":632.45,"current_price":631.0394,"currency":"USD","total_value_try":22892.20125,"profit_pct":-0.0022240245620624203}],"usd_try_rate":"43,6125"},"MART":{"report_date":"31.03.2026","sheet_name":"MART","display_name":"Mart","summary":[{"category":"📈 Hisse Senetleri","value_try":280393.89,"pct":0.27652148539976396,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":273167.85,"pct":0.2693952412638517,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":407569,"pct":0.40194023230283793,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":30887.01,"pct":0.030460442218471176,"platform":"Midas","comment":"0.0101907 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":21986.24175,"pct":0.02168259881507513,"platform":"Midas","comment":"$597.55","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1014003.99175,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":1907.68,"market_value_try":14730.84,"price":28.22,"sector":"Metal","platform":"Midas","pct":0.014527398432206419},{"code":"LOGO","name":"Logo Yazılım","qty":12.0,"avg_cost":149.47,"pnl":-212.0,"market_value_try":1581.6,"price":131.79999999999998,"sector":"Teknoloji","platform":"Midas","pct":0.0015597571734115414},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2032.0,"market_value_try":10668.0,"price":444.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.010520668643117301},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1302.62,"market_value_try":4517.04,"price":6.96,"sector":"Tüketim El.","platform":"Midas","pct":0.004454657019845011},{"code":"MGROS","name":"Migros Ticaret","qty":12.0,"avg_cost":528.51,"pnl":887.91,"market_value_try":7230.0,"price":602.5,"sector":"Perakende","platform":"Midas","pct":0.007130149445982198},{"code":"GWIND","name":"Galata Wind Enerji","qty":640.0,"avg_cost":23.98,"pnl":3338.06,"market_value_try":18688.0,"price":29.2,"sector":"Enerji","platform":"Midas","pct":0.01842990772427598},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":6.0,"avg_cost":1596.5,"pnl":759.0,"market_value_try":10338.0,"price":1723.0,"sector":"Havacılık","platform":"Midas","pct":0.010195226137284089},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":419.91,"market_value_try":3033.0,"price":101.1,"sector":"Otomotiv","platform":"Midas","pct":0.0029911124854307062},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":3.0,"avg_cost":433.0,"pnl":-22.5,"market_value_try":1276.5,"price":425.5,"sector":"Sağlık","platform":"Midas","pct":0.0012588707839275622},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":2350.3,"market_value_try":37558.92,"price":43.98,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03704020921572471},{"code":"MAVI","name":"Mavi Giyim","qty":208.0,"avg_cost":37.93,"pnl":867.0,"market_value_try":8756.8,"price":42.099999999999994,"sector":"Perakende","platform":"Midas","pct":0.008635863439637194},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":357.0,"avg_cost":10.29,"pnl":193.22,"market_value_try":3866.31,"price":10.83,"sector":"Kimya","platform":"Midas","pct":0.0038129139840242642},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":561.7,"market_value_try":8924.4,"price":241.2,"sector":"Gıda","platform":"Midas","pct":0.008801148785024},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":83.58,"pnl":5039.75,"market_value_try":18663.5,"price":114.5,"sector":"Enerji","platform":"Midas","pct":0.01840574608369139},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":12.8,"market_value_try":228.2,"price":228.2,"sector":"Sigorta","platform":"Midas","pct":0.0002250484237307244},{"code":"ENKAI","name":"Enka İnşaat","qty":229.0,"avg_cost":84.44,"pnl":2062.44,"market_value_try":21400.05,"price":93.45,"sector":"İnşaat","platform":"Midas","pct":0.021104502718048593},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":842.0,"avg_cost":41.26,"pnl":1596.9,"market_value_try":36340.72,"price":43.160000000000004,"sector":"Finans","platform":"Midas","pct":0.03583883327449436},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":129.0,"avg_cost":187.54,"pnl":9121.67,"market_value_try":33314.25,"price":258.25,"sector":"Enerji","platform":"Midas","pct":0.0328541606059215},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":350.0,"avg_cost":14.82,"pnl":1226.15,"market_value_try":6412.0,"price":18.32,"sector":"Lojistik","platform":"Midas","pct":0.006323446507280478},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1124.0,"avg_cost":21.47,"pnl":8738.42,"market_value_try":32865.76,"price":29.240000000000002,"sector":"GYO","platform":"Midas","pct":0.032411864516705934}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.43,"market_value_try":0.69,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":17.92,"market_value_try":14.69,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.18,"market_value_try":3.21,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.271171,"market_value_try":472.92,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.618217,"market_value_try":2394.35,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.400549,"market_value_try":37146.76,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":56.854271,"market_value_try":568.54,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.69791,"market_value_try":1219.24,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":40.784615,"market_value_try":1468.24,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.703763,"market_value_try":30237.88,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":85.4671,"market_value_try":1282.0,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.490749,"market_value_try":779.8,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.443196,"market_value_try":847.83,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.33684,"market_value_try":12564.13,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":70.571276,"market_value_try":776.28,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":21.999799,"market_value_try":2617.97,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":10.39584,"market_value_try":259.89,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.081345,"market_value_try":25639.09,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":13.292517,"market_value_try":40143.4,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":9.779682,"market_value_try":948.62,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":9.01243,"market_value_try":21602.79,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":9.220554,"market_value_try":5357.14,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":10.668019,"market_value_try":1610.87,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":5.564992,"market_value_try":962.74,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.015842,"market_value_try":1293.1,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":2.792296,"market_value_try":815.35,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":4.642392,"market_value_try":3648.92,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":6.914117,"market_value_try":44416.28,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.356868,"market_value_try":2343.99,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.116143,"market_value_try":4205.46,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":6.767442,"market_value_try":893.3,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":4.984453,"market_value_try":284.11,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":3.892351,"market_value_try":1560.83,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":2.571417,"market_value_try":586.28,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":2.560299,"market_value_try":1840.85,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.050812,"market_value_try":900.3,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.057075,"market_value_try":2433.51,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.251985,"market_value_try":11277.88,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.535299,"market_value_try":1423.22,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.585743,"market_value_try":1330.43,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.72339,"market_value_try":906.5,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.2715714285714284,"market_value_try":954.06,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":2.888857142857143,"market_value_try":3134.41,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":282300,"profit_try":132476,"profit_pct":0.884210807347288},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":125269,"profit_try":15597,"profit_pct":0.14221496826902}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":407569,"profit_try":148073,"profit_pct":0.570617658846379},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0101907,"avg_cost":2986867.58,"current_price":3030901.7,"currency":"TRY","total_value_try":30887.01,"profit_pct":0.014742576734946765},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":597.5535,"currency":"USD","total_value_try":21986.24175,"profit_pct":-0.055033331237371995}],"usd_try_rate":"44,1225"},"NİSAN":{"report_date":"30.04.2026","sheet_name":"NİSAN","display_name":"Nisan","summary":[{"category":"📈 Hisse Senetleri","value_try":330316.92,"pct":0.3063783011672502,"platform":"Midas","comment":"20 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":295741.34,"pct":0.27430847119223,"platform":"İş B./Midas","comment":"43 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":392001,"pct":0.363592032875165,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":35443.22,"pct":0.03287459065523227,"platform":"Midas","comment":"0.0102686 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":24631.704900000004,"pct":0.022846604110122588,"platform":"Midas","comment":"$660.58","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1078134.1849,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":5509.48,"market_value_try":18332.64,"price":35.12,"sector":"Metal","platform":"Midas","pct":0.017004042963075512},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2044.0,"market_value_try":10656.0,"price":444.0,"sector":"Tarım Mak.","platform":"Midas","pct":0.009883741884122128},{"code":"VESBE","name":"Vestel Beyaz Eşya","qty":649.0,"avg_cost":8.97,"pnl":-1198.78,"market_value_try":4620.88,"price":7.12,"sector":"Tüketim El.","platform":"Midas","pct":0.004285997109375212},{"code":"FROTO","name":"Ford Otomotiv","qty":30.0,"avg_cost":87.1,"pnl":326.91,"market_value_try":2940.0,"price":98.0,"sector":"Otomotiv","platform":"Midas","pct":0.0027269332901012624},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":854.0,"avg_cost":41.23,"pnl":5663.82,"market_value_try":40872.44,"price":47.86,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03791034601485253},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":37.0,"avg_cost":226.02,"pnl":1590.3,"market_value_try":9953.0,"price":269.0,"sector":"Gıda","platform":"Midas","pct":0.009231689468155738},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":1.0,"avg_cost":215.4,"pnl":25.5,"market_value_try":240.9,"price":240.9,"sector":"Sigorta","platform":"Midas","pct":0.00022344157468890958},{"code":"GWIND","name":"Galata Wind Enerji","qty":740.0,"avg_cost":24.59,"pnl":4155.06,"market_value_try":22348.0,"price":30.2,"sector":"Enerji","platform":"Midas","pct":0.02072840311808946},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":6948.04,"market_value_try":20016.4,"price":122.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.018565778063939768},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1187.0,"avg_cost":22.05,"pnl":9790.84,"market_value_try":35966.1,"price":30.299999999999997,"sector":"GYO","platform":"Midas","pct":0.03335957666840511},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":140.0,"avg_cost":192.69,"pnl":10963.32,"market_value_try":37940.0,"price":271.0,"sector":"Enerji","platform":"Midas","pct":0.035190424838925816},{"code":"MAVI","name":"Mavi Giyim","qty":263.0,"avg_cost":39.1,"pnl":1108.86,"market_value_try":11393.16,"price":43.32,"sector":"Perakende","platform":"Midas","pct":0.01056747866784017},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":948.0,"avg_cost":38.62,"pnl":3470.67,"market_value_try":40081.44,"price":42.28,"sector":"Finans","platform":"Midas","pct":0.0371766711058491},{"code":"LOGO","name":"Logo Yazılım","qty":39.0,"avg_cost":140.31,"pnl":128.3,"market_value_try":5600.4,"price":143.6,"sector":"Teknoloji","platform":"Midas","pct":0.005194529659143915},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":7.0,"avg_cost":1549.06,"pnl":1658.56,"market_value_try":12502.0,"price":1786.0,"sector":"Havacılık","platform":"Midas","pct":0.011595959181240132},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":524.0,"avg_cost":9.98,"pnl":320.93,"market_value_try":5549.16,"price":10.59,"sector":"Kimya","platform":"Midas","pct":0.005147003107516436},{"code":"ENKAI","name":"Enka İnşaat","qty":254.0,"avg_cost":84.31,"pnl":5152.8,"market_value_try":26568.4,"price":104.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.024642943681879723},{"code":"MGROS","name":"Migros Ticaret","qty":19.0,"avg_cost":569.66,"pnl":1364.91,"market_value_try":12188.5,"price":641.5,"sector":"Perakende","platform":"Midas","pct":0.01130517904979566},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":10.0,"avg_cost":449.38,"pnl":-46.25,"market_value_try":4447.5,"price":444.75,"sector":"Sağlık","platform":"Midas","pct":0.004125182247525634},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":405.0,"avg_cost":15.57,"pnl":1795.23,"market_value_try":8100.0,"price":20.0,"sector":"Lojistik","platform":"Midas","pct":0.007512979472727968}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.58,"market_value_try":0.73,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":21.68,"market_value_try":17.77,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.07,"market_value_try":3.52,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.281453,"market_value_try":490.85,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.616133,"market_value_try":2386.28,"platform":"İş Bankası"},{"code":"HVS","name":"HSBC PORTFÖY HİSSE","qty":26523.0,"unit_price":1.574896,"market_value_try":41770.96,"platform":"İş Bankası"},{"code":"AAV","name":"ATA PORTFÖY İKİNCİ","qty":10.0,"unit_price":61.733226,"market_value_try":617.33,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.798103,"market_value_try":1394.28,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":45.410537,"market_value_try":1634.77,"platform":"İş Bankası"},{"code":"MAC","name":"MARMARA CAPITAL POR","qty":42966.0,"unit_price":0.763603,"market_value_try":32808.96,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":98.831281,"market_value_try":1482.46,"platform":"İş Bankası"},{"code":"GSP","name":"AZİMUT PYŞ KAR PAYI","qty":1589.0,"unit_price":0.543136,"market_value_try":863.04,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.50909,"market_value_try":973.88,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.352719,"market_value_try":13156.41,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":72.924779,"market_value_try":802.17,"platform":"İş Bankası"},{"code":"OPH","name":"OSMANLI PORTFÖY BİR","qty":119.0,"unit_price":24.248446,"market_value_try":2885.56,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.531503,"market_value_try":313.28,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.202186,"market_value_try":25820.48,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":13.802334,"market_value_try":41683.04,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":11.15296,"market_value_try":1081.83,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":10.952347,"market_value_try":26252.77,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.068768,"market_value_try":5849.95,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":14.236184,"market_value_try":2149.66,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.599638,"market_value_try":1141.73,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":4.925749,"market_value_try":1586.09,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.088293,"market_value_try":901.78,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.100723,"market_value_try":4009.16,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.149847,"market_value_try":45930.61,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.795697,"market_value_try":2580.08,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.411883,"market_value_try":4448.56,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":8.245016,"market_value_try":1088.34,"platform":"İş Bankası"},{"code":"NHY","name":"NEO PORTFÖY BİRİNCİ","qty":57.0,"unit_price":5.522726,"market_value_try":314.79,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":4.938913,"market_value_try":1980.5,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.160449,"market_value_try":720.58,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.36354,"market_value_try":2418.38,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.451867,"market_value_try":1076.36,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.144665,"market_value_try":2537.13,"platform":"İş Bankası"},{"code":"KPH","name":"İŞ PORTFÖY KAR PAYI","qty":9008.0,"unit_price":1.331115,"market_value_try":11990.68,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.64832,"market_value_try":1527.99,"platform":"İş Bankası"},{"code":"NPH","name":"NUROL PORTFÖY BİRİN","qty":839.0,"unit_price":1.71588,"market_value_try":1439.62,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.940325,"market_value_try":1020.61,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.4506190476190475,"market_value_try":1029.26,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2802857142857142,"market_value_try":3559.11,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":270600,"profit_try":120776,"profit_pct":0.806},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":121401,"profit_try":11729,"profit_pct":0.107}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":392001,"profit_try":132505,"profit_pct":0.510624},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0102686,"avg_cost":2989018.72,"current_price":3451611.71,"currency":"TRY","total_value_try":35443.22,"profit_pct":0.15476416604151588},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":660.5826,"currency":"USD","total_value_try":24631.704900000004,"profit_pct":0.04464109639309913}],"usd_try_rate":"44,715"},"MAYIS":{"report_date":"31.05.2026","sheet_name":"MAYIS","display_name":"Mayıs","summary":[{"category":"📈 Hisse Senetleri","value_try":354143.68,"pct":0.34484258531473244,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":219661.64,"pct":0.21389253037658063,"platform":"İş B./Midas","comment":"39 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":387156,"pct":0.3769878823197143,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":39745.29,"pct":0.03870143484611608,"platform":"Midas","comment":"0.0117092 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26265.391375000003,"pct":0.02557556714285647,"platform":"Midas","comment":"$695.49","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1026972.0013750001,"stocks":[{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.57,"pnl":7628.8,"market_value_try":20451.96,"price":39.18,"sector":"Metal","platform":"Midas","pct":0.019914817514612982},{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-1918.0,"market_value_try":10782.0,"price":449.25,"sector":"Tarım Mak.","platform":"Midas","pct":0.010498825659866203},{"code":"ENJSA","name":"Enerjisa Enerji","qty":163.0,"avg_cost":80.17,"pnl":4829.04,"market_value_try":17897.4,"price":109.80000000000001,"sector":"Enerji","platform":"Midas","pct":0.01742734950518358},{"code":"MAVI","name":"Mavi Giyim","qty":268.0,"avg_cost":37.7,"pnl":942.82,"market_value_try":11046.96,"price":41.22,"sector":"Perakende","platform":"Midas","pct":0.010756826851374099},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2687.97,"market_value_try":9013.2,"price":22.200000000000003,"sector":"Lojistik","platform":"Midas","pct":0.008776480749165838},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":145.0,"avg_cost":195.1,"pnl":5959.82,"market_value_try":34249.0,"price":236.2,"sector":"Enerji","platform":"Midas","pct":0.03334949731262823},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":-42.8,"market_value_try":1383.6,"price":230.6,"sector":"Sigorta","platform":"Midas","pct":0.0013472616567418731},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":624.0,"avg_cost":10.15,"pnl":170.85,"market_value_try":6502.08,"price":10.42,"sector":"Kimya","platform":"Midas","pct":0.00633131184812677},{"code":"LOGO","name":"Logo Yazılım","qty":55.0,"avg_cost":145.18,"pnl":715.9,"market_value_try":8701.0,"price":158.2,"sector":"Teknoloji","platform":"Midas","pct":0.008472480251019833},{"code":"MGROS","name":"Migros Ticaret","qty":22.0,"avg_cost":582.43,"pnl":1684.6,"market_value_try":14498.0,"price":659.0,"sector":"Perakende","platform":"Midas","pct":0.014117230051636079},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":911.0,"avg_cost":41.47,"pnl":3945.64,"market_value_try":41723.8,"price":45.800000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.040627982013274486},{"code":"ENKAI","name":"Enka İnşaat","qty":304.0,"avg_cost":87.26,"pnl":4024.9,"market_value_try":30552.0,"price":100.5,"sector":"İnşaat","platform":"Midas","pct":0.02974959391209722},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":983.0,"avg_cost":38.68,"pnl":-590.53,"market_value_try":37432.64,"price":38.08,"sector":"Finans","platform":"Midas","pct":0.03644952340461269},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":42.0,"avg_cost":229.41,"pnl":1578.8,"market_value_try":11214.0,"price":267.0,"sector":"Gıda","platform":"Midas","pct":0.010919479776455165},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":11.0,"avg_cost":1597.59,"pnl":653.56,"market_value_try":18227.0,"price":1657.0,"sector":"Havacılık","platform":"Midas","pct":0.017748293016358864},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1228.0,"avg_cost":22.31,"pnl":11258.36,"market_value_try":38657.44,"price":31.48,"sector":"GYO","platform":"Midas","pct":0.03764215572405288},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":30.0,"avg_cost":450.63,"pnl":71.0,"market_value_try":13590.0,"price":453.0,"sector":"Sağlık","platform":"Midas","pct":0.013233077417694462},{"code":"GWIND","name":"Galata Wind Enerji","qty":924.0,"avg_cost":25.29,"pnl":1485.76,"market_value_try":24855.6,"price":26.9,"sector":"Enerji","platform":"Midas","pct":0.024202801991408864},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-88.59,"market_value_try":3366.0,"price":84.15,"sector":"Otomotiv","platform":"Midas","pct":0.003277596658422337}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":2.62,"market_value_try":0.74,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":23.78,"market_value_try":19.49,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":9.06,"market_value_try":3.17,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.291167,"market_value_try":507.79,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.622224,"market_value_try":2409.87,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.881645,"market_value_try":1540.23,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":46.314359,"market_value_try":1667.31,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":102.638618,"market_value_try":1539.57,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.552253,"market_value_try":1056.45,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.35498,"market_value_try":13240.75,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":73.351958,"market_value_try":806.87,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.284974,"market_value_try":307.12,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":17.419575,"market_value_try":26146.78,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":14.694836,"market_value_try":44378.4,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.143157,"market_value_try":1177.88,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.207581,"market_value_try":29261.57,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.540905,"market_value_try":6124.26,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":16.986163,"market_value_try":2564.91,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":7.084374,"market_value_try":1225.59,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.506269,"market_value_try":1773.01,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.195314,"market_value_try":933.03,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.142873,"market_value_try":4042.29,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":7.595303,"market_value_try":48792.22,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY TAŞIMACI","qty":538.0,"unit_price":4.83476,"market_value_try":2601.1,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.370028,"market_value_try":4414.16,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.324454,"market_value_try":1230.82,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.529156,"market_value_try":2217.19,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.620007,"market_value_try":825.36,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.736343,"market_value_try":2686.43,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.658467,"market_value_try":1167.06,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.174393,"market_value_try":2572.3,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.646486,"market_value_try":1526.29,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.939096,"market_value_try":1019.96,"platform":"İş Bankası"},{"code":"BDS","name":"Pardus Portföy BIST","qty":420.0,"unit_price":2.3840714285714286,"market_value_try":1001.31,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1085.0,"unit_price":3.2439907834101382,"market_value_try":3519.73,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.5294851994851997,"market_value_try":1965.41,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":637.0,"unit_price":1.565243328100471,"market_value_try":997.06,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":41.0,"unit_price":25.346341463414635,"market_value_try":1039.2,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":1693.0,"unit_price":0.8026934435912582,"market_value_try":1358.96,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":266900,"profit_try":117076,"profit_pct":0.781423536950021},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":120256,"profit_try":10584,"profit_pct":0.0965059449996353}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":387156,"profit_try":127660,"profit_pct":0.491953633196658},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0117092,"avg_cost":3051289.09,"current_price":3394364.26,"currency":"TRY","total_value_try":39745.29,"profit_pct":0.11243614107420531},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":695.4909,"currency":"USD","total_value_try":26265.391375000003,"profit_pct":0.09984510302024932}],"usd_try_rate":"45,2875"},"HAZİRAN":{"report_date":"30.06.2026","sheet_name":"HAZİRAN","display_name":"Haziran","summary":[{"category":"📈 Hisse Senetleri","value_try":406503.84,"pct":0.3809076999842885,"platform":"Midas","comment":"19 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":211561.41,"pct":0.1982401201635218,"platform":"İş B./Midas","comment":"38 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":363993,"pct":0.3410736204616938,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":58622.1,"pct":0.05493086923668164,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":26517.398999999998,"pct":0.024847690153814217,"platform":"Midas","comment":"$686.81","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1067197.749,"stocks":[{"code":"TTRAK","name":"Türk Traktör ve Zira","qty":24.0,"avg_cost":529.17,"pnl":-2176.0,"market_value_try":10524.0,"price":438.5,"sector":"Tarım Mak.","platform":"Midas","pct":0.009861340140439144},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":406.0,"avg_cost":15.58,"pnl":2582.41,"market_value_try":8907.64,"price":21.939999999999998,"sector":"Lojistik","platform":"Midas","pct":0.008346756735897125},{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":75.1,"market_value_try":1501.5,"price":250.25,"sector":"Sigorta","platform":"Midas","pct":0.0014069557412456648},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-72.59,"market_value_try":3382.0,"price":84.55,"sector":"Otomotiv","platform":"Midas","pct":0.0031690471640977943},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":8479.37,"market_value_try":21130.56,"price":40.480000000000004,"sector":"Metal","platform":"Midas","pct":0.019800041763393936},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":931.0,"avg_cost":41.01,"pnl":3067.29,"market_value_try":41243.3,"price":44.300000000000004,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03864635212981507},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":3601.84,"market_value_try":17715.2,"price":102.4,"sector":"Enerji","platform":"Midas","pct":0.016599735163047087},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":12.0,"avg_cost":1599.2,"pnl":-194.44,"market_value_try":18996.0,"price":1583.0,"sector":"Havacılık","platform":"Midas","pct":0.01779988761951558},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":1351.17,"market_value_try":8760.4,"price":12.1,"sector":"Kimya","platform":"Midas","pct":0.008208787929143204},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1033.0,"avg_cost":38.57,"pnl":-2548.27,"market_value_try":37291.3,"price":36.1,"sector":"Finans","platform":"Midas","pct":0.03494319589311653},{"code":"GWIND","name":"Galata Wind Enerji","qty":1004.0,"avg_cost":25.39,"pnl":94.48,"market_value_try":25581.92,"price":25.479999999999997,"sector":"Enerji","platform":"Midas","pct":0.023971115029029166},{"code":"MAVI","name":"Mavi Giyim","qty":368.0,"avg_cost":39.1,"pnl":-535.72,"market_value_try":13851.52,"price":37.64,"sector":"Perakende","platform":"Midas","pct":0.012979337721597836},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-236.5,"market_value_try":9755.4,"price":137.4,"sector":"Teknoloji","platform":"Midas","pct":0.009141136222542763},{"code":"MGROS","name":"Migros Ticaret","qty":23.0,"avg_cost":586.78,"pnl":1902.6,"market_value_try":15398.5,"price":669.5,"sector":"Perakende","platform":"Midas","pct":0.014428909744636276},{"code":"ENKAI","name":"Enka İnşaat","qty":409.0,"avg_cost":88.87,"pnl":666.65,"market_value_try":37014.5,"price":90.5,"sector":"İnşaat","platform":"Midas","pct":0.03468382503119391},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":4535.02,"market_value_try":51642.5,"price":227.5,"sector":"Enerji","platform":"Midas","pct":0.04839075049435847},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1470.0,"avg_cost":23.9,"pnl":8818.46,"market_value_try":43953.0,"price":29.9,"sector":"GYO","platform":"Midas","pct":0.041185431698282184},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":87.0,"avg_cost":240.02,"pnl":-1237.29,"market_value_try":19644.6,"price":225.79999999999998,"sector":"Gıda","platform":"Midas","pct":0.018407647522127594},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":47.0,"avg_cost":444.9,"pnl":-700.5,"market_value_try":20210.0,"price":430.0,"sector":"Sağlık","platform":"Midas","pct":0.018937446240809116}],"funds":[{"code":"KOCMT","name":"Eski","qty":0.285,"unit_price":3.68,"market_value_try":1.04,"platform":"İş Bankası"},{"code":"PATEK","name":"Eski","qty":0.82,"unit_price":22.54,"market_value_try":18.48,"platform":"İş Bankası"},{"code":"BINHO","name":"Eski","qty":0.35,"unit_price":10.98,"market_value_try":3.84,"platform":"İş Bankası"},{"code":"TGE","name":"İş Emtia Yabancı BY","qty":1744.0,"unit_price":0.263617,"market_value_try":459.74,"platform":"İş Bankası"},{"code":"TTA","name":"İş Altın Fonu","qty":3873.0,"unit_price":0.568221,"market_value_try":2200.71,"platform":"İş Bankası"},{"code":"YTD","name":"YAPI KREDİ PORTFÖY","qty":1747.0,"unit_price":0.926202,"market_value_try":1618.07,"platform":"İş Bankası"},{"code":"TCD","name":"TACİRLER PORTFÖY DE","qty":36.0,"unit_price":47.834565,"market_value_try":1722.04,"platform":"İş Bankası"},{"code":"AN1","name":"STRATEJİ PORTFÖY Bİ","qty":15.0,"unit_price":108.205329,"market_value_try":1623.07,"platform":"İş Bankası"},{"code":"GBG","name":"INVEO PORTFÖY G-20","qty":1913.0,"unit_price":0.575856,"market_value_try":1101.61,"platform":"İş Bankası"},{"code":"DBH","name":"DENİZ PORTFÖY EUROB","qty":37300.0,"unit_price":0.370781,"market_value_try":13830.13,"platform":"İş Bankası"},{"code":"IPV","name":"İŞ PORTFÖY EUROBOND","qty":11.0,"unit_price":75.56285,"market_value_try":831.19,"platform":"İş Bankası"},{"code":"ZDZ","name":"ZİRAAT PORTFÖY AGRE","qty":25.0,"unit_price":12.424629,"market_value_try":310.61,"platform":"İş Bankası"},{"code":"MKG","name":"AKTİF PORTFÖY ALTIN","qty":1501.0,"unit_price":15.923905,"market_value_try":23901.78,"platform":"İş Bankası"},{"code":"YZG","name":"YAPI KREDİ PORTFÖY","qty":3020.0,"unit_price":11.391021,"market_value_try":34400.88,"platform":"İş Bankası"},{"code":"ITP","name":"İŞ PORTFÖY TEKNOLOJ","qty":97.0,"unit_price":12.542486,"market_value_try":1216.62,"platform":"İş Bankası"},{"code":"OJT","name":"QNB PORTFÖY TEKNOLO","qty":2397.0,"unit_price":12.407619,"market_value_try":29741.06,"platform":"İş Bankası"},{"code":"GJB","name":"INVEO PORTFÖY BİRİN","qty":581.0,"unit_price":10.593381,"market_value_try":6154.75,"platform":"İş Bankası"},{"code":"IJC","name":"İŞ PORTFÖY YARI İLE","qty":151.0,"unit_price":17.143605,"market_value_try":2588.68,"platform":"İş Bankası"},{"code":"ZFB","name":"AK PORTFÖY FİNTEK V","qty":173.0,"unit_price":6.91948,"market_value_try":1197.07,"platform":"İş Bankası"},{"code":"YJK","name":"YAPI KREDİ PORTFÖY","qty":322.0,"unit_price":5.68706,"market_value_try":1831.23,"platform":"İş Bankası"},{"code":"OLD","name":"QNB PORTFÖY TEMİZ E","qty":292.0,"unit_price":3.210325,"market_value_try":937.41,"platform":"İş Bankası"},{"code":"DHM","name":"DENİZ PORTFÖY ESG-S","qty":786.0,"unit_price":5.182366,"market_value_try":4073.33,"platform":"İş Bankası"},{"code":"DMG","name":"DENİZ PORTFÖY GÜMÜŞ","qty":6424.0,"unit_price":5.976512,"market_value_try":38393.11,"platform":"İş Bankası"},{"code":"IEV","name":"İŞ PORTFÖY HAVACILI","qty":538.0,"unit_price":5.23572,"market_value_try":2816.81,"platform":"İş Bankası"},{"code":"GVI","name":"GARANTİ PORTFÖY ÜÇÜ","qty":822.0,"unit_price":5.493733,"market_value_try":4515.84,"platform":"İş Bankası"},{"code":"DVT","name":"DENİZ PORTFÖY METAV","qty":132.0,"unit_price":9.463984,"market_value_try":1249.24,"platform":"İş Bankası"},{"code":"RTG","name":"ATA PORTFÖY ROBOTİK","qty":401.0,"unit_price":5.810486,"market_value_try":2330.0,"platform":"İş Bankası"},{"code":"CPU","name":"AKTİF PORTFÖY TEKNO","qty":228.0,"unit_price":3.740317,"market_value_try":852.79,"platform":"İş Bankası"},{"code":"CPT","name":"ROTA PORTFÖY ÇİP TE","qty":719.0,"unit_price":3.987885,"market_value_try":2867.28,"platform":"İş Bankası"},{"code":"GPT","name":"AKTİF PORTFÖY ROBOT","qty":439.0,"unit_price":2.801915,"market_value_try":1230.04,"platform":"İş Bankası"},{"code":"JET","name":"ATA PORTFÖY HAVACIL","qty":1183.0,"unit_price":2.199687,"market_value_try":2602.22,"platform":"İş Bankası"},{"code":"GID","name":"GARANTİ PORTFÖY İNŞ","qty":927.0,"unit_price":1.667186,"market_value_try":1545.48,"platform":"İş Bankası"},{"code":"URA","name":"ATA PORTFÖY ENERJİ","qty":526.0,"unit_price":1.79703,"market_value_try":945.23,"platform":"İş Bankası"},{"code":"GO9","name":"One Portföy Birinci","qty":777.0,"unit_price":2.570759330759331,"market_value_try":1997.48,"platform":"Midas"},{"code":"HVS","name":"Hsbc Portföy Hisse S","qty":1282.0,"unit_price":1.5809672386895475,"market_value_try":2026.8,"platform":"Midas"},{"code":"KHA","name":"Pardus Portföy İkinc","qty":1279.0,"unit_price":3.600375293197811,"market_value_try":4604.88,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Biri","qty":221.0,"unit_price":25.183212669683257,"market_value_try":5565.49,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Port","qty":10336.0,"unit_price":0.7987016253869968,"market_value_try":8255.38,"platform":"Midas"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":251750,"profit_try":101926,"profit_pct":0.680304891072191},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":112243,"profit_try":2571,"profit_pct":0.0234426289299001}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":363993,"profit_try":104497,"profit_pct":0.402692141690045},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto","qty":0.0205038,"avg_cost":"—","current_price":2859085,"currency":"TRY","total_value_try":58622.1,"profit_pct":null},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.83390021,"avg_cost":632.35,"current_price":686.8088,"currency":"USD","total_value_try":26517.398999999998,"profit_pct":0.0861152161092027}],"usd_try_rate":"46,3"},"TEMMUZ":{"report_date":"31.07.2026","sheet_name":"TEMMUZ","display_name":"Temmuz","summary":[{"category":"📈 Hisse Senetleri","value_try":485118.69,"pct":0.4239490394996715,"platform":"Midas","comment":"18 pozisyon, BIST","clean_name":"Hisse Senetleri","key":"hisse"},{"category":"📊 Yatırım Fonları","value_try":212823.746873,"pct":0.1859883466240593,"platform":"İş B./Midas","comment":"35 fon","clean_name":"Yatırım Fonları","key":"fon"},{"category":"🥇 Fiziki Altın","value_try":357887,"pct":0.312760264708455,"platform":"Midas","comment":"Çeyrek (25) + Bilezik (2)","clean_name":"Fiziki Altın","key":"altin"},{"category":"🔗 Bitcoin","value_try":61183.27,"pct":0.053468540966642754,"platform":"Midas","comment":"0.0205038 BTC","clean_name":"Bitcoin","key":"bitcoin"},{"category":"🌐 VOO (S&P 500 ETF)","value_try":27272.6784,"pct":0.02383380820117122,"platform":"Midas","comment":"$686.65","clean_name":"VOO (S&P 500 ETF)","key":"voo"}],"total_try":1144285.3852730002,"stocks":[{"code":"AGESA","name":"Agesa Hayat Emeklili","qty":6.0,"avg_cost":237.73,"pnl":31.0,"market_value_try":1457.4,"price":242.9,"sector":"Sigorta","platform":"Midas","pct":0.001273633325005106},{"code":"FROTO","name":"Ford Otomotiv","qty":40.0,"avg_cost":86.36,"pnl":-250.59,"market_value_try":3204.0,"price":80.1,"sector":"Otomotiv","platform":"Midas","pct":0.0028000008050750374},{"code":"EREGL","name":"Ereğli Demir ve Çeli","qty":522.0,"avg_cost":24.24,"pnl":9554.69,"market_value_try":22205.88,"price":42.54,"sector":"Metal","platform":"Midas","pct":0.019405893220162194},{"code":"ENJSA","name":"Enerjisa Enerji","qty":173.0,"avg_cost":81.58,"pnl":4726.34,"market_value_try":18839.7,"price":108.9,"sector":"Enerji","platform":"Midas","pct":0.016464162037257236},{"code":"AKSA","name":"Aksa Akrilik Kimya","qty":724.0,"avg_cost":10.23,"pnl":2002.77,"market_value_try":9412.0,"price":13.0,"sector":"Kimya","platform":"Midas","pct":0.00822522084187461},{"code":"LOGO","name":"Logo Yazılım","qty":71.0,"avg_cost":140.73,"pnl":-335.9,"market_value_try":9656.0,"price":136.0,"sector":"Teknoloji","platform":"Midas","pct":0.008438454361362223},{"code":"TUPRS","name":"Tüpraş - Türkiye Pet","qty":227.0,"avg_cost":207.52,"pnl":19914.27,"market_value_try":67021.75,"price":295.25,"sector":"Enerji","platform":"Midas","pct":0.05857083456851994},{"code":"MGROS","name":"Migros Ticaret","qty":25.0,"avg_cost":590.56,"pnl":873.6,"market_value_try":15637.5,"price":625.5,"sector":"Perakende","platform":"Midas","pct":0.013665734266342353},{"code":"TABGD","name":"Tab Gıda San. ve Tic","qty":112.0,"avg_cost":236.28,"pnl":763.31,"market_value_try":27227.2,"price":243.1,"sector":"Gıda","platform":"Midas","pct":0.0237940642696439},{"code":"RYSAS","name":"Reysaş Taşımacılık v","qty":407.0,"avg_cost":15.59,"pnl":2689.13,"market_value_try":9035.4,"price":22.2,"sector":"Lojistik","platform":"Midas","pct":0.007896107139255615},{"code":"MAVI","name":"Mavi Giyim","qty":488.0,"avg_cost":39.21,"pnl":-43.28,"market_value_try":19090.56,"price":39.120000000000005,"sector":"Perakende","platform":"Midas","pct":0.01668339056471077},{"code":"RYGYO","name":"Reysaş Gayrimenkul Y","qty":1656.0,"avg_cost":24.74,"pnl":22449.22,"market_value_try":63424.8,"price":38.300000000000004,"sector":"GYO","platform":"Midas","pct":0.055427431667204506},{"code":"MPARK","name":"MLP Sağlık Hizmetler","qty":67.0,"avg_cost":433.63,"pnl":-1918.0,"market_value_try":27135.0,"price":405.0,"sector":"Sağlık","platform":"Midas","pct":0.02371348996432932},{"code":"SISE","name":"Türkiye Şişe ve Cam","qty":951.0,"avg_cost":41.02,"pnl":682.33,"market_value_try":39694.74,"price":41.739999999999995,"sector":"Cam/Sanayi","platform":"Midas","pct":0.03468954555469547},{"code":"ENKAI","name":"Enka İnşaat","qty":494.0,"avg_cost":88.89,"pnl":-635.2,"market_value_try":43274.4,"price":87.60000000000001,"sector":"İnşaat","platform":"Midas","pct":0.037817838588994755},{"code":"ISMEN","name":"İş Yatırım Menkul De","qty":1103.0,"avg_cost":38.32,"pnl":-4167.55,"market_value_try":38097.62,"price":34.54,"sector":"Finans","platform":"Midas","pct":0.033293809822547704},{"code":"GWIND","name":"Galata Wind Enerji","qty":1249.0,"avg_cost":25.24,"pnl":-1224.9,"market_value_try":30300.74,"price":24.26,"sector":"Enerji","platform":"Midas","pct":0.026480055054422406},{"code":"CLEBI","name":"Çelebi Hava Servisi","qty":28.0,"avg_cost":1540.91,"pnl":-2741.44,"market_value_try":40404.0,"price":1443.0,"sector":"Havacılık","platform":"Midas","pct":0.03530937344826836}],"funds":[{"code":"HVS","name":"HSBC Hisse Senedi (TL) Fonu","qty":1282,"unit_price":1.534202,"market_value_try":1966.846964,"pct":0.00763571189081637,"platform":"Midas"},{"code":"MAC","name":"Marmara Capital Hisse Senedi (TL)","qty":12974,"unit_price":0.771119,"market_value_try":10004.497906,"pct":0.0388395564173094,"platform":"Midas"},{"code":"GO9","name":"One Portföy Birinci Hisse (TL)","qty":777,"unit_price":2.657074,"market_value_try":2064.546498,"pct":0.00801500194598867,"platform":"Midas"},{"code":"OPH","name":"Osmanlı Portföy Birinci Hisse","qty":221,"unit_price":25.091124,"market_value_try":5545.138404,"pct":0.0215273887712828,"platform":"Midas"},{"code":"KHA","name":"Pardus İkinci Hisse (TL)","qty":1279,"unit_price":3.989608,"market_value_try":5102.708632,"pct":0.0198097837248581,"platform":"Midas"},{"code":"ZFB","name":"Ak Portföy Fintek ve Blokzinciri Değ.","qty":173,"unit_price":7.027924,"market_value_try":1215.830852,"pct":0.00472011003589083,"platform":"İş Bankası"},{"code":"MKG","name":"Aktif Portföy Altın Katılım Fonu","qty":1501,"unit_price":16.158208,"market_value_try":24253.470208,"pct":0.0941570514892313,"platform":"İş Bankası"},{"code":"GPT","name":"Aktif Portföy Robotik Tekn. Değ.","qty":439,"unit_price":2.694584,"market_value_try":1182.922376,"pct":0.004592352439036,"platform":"İş Bankası"},{"code":"CPU","name":"Aktif Portföy Teknoloji Katılım","qty":228,"unit_price":3.644179,"market_value_try":830.872812,"pct":0.00322562229114254,"platform":"İş Bankası"},{"code":"URA","name":"Ata Portföy Enerji Değ.","qty":526,"unit_price":1.722941,"market_value_try":906.266966,"pct":0.00351831818906083,"platform":"İş Bankası"},{"code":"JET","name":"Ata Portföy Havacılık & Savunma Değ.","qty":1183,"unit_price":2.24353,"market_value_try":2654.09599,"pct":0.01030375656121,"platform":"İş Bankası"},{"code":"RTG","name":"Ata Portföy Robotik Tekn. Değ.","qty":401,"unit_price":5.398944,"market_value_try":2164.976544,"pct":0.00840489242067912,"platform":"İş Bankası"},{"code":"DMG","name":"Deniz Portföy Gümüş Fon Sepeti","qty":6424,"unit_price":6.024603,"market_value_try":38702.049672,"pct":0.150249463373835,"platform":"İş Bankası"},{"code":"DVT","name":"Deniz Portföy Metaverse Değ.","qty":132,"unit_price":9.223734,"market_value_try":1217.532888,"pct":0.00472671769615198,"platform":"İş Bankası"},{"code":"DBH","name":"Deniz Portföy Eurobond (Döviz)","qty":37300,"unit_price":0.374986,"market_value_try":13986.9778,"pct":0.0543003775376825,"platform":"İş Bankası"},{"code":"DHM","name":"Deniz Portföy ESG Sürdürülebilirlik","qty":786,"unit_price":5.109696,"market_value_try":4016.221056,"pct":0.0155918113786947,"platform":"İş Bankası"},{"code":"GVI","name":"Garanti Portföy Üçüncü Fon Sepeti","qty":822,"unit_price":5.346108,"market_value_try":4394.500776,"pct":0.0170603724863593,"platform":"İş Bankası"},{"code":"GID","name":"Garanti Portföy İnşaat Sektörü Değ.","qty":927,"unit_price":1.60271,"market_value_try":1485.71217,"pct":0.00576784584181792,"platform":"İş Bankası"},{"code":"GBG","name":"Inveo G-20 Ülkeleri Yabancı Hisse","qty":1913,"unit_price":0.574714,"market_value_try":1099.427882,"pct":0.00426820932453719,"platform":"İş Bankası"},{"code":"GJB","name":"Inveo Gedik Portföy Birinci Fon Sepeti","qty":581,"unit_price":9.990847,"market_value_try":5804.682107,"pct":0.0225349917904589,"platform":"İş Bankası"},{"code":"OJT","name":"QNB Portföy Teknoloji Fon Sepeti","qty":2397,"unit_price":12.1509,"market_value_try":29125.7073,"pct":0.113072096421147,"platform":"İş Bankası"},{"code":"OLD","name":"QNB Portföy Temiz Enerji ve Su Fon Sep.","qty":292,"unit_price":3.101958,"market_value_try":905.771736,"pct":0.00351639560246976,"platform":"İş Bankası"},{"code":"CPT","name":"Rota Portföy Çip Tekn. Değ.","qty":719,"unit_price":3.660437,"market_value_try":2631.854203,"pct":0.0102174092853023,"platform":"İş Bankası"},{"code":"AN1","name":"Strateji Portföy Birinci Değ.","qty":15,"unit_price":108.322649,"market_value_try":1624.839735,"pct":0.0063079681908645,"platform":"İş Bankası"},{"code":"TCD","name":"Tacirler Portföy Değişken Fon","qty":36,"unit_price":45.862918,"market_value_try":1651.065048,"pct":0.00640978034909528,"platform":"İş Bankası"},{"code":"YZG","name":"Yapı Kredi Portföy Gümüş Fon Sep.","qty":3020,"unit_price":11.570181,"market_value_try":34941.94662,"pct":0.13565195573325,"platform":"İş Bankası"},{"code":"YJK","name":"Yapı Kredi Robotik & Yarı İletken Fon","qty":322,"unit_price":5.343233,"market_value_try":1720.521026,"pct":0.0066794230039688,"platform":"İş Bankası"},{"code":"YTD","name":"Yapı Kredi Yabancı Fon Sepeti","qty":1747,"unit_price":0.885601,"market_value_try":1547.144947,"pct":0.00600634074986648,"platform":"İş Bankası"},{"code":"ZDZ","name":"Ziraat Portföy Agresif Değ.","qty":25,"unit_price":12.2933,"market_value_try":307.3325,"pct":0.00119312913899097,"platform":"İş Bankası"},{"code":"IEV","name":"İş Portföy Taşımacılık Değ.","qty":538,"unit_price":5.120162,"market_value_try":2754.647156,"pct":0.0106941172491103,"platform":"İş Bankası"},{"code":"ITP","name":"İş Portföy Teknoloji Karma Fon","qty":97,"unit_price":12.322179,"market_value_try":1195.251363,"pct":0.00464021614900466,"platform":"İş Bankası"},{"code":"IJC","name":"İş Portföy Yarı İletken Tekn. Değ.","qty":151,"unit_price":14.881548,"market_value_try":2247.113748,"pct":0.00872376625109942,"platform":"İş Bankası"},{"code":"IPV","name":"İş Portföy Eurobond (Döviz)","qty":11,"unit_price":76.836903,"market_value_try":845.205933,"pct":0.00328126646908592,"platform":"İş Bankası"},{"code":"TGE","name":"İş Portföy Emtia Yabancı BYF Fon Sep.","qty":1744,"unit_price":0.28108,"market_value_try":490.20352,"pct":0.00190307274286951,"platform":"İş Bankası"},{"code":"TTA","name":"İş Portföy Altın Fonu","qty":3873,"unit_price":0.577295,"market_value_try":2235.863535,"pct":0.00868009056775921,"platform":"İş Bankası"}],"gold":[{"type":"Çeyrek Altın","qty":25,"total_gram":40.2,"cost_try":149824,"current_value_try":246475,"profit_try":96651,"profit_pct":0.645096913712089},{"type":"Bilezik","qty":2,"total_gram":18.32,"cost_try":109672,"current_value_try":111412,"profit_try":1740,"profit_pct":0.0158654898242031}],"gold_total":{"type":"TOPLAM ALTIN","qty":27,"total_gram":58.52,"cost_try":259496,"current_value_try":357887,"profit_try":98391,"profit_pct":0.379161913863798},"crypto_etf":[{"asset":"Bitcoin","type":"Kripto Para","qty":0.0205038,"avg_cost":3045919.78,"current_price":2983996.63,"currency":"TRY","total_value_try":61183.27,"profit_pct":-0.02032987059959577},{"asset":"VOO","type":"ETF (S&P 500)","qty":0.835828343,"avg_cost":632.47,"current_price":686.6482,"currency":"USD","total_value_try":27272.6784,"profit_pct":0.08565434408807654}],"usd_try_rate":"47,52"}};

const MONTH_ORDER = ['OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ'];

const CATEGORY_META = {
  hisse:   { label: 'Hisse Senetleri', color: '#3ecf8e', short: 'Hisse' },
  fon:     { label: 'Yatırım Fonları', color: '#5b8fd9', short: 'Fon' },
  altin:   { label: 'Fiziki Altın',    color: '#e8b84b', short: 'Altın' },
  bitcoin: { label: 'Bitcoin',         color: '#e8a856', short: 'BTC' },
  voo:     { label: 'VOO (S&P 500)',   color: '#c07de0', short: 'VOO' },
};

const SECTOR_PALETTE = ['#3ecf8e','#5b8fd9','#e8b84b','#e8a856','#c07de0','#5de0c4','#e87d9a','#8fd95b','#7d9ae8','#d9c45b','#e85b7d','#5bd9a8'];
function colorForIndex(i) { return SECTOR_PALETTE[i % SECTOR_PALETTE.length]; }

function fmtTRY(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 0, sign = false } = opts;
  const s = n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = sign && n > 0 ? '+' : '';
  return prefix + '₺' + s;
}
function fmtPct(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const { decimals = 1, sign = false } = opts;
  const s = (n * 100).toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const prefix = sign && n > 0 ? '+' : '';
  return prefix + s + '%';
}
function fmtNum(n, decimals = 0) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
// Splits the TRY-value change of a foreign-currency-priced asset (VOO in USD, or BTC via its TRY price)
// into "asset price movement" vs "USD/TRY exchange rate movement", holding quantity fixed at current qty
// (i.e. isolates the pure price/fx effect, separate from money added/removed which is handled by computeCashFlow).
function computeFxSplit({ curPriceForeign, curFx, prevPriceForeign, prevFx, qty }) {
  if ([curPriceForeign, curFx, prevPriceForeign, prevFx, qty].some(v => typeof v !== 'number' || Number.isNaN(v))) {
    return null;
  }
  const curValueTry = curPriceForeign * curFx * qty;
  const valueAtPrevFxTry = curPriceForeign * prevFx * qty; // what it would be worth if FX hadn't moved
  const prevValueTry = prevPriceForeign * prevFx * qty;
  const assetMove = valueAtPrevFxTry - prevValueTry; // pure asset price effect, at constant FX
  const fxMove = curValueTry - valueAtPrevFxTry;     // pure FX effect, at constant asset price (current)
  return { assetMove, fxMove, total: assetMove + fxMove };
}

// Approximate split of month-over-month change into "new money/units added" vs "market price movement".
// For stocks/funds/crypto/ETF: qty change x current price/value-per-unit = new money; remainder = market move.
// Gold has had a constant quantity across all recorded months, so its entire change is market move.
function computeCashFlow(month, prevMonth) {
  let newMoney = 0;
  let marketMove = 0;

  const sumPositions = (curList, prevList, keyField, valueField) => {
    const prevMap = Object.fromEntries(prevList.map(p => [p[keyField], p]));
    const curMap = Object.fromEntries(curList.map(p => [p[keyField], p]));
    const allKeys = new Set([...curList.map(p=>p[keyField]), ...prevList.map(p=>p[keyField])]);
    allKeys.forEach(k => {
      const cur = curMap[k];
      const prev = prevMap[k];
      const curVal = cur ? cur[valueField] : 0;
      const prevVal = prev ? prev[valueField] : 0;
      const totalDiff = (curVal || 0) - (prevVal || 0);
      if (cur && prev) {
        const qtyDiff = cur.qty - prev.qty;
        const unitPrice = cur.qty !== 0 ? curVal / cur.qty : 0;
        const addedByQty = qtyDiff * unitPrice;
        newMoney += addedByQty;
        marketMove += totalDiff - addedByQty;
      } else if (cur && !prev) {
        // brand new position — treat full value as new money
        newMoney += curVal;
      } else if (!cur && prev) {
        // fully exited position — treat full removal as withdrawn money (negative new money)
        newMoney -= prevVal;
      }
    });
  };

  sumPositions(month.stocks, prevMonth.stocks, 'code', 'market_value_try');
  sumPositions(month.funds, prevMonth.funds, 'code', 'market_value_try');

  // Crypto/ETF: use qty where available
  const curCrypto = month.crypto_etf.filter(c => c.qty !== null && typeof c.total_value_try === 'number');
  const prevCrypto = prevMonth.crypto_etf.filter(c => c.qty !== null && typeof c.total_value_try === 'number');
  sumPositions(curCrypto.map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try })),
               prevCrypto.map(c => ({ code: c.asset, qty: c.qty, market_value_try: c.total_value_try })),
               'code', 'market_value_try');

  // Gold: quantity has stayed constant across the whole record — entire change is market move.
  if (month.gold_total && prevMonth.gold_total) {
    marketMove += month.gold_total.current_value_try - prevMonth.gold_total.current_value_try;
  }

  const total = newMoney + marketMove;
  return { newMoney, marketMove, total };
}

export default function PortfolioDashboard() {
  const [monthIdx, setMonthIdx] = useState(MONTH_ORDER.length - 1);
  const [tab, setTab] = useState('genel');

  const monthKey = MONTH_ORDER[monthIdx];
  const month = RAW_DATA[monthKey];
  const prevKey = monthIdx > 0 ? MONTH_ORDER[monthIdx - 1] : null;
  const prevMonth = prevKey ? RAW_DATA[prevKey] : null;
  const firstMonth = RAW_DATA[MONTH_ORDER[0]];

  const totalChange = prevMonth ? month.total_try - prevMonth.total_try : null;
  const totalChangePct = prevMonth ? (month.total_try / prevMonth.total_try - 1) : null;
  const totalChangeSinceStart = month.total_try - firstMonth.total_try;
  const totalChangeSinceStartPct = (month.total_try / firstMonth.total_try - 1);

  // Cumulative cash flow split from the first recorded month up to the selected month:
  // sum the newMoney/marketMove of each consecutive month-pair, so buys/sells that happen
  // and reverse in between are captured correctly (not just a single first-vs-last comparison).
  const cumulativeFlow = useMemo(() => {
    let newMoney = 0, marketMove = 0;
    for (let i = 1; i <= monthIdx; i++) {
      const flow = computeCashFlow(RAW_DATA[MONTH_ORDER[i]], RAW_DATA[MONTH_ORDER[i - 1]]);
      newMoney += flow.newMoney;
      marketMove += flow.marketMove;
    }
    return { newMoney, marketMove, total: newMoney + marketMove };
  }, [monthIdx]);
  const marketReturnPct = firstMonth.total_try ? cumulativeFlow.marketMove / firstMonth.total_try : null;

  const historySeries = useMemo(() => {
    return MONTH_ORDER.map((k) => ({ key: k, name: RAW_DATA[k].display_name, total: RAW_DATA[k].total_try }));
  }, []);

  const maxTotal = Math.max(...historySeries.map(h => h.total));
  const minTotal = Math.min(...historySeries.map(h => h.total));

  const categoryRows = month.summary.map(s => {
    const prevRow = prevMonth ? prevMonth.summary.find(p => p.key === s.key) : null;
    const diff = prevRow ? s.value_try - prevRow.value_try : null;
    return { ...s, diff, prevValue: prevRow ? prevRow.value_try : null };
  });

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: #3ecf8e55; }
        .fade-in { animation: fadeIn 0.45s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .row-hover:hover { background: rgba(255,255,255,0.035) !important; }
        .tab-btn { transition: color 0.2s ease, border-color 0.2s ease; }
        .month-btn { transition: all 0.2s ease; }
        .bar-fill { transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #3a3530; border-radius: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div style={styles.bgTexture} />

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.kicker}>PORTFÖY DEFTERİ</div>
            <h1 style={styles.title}>Sefer'in Varlık Raporu</h1>
          </div>
          <div style={styles.headerTotal}>
            <div style={styles.headerTotalLabel}>Güncel Toplam Değer</div>
            <div style={styles.headerTotalValue}>{fmtTRY(month.total_try)}</div>
            {prevMonth && (
              <div style={{ ...styles.headerTotalChange, color: totalChange >= 0 ? '#3ecf8e' : '#e8687a' }}>
                {totalChange >= 0 ? '▲' : '▼'} {fmtTRY(Math.abs(totalChange))} ({fmtPct(Math.abs(totalChangePct))}) geçen aya göre
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Month selector */}
      <div style={styles.monthBar}>
        <div style={styles.monthBarInner}>
          {MONTH_ORDER.map((k, i) => {
            const active = i === monthIdx;
            return (
              <button
                key={k}
                className="month-btn"
                onClick={() => setMonthIdx(i)}
                style={{
                  ...styles.monthBtn,
                  ...(active ? styles.monthBtnActive : {}),
                }}
              >
                <span style={{ fontSize: 13, letterSpacing: '0.03em' }}>{RAW_DATA[k].display_name}</span>
                <span style={{ fontSize: 10, opacity: 0.55, display: 'block', marginTop: 2 }}>{RAW_DATA[k].report_date}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main style={styles.main}>
        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { id: 'genel', label: 'Genel Bakış' },
            { id: 'hisse', label: 'Hisseler' },
            { id: 'fon', label: 'Fonlar' },
            { id: 'altin', label: 'Altın' },
            { id: 'btc', label: 'Bitcoin' },
            { id: 'etf', label: 'ETF (VOO/QQQ)' },
          ].map(t => (
            <button
              key={t.id}
              className="tab-btn"
              onClick={() => setTab(t.id)}
              style={{
                ...styles.tabBtn,
                color: tab === t.id ? '#eef2f5' : '#6d7885',
                borderBottom: tab === t.id ? '2px solid #3ecf8e' : '2px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'genel' && (
          <div className="fade-in">
            {/* Summary stat cards */}
            <div style={styles.statGrid}>
              <StatCard
                label="Toplam Bakiye Değişimi"
                value={fmtTRY(totalChangeSinceStart, { sign: true })}
                sub={fmtPct(totalChangeSinceStartPct, { sign: true }) + ' · ' + firstMonth.display_name + '\'tan beri, yeni yatırımlar dahil'}
                positive={totalChangeSinceStart >= 0}
              />
              <StatCard
                label="Gerçek Piyasa Getirisi"
                value={monthIdx > 0 ? fmtTRY(cumulativeFlow.marketMove, { sign: true }) : '—'}
                sub={monthIdx > 0 ? fmtPct(marketReturnPct, { sign: true }) + ' · yeni para hariç, sadece fiyat hareketi' : 'İlk kayıtlı ay'}
                positive={monthIdx > 0 ? cumulativeFlow.marketMove >= 0 : undefined}
              />
              <StatCard
                label="Aylık değişim"
                value={prevMonth ? fmtTRY(totalChange, { sign: true }) : '—'}
                sub={prevMonth ? fmtPct(totalChangePct, { sign: true }) + ' · ' + prevMonth.display_name + '\'a göre' : 'İlk kayıtlı ay'}
                positive={totalChange >= 0}
              />
              <StatCard
                label="USD/TRY kuru"
                value={month.usd_try_rate ? '₺' + month.usd_try_rate : '—'}
                sub={month.report_date + ' kapanışı'}
              />
            </div>
            {monthIdx > 0 && (
              <div style={{ fontSize: 11.5, color: '#576270', marginTop: -12, marginBottom: 20 }}>
                "Toplam Bakiye Değişimi" senin eklediğin yeni parayı da içerir; "Gerçek Piyasa Getirisi" sadece {firstMonth.display_name}'tan beri elindeki varlıkların fiyat hareketini gösterir — bu ay içine yeni eklenen adetler hariçtir.
              </div>
            )}

            {/* Total value history chart */}
            <Panel title="Toplam Portföy Değeri — Aylık Seyir">
              <HistoryChart series={historySeries} activeIdx={monthIdx} min={minTotal} max={maxTotal} />
            </Panel>

            <Panel title={month.display_name + ' — Varlık Dağılımı'}>
              <PieChart
                data={[...categoryRows].sort((a,b)=>b.value_try-a.value_try).map(row => ({
                  label: (CATEGORY_META[row.key] || { label: row.clean_name }).label,
                  value: row.value_try,
                  color: (CATEGORY_META[row.key] || { color: '#999' }).color,
                }))}
                centerLabel={fmtTRY(month.total_try)}
              />
            </Panel>

            {prevMonth && (() => {
                const flow = computeCashFlow(month, prevMonth);
                const barTotal = Math.abs(flow.newMoney) + Math.abs(flow.marketMove) || 1;
                return (
                  <Panel title={prevMonth.display_name + ' → ' + month.display_name + ' — Nakit Akışı'}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: '#a9b4c0' }}>Toplam değişim</span>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 15, fontWeight: 600, color: flow.total >= 0 ? '#3ecf8e' : '#e8687a' }}>
                          {fmtTRY(flow.total, {sign:true})}
                        </span>
                      </div>
                      <div style={styles.barTrack}>
                        <div style={{ display: 'flex', height: '100%' }}>
                          <div style={{ width: Math.abs(flow.newMoney) / barTotal * 100 + '%', background: '#5b8fd9' }} />
                          <div style={{ width: Math.abs(flow.marketMove) / barTotal * 100 + '%', background: '#e8b84b' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#5b8fd9' }} />
                            <span style={{ fontSize: 12, color: '#a9b4c0' }}>Net Alım/Satım</span>
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#d7dee5', marginTop: 3 }}>{fmtTRY(flow.newMoney, {sign:true})}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: 12, color: '#a9b4c0' }}>Piyasa Hareketi</span>
                            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#e8b84b' }} />
                          </div>
                          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#d7dee5', marginTop: 3 }}>{fmtTRY(flow.marketMove, {sign:true})}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: '#576270', marginTop: 4 }}>
                        Adet/miktar artışı net alım, azalışı net satım olarak sayılır (parayı nereye koyduğunuza bakılmaksızın); geri kalanı fiyat hareketinden gelir.
                      </div>
                    </div>
                  </Panel>
                );
            })()}

            <div style={styles.twoCol}>
              {/* Category breakdown */}
              <Panel title={month.display_name + ' — Kategori Dağılımı'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[...categoryRows].sort((a,b)=>b.value_try-a.value_try).map(row => {
                    const meta = CATEGORY_META[row.key] || { label: row.clean_name, color: '#999' };
                    return (
                      <div key={row.key}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                          <span style={{ fontSize: 13.5, color: '#d7dee5', fontWeight: 500 }}>{meta.label}</span>
                          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: '#a9b4c0' }}>
                            {fmtTRY(row.value_try)} <span style={{ color: '#6d7885', fontSize: 11.5 }}>({fmtPct(row.pct)})</span>
                          </span>
                        </div>
                        <div style={styles.barTrack}>
                          <div className="bar-fill" style={{ ...styles.barFillBase, width: (row.pct*100) + '%', background: meta.color }} />
                        </div>
                        {row.diff !== null && (
                          <div style={{ fontSize: 11, marginTop: 3, color: row.diff >= 0 ? '#3ecf8e' : '#e8687a' }}>
                            {row.diff >= 0 ? '▲' : '▼'} {fmtTRY(Math.abs(row.diff))} geçen aya göre
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {/* Month notes / meta */}
              <Panel title={month.display_name + ' — Notlar'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {month.summary.map(s => {
                    const meta = CATEGORY_META[s.key] || { label: s.clean_name, color: '#999' };
                    return (
                      <div key={s.key} style={styles.noteRow}>
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: meta.color, flexShrink: 0 }} />
                        <span style={{ color: '#a9b4c0', fontSize: 13, flexShrink: 0, minWidth: 92 }}>{meta.label}</span>
                        <span style={{ color: '#6d7885', fontSize: 12.5 }}>{s.comment}</span>
                      </div>
                    );
                  })}
                  {prevMonth && (() => {
                    const mostGrown = [...categoryRows].filter(r => r.diff !== null).sort((a,b) => b.diff - a.diff)[0];
                    if (!mostGrown || mostGrown.diff <= 0) return null;
                    const meta = CATEGORY_META[mostGrown.key] || { label: mostGrown.clean_name };
                    return (
                      <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #2a3542' }}>
                        <div style={{ fontSize: 11.5, color: '#6d7885', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>En Çok Artan Varlık</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>
                          <span style={{ color: '#d7dee5', fontWeight: 600 }}>{meta.label}</span>
                          <span style={{ color: '#3ecf8e' }}>+{fmtTRY(mostGrown.diff)}</span>
                        </div>
                      </div>
                    );
                  })()}
                  {month.gold_total && (
                    <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #2a3542' }}>
                      <div style={{ fontSize: 11.5, color: '#6d7885', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Altın Kâr/Zarar</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>
                        <span style={{ color: '#6d7885' }}>Maliyet: {fmtTRY(month.gold_total.cost_try)}</span>
                        <span style={{ color: '#3ecf8e' }}>K/Z: {fmtTRY(month.gold_total.profit_try, {sign:true})} ({fmtPct(month.gold_total.profit_pct, {sign:true})})</span>
                      </div>
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          </div>
        )}

        {tab === 'hisse' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Sektör Dağılımı'}>
              {(() => {
                const sectorTotals = {};
                month.stocks.forEach(s => {
                  sectorTotals[s.sector] = (sectorTotals[s.sector] || 0) + s.market_value_try;
                });
                const sectorEntries = Object.entries(sectorTotals).sort((a,b) => b[1]-a[1]);
                return (
                  <PieChart
                    data={sectorEntries.map(([sector, value], i) => ({ label: sector, value, color: colorForIndex(i) }))}
                  />
                );
              })()}
            </Panel>
            <Panel title={month.display_name + ' — Hisse Bazında Dağılım'}>
              <PieChart
                data={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map((s, i) => ({
                  label: s.code, value: s.market_value_try, color: colorForIndex(i),
                }))}
              />
            </Panel>
            <Panel title={month.display_name + ' — Hisse Senedi Pozisyonları (' + month.stocks.length + ' pozisyon)'} noPad>
              <PositionTable
                columns={['KOD', 'ADI', 'ADET', 'FİYAT', 'DEĞER', 'K/Z', 'PAY', 'SEKTÖR']}
                rows={[...month.stocks].sort((a,b)=>b.market_value_try-a.market_value_try).map(s => [
                  <span style={{ fontWeight: 600, color: '#5de0a8' }}>{s.code}</span>,
                  s.name,
                  fmtNum(s.qty),
                  fmtTRY(s.price, {decimals:2}),
                  fmtTRY(s.market_value_try),
                  typeof s.pnl === 'number' ? <span style={{ color: s.pnl >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(s.pnl, {sign:true})}</span> : '—',
                  fmtPct(s.pct),
                  <span style={{ color: '#6d7885' }}>{s.sector}</span>,
                ])}
                prevRows={prevMonth ? prevMonth.stocks : null}
                keyField={month.stocks.map(s=>s.code)}
              />
            </Panel>
            {prevMonth && <StockDiffPanel current={month.stocks} previous={prevMonth.stocks} currentName={month.display_name} previousName={prevMonth.display_name} />}
          </div>
        )}

        {tab === 'fon' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Yatırım Fonu Pozisyonları (' + month.funds.length + ' fon)'} noPad>
              <PositionTable
                columns={['KOD', 'ADI', 'ADET', 'BİRİM FİYAT', 'DEĞER', 'PAY', 'PLATFORM']}
                rows={[...month.funds].sort((a,b)=>b.market_value_try-a.market_value_try).map(f => [
                  <span style={{ fontWeight: 600, color: '#7aa8c9' }}>{f.code}</span>,
                  f.name,
                  fmtNum(f.qty),
                  fmtNum(f.unit_price, 4),
                  fmtTRY(f.market_value_try),
                  fmtPct(f.pct),
                  <span style={{ color: '#6d7885' }}>{f.platform}</span>,
                ])}
              />
            </Panel>
          </div>
        )}

        {tab === 'altin' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Fiziki Altın Pozisyonları'} noPad>
              <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
              <table style={styles.miniTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Tür</th>
                    <th style={styles.th}>Adet</th>
                    <th style={styles.th}>Gram</th>
                    <th style={styles.th}>Maliyet</th>
                    <th style={styles.th}>Güncel Değer</th>
                    <th style={styles.th}>K/Z</th>
                  </tr>
                </thead>
                <tbody>
                  {month.gold.map((g, i) => (
                    <tr key={i} className="row-hover">
                      <td style={styles.td}>{g.type}</td>
                      <td style={styles.td}>{fmtNum(g.qty)}</td>
                      <td style={styles.td}>{fmtNum(g.total_gram, 2)}</td>
                      <td style={styles.td}>{fmtTRY(g.cost_try)}</td>
                      <td style={styles.td}>{fmtTRY(g.current_value_try)}</td>
                      <td style={{ ...styles.td, color: g.profit_try >= 0 ? '#7fc9b4' : '#e8879a' }}>
                        {fmtTRY(g.profit_try, {sign:true})} ({fmtPct(g.profit_pct, {sign:true})})
                      </td>
                    </tr>
                  ))}
                  {month.gold_total && (
                    <tr style={{ borderTop: '1px solid #3a4756' }}>
                      <td style={{ ...styles.td, fontWeight: 600, color: '#f0c869' }}>TOPLAM</td>
                      <td style={styles.td}>{fmtNum(month.gold_total.qty)}</td>
                      <td style={styles.td}>{fmtNum(month.gold_total.total_gram, 2)}</td>
                      <td style={styles.td}>{fmtTRY(month.gold_total.cost_try)}</td>
                      <td style={{ ...styles.td, fontWeight: 600 }}>{fmtTRY(month.gold_total.current_value_try)}</td>
                      <td style={{ ...styles.td, fontWeight: 600, color: month.gold_total.profit_try >= 0 ? '#7fc9b4' : '#e8879a' }}>
                        {fmtTRY(month.gold_total.profit_try, {sign:true})} ({fmtPct(month.gold_total.profit_pct, {sign:true})})
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </Panel>
            {month.gold_total && (
              <div style={styles.statGrid}>
                <StatCard label="Toplam Gram" value={fmtNum(month.gold_total.total_gram, 2) + ' gr'} sub={fmtNum(month.gold_total.qty) + ' adet parça'} />
                <StatCard label="Toplam Maliyet" value={fmtTRY(month.gold_total.cost_try)} sub="Alım maliyeti" />
                <StatCard label="Güncel Değer" value={fmtTRY(month.gold_total.current_value_try)} sub={month.report_date + ' itibarıyla'} />
                <StatCard label="Kâr/Zarar" value={fmtTRY(month.gold_total.profit_try, {sign:true})} sub={fmtPct(month.gold_total.profit_pct, {sign:true})} positive={month.gold_total.profit_try >= 0} />
              </div>
            )}
            {prevMonth && month.gold_total && prevMonth.gold_total && (() => {
              const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
              const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
              const gram = month.gold_total.total_gram;
              const prevGram = prevMonth.gold_total.total_gram;
              if (gram !== prevGram) {
                return (
                  <Panel title="Kur Etkisi Ayrıştırması">
                    <div style={{ color: '#576270', fontSize: 12.5 }}>Bu ay içinde gram miktarı değiştiği için kur ayrıştırması hesaplanamadı (yeni alım ile piyasa hareketi karışıyor).</div>
                  </Panel>
                );
              }
              const curPriceUsdPerGram = (month.gold_total.current_value_try / gram) / curFx;
              const prevPriceUsdPerGram = (prevMonth.gold_total.current_value_try / prevGram) / prevFx;
              const split = computeFxSplit({ curPriceForeign: curPriceUsdPerGram, curFx, prevPriceForeign: prevPriceUsdPerGram, prevFx, qty: gram });
              if (!split) return null;
              return (
                <Panel title="Altın — Kur Etkisi Ayrıştırması">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>Ons/gram altın fiyat hareketi (USD bazında)</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                      {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, {fmtNum(gram,2)} gr sabit tutularak hesaplanmıştır. Altın USD/ons bazlı fiyatlandığı için TL değerindeki değişim de bu iki etkiye ayrıştırılabilir.
                    </div>
                  </div>
                </Panel>
              );
            })()}
          </div>
        )}

        {tab === 'btc' && (
          <div className="fade-in">
            {(() => {
              const btc = month.crypto_etf.find(c => c.asset === 'Bitcoin');
              const btcSummary = month.summary.find(s => s.key === 'bitcoin');
              const prevBtc = prevMonth ? prevMonth.crypto_etf.find(c => c.asset === 'Bitcoin') : null;
              const valDiff = prevBtc && btc ? btc.total_value_try - prevBtc.total_value_try : null;
              return (
                <>
                  <div style={styles.statGrid}>
                    <StatCard label="Değer (TL)" value={btc ? fmtTRY(btc.total_value_try) : '—'} sub={btcSummary ? fmtPct(btcSummary.pct) + ' portföy payı' : ''} />
                    <StatCard label="Miktar" value={btc && btc.qty !== null ? fmtNum(btc.qty, 6) + ' BTC' : '—'} sub={btcSummary ? btcSummary.comment : ''} />
                    <StatCard label="Kâr/Zarar %" value={btc && typeof btc.profit_pct === 'number' ? fmtPct(btc.profit_pct, {sign:true}) : '—'} positive={btc && typeof btc.profit_pct === 'number' ? btc.profit_pct >= 0 : undefined} sub="Maliyete göre" />
                    <StatCard label="Aylık Değişim" value={valDiff !== null ? fmtTRY(valDiff, {sign:true}) : '—'} sub={prevMonth ? (prevMonth.display_name + '\'a göre') : 'İlk kayıt'} positive={valDiff !== null ? valDiff >= 0 : undefined} />
                  </div>
                  <Panel title="Bitcoin — Aylık Seyir">
                    <MiniAssetChart series={MONTH_ORDER.map(k => {
                      const c = RAW_DATA[k].crypto_etf.find(x => x.asset === 'Bitcoin');
                      return { name: RAW_DATA[k].display_name, value: c ? c.total_value_try : null };
                    })} color="#e8a856" activeIdx={monthIdx} />
                  </Panel>
                  {prevMonth && (() => {
                    const prevBtcC = prevMonth.crypto_etf.find(c => c.asset === 'Bitcoin');
                    const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
                    const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
                    const curPriceTry = typeof btc?.current_price === 'number' ? btc.current_price : null;
                    const prevPriceTry = typeof prevBtcC?.current_price === 'number' ? prevBtcC.current_price : null;
                    if (curPriceTry === null || prevPriceTry === null) {
                      return (
                        <Panel title="Kur Etkisi Ayrıştırması">
                          <div style={{ color: '#576270', fontSize: 12.5 }}>Bu ay için fiyat verisi metin formatında geldiğinden kur ayrıştırması hesaplanamadı.</div>
                        </Panel>
                      );
                    }
                    const curPriceUsd = curPriceTry / curFx;
                    const prevPriceUsd = prevPriceTry / prevFx;
                    const split = computeFxSplit({ curPriceForeign: curPriceUsd, curFx, prevPriceForeign: prevPriceUsd, prevFx, qty: btc.qty });
                    if (!split) return null;
                    return (
                      <Panel title="Kur Etkisi Ayrıştırması">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: '#a9b4c0' }}>BTC fiyat hareketi (USD bazında)</span>
                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                          </div>
                          <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                            {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, miktar sabit tutularak hesaplanmıştır.
                          </div>
                        </div>
                      </Panel>
                    );
                  })()}
                  {btc && (
                    <Panel title="Detaylar">
                      <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
                      <table style={styles.miniTable}>
                        <tbody>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Ortalama Maliyet</td><td style={styles.td}>{typeof btc.avg_cost === 'string' ? btc.avg_cost : fmtNum(btc.avg_cost)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Güncel Fiyat</td><td style={styles.td}>{typeof btc.current_price === 'string' ? btc.current_price : fmtNum(btc.current_price)}</td></tr>
                          <tr><td style={{...styles.td, color:'#8a94a0'}}>Para Birimi</td><td style={styles.td}>{btc.currency}</td></tr>
                        </tbody>
                      </table>
                      </div>
                    </Panel>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {tab === 'etf' && (
          <div className="fade-in">
            <Panel title={month.display_name + ' — Yabancı ETF Pozisyonları'} noPad>
              <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
              <table style={styles.miniTable}>
                <thead>
                  <tr>
                    <th style={styles.th}>Varlık</th>
                    <th style={styles.th}>Tür</th>
                    <th style={styles.th}>Adet</th>
                    <th style={styles.th}>Ort. Maliyet</th>
                    <th style={styles.th}>Güncel Fiyat</th>
                    <th style={styles.th}>Değer (TL)</th>
                    <th style={styles.th}>K/Z %</th>
                  </tr>
                </thead>
                <tbody>
                  {month.crypto_etf.filter(c => c.asset !== 'Bitcoin').map((c, i) => (
                    <tr key={i} className="row-hover">
                      <td style={{ ...styles.td, fontWeight: 600, color: '#7dc4d9' }}>{c.asset}</td>
                      <td style={{ ...styles.td, color: '#8a94a0' }}>{c.type}</td>
                      <td style={styles.td}>{c.qty !== null ? fmtNum(c.qty, 4) : '—'}</td>
                      <td style={styles.td}>{typeof c.avg_cost === 'string' ? c.avg_cost : (c.avg_cost !== null ? fmtNum(c.avg_cost, 2) : '—')}</td>
                      <td style={styles.td}>{typeof c.current_price === 'number' ? (c.currency === 'USD' ? '$' : '₺') + fmtNum(c.current_price, 2) : c.current_price}</td>
                      <td style={styles.td}>{c.total_value_try !== null && typeof c.total_value_try === 'number' ? fmtTRY(c.total_value_try) : '—'}</td>
                      <td style={{ ...styles.td, color: (typeof c.profit_pct === 'number' && c.profit_pct >= 0) ? '#7fc9b4' : (typeof c.profit_pct === 'number' ? '#e8879a' : '#8a94a0') }}>
                        {typeof c.profit_pct === 'number' ? fmtPct(c.profit_pct, {sign:true}) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </Panel>
            {month.usd_try_rate && (
              <div style={{ fontSize: 11.5, color: '#6f7680', fontFamily: 'IBM Plex Mono, monospace', padding: '4px 4px' }}>
                USD/TRY ≈ ₺{month.usd_try_rate} ({month.report_date} kapanışı)
              </div>
            )}
            {prevMonth && (() => {
              const voo = month.crypto_etf.find(c => c.asset === 'VOO');
              const prevVoo = prevMonth.crypto_etf.find(c => c.asset === 'VOO');
              const curFx = parseFloat(String(month.usd_try_rate).replace(',', '.'));
              const prevFx = parseFloat(String(prevMonth.usd_try_rate).replace(',', '.'));
              if (!voo || !prevVoo || typeof voo.current_price !== 'number' || typeof prevVoo.current_price !== 'number') return null;
              const split = computeFxSplit({ curPriceForeign: voo.current_price, curFx, prevPriceForeign: prevVoo.current_price, prevFx, qty: voo.qty });
              if (!split) return null;
              return (
                <Panel title="VOO — Kur Etkisi Ayrıştırması">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>VOO fiyat hareketi (USD bazında)</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.assetMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.assetMove, {sign:true})}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#a9b4c0' }}>USD/TRY kur etkisi</span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13.5, color: split.fxMove >= 0 ? '#3ecf8e' : '#e8687a' }}>{fmtTRY(split.fxMove, {sign:true})}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#576270', marginTop: 2 }}>
                      {fmtNum(prevFx,2)} → {fmtNum(curFx,2)} kur değişimiyle, miktar sabit tutularak hesaplanmıştır.
                    </div>
                  </div>
                </Panel>
              );
            })()}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <span>{MONTH_ORDER.length} aylık kayıt · {firstMonth.display_name}-{month.display_name} 2026</span>
      </footer>
    </div>
  );
}

function StatCard({ label, value, sub, positive }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={{ ...styles.statValue, color: positive === undefined ? '#eef2f5' : (positive ? '#3ecf8e' : '#e8687a') }}>{value}</div>
      <div style={styles.statSub}>{sub}</div>
    </div>
  );
}

function Panel({ title, children, noPad }) {
  return (
    <div style={styles.panel}>
      <div style={styles.panelTitle}>{title}</div>
      <div style={{ padding: noPad ? 0 : '18px 20px 20px' }}>{children}</div>
    </div>
  );
}

function HistoryChart({ series, activeIdx, min, max }) {
  const isNarrow = useIsNarrow();
  const w = 900, h = 220, padL = isNarrow ? 10 : 60, padR = isNarrow ? 10 : 20, padT = 28, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const range = (max - min) || 1;
  const points = series.map((s, i) => {
    const x = padL + (i / (series.length - 1)) * innerW;
    const y = padT + innerH - ((s.total - min) / range) * innerH;
    return { x, y, ...s };
  });
  const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');
  const areaD = pathD + ' L' + points[points.length-1].x + ',' + (padT+innerH) + ' L' + points[0].x + ',' + (padT+innerH) + ' Z';

  return (
    <div style={{ overflowX: isNarrow ? 'visible' : 'auto' }} className="scrollbar-thin">
      <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', minWidth: isNarrow ? 0 : 500, height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3ecf8e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0,0.25,0.5,0.75,1].map((f,i) => (
          <line key={i} x1={padL} x2={w-padR} y1={padT+innerH*f} y2={padT+innerH*f} stroke="#2a3542" strokeWidth="1" />
        ))}
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#3ecf8e" strokeWidth="2.5" />
        {points.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === points.length - 1;
          const anchor = isFirst ? 'start' : isLast ? 'end' : 'middle';
          const labelX = isFirst ? p.x + 4 : isLast ? p.x - 4 : p.x;
          const nameAnchor = isNarrow ? anchor : 'middle';
          const nameX = isNarrow ? labelX : p.x;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={i === activeIdx ? 6 : 4} fill={i === activeIdx ? '#5de0a8' : '#1a1712'} stroke="#3ecf8e" strokeWidth="2" />
              <text x={nameX} y={h-10} textAnchor={nameAnchor} fontSize="12" fill={i === activeIdx ? '#d7dee5' : '#6d7885'} fontFamily="IBM Plex Mono, monospace">{p.name}</text>
              <text x={labelX} y={p.y - 14} textAnchor={anchor} fontSize="11" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
                {(p.total/1000).toLocaleString('tr-TR', {maximumFractionDigits:0})}K
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MiniAssetChart({ series, color, activeIdx }) {
  const valid = series.filter(s => s.value !== null && s.value !== undefined);
  if (valid.length < 2) {
    return <div style={{ color: '#6d7885', fontSize: 12.5, fontFamily: 'IBM Plex Mono, monospace', padding: '20px 0' }}>Yeterli veri yok.</div>;
  }
  const w = 900, h = 180, padL = 60, padR = 20, padT = 20, padB = 36;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const values = series.map(s => s.value).filter(v => v !== null && v !== undefined);
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max - min) || 1;
  const points = series.map((s, i) => {
    const x = padL + (i / (series.length - 1)) * innerW;
    const y = s.value !== null && s.value !== undefined ? padT + innerH - ((s.value - min) / range) * innerH : null;
    return { x, y, ...s };
  });
  const validPoints = points.filter(p => p.y !== null);
  const pathD = validPoints.map((p, i) => (i === 0 ? 'M' : 'L') + p.x + ',' + p.y).join(' ');

  return (
    <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
      <svg viewBox={'0 0 ' + w + ' ' + h} style={{ width: '100%', minWidth: 500, height: 'auto', display: 'block' }}>
        {[0,0.5,1].map((f,i) => (
          <line key={i} x1={padL} x2={w-padR} y1={padT+innerH*f} y2={padT+innerH*f} stroke="#2a3542" strokeWidth="1" />
        ))}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" />
        {points.map((p, i) => p.y !== null ? (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === activeIdx ? 6 : 4} fill={i === activeIdx ? color : '#141a23'} stroke={color} strokeWidth="2" />
            <text x={p.x} y={h-10} textAnchor="middle" fontSize="12" fill={i === activeIdx ? '#d7dee5' : '#6d7885'} fontFamily="IBM Plex Mono, monospace">{p.name}</text>
            <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="11" fill="#a9b4c0" fontFamily="IBM Plex Mono, monospace">
              {(p.value/1000).toLocaleString('tr-TR', {maximumFractionDigits:0})}K
            </text>
          </g>
        ) : null)}
      </svg>
    </div>
  );
}

function PositionTable({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto' }} className="scrollbar-thin">
      <table style={styles.miniTable}>
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i} style={styles.th}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="row-hover">
              {r.map((cell, j) => <td key={j} style={styles.td}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StockDiffPanel({ current, previous, currentName, previousName }) {
  const prevMap = Object.fromEntries(previous.map(s => [s.code, s]));
  const curMap = Object.fromEntries(current.map(s => [s.code, s]));
  const allCodes = Array.from(new Set([...current.map(s=>s.code), ...previous.map(s=>s.code)]));

  const changes = allCodes.map(code => {
    const cur = curMap[code];
    const prev = prevMap[code];
    if (cur && prev) {
      const qtyDiff = cur.qty - prev.qty;
      const valDiff = cur.market_value_try - prev.market_value_try;
      return { code, name: cur.name, status: qtyDiff !== 0 ? 'changed' : 'held', qtyDiff, valDiff, curQty: cur.qty, prevQty: prev.qty };
    } else if (cur && !prev) {
      return { code, name: cur.name, status: 'new', qtyDiff: cur.qty, valDiff: cur.market_value_try, curQty: cur.qty, prevQty: 0 };
    } else {
      return { code, name: prev.name, status: 'removed', qtyDiff: -prev.qty, valDiff: -prev.market_value_try, curQty: 0, prevQty: prev.qty };
    }
  }).filter(c => c.status !== 'held');

  if (changes.length === 0) return null;

  return (
    <Panel title={previousName + ' → ' + currentName + ' arası hareketler'} noPad>
      <div style={{ padding: '4px 20px 18px' }}>
        {changes.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < changes.length-1 ? '1px solid #232d38' : 'none' }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.03em',
              background: c.status === 'new' ? '#1c3d33' : c.status === 'removed' ? '#3d2129' : (c.qtyDiff > 0 ? '#1c3d33' : '#3d3220'),
              color: c.status === 'new' ? '#3ecf8e' : c.status === 'removed' ? '#e8687a' : (c.qtyDiff > 0 ? '#3ecf8e' : '#e8b84b'),
            }}>
              {c.status === 'new' ? 'YENİ' : c.status === 'removed' ? 'ÇIKTI' : (c.qtyDiff > 0 ? 'ALIM' : 'SATIM')}
            </span>
            <span style={{ fontWeight: 600, color: '#5de0a8', fontSize: 13, minWidth: 60 }}>{c.code}</span>
            <span style={{ color: '#6d7885', fontSize: 12.5, flex: 1 }}>{c.name}</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, color: '#a9b4c0' }}>
              {c.prevQty} → {c.curQty} adet
            </span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, color: c.valDiff >= 0 ? '#3ecf8e' : '#e8687a', minWidth: 110, textAlign: 'right' }}>
              {fmtTRY(c.valDiff, {sign:true})}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function useIsNarrow(breakpoint = 520) {
  const [isNarrow, setIsNarrow] = useState(() => typeof window !== 'undefined' ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isNarrow;
}

function PieChart({ data, size = 220, innerRadiusRatio = 0.62, centerLabel, maxLabeled = 10 }) {
  const [expandedOthers, setExpandedOthers] = useState(false);
  const isNarrow = useIsNarrow();
  const sorted = [...data].sort((a, b) => b.value - a.value);
  let displayData = sorted;
  let othersItems = null;
  if (sorted.length > maxLabeled) {
    const head = sorted.slice(0, maxLabeled - 1);
    const tail = sorted.slice(maxLabeled - 1);
    const restValue = tail.reduce((s, d) => s + d.value, 0);
    othersItems = tail;
    displayData = [...head, { label: 'Diğer (' + tail.length + ')', value: restValue, color: '#4a5560', isOthers: true }];
  }

  const total = displayData.reduce((sum, d) => sum + d.value, 0);
  if (total <= 0) return null;

  // Estimate space needed for the longest label text so leader-line labels don't get clipped
  // off the edge of the viewBox on narrow screens (monospace-ish average char width at 11.5px font).
  const longestLabelChars = Math.max(...displayData.map(d => (d.label + ' 100.0%').length));
  const estCharWidth = 6.4;
  const labelTextWidth = longestLabelChars * estCharWidth;
  const pad = isNarrow ? Math.min(labelTextWidth + 20, 150) : 92; // room for outside labels + leader lines
  const vbSize = size + pad * 2;
  const cx = vbSize / 2, cy = vbSize / 2, r = size / 2 - 6, innerR = r * innerRadiusRatio;
  const labelR = r + 22; // where leader lines break outward
  let angle = -90;
  const gapDeg = 1.5;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const slices = displayData.map(d => {
    const fraction = d.value / total;
    const rawSweep = fraction * 360;
    const sweep = Math.max(rawSweep - gapDeg, 0.001);
    const startAngle = angle;
    const endAngle = angle + sweep;
    const midAngle = angle + rawSweep / 2;
    angle += rawSweep;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = sweep > 180 ? 1 : 0;
    const path = [
      'M', x1, y1,
      'A', r, r, 0, largeArc, 1, x2, y2,
      'L', ix2, iy2,
      'A', innerR, innerR, 0, largeArc, 0, ix1, iy1,
      'Z',
    ].join(' ');
    const isRight = Math.cos(toRad(midAngle)) >= 0;
    const elbowX = cx + labelR * Math.cos(toRad(midAngle));
    const elbowY = cy + labelR * Math.sin(toRad(midAngle));
    const endX = cx + (labelR + 16) * Math.cos(toRad(midAngle)) * (isRight ? 1 : 1);
    const labelAnchorX = isRight ? endX + 6 : endX - 6;
    return { ...d, path, fraction, midAngle, isRight, edgeX: cx + r * Math.cos(toRad(midAngle)), edgeY: cy + r * Math.sin(toRad(midAngle)), elbowX, elbowY, labelAnchorX, labelY: elbowY };
  });

  // Spread overlapping labels vertically on each side to avoid collisions
  const spreadSide = (items) => {
    const sortedItems = [...items].sort((a, b) => a.labelY - b.labelY);
    const minGap = 15;
    for (let i = 1; i < sortedItems.length; i++) {
      if (sortedItems[i].labelY - sortedItems[i - 1].labelY < minGap) {
        sortedItems[i].labelY = sortedItems[i - 1].labelY + minGap;
      }
    }
    // clamp within viewBox
    sortedItems.forEach(s => {
      s.labelY = Math.max(14, Math.min(vbSize - 14, s.labelY));
    });
  };
  spreadSide(slices.filter(s => s.isRight));
  spreadSide(slices.filter(s => !s.isRight));

  const onlyLabelAbove = isNarrow ? 0.06 : 0.02; // narrow screens show fewer leader-line labels (only larger slices) to avoid crowding; legend below still lists everything

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ width: '100%', maxWidth: vbSize, margin: '0 auto' }}>
        <svg viewBox={'0 0 ' + vbSize + ' ' + vbSize} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
          {slices.map((s, i) => (
            <path
              key={i}
              d={s.path}
              fill={s.color}
              style={{ cursor: s.isOthers ? 'pointer' : 'default', opacity: s.isOthers && expandedOthers ? 0.75 : 1 }}
              onClick={() => s.isOthers && setExpandedOthers(v => !v)}
            />
          ))}
          {centerLabel && (
            <>
              <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10.5" fill="#6d7885" fontFamily="IBM Plex Mono, monospace" letterSpacing="0.04em">TOPLAM</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize={size < 200 ? 14 : 16.5} fill="#eef2f5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">{centerLabel}</text>
            </>
          )}
          {slices.filter(s => s.fraction >= onlyLabelAbove).map((s, i) => (
            <g key={'lbl'+i} style={{ cursor: s.isOthers ? 'pointer' : 'default' }} onClick={() => s.isOthers && setExpandedOthers(v => !v)}>
              <polyline
                points={`${s.edgeX},${s.edgeY} ${s.elbowX},${s.elbowY} ${s.labelAnchorX},${s.labelY}`}
                fill="none" stroke="#4a5560" strokeWidth="1"
              />
              <circle cx={s.edgeX} cy={s.edgeY} r="2.5" fill={s.color} />
              <text
                x={s.labelAnchorX + (s.isRight ? 4 : -4)}
                y={s.labelY}
                textAnchor={s.isRight ? 'start' : 'end'}
                dominantBaseline="middle"
                fontSize="11.5"
                fill={s.isOthers ? '#8fd9c4' : '#d7dee5'}
                fontFamily="IBM Plex Mono, monospace"
                textDecoration={s.isOthers ? 'underline' : 'none'}
              >
                {s.label}{s.isOthers ? (expandedOthers ? ' ▲' : ' ▾') : ''} <tspan fill="#7a8592">{fmtPct(s.fraction)}</tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', justifyContent: 'center', maxWidth: 480 }}>
        {slices.map((s, i) => (
          <div
            key={i}
            onClick={() => s.isOthers && setExpandedOthers(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: s.isOthers ? 'pointer' : 'default' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color, flexShrink: 0 }} />
            <span style={{ color: s.isOthers ? '#8fd9c4' : '#a9b4c0', fontSize: 11.5, textDecoration: s.isOthers ? 'underline' : 'none' }}>{s.label}</span>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#6d7885' }}>{fmtPct(s.fraction)}</span>
          </div>
        ))}
      </div>
      {expandedOthers && othersItems && (
        <div style={{
          width: '100%', maxWidth: 420, background: '#141a23', border: '1px solid #232d38',
          borderRadius: 10, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ fontSize: 11, color: '#6d7885', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
            Diğer İçindekiler ({othersItems.length})
          </div>
          {othersItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <span style={{ color: '#d7dee5' }}>{item.label}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#a9b4c0' }}>{fmtPct(item.value / total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#d7dee5',
    fontFamily: '"Fraunces", Georgia, serif',
    position: 'relative',
  },
  bgTexture: {
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    backgroundImage: 'radial-gradient(circle at 15% 8%, rgba(62,207,142,0.07), transparent 40%), radial-gradient(circle at 85% 90%, rgba(91,143,217,0.07), transparent 40%)',
  },
  header: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid #232d38',
    padding: '28px 24px 24px',
  },
  headerInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16,
  },
  kicker: {
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.18em', color: '#3ecf8e', marginBottom: 6,
  },
  title: {
    fontSize: 30, fontWeight: 600, margin: 0, letterSpacing: '-0.01em', color: '#eef2f5',
  },
  headerTotal: { textAlign: 'right' },
  headerTotalLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#6d7885', letterSpacing: '0.05em' },
  headerTotalValue: { fontSize: 32, fontWeight: 600, color: '#eef2f5', fontFamily: 'IBM Plex Mono, monospace', marginTop: 2 },
  headerTotalChange: { fontSize: 12.5, marginTop: 4, fontFamily: 'IBM Plex Mono, monospace' },

  monthBar: {
    position: 'relative', zIndex: 1,
    borderBottom: '1px solid #232d38', background: '#10151d',
  },
  monthBarInner: {
    maxWidth: 1100, margin: '0 auto', display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
  },
  monthBtn: {
    background: 'none', border: 'none', borderRight: '1px solid #232d38', cursor: 'pointer',
    padding: '14px 22px', color: '#6d7885', fontFamily: '"Fraunces", serif', textAlign: 'left', flexShrink: 0,
  },
  monthBtnActive: {
    color: '#eef2f5', background: 'rgba(62,207,142,0.08)', boxShadow: 'inset 0 -2px 0 #3ecf8e',
  },

  main: { position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '28px 24px 60px' },

  tabs: { display: 'flex', gap: 24, marginBottom: 26, borderBottom: '1px solid #232d38', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  tabBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 12px',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 12.5, letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0,
  },

  statGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24,
  },
  statCard: {
    background: '#141a23', border: '1px solid #232d38', borderRadius: 10, padding: '16px 18px',
  },
  statLabel: { fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: '#6d7885', letterSpacing: '0.06em', textTransform: 'uppercase' },
  statValue: { fontSize: 21, fontWeight: 600, marginTop: 7, fontFamily: '"Fraunces", serif' },
  statSub: { fontSize: 11.5, color: '#576270', marginTop: 5, fontFamily: 'IBM Plex Mono, monospace' },

  panel: {
    background: '#141a23', border: '1px solid #232d38', borderRadius: 12, marginBottom: 20, overflow: 'hidden',
  },
  panelTitle: {
    padding: '16px 20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, letterSpacing: '0.05em',
    color: '#3ecf8e', borderBottom: '1px solid #232d38', textTransform: 'uppercase',
  },

  twoCol: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 },

  barTrack: { height: 7, background: '#0a0e14', borderRadius: 4, overflow: 'hidden' },
  barFillBase: { height: '100%', borderRadius: 4 },

  noteRow: { display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' },

  miniTable: { width: '100%', borderCollapse: 'collapse', fontSize: 12.5 },
  th: {
    textAlign: 'left', padding: '10px 14px', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5,
    color: '#6d7885', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid #232d38',
    position: 'sticky', top: 0, background: '#141a23',
  },
  td: {
    padding: '9px 14px', borderBottom: '1px solid #1c2530', fontFamily: 'IBM Plex Mono, monospace', color: '#d7dee5',
    fontSize: 12.5,
  },

  footer: {
    position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px', color: '#4a5560',
    fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, borderTop: '1px solid #232d38',
  },
};
